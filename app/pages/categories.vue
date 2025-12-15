<script setup>
import { CategoriesAddModal } from "#components";
import { useCategoryStore } from "#imports";

const categoryStore = useCategoryStore();
categoryStore.fetchCategories();

const treeItems = buildTreeFromPaths(categoryStore.catNameList);

const overlay = useOverlay();
const modal = overlay.create(CategoriesAddModal);

const handleNewCategory = () => {
  const instance = modal.open();
  console.log("instance:", instance);
};
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
      <div class="flex">
        <UTree :items="treeItems" />
      </div>
    </template>
  </UDashboardPanel>
</template>
