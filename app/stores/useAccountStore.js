import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", () => {
  const toast = useToast();

  // state
  const accounts = ref([]);
  const account = ref({});
  const loading = ref(false);

  // actions
  async function fetchAccounts() {
    loading.value = true;
    try {
      const response = await $fetch("/api/accounts");
      accounts.value = response.data;
    } catch (error) {
      toast.add({
        title: "Error",
        description: "Failed fetching accounts.",
        color: "error"
      });
    } finally {
      loading.value = false;
    }
  }

  async function createAccount(data) {
    loading.value = true;
    try {
      const response = await $fetch("/api/accounts", {
        method: "POST",
        body: data
      });
      toast.add({
        title: "Success",
        description: "Account created.",
        color: "success"
      });
      return response;
    } catch (error) {
      toast.add({
        title: "Error",
        description: "Failed creating account.",
        color: "error"
      });
    } finally {
      fetchAccounts();
      loading.value = false;
    }
  }

  async function updateAccount(data) {
    try {
      const response = await $fetch(`/api/accounts/${data.id}`, {
        method: "PUT",
        body: data
      });

      fetchAccounts();
      toast.add({
        title: "Success",
        description: "Account  updated.",
        color: "success"
      });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  // getters
  const assetAccounts = computed(() => {
    return accounts.value?.filter((acc) => acc.type === "Asset");
  });

  const liabilityAccounts = computed(() => {
    return accounts.value?.filter((acc) => acc.type === "Liability");
  });

  return {
    loading,
    account,
    accounts,
    fetchAccounts,
    createAccount,
    updateAccount,
    assetAccounts,
    liabilityAccounts
  };
});
