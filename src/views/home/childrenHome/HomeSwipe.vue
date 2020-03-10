<template>
  <div class="home-swipe" v-if="isShow">
    <van-swipe class="my-swipe" :autoplay="2500" indicator-color="white" :stop-propagation="false">
      <a :href="item.link" v-for="(item,index) in banner" :key="index">
        <van-swipe-item>
          <img :src="item.image" alt @load="imgLoad" />
        </van-swipe-item>
      </a>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "HomeSwipe",
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isShow: false,
      isLoad: false
    };
  },
  created() {
    //解决vant的重复调用BUG
    this.isShow = true;
  },
  methods: {
    //确认数据记载完毕，回调此函数（方法1）
    imgLoad() {
      if (!this.isLoad) {
        this.$emit("swipeLoadImg");
        this.isload = true;
      }
    }
  }
};
</script>
<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  /* background-color: #39a9ed; */
}
.van-swipe img {
  width: 100%;
  height: auto;
}
</style>