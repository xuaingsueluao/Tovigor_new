# wzl-serialbridge 串口通信插件

基于 UTS 的 Android 串口通信插件,支持 UART 设备的读写操作。

## 功能特性

- ✅ 支持打开/关闭串口
- ✅ 支持配置波特率、数据位、停止位、校验位
- ✅ 支持读写串口数据
- ✅ 支持 HEX 和 Base64 数据格式
- ✅ 支持列举可用串口设备
- ✅ 完整的错误处理机制

## 平台支持

- Android: ✅
- iOS: ❌ (暂不支持)

## 安装使用

### 1. 将 AAR 文件放置到指定位置

将你的 `serialbridge-release.aar` 文件复制到:
```
uni_modules/wzl-serialbridge/utssdk/app-android/libs/serialbridge-release.aar
```

### 2. 在页面中引入插件

```vue
<script setup lang="ts">
import { 
  openSerial, 
  writeSerial, 
  readSerial, 
  closeSerial,
  listDevices,
  type OpenOptions,
  type WriteOptions,
  type ReadOptions
} from '@/uni_modules/wzl-serialbridge'

// 使用示例见下方
</script>
```

## API 文档

### 1. listDevices - 列举可用设备

```typescript
listDevices({
  prefixes: ["/dev/ttyS", "/dev/ttyUSB"], // 可选
  success: (res) => {
    console.log("可用设备:", res.devices)
    // 输出: ["/dev/ttyS0", "/dev/ttyS1", "/dev/ttyUSB0"]
  },
  fail: (err) => {
    console.error("失败:", err.errMsg)
  }
})
```

### 2. openSerial - 打开串口

```typescript
const options: OpenOptions = {
  path: "/dev/ttyS0",
  config: {
    baudRate: 115200,  // 波特率
    dataBits: 8,       // 数据位: 5|6|7|8
    stopBits: 1,       // 停止位: 1|2
    parity: 'none'     // 校验位: 'none'|'odd'|'even'
  },
  success: (res) => {
    const portId = res.portId
    console.log("打开成功,句柄ID:", portId)
    // 保存 portId 用于后续操作
  },
  fail: (err) => {
    console.error("打开失败:", err.errMsg)
  }
}

openSerial(options)
```

### 3. writeSerial - 写入数据

```typescript
// 写入 HEX 数据
const writeOptions: WriteOptions = {
  portId: 1,                    // openSerial 返回的句柄ID
  data: "01 03 00 00 00 01",   // HEX 字符串(自动去空格)
  format: 'hex',                // 'hex' | 'base64'
  timeout: 1000,                // 超时时间(毫秒)
  success: (res) => {
    console.log("写入成功:", res.bytesWritten, "字节")
  },
  fail: (err) => {
    console.error("写入失败:", err.errMsg)
  }
}

writeSerial(writeOptions)

// 或写入 Base64 数据
writeSerial({
  portId: 1,
  data: "SGVsbG8gV29ybGQ=",  // Base64 编码的数据
  format: 'base64',
  timeout: 1000,
  success: (res) => console.log("写入成功")
})
```

### 4. readSerial - 读取数据

```typescript
const readOptions: ReadOptions = {
  portId: 1,           // 句柄ID
  length: 1024,        // 最大读取字节数
  format: 'hex',       // 返回格式: 'hex' | 'base64'
  timeout: 1000,       // 超时时间
  success: (res) => {
    console.log("读取到数据:", res.data)
    console.log("字节数:", res.bytesRead)
    // HEX 格式输出: "010300000001"
    // Base64 格式输出: "AQMAAAAB"
  },
  fail: (err) => {
    console.error("读取失败:", err.errMsg)
  }
}

readSerial(readOptions)
```

### 5. closeSerial - 关闭串口

```typescript
closeSerial({
  portId: 1,
  success: (res) => {
    console.log("关闭成功")
  },
  fail: (err) => {
    console.error("关闭失败:", err.errMsg)
  }
})
```

## 完整使用示例

```vue
<template>
  <view class="container">
    <button @click="handleListDevices">列举设备</button>
    <button @click="handleOpen">打开串口</button>
    <button @click="handleWrite">写入数据</button>
    <button @click="handleRead">读取数据</button>
    <button @click="handleClose">关闭串口</button>
    <text>{{ statusMsg }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  openSerial, 
  writeSerial, 
  readSerial, 
  closeSerial,
  listDevices
} from '@/uni_modules/wzl-serialbridge'

const statusMsg = ref<string>('')
let currentPortId = 0

// 列举设备
const handleListDevices = () => {
  listDevices({
    success: (res) => {
      statusMsg.value = `找到设备: ${res.devices.join(', ')}`
    }
  })
}

// 打开串口
const handleOpen = () => {
  openSerial({
    path: "/dev/ttyS0",
    config: {
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: 'none'
    },
    success: (res) => {
      currentPortId = res.portId
      statusMsg.value = `串口已打开,ID: ${currentPortId}`
    },
    fail: (err) => {
      statusMsg.value = `打开失败: ${err.errMsg}`
    }
  })
}

// 写入数据
const handleWrite = () => {
  if (currentPortId === 0) {
    statusMsg.value = "请先打开串口"
    return
  }
  
  writeSerial({
    portId: currentPortId,
    data: "01 03 00 00 00 01 84 0A",
    format: 'hex',
    success: (res) => {
      statusMsg.value = `写入成功: ${res.bytesWritten} 字节`
    },
    fail: (err) => {
      statusMsg.value = `写入失败: ${err.errMsg}`
    }
  })
}

// 读取数据
const handleRead = () => {
  if (currentPortId === 0) {
    statusMsg.value = "请先打开串口"
    return
  }
  
  readSerial({
    portId: currentPortId,
    length: 128,
    format: 'hex',
    timeout: 2000,
    success: (res) => {
      statusMsg.value = `读取到: ${res.data} (${res.bytesRead}字节)`
    },
    fail: (err) => {
      statusMsg.value = `读取失败: ${err.errMsg}`
    }
  })
}

// 关闭串口
const handleClose = () => {
  if (currentPortId === 0) {
    statusMsg.value = "串口未打开"
    return
  }
  
  closeSerial({
    portId: currentPortId,
    success: () => {
      statusMsg.value = "串口已关闭"
      currentPortId = 0
    },
    fail: (err) => {
      statusMsg.value = `关闭失败: ${err.errMsg}`
    }
  })
}
</script>
```

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 10001 | 打开串口失败 |
| 10002 | 写入数据失败 |
| 10003 | 读取数据失败 |
| 10004 | 关闭串口失败 |
| 10005 | 串口未打开 |
| 10006 | 参数错误 |
| 10007 | 数据格式错误 |

## 注意事项

1. **权限配置**: 需要在 `manifest.json` 中配置存储权限:
   ```json
   "android": {
     "permissions": [
       "<uses-permission android:name=\"android.permission.READ_EXTERNAL_STORAGE\"/>",
       "<uses-permission android:name=\"android.permission.WRITE_EXTERNAL_STORAGE\"/>"
     ]
   }
   ```

2. **自定义基座**: 由于使用了 AAR 库,需要制作自定义基座才能运行。

3. **设备路径**: Android 常见串口设备路径:
   - `/dev/ttyS0`, `/dev/ttyS1` - 系统串口
   - `/dev/ttyUSB0` - USB 转串口
   - `/dev/ttyAMA0` - 树莓派等设备

4. **数据格式**: 
   - HEX 格式支持空格分隔,如 `"01 03 00 00"`
   - Base64 格式需要标准 Base64 编码

## 更新日志

### 1.0.0 (2025-11-12)
- 首次发布
- 基于 Kotlin SerialPort AAR 封装
- 支持基础串口读写操作

## 技术支持

如有问题请提交 Issue。
