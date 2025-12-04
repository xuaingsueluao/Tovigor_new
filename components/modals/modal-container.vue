<!--
 * 通用弹窗容器组件
 * 功能：提供遮罩层、动画、显示/隐藏逻辑、位置、样式等配置的弹窗容器
 * 使用场景：所有需要配置化弹窗的基础，支持插槽完全自定义内容
 -->
<template>
	<view 
		v-if="visible" 
		class="modal-container-overlay" 
		:class="{ 'modal-container-fade-in': visible }"
		@click="handleOverlayClick"
	>
		<view 
			class="modal-container-box" 
			:class="[
				`position-${position}`,
				`animation-${animation}`,
				{ 'modal-container-show': visible }
			]"
			:style="containerStyle"
			@click.stop
		>
			<!-- 头部插槽 -->
			<slot name="header"></slot>
			
			<!-- 主体内容插槽 -->
			<slot></slot>
			
			<!-- 底部插槽 -->
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
	// 是否显示弹窗
	visible: {
		type: Boolean,
		default: false
	},
	// 弹窗位置：center(居中)、top(顶部)、bottom(底部)
	position: {
		type: String,
		default: 'center',
		validator: (value) => ['center', 'top', 'bottom'].includes(value)
	},
	// 动画类型：fade(淡入)、slide(滑入)、zoom(缩放)
	animation: {
		type: String,
		default: 'fade',
		validator: (value) => ['fade', 'slide', 'zoom'].includes(value)
	},
	// 是否点击遮罩层关闭
	closeOnClickOverlay: {
		type: Boolean,
		default: true
	},
	// 弹窗宽度（rpx）
	width: {
		type: [String, Number],
		default: '600'
	},
	// 弹窗最大高度（rpx）
	maxHeight: {
		type: [String, Number],
		default: ''
	},
	// 弹窗圆角（rpx）
	borderRadius: {
		type: [String, Number],
		default: '24'
	},
	// 弹窗背景色
	backgroundColor: {
		type: String,
		default: '#FFFFFF'
	},
	// 遮罩层透明度（0-1）
	overlayOpacity: {
		type: Number,
		default: 0.5
	},
	// z-index 层级
	zIndex: {
		type: Number,
		default: 9999
	}
})

// Emits
const emit = defineEmits(['update:visible', 'open', 'close', 'overlay-click'])

// 计算容器样式
const containerStyle = computed(() => {
	const style = {
		width: typeof props.width === 'number' ? `${props.width}rpx` : props.width,
		backgroundColor: props.backgroundColor,
		borderRadius: typeof props.borderRadius === 'number' ? `${props.borderRadius}rpx` : props.borderRadius
	}
	
	if (props.maxHeight) {
		style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}rpx` : props.maxHeight
	}
	
	return style
})

// 点击遮罩层
const handleOverlayClick = () => {
	if (props.closeOnClickOverlay) {
		emit('overlay-click')
		closeModal()
	}
}

// 关闭弹窗
const closeModal = () => {
	emit('update:visible', false)
	emit('close')
}

// 打开弹窗（供外部调用）
const openModal = () => {
	emit('update:visible', true)
	emit('open')
}

// 暴露方法给父组件
defineExpose({
	close: closeModal,
	open: openModal
})
</script>

<style scoped lang="scss">
/* ========== 遮罩层 ========== */
.modal-container-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, var(--overlay-opacity));
	--overlay-opacity: v-bind(overlayOpacity);
	display: flex;
	z-index: v-bind(zIndex);
	transition: opacity 0.3s ease;
	opacity: 0;
}

.modal-container-fade-in {
	opacity: 1;
}

/* ========== 弹窗容器 ========== */
.modal-container-box {
	background: #FFFFFF;
	box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.2);
	overflow: hidden;
	transition: all 0.3s ease;
}

/* ========== 位置样式 ========== */
/* 居中 */
.position-center {
	margin: auto;
}

/* 顶部 */
.position-top {
	margin: 0 auto;
	align-self: flex-start;
}

/* 底部 */
.position-bottom {
	margin: 0 auto;
	align-self: flex-end;
}

/* ========== 动画样式 ========== */
/* 淡入淡出 */
.animation-fade {
	opacity: 0;
	transform: scale(1);
}

.animation-fade.modal-container-show {
	opacity: 1;
}

/* 滑入滑出 */
.animation-slide.position-center,
.animation-slide.position-top {
	transform: translateY(-100%);
	opacity: 1;
}

.animation-slide.position-bottom {
	transform: translateY(100%);
	opacity: 1;
}

.animation-slide.modal-container-show {
	transform: translateY(0);
}

/* 缩放 */
.animation-zoom {
	opacity: 0;
	transform: scale(0.8);
}

.animation-zoom.modal-container-show {
	opacity: 1;
	transform: scale(1);
}
</style>
