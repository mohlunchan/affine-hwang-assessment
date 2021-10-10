<template>
  <Template
    ref="form"
    :formFields="computedFormFields"
    :rules="rules"
    :defaultValues="defaultValues"
    @submit="handleSubmit"
  >
    <template v-slot:submit="{ loading }">
      <template v-if="!loading">Update Customer</template>
      <template v-else>Submitting..</template>
    </template>
  </Template>
</template>

<script>
import Template from "./template.vue";
import CustomerMixin from "@/mixins/customers";
import { useLoadingBar, useMessage } from "naive-ui";
import { updateCustomer, getCustomer } from "@/api/module/customers";

export default {
  mixins: [CustomerMixin],
  components: {
    Template,
  },
  data() {
    return {
      defaultValues: {},
      loadingBar: useLoadingBar(),
      message: useMessage(),
    };
  },
  computed: {
    computedFormFields() {
      //we can set certain fields with extra attributes

      return this.formFields.map((field) => {
        const item = { ...field };

        if (item.name === "email") item.attrs.readonly = true;

        return {
          ...item,
        };
      });
    },
  },
  methods: {
    async handleSubmit(formValues) {
      try {
        this.loadingBar.start();
        const data = { ...formValues, uuid: this.$route.params.id };
        delete data.email;
        await updateCustomer(data);
        this.loadingBar.finish();
        this.message.success("Customer details updated");
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
    setDefaultValues(data) {
      //we only take the values that are indicated in the formFields
      for (let i = 0; i < this.formFields.length; i++) {
        const { name } = this.formFields[i];
        this.defaultValues[name] = data[name];
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    getCustomer(to.params.id)
      .then((response) => {
        next((vm) => vm.setDefaultValues({ ...response.data }));
      })
      .catch((error) => {
        const { status } = error.response;

        if (status == 404)
          next({
            path: "/404",
          });
      });
  },
};
</script>

<style>
</style>