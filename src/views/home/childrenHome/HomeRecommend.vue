<template>
  <div class="recommend" v-show="recommend.length !== 0">
    <div class="recommend-item" v-for="(item,index) in recommend" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 13px;
  padding: 8px 0 20px;
  border-bottom: 6px solid rgba(158, 158, 158, 0.1);
}

.recommend-item {
  flex: 1;
}

.recommend-item img {
  width: 66px;
  height: 66px;
}

.recommend-item a {
  color: #333;
}
</style>