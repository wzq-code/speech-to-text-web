# 语音转文字项目

这是一个纯前端的实时语音转文字页面，使用浏览器内置的 `Web Speech API` 完成识别，不依赖后端服务。

## 功能

- 点击按钮开始录音，再次点击停止录音
- 说话过程中实时展示识别中的文字
- 支持清空当前识别结果
- 可直接部署到 GitHub Pages

## 本地使用

1. 用最新版 Chrome 或 Edge 打开 `index.html`
2. 允许浏览器访问麦克风
3. 点击“开始录音”开始说话
4. 点击“停止录音”结束收音

## 上线方式

项目已经包含 GitHub Pages 自动部署配置文件：

- `.github/workflows/deploy.yml`

你只需要把当前目录推送到 GitHub 仓库，并在仓库设置里开启 GitHub Pages。

## GitHub Pages 部署步骤

1. 在 GitHub 创建一个新仓库，比如 `speech-to-text-web`
2. 在当前目录初始化 git 并提交代码
3. 添加远程仓库地址
4. 推送到 `main` 分支
5. 打开 GitHub 仓库的 `Settings -> Pages`
6. 在 `Build and deployment` 中选择 `GitHub Actions`
7. 等待 Actions 跑完，GitHub 会生成一个公开 HTTPS 地址

## 目录说明

- `index.html`: 页面结构
- `style.css`: 页面样式
- `app.js`: 语音识别逻辑
- `.github/workflows/deploy.yml`: GitHub Pages 自动部署配置

## 注意事项

- 推荐使用 Chrome 或 Edge，兼容性会更好
- 麦克风权限通常要求 `HTTPS` 或 `localhost`
- `Web Speech API` 的可用性依赖浏览器实现，不同浏览器表现会有差异
