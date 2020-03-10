<template>
  <div class="nav-cat">
    <div
      class="cat-item"
      v-for="(item,index) in catData"
      :key="index"
      :class="{active:currentIndex===index}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavCat",
  props: {
    catData: Array,
    default() {
      return [];
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    //获取点击事件，返回当前点击的index，并传递给组件
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("catClick", index);
    }
  }
};
</script>
<style scoped>
.nav-cat {
  display: flex;
  text-align: center;
  position: relative;

  background-color: #fff;
  padding: 10px 0;
  font-size: 15px;
  color: #333;
  height: 40px;
  line-height: 28px;
  padding-bottom: 36px;
}
.cat-item {
  flex: 1;
}

.cat-item span {
  display: inline-block;
  padding: 0 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>