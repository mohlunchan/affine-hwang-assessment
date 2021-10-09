<template>
  <button @click="$router.push('/add')">Add New Customer</button>

  <n-data-table
    v-model:page="page"
    :columns="columns"
    :data="items"
    :pagination="pagination"
    :row-props="rowProps"
    :loading="isLoading"
  />
</template>

<script>
import { getCustomers, deleteCustomer } from "@/api/module/customers";
import { NDataTable, useLoadingBar } from "naive-ui";

export default {
  components: {
    NDataTable,
  },
  data() {
    return {
      items: [],
      totalItems: 0,
      pagination: {
        pageSize: 10,
        pageCount: 10,
        itemCount: 10,
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
      loadingBar: useLoadingBar(),
      isLoading: false,
    };
  },
  computed: {
    page: {
      get() {
        return this.$route.query.page || 1;
      },
      set(value) {
        this.$router.push({
          ...this.$route,
          query: {
            ...this.$route.query,
            page: value,
          },
        });

        this.pagination.page = value;
      },
    },
    pageCount() {
      return Math.ceil(this.totalItems / this.pagination.pageSize);
    },
  },
  methods: {
    async handleDelete(customerId) {
      try {
        await deleteCustomer(customerId);

        this.items.splice(
          this.items.findIndex((customer) => customer.id === customerId),
          1
        );
      } catch {
        this.$refs[`customer-${customerId}`].isDeleting = false;
      }
    },
    rowProps(row) {
      return {
        style: "cursor: pointer",
        onClick: () => {
          if (this.isLoading) return;

          //prevent user from spam clicking the row
          this.isLoading = true;
          this.loadingBar.start();

          this.$router
            .push({
              name: "customer-details",
              params: {
                id: row.id,
              },
            })
            .catch(() => {
              this.isLoading = false;
              this.loadingBar.error();
            });
        },
      };
    },
  },
  beforeRouteEnter(to, from, next) {
    getCustomers(to.query.page || 1, 10).then((response) => {
      next((vm) => {
        const { total, data } = response.data;

        vm.totalItems = total;
        vm.pagination.itemCount = data.length;
        vm.pagination.pageCount = vm.pageCount;

        vm.items = data.map((item) => ({
          id: item.uuid,
          name: item.name,
          address: item.address,
          email: item.email,
        }));
      });
    });
  },
  beforeUnmount() {
    this.isLoading = false;
    this.loadingBar.finish();
  },
};
</script>

<style>
</style>