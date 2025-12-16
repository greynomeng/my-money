<script setup>
const open = ref(false);
defineProps({
  disabled: Boolean
});
</script>

<template>
  <UModal
    v-model:open="open"
    title="New transaction"
    description="Add a new transaction to the account"
  >
    <UButton
      label="New transaction"
      icon="i-lucide-plus"
      :disabled="disabled"
    />
  </UModal>
</template>
