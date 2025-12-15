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
    accessorKey: "",
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
        <template #right>ADD TRANSACTION</template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex">
        <UTable :columns="columns" :data="transactionStore.tableData" />
      </div>
    </template>
    <template #footer>
      <div class="flex">Transaction Form</div>
    </template>
  </UDashboardPanel>
</template>
