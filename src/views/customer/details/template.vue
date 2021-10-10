<template>
  {{ rules }}
  <n-form ref="form" :model="model" :rules="rules" @submit="handleSubmit">
    <template v-for="(field, index) in fields" :key="`form-field-${index}`">
      <div>
        <n-form-item :label="field.label" :path="field.name">
          <component
            v-model="model[field.name]"
            v-bind="field.attrs"
            :is="field.component"
          ></component>
        </n-form-item>
      </div>
    </template>

    <n-button :loading="loading" @click="handleClick">
      <slot v-if="!loading" v-bind="{ loading }" name="submit"></slot>
    </n-button>
  </n-form>
</template>

<script>
// import { Field, Form, ErrorMessage } from "vee-validate";
import { NForm, NInput, NFormItem, NButton } from "naive-ui";

export default {
  emits: ["submit"],
  components: {
    // Form,
    // Field,
    // ErrorMessage,
    NForm,
    NFormItem,
    NInput,
    NButton,
  },
  props: {
    formFields: {
      type: Array,
      default: () => {
        return [];
      },
    },
    defaultValues: {
      type: Object,
      default: () => {
        return {};
      },
    },
    rules: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    model() {
      return this.formFields.reduce((obj, field) => {
        obj[field.name] = this.defaultValues[field.name] || "";
        return obj;
      }, {});
    },
    fields() {
      return this.formFields.map((field) => {
        return {
          ...field,
          component: this.getComponent(field.type),
        };
      });
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleClick(e) {
      e.preventDefault();

      this.$refs.form.validate((errors) => {
        if (!errors) this.handleSubmit();
      });
    },
    handleSubmit() {
      if (this.loading) return;

      this.loading = true;

      this.$emit("submit", this.model);
    },
    getComponent(type) {
      switch (type) {
        default:
          return NInput;
      }
    },
  },
};
</script>