<script setup>
import { storeToRefs } from "#imports";
import { PayeesEditModal } from "#components";
import { usePayeeStore } from "#imports";

const payeeStore = usePayeeStore();
const { payees } = storeToRefs(payeeStore);

await payeeStore.fetchPayees();

// const data = payees;

const columns = [
  {
    accessorKey: "name",
    header: "Payee Name"
  }
];

const overlay = useOverlay(PayeesEditModal);

const handleEditPayee = (payee) => {
  const modal = overlay.create(PayeesEditModal, {
    props: {
      payee
    }
  });
  modal.open();
};

const handleDeletePayee = async (id) => {
  await payeeStore.deletePayee(id);
};

// Row context menu
const getRowItems = (row) => {
  return [
    {
      label: "Rename payee",
      icon: "lucide:edit",
      color: "primary",
      onSelect: () => {
        handleEditPayee({
          id: row.original.id,
          name: row.original.name
        });
      }
    },

    {
      label: "Merge payees",
      icon: "lucide:users-round",
      color: "neutral",
      onSelect: () => {
        console.log("Merge payees");
      }
    },
    {
      type: "separator"
    },
    {
      label: "Delete payee",
      icon: "lucide:trash-2",
      color: "error",
      onSelect: () => {
        handleDeletePayee(row.original._id);
      }
    }
  ];
};
const items = ref([]);

const onContextMenu = (_e, row) => {
  items.value = getRowItems(row);
};
</script>

<template>
  <UDashboardPanel id="payees">
    <template #header>
      <UDashboardNavbar title="Payees">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <PayeesAddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex">
        <UContextMenu :items="items">
          <UTable
            :data="payees"
            :columns="columns"
            @contextmenu="onContextMenu"
            :ui="{ tr: 'h-6' }"
          >
          </UTable>
        </UContextMenu>
      </div>
    </template>
  </UDashboardPanel>
</template>
