<script setup>
import { CategoriesAddModal } from "#components";
import { useCategoryStore } from "#imports";

const categoryStore = useCategoryStore();
await categoryStore.fetchCategories();

const treeItems = buildTree(categoryStore.categories, true);
</script>

<template>
  <UDashboardPanel id="categories">
    <template #header>
      <UDashboardNavbar title="Categories">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <CategoriesAddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex">
        <UTree :default-expanded="defaultExpandedItems" :items="treeItems" />
      </div>
    </template>
  </UDashboardPanel>
</template>
