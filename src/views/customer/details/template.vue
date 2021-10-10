<template>
  <n-form
    ref="form"
    :model="model"
    :rules="rules"
    :disabled="disableForm"
    @submit="handleSubmit"
  >
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

    <slot v-bind="{ validate }" name="action">
      <!-- we can put some actions in here e.g. update/ delete buttons -->
    </slot>
  </n-form>
</template>

<script>
import { NForm, NInput, NFormItem } from "naive-ui";

export default {
  emits: ["submit"],
  components: {
    NForm,
    NFormItem,
    NInput,
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
    disableForm: {
      type: Boolean,
      default: false,
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
    validate() {
      this.$refs.form.validate((errors) => {
        if (!errors) this.$emit("submit", this.model);
      });
    },
    getComponent(type) {
      switch (type) {
        default:
          return NInput;
      }
    },
    reset() {
      for (let key in this.model) {
        this.model[key] = "";
      }
    },
  },
};
</script>