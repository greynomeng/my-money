<script setup>
const accountStore = useAccountStore();
accountStore.fetchAccounts();

const transactionStore = useTransactionStore();

const accountItems = computed(() => {
  return accountStore.accounts.map((acc) => ({
    ...acc,
    label: acc.name,
    value: acc._id
  }));
});

const selectedAccount = ref(null);

const columns = [
  {
    accessorKey: "date",
    header: "Date"
  },
  {
    accessorKey: "payee",
    header: "Details"
  },
  {
    accessorKey: "payment",
    header: "Payment"
  },
  {
    accessorKey: "deposit",
    header: "Deposit"
  },
  {
    accessorKey: "balance",
    header: "Balance"
  }
];

watch(selectedAccount, async (newValue, oldValue) => {
  // console.log(`Selected value changed from "${oldValue}" to "${newValue}"`);

  // Added nextTick() to ensure select closes when fetching from store.
  await nextTick();
  transactionStore.fetchTransactions(newValue);
});
</script>

<template>
  <UDashboardPanel id="ledgers">
    <template #header>
      <UDashboardNavbar title="Ledgers">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <USelect
            :items="accountItems"
            v-model="selectedAccount"
            class="w-96"
          />
        </template>
        <template #right>
          <TransactionsAddModal :disabled="selectedAccount === null" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex mt-8">
        <UTable :columns="columns" :data="transactionStore.tableData">
          <template #payment-cell="{ row }">
            <div class="flex justify-end">
              {{ row.original.payment }}
            </div>
          </template>
          <template #deposit-cell="{ row }">
            <div class="flex justify-end">
              {{ row.original.deposit }}
            </div>
          </template>
          <template #balance-cell="{ row }">
            <div class="flex justify-end">
              {{ row.original.balance }}
            </div>
          </template>
        </UTable>
      </div>
      <!-- <pre>{{ transactionStore.tableData }}</pre> -->
    </template>
  </UDashboardPanel>
</template>
