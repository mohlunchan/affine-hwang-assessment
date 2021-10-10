<template>
  <div class="container">
    <n-loading-bar-provider>
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-loading-bar-provider>
  </div>
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

<style lang="scss" scoped>
.container {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
