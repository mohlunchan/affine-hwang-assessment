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
      {{ action === "add" ? "Add" : "Update" }} Customer
    </button>
  </Form>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";

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
  computed: {
    action() {
      if (this.$route.name === "user-add") return "add";
      return "edit";
    },
  },
  methods: {
    handleSubmit() {},
    setDefaultFormValues({ name, email, address }) {
      this.formValues.name = name;
      this.formValues.email = email;
      this.formValues.address = address;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const { fromProps } = vm.$route.params;

      if (fromProps === "true") vm.setDefaultFormValues(vm.$route.params);
    });
  },
};
</script>

<style>
</style>