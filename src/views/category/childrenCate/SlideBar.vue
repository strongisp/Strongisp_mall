<template>
  <div class="slide-bar">
    <scroll class="centent">
      <template v-for="(item,index) in slideBarList">
        <button
          class="slide-bar-item"
          :key="index"
          :class="currentIndex===index ? 'active':''"
          @click="slideBarItemClick(item,index)"
        >{{item.title}}</button>
      </template>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "SlideBar",
  props: {
    slideBarList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    //按钮点击事件
    slideBarItemClick(item, index) {
      //将点击的数据存在临时对象中，并发送给父组件
      const obj = {
        maitKey: item.maitKey,
        index
      };
      this.$emit("slideBarItemClick", obj);
      //实现点击切换动态效果
      this.currentIndex = index;
    }
  }
};
</script>
<style scoped>
.slide-bar {
  width: 100%;
}

.slide-bar-item {
  width: 100px;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  color: #333;
  text-align: center;
  user-select: none;
  outline: none;
  border: 0;
  background: none;
}

.centent {
  width: 100px;
  position: fixed;
  top: 44px;
  right: 0;
  left: 0;
  bottom: 49px;
  overflow: hidden;
  background-color: #f6f6f6;
}

.active {
  font-weight: 600;
  color: #ff5777;
  border-left: 2px solid #ff5777;
  background-color: #fff;
}
</style>