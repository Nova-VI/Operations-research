from flask import  request, jsonify
from gurobipy import Model, GRB, quicksum
from nodes import visualize_resource_distribution_base64

def receive_json(data):
    recipients = [
        {
            "id": recipient["id"],
            "name": recipient["name"],
            "demand": recipient["demand"]
        }
        for recipient in data["recipients"]
    ]
    
    # Sources: List of supply points
    sources = [
        {
            "id": source["id"],
            "name": source["name"],
            "capacity": source["capacity"],
            "fixedCost": source["fixedCost"],
            "dynamicCost": source["dynamicCost"]
        }
        for source in data["sources"]
    ]

    # Additional input data
    c = data["delivery cost per unit"]  # Cost of delivering resource from each source to each recipient
    T = data["delivery capacities"]  # Delivery capacity for each source-recipient pair
    L = data["delivery loss"]  # Transmission losses
    
    # Extract IDs
    sources_id = [source["id"] for source in sources]
    recipients_id = [recipient["id"] for recipient in recipients]
    sources_names = [source["name"] for source in sources]
    recipients_names = [recipient["name"] for recipient in recipients]

    
    # Cost and capacity data
    f = [x["fixedCost"] for x in sources]
    v = [x["dynamicCost"] for x in sources]
    C = [x["capacity"] for x in sources]
    d = [x["demand"] for x in recipients]

    # Create the optimization model
    model = Model("ResourceDistributionOptimization")
    
    # Decision variables
    x = model.addVars(sources_id, recipients_id, name="x", vtype=GRB.CONTINUOUS, lb=0)  # Resource transmitted
    g = model.addVars(sources_id, name="g", vtype=GRB.CONTINUOUS, lb=0)  # Resource generated
    y = model.addVars(sources_id, name="y", vtype=GRB.BINARY)  # Source operational status

    # Objective function: Minimize total costint(round(y[i].x))
    if f[0]:
        print(f)
        model.setObjective(
            quicksum(f[i] * y[i] for i in sources_id) +               # Fixed costs
            quicksum(v[i] * g[i] for i in sources_id) +               # Variable generation costs
            quicksum(c[i][j] * x[i, j] for i in sources_id for j in recipients_id),  # delivery costs
            GRB.MINIMIZE
        )
    else:
        model.setObjective(
            quicksum(v[i] * g[i] for i in sources_id) +               # Variable generation costs
            quicksum(c[i][j] * x[i, j] for i in sources_id for j in recipients_id),  # delivery costs
            GRB.MINIMIZE
        )

    # Constraints

    # 1. Demand satisfaction at each recipient
    if L :
        for j in recipients_id:
            model.addConstr(
                quicksum((1 - L[i][j]) * x[i, j] for i in sources_id) >= d[j],
                name=f"demand_{j}"
            )
    else:
        for j in recipients_id:
            model.addConstr(
                quicksum(x[i, j] for i in sources_id) >= d[j],
                name=f"demand_{j}"
            )


    # 2. Balance at each source: Total output must not exceed total generation
    for i in sources_id:
        model.addConstr(
            quicksum(x[i, j] for j in recipients_id) <= g[i],
            name=f"balance_{i}"
        )

    # 3. Generation capacity at each source
    if C[0]:
        for i in sources_id:
            model.addConstr(
                g[i] <= C[i] * y[i],
                name=f"capacity_{i}"
            )

    # 4. Delivery capacity for each source-recipient pair
    if T:
        for i in sources_id:
            for j in recipients_id:
                model.addConstr(
                    x[i, j] <= T[i][j],
                    name=f"transmission_{i}_{j}"
                )
    # 5. the generation shouldn't exceed the capacity of the source , and if the source isn't functional the generation should be null
    if C[0]:
        for i in sources_id:
            model.addConstr(
                g[i] <= C[i] * y[i],
                name=f"capacity_{i}"
            )


    # Optimize the model
    model.optimize()

    # Output the results
    if model.status == GRB.OPTIMAL:
        print(y)
        state = []
        generated = []
        power = []
        y1=[]
        for i in sources_id:
            print(f"Source {i}: Operational = {y[i].x}, Source generated = {g[i].x}")
            state.append(y[i].x)
            generated.append(g[i].x)
            if not f[0]:
                if g[i].x==0:
                    y1.append(0)
                else:
                    y1.append(1) 
            else:
                y1.append(int(round(y[i].x)))
            tmp = []
            for j in recipients_id:
                print(f"  Ressource transmitted to Recipient {j}: {x[i, j].x}")
                tmp.append(x[i, j].x)
            power.append(tmp)
        print("y = ",y1)    
        svg_base64 = visualize_resource_distribution_base64(
            transmission_cost_matrix=c,
            sources_id=sources_id,
            recipients_id=recipients_id,
            y=y1,
            recipients_names=recipients_names,
            sources_names=sources_names# Convert binary y variables to integers
        )

        # Create JSON response
        # json_array = [
        #     {
        #         "state": state[i],
        #         "generated": generated[i],
        #         "power": power[i]
        #     }
        #     for i in range(len(state))
        # ]
        return jsonify({"svg":svg_base64}), 200

    else:
        # Handle infeasible solution
        model.computeIIS()
        conflicting_constraints = [
            constr.ConstrName for constr in model.getConstrs() if constr.IISConstr
        ]
        error_message = {
            "error": "No optimal solution found.",
            "conflicting_constraints": conflicting_constraints
        }
        return jsonify(error_message), 500
