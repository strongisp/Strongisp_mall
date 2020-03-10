<template>
  <div class="list-item">
    <van-swipe-cell>
      <check-button
        slot="default"
        :is-checked="listItem.checked"
        @click.native="checkClick"
        class="left"
      />
      <van-card
        :price="listItem.price"
        :desc="listItem.style"
        :title="listItem.title"
        class="goods-card"
        :thumb="listItem.image"
      />
      <div slot="default" class="button-style">
        <button @click="reduceBClick">-</button>
        <span>{{listItem.count}}</span>
        <button @click="addBClick">+</button>
      </div>
      <div class="left cover" @click="titleClick"></div>
      <van-button
        slot="right"
        text="删除"
        color="#ff728c"
        type="danger"
        class="delete-button"
        @click="deleteClick"
      />
    </van-swipe-cell>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartGoodsListItem",
  props: {
    listItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    //选中按钮点击事件
    checkClick() {
      this.listItem.checked = !this.listItem.checked;
    },
    //删除按钮点击事件
    deleteClick() {
      this.$store.dispatch("deleteCart", this.listItem);
    },
    //商品 减 按钮点击
    reduceBClick() {
      if (this.listItem.count === 1) return;
      this.$store.commit("reduceGoods", this.listItem);
    },
    //商品 加 按钮点击
    addBClick(listItem) {
      if (this.listItem.count === 5) {
        this.$toast.show("已是商品最大数量", 1000);
      } else {
        this.$store.commit("addGoods", this.listItem);
      }
    },
    titleClick() {
      this.$router.push("/detail/" + this.listItem.iid);
    }
  }
};
</script>
<style scoped>
.list-item {
  background-color: #fff;
}

.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}

.van-card {
  margin-left: 16px;
}

.van-swipe-cell {
  position: relative;
  left: 0;
  right: 0;
  margin: 10px 0;
}

.check-button {
  position: absolute;
  top: 40px;
  left: 4px;
  z-index: 9;
}

.button-style {
  background-color: #eee;
  display: inline-block;
  border-radius: 10px;

  position: absolute;
  bottom: 10px;
  right: 28px;
}

.button-style button {
  border: 0;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  user-select: none;
  outline: none;
}

.button-style span {
  padding: 0 6px;
}

.cover {
  width: 231px;
  height: 32px;
  position: absolute;
  top: 8px;
  right: 16px;
}
</style>