<template>
  <div class="detail-info">
    <div class="info-title" v-if="detailInfo.desc">
      <div class="top-line"></div>
      <div class="center-text">{{detailInfo.desc}}</div>
      <div class="bottom-line"></div>
    </div>
    <div class="info-effect" v-if="detailInfo.detailImage">
      <div class="title">{{detailInfo.detailImage[0].key}}</div>
      <div class="img">
        <img
          :src="image"
          alt
          v-for="(image,index) in detailInfo.detailImage[0].list"
          :key="index"
          @load="itemImgLoad"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    //监听图片加载完成，发出此事件（1）
    itemImgLoad() {
      this.$emit("itemImgLoad");
    }
  }
};
</script>
<style scoped>
.detail-info {
  padding: 20px 10px;
  border-top: 5px solid #eee;
}
.info-title {
  position: relative;
}

.info-title .top-line {
  width: 34%;
  height: 1px;
  background-color: #111;
}

.info-title .bottom-line {
  width: 34%;
  height: 1px;
  background-color: #111;

  position: absolute;
  right: 0;
}

.info-title .top-line::before,
.info-title .bottom-line::after {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #000;
  position: absolute;
  top: -3px;
}
.info-title .bottom-line::after {
  right: 0;
}

.info-title .center-text {
  padding: 10px 6px;
  font-size: 14px;
}

.info-effect img {
  width: 100%;
}

.info-effect {
  padding-top: 20px;
}

.info-effect .title {
  padding: 0 10px 10px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  color: #333;
}

.info-effect .img {
  padding-top: 8px;
}
</style>