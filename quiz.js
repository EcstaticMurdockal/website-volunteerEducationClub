// 新的16人格问卷系统
// 基于4个维度：
// 1. 教学风格：结构化(S) vs 灵活(F)
// 2. 互动方式：引导(G) vs 陪伴(A)
// 3. 关注点：知识(K) vs 情感(E)
// 4. 行动方式：计划(P) vs 即兴(I)

const quizData = [
    {
        question: '周末你通常会如何度过？',
        options: [
            { text: '提前规划好活动安排，按计划执行', dimensions: { SP: 1 } },
            { text: '有个大致想法，但保持灵活调整', dimensions: { FI: 1 } },
            { text: '看心情和当天情况随机决定', dimensions: { FI: 2 } },
            { text: '列出想做的事，根据优先级完成', dimensions: { SP: 2 } }
        ]
    },
    {
        question: '朋友向你倾诉烦恼时，你的第一反应是：',
        options: [
            { text: '认真倾听，给予情感支持和安慰', dimensions: { EA: 1 } },
            { text: '分析问题，提供解决方案', dimensions: { KG: 1 } },
            { text: '分享类似经历，让对方知道不孤单', dimensions: { EA: 2 } },
            { text: '帮助梳理思路，引导找到答案', dimensions: { KG: 2 } }
        ]
    },
    {
        question: '面对一个新项目，你会：',
        options: [
            { text: '先做详细调研，制定完整方案', dimensions: { SP: 1, KG: 1 } },
            { text: '快速开始，边做边调整', dimensions: { FI: 1 } },
            { text: '找团队讨论，集思广益', dimensions: { EA: 1, GA: 1 } },
            { text: '参考以往经验，灵活应用', dimensions: { FI: 2, KG: 2 } }
        ]
    },
    {
        question: '在小组讨论中，你更倾向于：',
        options: [
            { text: '主动发言，分享自己的观点', dimensions: { GI: 1 } },
            { text: '认真倾听，适时补充想法', dimensions: { AP: 1 } },
            { text: '提出问题，引导大家深入思考', dimensions: { GK: 1 } },
            { text: '观察氛围，照顾每个人的感受', dimensions: { EA: 1 } }
        ]
    },
    {
        question: '你更喜欢哪种学习方式？',
        options: [
            { text: '系统学习，从基础到进阶', dimensions: { SP: 1, KP: 1 } },
            { text: '跟随兴趣，探索感兴趣的内容', dimensions: { FI: 1, EI: 1 } },
            { text: '实践中学，边做边学', dimensions: { FI: 2, KI: 1 } },
            { text: '与他人交流讨论中学习', dimensions: { GA: 1, EA: 2 } }
        ]
    },
    {
        question: '当计划被打乱时，你会：',
        options: [
            { text: '感到不适，尽快调整回正轨', dimensions: { SP: 2 } },
            { text: '无所谓，顺其自然', dimensions: { FI: 2 } },
            { text: '重新评估，制定新计划', dimensions: { SP: 1, KP: 1 } },
            { text: '把它当作新的机会和体验', dimensions: { FI: 1, EI: 1 } }
        ]
    },
    {
        question: '你认为好的沟通应该是：',
        options: [
            { text: '清晰准确，传达关键信息', dimensions: { KG: 1, SP: 1 } },
            { text: '真诚温暖，建立情感连接', dimensions: { EA: 2 } },
            { text: '启发思考，引导对方自己领悟', dimensions: { KG: 2, GI: 1 } },
            { text: '灵活自然，根据情况调整', dimensions: { FI: 1, EA: 1 } }
        ]
    },
    {
        question: '面对冲突，你通常会：',
        options: [
            { text: '直接沟通，理性分析问题', dimensions: { KG: 1, SP: 1 } },
            { text: '先冷静下来，再寻找解决办法', dimensions: { AP: 1, KP: 1 } },
            { text: '关注双方感受，寻求和解', dimensions: { EA: 2, AP: 2 } },
            { text: '灵活应对，视情况而定', dimensions: { FI: 1, GI: 1 } }
        ]
    },
    {
        question: '你更享受哪种工作状态？',
        options: [
            { text: '有明确目标和截止日期', dimensions: { SP: 2, KP: 1 } },
            { text: '自由发挥，没有太多限制', dimensions: { FI: 2, EI: 1 } },
            { text: '与他人协作，共同完成', dimensions: { GA: 1, EA: 1 } },
            { text: '独立思考，自主决策', dimensions: { KG: 1, GI: 1 } }
        ]
    },
    {
        question: '在陌生环境中，你会：',
        options: [
            { text: '观察环境，了解规则后再行动', dimensions: { AP: 1, KP: 1 } },
            { text: '主动探索，快速适应', dimensions: { GI: 1, FI: 1 } },
            { text: '寻找熟悉的人或事物', dimensions: { EA: 1, AP: 2 } },
            { text: '按照自己的节奏慢慢融入', dimensions: { FI: 2, AI: 1 } }
        ]
    },
    {
        question: '你如何看待规则？',
        options: [
            { text: '规则很重要，应该遵守', dimensions: { SP: 2, KP: 1 } },
            { text: '规则是参考，可以灵活变通', dimensions: { FI: 1, GI: 1 } },
            { text: '理解规则背后的意义更重要', dimensions: { KG: 1, EP: 1 } },
            { text: '规则应该考虑人的感受', dimensions: { EA: 1, FI: 2 } }
        ]
    },
    {
        question: '做决定时，你更依赖：',
        options: [
            { text: '逻辑分析和数据', dimensions: { KG: 2, SP: 1 } },
            { text: '直觉和感觉', dimensions: { EI: 1, FI: 1 } },
            { text: '他人的意见和建议', dimensions: { GA: 1, EA: 1 } },
            { text: '过往经验和教训', dimensions: { KP: 1, AP: 1 } }
        ]
    },
    {
        question: '你更喜欢哪种阅读材料？',
        options: [
            { text: '专业书籍，系统学习知识', dimensions: { KP: 2, SP: 1 } },
            { text: '人物传记，了解他人故事', dimensions: { EA: 2, AP: 1 } },
            { text: '创意作品，激发想象力', dimensions: { EI: 1, FI: 1 } },
            { text: '实用指南，解决实际问题', dimensions: { KG: 1, SP: 2 } }
        ]
    },
    {
        question: '在团队中，你最看重：',
        options: [
            { text: '明确的分工和高效执行', dimensions: { SP: 2, KG: 1 } },
            { text: '和谐的氛围和良好关系', dimensions: { EA: 2, AP: 1 } },
            { text: '创新的想法和突破', dimensions: { FI: 1, GI: 1 } },
            { text: '每个人都能发挥所长', dimensions: { GA: 1, EP: 1 } }
        ]
    },
    {
        question: '你如何处理压力？',
        options: [
            { text: '制定计划，逐步解决', dimensions: { SP: 2, KP: 1 } },
            { text: '找人倾诉，寻求支持', dimensions: { EA: 2, GA: 1 } },
            { text: '转移注意力，做喜欢的事', dimensions: { FI: 1, EI: 1 } },
            { text: '独自思考，理清思路', dimensions: { KG: 1, AI: 1 } }
        ]
    },
    {
        question: '你更倾向于：',
        options: [
            { text: '深入研究一个领域', dimensions: { KP: 2, SP: 1 } },
            { text: '广泛涉猎多个领域', dimensions: { FI: 1, GI: 1 } },
            { text: '关注人与人之间的关系', dimensions: { EA: 2, GA: 1 } },
            { text: '在实践中不断尝试', dimensions: { FI: 2, KI: 1 } }
        ]
    },
    {
        question: '你认为成功的关键是：',
        options: [
            { text: '明确的目标和坚持不懈', dimensions: { SP: 2, KP: 1 } },
            { text: '灵活应变和把握机会', dimensions: { FI: 2, GI: 1 } },
            { text: '良好的人际关系网络', dimensions: { EA: 1, GA: 2 } },
            { text: '深厚的专业知识积累', dimensions: { KP: 2, SP: 1 } }
        ]
    },
    {
        question: '空闲时间，你更愿意：',
        options: [
            { text: '学习新知识或技能', dimensions: { KP: 1, SP: 1 } },
            { text: '和朋友聚会聊天', dimensions: { EA: 1, GA: 1 } },
            { text: '尝试新鲜有趣的活动', dimensions: { FI: 1, EI: 1 } },
            { text: '独处放松，充电休息', dimensions: { AI: 1, EP: 1 } }
        ]
    },
    {
        question: '你如何评价自己的工作？',
        options: [
            { text: '看是否达成了预定目标', dimensions: { SP: 2, KG: 1 } },
            { text: '看是否帮助到了他人', dimensions: { EA: 2, GA: 1 } },
            { text: '看是否有创新和突破', dimensions: { FI: 1, GI: 1 } },
            { text: '看自己是否尽力而为', dimensions: { EP: 1, AP: 1 } }
        ]
    },
    {
        question: '面对批评，你会：',
        options: [
            { text: '理性分析，找出改进方向', dimensions: { KG: 1, SP: 1 } },
            { text: '先消化情绪，再思考内容', dimensions: { EA: 1, AP: 1 } },
            { text: '虚心接受，立即调整', dimensions: { GA: 1, FI: 1 } },
            { text: '反思自己，寻求成长', dimensions: { KP: 1, EP: 1 } }
        ]
    }
];

// 16种支教人格类型
const personalityTypes = {
    'SGKP': {
        title: '系统建筑师',
        icon: '🏗️',
        description: '你是知识体系的构建者，善于设计完整的教学框架，用结构化的方式引导学生系统学习。',
        strengths: ['构建完整知识体系', '制定清晰学习路径', '善于长期规划', '注重基础扎实'],
        improvements: ['可以增加课堂趣味性', '关注学生个体差异', '适当灵活调整节奏'],
        tips: ['在系统教学中融入互动环节', '定期了解学生的学习感受', '为不同水平学生设计分层内容']
    },
    'SGKI': {
        title: '知识探险家',
        icon: '🧭',
        description: '你善于引导学生探索知识的奥秘，用启发式的方法激发他们的求知欲和探索精神。',
        strengths: ['激发学习兴趣', '培养探索精神', '善于提出好问题', '鼓励独立思考'],
        improvements: ['注意知识的系统性', '确保基础知识掌握', '平衡探索与进度'],
        tips: ['在探索中设置知识锚点', '帮助学生建立知识框架', '定期回顾和总结']
    },
    'SGEP': {
        title: '成长引路人',
        icon: '🌱',
        description: '你关注学生的全面成长，善于通过引导帮助他们建立自信，发现自己的潜力。',
        strengths: ['关注学生成长', '善于激励鼓舞', '培养自信心', '注重品格培养'],
        improvements: ['加强知识传授', '提高教学效率', '注意时间管理'],
        tips: ['在情感支持中融入知识教学', '设定可达成的小目标', '记录学生的进步轨迹']
    },
    'SGEI': {
        title: '灵感点燃者',
        icon: '✨',
        description: '你充满热情和创意，善于用生动的方式点燃学生的学习热情，让他们爱上学习。',
        strengths: ['富有感染力', '激发学习热情', '创造积极氛围', '善于发现闪光点'],
        improvements: ['注重知识深度', '保持教学连贯性', '加强系统规划'],
        tips: ['将热情转化为持续动力', '设计有深度的互动', '建立稳定的教学节奏']
    },
    'SAKP': {
        title: '温暖守护者',
        icon: '🛡️',
        description: '你是学生可靠的陪伴者，用耐心和关怀为他们创造安全的学习环境，稳步前进。',
        strengths: ['极强的耐心', '细致的关怀', '稳定可靠', '善于倾听'],
        improvements: ['提升教学主动性', '增强引导能力', '适当放手让学生独立'],
        tips: ['在陪伴中培养独立性', '鼓励学生主动表达', '设置渐进式挑战']
    },
    'SAKI': {
        title: '贴心伙伴',
        icon: '🤝',
        description: '你像朋友一样陪伴学生，用温暖和理解建立深厚的师生关系，在轻松氛围中学习。',
        strengths: ['建立深厚关系', '营造轻松氛围', '善解人意', '灵活应变'],
        improvements: ['保持适当距离', '提高教学效率', '加强目标导向'],
        tips: ['在友好关系中保持引导', '设定清晰的学习目标', '平衡情感与知识']
    },
    'SAEP': {
        title: '心灵园丁',
        icon: '🌸',
        description: '你用爱心和耐心滋养学生的心灵，关注他们的情感需求，帮助他们健康成长。',
        strengths: ['深度情感连接', '敏锐的洞察力', '无私的关怀', '长期陪伴'],
        improvements: ['注意情感边界', '平衡知识教学', '提升教学效率'],
        tips: ['在情感支持中设定界限', '将关怀转化为成长动力', '关注学业进展']
    },
    'SAEI': {
        title: '阳光陪伴者',
        icon: '☀️',
        description: '你用温暖和积极感染身边的人，在轻松愉快的氛围中陪伴学生成长。',
        strengths: ['积极乐观', '感染力强', '善于鼓励', '创造快乐'],
        improvements: ['加强教学深度', '提高组织性', '注重学习成果'],
        tips: ['将快乐转化为学习动力', '设计有意义的活动', '关注实际进步']
    },
    'FGKP': {
        title: '智慧导师',
        icon: '🦉',
        description: '你拥有丰富的知识和灵活的教学方法，善于根据情况调整策略，引导学生深度学习。',
        strengths: ['知识渊博', '灵活应变', '善于引导', '注重理解'],
        improvements: ['提高教学系统性', '加强时间管理', '注意进度把控'],
        tips: ['在灵活中保持主线', '建立知识框架', '定期检查学习效果']
    },
    'FGKI': {
        title: '创新先锋',
        icon: '🚀',
        description: '你勇于尝试新方法，善于用创新的方式让学习变得有趣，激发学生的创造力。',
        strengths: ['富有创意', '勇于创新', '激发想象力', '打破常规'],
        improvements: ['确保基础扎实', '评估方法效果', '保持教学稳定性'],
        tips: ['在创新中夯实基础', '记录有效方法', '平衡新旧结合']
    },
    'FGEP': {
        title: '人文导师',
        icon: '📚',
        description: '你注重人文关怀，善于在灵活的教学中关注每个学生的独特性和成长需求。',
        strengths: ['人文关怀', '尊重个性', '灵活包容', '全面发展'],
        improvements: ['提高教学效率', '加强知识深度', '注意目标达成'],
        tips: ['在关怀中保持标准', '设定明确目标', '平衡个性与共性']
    },
    'FGEI': {
        title: '自由引导者',
        icon: '🎨',
        description: '你给予学生充分的自由和信任，用开放的方式引导他们探索和成长。',
        strengths: ['尊重自主性', '激发潜能', '开放包容', '鼓励探索'],
        improvements: ['提供必要指导', '确保学习效果', '加强结构性'],
        tips: ['在自由中设置边界', '提供及时反馈', '帮助总结提炼']
    },
    'FAKP': {
        title: '温柔支持者',
        icon: '🕊️',
        description: '你用温柔和耐心支持学生，在灵活的陪伴中帮助他们稳步成长。',
        strengths: ['温柔耐心', '灵活支持', '善于倾听', '尊重节奏'],
        improvements: ['增强主导性', '提高效率', '加强目标感'],
        tips: ['在支持中给予方向', '设定阶段目标', '鼓励主动性']
    },
    'FAKI': {
        title: '自然陪伴者',
        icon: '🍃',
        description: '你像朋友一样自然地陪伴学生，在轻松自在的氛围中共同成长。',
        strengths: ['自然真诚', '轻松自在', '平等相处', '灵活随和'],
        improvements: ['保持教师角色', '提高教学性', '加强规划性'],
        tips: ['在平等中保持引导', '明确学习目标', '定期检查进度']
    },
    'FAEP': {
        title: '共情陪伴者',
        icon: '💝',
        description: '你拥有强大的共情能力，能深刻理解学生的感受，在陪伴中给予情感支持。',
        strengths: ['深度共情', '情感支持', '理解包容', '建立信任'],
        improvements: ['保持客观性', '注重学业', '避免过度投入'],
        tips: ['在共情中保持界限', '平衡情感与理性', '关注学习成果']
    },
    'FAEI': {
        title: '自由之友',
        icon: '🦋',
        description: '你像朋友一样给予学生自由和理解，在轻松的氛围中陪伴他们探索成长。',
        strengths: ['自由开放', '真诚理解', '尊重选择', '轻松愉快'],
        improvements: ['加强教学性', '提供必要指导', '注重学习效果'],
        tips: ['在自由中设定目标', '提供适时引导', '关注实际进步']
    }
};

// 计算人格类型
function calculatePersonality(answers) {
    const scores = {
        S: 0, F: 0,  // 结构化 vs 灵活
        G: 0, A: 0,  // 引导 vs 陪伴
        K: 0, E: 0,  // 知识 vs 情感
        P: 0, I: 0   // 计划 vs 即兴
    };

    answers.forEach(answer => {
        Object.entries(answer.dimensions).forEach(([key, value]) => {
            key.split('').forEach(char => {
                scores[char] += value;
            });
        });
    });

    const type =
        (scores.S >= scores.F ? 'S' : 'F') +
        (scores.G >= scores.A ? 'G' : 'A') +
        (scores.K >= scores.E ? 'K' : 'E') +
        (scores.P >= scores.I ? 'P' : 'I');

    return { type, scores };
}

// 导出供script.js使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { quizData, personalityTypes, calculatePersonality };
}
