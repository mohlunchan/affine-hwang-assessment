<template>
  <Form ref="form" @submit="handleSubmit">
    <template v-for="(field, index) in formFields" :key="`form-field-${index}`">
      <div>
        <div>
          <label :for="field.name">{{ field.label }}</label>
        </div>

        <Field
          v-model="formValues[field.name]"
          v-bind="{
            name: field.name,
            rules: field.rules,
            label: field.label,
          }"
        />

        <ErrorMessage :name="field.name" />
      </div>
    </template>

    <button type="submit">
      {{ $route.name === "customer-add" ? "Add" : "Update" }} Customer
    </button>
  </Form>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import {
  getCustomer,
  createCustomer,
  updateCustomer,
} from "@/api/module/customers";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      formValues: {
        name: "",
        email: "",
        address: "",
      },
      formFields: [
        {
          name: "name",
          label: "Name",
          rules: {
            required: true,
          },
        },
        {
          name: "email",
          label: "Email",
          rules: {
            required: true,
            email: true,
          },
        },
        {
          name: "address",
          label: "Address",
          rules: {
            required: true,
          },
        },
      ],
    };
  },
  methods: {
    handleSubmit() {
      if (this.$route.name === "customer-add") {
        createCustomer({ ...this.formValues });
      } else {
        const data = { ...this.formValues };
        delete data.email;

        updateCustomer({ ...data, uuid: this.$route.params.id });
      }
    },
    setDefaultFormValues({ name, email, address }) {
      this.formValues.name = name;
      this.formValues.email = email;
      this.formValues.address = address;
    },
  },
  beforeRouteEnter(to, from, next) {
    if (to.name === "customer-add") {
      next();
    } else {
      getCustomer(to.params.id).then((response) => {
        next((vm) => vm.setDefaultFormValues({ ...response.data }));
      });
    }
  },
};
</script>

<style>
</style>