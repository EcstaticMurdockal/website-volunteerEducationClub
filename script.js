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

        // 切换页面
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');

        // 关闭移动端菜单
        navMenu.classList.remove('active');

        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <p style="color: var(--text-light); margin-bottom: 1rem; line-height: 1.6;">
            <strong>地址：</strong>${school.address}<br>
            <strong>活动：</strong>${school.description}
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            ${school.images.map(img => `<img src="${img}" alt="${school.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">`).join('')}
        </div>
    `;
    modal.style.display = 'block';
}

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
    {
        id: 1,
        title: '团队合照',
        description: '支教社全体成员合影',
        category: 'photo',
        image: 'images/gallery/group-photo-1.jpg',
        likes: 0
    },
    {
        id: 2,
        title: '支教课堂',
        description: '与学生们的互动瞬间',
        category: 'photo',
        image: 'images/gallery/teaching-moment.jpg',
        likes: 0
    },
    {
        id: 3,
        title: '百团大战',
        description: '社团招新现场',
        category: 'photo',
        image: 'images/gallery/recruitment.jpg',
        likes: 0
    },
    {
        id: 4,
        title: '团建活动',
        description: '社员们的欢乐时光',
        category: 'photo',
        image: 'images/gallery/team-building.jpg',
        likes: 0
    },
    {
        id: 5,
        title: '支教纪录片',
        description: '记录我们的支教故事',
        category: 'video',
        image: 'images/gallery/video-thumbnail.jpg',
        videoFile: 'images/gallery/video.mp4', // 视频文件路径
        likes: 0
    },
    {
        id: 6,
        title: '课程设计PPT 1',
        description: '创新教学方法分享',
        category: 'ppt',
        image: 'images/gallery/ppt-1-thumbnail.jpg',
        pptFile: 'images/gallery/ppt-1.pdf',
        likes: 0
    },
    {
        id: 7,
        title: '课程设计PPT 2',
        description: '素质拓展课程设计',
        category: 'ppt',
        image: 'images/gallery/ppt-2-thumbnail.jpg',
        pptFile: 'images/gallery/ppt-2.pdf',
        likes: 0
    },
    {
        id: 8,
        title: '课程设计PPT 3',
        description: '互动教学案例分享',
        category: 'ppt',
        image: 'images/gallery/ppt-3-thumbnail.jpg',
        pptFile: 'images/gallery/ppt-3.pdf',
        likes: 0
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
                    <button class="like-button ${likedItems[item.id] ? 'liked' : ''}" data-id="${item.id}">
                        <span class="heart">${likedItems[item.id] ? '❤️' : '🤍'}</span>
                        <span class="like-count">${(likeCounts[item.id] || 0)}</span>
                    </button>
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
            showGalleryModal(galleryItem);
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
