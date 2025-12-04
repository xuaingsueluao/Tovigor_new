<template>
	<!-- 整屏盖住，任何点击都算"有人来了" -->
	<view class="idle-page" @click="goHome" @touchstart="goHome">
		<video
			class="bg-video"
			src="/static/icons/ads/idle.mp4"
			autoplay
			loop
			muted
			:controls="false"
			:show-center-play-btn="false"
			:show-fullscreen-btn="false"
			object-fit="cover"
		></video>
	</view>
</template>

<script setup>
const goHome = () => {
	uni.reLaunch({
		url: '/pages/index/index'
	})
}
</script>

<style scoped>
.idle-page {
	width: 100vw;
	height: 100vh;
	background-color: #000;
	overflow: hidden;
}

.bg-video {
	width: 100%;
	height: 100%;
}
</style>
