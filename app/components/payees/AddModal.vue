<script setup>
import * as z from "zod";
import { usePayeeStore } from "#imports";

const payeeStore = usePayeeStore();

const schema = z.object({
  name: z.string()
});

const open = ref(false);

const state = reactive({
  name: undefined
});

async function onSubmit(event) {
  try {
    payeeStore.createPayee(state);
  } catch (error) {
    console.log(error.message);
  }
  open.value = false;
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="New payee"
    description="Add a new payee to the database"
  >
    <UButton label="New payee" icon="i-lucide-plus" />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Payee Name" placeholder="xxx-xxx" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
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
