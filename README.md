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
├── index.html              # 主页面
├── styles.css              # 样式文件
├── script.js               # 主要JavaScript
├── quiz.js                 # 人格测试逻辑
├── images/                 # 图片资源目录
│   ├── schools/           # 学校照片
│   │   ├── fengguang-1.jpg
│   │   ├── fengguang-2.jpg
│   │   ├── beidou-1.jpg
│   │   └── beidou-2.jpg
│   ├── activities/        # 活动照片
│   │   ├── first-class.jpg
│   │   ├── baituan.jpg
│   │   ├── christmas.jpg
│   │   ├── culture-month.jpg
│   │   ├── mid-team-building.jpg
│   │   ├── handover.jpg
│   │   └── farewell.jpg
│   └── gallery/           # Gallery展示照片
│       ├── group-photo-1.jpg
│       ├── teaching-moment.jpg
│       ├── recruitment.jpg
│       ├── team-building.jpg
│       ├── video-thumbnail.jpg
│       └── ppt-thumbnail.jpg
├── README.md              # 项目说明
└── PROJECT_STATUS.md      # 项目状态报告
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

#### 学校照片（4张）
- [ ] `fengguang-1.jpg` - 凤光小学照片1
- [ ] `fengguang-2.jpg` - 凤光小学照片2
- [ ] `beidou-1.jpg` - 北斗小学照片1
- [ ] `beidou-2.jpg` - 北斗小学照片2

#### 活动照片（7张）
- [ ] `first-class.jpg` - 第一节社课
- [ ] `baituan.jpg` - 百团大战
- [ ] `christmas.jpg` - 年终团建（圣诞）
- [ ] `culture-month.jpg` - 社团文化月
- [ ] `mid-team-building.jpg` - 中期团建
- [ ] `handover.jpg` - 换届
- [ ] `farewell.jpg` - 告别会

#### Gallery照片（6张）
- [ ] `group-photo-1.jpg` - 团队合照
- [ ] `teaching-moment.jpg` - 支教课堂
- [ ] `recruitment.jpg` - 百团大战
- [ ] `team-building.jpg` - 团建活动
- [ ] `video-thumbnail.jpg` - 视频缩略图
- [ ] `ppt-thumbnail.jpg` - PPT缩略图

**注意**：每个活动可以放置多张照片，只需按照命名规则添加即可（如`baituan-1.jpg`, `baituan-2.jpg`等）

## 🛠️ 技术栈

- **前端框架**：原生HTML/CSS/JavaScript
- **地图库**：Leaflet.js
- **地图数据**：OpenStreetMap
- **图标**：Emoji + 自定义SVG
- **字体**：系统默认字体栈

## 🌟 特性说明

### 1. 交互式地图
- 完全可交互（拖动、缩放、滚轮缩放）
- 自定义标记（绿色pin + 学校emoji）
- 悬停显示学校信息
- 点击查看详细信息和照片

### 2. 点赞系统
- 从0开始累计
- 使用localStorage持久化
- 每个用户只能点赞一次
- 实时更新点赞数

### 3. 人格测试
- 16种支教人格类型
- 20道测试题
- 详细的结果分析
- 天赋优势和改进建议

### 4. 响应式设计
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
