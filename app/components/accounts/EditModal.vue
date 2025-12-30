<script setup>
import * as z from "zod";
import { useAccountStore } from "#imports";

const props = defineProps({
  account: {
    type: Object
  }
});

const emit = defineEmits(["close"]);

const accountStore = useAccountStore();

const schema = z.object({
  accNo: z.string(),
  name: z.string(),
  owner: z.string(),
  type: z.string(),
  openingBalance: z.number().multipleOf(0.01), // until decimal number entry fixed
  currentBalance: z.number().multipleOf(0.01)
});

const open = ref(false);

const state = reactive(props.account);
// const state = reactive({
//   accNo: props.account.accNo,
//   name: props.account.name,
//   owner: props.account.owner,
//   type: props.account.type,
//   openingBalance: props.account.openingBalance,
//   currentBalance: props.account.currentBalance
// });

const toast = useToast();

async function onSubmit(event) {
  console.log("onSubmit(event):", state);
  // Update account
  try {
    accountStore.updateAccount(state);
  } catch (error) {
    console.log(error.message);
  } finally {
    emit("close", false);
  }

  open.value = false;
}

const onCancel = async () => {
  emit("close", false);
};
</script>

<template>
  <UModal
    v-model:open="open"
    title="Edit Account"
    description="Update an account"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="props.account"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Account No." placeholder="xxx-xxx" name="accno">
          <UInput v-model="state.accNo" class="w-full" />
        </UFormField>
        <UFormField label="Account Name" placeholder="xxx-xxx" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Owner(s)" placeholder="xxx-xxx" name="owner">
          <UInput v-model="state.owner" class="w-full" />
        </UFormField>
        <UFormField label="Account Type" placeholder="xxx-xxx" name="type">
          <USelect
            v-model="state.type"
            :items="['Asset', 'Liability']"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Opening Balance"
          placeholder="xxx-xxx"
          name="acc_opening_balance"
        >
          <UInputNumber
            v-model="state.openingBalance"
            :format-options="{
              style: 'currency',
              currency: 'AUD', // Use your desired currency code
              minimumFractionDigits: 2, // Default for currency, but good to be explicit
              maximumFractionDigits: 2
            }"
            :step="0.01"
            :increment="false"
            :decrement="false"
            icon="i-lucide-dollar-sign"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Current Balance"
          placeholder="xxx-xxx"
          name="acc_current_balance"
        >
          <UInputNumber
            v-model="state.currentBalance"
            :format-options="{
              style: 'currency',
              currency: 'AUD', // Use your desired currency code
              minimumFractionDigits: 2, // Default for currency, but good to be explicit
              maximumFractionDigits: 2
            }"
            :step="0.01"
            :increment="false"
            :decrement="false"
            icon="i-lucide-dollar-sign"
            class="w-full"
          />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="subtle"
            @click="onCancel()"
          />
          <UButton
            label="Update"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
