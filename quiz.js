// 支教人格测试系统 - 基于MBTI理论改编
//
// 四个维度（每个维度8道题，共32题）：
// 1. 教学风格：结构化(S) vs 灵活(F) - Structured vs Flexible
// 2. 互动方式：引导(G) vs 陪伴(A) - Guiding vs Accompanying
// 3. 关注点：知识(K) vs 情感(E) - Knowledge vs Emotion
// 4. 行动方式：计划(P) vs 即兴(I) - Planned vs Impromptu
//
// 16种人格类型 = 4个维度的组合（2^4 = 16）

const quizData = [
    // ========== 维度1：教学风格 S vs F（8题）==========
    {
        question: '准备一节课时，你会：',
        dimension: 'SF',
        options: [
            { text: '制定详细的教学计划，包括每个环节的时间分配', score: { S: 2 } },
            { text: '列出主要内容，但保持灵活调整的空间', score: { F: 1 } },
            { text: '准备核心知识点，根据课堂情况随机应变', score: { F: 2 } },
            { text: '设计完整的教学流程，但允许小幅调整', score: { S: 1 } }
        ]
    },
    {
        question: '对于课堂纪律，你认为：',
        dimension: 'SF',
        options: [
            { text: '应该有明确的规则，学生需要遵守', score: { S: 2 } },
            { text: '规则是参考，可以根据情况灵活处理', score: { F: 2 } },
            { text: '需要基本规则，但不必过于严格', score: { S: 1 } },
            { text: '让学生自主管理，培养自律性', score: { F: 1 } }
        ]
    },
    {
        question: '教学进度方面，你倾向于：',
        dimension: 'SF',
        options: [
            { text: '按照预定计划严格执行，确保完成教学目标', score: { S: 2 } },
            { text: '根据学生掌握情况随时调整进度', score: { F: 2 } },
            { text: '有大致进度安排，但可以适当调整', score: { S: 1 } },
            { text: '完全跟随学生节奏，不设固定进度', score: { F: 1 } }
        ]
    },
    {
        question: '面对突发情况（如学生提出课外问题），你会：',
        dimension: 'SF',
        options: [
            { text: '简短回答后继续按计划上课', score: { S: 2 } },
            { text: '抓住机会深入讨论，即使偏离原计划', score: { F: 2 } },
            { text: '适当讨论，但注意控制时间', score: { S: 1 } },
            { text: '鼓励探索，让讨论自然展开', score: { F: 1 } }
        ]
    },
    {
        question: '你更喜欢的教学环境是：',
        dimension: 'SF',
        options: [
            { text: '井然有序，每个环节都按部就班', score: { S: 2 } },
            { text: '自由开放，充满即兴和创意', score: { F: 2 } },
            { text: '有基本框架，但允许灵活变化', score: { F: 1 } },
            { text: '结构清晰，偶尔有些变化', score: { S: 1 } }
        ]
    },
    {
        question: '对于教学材料，你会：',
        dimension: 'SF',
        options: [
            { text: '提前准备好所有材料，分类整理', score: { S: 2 } },
            { text: '准备基础材料，现场根据需要补充', score: { F: 2 } },
            { text: '准备充分但保持灵活性', score: { S: 1 } },
            { text: '带上可能用到的材料，随机组合', score: { F: 1 } }
        ]
    },
    {
        question: '评估学生学习效果时，你倾向于：',
        dimension: 'SF',
        options: [
            { text: '使用标准化的测试和评分标准', score: { S: 2 } },
            { text: '通过观察和交流灵活评估', score: { F: 2 } },
            { text: '结合标准测试和灵活观察', score: { S: 1 } },
            { text: '让学生自我评估和反思', score: { F: 1 } }
        ]
    },
    {
        question: '对于教学目标，你认为：',
        dimension: 'SF',
        options: [
            { text: '应该明确具体，可量化可检验', score: { S: 2 } },
            { text: '可以是开放的，允许多元化结果', score: { F: 2 } },
            { text: '有明确方向，但过程可以灵活', score: { S: 1 } },
            { text: '重视过程体验，结果自然呈现', score: { F: 1 } }
        ]
    },

    // ========== 维度2：互动方式 G vs A（8题）==========
    {
        question: '在课堂上，你更倾向于：',
        dimension: 'GA',
        options: [
            { text: '主动提问引导，带领学生思考', score: { G: 2 } },
            { text: '陪伴在旁，等待学生主动提问', score: { A: 2 } },
            { text: '适时引导，也给学生自主空间', score: { G: 1 } },
            { text: '观察学生需求，提供必要支持', score: { A: 1 } }
        ]
    },
    {
        question: '学生遇到困难时，你会：',
        dimension: 'GA',
        options: [
            { text: '通过提问引导他们找到答案', score: { G: 2 } },
            { text: '陪伴他们一起探索解决方法', score: { A: 2 } },
            { text: '先引导思路，再陪伴实践', score: { G: 1 } },
            { text: '倾听他们的想法，给予支持', score: { A: 1 } }
        ]
    },
    {
        question: '在小组活动中，你的角色是：',
        dimension: 'GA',
        options: [
            { text: '组织者和引导者，推动活动进行', score: { G: 2 } },
            { text: '观察者和支持者，必要时提供帮助', score: { A: 2 } },
            { text: '引导方向，但让学生自主执行', score: { G: 1 } },
            { text: '融入其中，作为平等的参与者', score: { A: 1 } }
        ]
    },
    {
        question: '对于学生的想法，你通常：',
        dimension: 'GA',
        options: [
            { text: '提出问题帮助他们深化思考', score: { G: 2 } },
            { text: '认真倾听并给予肯定和鼓励', score: { A: 2 } },
            { text: '引导他们从不同角度思考', score: { G: 1 } },
            { text: '接纳他们的想法，陪伴他们实践', score: { A: 1 } }
        ]
    },
    {
        question: '你认为师生关系应该是：',
        dimension: 'GA',
        options: [
            { text: '老师是引路人，指引学生方向', score: { G: 2 } },
            { text: '老师是陪伴者，与学生共同成长', score: { A: 2 } },
            { text: '老师既引导又陪伴，角色灵活', score: { G: 1 } },
            { text: '老师是朋友，平等相处', score: { A: 1 } }
        ]
    },
    {
        question: '课堂讨论时，你会：',
        dimension: 'GA',
        options: [
            { text: '设计问题引导讨论方向', score: { G: 2 } },
            { text: '让学生自由讨论，我在旁倾听', score: { A: 2 } },
            { text: '抛出话题，适时引导深入', score: { G: 1 } },
            { text: '参与讨论，分享自己的看法', score: { A: 1 } }
        ]
    },
    {
        question: '学生犯错时，你会：',
        dimension: 'GA',
        options: [
            { text: '指出错误，引导他们找到正确方法', score: { G: 2 } },
            { text: '陪伴他们反思，让他们自己发现', score: { A: 2 } },
            { text: '提示问题所在，引导自我纠正', score: { G: 1 } },
            { text: '接纳错误，鼓励他们继续尝试', score: { A: 1 } }
        ]
    },
    {
        question: '对于学生的学习路径，你认为：',
        dimension: 'GA',
        options: [
            { text: '应该由老师规划和引导', score: { G: 2 } },
            { text: '应该由学生自主选择和探索', score: { A: 2 } },
            { text: '老师提供建议，学生做决定', score: { G: 1 } },
            { text: '陪伴学生探索，尊重他们的选择', score: { A: 1 } }
        ]
    },

    // ========== 维度3：关注点 K vs E（8题）==========
    {
        question: '你认为教学最重要的是：',
        dimension: 'KE',
        options: [
            { text: '传授知识，让学生掌握学科内容', score: { K: 2 } },
            { text: '关注情感，让学生感受到关爱', score: { E: 2 } },
            { text: '知识和情感同等重要', score: { K: 1, E: 1 } },
            { text: '以情感为基础，促进知识学习', score: { E: 1 } }
        ]
    },
    {
        question: '学生向你倾诉烦恼时，你会：',
        dimension: 'KE',
        options: [
            { text: '分析问题，提供解决方案', score: { K: 2 } },
            { text: '倾听和共情，给予情感支持', score: { E: 2 } },
            { text: '先倾听，再帮助分析问题', score: { E: 1 } },
            { text: '理解感受，引导理性思考', score: { K: 1 } }
        ]
    },
    {
        question: '评价一节课是否成功，你看重：',
        dimension: 'KE',
        options: [
            { text: '学生是否掌握了知识点', score: { K: 2 } },
            { text: '学生是否感到快乐和被关注', score: { E: 2 } },
            { text: '学生的学习效果和情感体验', score: { K: 1, E: 1 } },
            { text: '学生是否建立了学习信心', score: { E: 1 } }
        ]
    },
    {
        question: '准备课程内容时，你更关注：',
        dimension: 'KE',
        options: [
            { text: '知识的准确性和系统性', score: { K: 2 } },
            { text: '内容是否能引起学生共鸣', score: { E: 2 } },
            { text: '知识的实用性和趣味性', score: { K: 1 } },
            { text: '学生的兴趣和情感需求', score: { E: 1 } }
        ]
    },
    {
        question: '与学生交流时，你更倾向于：',
        dimension: 'KE',
        options: [
            { text: '讨论学习内容和知识问题', score: { K: 2 } },
            { text: '聊生活、兴趣和感受', score: { E: 2 } },
            { text: '从学习话题延伸到生活', score: { K: 1 } },
            { text: '从生活话题引入学习', score: { E: 1 } }
        ]
    },
    {
        question: '学生学习状态不佳时，你首先：',
        dimension: 'KE',
        options: [
            { text: '分析学习方法是否有问题', score: { K: 2 } },
            { text: '关心他们的情绪和心理状态', score: { E: 2 } },
            { text: '了解情况后调整教学方法', score: { K: 1 } },
            { text: '给予情感支持，帮助调整状态', score: { E: 1 } }
        ]
    },
    {
        question: '你更喜欢的课堂氛围是：',
        dimension: 'KE',
        options: [
            { text: '专注认真，高效学习', score: { K: 2 } },
            { text: '温暖轻松，充满关爱', score: { E: 2 } },
            { text: '既有学习效率，也有轻松时刻', score: { K: 1, E: 1 } },
            { text: '情感连接深厚，学习自然发生', score: { E: 1 } }
        ]
    },
    {
        question: '对于学生的进步，你更看重：',
        dimension: 'KE',
        options: [
            { text: '知识掌握程度的提升', score: { K: 2 } },
            { text: '自信心和学习态度的改善', score: { E: 2 } },
            { text: '学习能力和思维方式的发展', score: { K: 1 } },
            { text: '情感成长和人格完善', score: { E: 1 } }
        ]
    },

    // ========== 维度4：行动方式 P vs I（8题）==========
    {
        question: '对于一学期的教学，你会：',
        dimension: 'PI',
        options: [
            { text: '制定详细的学期计划，按计划执行', score: { P: 2 } },
            { text: '有大致方向，根据情况即兴调整', score: { I: 2 } },
            { text: '制定计划但保持调整空间', score: { P: 1 } },
            { text: '跟随学生节奏，灵活安排', score: { I: 1 } }
        ]
    },
    {
        question: '面对新的教学任务，你会：',
        dimension: 'PI',
        options: [
            { text: '先做充分准备和规划再开始', score: { P: 2 } },
            { text: '快速开始，边做边调整', score: { I: 2 } },
            { text: '做基本准备后就开始行动', score: { P: 1 } },
            { text: '相信直觉，随机应变', score: { I: 1 } }
        ]
    },
    {
        question: '你的工作风格是：',
        dimension: 'PI',
        options: [
            { text: '提前完成，留出检查时间', score: { P: 2 } },
            { text: '在截止日期前完成即可', score: { I: 2 } },
            { text: '按时完成，不拖延也不过早', score: { P: 1 } },
            { text: '灵感来了就做，效率最高', score: { I: 1 } }
        ]
    },
    {
        question: '对于教学资源，你倾向于：',
        dimension: 'PI',
        options: [
            { text: '提前收集整理，分类归档', score: { P: 2 } },
            { text: '需要时再找，保持灵活性', score: { I: 2 } },
            { text: '定期整理，但不过于严格', score: { P: 1 } },
            { text: '随手收集，用时组合', score: { I: 1 } }
        ]
    },
    {
        question: '课后反思时，你会：',
        dimension: 'PI',
        options: [
            { text: '系统记录，定期总结分析', score: { P: 2 } },
            { text: '想到什么记什么，随性而为', score: { I: 2 } },
            { text: '记录重点，不定期回顾', score: { P: 1 } },
            { text: '主要靠记忆，偶尔记录', score: { I: 1 } }
        ]
    },
    {
        question: '对于教学创新，你认为：',
        dimension: 'PI',
        options: [
            { text: '应该经过充分论证和试验', score: { P: 2 } },
            { text: '有想法就尝试，快速迭代', score: { I: 2 } },
            { text: '做基本评估后就可以尝试', score: { P: 1 } },
            { text: '相信直觉，大胆尝试', score: { I: 1 } }
        ]
    },
    {
        question: '你的时间管理方式是：',
        dimension: 'PI',
        options: [
            { text: '使用日程表，严格按时间安排', score: { P: 2 } },
            { text: '根据当下状态和心情决定', score: { I: 2 } },
            { text: '有时间规划，但可以调整', score: { P: 1 } },
            { text: '优先处理紧急的，其他灵活安排', score: { I: 1 } }
        ]
    },
    {
        question: '对于教学目标的达成，你：',
        dimension: 'PI',
        options: [
            { text: '设定明确目标，制定达成计划', score: { P: 2 } },
            { text: '有大致目标，过程中自然达成', score: { I: 2 } },
            { text: '设定目标，灵活调整路径', score: { P: 1 } },
            { text: '享受过程，结果水到渠成', score: { I: 1 } }
        ]
    }
];

// 16种支教人格类型（基于4个维度的组合）
const personalityTypes = {
    'SGKP': {
        title: '系统建筑师',
        icon: '🏗️',
        description: '你是知识体系的构建者，善于设计完整的教学框架，用结构化的方式引导学生系统学习。',
        dimensions: '结构化 + 引导 + 知识 + 计划',
        strengths: ['构建完整知识体系', '制定清晰学习路径', '善于长期规划', '注重基础扎实'],
        improvements: ['可以增加课堂趣味性', '关注学生个体差异', '适当灵活调整节奏'],
        tips: ['在系统教学中融入互动环节', '定期了解学生的学习感受', '为不同水平学生设计分层内容']
    },
    'SGKI': {
        title: '知识探险家',
        icon: '🧭',
        description: '你善于引导学生探索知识的奥秘，用启发式的方法激发他们的求知欲和探索精神。',
        dimensions: '结构化 + 引导 + 知识 + 即兴',
        strengths: ['激发学习兴趣', '培养探索精神', '善于提出好问题', '鼓励独立思考'],
        improvements: ['注意知识的系统性', '确保基础知识掌握', '平衡探索与进度'],
        tips: ['在探索中设置知识锚点', '帮助学生建立知识框架', '定期回顾和总结']
    },
    'SGEP': {
        title: '成长引路人',
        icon: '🌱',
        description: '你关注学生的全面成长，善于通过引导帮助他们建立自信，发现自己的潜力。',
        dimensions: '结构化 + 引导 + 情感 + 计划',
        strengths: ['关注学生成长', '善于激励鼓舞', '培养自信心', '注重品格培养'],
        improvements: ['加强知识传授', '提高教学效率', '注意时间管理'],
        tips: ['在情感支持中融入知识教学', '设定可达成的小目标', '记录学生的进步轨迹']
    },
    'SGEI': {
        title: '灵感点燃者',
        icon: '✨',
        description: '你充满热情和创意，善于用生动的方式点燃学生的学习热情，让他们爱上学习。',
        dimensions: '结构化 + 引导 + 情感 + 即兴',
        strengths: ['富有感染力', '激发学习热情', '创造积极氛围', '善于发现闪光点'],
        improvements: ['注重知识深度', '保持教学连贯性', '加强系统规划'],
        tips: ['将热情转化为持续动力', '设计有深度的互动', '建立稳定的教学节奏']
    },
    'SAKP': {
        title: '温暖守护者',
        icon: '🛡️',
        description: '你是学生可靠的陪伴者，用耐心和关怀为他们创造安全的学习环境，稳步前进。',
        dimensions: '结构化 + 陪伴 + 知识 + 计划',
        strengths: ['极强的耐心', '细致的关怀', '稳定可靠', '善于倾听'],
        improvements: ['提升教学主动性', '增强引导能力', '适当放手让学生独立'],
        tips: ['在陪伴中培养独立性', '鼓励学生主动表达', '设置渐进式挑战']
    },
    'SAKI': {
        title: '贴心伙伴',
        icon: '🤝',
        description: '你像朋友一样陪伴学生，用温暖和理解建立深厚的师生关系，在轻松氛围中学习。',
        dimensions: '结构化 + 陪伴 + 知识 + 即兴',
        strengths: ['建立深厚关系', '营造轻松氛围', '善解人意', '灵活应变'],
        improvements: ['保持适当距离', '提高教学效率', '加强目标导向'],
        tips: ['在友好关系中保持引导', '设定清晰的学习目标', '平衡情感与知识']
    },
    'SAEP': {
        title: '心灵园丁',
        icon: '🌸',
        description: '你用爱心和耐心滋养学生的心灵，关注他们的情感需求，帮助他们健康成长。',
        dimensions: '结构化 + 陪伴 + 情感 + 计划',
        strengths: ['深度情感连接', '敏锐的洞察力', '无私的关怀', '长期陪伴'],
        improvements: ['注意情感边界', '平衡知识教学', '提升教学效率'],
        tips: ['在情感支持中设定界限', '将关怀转化为成长动力', '关注学业进展']
    },
    'SAEI': {
        title: '阳光陪伴者',
        icon: '☀️',
        description: '你用温暖和积极感染身边的人，在轻松愉快的氛围中陪伴学生成长。',
        dimensions: '结构化 + 陪伴 + 情感 + 即兴',
        strengths: ['积极乐观', '感染力强', '善于鼓励', '创造快乐'],
        improvements: ['加强教学深度', '提高组织性', '注重学习成果'],
        tips: ['将快乐转化为学习动力', '设计有意义的活动', '关注实际进步']
    },
    'FGKP': {
        title: '智慧导师',
        icon: '🦉',
        description: '你拥有丰富的知识和灵活的教学方法，善于根据情况调整策略，引导学生深度学习。',
        dimensions: '灵活 + 引导 + 知识 + 计划',
        strengths: ['知识渊博', '灵活应变', '善于引导', '注重理解'],
        improvements: ['提高教学系统性', '加强时间管理', '注意进度把控'],
        tips: ['在灵活中保持主线', '建立知识框架', '定期检查学习效果']
    },
    'FGKI': {
        title: '创新先锋',
        icon: '🚀',
        description: '你勇于尝试新方法，善于用创新的方式让学习变得有趣，激发学生的创造力。',
        dimensions: '灵活 + 引导 + 知识 + 即兴',
        strengths: ['富有创意', '勇于创新', '激发想象力', '打破常规'],
        improvements: ['确保基础扎实', '评估方法效果', '保持教学稳定性'],
        tips: ['在创新中夯实基础', '记录有效方法', '平衡新旧结合']
    },
    'FGEP': {
        title: '人文导师',
        icon: '📚',
        description: '你注重人文关怀，善于在灵活的教学中关注每个学生的独特性和成长需求。',
        dimensions: '灵活 + 引导 + 情感 + 计划',
        strengths: ['人文关怀', '尊重个性', '灵活包容', '全面发展'],
        improvements: ['提高教学效率', '加强知识深度', '注意目标达成'],
        tips: ['在关怀中保持标准', '设定明确目标', '平衡个性与共性']
    },
    'FGEI': {
        title: '自由引导者',
        icon: '🎨',
        description: '你给予学生充分的自由和信任，用开放的方式引导他们探索和成长。',
        dimensions: '灵活 + 引导 + 情感 + 即兴',
        strengths: ['尊重自主性', '激发潜能', '开放包容', '鼓励探索'],
        improvements: ['提供必要指导', '确保学习效果', '加强结构性'],
        tips: ['在自由中设置边界', '提供及时反馈', '帮助总结提炼']
    },
    'FAKP': {
        title: '温柔支持者',
        icon: '🕊️',
        description: '你用温柔和耐心支持学生，在灵活的陪伴中帮助他们稳步成长。',
        dimensions: '灵活 + 陪伴 + 知识 + 计划',
        strengths: ['温柔耐心', '灵活支持', '善于倾听', '尊重节奏'],
        improvements: ['增强主导性', '提高效率', '加强目标感'],
        tips: ['在支持中给予方向', '设定阶段目标', '鼓励主动性']
    },
    'FAKI': {
        title: '自然陪伴者',
        icon: '🍃',
        description: '你像朋友一样自然地陪伴学生，在轻松自在的氛围中共同成长。',
        dimensions: '灵活 + 陪伴 + 知识 + 即兴',
        strengths: ['自然真诚', '轻松自在', '平等相处', '灵活随和'],
        improvements: ['保持教师角色', '提高教学性', '加强规划性'],
        tips: ['在平等中保持引导', '明确学习目标', '定期检查进度']
    },
    'FAEP': {
        title: '共情陪伴者',
        icon: '💝',
        description: '你拥有强大的共情能力，能深刻理解学生的感受，在陪伴中给予情感支持。',
        dimensions: '灵活 + 陪伴 + 情感 + 计划',
        strengths: ['深度共情', '情感支持', '理解包容', '建立信任'],
        improvements: ['保持客观性', '注重学业', '避免过度投入'],
        tips: ['在共情中保持界限', '平衡情感与理性', '关注学习成果']
    },
    'FAEI': {
        title: '自由之友',
        icon: '🦋',
        description: '你像朋友一样给予学生自由和理解，在轻松的氛围中陪伴他们探索成长。',
        dimensions: '灵活 + 陪伴 + 情感 + 即兴',
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

    // 累加每个答案的分数
    answers.forEach(answer => {
        Object.entries(answer.score).forEach(([key, value]) => {
            scores[key] += value;
        });
    });

    // 根据分数确定每个维度的倾向
    const type =
        (scores.S >= scores.F ? 'S' : 'F') +
        (scores.G >= scores.A ? 'G' : 'A') +
        (scores.K >= scores.E ? 'K' : 'E') +
        (scores.P >= scores.I ? 'P' : 'I');

    // 计算每个维度的百分比（用于显示维度倾向）
    const percentages = {
        SF: Math.round((scores.S / (scores.S + scores.F)) * 100),
        GA: Math.round((scores.G / (scores.G + scores.A)) * 100),
        KE: Math.round((scores.K / (scores.K + scores.E)) * 100),
        PI: Math.round((scores.P / (scores.P + scores.I)) * 100)
    };

    return { type, scores, percentages };
}

// 导出供script.js使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { quizData, personalityTypes, calculatePersonality };
}