<template>
  <n-form ref="form" :model="model" :rules="rules" @submit="handleSubmit">
    <template v-for="(field, index) in fields" :key="`form-field-${index}`">
      <div>
        <n-form-item :label="field.label" :path="field.name">
          <component
            v-model:value="model[field.name]"
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
import { NForm, NInput, NFormItem, NButton } from "naive-ui";

export default {
  emits: ["submit"],
  components: {
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
  watch: {
    defaultValues: {
      immediate: true,
      deep: true,
      handler(value) {
        for (let key in value) {
          this.model[key] = value[key];
        }
      },
    },
  },
  data() {
    return {
      model: {},
      loading: false,
    };
  },
  computed: {
    fields() {
      // dynamic fields so we can add more different field types in the future
      return this.formFields.map((field) => {
        return {
          ...field,
          component: this.getComponent(field.type),
        };
      });
    },
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
    reset() {
      this.model = {};
    },
  },
};
</script>