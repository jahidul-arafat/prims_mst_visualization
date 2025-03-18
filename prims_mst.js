// Default graph data based on the image
const defaultNodes = [
    {id: 0, label: "0"},
    {id: 1, label: "1"},
    {id: 2, label: "2"},
    {id: 3, label: "3"},
    {id: 4, label: "4"},
    {id: 5, label: "5"},
    {id: 6, label: "6"}
];

const defaultEdges = [
    {id: "0-1", from: 0, to: 1, label: "1"},
    {id: "0-3", from: 0, to: 3, label: "5"},
    {id: "1-2", from: 1, to: 2, label: "7"},
    {id: "1-3", from: 1, to: 3, label: "4"},
    {id: "1-5", from: 1, to: 5, label: "8"},
    {id: "2-4", from: 2, to: 4, label: "3"},
    {id: "2-5", from: 2, to: 5, label: "11"},
    {id: "2-6", from: 2, to: 6, label: "10"},
    {id: "3-4", from: 3, to: 4, label: "2"},
    {id: "3-5", from: 3, to: 5, label: "6"},
    {id: "4-5", from: 4, to: 5, label: "9"},
    {id: "4-6", from: 4, to: 6, label: "12"}
];

// Pre-computed Prim's algorithm steps for the default graph
const defaultAlgorithmSteps = [
    {
        description: "Initialize: Start with node 0. Add all edges connected to node 0 to the priority queue.",
        mstNodes: [0],
        mstEdges: [],
        priorityQueue: [
            {from: 0, to: 1, weight: 1},
            {from: 0, to: 3, weight: 5}
        ],
        tableEntry: null
    },
    {
        description: "Select the minimum weight edge from the priority queue: (0, 1) with weight 1. Add node 1 to the MST.",
        mstNodes: [0, 1],
        mstEdges: [{from: 0, to: 1, weight: 1}],
        priorityQueue: [
            {from: 1, to: 2, weight: 7},
            {from: 1, to: 3, weight: 4},
            {from: 1, to: 5, weight: 8},
            {from: 0, to: 3, weight: 5}
        ],
        tableEntry: {
            step: 1,
            edge: "0 - 1",
            weight: 1,
            reason: "Lowest weight edge connected to node 0"
        }
    },
    {
        description: "Select the minimum weight edge from the priority queue: (1, 3) with weight 4. Add node 3 to the MST.",
        mstNodes: [0, 1, 3],
        mstEdges: [
            {from: 0, to: 1, weight: 1},
            {from: 1, to: 3, weight: 4}
        ],
        priorityQueue: [
            {from: 3, to: 4, weight: 2},
            {from: 3, to: 5, weight: 6},
            {from: 0, to: 3, weight: 5}, // Skipped as 3 is already in MST
            {from: 1, to: 2, weight: 7},
            {from: 1, to: 5, weight: 8}
        ],
        tableEntry: {
            step: 2,
            edge: "1 - 3",
            weight: 4,
            reason: "Lowest weight edge that connects to a new node"
        }
    },
    {
        description: "Select the minimum weight edge from the priority queue: (3, 4) with weight 2. Add node 4 to the MST.",
        mstNodes: [0, 1, 3, 4],
        mstEdges: [
            {from: 0, to: 1, weight: 1},
            {from: 1, to: 3, weight: 4},
            {from: 3, to: 4, weight: 2}
        ],
        priorityQueue: [
            {from: 4, to: 2, weight: 3},
            {from: 4, to: 5, weight: 9},
            {from: 4, to: 6, weight: 12},
            {from: 3, to: 5, weight: 6},
            {from: 1, to: 2, weight: 7},
            {from: 1, to: 5, weight: 8}
        ],
        tableEntry: {
            step: 3,
            edge: "3 - 4",
            weight: 2,
            reason: "Lowest weight edge that connects to a new node"
        }
    },
    {
        description: "Select the minimum weight edge from the priority queue: (4, 2) with weight 3. Add node 2 to the MST.",
        mstNodes: [0, 1, 2, 3, 4],
        mstEdges: [
            {from: 0, to: 1, weight: 1},
            {from: 1, to: 3, weight: 4},
            {from: 3, to: 4, weight: 2},
            {from: 4, to: 2, weight: 3}
        ],
        priorityQueue: [
            {from: 2, to: 6, weight: 10},
            {from: 3, to: 5, weight: 6},
            {from: 1, to: 5, weight: 8},
            {from: 4, to: 5, weight: 9},
            {from: 4, to: 6, weight: 12}
        ],
        tableEntry: {
            step: 4,
            edge: "4 - 2",
            weight: 3,
            reason: "Lowest weight edge that connects to a new node"
        }
    },
    {
        description: "Select the minimum weight edge from the priority queue: (3, 5) with weight 6. Add node 5 to the MST.",
        mstNodes: [0, 1, 2, 3, 4, 5],
        mstEdges: [
            {from: 0, to: 1, weight: 1},
            {from: 1, to: 3, weight: 4},
            {from: 3, to: 4, weight: 2},
            {from: 4, to: 2, weight: 3},
            {from: 3, to: 5, weight: 6}
        ],
        priorityQueue: [
            {from: 2, to: 6, weight: 10},
            {from: 4, to: 6, weight: 12}
        ],
        tableEntry: {
            step: 5,
            edge: "3 - 5",
            weight: 6,
            reason: "Lowest weight edge that connects to a new node"
        }
    },
    {
        description: "Select the minimum weight edge from the priority queue: (2, 6) with weight 10. Add node 6 to the MST.",
        mstNodes: [0, 1, 2, 3, 4, 5, 6],
        mstEdges: [
            {from: 0, to: 1, weight: 1},
            {from: 1, to: 3, weight: 4},
            {from: 3, to: 4, weight: 2},
            {from: 4, to: 2, weight: 3},
            {from: 3, to: 5, weight: 6},
            {from: 2, to: 6, weight: 10}
        ],
        priorityQueue: [],
        tableEntry: {
            step: 6,
            edge: "2 - 6",
            weight: 10,
            reason: "Lowest weight edge that connects to a new node"
        }
    },
    {
        description: "MST construction complete! All nodes are now included in the MST. The total weight of the MST is 26.",
        mstNodes: [0, 1, 2, 3, 4, 5, 6],
        mstEdges: [
            {from: 0, to: 1, weight: 1},
            {from: 1, to: 3, weight: 4},
            {from: 3, to: 4, weight: 2},
            {from: 4, to: 2, weight: 3},
            {from: 3, to: 5, weight: 6},
            {from: 2, to: 6, weight: 10}
        ],
        priorityQueue: [],
        tableEntry: {
            step: 7,
            edge: "Complete",
            weight: 26,
            reason: "MST includes all nodes"
        }
    }
];

// Network options
const options = {
    nodes: {
        shape: "circle",
        size: 30,
        font: {
            size: 16,
            color: "#ffffff"
        },
        borderWidth: 2,
        shadow: true,
        color: {
            background: "#666666",
            border: "#444444"
        }
    },
    edges: {
        width: 2,
        font: {
            size: 14,
            align: "middle"
        },
        shadow: true
    },
    physics: {
        enabled: true,
        barnesHut: {
            gravitationalConstant: -3000,
            centralGravity: 0.3,
            springLength: 150
        },
        stabilization: {
            iterations: 250
        }
    },
    interaction: {
        dragNodes: true,
        dragView: true,
        zoomView: true
    },
    manipulation: {
        enabled: false
    }
};

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Track current state
    let currentStep = 0;
    let algorithmSteps = [...defaultAlgorithmSteps];

    // Get DOM elements
    const originalContainer = document.getElementById("original-graph");
    const mstContainer = document.getElementById("mst-graph");
    const customContainer = document.getElementById("custom-graph");
    const customResultsContainer = document.getElementById("custom-mst-graph");

    // Make sure all containers exist before trying to create networks
    if (!originalContainer || !mstContainer || !customContainer || !customResultsContainer) {
        console.error("One or more containers are missing:", {
            originalContainer,
            mstContainer,
            customContainer,
            customResultsContainer
        });
        return; // Exit early if any container is missing
    }

    // Create data sets
    const originalData = {
        nodes: new vis.DataSet(defaultNodes),
        edges: new vis.DataSet(defaultEdges)
    };

    const mstData = {
        nodes: new vis.DataSet([]),
        edges: new vis.DataSet([])
    };

    const customData = {
        nodes: new vis.DataSet([]),
        edges: new vis.DataSet([])
    };

    const customResultsData = {
        nodes: new vis.DataSet([]),
        edges: new vis.DataSet([])
    };

    // Create networks
    const originalNetwork = new vis.Network(originalContainer, originalData, options);
    const mstNetwork = new vis.Network(mstContainer, mstData, options);
    const customNetwork = new vis.Network(customContainer, customData, options);
    const customResultsNetwork = new vis.Network(customResultsContainer, customResultsData, options);

    // Get other DOM elements
    const stepCounter = document.getElementById("step-counter");
    const stepDescription = document.getElementById("step-description");
    const priorityQueueContent = document.getElementById("priority-queue-content");
    const prevButton = document.getElementById("prev-step");
    const nextButton = document.getElementById("next-step");
    const restartButton = document.getElementById("restart");
    const mstEdgesTable = document.getElementById("mst-edges").getElementsByTagName("tbody")[0];
    const startingNodeSpan = document.getElementById("starting-node");

    // Tab navigation
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const tabId = tab.getAttribute("data-tab");

            // Update active tab
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // Update active content
            tabContents.forEach(content => content.classList.remove("active"));
            document.getElementById(`${tabId}-content`).classList.add("active");
        });
    });

    // Update the visualization based on the current step
    function updateVisualization() {
        stepCounter.textContent = currentStep;
        stepDescription.textContent = algorithmSteps[currentStep].description;

        // Update MST graph
        const stepData = algorithmSteps[currentStep];

        // Clear previous data
        mstData.nodes.clear();
        mstData.edges.clear();

        // Add nodes in MST
        stepData.mstNodes.forEach(nodeId => {
            const node = {...originalData.nodes.get(nodeId)};
            node.color = {background: "#4CAF50", border: "#2E7D32"};
            mstData.nodes.add(node);
        });

        // Add edges in MST
        stepData.mstEdges.forEach(edge => {
            mstData.edges.add({
                id: `${edge.from}-${edge.to}`,
                from: edge.from,
                to: edge.to,
                label: edge.weight.toString(),
                color: {color: "#2E7D32", highlight: "#4CAF50"},
                width: 3
            });
        });

        // Add remaining nodes (not yet in MST) but connected to MST
        const connectedNodeIds = new Set();
        stepData.priorityQueue.forEach(edge => {
            if (stepData.mstNodes.includes(edge.from) && !stepData.mstNodes.includes(edge.to)) {
                connectedNodeIds.add(edge.to);
            } else if (stepData.mstNodes.includes(edge.to) && !stepData.mstNodes.includes(edge.from)) {
                connectedNodeIds.add(edge.from);
            }
        });

        connectedNodeIds.forEach(nodeId => {
            if (!stepData.mstNodes.includes(nodeId)) {
                const node = {...originalData.nodes.get(nodeId)};
                node.color = {background: "#FFC107", border: "#FFA000"};
                mstData.nodes.add(node);
            }
        });

        // Add edges being considered
        stepData.priorityQueue.forEach(edge => {
            const edgeId = `${edge.from}-${edge.to}`;
            const reverseEdgeId = `${edge.to}-${edge.from}`;

            if (!mstData.edges.get(edgeId) && !mstData.edges.get(reverseEdgeId)) {
                mstData.edges.add({
                    id: edgeId,
                    from: edge.from,
                    to: edge.to,
                    label: edge.weight.toString(),
                    dashes: true,
                    color: {color: "#FFA000", highlight: "#FFC107"}
                });
            }
        });

        // Update priority queue display
        if (stepData.priorityQueue.length === 0) {
            priorityQueueContent.innerHTML = "<p>Empty - all nodes are now in the MST</p>";
        } else {
            // Sort priority queue by weight for display
            const sortedQueue = [...stepData.priorityQueue].sort((a, b) => a.weight - b.weight);

            let queueHtml = "<ul>";
            sortedQueue.forEach(edge => {
                queueHtml += `<li>Edge (${edge.from}, ${edge.to}) with weight ${edge.weight}</li>`;
            });
            queueHtml += "</ul>";

            priorityQueueContent.innerHTML = queueHtml;
        }

        // Update MST edges table
        if (stepData.tableEntry) {
            // Check if row already exists
            const existingRows = mstEdgesTable.querySelectorAll("tr");
            let rowExists = false;

            existingRows.forEach(row => {
                if (row.cells[0].textContent == stepData.tableEntry.step) {
                    rowExists = true;
                }
            });

            if (!rowExists) {
                const row = document.createElement("tr");
                row.innerHTML = `
                        <td>${stepData.tableEntry.step}</td>
                        <td>${stepData.tableEntry.edge}</td>
                        <td>${stepData.tableEntry.weight}</td>
                        <td>${stepData.tableEntry.reason}</td>
                    `;

                if (stepData.tableEntry.step === algorithmSteps.length - 1) {
                    row.classList.add("mst-edge");
                    row.style.fontWeight = "bold";
                }

                mstEdgesTable.appendChild(row);
            }
        }

        // Update button states
        prevButton.disabled = currentStep === 0;
        nextButton.disabled = currentStep === algorithmSteps.length - 1;
    }

    // Event listeners for Demo tab
    prevButton.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            updateVisualization();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentStep < algorithmSteps.length - 1) {
            currentStep++;
            updateVisualization();
        }
    });

    restartButton.addEventListener("click", () => {
        currentStep = 0;
        mstEdgesTable.innerHTML = "";
        updateVisualization();
    });

    // Custom Graph Tab Functions
    const addNodeBtn = document.getElementById("add-node");
    const removeNodeBtn = document.getElementById("remove-node");
    const addEdgeBtn = document.getElementById("add-edge");
    const removeEdgeBtn = document.getElementById("remove-edge");
    const clearGraphBtn = document.getElementById("clear-graph");
    const loadDefaultBtn = document.getElementById("load-default");
    const runPrimsBtn = document.getElementById("run-prims");
    const startNodeSelect = document.getElementById("start-node");
    const customResultsDiv = document.getElementById("custom-results");
    const customMstEdgesTable = document.getElementById("custom-mst-edges").getElementsByTagName("tbody")[0];
    const customMstWeight = document.getElementById("custom-mst-weight");

    // Function to update start node selector
    function updateStartNodeSelect() {
        // Clear current options
        startNodeSelect.innerHTML = "";

        // Get all nodes from the custom graph
        const nodes = customData.nodes.get();

        // Add options for each node
        nodes.forEach(node => {
            const option = document.createElement("option");
            option.value = node.id;
            option.textContent = node.label;
            startNodeSelect.appendChild(option);
        });
    }

    // Add a new node to the custom graph
    addNodeBtn.addEventListener("click", () => {
        const nodeId = parseInt(document.getElementById("node-id").value);

        // Check if node already exists
        if (customData.nodes.get(nodeId)) {
            alert(`Node ${nodeId} already exists!`);
            return;
        }

        customData.nodes.add({
            id: nodeId,
            label: nodeId.toString()
        });

        updateStartNodeSelect();
    });

    // Remove a node from the custom graph
    removeNodeBtn.addEventListener("click", () => {
        const nodeId = parseInt(document.getElementById("node-id").value);

        try {
            customData.nodes.remove(nodeId);
            updateStartNodeSelect();
        } catch (error) {
            alert(`Failed to remove node ${nodeId}: ${error.message}`);
        }
    });

    // Add an edge to the custom graph
    addEdgeBtn.addEventListener("click", () => {
        const fromNode = parseInt(document.getElementById("edge-from").value);
        const toNode = parseInt(document.getElementById("edge-to").value);
        const weight = parseInt(document.getElementById("edge-weight").value);

        // Check if nodes exist
        if (!customData.nodes.get(fromNode)) {
            alert(`Node ${fromNode} does not exist! Please add it first.`);
            return;
        }

        if (!customData.nodes.get(toNode)) {
            alert(`Node ${toNode} does not exist! Please add it first.`);
            return;
        }

        // Check if edge already exists
        const edgeId = `${fromNode}-${toNode}`;
        const reverseEdgeId = `${toNode}-${fromNode}`;

        if (customData.edges.get(edgeId) || customData.edges.get(reverseEdgeId)) {
            alert(`Edge between nodes ${fromNode} and ${toNode} already exists!`);
            return;
        }

        // Add edge (undirected, so we only need one representation)
        customData.edges.add({
            id: edgeId,
            from: fromNode,
            to: toNode,
            label: weight.toString()
        });
    });

    // Remove an edge from the custom graph
    removeEdgeBtn.addEventListener("click", () => {
        const fromNode = parseInt(document.getElementById("edge-from").value);
        const toNode = parseInt(document.getElementById("edge-to").value);

        const edgeId = `${fromNode}-${toNode}`;
        const reverseEdgeId = `${toNode}-${fromNode}`;

        try {
            if (customData.edges.get(edgeId)) {
                customData.edges.remove(edgeId);
            } else if (customData.edges.get(reverseEdgeId)) {
                customData.edges.remove(reverseEdgeId);
            } else {
                alert(`Edge between nodes ${fromNode} and ${toNode} does not exist!`);
            }
        } catch (error) {
            alert(`Failed to remove edge: ${error.message}`);
        }
    });

    // Clear the custom graph
    clearGraphBtn.addEventListener("click", () => {
        customData.nodes.clear();
        customData.edges.clear();
        customResultsData.nodes.clear();
        customResultsData.edges.clear();
        customMstEdgesTable.innerHTML = "";
        customMstWeight.innerHTML = "";
        customResultsDiv.style.display = "none";
        updateStartNodeSelect();
    });

    // Define additional default graph options
    const graphOptionsData = {
        // Graph 1: All edges have distinct weights, no negative weights
        "distinct": {
            nodes: [
                {id: 0, label: "0"},
                {id: 1, label: "1"},
                {id: 2, label: "2"},
                {id: 3, label: "3"},
                {id: 4, label: "4"},
                {id: 5, label: "5"}
            ],
            edges: [
                {id: "0-1", from: 0, to: 1, label: "1"},
                {id: "0-2", from: 0, to: 2, label: "3"},
                {id: "1-2", from: 1, to: 2, label: "5"},
                {id: "1-3", from: 1, to: 3, label: "7"},
                {id: "2-3", from: 2, to: 3, label: "9"},
                {id: "2-4", from: 2, to: 4, label: "11"},
                {id: "3-4", from: 3, to: 4, label: "13"},
                {id: "3-5", from: 3, to: 5, label: "15"},
                {id: "4-5", from: 4, to: 5, label: "17"}
            ]
        },
        // Graph 2: Edges may have duplicate weights, no negative weights
        "duplicate": {
            nodes: [
                {id: 0, label: "0"},
                {id: 1, label: "1"},
                {id: 2, label: "2"},
                {id: 3, label: "3"},
                {id: 4, label: "4"},
                {id: 5, label: "5"}
            ],
            edges: [
                {id: "0-1", from: 0, to: 1, label: "4"},
                {id: "0-2", from: 0, to: 2, label: "2"},
                {id: "1-2", from: 1, to: 2, label: "4"}, // Duplicate weight of 4
                {id: "1-3", from: 1, to: 3, label: "6"},
                {id: "2-3", from: 2, to: 3, label: "8"},
                {id: "2-4", from: 2, to: 4, label: "2"}, // Duplicate weight of 2
                {id: "3-4", from: 3, to: 4, label: "6"}, // Duplicate weight of 6
                {id: "3-5", from: 3, to: 5, label: "4"}, // Duplicate weight of 4
                {id: "4-5", from: 4, to: 5, label: "8"}  // Duplicate weight of 8
            ]
        },
        // Graph 3: Some edges have negative weights
        "negative": {
            nodes: [
                {id: 0, label: "0"},
                {id: 1, label: "1"},
                {id: 2, label: "2"},
                {id: 3, label: "3"},
                {id: 4, label: "4"},
                {id: 5, label: "5"}
            ],
            edges: [
                {id: "0-1", from: 0, to: 1, label: "-3"},
                {id: "0-2", from: 0, to: 2, label: "5"},
                {id: "1-2", from: 1, to: 2, label: "7"},
                {id: "1-3", from: 1, to: 3, label: "-2"},
                {id: "2-3", from: 2, to: 3, label: "4"},
                {id: "2-4", from: 2, to: 4, label: "-4"},
                {id: "3-4", from: 3, to: 4, label: "6"},
                {id: "3-5", from: 3, to: 5, label: "-1"},
                {id: "4-5", from: 4, to: 5, label: "8"}
            ]
        },
        // Original default graph
        "original": {
            nodes: defaultNodes,
            edges: defaultEdges
        }
    };

    // Create dropdown for graph type selection
    const graphTypeSelect = document.createElement("select");
    graphTypeSelect.id = "graph-type";
    graphTypeSelect.className = "graph-type-select";

    // Add options to the select element
    const graphOptions = [
        { value: "original", label: "Original Graph" },
        { value: "distinct", label: "Distinct Weights Graph" },
        { value: "duplicate", label: "Duplicate Weights Graph" },
        { value: "negative", label: "Negative Weights Graph" }
    ];

    graphOptions.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        graphTypeSelect.appendChild(optionElement);
    });

    // Insert the select element before the load default button
    const loadDefaultBtnParent = loadDefaultBtn.parentNode;
    loadDefaultBtnParent.insertBefore(graphTypeSelect, loadDefaultBtn);

    // Modify the load default button click event
    // Modify the load default button click event
    loadDefaultBtn.addEventListener("click", () => {
        // Get the selected graph type
        const graphType = document.getElementById("graph-type").value;
        const selectedGraph = graphOptionsData[graphType];

        if (!selectedGraph) {
            alert("Invalid graph type selected.");
            return;
        }

        // Clean up any existing simulation results
        customResultsData.nodes.clear();
        customResultsData.edges.clear();
        customMstEdgesTable.innerHTML = "";
        customMstWeight.innerHTML = "";
        customResultsDiv.style.display = "none";

        // Remove any existing animation controls
        const existingControls = document.querySelector(".animation-controls");
        if (existingControls) {
            existingControls.remove();
        }

        // Clear existing data
        customData.nodes.clear();
        customData.edges.clear();

        // Add selected nodes and edges
        selectedGraph.nodes.forEach(node => {
            customData.nodes.add(node);
        });

        selectedGraph.edges.forEach(edge => {
            customData.edges.add(edge);
        });

        updateStartNodeSelect();

        // Show a message about the graph type
        let message = "";
        switch(graphType) {
            case "distinct":
                message = "Loaded graph with distinct edge weights (all positive).";
                break;
            case "duplicate":
                message = "Loaded graph with some duplicate edge weights (all positive).\n\nWhen there are edges with equal weights, there may be multiple valid minimum spanning trees for the graph. Different starting nodes or tie-breaking decisions might produce different tree structures.";
                break;
            case "negative":
                message = "Loaded graph with some negative edge weights. Note: Prim's algorithm works best with positive weights.";
                break;
            default:
                message = "Loaded original default graph.";
        }

        alert(message);
    });

    // Run Prim's algorithm on the custom graph
    runPrimsBtn.addEventListener("click", () => {
        const nodes = customData.nodes.get();
        const edges = customData.edges.get();

        // Check if there are nodes
        if (nodes.length === 0) {
            alert("Please add nodes to the graph first.");
            return;
        }

        // Check if there are edges
        if (edges.length === 0) {
            alert("Please add edges to the graph first.");
            return;
        }

        // Get starting node
        const startNodeId = parseInt(startNodeSelect.value);

        // Check for negative edges and warn the user
        const hasNegativeEdges = edges.some(edge => parseInt(edge.label) < 0);
        if (hasNegativeEdges) {
            const proceed = confirm("Warning: Your graph contains negative edge weights. Prim's algorithm assumes all edge weights are positive or zero.\n\nThe algorithm may still run, but the result might not be a true minimum spanning tree.\n\nDo you want to proceed anyway?");
            if (!proceed) {
                return;
            }
        }

        // Run Prim's algorithm
        const mst = runPrimsAlgorithm(startNodeId, nodes, edges);

        // Display results
        displayCustomResults(mst, startNodeId);
    });

    // Implementation of Prim's algorithm with step tracking
    function runPrimsAlgorithm(startNodeId, nodes, edges) {
        console.log(`Starting Prim's algorithm with node ${startNodeId}`);
        console.log(`Graph has ${nodes.length} nodes and ${edges.length} edges`);

        // Create adjacency list representation of the graph
        const graph = {};

        // Initialize graph with empty adjacency lists
        nodes.forEach(node => {
            graph[node.id] = [];
        });

        // Add edges to adjacency lists (undirected graph)
        edges.forEach(edge => {
            const weight = parseInt(edge.label);
            console.log(`Adding edge: ${edge.from} -- ${weight} --> ${edge.to}`);

            graph[edge.from].push({node: edge.to, weight});
            graph[edge.to].push({node: edge.from, weight});
        });

        console.log("Adjacency list representation:", JSON.stringify(graph, null, 2));


        // Set of nodes included in MST
        const mstNodes = new Set([startNodeId]);
        console.log(`Initial MST nodes: ${Array.from(mstNodes)}`);

        // List of edges in MST
        const mstEdges = [];

        // Priority queue (implemented as a simple array for this example)
        let priorityQueue = [];

        // Add all edges connected to the starting node to the priority queue
        console.log(`Adding edges connected to starting node ${startNodeId} to priority queue`);
        graph[startNodeId].forEach(edge => {
            priorityQueue.push({
                from: startNodeId,
                to: edge.node,
                weight: edge.weight
            });
            console.log(`  Added: ${startNodeId} -- ${edge.weight} --> ${edge.node}`);
        });

        // Track algorithm steps for animation
        const algorithmSteps = [];

        // Initial state
        algorithmSteps.push({
            description: `Initialize: Start with node ${startNodeId}. Add all edges connected to it to the priority queue.`,
            mstNodes: [...mstNodes],
            mstEdges: [],
            priorityQueue: [...priorityQueue],
            tableEntry: null
        });

        console.log("Initial algorithm step recorded");

        // While not all nodes are included in the MST and there are edges to consider
        let stepCounter = 0;
        while (mstNodes.size < nodes.length && priorityQueue.length > 0) {
            stepCounter++;
            console.log(`\n--- STEP ${stepCounter} ---`);

            // Sort priority queue by weight
            priorityQueue.sort((a, b) => a.weight - b.weight);
            console.log("Priority queue after sorting:", priorityQueue.map(e => `${e.from}->${e.to} (${e.weight})`).join(", "));


            // Get the minimum weight edge
            const minEdge = priorityQueue.shift();
            console.log(`Selected minimum edge: ${minEdge.from} -- ${minEdge.weight} --> ${minEdge.to}`);


            // If the destination node is already in the MST, skip this edge
            if (mstNodes.has(minEdge.to)) {
                console.log(`Node ${minEdge.to} is already in MST. Skipping this edge.`);
                continue;
            }

            // Add the destination node to the MST
            mstNodes.add(minEdge.to);
            console.log(`Added node ${minEdge.to} to MST. Current MST nodes: ${Array.from(mstNodes)}`);

            // Add the edge to the MST
            mstEdges.push(minEdge);
            console.log(`Added edge ${minEdge.from} -- ${minEdge.weight} --> ${minEdge.to} to MST`);

            // Save current state before adding new edges to priority queue
            const currentQueue = [...priorityQueue];

            // Add all edges connected to the newly added node to the priority queue
            let newEdges = [];
            console.log(`Finding edges connected to the newly added node ${minEdge.to}`);
            graph[minEdge.to].forEach(edge => {
                // Only add edges to nodes not yet in the MST
                if (!mstNodes.has(edge.node)) {
                    const newEdge = {
                        from: minEdge.to,
                        to: edge.node,
                        weight: edge.weight
                    };
                    priorityQueue.push(newEdge);
                    newEdges.push(newEdge);
                    console.log(`  Added to priority queue: ${minEdge.to} -- ${edge.weight} --> ${edge.node}`);
                } else {
                    console.log(`  Skipping edge to ${edge.node} (already in MST)`);
                }
            });

            // Add step to algorithm steps
            algorithmSteps.push({
                description: `Select edge (${minEdge.from}, ${minEdge.to}) with weight ${minEdge.weight}. Add node ${minEdge.to} to the MST.`,
                mstNodes: [...mstNodes],
                mstEdges: [...mstEdges],
                priorityQueue: [...priorityQueue],
                newNode: minEdge.to,
                newEdge: minEdge,
                tableEntry: {
                    step: algorithmSteps.length,
                    edge: `${minEdge.from} - ${minEdge.to}`,
                    weight: minEdge.weight,
                    reason: "Lowest weight edge that connects to a new node"
                }
            });
            console.log(`Recorded algorithm step ${algorithmSteps.length}`);
        }

        // Final step
        const totalMSTWeight = mstEdges.reduce((sum, edge) => sum + edge.weight, 0);
        algorithmSteps.push({
            description: `MST construction complete! All nodes are now included in the MST. Total weight: ${mstEdges.reduce((sum, edge) => sum + edge.weight, 0)}`,
            mstNodes: [...mstNodes],
            mstEdges: [...mstEdges],
            priorityQueue: [],
            tableEntry: {
                step: algorithmSteps.length,
                edge: "Complete",
                weight: mstEdges.reduce((sum, edge) => sum + edge.weight, 0),
                reason: "MST includes all nodes"
            }
        });

        console.log(`Recorded final algorithm step ${algorithmSteps.length}`);
        console.log(`\nMST construction complete! Total weight: ${totalMSTWeight}`);
        console.log(`Final MST edges:`, mstEdges);

        // Check if MST includes all nodes
        if (mstNodes.size < nodes.length) {
            console.error("Graph is not connected! Cannot find a spanning tree.");
            alert("The graph is not connected. Cannot find a spanning tree.");
            return null;
        }

        return {
            nodes: Array.from(mstNodes),
            edges: mstEdges,
            steps: algorithmSteps
        };
    }

    // Display the MST results for the custom graph with step-by-step animation
    function displayCustomResults(mst, startNodeId) {
        console.log("Displaying custom MST results for:", mst);
        console.log(`Start node: ${startNodeId}`);

        if (!mst) return;

        // Show results section
        customResultsDiv.style.display = "block";
        console.log("Showing custom results section");

        // Clear previous results
        customResultsData.nodes.clear();
        customResultsData.edges.clear();
        customMstEdgesTable.innerHTML = "";
        console.log("Cleared previous results data");

        // Remove any existing animation controls before adding new ones
        const existingControls = document.querySelector(".animation-controls");
        if (existingControls) {
            console.log("Removing existing animation controls");
            existingControls.remove();
        }

        // Create UI elements for animation controls
        console.log("Creating new animation controls");
        const animationControlsDiv = document.createElement("div");
        animationControlsDiv.className = "animation-controls";
        animationControlsDiv.innerHTML = `
            <div class="step-info">
                <span class="step-number">Step: <span id="custom-step-counter">0</span> of ${mst.steps.length - 1}</span>
                <div id="custom-step-description"></div>
            </div>
            <div class="controls">
                <button id="custom-prev-step" disabled>Previous Step</button>
                <button id="custom-next-step">Next Step</button>
                <button id="custom-play-pause">Play Animation</button>
                <button id="custom-restart">Restart</button>
            </div>
            <div class="priority-queue">
                <h3>Priority Queue (Edges being considered)</h3>
                <div id="custom-priority-queue-content"></div>
            </div>
        `;

        // Insert animation controls before the graph
        const customMstGraphContainer = document.getElementById("custom-mst-graph");
        console.log("Inserting animation controls into DOM");
        customMstGraphContainer.parentNode.insertBefore(animationControlsDiv, customMstGraphContainer);

        // Animation state
        let currentStep = 0;
        let isPlaying = false;
        let animationInterval = null;
        const animationSpeed = 1500; // milliseconds between steps
        console.log(`Animation speed set to ${animationSpeed}ms`);

        // Get animation control elements
        console.log("Getting DOM elements for animation controls");
        const customStepCounter = document.getElementById("custom-step-counter");
        const customStepDescription = document.getElementById("custom-step-description");
        const customPriorityQueueContent = document.getElementById("custom-priority-queue-content");
        const customPrevButton = document.getElementById("custom-prev-step");
        const customNextButton = document.getElementById("custom-next-step");
        const customPlayPauseButton = document.getElementById("custom-play-pause");
        const customRestartButton = document.getElementById("custom-restart");

        // Update the visualization based on the current step
        function updateCustomVisualization() {
            console.log(`\n=== Updating visualization for step ${currentStep} ===`);

            if (!mst.steps[currentStep]) {
                console.error(`No step data available for step ${currentStep}`);
                return;
            }

            customStepCounter.textContent = currentStep;
            customStepDescription.textContent = mst.steps[currentStep].description;
            console.log(`Step description: ${mst.steps[currentStep].description}`);

            // Clear previous data
            console.log("Clearing previous visualization data");
            customResultsData.nodes.clear();
            customResultsData.edges.clear();

            const stepData = mst.steps[currentStep];
            console.log("Current step data:", stepData);

            // Add nodes in MST
            console.log("Adding MST nodes to visualization");
            stepData.mstNodes.forEach(nodeId => {
                const node = {...customData.nodes.get(nodeId)};

                // Highlight the starting node
                if (nodeId === startNodeId) {
                    console.log(`Node ${nodeId} is starting node - highlighting in orange`);
                    node.color = {background: "#FF5722", border: "#E64A19"};
                }
                // Highlight the newly added node if any
                else if (stepData.newNode === nodeId) {
                    console.log(`Node ${nodeId} is newly added - highlighting in purple`);
                    node.color = {background: "#9C27B0", border: "#7B1FA2"};
                }
                else {
                    console.log(`Node ${nodeId} is in MST - showing in green`);
                    node.color = {background: "#4CAF50", border: "#2E7D32"};
                }

                customResultsData.nodes.add(node);
            });

            // Add edges in MST
            console.log("Adding MST edges to visualization");
            stepData.mstEdges.forEach(edge => {
                const isNewEdge = stepData.newEdge &&
                    edge.from === stepData.newEdge.from &&
                    edge.to === stepData.newEdge.to;

                if (isNewEdge) {
                    console.log(`Edge ${edge.from}-${edge.to} is newly added - highlighting in purple`);
                } else {
                    console.log(`Edge ${edge.from}-${edge.to} is in MST - showing in green`);
                }

                customResultsData.edges.add({
                    id: `${edge.from}-${edge.to}`,
                    from: edge.from,
                    to: edge.to,
                    label: edge.weight.toString(),
                    color: {
                        color: isNewEdge ? "#9C27B0" : "#2E7D32",
                        highlight: isNewEdge ? "#7B1FA2" : "#4CAF50"
                    },
                    width: isNewEdge ? 4 : 3
                });
            });

            // Add connected nodes not yet in MST (frontier)
            console.log("Adding frontier nodes (connected but not yet in MST)");
            const connectedNodeIds = new Set();
            stepData.priorityQueue.forEach(edge => {
                if (stepData.mstNodes.includes(edge.from) && !stepData.mstNodes.includes(edge.to)) {
                    connectedNodeIds.add(edge.to);
                    console.log(`Node ${edge.to} is in frontier (connected via ${edge.from})`);
                } else if (stepData.mstNodes.includes(edge.to) && !stepData.mstNodes.includes(edge.from)) {
                    connectedNodeIds.add(edge.from);
                    console.log(`Node ${edge.from} is in frontier (connected via ${edge.to})`);
                }
            });

            connectedNodeIds.forEach(nodeId => {
                if (!stepData.mstNodes.includes(nodeId)) {
                    const node = {...customData.nodes.get(nodeId)};
                    node.color = {background: "#FFC107", border: "#FFA000"};
                    customResultsData.nodes.add(node);
                }
            });

            // Add edges being considered (in priority queue)
            console.log("Adding frontier edges (in priority queue)");
            stepData.priorityQueue.forEach(edge => {
                const edgeId = `${edge.from}-${edge.to}`;
                const reverseEdgeId = `${edge.to}-${edge.from}`;

                if (!customResultsData.edges.get(edgeId) && !customResultsData.edges.get(reverseEdgeId)) {
                    console.log(`Adding frontier edge ${edge.from}-${edge.to} with weight ${edge.weight}`);
                    customResultsData.edges.add({
                        id: edgeId,
                        from: edge.from,
                        to: edge.to,
                        label: edge.weight.toString(),
                        dashes: true,
                        color: {color: "#FFA000", highlight: "#FFC107"}
                    });
                }
            });

            // Update priority queue display
            console.log("Updating priority queue display");
            if (stepData.priorityQueue.length === 0) {
                console.log("Priority queue is empty");
                customPriorityQueueContent.innerHTML = "<p>Empty - all nodes are now in the MST</p>";
            } else {
                // Sort priority queue by weight for display
                const sortedQueue = [...stepData.priorityQueue].sort((a, b) => a.weight - b.weight);
                console.log("Priority queue (sorted):", sortedQueue);


                let queueHtml = "<ul>";
                sortedQueue.forEach(edge => {
                    queueHtml += `<li>Edge (${edge.from}, ${edge.to}) with weight ${edge.weight}</li>`;
                });
                queueHtml += "</ul>";

                customPriorityQueueContent.innerHTML = queueHtml;
            }

            // Update MST edges table - update with each step instead of only at the end
            if (stepData.tableEntry && stepData.tableEntry.step < mst.steps.length - 1) {
                console.log("Updating MST edges table");
                // Only add a new row if it's a step that adds an edge (not the final summary step)
                const existingRows = customMstEdgesTable.querySelectorAll("tr");
                let rowExists = false;

                existingRows.forEach(row => {
                    // Check if this edge is already in the table
                    if (row.cells[0].textContent == stepData.newEdge?.from &&
                        row.cells[1].textContent == stepData.newEdge?.to) {
                        console.log(`Edge ${stepData.newEdge?.from}-${stepData.newEdge?.to} already in table`);
                        rowExists = true;
                    }
                });

                if (!rowExists && stepData.newEdge) {
                    console.log(`Adding edge ${stepData.newEdge.from}-${stepData.newEdge.to} to table`);
                    const row = document.createElement("tr");
                    row.innerHTML = `
                    <td>${stepData.newEdge.from}</td>
                    <td>${stepData.newEdge.to}</td>
                    <td>${stepData.newEdge.weight}</td>
                    `;

                    customMstEdgesTable.appendChild(row);

                    // Update the total weight if we're adding edges
                    const currentEdges = stepData.mstEdges;
                    const totalWeight = currentEdges.reduce((sum, edge) => sum + edge.weight, 0);
                    console.log(`Current total weight: ${totalWeight}`);
                    customMstWeight.innerHTML = `<p>Total weight of MST (current): <strong>${totalWeight}</strong></p>`;

                    // Check if there are duplicate edge weights and add a note
                    const edgeWeights = currentEdges.map(edge => edge.weight);
                    const uniqueWeights = new Set(edgeWeights);

                    if (edgeWeights.length !== uniqueWeights.size && !customMstWeight.innerHTML.includes("Note:")) {
                        console.log("Detected duplicate edge weights - adding note");
                        customMstWeight.innerHTML += `
                        <p><em>Note: This graph contains edges with equal weights. When there are edges with equal weights, there may be multiple valid minimum spanning trees for the graph. Different starting nodes or tie-breaking decisions might produce different tree structures.</em></p>`;
                    }
                }
            }

            // Update the final summary on the last step
            if (currentStep === mst.steps.length - 1) {
                console.log("Displaying final summary");
                const totalWeight = stepData.mstEdges.reduce((sum, edge) => sum + edge.weight, 0);
                customMstWeight.innerHTML = `<p>Total weight of MST (final): <strong>${totalWeight}</strong></p>`;

                // Check if there are duplicate edge weights and add a note
                const edgeWeights = stepData.mstEdges.map(edge => edge.weight);
                const uniqueWeights = new Set(edgeWeights);

                if (edgeWeights.length !== uniqueWeights.size && !customMstWeight.innerHTML.includes("Note:")) {
                    console.log("Detected duplicate edge weights - adding note to final summary");
                    customMstWeight.innerHTML += `
                    <p><em>Note: This graph contains edges with equal weights. When there are edges with equal weights, there may be multiple valid minimum spanning trees for the graph. Different starting nodes or tie-breaking decisions might produce different tree structures.</em></p>`;
                }
            }

            // Update button states
            console.log("Updating button states");
            customPrevButton.disabled = currentStep === 0;
            customNextButton.disabled = currentStep === mst.steps.length - 1;

            // If this is the last step and animation is playing, stop it
            if (currentStep === mst.steps.length - 1 && isPlaying) {
                console.log("Reached last step while animation is playing - stopping animation");
                stopAnimation();
            }

            console.log("Visualization update complete");
        }

        // Function to update the MST table is no longer needed since we update it on each step
        // Removed the updateFinalTable() function

        // Start animation
        function startAnimation() {
            console.log("startAnimation() called");

            if (!isPlaying) {
                console.log("Animation not currently playing");

                // If at the end or no more steps, restart first
                if (currentStep >= mst.steps.length - 1) {
                    console.log("At last step - restarting animation from beginning");
                    currentStep = 0;
                    customMstEdgesTable.innerHTML = "";
                    customMstWeight.innerHTML = "";
                    updateCustomVisualization();
                }

                isPlaying = true;
                customPlayPauseButton.textContent = "Pause Animation";
                console.log("Animation started");

                animationInterval = setInterval(() => {
                    if (currentStep < mst.steps.length - 1) {
                        console.log(`Animation interval: advancing to step ${currentStep + 1}`);
                        currentStep++;
                        updateCustomVisualization();
                    } else {
                        console.log("Animation interval: reached last step");
                        stopAnimation();
                    }
                }, animationSpeed);
            }
        }

        // Stop animation
        function stopAnimation() {
            console.log("stopAnimation() called");

            if (isPlaying) {
                isPlaying = false;
                customPlayPauseButton.textContent = "Play Animation";
                clearInterval(animationInterval);
                console.log("Animation stopped");
            }
        }

        // Event listeners for animation controls
        console.log("Setting up event listeners for animation controls");

        customPrevButton.addEventListener("click", () => {
            stopAnimation();
            if (currentStep > 0) {
                currentStep--;
                updateCustomVisualization();
            }
        });

        customNextButton.addEventListener("click", () => {
            console.log("Next button clicked");

            stopAnimation();
            if (currentStep < mst.steps.length - 1) {
                currentStep++;
                console.log(`Moving to next step: ${currentStep}`);
                updateCustomVisualization();
            }
        });

        customPlayPauseButton.addEventListener("click", () => {
            console.log("Play/Pause button clicked");
            if (isPlaying) {
                stopAnimation();
            } else {
                startAnimation();
            }
        });

        customRestartButton.addEventListener("click", () => {
            console.log("Restart button clicked");
            stopAnimation();
            currentStep = 0;
            // Clear the MST edges table
            customMstEdgesTable.innerHTML = "";
            customMstWeight.innerHTML = "";
            console.log("Cleared MST table and weights");
            updateCustomVisualization();
        });

        // Initialize visualization with the first step
        console.log("Initializing visualization with first step");
        updateCustomVisualization();
    }

    // Initialize the visualization for the default graph
    updateVisualization();

    // Initialize the custom graph with one node to start
    customData.nodes.add({id: 0, label: "0"});
    updateStartNodeSelect();


});