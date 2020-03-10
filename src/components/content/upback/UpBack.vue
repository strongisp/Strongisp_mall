<template>
  <div class="up-back">
    <img src="~@/assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  name: "UpBack"
};
</script>
<style scoped>
.up-back {
  position: fixed;
  right: 10px;
  bottom: 80px;
  z-index: 9;
}

.up-back img {
  width: 40px;
  height: 40px;
}
</style>