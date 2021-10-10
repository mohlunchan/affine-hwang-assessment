<template>
  <Template
    ref="form"
    :formFields="computedFormFields"
    :rules="rules"
    :defaultValues="defaultValues"
    :disableForm="loading"
    @submit="handleUpdate"
  >
    <template #action="{ validate }">
      <template v-if="!loading">
        <n-button style="margin-right: 8px" @click="validate"
          >Update Customer</n-button
        >
        <n-button type="error" @click="handleDelete">Delete</n-button>
      </template>

      <template v-if="loading">
        <n-button :loading="loading"></n-button>
      </template>
    </template>
  </Template>
</template>

<script>
import Template from "./template.vue";
import CustomerMixin from "@/mixins/customers";
import { useLoadingBar, useMessage, NButton } from "naive-ui";
import {
  updateCustomer,
  getCustomer,
  deleteCustomer,
} from "@/api/module/customers";

export default {
  mixins: [CustomerMixin],
  components: {
    Template,
    NButton,
  },
  data() {
    return {
      defaultValues: {},
      loadingBar: useLoadingBar(),
      message: useMessage(),
      loading: false,
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
    async handleDelete() {
      this.handleSubmit(
        async () => {
          return deleteCustomer(this.$route.params.id);
        },
        () => {
          this.message.success("Customer deleted");
          this.$router.go(-1);
        }
      );
    },
    handleUpdate(formValues) {
      this.handleSubmit(
        () => {
          const data = { ...formValues, uuid: this.$route.params.id };
          delete data.email;
          return updateCustomer(data);
        },
        () => {
          this.message.success("Customer details updated");
        }
      );
    },
    async handleSubmit(fn = () => {}, successCb = () => {}) {
      try {
        this.loading = true;
        this.loadingBar.start();
        await fn();
        successCb();
        this.loadingBar.finish();
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
        this.loading = false;
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