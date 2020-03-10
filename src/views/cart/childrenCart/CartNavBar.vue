<template>
  <div class="cart-nav">
    <nav-bar>
      <div slot="center">{{title}}({{length}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import { mapGetters } from "vuex";

export default {
  name: "CartNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      title: "购物车"
    };
  },
  computed: {
    //Vuex映射计算核心属性
    ...mapGetters({
      length: "cartGoodsLength"
    })
  }
};
</script>
<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  font-size: 15px;
  color: #fff;
  font-weight: 600;

  position: relative;
  z-index: 9;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
</style>