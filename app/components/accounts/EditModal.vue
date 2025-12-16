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
  openingBalance: z.string(), // until decimal number entry fixed
  currentBalance: z.number().multipleOf(0.01)
});

const open = ref(false);

const toast = useToast();

async function onSubmit(event) {
  // Update account
  try {
    accountStore.updateAccount(props.account);
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
          <UInput v-model="account.accNo" class="w-full" />
        </UFormField>
        <UFormField label="Account Name" placeholder="xxx-xxx" name="name">
          <UInput v-model="account.name" class="w-full" />
        </UFormField>
        <UFormField label="Owner(s)" placeholder="xxx-xxx" name="owner">
          <UInput v-model="account.owner" class="w-full" />
        </UFormField>
        <UFormField label="Account Type" placeholder="xxx-xxx" name="type">
          <USelect
            v-model="account.type"
            :items="['Asset', 'Liability']"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Opening Balance"
          placeholder="xxx-xxx"
          name="acc_opening_balance"
        >
          <UInput
            type="number"
            v-model="account.openingBalance"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Current Balance"
          placeholder="xxx-xxx"
          name="acc_current_balance"
        >
          <UInput
            type="number"
            v-model="account.currentBalance"
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
            @click="onCancel()"
          />
          <UButton
            label="Update"
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
