<template>
  <div class="goods-list">
    <cart-goods-list-item v-for="(item,index) in list" :key="index" :list-item="item" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CartGoodsListItem from "./CartGoodsListItem";

export default {
  name: "CartGoodsShow",
  components: {
    CartGoodsListItem
  },
  computed: {
    ...mapGetters({
      list: "cartGoodsList"
    })
  },
};
</script>
<style scoped>
.goods-list {
  /* padding: 0 10px; */
  background: #f7f7f7;
}
</style>