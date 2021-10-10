<template>
  <Template
    ref="form"
    :formFields="formFields"
    :rules="rules"
    :disableForm="loading"
    @submit="handleSubmit"
  >
    <template #header>
      <n-button type="info" style="margin-bottom: 15px" @click="generateFakeData">Generate Fake Data</n-button>
    </template>

    <template #action="{ validate }">
      <n-button :loading="loading" @click="validate">
        Create Customer
      </n-button>
    </template>
  </Template>
</template>

<script>
import Template from "./template.vue";
import CustomerMixin from "@/mixins/customers";
import { useLoadingBar, useMessage, NButton } from "naive-ui";
import { createCustomer } from "@/api/module/customers";

export default {
  mixins: [CustomerMixin],
  components: {
    Template,
    NButton,
  },
  data() {
    return {
      loading: false,
      loadingBar: useLoadingBar(),
      message: useMessage(),
    };
  },
  methods: {
    async handleSubmit(formValues) {
      try {
        this.loading = true;
        this.loadingBar.start();
        await createCustomer({ ...formValues });
        this.loadingBar.finish();
        this.message.success("Customer created");
        this.$refs.form.reset();
      } catch (error) {
        this.loadingBar.error();

        const { errors = [] } = error.response.data;

        //notify user which parameters are invalid
        if (errors && errors.length > 0)
          this.message.error(
            errors.map((error) => `${error.param}: ${error.msg}`)[0]
          );
      } finally {
        this.loading = false;
      }
    },
    generateFakeData() {
      const { model } = this.$refs.form;

      for (let i = 0; i < this.formFields.length; i++) {
        const { name, fake } = this.formFields[i];
        model[name] = fake();
      }
    },
  },
};
</script>

<style>
</style>