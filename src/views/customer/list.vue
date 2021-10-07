<template>
  <button @click="$router.push('/add')">Add New Customer</button>
  <!-- vue 3 now support fragmenting so we do not need a default root node -->
  <template v-for="customer in list" :key="`customer-${customer.id}`">
    <CustomerListComponent
      v-bind="customer"
      :ref="`customer-${customer.id}`"
      @edit="handleEdit(customer.id)"
      @delete="handleDelete(customer.id)"
    >
      <template #test>{{ isDeleting }}</template>
    </CustomerListComponent>
  </template>
</template>

<script>
import CustomerListComponent from "@/components/customer-list.vue";

export default {
  components: {
    CustomerListComponent,
  },
  data() {
    return {
      list: [
        {
          id: 10000,
          name: "Name A",
          email: "Email A",
          address: "Address A",
        },
        {
          id: 10001,
          name: "Name B",
          email: "Email B",
          address: "Address B",
        },
      ],
    };
  },
  methods: {
    handleEdit(customerId) {
      this.$router.push({
        name: "user-details",
        params: {
          ...this.list.find((customer) => customer.id === customerId),
          id: customerId,
          fromProps: true,
        },
      });
    },
    handleDelete(customerId) {
      setTimeout(() => {
        try {
          this.list.splice(
            this.list.findIndex((customer) => customer.id === customerId),
            1
          );
        } catch {
          this.$refs[`customer-${customerId}`].isDeleting = false;
        }
      }, 1500);
    },
  },
};
</script>

<style>
</style>