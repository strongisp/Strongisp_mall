<template>
  <div class="bottom-nav">
    <div class="nav-left">
      <div class="item-left">
        <div class="icon">
          <img src="~@/assets/img/detail/detail_bottom.png" alt />
        </div>
        <div class="text" @click="currentDefend">{{title[0]}}</div>
      </div>
      <div class="item-center">
        <div class="icon">
          <img src="~@/assets/img/detail/detail_bottom.png" alt />
        </div>
        <div class="text" @click="currentDefend">{{title[1]}}</div>
      </div>
      <div class="item-right" @click="colleClick">
        <div class="icon">
          <img
            class="no-collection"
            :class="{collection:isColllection}"
            src="~@/assets/img/detail/detail_bottom.png"
            alt
          />
        </div>
        <div class="text">{{title[2]}}</div>
      </div>
    </div>
    <div class="nav-right">
      <button class="add" @click="addClick">{{title[3]}}</button>
      <button class="buy" @click="buyClick">{{title[4]}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomNav",
  data() {
    return {
      title: ["客服", "店铺", "收藏", "加入购物车", "立即购买"],
      isColllection: false
    };
  },
  methods: {
    //监听收藏事件
    colleClick() {
      this.isColllection = !this.isColllection;
    },
    //监听购物车按钮（购物车1）
    addClick() {
      this.$emit("addCart");
    },
    //点击跳转购物车
    buyClick() {
      this.$router.replace("/cart");
    },
    //维护中···
    currentDefend() {
      this.$toast.show("正在努力维护中，很抱歉~", 1000);
    }
  }
};
</script>
<style scoped>
.bottom-nav {
  height: 49px;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid rgba(56, 55, 55, 0.1);
  background-color: #eee;
}

.nav-left {
  float: left;
  width: 45%;
  height: 49px;
  display: flex;
}

.nav-right {
  float: right;
  width: 55%;
  height: 49px;
  text-align: center;
  padding-top: 6px;
  font-size: 14px;
  color: #fff;
}

.item-left,
.item-center,
.item-right {
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: #333;
}

.icon {
  width: 20px;
  height: 20px;
  overflow: hidden;
  margin-left: 18px;
  margin-top: 6px;
  position: relative;
}

.item-left img {
  position: absolute;
  left: -0.2px;
  bottom: -69px;
}

.item-center img {
  position: absolute;
  left: 0;
  bottom: -28px;
}

.no-collection {
  position: absolute;
  left: 0;
  top: 1px;
}

.collection {
  position: absolute;
  left: 0;
  top: -24px;
}

.icon img {
  width: 20px;
}

.add,
.buy {
  border: 0;
  padding: 8px 14px;
}

.add {
  border-radius: 20px 0px 0px 20px;
  outline: none;

  background-image: -webkit-gradient(
    linear,
    right bottom,
    left bottom,
    color-stop(0, #fd820e),
    color-stop(1, #ffcf1e)
  );
}

.buy {
  border-radius: 0px 20px 20px 0px;
  outline: none;

  background-image: -webkit-gradient(
    linear,
    right bottom,
    left bottom,
    color-stop(0, #ef0c24),
    color-stop(1, #ff5f34)
  );
}
</style>
