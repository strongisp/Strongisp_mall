<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabBar/MainTabBar";

import FastClick from "fastclick";

export default {
  name: "App",
  components: {
    MainTabBar
  },
  created() {
    //阻止移动端浏览器双击放大
    FastClick.attach(document.body);
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
