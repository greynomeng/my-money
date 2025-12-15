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

  // getters
  const tableData = computed(() => {
    return transactions.value.map((trx) => {
      if (parseFloat(trx.amount) > 0) {
        return {
          ...trx,
          date: formattedDate(trx.date),
          payee: trx.payee_id.name,
          deposit: parseFloat(trx.amount)
        };
      } else if (parseFloat(trx.amount) < 0) {
        return {
          ...trx,
          date: formattedDate(trx.date),
          payee: trx.payee_id.name,
          payment: parseFloat(-trx.amount)
        };
      }
    });
  });

  return {
    transactions,
    transaction,
    fetchTransactions,
    tableData
  };
});
