<script setup>
import { CategoriesAddModal } from "#components";
import { useCategoryStore } from "#imports";
import { useTreeBuilder } from "~/composables/useTreeBuuilder";
// import { buildTree } from "#imports";

const categoryStore = useCategoryStore();
categoryStore.fetchCategories();

const treeBuilder = useTreeBuilder();
const expenseTreeItems = treeBuilder.buildTree(categoryStore.expenseCategories);
console.log(expenseTreeItems);

const overlay = useOverlay();
const modal = overlay.create(CategoriesAddModal);

const handleNewCategory = () => {
  const instance = modal.open();
  console.log("instance:", instance);
};

const handleSelect = (cat) => {};

const treeItems = ref([
  // {
  //   label: "Income",
  //   deffaultExpanded: true,
  //   children: incomeItems
  // },
  {
    label: "Expense",
    deffaultExpanded: true,
    children: expenseTreeItems
  }
]);
</script>

<template>
  <UDashboardPanel id="categories">
    <template #header>
      <UDashboardNavbar title="Categories">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            label="New Category"
            icon="i-lucide-plus"
            @click="handleNewCategory"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex"><UTree :items="treeItems" /></div>
    </template>
  </UDashboardPanel>
</template>
