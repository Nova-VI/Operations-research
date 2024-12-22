import networkx as nx
import matplotlib
matplotlib.use("Agg")  # Use a non-interactive backend
import matplotlib.pyplot as plt
import numpy as np
import io
import base64

def visualize_resource_distribution_base64(
    transmission_cost_matrix, 
    sources_id, 
    recipients_id, 
    y,
    sources_names,
    recipients_names
):

    # Create graph
    G = nx.Graph()
    i=0
    # Add all nodes first
    for n in sources_names:
        if y[i]!=0:
            G.add_node(f"{n}")
        i+=1# Add source nodes
    for r in recipients_names:
        G.add_node(f"{r}")  # Add recipient nodes

    # Add edges only for active sources
    max_weight = max(transmission_cost_matrix[s][r] for s in sources_id for r in recipients_id)
    normalized_weights = []

    for s in sources_id:
        if y[s] == 0:
            print(sources_names[s], "is inactive")# Skip edges if the source is inactive
            continue
        for r in recipients_id:
            print(s,r)
            #print(sources_names[s], "is active")# Skip edges if the source is inactive
            cost = round(transmission_cost_matrix[s][r], 2)
            norm_weight = max_weight / cost  # Invert and normalize weights
            normalized_weights.append(norm_weight)
            G.add_edge(f"{sources_names[s]}", f"{recipients_names[r]}", weight=cost, normalized_weight=norm_weight)

    # Normalize weights to improve proportional scaling for spring layout
    if normalized_weights:  # Avoid division by zero if no edges exist
        normalized_weights = np.array(normalized_weights)
        scaled_weights = (normalized_weights - normalized_weights.min()) / (normalized_weights.max() - normalized_weights.min())
    else:
        scaled_weights = []

    # Apply spring layout (nodes without edges will still be placed)
    pos = nx.spring_layout(G, weight='normalized_weight', k=2, iterations=500, seed=42)

    # Create the plot
    plt.figure(figsize=(8, 6))
    nx.draw(
        G, pos, with_labels=True, node_size=2000, node_color="lightblue", font_size=10
    )
    edge_labels = nx.get_edge_attributes(G, 'weight')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=9)

    # Save the plot as an SVG in memory
    svg_buffer = io.BytesIO()
    plt.savefig(svg_buffer, format="svg")
    plt.close()  # Close the plot to free memory
    svg_buffer.seek(0)

    # Convert the SVG to base64
    svg_base64 = base64.b64encode(svg_buffer.getvalue()).decode("utf-8")
    svg_buffer.close()

    return svg_base64
