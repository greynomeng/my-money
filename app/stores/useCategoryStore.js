import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", () => {
  const toast = useToast();

  // state
  const categories = ref([]);
  const category = ref({});
  const loading = ref(false);

  // actions
  async function fetchCategories() {
    loading.value = true;
    try {
      const response = await $fetch("/api/categories");
      categories.value = response.data;
    } catch (error) {
      toast.add({
        title: "Error",
        description: "Failed fetching categories.",
        color: "error"
      });
    } finally {
      loading.value = false;
    }
  }

  async function createCategpry(data) {
    loading.value = true;
    try {
      const response = await $fetch("/api/categories", {
        method: "POST",
        body: data
      });

      toast.add({
        title: "Success",
        description: "Category created.",
        color: "success"
      });
    } catch (error) {
      toast.add({
        title: "Error",
        description: error.message,
        color: "error"
      });
    } finally {
      loading.value = false;
    }
  }

  async function deleteCategory(id) {
    try {
      await $fetch(`/api/categories/${id}`, {
        method: "DELETE"
      });

      toast.add({
        title: "Success",
        description: "Category deleted.",
        color: "success"
      });
    } catch (error) {
      console.log(error);
    } finally {
      await fetchCategories();
    }
  }

  // getters
  const catNameList = computed(() => {
    return categories.value.map((c) => c.name);
  });

  return {
    categories,
    category,
    catNameList,
    fetchCategories,
    createCategpry,
    deleteCategory
  };
});
