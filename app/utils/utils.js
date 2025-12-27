export const buildList = (items) => {
  return items
    .map(
      (item) =>
        (item.path = item.path ? `${item.path}:${item.name}` : item.name)
    )
    .sort();
};

// Function to build tree from flat array with materialized paths
export const buildTree = (items, expanded = false) => {
  // Map to hold references to all nodes, keyed by their _id
  const nodes = {};
  const tree = [];

  items.forEach((item) => {
    // Initialize the node structure with a children array
    nodes[item.name] = {
      ...item,
      label: item.name,
      defaultExpanded: expanded,
      children: []
    };
  });

  items.forEach((item) => {
    const node = nodes[item.name];
    const parentPath = item.path;

    if (parentPath === null || parentPath === undefined) {
      // Root node has no parent path, so add it to the main tree array
      tree.push(node);
    } else {
      // Extract the parent ID from the path string
      // Example path: ",Books,Programming," -> parent IDs: ["Books", "Programming"]
      // The direct parent is the last non-empty part of the path
      // const pathParts = parentPath.split(":").filter((part) => part.length > 0);
      const pathParts = parentPath.split(":");
      const parentId = pathParts[pathParts.length - 1];

      // Find the parent in the nodes map and push the current node into its children
      if (nodes[parentId]) {
        nodes[parentId].children.push(node);
      } else {
        // Handle potential data integrity issues (parent not found)
        console.warn(
          `Parent with ID ${parentId} not found for node ${item.name}`
        );
      }
    }
  });

  return tree;
};

// Date formatting
import { useDateFormat } from "@vueuse/core";

export function formattedDate(date) {
  return useDateFormat(date, "D MMM, YYYY").value;
}

// export function buildTree(items, parent) {
//   return items
//     .filter((item) => item.parent === parent)
//     .map((item) => {
//       console.log("item:", item);
//       const children = buildTree(items, item._id.toString());
//       const treeItem = {
//         label: item.name,
//         id: item._id.toString()
//         // Add defaultExpanded: true if you want items initially open
//       };

//       if (children.length > 0) {
//         treeItem.children = children;
//       }

//       return treeItem;
//     });
// }

// export function buildTreeFromPaths(paths) {
//   const tree = [];
//   const map = new Map(); // A map to hold references to existing nodes

//   paths.forEach((path) => {
//     const parts = path.split(":"); // Split the path by the colon separator
//     let currentLevel = tree; // Start at the root level for each path

//     parts.forEach((part, index) => {
//       // Check if a node with this name already exists in the current level
//       let node = currentLevel.find((item) => item.label === part);

//       if (!node) {
//         // If not found, create a new node
//         node = { label: part };
//         // If it's not the last part of the path, it needs a 'children' array
//         if (index < parts.length - 1) {
//           node.children = [];
//         }
//         currentLevel.push(node); // Add the new node to the current level
//       }

//       // Move the 'currentLevel' reference to the children of the current node
//       // for the next iteration (unless it's a leaf node)
//       if (node.children) {
//         currentLevel = node.children;
//       }
//     });
//   });

//   return tree;
// }
