<template>
	<view class="container" @touchmove.prevent>
		<!-- 数据看板 -->
		<view class="stat-board">
			<image class="board-bg" src="/static/icons/freeTrainingActivity/bg_statBoard.png" mode="aspectFill"></image>
			
			<view class="stat-row">
				<!-- 组数/次数 -->
				<view class="stat-item">
					<image class="stat-icon" src="/static/icons/freeTrainingActivity/ic_counts.png" mode="aspectFit"></image>
					<view class="stat-content">
						<text class="stat-label">组数/次数</text>
						<text class="stat-value">{{ statBoard.sets }}</text>
					</view>
				</view>
				
				<image class="separator" src="/static/icons/freeTrainingActivity/ic_separate.png" mode="aspectFit"></image>
				
				<!-- 训练时间 -->
				<view class="stat-item">
					<image class="stat-icon" src="/static/icons/freeTrainingActivity/ic_train_time.png" mode="aspectFit"></image>
					<view class="stat-content">
						<text class="stat-label">训练时间</text>
						<text class="stat-value">{{ statBoard.duration }}</text>
					</view>
				</view>
				
				<image class="separator" src="/static/icons/freeTrainingActivity/ic_separate.png" mode="aspectFit"></image>
				
				<!-- 单量/千卡 -->
				<view class="stat-item">
					<image class="stat-icon" src="/static/icons/freeTrainingActivity/ic_calories.png" mode="aspectFit"></image>
					<view class="stat-content">
						<text class="stat-label">单量/千卡</text>
						<text class="stat-value">{{ statBoard.calories }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 中央控制区：力量旋钮 + 开关 -->
		<view class="control-center">
			<!-- 力量旋钮区域 -->
			<view class="dial-wrapper"
				@touchstart="onDialTouch"
				@touchmove.stop.prevent="onDialTouch">
				
				<!-- 圆弧背景（灰色底） -->
				<image class="dial-arc dial-arc-bg" 
					src="/static/icons/freeTrainingActivity/ic_resistance_adjust.svg" 
					mode="aspectFit" 
					:class="{ 'dial-arc--off': !powerOn }" />
				
				<!-- 圆弧进度（彩色，通过遮罩显示进度） -->
				<view v-if="powerOn" class="dial-arc-progress-wrapper" 
					:style="{ '--progress-angle': (dial.currentAngle + 120) + 'deg' }">
					<image class="dial-arc dial-arc-active" 
						src="/static/icons/freeTrainingActivity/ic_resistance_adjust.svg" 
						mode="aspectFit" />
				</view>
				
				<!-- 装饰图片（仅开机时显示） -->
				<image v-if="powerOn" class="dial-decoration" 
					src="/static/icons/freeTrainingActivity/ic_decoration.png" 
					mode="aspectFit" />
				
				<!-- 圆形中心区域 -->
				<view class="dial-circle" :class="{ 'dial-circle--on': powerOn }">
					<!-- 力量值显示 -->
					<text class="dial-value">{{ dial.currentValue }}</text>
					<text class="dial-unit">kg</text>
					
					<!-- 中心开关按钮 -->
					<view class="dial-power-btn" @tap.stop="togglePower">
						<image class="power-icon" 
							src="/static/icons/freeTrainingActivity/ic_power.svg" 
							mode="aspectFit" />
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部模式选择 -->
		<view :class="bottomPanelClass">
			<text class="mode-title">训练模式</text>
			<view class="mode-grid">
				<view 
					class="mode-item" 
					v-for="(mode, index) in modes" 
					:key="mode.key"
					:class="{ 'selected': selectedMode === index, 'disabled': !powerOn }"
					@click="selectMode(index)">
					<image class="mode-icon" :src="mode.icon" mode="aspectFit"></image>
					<text class="mode-name">{{ mode.name }}</text>
				</view>
			</view>
			
			<!-- 模式确认按钮 -->
			<view 
				class="mode-confirm-btn" 
				:class="{ 'active': hasMode && powerOn }"
				@click="confirmMode">
				<text class="btn-text">{{ hasMode ? modes[selectedMode].name + '训练' : '请选择训练模式' }}</text>
			</view>
		</view>
		
		<!-- 训练安全须知弹窗 -->
		<ModalGeneral 
			v-model:show="showSafetyModal" 
			title="训练安全须知"
			confirm-text="我知道了"
			@confirm="handleModalConfirm"
		>
			<view class="safety-content">
				<view class="safety-item">1. 进行力量训练前，请先进行基础热身</view>
				<view class="safety-item">2. 使用力量力臂进行训练前，请确认力臂档位已锁好</view>
				<view class="safety-item">3. 请勿将整个人或其他重物挂在力臂上</view>
				<view class="safety-item">4. 请勿用硬物击打设备屏幕</view>
				<view class="safety-item">5. 结束训练后，请及时将力臂还原至初始状态并锁好</view>
			</view>
		</ModalGeneral>
	</view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { onReady, onBackPress } from '@dcloudio/uni-app'

// ==================== 状态管理 ====================
const showSafetyModal = ref(false)

// 顶部看板数据
const statBoard = ref({
	sets: '00/00',
	duration: '00:00:00',
	calories: '00.00'
})

// 是否开启
const powerOn = ref(false)

// 力量旋钮
const dial = ref({
	startAngle: -120,   // 圆弧起点角度（左侧）
	endAngle: 120,      // 圆弧终点角度（右侧）
	minValue: 0,        // 最小力量值 = 0kg
	maxValue: 100,      // 最大力量值 = 100kg
	currentAngle: -120, // 当前滑块所处角度（实时更新）
	currentValue: 0,    // 当前力量值（实时更新）
	center: null        // {x,y} 记录圆心，用于触摸计算
})

// 模式列表
const modes = ref([
	{
		key: 'xiangxin',
		name: '向心等张',
		icon: '/static/icons/freeTrainingActivity/ic_force_xiangxin.png'
	},
	{
		key: 'lixin',
		name: '离心等张',
		icon: '/static/icons/freeTrainingActivity/ic_force_lixin.png'
	},
	{
		key: 'liuti',
		name: '流体阻力',
		icon: '/static/icons/freeTrainingActivity/ic_force_liuti.png'
	},
	{
		key: 'dengsu',
		name: '等速',
		icon: '/static/icons/freeTrainingActivity/ic_force_dengsu.png'
	},
	{
		key: 'tanli',
		name: '弹力',
		icon: '/static/icons/freeTrainingActivity/ic_force_tanli.png'
	},
	{
		key: 'hengli',
		name: '恒力',
		icon: '/static/icons/freeTrainingActivity/ic_force_hengli.png'
	}
])

const selectedMode = ref(null)

// 定时器
let trainingTimer = null

// ==================== 计算属性 ====================
const handleStyle = computed(() => {
	return `transform: translate(-50%, -50%) rotate(${dial.value.currentAngle}deg);`
})

// 计算进度百分比（0~1）
const progressRatio = computed(() => {
	const startAngle = dial.value.startAngle // -120°
	const endAngle = dial.value.endAngle     // +120°
	const currentAngle = dial.value.currentAngle
	return (currentAngle - startAngle) / (endAngle - startAngle)
})

const bottomPanelClass = computed(() => {
	return powerOn.value ? 'bottom-panel' : 'bottom-panel bottom-panel--off'
})

const hasMode = computed(() => {
	return selectedMode.value !== null
})

const pageTitle = computed(() => {
	if (!hasMode.value) return '自由训练'
	const m = modes.value[selectedMode.value]
	if (!m) return '自由训练'
	if (m.key === 'liuti') return '流体阻力模式'
	return m.name + '模式'
})

// ==================== 生命周期 ====================
onMounted(() => {
	showSafetyModal.value = true
})

// 页面渲染完成后计算圆心坐标（只算一次）
onReady(() => {
	uni.createSelectorQuery()
		.select('.dial-circle')
		.boundingClientRect(data => {
			if (!data) return
			dial.value.center = {
				x: data.left + data.width / 2,
				y: data.top + data.height / 2
			}
		})
		.exec()
})

onUnmounted(() => {
	if (trainingTimer) {
		clearInterval(trainingTimer)
	}
})

// Android 返回键处理
onBackPress(() => {
	if (showSafetyModal.value) {
		showSafetyModal.value = false
		return true // 阻止默认返回行为
	}
	return false // 允许返回
})

// ==================== 事件处理 ====================
const goBack = () => {
	uni.navigateBack()
}

const handleModalConfirm = () => {
	// console.log('用户已确认安全须知')
}

// 开关按钮
const togglePower = () => {
	powerOn.value = !powerOn.value
	
	// 关机时把力量设为0，滑块回到起点
	if (!powerOn.value) {
		dial.value.currentValue = 0
		dial.value.currentAngle = dial.value.startAngle
	}
}

// 模式选择
const selectMode = (index) => {
	selectedMode.value = index
	const mode = modes.value[index]
	// console.log('选择模式:', mode.name)
	
	if (mode.key === 'liuti') {
		// TODO: 切换为流体阻力 UI, 通知下位机等
	}
}

// 旋钮拖动（触摸开始/移动触发）
// 节流变量
let lastUpdateTime = 0
const UPDATE_INTERVAL = 20 // 约60fps，降低更新频率避免卡顿
const onDialTouch = (e) => {
	if (!powerOn.value) return // 关机时不允许调节
	if (!dial.value.center) return // 圆心未计算完成，跳过
	
	// 节流：限制更新频率
	const now = Date.now()
	if (now - lastUpdateTime < UPDATE_INTERVAL) return
	lastUpdateTime = now
	
	// 1. 读取触点坐标
	const touch = e.touches[0]
	const touchX = touch.clientX || touch.x
	const touchY = touch.clientY || touch.y
	
	// 2. 计算指向向量
	const dx = touchX - dial.value.center.x
	const dy = touchY - dial.value.center.y
	
	// 3. 转换为角度（atan2 返回 -180° ~ 180°）
	let angleRaw = Math.atan2(dy, dx) * 180 / Math.PI
	// 让正上方成为 0°（atan2 中右侧是0°，需要旋转90°）
	let angle = angleRaw + 90
	
	// 处理角度跨越 ±180° 边界的情况
	if (angle > 180) {
		angle = angle - 360
	} else if (angle < -180) {
		angle = angle + 360
	}
	
	// 4. 将角度限制在圆弧范围 [startAngle, endAngle]
	const startAngle = dial.value.startAngle // -120°
	const endAngle = dial.value.endAngle     // +120°
	
	// 限制在圆弧范围内
	angle = Math.max(startAngle, Math.min(angle, endAngle))
	
	// 5. 根据角度映射到 0~100kg
	const ratio = (angle - startAngle) / (endAngle - startAngle) // 0~1
	const value = dial.value.minValue + ratio * (dial.value.maxValue - dial.value.minValue) // 0~100
	
	// 6. 更新状态（批量更新减少响应式开销）
	dial.value.currentAngle = angle
	dial.value.currentValue = Math.round(value)
	
	// 7. 通知下位机
	// TODO: sendStrengthToDevice(dial.value.currentValue)
}

const confirmMode = () => {
	if (!hasMode.value) {
		uni.showToast({
			title: '请先选择训练模式',
			icon: 'none'
		})
		return
	}
	
	const mode = modes.value[selectedMode.value]
	uni.showToast({
		title: `已选择 ${mode.name} 模式`,
		icon: 'success'
	})
}
</script>

<style scoped>
.container {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	background-color: #FFFFFF;
	padding: 40rpx;
	overflow: hidden;
	box-sizing: border-box;
}

/* ==================== 数据看板 ==================== */
.stat-board {
	position: relative;
	width: 100%;
	height: 160rpx;
	margin-bottom: 40rpx;
	flex-shrink: 0;
}

.board-bg {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

.stat-row {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 100%;
	padding: 0 30rpx;
}

.stat-item {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.stat-icon {
	width: 60rpx;
	height: 60rpx;
}

.stat-content {
	display: flex;
	flex-direction: column;
	gap: 4rpx;
}

.stat-label {
	font-size: 24rpx;
	color: #666666;
}

.stat-value {
	font-size: 32rpx;
	font-weight: bold;
	color: #000000;
}

.separator {
	width: 2rpx;
	height: 80rpx;
}

/* ==================== 中央控制区：力量旋钮 ==================== */
.control-center {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	flex: 1;
	min-height: 0;
	margin-bottom: 30rpx;
}

.dial-wrapper {
	position: relative;
	width: 400rpx;
	height: 400rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* 圆弧背景（灰色底） */
.dial-arc {
	position: absolute;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.dial-arc-bg {
	opacity: 0.3;
	transition: opacity 0.3s;
}

.dial-arc--off {
	opacity: 0.2;
	filter: grayscale(100%);
}

/* 圆弧进度容器（用于裁剪进度） */
.dial-arc-progress-wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	pointer-events: none;
	overflow: hidden;
	/* 使用CSS变量接收角度值 */
	--progress-angle: 0deg;
}

/* 圆弧进度（彩色高亮） */
.dial-arc-active {
	opacity: 1;
	filter: drop-shadow(0 0 10rpx rgba(76, 175, 80, 0.6));
	/* 通过遮罩实现进度效果 */
	mask-image: conic-gradient(
		from -120deg at 50% 50%,
		#000 0deg,
		#000 var(--progress-angle),
		#0000 var(--progress-angle)
	);
	-webkit-mask-image: conic-gradient(
		from -120deg at 50% 50%,
		#000 0deg,
		#000 var(--progress-angle),
		#0000 var(--progress-angle)
	);
}

/* 装饰图片 */
.dial-decoration {
	position: absolute;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 1;
}

/* 圆形中心区域 */
.dial-circle {
	position: relative;
	width: 240rpx;
	height: 240rpx;
	border-radius: 50%;
	background: rgba(200, 200, 200, 0.5);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
	transition: all 0.3s;
}

.dial-circle--on {
	background: linear-gradient(135deg, rgba(76, 175, 80, 0.3), rgba(139, 195, 74, 0.3));
	box-shadow: 0 8rpx 30rpx rgba(76, 175, 80, 0.4);
}

/* 力量值显示 */
.dial-value {
	font-size: 56rpx;
	font-weight: bold;
	color: #333333;
	line-height: 1;
}

.dial-unit {
	font-size: 24rpx;
	color: #666666;
	margin-top: 4rpx;
}

/* 中心开关按钮 */
.dial-power-btn {
	position: absolute;
	bottom: -20rpx;
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.9);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
	transition: all 0.3s;
}

.dial-power-btn:active {
	transform: scale(0.95);
}

.power-icon {
	width: 50rpx;
	height: 50rpx;
}

/* ==================== 底部模式选择区 ==================== */
.bottom-panel {
	flex-shrink: 0;
	transition: opacity 0.3s;
}

.bottom-panel--off {
	opacity: 0.4;
	pointer-events: none;
}

.mode-title {
	font-size: 28rpx;
	color: #333333;
	font-weight: bold;
	margin-bottom: 20rpx;
}

.mode-grid {
	display: flex;
	justify-content: space-between;
	gap: 10rpx;
	margin-bottom: 30rpx;
}

.mode-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
	padding: 10rpx;
	border-radius: 12rpx;
	background: rgba(255, 255, 255, 0.3);
	transition: all 0.3s;
	flex: 1;
}

.mode-item.selected {
	background: rgba(76, 175, 80, 0.3);
	transform: scale(1.05);
}

.mode-item.disabled {
	opacity: 0.3;
	pointer-events: none;
}

.mode-icon {
	width: 60rpx;
	height: 60rpx;
	transition: all 0.3s;
}

.mode-item.selected .mode-icon {
	filter: drop-shadow(0 2rpx 8rpx rgba(76, 175, 80, 0.5));
}

.mode-name {
	font-size: 20rpx;
	color: #666666;
	transition: all 0.3s;
}

.mode-item.selected .mode-name {
	color: #000000;
	font-weight: bold;
}

.mode-confirm-btn {
	width: 100%;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #CCCCCC;
	border-radius: 50rpx;
	transition: all 0.3s;
}

.mode-confirm-btn.active {
	background: linear-gradient(135deg, #4CAF50, #8BC34A);
	box-shadow: 0 8rpx 20rpx rgba(76, 175, 80, 0.4);
}

.btn-text {
	font-size: 28rpx;
	color: #FFFFFF;
	font-weight: bold;
}

/* ==================== 安全须知弹窗 ==================== */
.safety-content {
	padding: 0 10rpx;
}

.safety-item {
	font-size: 28rpx;
	color: #333333;
	line-height: 2;
	margin-bottom: 10rpx;
	text-align: left;
}
</style>
