<!--
 * 气泡对话框组件
 * 功能：展示带角色标签和头像的气泡提示框
 * 使用场景：训练提示、教程引导、AI对话、操作提示等
 -->
<template>
	<view class="bubble-dialog">
		<!-- 角色标签 + 头像 -->
		<view class="bubble-header">
			<view class="role-badge" :style="{ background: badgeBackground }">
				<text class="role-text">{{ roleLabel }}</text>
			</view>
			<image 
				class="role-avatar" 
				:src="avatarUrl" 
				mode="aspectFill"
			/>
		</view>
		
		<!-- 提示文字框 -->
		<view 
			class="bubble-content"
			:style="{
				background: contentBackground,
				boxShadow: showShadow ? '0 8rpx 24rpx rgba(0, 0, 0, 0.1)' : 'none'
			}"
		>
			<!-- 插槽优先，如果没有插槽内容则显示 text -->
			<slot>
				<text class="bubble-text" :style="{ color: textColor }">{{ text }}</text>
			</slot>
		</view>
	</view>
</template>

<script setup>
// Props
const props = defineProps({
	// 角色标签文字（例如："Vince(艾斯)"、"AI助手"）
	roleLabel: {
		type: String,
		default: 'AI助手'
	},
	// 头像图片地址
	avatarUrl: {
		type: String,
		default: '/static/icons/homeActivity/trimming.png'
	},
	// 标签背景色/渐变
	badgeBackground: {
		type: String,
		default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
	},
	// 提示文字内容（如果使用插槽则忽略此参数）
	text: {
		type: String,
		default: ''
	},
	// 文字颜色
	textColor: {
		type: String,
		default: '#333333'
	},
	// 内容框背景色
	contentBackground: {
		type: String,
		default: '#FFFFFF'
	},
	// 是否显示阴影
	showShadow: {
		type: Boolean,
		default: true
	}
})
</script>

<style scoped lang="scss">
.bubble-dialog {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
}

/* ========== 头部：角色标签 + 头像 ========== */
.bubble-header {
	display: flex;
	align-items: center;
	margin-bottom: 16rpx;
	gap: 12rpx;
}

/* 角色标签 */
.role-badge {
	padding: 8rpx 24rpx;
	border-radius: 50rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.role-text {
	font-size: 24rpx;
	font-weight: bold;
	color: #FFFFFF;
	letter-spacing: 1rpx;
}

/* 头像 */
.role-avatar {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	border: 3rpx solid #FFFFFF;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

/* ========== 内容框：圆角提示文字 ========== */
.bubble-content {
	width: 100%;
	padding: 24rpx 30rpx;
	border-radius: 20rpx;
	transition: all 0.2s ease;
}

.bubble-text {
	font-size: 28rpx;
	line-height: 1.6;
	display: block;
}
</style>
