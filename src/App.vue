<script setup lang="ts">
import { toast } from "@/utils/toast";
import { utils } from "./utils";
// 提供toast实例
provide("toast", toast);
// 提供utils实例
provide("utils", utils);
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss"></style>
