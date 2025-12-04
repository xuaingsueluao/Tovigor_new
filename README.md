# Tovigor健身 - 经典 uni-app 版本

这是使用经典 uni-app 语法（.vue 文件）重写的版本。

## 目录结构

```
classic-uniapp/
├── pages/
│   ├── index/                 # 首页
│   │   └── index.vue
│   ├── freeTraining/          # 自由训练页面
│   │   └── freeTraining.vue
│   ├── bodyTraining/          # 部位训练页面
│   │   └── bodyTraining.vue
│   └── smartAssess/           # 智能评估页面
│       └── smartAssess.vue
├── static/
│   └── icons/
│       └── homeActivity/      # 静态资源（需要从原项目复制）
├── App.vue                    # 应用配置
├── main.js                    # 入口文件
├── pages.json                 # 页面配置
├── manifest.json              # 应用配置
└── uni.scss                   # 全局样式变量
```

## 使用方法

1. 在 HBuilderX 中创建一个新的 uni-app 项目（选择默认模板）
2. 将 `classic-uniapp` 文件夹中的所有文件复制到新项目中
3. 从原项目复制 `static` 文件夹中的所有资源文件
4. 运行项目

## 主要特性

- ✅ 使用 `.vue` 文件格式（而非 `.uvue`）
- ✅ 标准的 Vue 2/3 语法
- ✅ 支持所有 uni-app 平台（H5、小程序、App）
- ✅ 使用 scoped 样式隔离
- ✅ 支持 CSS3 特性（100vh、gap 等）
- ✅ 支持渐变背景

## 与 uvue 版本的区别

| 特性 | uvue 版本 | vue 版本 |
|------|----------|---------|
| 语法 | lang="uts" | 标准 JavaScript |
| 样式 | 严格限制 | 完整 CSS3 支持 |
| 类型 | 强类型 | 可选类型 |
| 平台 | uni-app x | 全平台 |

## 注意事项

- 记得复制 `/static` 文件夹中的所有图片资源
- 如果使用 Vue3，确保 HBuilderX 版本支持
- H5 端可能需要调整部分样式以适配不同浏览器
