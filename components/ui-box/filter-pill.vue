<template>
  <view
    class="filter-pill"
    :class="{ 'filter-pill--active': active }"
    @click="handleClick"
  >
    <text class="label">{{ label }}</text>

    <view class="right-wrap">
      <!-- 右侧内容：当前选中值（可选） -->
      <text v-if="value" class="value">{{ value }}</text>

      <!-- 下拉箭头 -->
      <view v-if="showArrow" class="arrow-icon" />
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true }, // “性别”
  value: { type: String, default: '' },    // “男 / 女 / 全部”
  active: { type: Boolean, default: false },
  showArrow: { type: Boolean, default: true }
})

const emits = defineEmits(['click'])

const handleClick = () => {
  emits('click')
}
</script>

<style scoped>
.filter-pill {
  height: 68rpx;
  padding: 0 16rpx;
  border-radius: 16rpx;
  background: rgba(229, 229, 229, 0.2);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
}

.filter-pill--active {
  background: rgba(101, 177, 254, 0.15);
}

.label {
  font-size: 24rpx;
  color: #333333;
  font-weight: 500;
}

.right-wrap {
  flex-direction: row;
  align-items: center;
  display: flex;
}

.value {
  font-size: 22rpx;
  color: #888888;
  margin-right: 8rpx;
}

/* 简单的下拉小箭头 */
.arrow-icon {
  width: 0;
  height: 0;
  border-left: 8rpx solid transparent;
  border-right: 8rpx solid transparent;
  border-top: 10rpx solid #bbbbbb;
}
</style>
