# Tovigor 健身应用 - AI 开发指南

## 项目概览

这是一个基于 **uni-app (Vue 3)** 的健身应用，运行在 HBuilderX 中，主要目标平台是 **Android App**。核心特点是通过自定义 UTS 插件与硬件设备（串口通信）集成，实现智能健身设备控制。

## 架构要点

### 技术栈
- **框架**: uni-app Vue 3 (Composition API)
- **构建工具**: HBuilderX + @dcloudio/uni-cli
- **平台**: Android App (app-android)，H5 仅用于调试
- **原生集成**: UTS (TypeScript-like) 插件系统 + Kotlin AAR 库

### 目录结构
```
tovigor_v1/
├── pages/                     # 页面目录（Vue SFC）
│   ├── index/                 # 首页（卡片式导航）
│   ├── freeTraining/          # 自由训练（核心业务：力量旋钮控制）
│   ├── bodyTraining/          # 部位训练
│   ├── smartAssess/           # 智能评估
│   ├── idle/                  # 待机页
│   └── serial-test/           # 串口调试工具（重要！）
├── components/                # 全局组件
│   └── modalGeneral.vue       # 统一弹窗组件（v-model:show 绑定）
├── uni_modules/               # uni-app 插件目录
│   └── wzl-serialbridge/      # 串口通信 UTS 插件（关键）
│       ├── interface.uts      # TypeScript 接口定义
│       ├── unierror.uts       # 统一错误码
│       └── utssdk/
│           └── app-android/
│               ├── index.uts           # Android 平台实现（UTS 语法）
│               ├── config.json         # Android 配置（minSdkVersion, abis）
│               └── libs/
│                   └── serialbridge-debug.aar  # Kotlin 串口库
├── manifest.json              # uni-app 配置（appid, 权限, 平台设置）
├── pages.json                 # 页面路由和导航栏配置
└── vue.config.js              # Webpack 配置（路径别名）
```

## 关键业务逻辑

### 1. 串口通信插件（UTS）
**核心文件**: `uni_modules/wzl-serialbridge/`

- **调用方式**: 
  ```javascript
  import { openSerial, writeSerial, readSerial, closeSerial } from '@/uni_modules/wzl-serialbridge'
  ```
- **API 风格**: uni-app 回调式（success/fail/complete），非 Promise
- **数据格式**: HEX 字符串（例如 `"AA5501BB"`）或 Base64
- **状态管理**: UTS 插件内部维护 `serialPorts: Map<Int, SerialPort>`，通过 `portId` 标识连接
- **错误码**: 10001-10007（见 `interface.uts` 和 `unierror.uts`）

**关键实现细节**:
- AAR 库由外部 Android Studio 项目编译提供（`libs/serialbridge-debug.aar`）
- UTS 通过 `import SerialPort from 'com.example.serialbridge.SerialPort'` 导入 Kotlin 类
- 数据转换由 `hexToBytes`/`bytesToHex` 函数处理（见 `app-android/index.uts`）
- **自定义基座必需**: 标准 HBuilderX 基座不包含 UTS 插件和 AAR，必须通过 `运行 → 制作自定义调试基座` 打包

### 2. 自由训练页核心交互（`freeTraining.vue`）
- **力量旋钮**: 通过 `@touchmove.stop.prevent` 捕获触摸，计算触点相对圆心的角度，映射到 0-100kg
  - 圆弧范围: -120° 至 +120°（使用 CSS 变量 `--progress-angle` 驱动遮罩渐变）
  - **节流优化**: `UPDATE_INTERVAL = 20ms` 限制更新频率
  - 关机时（`!powerOn`）禁止调节
- **训练模式**: 6 种模式（向心等张、离心等张、流体阻力等），通过数组索引管理
- **安全须知弹窗**: 页面挂载时（`onMounted`）自动弹出，使用 `ModalGeneral` 组件

### 3. 串口测试页（`serial-test/serial-test.vue`）
**最重要的调试工具**，展示了插件使用的完整流程:
1. 扫描设备（`listDevices`）→ 选择设备路径
2. 打开串口（`openSerial`）→ 获得 `portId`
3. 循环读取（200ms 定时器 + `readSerial`）
4. 发送命令（`writeSerial` + HEX 验证）
5. 关闭串口（`closeSerial` + 清理定时器）

**调试技巧**:
- 通过 `adb logcat | grep -i "serial\|wzl"` 查看 Android 日志
- 快捷命令按钮（`AA5501BB`）用于快速测试

## 开发工作流

### 本地开发
```powershell
# 在 HBuilderX 中运行到 H5（仅 UI 调试，串口功能不可用）
运行 → 运行到浏览器 → Chrome

# 运行到 Android（需自定义基座）
运行 → 运行到手机或模拟器 → 运行到 Android App 基座
```

### 自定义基座制作（关键步骤）
串口插件依赖 AAR，必须打包到自定义基座中:
1. `运行 → 制作自定义调试基座`（云端打包 3-5 分钟）
2. 基座 APK 下载到 `unpackage/debug/android_debug.apk`
3. 安装到设备后，代码修改支持热更新（无需重新打包）

**常见错误**:
- "Cannot read property 'openSerial' of undefined" → 使用了标准基座，需切换到自定义基座
- "打开串口失败 (10001)" → 设备路径错误或权限不足（需 `chmod 666 /dev/ttyS3`）

### 调试串口通信
1. 先在 `serial-test` 页验证插件功能
2. 使用 `adb shell ls -l /dev/tty*` 查找可用设备
3. 在业务页（如 `freeTraining`）集成前，确保测试页完全正常

## 代码约定

### Vue 组件风格
- **Composition API** (`<script setup>`)，不使用 Options API
- **响应式数据**: `ref` 而非 `reactive`（便于解构）
- **生命周期**: 使用 `onMounted`, `onBeforeUnmount` 等组合式 API
- **事件修饰符**: `@touchmove.stop.prevent` 防止滚动穿透

### 样式规范
- **单位**: 全部使用 `rpx`（uni-app 响应式单位），避免 `px`
- **颜色**: 渐变使用 `linear-gradient(135deg, ...)`
- **布局**: Flexbox（`display: flex`），避免浮动和绝对定位（除非装饰性元素）
- **Scoped 样式**: 所有组件样式必须加 `<style scoped>`

### UTS 插件注意事项
- **类型系统**: UTS 类似 TypeScript 但更严格（如 `Int` 不等于 `number`）
- **Kotlin 互操作**: 使用全限定类名导入（`com.example.serialbridge.SerialPort`）
- **错误处理**: 必须 `try-catch` 并通过 `fail` 回调返回 `SerialErrorImpl`
- **数据转换**: HEX ↔ ByteArray 转换逻辑已实现，直接复用

### 文件命名
- 页面目录: 小驼峰（`freeTraining/freeTraining.vue`）
- 组件: 小驼峰（`modalGeneral.vue`）
- 静态资源: 下划线命名（`ic_power.svg`, `bg_stat_board.png`）

## 常见任务参考

### 添加新页面
1. 在 `pages/` 下创建目录和 `.vue` 文件
2. 在 `pages.json` 的 `pages` 数组中注册（路径省略 `.vue`）
3. 使用 `uni.navigateTo({ url: '/pages/xxx/xxx' })` 跳转

### 调用串口插件
```javascript
import { writeSerial } from '@/uni_modules/wzl-serialbridge'

// 发送力量值（示例：50kg → HEX 命令）
writeSerial({
  portId: currentPortId.value,
  data: 'AA5532BB',  // 0x32 = 50
  format: 'hex',
  success: (res) => console.log('发送成功', res.bytesWritten),
  fail: (err) => uni.showToast({ title: err.errMsg, icon: 'none' })
})
```

### 集成新 AAR 库
1. 在 Android Studio 中编译生成 `.aar` 文件
2. 放入 `uni_modules/wzl-serialbridge/utssdk/app-android/libs/`
3. 在 `index.uts` 中通过 `import` 导入 Kotlin 类
4. **重新制作自定义基座**（云端打包才会包含新 AAR）

## 关键文件速查

- **串口 API 定义**: `uni_modules/wzl-serialbridge/interface.uts`
- **串口 Android 实现**: `uni_modules/wzl-serialbridge/utssdk/app-android/index.uts`
- **串口调试页**: `pages/serial-test/serial-test.vue`
- **核心业务页**: `pages/freeTraining/freeTraining.vue`
- **路由配置**: `pages.json`
- **应用配置**: `manifest.json`
- **测试指南**: `测试指南.md`（详细的基座制作和调试步骤）

## 重要提醒

1. **H5 平台仅用于 UI 预览**，串口功能必须在 Android 真机/模拟器测试
2. **修改 UTS 插件或 AAR 后必须重新制作基座**
3. **HBuilderX 版本需 >= 3.6.0** 才支持 UTS 插件
4. **设备权限**: `manifest.json` 已配置 `READ_EXTERNAL_STORAGE` 和 `WRITE_EXTERNAL_STORAGE`
5. **串口设备路径**通常为 `/dev/ttyS*` 或 `/dev/ttyUSB*`，需在目标硬件上确认
