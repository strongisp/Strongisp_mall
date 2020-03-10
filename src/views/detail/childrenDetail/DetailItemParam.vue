<template>
  <div class="item-param">
    <div class="size-info" v-if="itemParams.rule">
      <p class="title">{{itemParams.rule.key}}</p>
      <table v-for="(item,index) in itemParams.rule.tables" :key="index">
        <tr v-for="(tr,index) in item" :key="index">
          <td v-for="(td,index) in tr" :key="index">{{td}}</td>
        </tr>
      </table>
    </div>
    <div class="product-info" v-if="itemParams.info">
      <p class="title">{{itemParams.info.key}}</p>
      <table>
        <tr v-for="(item,index) in itemParams.info.set" :key="index">
          <td class="min-title">{{item.key}}</td>
          <td class="content">{{item.value}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailItemParam",
  props: {
    itemParams: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style scoped>
.item-param {
  padding: 16px 10px 30px;
  border-top: 5px solid #eee;
  transform: translateZ(0);
  box-sizing: border-box;
}

.size-info p,
.product-info p {
  padding-bottom: 8px;
  border-bottom: 0.2px solid #666;
  color: #333;
}

.size-info table {
  width: 100%;
}

.size-info td {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  font-size: 12px;
}

.product-info table {
  width: 100%;
}

.product-info p {
  margin-top: 20px;
}

.product-info td {
  font-size: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.product-info .min-title {
  width: 80px;
}

.product-info .content {
  color: red;
  font-size: 12px;
}
</style>