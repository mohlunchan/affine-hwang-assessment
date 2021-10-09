<template>
  <!-- vue 3 now support fragmenting so we do not need a default root node -->
  <button @click="$router.push('/add')">Add New Customer</button>
  <n-data-table
    :columns="columns"
    :data="list"
    :pagination="pagination"
    :row-props="rowProps"
  />
</template>

<script>
import { getCustomers, deleteCustomer } from "@/api/module/customers";
import { NDataTable } from "naive-ui";
import { debounce } from "@/libs/debounce";

export default {
  components: {
    NDataTable,
  },
  data() {
    return {
      list: [],
      pagination: {
        pageSize: 10,
      },
      columns: [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Email",
          key: "email",
        },
        {
          title: "Address",
          key: "address",
        },
      ],
    };
  },
  methods: {
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
    rowProps(row) {
      return {
        style: "cursor: pointer",
        onClick: debounce(() => {
          this.$router.push({
            name: "customer-details",
            params: {
              id: row.id,
            },
          });
        }, 300),
      };
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