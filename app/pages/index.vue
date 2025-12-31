<script setup lang="ts">
import { h } from "vue";
import type { TableColumn, TableRow } from "@nuxt/ui";

const accountStore = useAccountStore();

accountStore.fetchAccounts();

type Account = {
  _id: string;
  name: string;
  currentBalance: number;
};

const assetData = computed(() => {
  return accountStore.accounts.filter((acc) => acc.type === "Asset");
  // .map((acc) => ({ ...acc, amount: acc.currentBalance }));
});

const liabilityData = computed(() => {
  return accountStore.accounts.filter((acc) => acc.type === "Liability");
});

const columns: TableColumn<Account>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "currentBalance",
    header: () => h("div", { class: "text-right" }, "Current Balance"),
    footer: ({ column }) => {
      const total = column
        .getFacetedRowModel()
        .rows.reduce(
          (acc: number, row: TableRow<Account>) =>
            acc + Number.parseFloat(row.getValue("currentBalance")),
          0
        );

      const formatted = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD"
      }).format(total);

      return h(
        "div",
        { class: "text-right font-medium" },
        `Total: ${formatted}`
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("currentBalance"));

      const formatted = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD"
      }).format(amount);

      return h("div", { class: "text-right font-medium" }, formatted);
    }
  }
];
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Home" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <h1 class="text-4xl">Assets and Liabilities Summary</h1>
      <!-- Use a div with flexbox classes to create two columns -->
      <div class="flex flex-1">
        <!-- Left Column -->
        <div class="w-1/2 p-8">
          <h3 class="font-semibold mb-2 text-2xl">Assets</h3>
          <UTable :data="assetData" :columns="columns" class="flex-1" />
        </div>

        <!-- Optional vertical separator -->
        <USeparator orientation="vertical" class="h-auto" />

        <!-- Right Column -->
        <div class="w-1/2 p-8">
          <h3 class="font-semibold mb-2 text-2xl">Liabilities</h3>
          <UTable :data="liabilityData" :columns="columns" class="flex-1" />
        </div>
      </div>
    </template>

    <template #footer>
      <!-- <div class="flex flex-1">
        <div class="w-1/2 p-8">Asset Total</div>
        <div class="w-1/2 p-8">Liabiity Total & Finale Total</div>
      </div> -->
    </template>
  </UDashboardPanel>
</template>
