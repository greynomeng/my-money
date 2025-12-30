<script setup>
import { CategoriesAddModal } from "#components";
import { useCategoryStore } from "#imports";

const categoryStore = useCategoryStore();
await categoryStore.fetchCategories();

const catLength = computed(() => {
  return categoryStore.categories.length;
});

let treeItems = buildTree(categoryStore.categories, true);

watch(catLength, async (newValue, oldValue) => {
  console.log("newValue:", newValue, "- oldValue:", oldValue);

  await nextTick();
  await categoryStore.fetchCategories();
  treeItems = buildTree(categoryStore.categories, true);
});
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
        <UTree :items="treeItems" />
      </div>
    </template>
  </UDashboardPanel>
</template>
