<script setup>
const accountStore = useAccountStore();
accountStore.fetchAccounts();

const transactionStore = useTransactionStore();

const accountItems = computed(() => {
  return accountStore.accounts.map((acc) => ({
    ...acc,
    label: acc.name,
    value: acc.id
  }));
});

const selectedAccount = ref(null);

watch(selectedAccount, (newValue, oldValue) => {
  // console.log(`Selected value changed from "${oldValue}" to "${newValue}"`);
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

        <template #right>
          ADD TRANSACTION
          <!-- <AccountsAddModal /> -->
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
      </UDashboardToolbar>
    </template>

    <template #body>
      <pre>{{ selectedAccount }}</pre>
      <pre>{{ transactionStore.transactions }}</pre>
      <div class="flex">Transaction Table - Scrollable</div>
    </template>
    <template #footer>
      <div class="flex">Transaction Form</div>
    </template>
  </UDashboardPanel>
</template>
