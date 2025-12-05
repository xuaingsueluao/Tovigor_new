<template>
	<view class="course-detail">
		<!-- 顶部导航栏 -->
		<view class="header">
			<CommonBackButton class="back-btn-position" />
			<text class="header-title">{{ course.title }}</text>
		</view>

		<!-- 主要内容区域 -->
		<view class="content">
			<!-- 封面卡片区域 -->
			<view class="cover-card">
				<view class="cover-section">
					<image 
						class="cover-image" 
						:src="course.cover" 
						mode="aspectFill"
					/>
					
					<!-- 暗角渐变蒙层 -->
					<view class="cover-overlay"></view>
					
					<!--课程简介卡片 intro-card
						这是一个浮动在封面图右上角的白色半透明卡片
						结构：白色卡片容器 > 彩色横线 > "课程简介"标题 > 简介文字内容 
						装饰性彩色横线（橙红色渐变） intro-line
						卡片标题文字："课程简介"  intro-title
						卡片正文内容：显示课程的详细介绍文字  intro-text -->
					<view class="intro-card">
						<view class="intro-line"></view>
						<text class="intro-title">课程简介</text>
						<text class="intro-text">{{ course.intro }}</text>
					</view>
				
					<!-- 标签和时长行（在封面底部） -->
					<view class="tags-duration-overlay">
					<view class="tags-wrap">
						<template v-for="(tag, index) in course.tags" :key="index">
						<text class="tag-item">{{ tag }}</text>
						<view
							v-if="index < course.tags.length - 1"
							class="tag-divider"
							/>
						</template>
					</view>
						<text class="duration-text">{{ course.duration }}</text>
					</view>
				</view>
			</view>

			<!-- 底部内容区域 -->
			<view class="bottom-content">
				<!-- 注意事项卡片 -->
				<view class="notice-card">
					<view class="notice-header">
						<view class="notice-icon"></view>
						<text class="notice-title">注意事项</text>
					</view>
					<view class="notice-list">
						<view 
							v-for="(notice, index) in course.noticeList" 
							:key="index" 
							class="notice-item"
						>
							<text class="notice-number">{{ index + 1 }}.</text>
							<text class="notice-content">{{ notice }}</text>
						</view>
					</view>
				</view>

				<!-- 动作预览区域 -->
				<view class="preview-section">
					<text class="preview-title">动作预览</text>
					<view class="preview-list">
						<view 
							v-for="preview in course.previews.slice(0, 4)" 
							:key="preview.id" 
							class="preview-item"
						>
							<image 
								class="preview-image" 
								:src="preview.cover" 
								mode="aspectFill"
							/>
							<text class="preview-name">{{ preview.name }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部开始训练按钮 -->
		<view class="bottom-bar">
			<view class="start-btn" @click="startTraining">
				<text class="start-btn-text">开始训练</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import CommonBackButton from '@/components/ui-box/common-back-button.vue'

// 定义课程详情数据接口（使用 JSDoc 类型注释）
/**
 * @typedef {Object} CourseDetail
 * @property {string | number} id
 * @property {string} title
 * @property {string} cover
 * @property {string[]} tags
 * @property {string} duration
 * @property {string} intro
 * @property {string[]} noticeList
 * @property {Array<{id: string | number, name: string, cover: string}>} previews
 */

// 接收 props
const props = defineProps({
	course: {
		type: Object,
		required: true
	}
})

// 开始训练
const startTraining = () => {
	console.log('开始训练课程:', props.course.title)
	uni.showToast({
		title: '开始训练功能开发中',
		icon: 'none'
	})
	// TODO: 跳转到训练页面
	// uni.navigateTo({
	//   url: '/pages/training/training?courseId=' + props.course.id
	// })
}
</script>

<style scoped lang="scss">
.course-detail {
	width: 100%;
	min-height: 100vh;
	background-color: #F5F5F5;
	display: flex;
	flex-direction: column;
}

/* 顶部导航栏 */
.header {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 88rpx;
	padding: 0 24rpx;
	background-color: #F5F5F5;
	z-index: 10;
}

.back-btn-position {
	position: absolute;
	left: 24rpx;
	top: 50%;
	transform: translateY(-50%);
}

.header-title {
	font-size: 34rpx;
	font-weight: 700;
	color: #333333;
	text-align: center;
}

/* 主要内容区域 */
.content {
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 0 24rpx;
	overflow: hidden;
}

/* 封面卡片容器 */
.cover-card {
	margin-top: 12rpx;
	margin-bottom: 16rpx;
	flex-shrink: 0;
}

/* 封面区域 */
.cover-section {
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 55%;
	border-radius: 20rpx;
	overflow: hidden;
	box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.1);
}

.cover-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

/* 暗角渐变蒙层 */
.cover-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.2) 100%);
	pointer-events: none;
}

/* 课程简介卡片 */
/* 整个白色半透明卡片的样式，浮动在封面图右上角 */
.intro-card {
	position: absolute;      /* 绝对定位，相对于 .cover-section 容器 */
	right: 24rpx;            /* 距离封面右边 24rpx */
	top: 140rpx;              /* 距离封面顶部 60rpx */
	width: 16%;              /* 卡片宽度占封面宽度的 16%（缩小了） */
	padding: 8rpx;           /* 卡片内边距，控制内容与边框的距离（缩小了） */
	background: rgba(255, 255, 255, 0.4);  /* 白色半透明背景 */
	//backdrop-filter: blur(10rpx);           /* 毛玻璃模糊效果 */
	border-radius: 12rpx;    /* 圆角大小 */
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);  /* 阴影效果 */
}

/* 卡片顶部的装饰性彩色横线 */
.intro-line {
	width: 40rpx;            /* 横线宽度 */
	height: 5rpx;            /* 横线高度（粗细） */
	background: linear-gradient(90deg, #FF6B6B, #FF8E53);  /* 橙红色渐变 */
	border-radius: 3rpx;     /* 横线的圆角 */
	margin: 0 auto 0rpx;     /* 水平居中，底部留 8rpx 间距 */
}

/* 卡片标题："课程简介"这几个字 */
.intro-title {
	display: block;          /* 块级元素，独占一行 */
	font-size: 18rpx;        /* 字体大小 */
	font-weight: 600;        /* 字体粗细（中等加粗） */
	color: #333333;          /* 文字颜色（深灰色） */
	margin-bottom: 0rpx;     /* 与下方正文的间距 */
	text-align: center;      /* 文字居中对齐 */
}

/* 卡片正文内容：课程的详细介绍文字 */
.intro-text {
	display: block;          /* 块级元素，独占一行 */
	font-size: 12rpx;        /* 字体大小（比标题小） */
	line-height: 1.4;        /* 行高，控制行与行之间的间距 */
	color: #666666;          /* 文字颜色（中灰色，比标题浅） */
	text-align: center;      /* 文字居中对齐 */
}

/* 标签和时长（封面底部浮层） */
.tags-duration-overlay {
	position: absolute;
	bottom: 10rpx;           /* 距离底部留白 */
	left: 10rpx;             /* 距离左侧留白 */
	right: 10rpx;            /* 距离右侧留白 */
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10rpx 10rpx;    /* 内边距 */
	background: rgba(255, 255, 255, 0.4);  /* 半透明白色背景 */
	border-radius: 20rpx;    /* 圆角 */
	//backdrop-filter: blur(8rpx);  /* 背景模糊效果 */
	color: #ffffff;                        // 里面所有 text 默认变成白色
}

/* 左侧标签区域：一排文字 + 竖线 */
.tags-wrap {
	flex: 1;  
	display: flex;  /* 横向排列标签 */
	align-items: center;  /* 垂直居中 */
}

.tag-item {
	display: inline-flex;  /* 行内块元素，横向排列 */
	align-items: center;
	font-size: 20rpx;
	//color: #333333;          /* 深色文字（白色背景上） */
	color: #ffffff;
	font-weight: 600;
}

/* 中间的竖线分隔符 */
.tag-divider {
  width: 5rpx;                           /* 粗细 */
  height: 26rpx;                         /* 高度，比文字略高一点 */
  margin: 0 12rpx;                       /* 左右留一点空隙 */
  border-radius: 999rpx;                   /* 圆角，变成胶囊形状 */
  background: rgb(255, 255, 255);  /* 白色带一点透明 */
}

/* 右侧分钟数 */
.duration-text {
	font-size: 22rpx;	   /* 字体大小 */
	font-weight: 700;     /* 加粗字体 */
	color: #FF6B35;    /* 橙红色高亮时长 */
	margin-left: 12rpx;
	flex-shrink: 0;   	/* 不允许缩小 */
}

/* 底部内容区域 */
.bottom-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
	overflow: hidden;
}

/* 注意事项卡片 */
.notice-card {
	margin-bottom: 12rpx;
	padding: 20rpx;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
	flex-shrink: 0;
}

.notice-header {
	display: flex;
	align-items: center;
	margin-bottom: 12rpx;
}

.notice-icon {
	width: 32rpx;
	height: 32rpx;
	border: 3rpx solid #FF6B6B;
	border-radius: 50%;
	margin-right: 10rpx;
	position: relative;
	flex-shrink: 0;
}

.notice-icon::after {
	content: '!';
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 20rpx;
	font-weight: bold;
	color: #FF6B6B;
}

.notice-title {
	font-size: 24rpx;
	font-weight: 700;
	color: #333333;
}

.notice-list {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.notice-item {
	display: flex;
	align-items: flex-start;
}

.notice-number {
	font-size: 20rpx;
	font-weight: 600;
	color: #FF6B6B;
	margin-right: 6rpx;
	flex-shrink: 0;
	line-height: 1.4;
}

.notice-content {
	flex: 1;
	font-size: 20rpx;
	line-height: 1.4;
	color: #555555;
}

/* 动作预览区域 */
.preview-section {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
}

.preview-title {
	display: block;
	font-size: 24rpx;
	font-weight: 700;
	color: #333333;
	margin-bottom: 12rpx;
	flex-shrink: 0;
}

.preview-list {
	display: flex;
	gap: 12rpx;
	flex: 1;
}

.preview-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.preview-image {
	width: 100%;
	aspect-ratio: 1;
	border-radius: 12rpx;
	background-color: #F0F0F0;
	margin-bottom: 6rpx;
}

.preview-name {
	font-size: 18rpx;
	color: #555555;
	text-align: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
}

/* 底部占位 */
.bottom-spacer {
	height: 140rpx;
}

/* 底部按钮栏 */
.bottom-bar {
	flex-shrink: 0;
	padding: 16rpx 24rpx;
	padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
	background-color: #F5F5F5;
}

.start-btn {
	width: 100%;
	height: 72rpx;
	background: linear-gradient(90deg, #4CAF50, #66BB6A);
	border-radius: 36rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 4rpx 16rpx rgba(76, 175, 80, 0.3);
}

.start-btn:active {
	opacity: 0.9;
}

.start-btn-text {
	font-size: 28rpx;
	font-weight: 700;
	color: #FFFFFF;
}
</style>
