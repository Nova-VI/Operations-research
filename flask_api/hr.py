from faker import Faker
import random 
import gurobipy as gp
from gurobipy import GRB



def solve_hr_problem(num_workers, num_locations, num_shifts_per_day, skills):
    faker=Faker()
    """
    Solves the HR scheduling problem using Gurobi, returns results as JSON,
    now accepts skills as input.
    """
    # Step 1: Generate data for all weekdays

    # Parameters for generating data
    # num_workers = 40  # Removed, using function parameter
    # num_shifts_per_day = 3 # Removed, using function parameter
    # num_locations = 2 # Removed, using function parameter
    # num_skills = 3  # removed, skills are passed as parameter
    weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    # skills = [faker.job() + " Expertise" for _ in range(num_skills)] # removed, skills are passed as parameter

    # Generate random worker names
    workers = [faker.name() for _ in range(num_workers)]

    # Generate realistic location names
    company_name = faker.company()
    locations = [f"{company_name} {site}" for site in ["Factory", "Office", "Warehouse", "Site"][:num_locations]]
    # Generate realistic skill names using Faker's job function, formatted as skills

    shifts = [f'{day}_s{i+1}' for day in weekdays for i in range(num_shifts_per_day)]


    # Random skill assignment for workers (each worker gets 1 to 5 skills randomly)
    worker_skills = {worker: random.sample(skills, random.randint(1, len(skills))) for worker in workers}

    # Random skill requirements for each (shift, location) pair
    shift_skills = {
        (shift, location): random.sample(skills, random.randint(1, len(skills)))
        for shift in shifts
        for location in locations
    }

    # Shift durations (in hours, randomly assigned between 4 and 8 hours)
    shift_durations = {shift: random.randint(3 , int(24/num_shifts_per_day)) for shift in shifts}

    # Worker hourly costs (randomly assigned between 10 and 30 currency units per hour)
    worker_hourly_cost = {worker: random.randint(10, 30) for worker in workers}

    # Calculate the cost for each (worker, shift, location) assignment as hourly cost × shift duration
    cost = {
        (worker, shift, location): worker_hourly_cost[worker] * shift_durations[shift]
        for worker in workers
        for shift in shifts
        for location in locations
    }

    # Random minimum workers per shift-location pair (between 1 and 3 workers required)
    min_workers = {
        (shift, location): random.randint(1, 3)
        for shift in shifts
        for location in locations
    }

    # Maximum hours a worker can work in a week
    max_hours = {worker: 40 for worker in workers}  # Example: 40 hours per week for all workers

    # Step 2: Build the optimization model in Gurobi

    # Create a Gurobi model
    model = gp.Model("HR_Optimization_Weekdays")

    # Decision variable: x[w, s, l] = 1 if worker w is assigned to shift s at location l
    x = model.addVars(workers, shifts, locations, vtype=GRB.BINARY, name="x")

    # Objective: Minimize the total cost
    model.setObjective(
        gp.quicksum(
            cost[w, s, l] * x[w, s, l]
            for w in workers for s in shifts for l in locations
        ),
        GRB.MINIMIZE
    )

    # Constraints

    # 1. Skill matching: worker can only be assigned to shifts for which they have the required skills
    for w in workers:
        for s in shifts:
            for l in locations:
                if not set(shift_skills[(s, l)]).issubset(set(worker_skills[w])):
                    model.addConstr(x[w, s, l] == 0)

    # 2. Each shift at each location must have at least the minimum number of workers
    for s in shifts:
        for l in locations:
            model.addConstr(gp.quicksum(x[w, s, l] for w in workers) >= min_workers[(s, l)])

    # 3. A worker can only be assigned to one shift per day
    for w in workers:
        for d in weekdays:
            # Get all shifts for that day
            day_shifts = [s for s in shifts if d in s]
            model.addConstr(gp.quicksum(x[w, s, l] for s in day_shifts for l in locations) <= 1)

    # 4. Maximum hours constraint: a worker cannot exceed the maximum hours in a week
    for w in workers:
        model.addConstr(
            gp.quicksum(shift_durations[s] * x[w, s, l] for s in shifts for l in locations) <= max_hours[w],
            name=f"max_hours_worker_{w}"
        )

    # 5. Skill coverage: all required skills must be covered for each shift-location
    for s in shifts:
        for l in locations:
            for skill in shift_skills[(s, l)]:
                model.addConstr(
                    gp.quicksum(x[w, s, l] for w in workers if skill in worker_skills[w]) >= 1,
                    name=f"skill_coverage_{s}_{l}_{skill}"
                )

    # Create auxiliary binary variable y[w, l] = 1 if worker w is assigned to location l
    y = model.addVars(workers, locations, vtype=GRB.BINARY, name="y")

    # Constraint 6: A worker can only be assigned to one location during the entire week
    for w in workers:
        for l in locations:
            model.addConstr(
                gp.quicksum(x[w, s, l] for s in shifts) <= len(shifts) * y[w, l],
                name=f"worker_one_location_{w}_{l}"
            )

    # Constraint 7: Ensure that a worker is assigned to exactly one location
    for w in workers:
        model.addConstr(
            gp.quicksum(y[w, l] for l in locations) == 1,
            name=f"one_location_per_worker_{w}"
        )

    # Step 3: Optimize the model
    model.optimize()

    # Step 4 & 5: Prepare Results
    output_data = {
        "status": "No solution found",
        "assignments": [],
        "shifts" : shifts,
        "workers" : workers,
        "locations" : locations
    }
    if model.status == GRB.OPTIMAL:
        output_data["status"] = "Optimal"
        assignments = []
        for w in workers:
            for s in shifts:
                for l in locations:
                    if x[w, s, l].x > 0.5:
                        assignments.append({
                            "worker": w,
                            "shift": s,
                            "location": l,
                            "duration": shift_durations[s],
                            "cost": cost[w, s, l]
                        })
        output_data["assignments"] = assignments

    return output_data
