<script>
export default {
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

<style>
@import './uni.scss';

/* 全局页面基础样式 */
page {
  background-color: #F5F5F5;
  height: 100% !important;
  overflow: hidden !important;  /* ⭐ 防止被后面的默认样式覆盖 */
}

/* 仅 H5 平台：锁死浏览器原生滚动，只允许内部 scroll-view 滚动 */
 /* #ifdef H5 */
html,
body,
#app {
  height: 100% !important;
  overflow: hidden !important;
}
 /* #endif */
</style>
