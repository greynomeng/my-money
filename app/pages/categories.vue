<script setup>
import { contextMenu } from "#build/ui";
import { useCategoryStore } from "#imports";

const categoryStore = useCategoryStore();
categoryStore.fetchCategories();

const buildTree = (items, parent = null) => {
  console.log(items);
  return items
    .filter((item) => item.parent === parent)
    .map((item) => ({
      ...item,
      label: item.name,
      onSelect: (event, item) => handleSelect(event, item),
      children: buildTree(items, item._id)
    }));
};

const treeItems = buildTree(categoryStore.categories);

const handleSelect = (item) => {
  console.log("item:", item);
};

// Context Menu Stuff
// Define the actions for the context menu
const getContextMenuItems = (node) => [
  [
    {
      label: "Add category",
      icon: "i-lucide-plus",
      onSelect: () => handleSelect(node)
    }
  ],
  [
    {
      label: "Delete category",
      icon: "i-lucide-trash",
      color: "error",
      onSelect: () => console.log("Deleting:", node.label)
    }
  ]
];
</script>

<template>
  <UDashboardPanel id="categories">
    <template #header>
      <UDashboardNavbar title="Categories">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UTree :items="treeItems">
        <template #item="{ item }">
          <!-- Wrap the tree item in the context menu -->
          <UContextMenu
            v-if="item.name !== 'Categories'"
            :items="getContextMenuItems(item)"
            class="w-full"
          >
            <div
              class="flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <UIcon
                :name="item.children ? 'i-lucide-folder' : 'i-lucide-file'"
              />
              <span>{{ item.label }}</span>
            </div>
          </UContextMenu>
        </template>
      </UTree>
    </template>
  </UDashboardPanel>
</template>
