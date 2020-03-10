<template>
  <div class="me">
    <nav-bar class="nav-bar">
      <div slot="center">我的</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";

export default {
  name: "Me",
  components: {
    NavBar
  }
};
</script>
<style scoped>
.me {
  width: 100%;
  height: 100%;
}

.nav-bar {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background-color: #ff8198;
}
</style>