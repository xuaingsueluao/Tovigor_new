<template>
  <view class="container">
    <view class="header">
      <text class="title">串口通信测试</text>
    </view>
    
    <!-- 设备选择 -->
    <view class="section">
      <text class="section-title">1. 设备配置</text>
      <view class="form-item">
        <text class="label">设备路径:</text>
        <input v-model="devicePath" class="input" placeholder="/dev/ttyS3" />
      </view>
      <view class="form-item">
        <text class="label">波特率:</text>
        <picker :value="baudRateIndex" :range="baudRates" @change="onBaudRateChange">
          <view class="picker">{{ baudRates[baudRateIndex] }}</view>
        </picker>
      </view>
      <button @click="handleListDevices" class="btn btn-secondary">扫描设备</button>
    </view>
    
    <!-- 连接控制 -->
    <view class="section">
      <text class="section-title">2. 连接控制</text>
      <view class="status-bar" :class="{ connected: isConnected }">
        <text class="status-text">状态: {{ isConnected ? '已连接' : '未连接' }}</text>
        <text v-if="isConnected" class="status-info">{{ devicePath }}</text>
      </view>
      <view class="button-group">
        <button @click="handleOpenPort" :disabled="isConnected" class="btn btn-primary">
          打开串口
        </button>
        <button @click="handleClosePort" :disabled="!isConnected" class="btn btn-danger">
          关闭串口
        </button>
      </view>
    </view>
    
    <!-- 数据发送 -->
    <view class="section">
      <text class="section-title">3. 数据发送</text>
      <view class="form-item">
        <text class="label">发送数据 (HEX):</text>
        <textarea v-model="sendData" class="textarea" placeholder="AA5501020304BB" />
      </view>
      <view class="button-group">
        <button @click="handleSendCommand" :disabled="!isConnected" class="btn btn-primary">
          发送
        </button>
        <button @click="sendData = ''" class="btn btn-secondary">清空</button>
      </view>
      <view class="quick-commands">
        <text class="label">快捷命令:</text>
        <button @click="handleSendQuick('73B4000A01002AF365')" class="btn btn-small">恒10</button>
        <button @click="handleSendQuick('73B400050000E1BB65')" class="btn btn-small">力量关闭</button>
        <button @click="handleSendQuick('AA5503BB')" class="btn btn-small">测试3</button>
      </view>
    </view>
    
    <!-- 数据接收 -->
    <view class="section">
      <text class="section-title">4. 数据接收</text>
      <view class="received-header">
        <text>接收到 {{ receivedMessages.length }} 条消息</text>
        <button @click="clearReceived" class="btn btn-small">清空</button>
      </view>
      <scroll-view class="received-list" scroll-y>
        <view 
          v-for="(msg, index) in receivedMessages" 
          :key="index" 
          class="message-item"
        >
          <view class="message-header">
            <text class="message-time">{{ formatTime(msg.ts) }}</text>
            <text class="message-bytes">{{ msg.bytes }} 字节</text>
          </view>
          <text class="message-data">{{ msg.data }}</text>
        </view>
        <view v-if="receivedMessages.length === 0" class="empty-state">
          <text>暂无数据</text>
        </view>
      </scroll-view>
    </view>
    
    <!-- 统计信息 -->
    <view class="section">
      <text class="section-title">5. 统计信息</text>
      <button @click="handleGetStats" class="btn btn-secondary">刷新统计</button>
      <view v-if="stats" class="stats-grid">
        <view class="stat-item">
          <text class="stat-label">发送字节</text>
          <text class="stat-value">{{ stats.bytesTx }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-label">接收字节</text>
          <text class="stat-value">{{ stats.bytesRx }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-label">发送帧</text>
          <text class="stat-value">{{ stats.framesTx }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-label">接收帧</text>
          <text class="stat-value">{{ stats.framesRx }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-label">队列项</text>
          <text class="stat-value">{{ stats.queue ? stats.queue.items : 0 }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-label">队列字节</text>
          <text class="stat-value">{{ stats.queue ? stats.queue.bytes : 0 }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 页面保持具名导入（不要 default）：
import {
  openSerial, 
  writeSerial, 
  readSerial, 
  closeSerial,
  listDevices,
  getVersion
} from '@/uni_modules/wzl-serialbridge'

onMounted(() => {
  console.log('=== 串口测试页面已挂载 ===')
  console.log('=== 插件版本 ===', getVersion())
  uni.showToast({ title: '插件已加载', icon: 'success', duration: 1500 })
})

const devicePath = ref('/dev/ttyS3')
const baudRates = ref([9600, 19200, 38400, 57600, 115200, 230400, 460800])
const baudRateIndex = ref(4) // 默认 115200
const isConnected = ref(false)
const sendData = ref('')
const receivedMessages = ref([])
const stats = ref(null)
const maxMessages = 100
let currentPortId = 0 // 当前串口句柄 ID


onBeforeUnmount(() => {
  // 页面销毁前关闭串口
  if (isConnected.value && currentPortId > 0) {
    closeSerial({
      portId: currentPortId,
      success: () => {
        console.log('串口已自动关闭')
      }
    })
  }
})

const handleListDevices = () => {
  listDevices({
    prefixes: ['/dev/ttyS', '/dev/ttyUSB', '/dev/ttyAMA'],
    success: (res) => {
      console.log('找到设备:', res.devices)
      if (res.devices.length === 0) {
        uni.showToast({ 
          title: '未找到设备', 
          icon: 'none' 
        })
        return
      }
      
      // 显示设备列表供选择
      uni.showActionSheet({
        itemList: res.devices,
        success: (actionRes) => {
          devicePath.value = res.devices[actionRes.tapIndex]
          uni.showToast({
            title: `已选择: ${devicePath.value}`,
            icon: 'none'
          })
        }
      })
    },
    fail: (err) => {
      console.error('扫描失败:', err)
      uni.showToast({ 
        title: `扫描失败: ${err.errMsg}`, 
        icon: 'none' 
      })
    }
  })
}

const handleOpenPort = () => {
  if (!devicePath.value) {
    uni.showToast({ 
      title: '请输入设备路径', 
      icon: 'none' 
    })
    return
  }
  
  uni.showLoading({ title: '打开中...' })
  
  openSerial({
    path: devicePath.value,
    config: {
      baudRate: baudRates.value[baudRateIndex.value],
      dataBits: 8,
      stopBits: 1,
      parity: 'none'
    },
    success: (res) => {
      console.log('串口已打开:', res)
      currentPortId = res.portId
      isConnected.value = true
      uni.hideLoading()
      uni.showToast({ 
        title: '串口已打开', 
        icon: 'success' 
      })
      
      // 开始读取数据
      startReading()
    },
    fail: (err) => {
      console.error('打开失败:', err)
      uni.hideLoading()
      uni.showModal({
        title: '打开失败',
        content: `错误码 ${err.errCode}: ${err.errMsg}`,
        showCancel: false
      })
    }
  })
}

const handleClosePort = () => {
  closeSerial({
    portId: currentPortId,
    success: () => {
      console.log('串口已关闭')
      isConnected.value = false
      currentPortId = 0
      stopReading()
      uni.showToast({ 
        title: '串口已关闭', 
        icon: 'success' 
      })
    },
    fail: (err) => {
      console.error('关闭失败:', err)
      uni.showToast({ 
        title: `关闭失败: ${err.errMsg}`, 
        icon: 'none' 
      })
    }
  })
}

// 读取定时器
let readTimer = null

const startReading = () => {
  stopReading() // 先停止之前的定时器
  
  // 每 200ms 尝试读取一次数据
  readTimer = setInterval(() => {
    if (!isConnected.value || currentPortId === 0) {
      stopReading()
      return
    }
    
    readSerial({
      portId: currentPortId,
      length: 1024,
      format: 'hex',
      timeout: 100,
      success: (res) => {
        if (res.bytesRead > 0) {
          console.log('接收到数据:', res.data)
          receivedMessages.value.unshift({
            data: res.data,
            bytes: res.bytesRead,
            ts: Date.now()
          })
          
          // 限制消息数量
          if (receivedMessages.value.length > maxMessages) {
            receivedMessages.value.pop()
          }
        }
      },
      fail: (err) => {
        // 超时不提示，其他错误提示
        if (err.errCode !== 10003) {
          console.error('读取失败:', err)
        }
      }
    })
  }, 200)
}

const stopReading = () => {
  if (readTimer) {
    clearInterval(readTimer)
    readTimer = null
  }
}

const handleSendCommand = () => {
  if (!sendData.value.trim()) {
    uni.showToast({ 
      title: '请输入数据', 
      icon: 'none' 
    })
    return
  }
  
  if (!isConnected.value || currentPortId === 0) {
    uni.showToast({ 
      title: '请先打开串口', 
      icon: 'none' 
    })
    return
  }
  
  // 移除空格和换行
  const data = sendData.value.replace(/\s+/g, '')
  
  // 验证 HEX 格式
  if (!/^[0-9A-Fa-f]*$/.test(data)) {
    uni.showToast({
      title: '数据格式错误，请输入HEX格式',
      icon: 'none'
    })
    return
  }
  
  if (data.length % 2 !== 0) {
    uni.showToast({
      title: 'HEX字符串长度必须为偶数',
      icon: 'none'
    })
    return
  }
  
  writeSerial({
    portId: currentPortId,
    data: data,
    format: 'hex',
    timeout: 1000,
    success: (res) => {
      console.log('发送成功:', res)
      uni.showToast({ 
        title: `已发送 ${res.bytesWritten} 字节`, 
        icon: 'success',
        duration: 1000
      })
    },
    fail: (err) => {
      console.error('发送失败:', err)
      uni.showToast({ 
        title: `发送失败: ${err.errMsg}`, 
        icon: 'none' 
      })
    }
  })
}

const handleSendQuick = (data) => {
  sendData.value = data
}

const clearReceived = () => {
  receivedMessages.value = []
  uni.showToast({
    title: '已清空',
    icon: 'success',
    duration: 1000
  })
}

const handleGetStats = () => {
  // UTS 插件不提供统计功能,显示基本信息
  stats.value = {
    bytesTx: 0,
    bytesRx: receivedMessages.value.reduce((sum, msg) => sum + msg.bytes, 0),
    framesTx: 0,
    framesRx: receivedMessages.value.length,
    queue: {
      items: 0,
      bytes: 0
    }
  }
  
  uni.showToast({
    title: '统计已更新',
    icon: 'success',
    duration: 1000
  })
}

const onBaudRateChange = (e) => {
  baudRateIndex.value = e.detail.value
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  const ms = String(date.getMilliseconds()).padStart(3, '0')
  return `${h}:${m}:${s}.${ms}`
}
</script>

<style scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
}

.title {
  font-size: 44rpx;
  font-weight: bold;
  color: #fff;
}

.section {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.form-item {
  margin-bottom: 20rpx;
}

.label {
  font-size: 28rpx;
  color: #666;
  display: block;
  margin-bottom: 10rpx;
}

.input, .textarea, .picker {
  width: 100%;
  padding: 20rpx;
  border: 2rpx solid #e0e0e0;
  border-radius: 10rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.textarea {
  min-height: 120rpx;
}

.picker {
  background-color: #f9f9f9;
}

.status-bar {
  padding: 30rpx;
  background-color: #f5f5f5;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  border-left: 6rpx solid #999;
}

.status-bar.connected {
  background-color: #e8f5e9;
  border-left-color: #4caf50;
}

.status-text {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

.status-info {
  font-size: 24rpx;
  color: #666;
  display: block;
}

.button-group {
  display: flex;
  gap: 20rpx;
  margin-top: 20rpx;
}

.btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
}

.btn-danger {
  background-color: #f44336;
  color: #fff;
}

.btn-small {
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 20rpx;
  font-size: 24rpx;
  margin-right: 10rpx;
}

.btn[disabled] {
  opacity: 0.5;
}

.quick-commands {
  margin-top: 20rpx;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.received-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.received-list {
  max-height: 600rpx;
  border: 2rpx solid #e0e0e0;
  border-radius: 10rpx;
  padding: 20rpx;
}

.message-item {
  background-color: #f9f9f9;
  padding: 20rpx;
  border-radius: 10rpx;
  margin-bottom: 15rpx;
  border-left: 4rpx solid #667eea;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.message-time {
  font-size: 24rpx;
  color: #999;
}

.message-bytes {
  font-size: 24rpx;
  color: #667eea;
  font-weight: bold;
}

.message-data {
  font-size: 26rpx;
  color: #333;
  font-family: monospace;
  word-break: break-all;
}

.empty-state {
  text-align: center;
  padding: 60rpx;
  color: #999;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-top: 20rpx;
}

.stat-item {
  background-color: #f9f9f9;
  padding: 30rpx;
  border-radius: 10rpx;
  text-align: center;
}

.stat-label {
  font-size: 24rpx;
  color: #666;
  display: block;
  margin-bottom: 10rpx;
}

.stat-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #667eea;
  display: block;
}
</style>
