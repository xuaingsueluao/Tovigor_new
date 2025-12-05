<!--
 * 调整器械页面
 * 功能：训练前的器械调整和准备
 * 状态：占位页面，待后续开发
 -->
<template>
	<view class="adjust-equipment-page">
		<!-- 返回按钮 -->
		<CommonBackButton class="back-btn-position" />
		
		<!-- 页面标题 -->
		<view class="header-title">
			<text class="title-text">调整器械</text>
		</view>
		
		<!-- 占位内容 -->
		<view class="placeholder-content">
			<text class="placeholder-text">调整器械页面</text>
			<text class="placeholder-desc">功能开发中...</text>
		</view>
	</view>
</template>

<script setup>
import CommonBackButton from '@/components/ui-box/common-back-button.vue'
</script>

<style scoped lang="scss">
.adjust-equipment-page {
	position: relative;
	width: 100%;
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

/* 返回按钮 */
.back-btn-position {
	position: absolute;
	left: 24rpx;
	top: 24rpx;
	z-index: 100;
}

/* 标题 */
.header-title {
	position: absolute;
	top: 24rpx;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 88rpx;
}

.title-text {
	font-size: 36rpx;
	font-weight: 700;
	color: #FFFFFF;
	text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

/* 占位内容 */
.placeholder-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
}

.placeholder-text {
	font-size: 48rpx;
	font-weight: bold;
	color: #FFFFFF;
	text-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
}

.placeholder-desc {
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.8);
}
</style>
