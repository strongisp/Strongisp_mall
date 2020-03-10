<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~@/assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style scoped>
.check-button {
  height: 20px;
  width: 20px;
  border-radius: 50%;

  background-color: #fff;
  border: 2px solid rgba(133, 14, 88, 0.1);
}

.check {
  /* background-color: rgb(91, 225, 255);
  border-color: rgb(91, 225, 255); */
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>