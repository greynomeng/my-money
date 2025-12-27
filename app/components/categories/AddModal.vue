<script setup>
import * as z from "zod";

const categoryStore = useCategoryStore();
const schema = z.object({
  name: z.string(),
  path: z.string()
});

const state = reactive({
  name: undefined,
  path: undefined
});

const open = ref(false);

const treeList = buildList(categoryStore.categories);

const onSubmit = () => {
  try {
    categoryStore.createCategpry(state);
  } catch (error) {
    console.log(error.message);
  }
  open.value = false;
};
</script>

<template>
  <UModal
    v-model:open="open"
    title="Add category"
    description="Add a new category to the system"
  >
    <UButton label="Add Category" icon="i-lucide:plus" />

    <template #body>
      <UForm :schema="schema" :state="state">
        <UFormField label="Select parent category" class="mb-8">
          <USelectMenu :items="treeList" v-model="state.path" class="w-full" />
        </UFormField>
        <UFormField label="New category name" name="name" class="mb-8">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2 mt-8">
          <UButton
            label="Cancel"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Create"
            color="primary"
            variant="solid"
            type="submit"
            @click="onSubmit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
