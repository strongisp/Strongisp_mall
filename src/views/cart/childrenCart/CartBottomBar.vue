<template>
  <div class="bottom-bar">
    <div class="all" @click="checkClick">
      <check-button :is-checked="isSelectAll" />
      <span>:全选</span>
    </div>
    <div class="total">
      <span>合计:</span>
      <span class="num">{{totalPrice}}</span>
    </div>
    <div class="count">
      <a :href="isJump" @click="calcClick">去计算({{checkLength}})</a>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    //映射vuex计算核心
    ...mapGetters(["cartGoodsList"]),
    //计算总价
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    //当前商品选中的个数
    checkLength() {
      return this.cartGoodsList.filter(item => item.checked).length;
    },
    //判断全选
    isSelectAll() {
      if (this.cartGoodsList.length === 0) return false;
      return !this.cartGoodsList.find(item => !item.checked);
    },
    //A标签是否跳转
    isJump() {
      return this.checkLength !== 0
        ? "http://m.meilishuo.com/"
        : "javascript:;";
    }
  },
  methods: {
    //全选点击
    checkClick() {
      //全选或不选
      if (this.isSelectAll) {
        this.cartGoodsList.forEach(item => (item.checked = false));
      } else {
        this.cartGoodsList.forEach(item => (item.checked = true));
      }
    },
    //监听去计算
    calcClick() {
      //有选中的就跳转
      if (this.checkLength !== 0) {
        this.$toast.show("请下载客户端App", 2000);
      } else {
        this.$toast.show("请选择购买的商品", 2000);
      }
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  height: 38px;
  width: 100%;
  box-shadow: 0px -6px 20px rgba(143, 143, 143, 0.1) inset;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 49px;
  background-color: #fff;
}

.all,
.total {
  float: left;
  color: #333;
}

.all span {
  font-size: 14px;
  color: #333;
}

.all {
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
}

.total {
  margin-top: 2px;
  height: 38px;
  line-height: 38px;
  margin-left: 20px;
  font-size: 14px;
}

.total .mark {
  font-size: 14px;
  line-height: 38px;
}

.total .num {
  line-height: 38px;
}

.count {
  float: right;
  height: 38px;
  width: 150px;
  text-align: center;
}

.count a {
  display: inline-block;
  margin-top: 5px;
  margin-left: 20px;
  padding: 4px 20px;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  border: 0;
  background-color: #ff728c;
}
</style>