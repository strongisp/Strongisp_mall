<template>
  <div class="category-detail">
    <div class="category-detail-item" v-for="(item,index) in CategoryList" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Subcategory",
  props: {
    CategoryList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.category-detail {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
}

.category-detail-item img {
  width: 64px;
  margin-bottom: 6px;
}

.category-detail-item {
  font-size: 14px;
  color: #333;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  height: 100px;
  margin-bottom: 10px;
}
</style>