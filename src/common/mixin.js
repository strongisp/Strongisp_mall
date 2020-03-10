import { debounce } from "common/utils";
import UpBack from "components/content/upback/UpBack";
import Loading from 'components/common/loading/Loading'

//防抖scroll的刷新混入
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    components: {
        UpBack
    },
    mounted() {
        //通过防抖函数对事件总线事件进行封装，返回swipe的图片加载成功（方法2）
        this.refresh = debounce(this.$refs.scroll.refresh, 300);
        //保存事件函数
        this.itemImgListener = () => {
            this.refresh();
        };
        //事件总线事件触发
        this.$bus.$on("itmeImageLoad", this.itemImgListener);
    },
}

//返回顶部混入
export const backTopMixin = {
    data() {
        return {
            isShowBack: false
        }
    },
    components: {
        UpBack
    },
    methods: {
        //点击返回顶部，scroll的Y值设置为零
        backTopClick() {
            this.$refs.scroll.scrollTo(0, 0, 300);
        }
    }
}

//加载Loading
export const loadingMixin = {
    data() {
        return {
            isShowLoading: true
        }
    },
    components: {
        Loading
    }
}