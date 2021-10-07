<template>
  <div>
    <div>
      <b>{{ name }}</b>
      <span>{{ email }}</span>

      <button @click="$emit('edit')">Edit</button>
      <button
        @click="
          isDeleting = !isDeleting;
          $emit('delete');
        "
        :disabled="isDeleting"
      >
        {{ isDeleting ? "Deleting..." : "Delete" }}
      </button>
    </div>

    <div>{{ address }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isDeleting: false,
    };
  },
};
</script>