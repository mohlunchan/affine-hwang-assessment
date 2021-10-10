<template>
  <n-button
    @click="$router.push({ name: 'customer-create' })"
    style="margin-bottom: 15px"
    >Add New Customer</n-button
  >

  <n-data-table
    remote
    v-model:page="page"
    :columns="columns"
    :data="items"
    :loading="isLoading"
    :pagination="pagination"
    :row-props="rowProps"
    @update:page="handlePageChange"
  />
</template>

<script>
import { getCustomers } from "@/api/module/customers";
import { NDataTable, useLoadingBar, NButton } from "naive-ui";

export default {
  components: {
    NDataTable,
    NButton,
  },
  data() {
    return {
      items: [],
      pagination: {
        pageSize: 10,
        pageCount: 1,
        itemCount: 0,
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
        return Number(this.$route.query.page || 1);
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
  },
  methods: {
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
    async handlePageChange(currentPage) {
      try {
        if (this.isLoading) return;

        this.isLoading = true;
        this.loadingBar.start();
        const { data } = await getCustomers(currentPage, 10);
        this.setCustomers({ ...data, page: currentPage });
        this.loadingBar.finish();
      } catch {
        this.loadingBar.error();
      } finally {
        this.isLoading = false;
      }
    },
    setCustomers({ total, data, page }) {
      this.pagination.page = page;
      this.pagination.itemCount = total;
      this.pagination.pageCount = Math.ceil(total / this.pagination.pageSize);

      this.items = data.map((item) => ({
        id: item.uuid,
        name: item.name,
        address: item.address,
        email: item.email,
      }));
    },
  },
  beforeRouteEnter(to, from, next) {
    const page = Number(to.query.page || 1);

    getCustomers(page, 10)
      .then(({ data }) => {
        next((vm) => {
          vm.setCustomers({ ...data, page });
        });
      })
      .catch(() => {
        next();
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