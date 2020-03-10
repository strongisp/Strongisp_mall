<template>
  <div class="detail-swipe">
    <van-swipe :autoplay="2500" :height="300" :stop-propagation="false">
      <van-swipe-item v-for="(image, index) in DETswipeData" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "DetailSwipe",
  props: {
    DETswipeData: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.detail-swipe {
  overflow: hidden;
  transform: translateZ(0);
}

.van-swipe img {
  width: 100%;
}
</style>