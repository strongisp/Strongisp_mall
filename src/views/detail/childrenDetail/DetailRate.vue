<template>
  <div>
    <div class="rate-info" v-if="Object.keys(rateData).length !== 0">
      <div class="info-head">
        <div class="title">{{title}}</div>
        <div class="still">{{still}}</div>
      </div>
      <div class="info-body">
        <div class="user-info">
          <img :src="rateData.user.avatar" alt />
          <span>{{rateData.user.uname}}</span>
        </div>
        <div class="comment">{{rateData.content}}</div>
        <div class="date-style">
          <span>{{rateData.created | showDate}}</span>
          <span>{{rateData.style}}</span>
        </div>
        <div class="images">
          <img :src="item" alt v-for="(item,index) in rateData.images" :key="index" />
        </div>
      </div>
    </div>
    <div class="no-news" v-else>{{noNews}}</div>
  </div>
</template>

<script>
import { formatDate } from "@/common/utils";

export default {
  name: "DetailRate",
  props: {
    rateData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      title: "用户评论",
      still: "更多",
      noNews: "暂无评论"
    };
  },
  filters: {
    //时间戳转换（2）
    showDate(value) {
      //1.将时间戳转换成Date对象
      const date = new Date(value * 1000);
      //2.将Date对象进行格式化
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>
<style scoped>
.rate-info {
  padding: 10px 10px;
  border-top: 5px solid #eee;
  box-sizing: border-box;
}

.info-head {
  padding: 10px 0;
  position: relative;
  border-bottom: 1px solid #ccc;
}

.info-head .title {
  color: #333;
  margin-left: 6px;
}

.info-head .still {
  position: absolute;
  top: 12px;
  right: 10px;
  font-size: 13px;
  color: #333;
}

.user-info {
  padding: 16px 0 8px;
  position: relative;
}

.user-info img {
  border: 1px solid #ccc;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info span {
  position: absolute;
  top: 28px;
  color: #333;
  font-size: 14px;
}

.comment {
  font-size: 14px;
}

.date-style {
  padding: 6px 0;
  font-size: 12px;
}

.date-style span {
  margin-right: 8px;
}

.images img {
  margin-right: 2px;
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.no-news {
  padding: 10px;
  border-top: 5px solid #eee;
}
</style>