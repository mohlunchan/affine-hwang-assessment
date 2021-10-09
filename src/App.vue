<template>
  <n-loading-bar-provider>
    <router-view></router-view>
  </n-loading-bar-provider>
</template>

<script>
import { NLoadingBarProvider } from "naive-ui";

export default {
  name: "App",
  components: {
    NLoadingBarProvider,
  },
};
</script>
