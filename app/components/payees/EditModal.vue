<script setup>
import * as z from "zod";
import { usePayeeStore } from "#imports";

const props = defineProps({
  payee: {
    type: Object
  }
});

const emit = defineEmits(["close"]);

const payeeStore = usePayeeStore();

const schema = z.object({
  name: z.string()
});

const open = ref(false);

const toast = useToast();

async function onSubmit(event) {
  try {
    payeeStore.updatePayee(props.payee);
  } catch (error) {
    console.log(error.message);
  } finally {
    payeeStore.fetchPayees();
    emit("close", false);
  }
  open.value = false;
}

const onCancel = async () => {
  emit("close", false);
};
</script>

<template>
  <UModal v-model:open="open" title="Edit payee" description="Update payee">
    <template #body>
      <UForm
        :schema="schema"
        :state="props.payee"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Payee Name" placeholder="xxx-xxx" name="name">
          <UInput v-model="payee.name" class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="subtle"
            @click="onCancel()"
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
