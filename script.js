// 导航栏功能
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
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

// 地图功能
const map = L.map('map').setView([23.5, 114.5], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 支教学校数据
const schools = [
    {
        name: '连平县上坪中学',
        coords: [24.3719, 114.4897],
        images: ['https://via.placeholder.com/300x200?text=上坪中学1', 'https://via.placeholder.com/300x200?text=上坪中学2']
    },
    {
        name: '河源市龙川县第一中学',
        coords: [24.0996, 115.2597],
        images: ['https://via.placeholder.com/300x200?text=龙川一中1', 'https://via.placeholder.com/300x200?text=龙川一中2']
    },
    {
        name: '韶关市乳源县民族实验学校',
        coords: [24.7764, 113.2755],
        images: ['https://via.placeholder.com/300x200?text=乳源学校1', 'https://via.placeholder.com/300x200?text=乳源学校2']
    },
    {
        name: '梅州市五华县水寨中学',
        coords: [23.9324, 115.7753],
        images: ['https://via.placeholder.com/300x200?text=水寨中学1', 'https://via.placeholder.com/300x200?text=水寨中学2']
    },
    {
        name: '清远市连南县民族高级中学',
        coords: [24.7264, 112.2877],
        images: ['https://via.placeholder.com/300x200?text=连南高中1', 'https://via.placeholder.com/300x200?text=连南高中2']
    }
];

// 添加学校标记
schools.forEach(school => {
    const marker = L.marker(school.coords).addTo(map);
    marker.bindPopup(`<b>${school.name}</b><br>点击查看更多`);
    marker.on('click', () => showSchoolModal(school));
});

// 模态框功能
const modal = document.getElementById('school-modal');
const closeBtn = document.querySelector('.close');

function showSchoolModal(school) {
    document.getElementById('modal-school-name').textContent = school.name;
    const imagesContainer = document.getElementById('modal-school-images');
    imagesContainer.innerHTML = school.images.map(img =>
        `<img src="${img}" alt="${school.name}">`
    ).join('');
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

    document.getElementById('result-type').textContent = `${result.icon} ${result.title}`;
    document.getElementById('result-content').innerHTML = `
        <p style="font-size: 1.1rem; margin-bottom: 2rem; line-height: 1.8;">${result.description}</p>

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

        <div class="result-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <h4 style="color: white;">🎯 你的人格代码：${type}</h4>
            <p style="margin-top: 1rem; opacity: 0.9;">
                ${type[0] === 'S' ? '结构化' : '灵活'} ·
                ${type[1] === 'G' ? '引导型' : '陪伴型'} ·
                ${type[2] === 'K' ? '知识导向' : '情感导向'} ·
                ${type[3] === 'P' ? '计划型' : '即兴型'}
            </p>
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
        title: '支教课程设计PPT',
        description: '创新教学方法分享',
        category: 'ppt',
        image: 'https://via.placeholder.com/400x300?text=PPT+1',
        likes: 42
    },
    {
        id: 2,
        title: '暑期支教纪录片',
        description: '记录我们的支教故事',
        category: 'video',
        image: 'https://via.placeholder.com/400x300?text=Video+1',
        likes: 89
    },
    {
        id: 3,
        title: '课堂互动瞬间',
        description: '孩子们的笑容是最好的回报',
        category: 'photo',
        image: 'https://via.placeholder.com/400x300?text=Photo+1',
        likes: 156
    },
    {
        id: 4,
        title: '科学实验课PPT',
        description: '让科学变得有趣',
        category: 'ppt',
        image: 'https://via.placeholder.com/400x300?text=PPT+2',
        likes: 67
    },
    {
        id: 5,
        title: '支教社招新宣传片',
        description: '加入我们，一起传递温暖',
        category: 'video',
        image: 'https://via.placeholder.com/400x300?text=Video+2',
        likes: 123
    },
    {
        id: 6,
        title: '团队合影',
        description: '春季支教团队',
        category: 'photo',
        image: 'https://via.placeholder.com/400x300?text=Photo+2',
        likes: 201
    },
    {
        id: 7,
        title: '英语趣味教学PPT',
        description: '用游戏学英语',
        category: 'ppt',
        image: 'https://via.placeholder.com/400x300?text=PPT+3',
        likes: 78
    },
    {
        id: 8,
        title: '山区学校环境记录',
        description: '我们去过的地方',
        category: 'photo',
        image: 'https://via.placeholder.com/400x300?text=Photo+3',
        likes: 134
    },
    {
        id: 9,
        title: '支教心得分享会',
        description: '听听学长学姐的故事',
        category: 'video',
        image: 'https://via.placeholder.com/400x300?text=Video+3',
        likes: 95
    }
];

// 从localStorage加载点赞数据
const likedItems = JSON.parse(localStorage.getItem('likedItems') || '{}');

function renderGallery(category = 'all') {
    const galleryGrid = document.getElementById('gallery-grid');
    const filteredData = category === 'all'
        ? galleryData
        : galleryData.filter(item => item.category === category);

    galleryGrid.innerHTML = filteredData.map(item => `
        <div class="gallery-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" class="gallery-item-image">
            <div class="gallery-item-content">
                <h3 class="gallery-item-title">${item.title}</h3>
                <p class="gallery-item-description">${item.description}</p>
                <div class="gallery-item-footer">
                    <span class="gallery-item-category">${getCategoryName(item.category)}</span>
                    <button class="like-button ${likedItems[item.id] ? 'liked' : ''}" data-id="${item.id}">
                        <span class="heart">${likedItems[item.id] ? '❤️' : '🤍'}</span>
                        <span class="like-count">${item.likes + (likedItems[item.id] ? 1 : 0)}</span>
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
        delete likedItems[id];
        button.classList.remove('liked');
        heart.textContent = '🤍';
        count.textContent = parseInt(count.textContent) - 1;
    } else {
        likedItems[id] = true;
        button.classList.add('liked');
        heart.textContent = '❤️';
        count.textContent = parseInt(count.textContent) + 1;
    }

    localStorage.setItem('likedItems', JSON.stringify(likedItems));
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

    modalContent.innerHTML = `
        <img src="${item.image}" alt="${item.title}" style="width: 100%; max-height: 70vh; object-fit: contain; border-radius: 8px;">
        <p style="margin-top: 1rem; color: var(--text-light);">${item.description}</p>
        <p style="margin-top: 0.5rem; color: var(--text-light);">类别: ${getCategoryName(item.category)}</p>
    `;

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
document.querySelectorAll('.activity-card, .recruitment-card, .gallery-item, .timeline-item').forEach(el => {
    if (!el.classList.contains('timeline-item')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    observer.observe(el);
});
