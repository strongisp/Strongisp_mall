<template>
  <div class="pull-refresh">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <slot></slot>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "HomePullRefresh",
  data() {
    return {
      count: 0,
      isLoading: true
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        // this.isLoading = false;
        this.$emit("refresh");
      }, 1000);
    }
  }
};
</script>
<style scoped>
</style>