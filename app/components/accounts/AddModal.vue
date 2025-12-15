<script setup>
import * as z from "zod";
import { useAccountStore } from "#imports";

const accountStore = useAccountStore();

const schema = z.object({
  accno: z.string(),
  name: z.string(),
  owner: z.string(),
  type: z.string(),
  opening_balance: z.string(),
  current_balance: z.string() // until decimal number entry fixed
  // acc_opening_balance: z.number().multipleOf(0.01)
});

const open = ref(false);

const state = reactive({
  accno: "",
  name: "",
  owner: "",
  type: "",
  opening_balance: "",
  current_balance: ""
});

const resetForm = () => {
  state.accno = "";
  state.name = "";
  state.owner = "";
  state.type = "";
  state.opening_balance = "";
  state.current_balance = "";
};

const toast = useToast();

async function onSubmit(event) {
  try {
    accountStore.createAccount(state);
    resetForm();
  } catch (error) {
    console.log(error.message);
  }
  open.value = false;
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="New account"
    description="Add a new account to the database"
  >
    <UButton label="New account" icon="i-lucide-plus" />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Account No." placeholder="xxx-xxx" name="accno">
          <UInput v-model="state.accno" class="w-full" />
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
          name="opening_balance"
        >
          <UInput v-model="state.opening_balance" class="w-full" />
        </UFormField>
        <UFormField
          label="Current Balance"
          placeholder="xxx-xxx"
          name="current_balance"
        >
          <UInput v-model="state.current_balance" class="w-full" />
        </UFormField>
        <!-- 
          Decimal/Currency loose the decimal bits
          Use string instead and convert programmatically
          -->
        <!--   <UFormField
            label="Opening Balance"
            placeholder="xxx-xxx"
            name="acc_opening_balance"
          >    
          <UInputNumber
            v-model="state.acc_opening_balance"
            :format-options="{
              signDisplay: 'exceptZero',
              style: 'currency',
              currency: 'AUD',
              currencyDisplay: 'code',
              currencySign: 'accounting',
              minimumFractionDigits: 2
            }"
            class="w-full"
          /> 
        </UFormField>-->
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
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
