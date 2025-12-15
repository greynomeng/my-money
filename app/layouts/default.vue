<script setup lang="ts">
const open = ref(false);

const links = [
  [
    {
      label: "Home",
      icon: "mdi:house-variant-outline",
      active: true,
      to: "/"
    },
    {
      label: "Accounts",
      icon: "lucide-lab:cabinet-filing",
      active: true,
      to: "/accounts"
    },
    {
      label: "Categories",
      icon: "lucide:tags",
      active: true,
      to: "/categories"
    },
    {
      label: "Payees",
      icon: "lucide:users-round",
      active: true,
      to: "/payees"
    },
    {
      label: "Ledgers",
      icon: "lucide:clipboard-list",
      active: true,
      to: "/ledgers"
    }
  ]
];
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          popover
        />
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[2]"
          orientation="vertical"
          tooltip
          popover
        />
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[3]"
          orientation="vertical"
          tooltip
          popover
        />
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>
