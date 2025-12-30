<script setup>
import * as z from "zod";

const accountStore = useAccountStore();

const schema = z.object({
  accNo: z.string(),
  name: z.string(),
  owner: z.string(),
  type: z.string(),
  openingBalance: z.number().multipleOf(0.01),
  currentBalance: z.number().multipleOf(0.01)
});

const open = ref(false);

const state = reactive({
  accNo: "",
  name: "",
  owner: "",
  type: "",
  openingBalance: null,
  currentBalance: null
});

const resetForm = () => {
  state.accNo = "";
  state.name = "";
  state.owner = "";
  state.type = "";
  state.openingBalance = null;
  state.currentBalance = null;
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
        <UFormField label="Account No." placeholder="xxx-xxx" name="accNo">
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
          name="openingBalance"
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
          name="currentBalance"
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
