export function buildTreeFromPaths(paths) {
  const tree = [];
  const map = new Map(); // A map to hold references to existing nodes

  paths.forEach((path) => {
    const parts = path.split(":"); // Split the path by the colon separator
    let currentLevel = tree; // Start at the root level for each path

    parts.forEach((part, index) => {
      // Check if a node with this name already exists in the current level
      let node = currentLevel.find((item) => item.label === part);

      if (!node) {
        // If not found, create a new node
        node = { label: part };
        // If it's not the last part of the path, it needs a 'children' array
        if (index < parts.length - 1) {
          node.children = [];
        }
        currentLevel.push(node); // Add the new node to the current level
      }

      // Move the 'currentLevel' reference to the children of the current node
      // for the next iteration (unless it's a leaf node)
      if (node.children) {
        currentLevel = node.children;
      }
    });
  });

  return tree;
}
