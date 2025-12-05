<!--
 * 通用返回按钮组件
 * 功能：标准化的返回按钮，提供统一的视觉效果和交互体验
 * 使用场景：所有需要返回功能的页面
 -->
<template>
	<view class="back-btn" @click="handleClick">
		<image 
			class="back-icon" 
			src="/static/icons/general/btn_general_back.svg" 
			mode="widthFix"
		/>
	</view>
</template>

<script setup>
// Props
const props = defineProps({
	// 是否使用默认返回行为（uni.navigateBack）
	useDefault: {
		type: Boolean,
		default: true
	}
})

// Emits
const emits = defineEmits(['click'])

// 点击处理
const handleClick = () => {
	emits('click')
	if (props.useDefault) {
		uni.navigateBack()
	}
}
</script>

<style scoped lang="scss">
.back-btn {
	width: 70rpx;
	height: 70rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background: transparent;
	cursor: pointer;
	user-select: none;
}

.back-btn:active {
	opacity: 0.7;
}

.back-icon {
	width: 38rpx;
	height: auto;
	display: block;
	pointer-events: none;
}
</style>
