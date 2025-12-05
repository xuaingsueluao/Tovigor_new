<!--
 * 通用关闭按钮组件
 * 功能：标准化的关闭按钮（X 形状），提供统一的视觉效果和交互体验
 * 使用场景：弹窗、浮层、可关闭的卡片等
 * 特点：支持透明度调节，使用 CSS 绘制 X 图标（无需图片资源）
 -->
<template>
	<view 
		class="close-btn" 
		:style="{ 
			backgroundColor: backgroundColor,
			opacity: opacity 
		}"
		@click="handleClick"
	>
		<!-- X 图标：使用两条交叉的线绘制 -->
		<view class="close-icon">
			<view class="close-line close-line-1"></view>
			<view class="close-line close-line-2"></view>
		</view>
	</view>
</template>

<script setup>
// Props
const props = defineProps({
	// 背景色（支持 rgba）
	backgroundColor: {
		type: String,
		default: 'rgba(0, 0, 0, 0.3)'
	},
	// 整体透明度（0-1）
	opacity: {
		type: Number,
		default: 1
	},
	// 是否使用默认关闭行为（触发父组件隐藏逻辑）
	useDefault: {
		type: Boolean,
		default: true
	}
})

// Emits
const emits = defineEmits(['click', 'close'])

// 点击处理
const handleClick = () => {
	emits('click')
	if (props.useDefault) {
		emits('close')  // 触发 close 事件，由父组件决定关闭逻辑
	}
}
</script>

<style scoped lang="scss">
.close-btn {
	width: 30rpx;
	height: 30rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	user-select: none;
}

.close-btn:active {
	opacity: 0.7;
}

/* X 图标容器 */
.close-icon {
	position: relative;
	width: 16rpx;
	height: 16rpx;
}

/* X 的两条线 */
.close-line {
	position: absolute;
	width: 18rpx;
	height: 2rpx;
	background-color: #FFFFFF;
	border-radius: 1rpx;
	top: 50%;
	left: 50%;
	transform-origin: center;
}

/* 第一条线：从左上到右下（旋转 45 度） */
.close-line-1 {
	transform: translate(-50%, -50%) rotate(45deg);
}

/* 第二条线：从右上到左下（旋转 -45 度） */
.close-line-2 {
	transform: translate(-50%, -50%) rotate(-45deg);
}

/*
 * 组件结构说明：
 * .close-btn (30rpx × 30rpx)          ← 圆形按钮背景，可点击区域
 *   └─ .close-icon (16rpx × 16rpx)    ← X 图标的容器，用于定位两条线
 *       ├─ .close-line-1 (18rpx × 2rpx)  ← 第一条斜线 (/)
 *       └─ .close-line-2 (18rpx × 2rpx)  ← 第二条斜线 (\)
 * 
 * 尺寸调整：
 * - 改 .close-btn 的 width/height → 改变点击区域和背景大小
 * - 改 .close-icon 的 width/height → 改变 X 图标大小
 * - 改 .close-line 的 width → 改变线条长度
 * - 改 .close-line 的 height → 改变线条粗细
 *   尺寸关系建议：按钮尺寸 (close-btn) : X容器 (close-icon) : 线长 (close-line width) ≈ 30 : 16 : 18
 *   如果你想改大按钮，同比例放大所有尺寸
 */
</style>


