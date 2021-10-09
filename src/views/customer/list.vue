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
import { getCustomers, deleteCustomer } from "@/api/module/customers";

export default {
  components: {
    CustomerListComponent,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    handleEdit(customerId) {
      this.$router.push({
        name: "customer-details",
        params: {
          id: customerId,
        },
      });
    },
    async handleDelete(customerId) {
      try {
        await deleteCustomer(customerId);

        this.list.splice(
          this.list.findIndex((customer) => customer.id === customerId),
          1
        );
      } catch {
        this.$refs[`customer-${customerId}`].isDeleting = false;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    getCustomers().then((response) => {
      next((vm) => {
        vm.list = response.data.map((item) => ({
          id: item.uuid,
          name: item.name,
          address: item.address,
          email: item.email,
        }));
      });
    });
  },
};
</script>

<style>
</style>