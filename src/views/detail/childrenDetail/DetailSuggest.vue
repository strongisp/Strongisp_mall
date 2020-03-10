<template>
  <div class="detail-suggest">
    <div class="title">{{suggestData.title}}</div>
    <div class="price">
      <span class="current">￥{{suggestData.price}}</span>
      <span class="old">{{suggestData.oldPrice}}</span>
      <span
        class="desc"
        v-if="suggestData.desc"
        :style="'background-color:'+suggestData.descBGC"
      >{{suggestData.desc}}</span>
    </div>
    <div class="columns" v-if="suggestData.columns">
      <span>{{suggestData.columns[0]}}</span>
      <span>{{suggestData.columns[1]}}</span>
      <span>{{suggestData.services[suggestData.services.length-1].name}}</span>
    </div>
    <div class="services" v-if="suggestData.services">
      <span v-for="index in suggestData.services.length-1" :key="index">
        <img :src="suggestData.services[index-1].icon" alt />
        <span>{{suggestData.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailSuggest",
  props: {
    suggestData: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style scoped>
.detail-suggest {
  height: 185px;
  padding: 9px 8px 20px;
  border-bottom: 5px solid #eee;
}

.title {
  color: #333;
  font-size: 15px;
}

.price {
  height: 26px;
  padding-top: 8px;
  font-size: 15px;
}

.price .current {
  color: var(--color-high-text);
  margin-right: 8px;
}

.price .old {
  text-decoration: line-through;
  font-size: 13px;
  color: #aaa;
}

.price .desc {
  border-radius: 6px;
  font-size: 12px;
  color: #fff;
  padding: 2px;
  margin-left: 4px;
  height: 16px;
  line-height: 14px;
  display: inline-block;
}

.columns {
  height: 34px;
  padding-top: 6px;
  font-size: 13px;
  display: flex;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 8px;
}

.columns span {
  flex: 1;
  height: 19px;
  display: inline-block;
}

.services {
  display: flex;
  font-size: 11px;
  padding-top: 16px;
  justify-content: space-between;
}

.services img {
  width: 14px;
  height: 14px;
}
</style>