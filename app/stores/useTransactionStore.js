import { defineStore } from "pinia";

export const useTransactionStore = defineStore("transaction", () => {
  // state
  const transactions = ref([]);
  const transaction = ref({});
  const loading = ref(false);
  const toast = useToast();

  // actions
  async function fetchTransactions(accountId) {
    loading.value = true;
    try {
      transactions.value = null;
      const response = await $fetch(`/api/transactions?account=${accountId}`);
      transactions.value = response.data;
    } catch (error) {
      toast.add({
        title: "Error",
        description: "Failed fetching transactions.",
        color: "error"
      });
    } finally {
      loading.value = false;
    }
  }

  return {
    transactions,
    transaction,
    fetchTransactions
  };
});
