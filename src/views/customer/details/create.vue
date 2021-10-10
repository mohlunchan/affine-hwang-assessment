<template>
  <Template
    ref="form"
    :formFields="formFields"
    :rules="rules"
    @submit="handleSubmit"
  >
    <template v-slot:submit="{ loading }">
      <template v-if="!loading">Create Customer</template>
      <template v-else>Submitting..</template>
    </template>
  </Template>
</template>

<script>
import Template from "./template.vue";
import CustomerMixin from "@/mixins/customers";
import { useLoadingBar, useMessage } from "naive-ui";
import { createCustomer } from "@/api/module/customers";

export default {
  mixins: [CustomerMixin],
  components: {
    Template,
  },
  data() {
    return {
      loadingBar: useLoadingBar(),
      message: useMessage(),
    };
  },
  methods: {
    async handleSubmit(formValues) {
      try {
        this.loadingBar.start();
        await createCustomer({ ...formValues });
        this.loadingBar.finish();
        this.message.success("Customer created");
      } catch (error) {
        this.loadingBar.error();

        const { errors = [] } = error.response.data;

        //notify user which parameters are invalid
        if (errors && errors.length > 0)
          this.message.error(
            `Invalid value for parameter(s) : ${errors
              .map((error) => error.param)
              .join(",")}`
          );
      } finally {
        this.$refs.form.loading = false;
      }
    },
  },
};
</script>

<style>
</style>