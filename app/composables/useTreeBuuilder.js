export const useTreeBuilder = () => {
  const buildTree = (items, parent = null) => {
    return items
      .filter((item) => item.parent === parent)
      .map((item) => ({
        ...item,
        label: item.name,
        children: buildTree(items, item._id)
      }));
  };
  return { buildTree };
};
