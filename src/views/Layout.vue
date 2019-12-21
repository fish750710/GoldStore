<template>
  <div>
    <FrontNavbar />
    <router-view></router-view>
    <Top />
    <FrontFooter />
  </div>
</template>

<script>
import FrontNavbar from "@/components/FrontNavbar.vue";
import Top from "@/components/Top.vue";
import FrontFooter from "@/components/FrontFooter.vue";

export default {
  components: {
    FrontNavbar,
    Top,
    FrontFooter
  }
};
</script>

<style lang="scss" scoped>
</style>