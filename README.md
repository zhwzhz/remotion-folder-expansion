# Remotion 文件夹展开动效 (Folder Expansion Animation)

基于 [Remotion](https://www.remotion.dev/) 与 React 打造的高精细度文件夹展开与文件跃出动效复刻工程。

## 🎬 动效展示

- **参考项目**：参考工程分析 · 文件夹展开
- **分辨率**：1920 × 1080 (1080p)
- **帧率**：60 FPS
- **时长**：9.83 秒（590 帧）
- **核心元素**：
  - macOS 经典渐变文件夹（背景仓与前景翻盖分层设计）
  - 矢量精细光标（支持点击缩放与随动跟随）
  - 纸质拟物文档（右上角折角、内容占位横线、衬线扩展名字样）
  - 拟真抛物线起跃弹跳轨迹与全组居中平移自适应布局

## 🚀 快速上手

### 环境要求
- Node.js >= 18
- npm 或 pnpm / yarn

### 1. 安装依赖
```bash
npm install
```

### 2. 本地实时预览
启动 Remotion Studio 进行实时交互式预览与时间轴微调：
```bash
npm start
```
默认会在浏览器中打开 `http://localhost:3000`。

### 3. 渲染高清视频
执行以下命令渲染 MP4 视频文件：
```bash
npm run render
```
或直接使用 remotion cli：
```bash
npx remotion render FolderExpansion out/video.mp4
```
生成的视频将保存在 `out/video.mp4`。

## 📁 目录结构

```text
remotion-folder-expansion/
├── public/
│   └── wallpaper.png             # 4K 高清绸缎桌面壁纸
├── src/
│   ├── components/
│   │   ├── FileItem.tsx          # 拟物折角文档组件与独立扩展名
│   │   ├── Folder.tsx            # 文件夹背景仓、前景翻盖与毛笔楷体标题
│   │   ├── MouseCursor.tsx       # 矢量 macOS 鼠标指针与点击缩放反馈
│   │   └── Wallpaper.tsx         # 桌面壁纸底层
│   ├── FolderExpansion.tsx       # 核心时序控制与抛物线飞行动画编排
│   ├── Root.tsx                  # Remotion Composition 根配置
│   ├── index.ts                  # Remotion 注册入口
│   └── types.ts                  # 数据类型定义
├── remotion.config.ts            # Remotion 渲染参数配置
├── tsconfig.json                 # TypeScript 编译配置
├── package.json
└── README.md
```

## 🛠 技术实现亮点

1. **分层深度感知 (Layering & Z-Index)**：
   文件夹拆解为 `FolderBack` 与 `FolderFront`。当文件最初从文件夹内部生成时，其底部被前景盖板遮挡，随着向上抛起逐渐露出全貌并向右飞行，真实呈现从文件夹内飞出的立体空间感。
2. **正弦高抛曲线 (Parabolic Trajectory)**：
   基于 `Math.sin(progress * Math.PI) * arcHeight` 叠加水平插值，实现逼真的高抛弧线与柔和落地减速。
3. **整组智能居中 (Group Re-centering)**：
   随文档逐个展开，全组容器平滑左移，确保在 1920 宽屏画面上始终呈现对称美感。

## 📄 License

MIT
