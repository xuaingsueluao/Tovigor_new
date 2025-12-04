<!--
 * 步骤进度条组件
 * 功能：显示多步骤流程的当前进度（类似Instagram Stories的进度条）
 * 用途：用于多页面引导流程、问卷调查、分步表单等场景
 * 
 * 使用示例：
 * <step-bar :totalSteps="5" :currentStep="2" />
 * 表示总共5步，当前在第2步（前2个进度条会高亮）
 -->
<template>
  <view class="step-bar">
    <view
      v-for="(item, index) in totalSteps"
      :key="index"
      class="step-item"
      :class="{ 'step-item-active': index < currentStep }"
    />
  </view>
</template>

<script setup>
// 定义 props
const props = defineProps({
  totalSteps: {
    type: Number,     // 总步骤数
    required: true
  },
  currentStep: {
    type: Number,     // 当前步骤（从1开始计数，如currentStep=1表示第1步完成）
    required: true
  }
})
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.step-bar {
  display: flex;
  align-items: center;
  padding: 0 24rpx;
}

.step-item {
  flex: 1;
  height: 8rpx;
  margin-right: 8rpx;
  border-radius: 999rpx;
  background-color: #e0e0e0;
  transition: background-color 0.25s;
}

.step-item:last-child {
  margin-right: 0;
}

.step-item-active {
  background-color: $emerald-green;
}
</style>
