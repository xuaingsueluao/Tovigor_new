Q：vs code怎么导出设置？我在工作机上用vs code写代码，各种环境跟插件我都配置好了。 我现在想在另一台电脑上配置一模一样的环境，有没有什么便捷的方案？

```
使用官方自带的 Settings Sync，配合github账号
```

前提：两台电脑都能上网，最好都能登录同一个 GitHub / Microsoft 账号。

### 1. 在工作机上开启同步

1. 打开 VS Code（工作机）。
2. 右下角/左下角有个齿轮 ⚙ → 点击 `Turn on Settings Sync...`（开启设置同步）。
    如果没看到，可以：
   - `Ctrl + Shift + P` → 搜索 `Settings Sync: Turn On`
3. 选择用 **GitHub** 或 **Microsoft** 账号登录一下。
4. VS Code 会问你：要同步啥？
   - ✅ Settings（设置）
   - ✅ Keybindings（快捷键）
   - ✅ Extensions（扩展）
   - ✅ UI State / Snippets 等等
      基本都勾上就行。

之后你在这台机子上：

- 安装的扩展
- 修改的设置（包括工作台主题、字体、格式化规则等）

都会自动同步到云端。

------

### 2. 在另一台电脑上“复刻”环境

1. 在新电脑上安装 VS Code。
2. 打开 VS Code，用同样的方法：
   - `Ctrl + Shift + P` → `Settings Sync: Turn On`
3. 用**同一个账号**登录（GitHub 或 Microsoft）。
4. 选择 `Merge` 或 `Replace`：
   - 如果新电脑几乎是空白，直接选 **Replace Local**（用云端覆盖本地）。
   - 如果本地已经有一些设置，就选 **Merge**。

VS Code 会自动帮你：

- 安装你在工作机上的那些插件
- 同步你的 `settings.json`、快捷键、主题等等

等它自己装完扩展就基本一模一样了。

> ✅ 这是最省心的方案：以后你在任意一台电脑改设置、装插件，其他电脑都会自动跟着变。

好，我们来搞“用 GitHub 搬家项目”这件事。
 你就把 GitHub 当成：**一个帮你在两台电脑之间同步项目的网盘，但带版本控制。**

整体分两步：

1. 电脑 A：把现有项目“推”到 GitHub
2. 电脑 B：从 GitHub “拉”下来，以后两个来回 `push / pull` 就能同步

我按这种场景一步步写，你照抄命令就行。

------

## 0. 先准备好三个东西

### ① 注册 GitHub 账号

去 github.com 注册一个账号（如果已经有就跳过）。

### ② 安装 Git

在两台电脑都装：

- Windows：去 Git 官网装 `Git for Windows`，装完以后终端里可以 `git --version`。

- 在 VS Code 里：`终端 → 新建终端`，输入：

  ```bash
  git --version
  ```

  能看到版本号就 OK。

### ③ 给 git 写上你的名字 & 邮箱（只需要做一次）

在任意一个终端执行（两台电脑都做一遍）：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"
```

邮箱可以用你的 GitHub 邮箱。

------

## 1. 在电脑 A：把本地项目上传到 GitHub

假设你在电脑 A 上已经有一个项目文件夹，比如 `D:\projects\my-app`。

### 1.1 在项目里初始化 git 仓库

1. 用 VS Code 打开这个项目文件夹。
2. 打开 VS Code 终端：`Ctrl + Shift + ~`（或菜单“终端 → 新建终端”）。
3. 确认当前目录是项目根目录（能看到 `package.json` / `README` 那种位置），然后执行：

```bash
git init
git status
```

这时应该能看到一堆 `Untracked files`（未跟踪文件）。

> 说明：这个项目现在已经变成 git 仓库了，但还没任何“快照”。

------

### 1.2 第一次提交（commit）

先把所有文件加入版本控制：

```bash
git add .
```

然后做一次提交：

```bash
git commit -m "Initial commit"
```

到这里为止：

- 你的项目已经在本地有了一份完整的历史记录（第一个版本）。
- 但还只在你电脑 A 上，还没上 GitHub。

------

### 1.3 在 GitHub 网站上创建一个仓库

1. 打开浏览器 → 登录 GitHub。
2. 右上角 `+` → `New repository`。
3. 填：
   - Repository name: 比如 `my-app`
   - Visibility: 建议选 `Private`（私有），不想公开就用这个。
   - **不要勾选** “Initialize this repository with a README”等（避免跟本地冲突）。
4. 点 `Create repository`。

创建成功后，会看到 GitHub 给你一串提示命令，大概长这样：

```bash
git remote add origin https://github.com/你的用户名/my-app.git
git branch -M main
git push -u origin main
```

------

### 1.4 在电脑 A 上把代码推到 GitHub

回 VS Code 终端，在项目根目录执行刚才那几行（按顺序）：

```bash
git remote add origin https://github.com/你的用户名/my-app.git
git branch -M main
git push -u origin main
```

第一次 `git push` 的时候：

- 可能会弹出一个浏览器，让你登录 GitHub / 授权。
- 或 VS Code 右下角弹出 “Sign in to GitHub” 对话框，你点允许就行。

成功后，你刷新 GitHub 仓库页面，就能看到你所有项目文件了。

> ✅ 到这里：
>  电脑 A → GitHub 上传成功。
>  现在 GitHub 上有一份完整项目。

------

## 2. 在电脑 B：从 GitHub 拉取（clone）

接下来在另一台电脑 B 上，把这个项目拉下来。

### 2.1 在电脑 B 上安装 Git & VS Code

同样：

- 安装 Git（`git --version` 能用）。
- 安装 VS Code（如果还没装的话）。
- `git config --global user.name / user.email` 配一下（只需一次）。

### 2.2 用 `git clone` 把仓库拉下来

1. 在 GitHub 仓库页面，点绿色按钮 **“Code”** → 选择 `HTTPS`，复制那串地址，比如：

   ```text
   https://github.com/你的用户名/my-app.git
   ```

2. 在电脑 B 上打开一个终端（VS Code 或系统终端都行），先切到你想放项目的目录，比如：

```bash
cd D:\projects
```

1. 运行：

```bash
git clone https://github.com/你的用户名/my-app.git
```

1. 执行完会多一个 `my-app` 文件夹，进到里面：

```bash
cd my-app
```

然后你就可以用 VS Code 打开这个文件夹开始开发了。

> ✅ 现在：
>  电脑 B 上有一份跟 GitHub、电脑 A 一模一样的项目。

------

## 3. 以后日常怎么同步？（push / pull）

假设你在电脑 B 上改了代码，想同步回 GitHub，再让电脑 A 拉下来。

### 3.1 在电脑 B：提交 + 推送

在项目根目录里，按顺序执行：

```bash
git status                 # 看看改了什么
git add .                  # 把修改加入暂存区
git commit -m "描述本次改动"   # 做一个提交
git push                   # 推到 GitHub（因为第一次已经 -u 过了，可以直接 git push）
```

### 3.2 在电脑 A：拉取最新修改

在电脑 A 的同一个项目目录：

```bash
git pull
```

这样就把电脑 B 的改动拉下来了，两边就同步了。

以后你只要记住这两套命令：

- **有改动的一端：**

  ```bash
  git add .
  git commit -m "说明你干了啥"
  git push
  ```

- **想更新的一端：**

  ```bash
  git pull
  ```

就能在两台机器之间来回同步了。

------

## 4. 不想敲命令的话，VS Code 也有图形界面

你习惯 VS Code 的话，可以这么玩（概念一样，只是点点点）：

### 初始化 & 首次上传（电脑 A）

1. 左侧边栏点“Source Control”（源码管理，那个树枝图标）。
2. 如果没有 git 仓库，会有个按钮 `Initialize Repository` → 点一下 = `git init`。
3. 上面会列出所有改动文件，点顶部的 `+` 可以 `git add`。
4. 在上方输入框里写提交说明，比如 `Initial commit`，点右侧的勾 = `git commit`。
5. 右下角可能有 `Publish to GitHub` 之类的按钮，点一下按提示操作，就会帮你：
   - 在 GitHub 上创建仓库
   - 配置远程
   - 做第一次 `git push`

### 以后日常提交 & 推送（两边都一样）

- `Source Control` 视图里：
  - 使用 `+` 把改动加入暂存区（等价 `git add`）
  - 输入 commit message，点 √（等价 `git commit`）
  - 顶部会有 `Sync Changes` / `Push` / `Pull` 图标，点一下即可。

你愿意的话，可以混搭：
 有时候用命令，有时候用 VS Code GUI，本质是同一套 git 操作。

------

## 5. 下一步可以这么玩

如果你愿意，可以把你现在的具体状态告诉我一句，比如：

- “我现在在电脑 A，本地项目路径是 D:\xxx\xxx，已经装好 git 和 VS Code”
- “我已经在 GitHub 上建了一个空仓库 / 还没建仓库”

我就可以直接给你一份**完全贴合你当前情况**的命令清单（不用思考，直接复制粘贴到终端就能完成上传 / 拉取）。如果你中间遇到什么报错，把报错复制给我，我帮你逐条拆。