<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<script>
import { NLoadingBarProvider, NMessageProvider } from "naive-ui";

export default {
  name: "App",
  components: {
    NLoadingBarProvider,
    NMessageProvider,
  },
};
</script>
