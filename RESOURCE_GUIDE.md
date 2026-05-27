# 资源文件管理指南

本文档说明如何向网站添加图片、视频、PPT等资源文件。

## 📁 文件夹结构

```
website-vEducation/
├── assets/
│   ├── images/
│   │   ├── schools/        # 支教学校照片
│   │   ├── gallery/        # Gallery页面展示的照片
│   │   └── timeline/       # 时间线相关图片
│   ├── videos/             # 宣传视频
│   └── ppt/                # PPT文件或PPT截图
├── index.html
├── styles.css
├── script.js
├── quiz.js
└── README.md
```

## 📸 添加支教学校照片

### 1. 准备照片
将学校照片放入 `assets/images/schools/` 文件夹，建议命名格式：
- `学校名称_1.jpg`
- `学校名称_2.jpg`

### 2. 更新代码
编辑 `script.js` 文件，找到 `schools` 数组（约第45行），修改图片路径：

```javascript
const schools = [
    {
        name: '连平县上坪中学',
        coords: [24.3719, 114.4897],
        images: [
            'assets/images/schools/上坪中学_1.jpg',
            'assets/images/schools/上坪中学_2.jpg'
        ]
    },
    // 添加更多学校...
];
```

### 3. 添加新学校
在数组中添加新的学校对象：

```javascript
{
    name: '新学校名称',
    coords: [纬度, 经度],  // 可以在Google地图上查找坐标
    images: [
        'assets/images/schools/新学校_1.jpg',
        'assets/images/schools/新学校_2.jpg'
    ]
}
```

## 🖼️ 添加Gallery内容

### 1. 准备文件
- **照片**：放入 `assets/images/gallery/`
- **视频**：放入 `assets/videos/`
- **PPT**：可以放PPT文件到 `assets/ppt/`，或者将PPT转为图片放入 `assets/images/gallery/`

### 2. 更新Gallery数据
编辑 `script.js` 文件，找到 `galleryData` 数组（约第235行）：

```javascript
const galleryData = [
    {
        id: 1,  // 唯一ID，递增
        title: '作品标题',
        description: '作品描述',
        category: 'photo',  // 'ppt', 'video', 或 'photo'
        image: 'assets/images/gallery/照片名称.jpg',  // 缩略图
        likes: 0  // 初始点赞数
    },
    // 视频示例
    {
        id: 2,
        title: '支教纪录片',
        description: '记录我们的支教故事',
        category: 'video',
        image: 'assets/images/gallery/视频封面.jpg',  // 视频封面图
        videoUrl: 'assets/videos/纪录片.mp4',  // 可选：视频文件路径
        likes: 0
    },
    // PPT示例
    {
        id: 3,
        title: 'PPT标题',
        description: 'PPT描述',
        category: 'ppt',
        image: 'assets/images/gallery/ppt封面.jpg',  // PPT封面或截图
        pptUrl: 'assets/ppt/课程设计.pptx',  // 可选：PPT文件路径
        likes: 0
    }
];
```

## 🎬 视频处理建议

### 方案1：使用视频文件
将视频文件放入 `assets/videos/` 文件夹。

**优点**：完全本地化，不依赖外部平台
**缺点**：文件较大，加载慢

### 方案2：使用B站等平台（推荐）
1. 将视频上传到B站
2. 获取视频嵌入代码或链接
3. 在Gallery中使用视频链接

```javascript
{
    id: 2,
    title: '支教纪录片',
    description: '记录我们的支教故事',
    category: 'video',
    image: 'assets/images/gallery/视频封面.jpg',
    videoUrl: 'https://www.bilibili.com/video/BV1xx411c7mD',  // B站链接
    likes: 0
}
```

## 📊 PPT处理建议

### 方案1：转换为图片
1. 将PPT导出为图片（每页一张）
2. 放入 `assets/images/gallery/`
3. 在Gallery中展示

### 方案2：使用PDF
1. 将PPT导出为PDF
2. 放入 `assets/ppt/`
3. 用户点击可下载查看

### 方案3：使用在线预览
1. 将PPT上传到腾讯文档、石墨文档等平台
2. 获取分享链接
3. 在Gallery中链接到在线文档

## 🎨 图片优化建议

### 1. 图片尺寸
- **学校照片**：建议 1200x800 像素
- **Gallery照片**：建议 800x600 像素
- **视频封面**：建议 1280x720 像素

### 2. 图片格式
- 照片：使用 `.jpg` 格式
- 图标/透明图：使用 `.png` 格式
- 动图：使用 `.gif` 格式

### 3. 图片压缩
使用在线工具压缩图片，减小文件大小：
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/

### 4. 图片命名规范
- 使用英文或拼音
- 避免空格，使用下划线或连字符
- 示例：`school_photo_1.jpg`, `activity-2024-summer.jpg`

## 🔄 更新时间线

编辑 `index.html` 文件，找到时间线部分（约第60行）：

```html
<div class="timeline-item" data-year="2025">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <h3>2025年</h3>
        <p>新的里程碑事件描述</p>
    </div>
</div>
```

## 📝 更新社团信息

### 修改宣传标语
编辑 `index.html` 文件，找到Hero部分（约第30行）：

```html
<p class="hero-subtitle">用知识点亮希望，以行动传递温暖</p>
<p class="hero-description">我们相信，每一次支教都是一颗种子...</p>
```

### 修改活动介绍
编辑 `index.html` 文件，找到Activities部分（约第90行），修改活动卡片内容。

### 修改联系方式
编辑 `index.html` 文件，找到Contact部分（约第180行）：

```html
<div class="contact-card">
    <div class="contact-icon">📺</div>
    <h3>B站</h3>
    <p>@深圳中学支教社</p>
    <a href="你的B站主页链接" class="btn-secondary">访问主页</a>
</div>
```

## 🎯 快速开始

1. **准备资源文件**
   - 收集所有照片、视频
   - 整理PPT文件
   - 压缩优化图片

2. **放入对应文件夹**
   - 按照上述文件夹结构放置文件

3. **更新代码**
   - 修改 `script.js` 中的数据数组
   - 更新 `index.html` 中的文本内容

4. **测试**
   - 在浏览器中打开 `index.html`
   - 检查所有图片是否正常显示
   - 测试所有功能是否正常

## ⚠️ 注意事项

1. **文件路径**：确保路径正确，区分大小写
2. **文件大小**：单个图片建议不超过2MB
3. **版权**：确保使用的图片和视频有使用权
4. **隐私**：注意保护学生隐私，必要时打码
5. **备份**：定期备份所有资源文件

## 🆘 常见问题

### Q: 图片不显示怎么办？
A: 检查：
1. 文件路径是否正确
2. 文件名是否包含中文或特殊字符
3. 文件是否真的存在于指定位置

### Q: 视频太大怎么办？
A: 建议：
1. 使用视频压缩工具
2. 上传到B站等平台，使用链接
3. 降低视频分辨率和码率

### Q: 如何批量添加照片？
A:
1. 准备好所有照片
2. 使用代码编辑器的多光标功能
3. 批量复制粘贴数据对象

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看浏览器控制台的错误信息（F12）
2. 检查文件路径和命名
3. 参考现有的示例代码

---

**提示**：建议先用少量文件测试，确认无误后再批量添加。
