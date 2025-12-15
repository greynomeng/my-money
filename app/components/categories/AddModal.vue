<script setup>
import * as z from "zod";
import { useCategoryStore } from "#imports";

const categoryStore = useCategoryStore();

const emit = defineEmits(["close"]);

const open = ref(false);

const schema = z.object({
  name: z.string()
});

const state = reactive({
  name: undefined
});

const resetForm = () => {
  state.name = "";
};

const handleSubmit = () => {
  try {
    categoryStore.createCategpry(state);
    resetForm();
  } catch (error) {
    console.log(error.message);
  }
  emit("close", true);
};
</script>

<template>
  <UModal
    v-model:open="open"
    title="New category"
    description="Add a new category to the database"
  >
    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-4">
        <UFormField
          label="Category Path (colon separated)"
          placeholder="xxx-xxx"
          name="pay_name"
        >
          <UInput v-model="state.name" class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="subtle"
            @click="emit('close', true)"
          />
          <UButton
            label="Create"
            color="primary"
            variant="solid"
            type="submit"
            @click="handleSubmit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
