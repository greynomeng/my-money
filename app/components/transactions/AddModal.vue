<script setup>
import * as z from "zod";

const open = ref(false);

defineProps({
  disabled: Boolean
});

const categoryStore = useCategoryStore();
categoryStore.fetchCategories();
const listItems = buildList(categoryStore.categories);

const schema = z.object({
  date: z.string(),
  payeeId: z.string(),
  categoryId: z.string()
});

const state = reactive({
  date: "",
  payeeId: "",
  categoryId: ""
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

    <template #body>
      <UForm :schema="state" :state="state" @submit="onSubmit">
        <UFormField label="Category">
          <USelectMenu :items="listItems" v-model="state.path" class="w-full" />
        </UFormField>
      </UForm>
    </template>
  </UModal>
</template>
