<template>
  <div class="goods-list">
    <goods-list-item
      v-for="(item,index) in goodsList"
      :key="index"
      :item-data="item"
      @click.native="listClick"
    />
  </div>
</template>

<script>
import goodsListItem from "./GoodsListItem";

export default {
  name: "goodsList",
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    goodsListItem
  },
  methods: {
    //返回商品点击事件
    listClick() {
      this.$emit("listClick");
    }
  }
};
</script>
<style scoped>
.goods-list {
  padding: 20px 6px 0;
  display: flex;
  flex-wrap: wrap; /** 自适应 显示数量 */
  justify-content: space-around; /** 均等分 */
}
</style>