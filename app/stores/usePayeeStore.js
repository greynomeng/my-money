import { defineStore } from "pinia";
import Categories from "~/pages/categories.vue";

export const usePayeeStore = defineStore("payee", () => {
  const toast = useToast();

  // state
  const payees = ref([]);
  const payee = ref({});
  const loading = ref(false);

  // actions
  async function fetchPayees() {
    loading.value = true;
    try {
      const response = await $fetch("/api/payees");
      payees.value = response.data;
    } catch (error) {
      toast.add({
        title: "Error",
        description: "Failed fetching payees.",
        color: "error"
      });
    } finally {
      loading.value = false;
    }
  }

  async function createPayee(data) {
    loading.value = true;
    try {
      const response = await $fetch("/api/payees", {
        method: "POST",
        body: data
      });

      toast.add({
        title: "Success",
        description: "Payee created.",
        color: "success"
      });
    } catch (error) {
      console.log("FAIL");
      toast.add({
        title: "Error",
        description: error.message,
        color: "error"
      });
    } finally {
      fetchPayees();
      loading.value = false;
    }
  }

  async function updatePayee(data) {
    console.log("updatePayee:", data);
    try {
      const updatedPayee = await $fetch(`/api/payees/${data.id}`, {
        method: "PUT",
        body: data
      });
      fetchPayees();

      toast.add({
        title: "Success",
        description: "Payee updated.",
        color: "success"
      });
    } catch (error) {
      toast.add({
        title: "Error",
        description: "Failed updating payee.",
        color: "error"
      });
    } finally {
      await fetchPayees();
      loading.value = false;
    }
  }

  async function deletePayee(id) {
    try {
      await $fetch(`/api/payees/${id}`, {
        method: "DELETE"
      });

      toast.add({
        title: "Success",
        description: "Payee deleted.",
        color: "success"
      });
    } catch (error) {
      console.log(error);
    } finally {
      await fetchPayees();
    }
  }

  return {
    loading,
    payee,
    payees,
    fetchPayees,
    createPayee,
    updatePayee,
    deletePayee
  };
});
