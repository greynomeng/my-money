<script setup>
import { AccountsEditModal } from "#components";
import { useAccountStore } from "#imports";

const accountStore = useAccountStore();

await accountStore.fetchAccounts();

const overlay = useOverlay(AccountsEditModal);

const handleSelect = (acc) => {
  const modal = overlay.create(AccountsEditModal, {
    props: {
      account: acc
    }
  });
  modal.open();
};

// Tree items
const assetItems = computed(() => {
  return accountStore.assetAccounts?.map((acc) => ({
    ...acc,
    label: acc.name,
    onSelect: () => {
      handleSelect(acc);
    }
  }));
});

const liabilityItems = computed(() => {
  return accountStore.liabilityAccounts?.map((acc) => ({
    ...acc,
    label: acc.name,
    onSelect: () => {
      handleSelect(acc);
    }
  }));
});

const treeItems = ref([
  {
    label: "Assets",
    defaultExpanded: true,
    children: assetItems
  },
  {
    label: "Liability",
    defaultExpanded: true,
    children: liabilityItems
  }
]);
</script>

<template>
  <UDashboardPanel id="accounts">
    <template #header>
      <UDashboardNavbar title="Accounts">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <AccountsAddModal />
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
