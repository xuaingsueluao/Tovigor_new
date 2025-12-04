<!--
 * AI推荐页面（占位）
 * 功能：作为临时占位页面，后续完善具体功能
 -->
<template>
	<view class="page">
		<!-- 顶部导航 -->
		<view class="header">
			<CommonBackButton class="back-btn-position" />
			<text class="header-title">AI推荐训练</text>
		</view>

		<!-- 占位内容 -->
		<view class="content">
			<view class="placeholder-container">
				<image
					class="ai-icon"
					src="/static/icons/partTrainingActivity/AI_coach_Vince.png"
					mode="aspectFit"
				/>
				<text class="placeholder-title">AI智能推荐</text>
				<text class="placeholder-desc">根据您的身体数据和训练目标，为您量身定制专属训练计划</text>
				<text class="placeholder-hint">功能开发中，敬请期待...</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import CommonBackButton from '@/components/ui-box/common-back-button.vue'
</script>

<style scoped lang="scss">
.page {
	min-height: 100vh;
	background: linear-gradient(180deg, #E3F2FD 0%, #F5F5F5 100%);
	display: flex;
	flex-direction: column;
	padding: 32rpx 30rpx 40rpx;
}

.header {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 96rpx;
	flex-shrink: 0;
}

.back-btn-position {
	position: absolute;
	left: 21rpx;
	top: 50%;
	transform: translateY(-50%);
}

.header-title {
	font-size: 34rpx;
	font-weight: 700;
	color: #333333;
}

.content {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60rpx 40rpx;
}

.placeholder-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.ai-icon {
	width: 160rpx;
	height: 160rpx;
	margin-bottom: 40rpx;
}

.placeholder-title {
	font-size: 40rpx;
	font-weight: bold;
	color: #1976D2;
	margin-bottom: 24rpx;
}

.placeholder-desc {
	font-size: 28rpx;
	color: #666666;
	line-height: 1.6;
	margin-bottom: 40rpx;
	max-width: 500rpx;
}

.placeholder-hint {
	font-size: 24rpx;
	color: #999999;
	font-style: italic;
}
</style>
