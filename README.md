# 深圳中学支教社官方网站

> 教育不是灌输，而是点燃火焰

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-green)](https://ecstaticmurdockal.github.io/website-volunteerEducationClub/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 📖 项目简介

深圳中学支教社官方网站，展示社团活动、支教学校、精彩瞬间等内容。采用现代化设计，提供流畅的用户体验。

### ✨ 主要功能

- 🗺️ **交互式地图** - 展示支教学校位置，可点击查看详情
- 📅 **活动展示** - 年度大型活动和日常活动时间线
- 🖼️ **精彩瞬间** - Gallery展示照片、视频、PPT作品
- 🧪 **人格测试** - 16种支教人格测试，发现你的支教天赋
- 📱 **响应式设计** - 完美适配PC、平板、手机

## 🎨 设计特色

### 配色方案
- 主色：`#68be8d` (绿色)
- 次要色：`#ebd842` (黄色)
- 强调色：`#98d98e` (浅绿色)

### 交互体验
- Apple风格的丝滑动画
- 毛玻璃效果（backdrop-filter）
- 平滑滚动和过渡
- 微交互反馈

## 📁 项目结构

```
website-vEducation/
├── index.html              # 主页面（包含所有section）
├── styles.css              # 样式文件（1500+行，包含轮播、动画等）
├── script.js               # 主要JavaScript（地图、Gallery、轮播等）
├── quiz.js                 # 人格测试逻辑（16人格系统）
├── images/                 # 图片资源目录
│   ├── icon.jpg           # 社团Logo
│   ├── schools/           # 学校照片（6张）
│   │   ├── fengguang-1.jpg ~ fengguang-3.jpg
│   │   └── beidou-1.jpg ~ beidou-3.jpg
│   ├── activities/        # 活动照片（31张）
│   │   ├── first-class-1.jpg ~ first-class-3.jpg
│   │   ├── baituan-1.jpg ~ baituan-3.jpg
│   │   ├── christmas-1.jpg ~ christmas-5.jpg
│   │   ├── culture-month-1.jpg ~ culture-month-3.jpg
│   │   ├── farewell-1.jpg ~ farewell-4.jpg
│   │   ├── collaboration-astronomy-1.jpg, collaboration-astronomy-2.jpg
│   │   ├── collaboration-volleyball-1.jpg, collaboration-volleyball-2.jpg
│   │   ├── collaboration-debate-1.jpg, collaboration-debate-2.jpg
│   │   ├── collaboration-dance.jpg
│   │   ├── collaboration-art.jpg
│   │   └── weekly-teaching-1.jpg ~ weekly-teaching-5.jpg
│   └── gallery/           # Gallery展示照片（28张）
│       ├── group-photo-1.jpg ~ group-photo-6.jpg
│       ├── teaching-moment-1.jpg ~ teaching-moment-7.jpg
│       ├── team-building-1.jpg ~ team-building-4.jpg
│       ├── virtual-character-1.jpg, virtual-character-2.jpg
│       ├── envelope-letter-1.jpg, envelope-letter-2.jpg
│       ├── postcard-1.jpg ~ postcard-5.jpg
│       ├── bookmark-1.jpg, bookmark-2.jpg
│       ├── video-2025.mp4, video-2025-thumbnail.jpg (待上传)
│       ├── video-2024.mp4, video-2024-thumbnail.jpg (待上传)
│       └── ppt-1.pdf ~ ppt-3.pdf + thumbnails (待上传)
├── README.md              # 项目说明文档
├── CHANGES_SUMMARY.md     # 更改总结
└── UPDATE_2026-05-27.md   # 最新更新说明
```

## 🚀 快速开始

### 本地运行

1. **克隆仓库**
```bash
git clone https://github.com/EcstaticMurdockal/website-volunteerEducationClub.git
cd website-volunteerEducationClub
```

2. **启动本地服务器**

使用Python:
```bash
python -m http.server 8000
```

或使用Node.js:
```bash
npx http-server -p 8000
```

3. **访问网站**
打开浏览器访问：`http://localhost:8000`

### GitHub Pages部署

网站已自动部署到GitHub Pages：
**https://ecstaticmurdockal.github.io/website-volunteerEducationClub/**

## 📸 上传照片指南

### 照片要求
- **格式**：JPG或PNG
- **尺寸**：建议1200x800px或更高
- **质量**：80-90%
- **命名**：使用小写字母和连字符，避免空格

### 上传步骤

1. **准备照片**
   - 将照片重命名为对应的文件名
   - 确保照片清晰、构图合理

2. **放置到对应目录**
   ```
   images/schools/     - 学校照片
   images/activities/  - 活动照片
   images/gallery/     - Gallery展示照片
   ```

3. **提交到Git**
   ```bash
   git add images/
   git commit -m "添加照片"
   git push origin main
   ```

### 需要的照片清单

#### 学校照片（已上传）
- [x] `fengguang-1.jpg` - 凤光小学照片1
- [x] `fengguang-2.jpg` - 凤光小学照片2
- [x] `fengguang-3.jpg` - 凤光小学照片3
- [x] `beidou-1.jpg` - 北斗小学照片1
- [x] `beidou-2.jpg` - 北斗小学照片2
- [x] `beidou-3.jpg` - 北斗小学照片3

#### 活动照片（已上传）
- [x] `first-class-1.jpg`, `first-class-2.jpg`, `first-class-3.jpg` - 第一节社课（3张）
- [x] `baituan-1.jpg`, `baituan-2.jpg`, `baituan-3.jpg` - 百团大战（3张）
- [x] `christmas-1.jpg` ~ `christmas-5.jpg` - 年终团建（5张）
- [x] `culture-month-1.jpg`, `culture-month-2.jpg`, `culture-month-3.jpg` - 社团文化月（3张）
- [x] `farewell-1.jpg` ~ `farewell-4.jpg` - 换届与告别会（4张）

#### 社团联动照片（已上传）
- [x] `collaboration-astronomy-1.jpg`, `collaboration-astronomy-2.jpg` - 天文社（2张）
- [x] `collaboration-volleyball-1.jpg`, `collaboration-volleyball-2.jpg` - 排球社（2张）
- [x] `collaboration-debate-1.jpg`, `collaboration-debate-2.jpg` - 辩论社（2张）
- [x] `collaboration-dance.jpg` - 街舞社（1张）
- [x] `collaboration-art.jpg` - 绯青书画社（1张）

#### 平时支教活动照片（已上传）
- [x] `weekly-teaching-1.jpg` ~ `weekly-teaching-5.jpg` - 支教活动（5张）

#### Gallery照片（已上传）
**团队合照（6张）**
- [x] `group-photo-1.jpg` ~ `group-photo-6.jpg`

**支教课堂（7张）**
- [x] `teaching-moment-1.jpg` ~ `teaching-moment-7.jpg`

**团建活动（4张）**
- [x] `team-building-1.jpg` ~ `team-building-4.jpg`

**社团产品（11张）**
- [x] `virtual-character-1.jpg`, `virtual-character-2.jpg` - 虚拟形象（2张）
- [x] `envelope-letter-1.jpg`, `envelope-letter-2.jpg` - 信封和信纸（2张）
- [x] `postcard-1.jpg` ~ `postcard-5.jpg` - 明信片（5张）
- [x] `bookmark-1.jpg`, `bookmark-2.jpg` - 书签（2张）

#### 社团Icon（已上传）
- [x] `icon.jpg` - 社团Logo图标

#### 视频和PPT文件（待上传）
- [ ] `video-2025.mp4` + `video-2025-thumbnail.jpg` - 2025支教纪录片
- [ ] `video-2024.mp4` + `video-2024-thumbnail.jpg` - 2024支教纪录片
- [ ] `ppt-1.pdf` + `ppt-1-thumbnail.jpg` - 课程设计PPT 1
- [ ] `ppt-2.pdf` + `ppt-2-thumbnail.jpg` - 课程设计PPT 2
- [ ] `ppt-3.pdf` + `ppt-3-thumbnail.jpg` - 课程设计PPT 3

**注意**：
- 每个活动可以放置多张照片，只需按照命名规则添加即可（如`baituan-1.jpg`, `baituan-2.jpg`等）
- **视频文件**：
  - 格式：MP4（推荐H.264编码）
  - 文件名：`video-2025.mp4`, `video-2024.mp4`
  - 位置：`images/gallery/`
  - 缩略图：对应的 `video-2025-thumbnail.jpg`, `video-2024-thumbnail.jpg`
  - 点击缩略图后会在网站内直接播放视频
  - 支持2个视频（2025和2024）
  - **只有视频和PPT有点赞功能，照片没有点赞**
- **PPT文件**：
  - 格式：PDF（需要先将PPT转换为PDF）
  - 文件名：`ppt-1.pdf`, `ppt-2.pdf`, `ppt-3.pdf`（支持多个PPT）
  - 位置：`images/gallery/`
  - 缩略图：对应的 `ppt-X-thumbnail.jpg`
  - 点击缩略图后会在网站内直接查看PDF，并提供下载按钮
  - **只有视频和PPT有点赞功能，照片没有点赞**

**如何将PPT转换为PDF**：
- Windows: 打开PPT → 文件 → 另存为 → 选择PDF格式
- Mac: 打开PPT → 文件 → 导出 → 选择PDF格式
- 在线工具: 使用 ilovepdf.com 或 smallpdf.com

## 🛠️ 技术栈

- **前端框架**：原生HTML/CSS/JavaScript
- **地图库**：高德地图 JavaScript API v1.4.15
- **地图数据**：高德地图
- **图标**：Emoji + 自定义SVG
- **字体**：系统默认字体栈

## 🌟 特性说明

### 1. 交互式地图
- 完全可交互（拖动、缩放、滚轮缩放）
- 自定义标记（红色经典pin + 学校emoji）
- 悬停显示学校信息
- 点击查看详细信息和照片轮播（支持每所学校3张照片，swipe切换）

### 2. 照片轮播系统
- 地图学校照片：swipe手势切换，指示器显示当前位置
- Gallery照片查看：点击照片全屏查看，左右箭头或swipe切换
- 触摸友好：支持触摸滑动和鼠标拖拽
- 流畅动画：Apple风格的过渡效果

### 3. Gallery分类展示
- **团队合照**：6张照片，点击查看轮播
- **支教课堂**：7张照片，点击查看轮播
- **团建活动**：4张照片，点击查看轮播
- **社团产品**：合并入口，包含虚拟形象、信封信纸、明信片、书签
- **宣传视频**：入口卡片，点击后显示2个视频列表（2025和2024），支持点赞
- **PPT作品**：入口卡片，点击后显示3个PPT列表，支持点赞和下载

### 4. 点赞系统
- 从0开始累计
- 使用localStorage持久化
- 每个用户只能点赞一次
- 实时更新点赞数
- 仅视频和PPT支持点赞

### 5. 人格测试
- **16种支教人格类型**：基于MBTI理论改编的支教人格系统
- **20道精心设计的测试题**：涵盖教学风格、沟通方式、问题解决等维度
- **详细的结果分析**：
  - 人格名称和emoji图标
  - 核心特质描述
  - 天赋优势分析（3-4条）
  - 改进建议（3-4条）
- **人格类型示例**：
  - 🌟 启发导师型：善于激发学生潜能
  - 📚 知识传授型：系统化教学专家
  - 🎨 创意引导型：注重创新思维培养
  - 🤝 陪伴成长型：关注学生情感需求
  - 🎯 目标驱动型：注重学习成果
  - 🌈 多元发展型：培养综合素质
  - 💡 启蒙探索型：激发好奇心
  - 🎭 互动体验型：重视课堂参与
  - 📖 经典传承型：传统教学方法
  - 🔬 实践探究型：动手实验教学
  - 🎪 趣味引导型：寓教于乐
  - 🏆 竞赛激励型：通过竞争促进学习
  - 🌱 耐心培育型：循序渐进教学
  - 🎵 艺术熏陶型：美育教学
  - 🧩 逻辑思维型：培养分析能力
  - 🌍 视野拓展型：开阔学生眼界
- **测试流程**：
  1. 点击"开始测试"按钮
  2. 回答20道选择题（每题4个选项）
  3. 进度条实时显示完成度
  4. 自动计算并展示结果
  5. 可重新测试

### 6. 响应式设计
- 移动端优化
- 触摸手势支持
- 自适应布局
- 性能优化

## 📞 联系方式

- **B站**：[@深圳中学支教社](https://space.bilibili.com/3546579512330719)
- **微信公众号**：深圳中学支教社（微信搜索）

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 开发流程
1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📝 更新日志

### v2.2.0 (2026-05-27)
- 🖼️ **优化照片展示体验**
  - 修复学校照片展示框留白问题，使用contain完整显示图片不裁剪
  - 减小学校轮播高度到350px，避免下方留白
  - 添加浅色背景提升图片展示效果
- 🖱️ **修复交互功能**
  - 修复activity图片点击功能，使用事件委托确保正常工作
  - 改进图片点击效果，实现居中pop up展示，添加动画效果
  - 确保页面切换后事件监听器正确工作
- 📐 **统一Modal尺寸**
  - 将PPT和视频改为分类展示，点击入口后显示列表再选择
  - 视频播放器和PPT查看器高度统一为50vh
  - 所有Modal尺寸优化，确保内容完整显示不被裁剪
- 🎨 **界面优化**
  - 添加媒体列表网格样式，优化视频和PPT浏览体验
  - 改进单张照片查看样式，黑色背景居中展示
  - 添加photoPopIn动画效果

### v2.1.0 (2026-05-27)
- ✨ 优化配色主题，应用完整的渐变色
- 🗺️ 修复地图显示问题，添加初始化检查
- 🧹 清理目录结构，统一使用images目录
- 👍 点赞系统从0开始累计
- 📱 更新微信公众号信息，移除二维码
- 📚 完善README文档

### v2.0.0 (2026-05-27)
- 🎨 Apple风格交互升级
- 🗺️ 完整的交互式地图集成
- 🎯 活动展示系统
- 🖼️ Gallery照片展示
- 🧪 16人格测试系统

### v1.0.0 (2026-05-26)
- 🎉 网站初始版本发布

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- 感谢所有支教社成员的辛勤付出
- 感谢OpenStreetMap提供地图数据
- 感谢Leaflet.js提供地图库

---

**深圳中学支教社** - 用心传递知识，用爱点亮未来 ❤️
