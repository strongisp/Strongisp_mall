<template>
  <div class="list-item" @click="listClick">
    <img v-lazy="showImage" alt @load="imageLoad" />
    <div class="item-text">
      <p>{{itemData.title}}</p>
      <span class="price">￥{{itemData.price}}</span>
      <span class="cfav">{{itemData.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    itemData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    //通过事件总线，返回图片的数据（方法1）
    imageLoad() {
      this.$bus.$emit("itmeImageLoad");
    },
    //点击触发跳转到详情页
    listClick() {
      this.$router.push("/detail/" + this.itemData.iid);
    }
  },
  computed: {
    //判断请求的数据位置
    showImage() {
      return this.itemData.img || this.itemData.image || this.itemData.show.img;
    }
  }
};
</script>
<style scoped>
.list-item {
  position: relative;
  width: 47%;

  text-align: center;
  font-size: 13px;

  margin-bottom: 10px;
}

.list-item img {
  width: 100%;
  height: 85%;
  border-radius: 5px;
}

.item-text p {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
}

.item-text .price {
  margin-right: 30px;
  color: var(--color-high-text);
}

.item-text .cfav {
  position: relative;
}

.item-text .cfav::before {
  content: "";
  width: 14px;
  height: 14px;
  position: absolute;
  left: -14px;
  top: 0px;
  background: url("~@/assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>