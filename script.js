// 导航栏功能
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Apple风格的导航栏滚动效果
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 页面切换
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);

        // 更新导航栏激活状态
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // 关闭所有模态框
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        if (document.getElementById('gallery-modal')) {
            document.getElementById('gallery-modal').style.display = 'none';
        }

        // 切换页面
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');

        // 关闭移动端菜单
        navMenu.classList.remove('active');

        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 重新初始化Activity照片点击
        setTimeout(() => {
            initActivityPhotoClick();
        }, 100);
    });
});

// 地图功能 - 使用高德地图
// 等待页面加载完成后初始化地图
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});

// 支教学校数据
const schools = [
    {
        name: '深圳市凤光小学',
        address: '广东省深圳市罗湖区泥岗西路40号1栋',
        coords: [114.1216, 22.5669], // 高德地图使用 [lng, lat] 格式
        images: ['images/schools/fengguang-1.jpg', 'images/schools/fengguang-2.jpg', 'images/schools/fengguang-3.jpg'],
        description: '定期开展支教活动，为学生提供课业辅导和素质拓展课程'
    },
    {
        name: '深圳市北斗小学',
        address: '广东省深圳市罗湖区春风路1016号（文锦地铁站C口步行340米）',
        coords: [114.1316, 22.5469],
        images: ['images/schools/beidou-1.jpg', 'images/schools/beidou-2.jpg', 'images/schools/beidou-3.jpg'],
        description: '每周六开展支教活动，涵盖多学科辅导和兴趣课程'
    }
];

function initMap() {
    // 检查地图容器是否存在
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('地图容器未找到');
        return;
    }

    // 检查高德地图API是否加载
    if (typeof AMap === 'undefined') {
        console.error('高德地图API未加载');
        return;
    }

    // 创建地图实例
    const map = new AMap.Map('map', {
        zoom: 13,
        center: [114.1216, 22.5569], // 深圳罗湖区中心
        viewMode: '2D',
        scrollWheel: true,
        dragEnable: true,
        zoomEnable: true,
        doubleClickZoom: true,
        keyboardEnable: true,
        touchZoom: true
    });

    // 添加学校标记
    schools.forEach(school => {
        // 创建标记 - 使用简单的红色标记
        const marker = new AMap.Marker({
            position: school.coords,
            title: school.name,
            // 使用高德地图默认红色标记
            content: '<div style="background: #EA4335; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><div style="transform: rotate(45deg); font-size: 16px; text-align: center; line-height: 24px;">🏫</div></div>',
            offset: new AMap.Pixel(-15, -30)
        });

        // 创建信息窗体
        const infoWindow = new AMap.InfoWindow({
            content: `
                <div class="map-popup" style="padding: 15px; min-width: 250px;">
                    <h3 style="margin: 0 0 10px 0; color: var(--primary-color); font-size: 1.1rem;">${school.name}</h3>
                    <p style="margin: 5px 0; color: #666; font-size: 0.9rem;">📍 ${school.address}</p>
                    <p style="margin: 10px 0; color: #333; line-height: 1.5;">${school.description}</p>
                    <button onclick="showSchoolDetails('${school.name}')" style="
                        background: var(--primary-color);
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        margin-top: 10px;
                        transition: all 0.3s ease;
                    ">查看详情</button>
                </div>
            `,
            offset: new AMap.Pixel(0, -50)
        });

        // 点击标记显示信息窗体
        marker.on('click', function() {
            infoWindow.open(map, marker.getPosition());
        });

        // 鼠标悬停显示信息窗体
        marker.on('mouseover', function() {
            infoWindow.open(map, marker.getPosition());
        });

        map.add(marker);
    });

    // 全局函数用于显示学校详情
    window.showSchoolDetails = function(schoolName) {
        const school = schools.find(s => s.name === schoolName);
        if (school) {
            showSchoolModal(school);
        }
    };
}

// 模态框功能
const modal = document.getElementById('school-modal');
const closeBtn = document.querySelector('.close');

function showSchoolModal(school) {
    document.getElementById('modal-school-name').textContent = school.name;
    const modalBody = document.getElementById('modal-school-images');
    modalBody.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <p style="color: var(--text-light); line-height: 1.8; margin: 0.5rem 0; font-size: 1rem;">
                <strong style="color: var(--primary-color);">📍 地址：</strong>${school.address}
            </p>
            <p style="color: var(--text-light); line-height: 1.8; margin: 0.5rem 0; font-size: 1rem;">
                <strong style="color: var(--primary-color);">🎯 活动：</strong>${school.description}
            </p>
        </div>
        <div class="carousel-container school-carousel">
            <div class="carousel-track" id="school-carousel-track">
                ${school.images.map((img, index) => `
                    <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                        <img src="${img}" alt="${school.name} ${index + 1}">
                    </div>
                `).join('')}
            </div>
            ${school.images.length > 1 ? `
                <button class="carousel-btn carousel-prev" onclick="moveSchoolCarousel(-1)">‹</button>
                <button class="carousel-btn carousel-next" onclick="moveSchoolCarousel(1)">›</button>
                <div class="carousel-indicators">
                    ${school.images.map((_, index) => `
                        <span class="indicator ${index === 0 ? 'active' : ''}" onclick="goToSchoolSlide(${index})"></span>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    modal.style.display = 'block';

    // 初始化轮播
    initSchoolCarousel();
}

let schoolCarouselIndex = 0;
let schoolCarouselTouchStart = 0;
let schoolCarouselTouchEnd = 0;

function initSchoolCarousel() {
    schoolCarouselIndex = 0;
    const track = document.getElementById('school-carousel-track');
    if (!track) return;

    // 触摸事件
    track.addEventListener('touchstart', (e) => {
        schoolCarouselTouchStart = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        schoolCarouselTouchEnd = e.changedTouches[0].screenX;
        handleSchoolCarouselSwipe();
    });

    // 鼠标拖拽事件
    let isDragging = false;
    let startX = 0;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        track.style.cursor = 'grabbing';
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    track.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        const endX = e.clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            moveSchoolCarousel(diff > 0 ? 1 : -1);
        }
    });

    track.addEventListener('mouseleave', () => {
        isDragging = false;
        track.style.cursor = 'grab';
    });
}

function handleSchoolCarouselSwipe() {
    const diff = schoolCarouselTouchStart - schoolCarouselTouchEnd;
    if (Math.abs(diff) > 50) {
        moveSchoolCarousel(diff > 0 ? 1 : -1);
    }
}

window.moveSchoolCarousel = function(direction) {
    const slides = document.querySelectorAll('#school-carousel-track .carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    if (slides.length === 0) return;

    schoolCarouselIndex += direction;
    if (schoolCarouselIndex < 0) schoolCarouselIndex = slides.length - 1;
    if (schoolCarouselIndex >= slides.length) schoolCarouselIndex = 0;

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === schoolCarouselIndex);
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === schoolCarouselIndex);
    });
};

window.goToSchoolSlide = function(index) {
    const slides = document.querySelectorAll('#school-carousel-track .carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');

    schoolCarouselIndex = index;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
};

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// 问卷系统 - 使用新的16人格系统
// 问卷数据在quiz.js中定义

let currentQuestion = 0;
let userAnswers = [];

const startQuizBtn = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz-container');
const quizContent = document.getElementById('quiz-content');
const quizResult = document.getElementById('quiz-result');
const restartQuizBtn = document.getElementById('restart-quiz');

startQuizBtn.addEventListener('click', startQuiz);
restartQuizBtn.addEventListener('click', resetQuiz);

function startQuiz() {
    startQuizBtn.style.display = 'none';
    quizContainer.style.display = 'block';
    currentQuestion = 0;
    userAnswers = [];
    showQuestion();
}

function showQuestion() {
    const question = quizData[currentQuestion];
    const progress = ((currentQuestion + 1) / quizData.length) * 100;

    document.querySelector('.progress-fill').style.width = `${progress}%`;
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('total-questions').textContent = quizData.length;

    quizContent.innerHTML = `
        <div class="quiz-question">
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" data-index="${index}">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="quiz-buttons">
            <button class="btn-secondary" id="prev-btn" ${currentQuestion === 0 ? 'disabled' : ''}>上一题</button>
            <button class="btn-primary" id="next-btn" disabled>下一题</button>
        </div>
    `;

    const options = quizContent.querySelectorAll('.quiz-option');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            nextBtn.disabled = false;
        });
    });

    nextBtn.addEventListener('click', () => {
        const selected = quizContent.querySelector('.quiz-option.selected');
        if (selected) {
            const optionIndex = parseInt(selected.dataset.index);
            userAnswers[currentQuestion] = question.options[optionIndex];

            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                showQuestion();
            } else {
                showResult();
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    });
}

function showResult() {
    quizContainer.style.display = 'none';
    quizResult.style.display = 'block';

    const { type, scores } = calculatePersonality(userAnswers);
    const result = personalityTypes[type];

    document.getElementById('result-type').innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">${result.icon}</div>
        <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-color); margin-bottom: 1rem;">${result.title}</div>
    `;
    document.getElementById('result-content').innerHTML = `
        <p style="font-size: 1.2rem; margin-bottom: 3rem; line-height: 1.8; color: var(--text-dark); font-weight: 500;">${result.description}</p>

        <div class="result-section">
            <h4>✨ 你的天赋优势</h4>
            <ul>
                ${result.strengths.map(s => `<li>${s}</li>`).join('')}
            </ul>
        </div>

        <div class="result-section">
            <h4>📈 可以提升的方面</h4>
            <ul>
                ${result.improvements.map(i => `<li>${i}</li>`).join('')}
            </ul>
        </div>

        <div class="result-section">
            <h4>💡 给你的建议</h4>
            <ul>
                ${result.tips.map(t => `<li>${t}</li>`).join('')}
            </ul>
        </div>
    `;
}

function resetQuiz() {
    quizResult.style.display = 'none';
    startQuizBtn.style.display = 'block';
    currentQuestion = 0;
    userAnswers = [];
}

// Gallery 功能
const galleryData = [
    // 团队合照入口
    {
        id: 1,
        title: '📸 团队合照',
        description: '支教社全体成员合影（6张）',
        category: 'photo',
        image: 'images/gallery/group-photo-1.jpg',
        showLike: false,
        isGalleryEntry: true,
        galleryType: 'group-photo',
        images: [
            'images/gallery/group-photo-1.jpg',
            'images/gallery/group-photo-2.jpg',
            'images/gallery/group-photo-3.jpg',
            'images/gallery/group-photo-4.jpg',
            'images/gallery/group-photo-5.jpg',
            'images/gallery/group-photo-6.jpg'
        ]
    },
    // 支教课堂入口
    {
        id: 2,
        title: '👨‍🏫 支教课堂',
        description: '与学生们的互动瞬间（7张）',
        category: 'photo',
        image: 'images/gallery/teaching-moment-1.jpg',
        showLike: false,
        isGalleryEntry: true,
        galleryType: 'teaching-moment',
        images: [
            'images/gallery/teaching-moment-1.jpg',
            'images/gallery/teaching-moment-2.jpg',
            'images/gallery/teaching-moment-3.jpg',
            'images/gallery/teaching-moment-4.jpg',
            'images/gallery/teaching-moment-5.jpg',
            'images/gallery/teaching-moment-6.jpg',
            'images/gallery/teaching-moment-7.jpg'
        ]
    },
    // 团建活动入口
    {
        id: 3,
        title: '🎉 团建活动',
        description: '社员们的欢乐时光（4张）',
        category: 'photo',
        image: 'images/gallery/team-building-1.jpg',
        showLike: false,
        isGalleryEntry: true,
        galleryType: 'team-building',
        images: [
            'images/gallery/team-building-1.jpg',
            'images/gallery/team-building-2.jpg',
            'images/gallery/team-building-3.jpg',
            'images/gallery/team-building-4.jpg'
        ]
    },
    // 社团产品入口
    {
        id: 4,
        title: '✨ 社团产品',
        description: '查看我们设计的虚拟形象、信封信纸、明信片、书签等作品',
        category: 'photo',
        image: 'images/gallery/virtual-character-1.jpg',
        showLike: false,
        isProductEntry: true
    },
    // 视频入口
    {
        id: 5,
        title: '🎬 宣传视频',
        description: '查看支教纪录片和宣传视频（2个）',
        category: 'video',
        image: 'images/gallery/video-2025-thumbnail.jpg',
        showLike: false,
        isVideoEntry: true
    },
    // PPT入口
    {
        id: 6,
        title: '📊 PPT作品',
        description: '查看课程设计PPT（3个）',
        category: 'ppt',
        image: 'images/gallery/ppt-1-thumbnail.jpg',
        showLike: false,
        isPPTEntry: true
    }
];

// 视频数据
const videoData = [
    {
        id: 'video-1',
        title: '2025支教纪录片',
        description: '记录2025年的支教故事',
        image: 'images/gallery/video-2025-thumbnail.jpg',
        videoFile: 'images/gallery/video-2025.mp4'
    },
    {
        id: 'video-2',
        title: '2024支教纪录片',
        description: '记录2024年的支教故事',
        image: 'images/gallery/video-2024-thumbnail.jpg',
        videoFile: 'images/gallery/video-2024.mp4'
    }
];

// PPT数据
const pptData = [
    {
        id: 'ppt-1',
        title: '课程设计PPT 1',
        description: '创新教学方法分享',
        image: 'images/gallery/ppt-1-thumbnail.jpg',
        pptFile: 'images/gallery/ppt-1.pdf'
    },
    {
        id: 'ppt-2',
        title: '课程设计PPT 2',
        description: '素质拓展课程设计',
        image: 'images/gallery/ppt-2-thumbnail.jpg',
        pptFile: 'images/gallery/ppt-2.pdf'
    },
    {
        id: 'ppt-3',
        title: '课程设计PPT 3',
        description: '互动教学案例分享',
        image: 'images/gallery/ppt-3-thumbnail.jpg',
        pptFile: 'images/gallery/ppt-3.pdf'
    }
];

// 从localStorage加载点赞数据
const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}');
const likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}');

function renderGallery(category = 'all') {
    const galleryGrid = document.getElementById('gallery-grid');
    const filteredData = category === 'all'
        ? galleryData
        : galleryData.filter(item => item.category === category);

    galleryGrid.innerHTML = filteredData.map(item => `
        <div class="gallery-item" data-id="${item.id}">
            <img src="${item.image}"
                 alt="${item.title}"
                 class="gallery-item-image"
                 onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(item.title)}'">
            <div class="gallery-item-content">
                <h3 class="gallery-item-title">${item.title}</h3>
                <p class="gallery-item-description">${item.description}</p>
                <div class="gallery-item-footer">
                    <span class="gallery-item-category">${getCategoryName(item.category)}</span>
                    ${item.showLike ? `
                        <button class="like-button ${likedItems[item.id] ? 'liked' : ''}" data-id="${item.id}">
                            <span class="heart">${likedItems[item.id] ? '❤️' : '🤍'}</span>
                            <span class="like-count">${(likeCounts[item.id] || 0)}</span>
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');

    // 添加点赞事件
    document.querySelectorAll('.like-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleLike(id, btn);
        });
    });

    // 添加点击事件打开模态框
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = parseInt(item.dataset.id);
            const galleryItem = galleryData.find(g => g.id === id);
            if (galleryItem.isProductEntry) {
                showProductsModal();
            } else if (galleryItem.isVideoEntry) {
                showVideoListModal();
            } else if (galleryItem.isPPTEntry) {
                showPPTListModal();
            } else if (galleryItem.isGalleryEntry) {
                showGalleryCarousel(galleryItem);
            } else {
                showGalleryModal(galleryItem);
            }
        });
    });
}

function getCategoryName(category) {
    const names = {
        ppt: 'PPT作品',
        video: '视频',
        photo: '照片'
    };
    return names[category] || category;
}

function toggleLike(id, button) {
    const heart = button.querySelector('.heart');
    const count = button.querySelector('.like-count');

    if (likedItems[id]) {
        // 取消点赞
        delete likedItems[id];
        button.classList.remove('liked');
        heart.textContent = '🤍';
        likeCounts[id] = Math.max(0, (likeCounts[id] || 0) - 1);
    } else {
        // 点赞
        likedItems[id] = true;
        button.classList.add('liked');
        heart.textContent = '❤️';
        likeCounts[id] = (likeCounts[id] || 0) + 1;
    }

    count.textContent = likeCounts[id];
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
}

// Gallery标签切换
document.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderGallery(tab.dataset.category);
    });
});

// Gallery模态框功能
const galleryModal = document.getElementById('gallery-modal');
const galleryClose = document.getElementById('gallery-close');

function showGalleryModal(item) {
    document.getElementById('gallery-modal-title').textContent = item.title;
    const modalContent = document.getElementById('gallery-modal-content');

    let content = '';

    if (item.category === 'video' && item.videoFile) {
        // 视频播放器
        content = `
            <video controls style="width: 100%; max-height: 70vh; border-radius: 8px; background: #000;">
                <source src="${item.videoFile}" type="video/mp4">
                您的浏览器不支持视频播放。
            </video>
            <p style="margin-top: 1rem; color: var(--text-light);">${item.description}</p>
        `;
    } else if (item.category === 'ppt' && item.pptFile) {
        // PDF查看器
        content = `
            <iframe src="${item.pptFile}" style="width: 100%; height: 70vh; border: none; border-radius: 8px;"></iframe>
            <p style="margin-top: 1rem; color: var(--text-light);">${item.description}</p>
            <a href="${item.pptFile}" download style="
                display: inline-block;
                margin-top: 1rem;
                padding: 10px 20px;
                background: var(--primary-color);
                color: white;
                text-decoration: none;
                border-radius: 6px;
                transition: all 0.3s ease;
            ">下载PDF</a>
        `;
    } else {
        // 普通图片
        content = `
            <img src="${item.image}" alt="${item.title}" style="width: 100%; max-height: 70vh; object-fit: contain; border-radius: 8px;">
            <p style="margin-top: 1rem; color: var(--text-light);">${item.description}</p>
            <p style="margin-top: 0.5rem; color: var(--text-light);">类别: ${getCategoryName(item.category)}</p>
        `;
    }

    modalContent.innerHTML = content;
    galleryModal.style.display = 'block';
}

galleryClose.addEventListener('click', () => {
    galleryModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        galleryModal.style.display = 'none';
    }
});

// 初始化Gallery
renderGallery();

// 社团联动 Modal 控制
function showCollaborationModal() {
    document.getElementById('collaboration-modal').style.display = 'block';
}

function closeCollaborationModal() {
    document.getElementById('collaboration-modal').style.display = 'none';
}

// 社团产品 Modal 控制
function showProductsModal() {
    document.getElementById('products-modal').style.display = 'block';
}

function closeProductsModal() {
    document.getElementById('products-modal').style.display = 'none';
}

// 视频列表 Modal 控制
function showVideoListModal() {
    const galleryModal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('gallery-modal-title');
    const modalContent = document.getElementById('gallery-modal-content');

    modalTitle.textContent = '🎬 宣传视频';
    modalContent.innerHTML = `
        <div class="media-list-grid">
            ${videoData.map(video => `
                <div class="media-list-item" onclick="showVideoModal('${video.id}')">
                    <img src="${video.image}" alt="${video.title}">
                    <div class="media-list-info">
                        <h4>${video.title}</h4>
                        <p>${video.description}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    galleryModal.style.display = 'block';
}

// PPT列表 Modal 控制
function showPPTListModal() {
    const galleryModal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('gallery-modal-title');
    const modalContent = document.getElementById('gallery-modal-content');

    modalTitle.textContent = '📊 PPT作品';
    modalContent.innerHTML = `
        <div class="media-list-grid">
            ${pptData.map(ppt => `
                <div class="media-list-item" onclick="showPPTModal('${ppt.id}')">
                    <img src="${ppt.image}" alt="${ppt.title}">
                    <div class="media-list-info">
                        <h4>${ppt.title}</h4>
                        <p>${ppt.description}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    galleryModal.style.display = 'block';
}

// 显示单个视频
window.showVideoModal = function(videoId) {
    const video = videoData.find(v => v.id === videoId);
    if (!video) return;

    const galleryModal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('gallery-modal-title');
    const modalContent = document.getElementById('gallery-modal-content');

    modalTitle.textContent = video.title;
    modalContent.innerHTML = `
        <video controls style="width: 100%; max-height: 70vh; border-radius: 8px; background: #000;">
            <source src="${video.videoFile}" type="video/mp4">
            您的浏览器不支持视频播放。
        </video>
        <p style="margin-top: 1rem; color: var(--text-light);">${video.description}</p>
        <button onclick="showVideoListModal()" style="
            margin-top: 1rem;
            padding: 10px 20px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
        ">← 返回视频列表</button>
    `;

    galleryModal.style.display = 'block';
};

// 显示单个PPT
window.showPPTModal = function(pptId) {
    const ppt = pptData.find(p => p.id === pptId);
    if (!ppt) return;

    const galleryModal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('gallery-modal-title');
    const modalContent = document.getElementById('gallery-modal-content');

    modalTitle.textContent = ppt.title;
    modalContent.innerHTML = `
        <iframe src="${ppt.pptFile}" style="width: 100%; height: 70vh; border: none; border-radius: 8px;"></iframe>
        <p style="margin-top: 1rem; color: var(--text-light);">${ppt.description}</p>
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button onclick="showPPTListModal()" style="
                padding: 10px 20px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
            ">← 返回PPT列表</button>
            <a href="${ppt.pptFile}" download style="
                display: inline-block;
                padding: 10px 20px;
                background: var(--secondary-color);
                color: var(--text-dark);
                text-decoration: none;
                border-radius: 6px;
                transition: all 0.3s ease;
            ">下载PDF</a>
        </div>
    `;

    galleryModal.style.display = 'block';
};

// Gallery轮播 Modal 控制
let galleryCarouselIndex = 0;
let galleryCarouselTouchStart = 0;
let galleryCarouselTouchEnd = 0;
let currentGalleryImages = [];

function showGalleryCarousel(item) {
    currentGalleryImages = item.images;
    galleryCarouselIndex = 0;

    const galleryModal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('gallery-modal-title');
    const modalContent = document.getElementById('gallery-modal-content');

    modalTitle.textContent = item.title;
    modalContent.innerHTML = `
        <div class="carousel-container gallery-carousel">
            <div class="carousel-track" id="gallery-carousel-track">
                ${item.images.map((img, index) => `
                    <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                        <img src="${img}" alt="${item.title} ${index + 1}">
                    </div>
                `).join('')}
            </div>
            ${item.images.length > 1 ? `
                <button class="carousel-btn carousel-prev" onclick="moveGalleryCarousel(-1)">‹</button>
                <button class="carousel-btn carousel-next" onclick="moveGalleryCarousel(1)">›</button>
                <div class="carousel-indicators">
                    ${item.images.map((_, index) => `
                        <span class="indicator ${index === 0 ? 'active' : ''}" onclick="goToGallerySlide(${index})"></span>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;

    galleryModal.style.display = 'block';
    initGalleryCarousel();
}

function initGalleryCarousel() {
    const track = document.getElementById('gallery-carousel-track');
    if (!track) return;

    // 触摸事件
    track.addEventListener('touchstart', (e) => {
        galleryCarouselTouchStart = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        galleryCarouselTouchEnd = e.changedTouches[0].screenX;
        handleGalleryCarouselSwipe();
    });

    // 鼠标拖拽事件
    let isDragging = false;
    let startX = 0;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        track.style.cursor = 'grabbing';
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    track.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        const endX = e.clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            moveGalleryCarousel(diff > 0 ? 1 : -1);
        }
    });

    track.addEventListener('mouseleave', () => {
        isDragging = false;
        track.style.cursor = 'grab';
    });

    // 键盘导航
    document.addEventListener('keydown', handleGalleryKeyboard);
}

function handleGalleryKeyboard(e) {
    if (document.getElementById('gallery-modal').style.display !== 'block') return;
    if (e.key === 'ArrowLeft') moveGalleryCarousel(-1);
    if (e.key === 'ArrowRight') moveGalleryCarousel(1);
    if (e.key === 'Escape') document.getElementById('gallery-close').click();
}

function handleGalleryCarouselSwipe() {
    const diff = galleryCarouselTouchStart - galleryCarouselTouchEnd;
    if (Math.abs(diff) > 50) {
        moveGalleryCarousel(diff > 0 ? 1 : -1);
    }
}

window.moveGalleryCarousel = function(direction) {
    const slides = document.querySelectorAll('#gallery-carousel-track .carousel-slide');
    const indicators = document.querySelectorAll('#gallery-modal-content .carousel-indicators .indicator');
    if (slides.length === 0) return;

    galleryCarouselIndex += direction;
    if (galleryCarouselIndex < 0) galleryCarouselIndex = slides.length - 1;
    if (galleryCarouselIndex >= slides.length) galleryCarouselIndex = 0;

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === galleryCarouselIndex);
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === galleryCarouselIndex);
    });
};

window.goToGallerySlide = function(index) {
    const slides = document.querySelectorAll('#gallery-carousel-track .carousel-slide');
    const indicators = document.querySelectorAll('#gallery-modal-content .carousel-indicators .indicator');

    galleryCarouselIndex = index;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
};

// 点击modal外部关闭
window.addEventListener('click', (e) => {
    const collaborationModal = document.getElementById('collaboration-modal');
    const productsModal = document.getElementById('products-modal');

    if (e.target === collaborationModal) {
        closeCollaborationModal();
    }
    if (e.target === productsModal) {
        closeProductsModal();
    }
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.recruitment-card, .gallery-item, .timeline-item, .activity-card-large, .regular-activity-card').forEach(el => {
    if (!el.classList.contains('timeline-item')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    observer.observe(el);
});

// Activity照片点击放大功能
function initActivityPhotoClick() {
    document.querySelectorAll('.activity-photos-grid img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            showActivityPhotoModal(this.src, this.alt);
        });
    });
}

function showActivityPhotoModal(src, alt) {
    const galleryModal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('gallery-modal-title');
    const modalContent = document.getElementById('gallery-modal-content');

    modalTitle.textContent = alt || '活动照片';
    modalContent.innerHTML = `
        <div class="single-photo-view">
            <img src="${src}" alt="${alt}">
        </div>
    `;

    galleryModal.style.display = 'block';
}

// 初始化Activity照片点击
document.addEventListener('DOMContentLoaded', () => {
    initActivityPhotoClick();
});
