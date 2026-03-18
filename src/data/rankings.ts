// 榜单系统数据
// 支持多维度因子评分和权重配置

export interface RankingFactor {
  id: string;
  name: string;
  description: string;
  weight: number; // 权重 0-100
  unit?: string;
  higherIsBetter: boolean; // true=越高越好，false=越低越好
}

export interface RankedItem {
  id: string;
  rank: number;
  name: string;
  logo?: string;
  description: string;
  url: string;
  github?: string;
  // 各因子原始值
  factors: Record<string, number>;
  // 综合得分 (0-100)
  score: number;
  // 环比变化
  change?: {
    rank: number; // 排名变化（正=上升，负=下降）
    score: number; // 得分变化百分比
  };
  tags: string[];
  lastUpdated: string;
}

export interface RankingCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  factors: RankingFactor[];
  items: RankedItem[];
  updateFrequency: string;
}

// ==================== 1. Claw 平台榜单 ====================
export const clawPlatformRanking: RankingCategory = {
  id: 'claw-platforms',
  name: 'Claw 平台榜',
  icon: '🦾',
  description: '综合评估各 AI Agent 平台的活跃度、规模和发展潜力',
  updateFrequency: '每日更新',
  factors: [
    {
      id: 'dau',
      name: '日活跃用户',
      description: 'Daily Active Users，反映平台当前热度',
      weight: 25,
      unit: '人',
      higherIsBetter: true
    },
    {
      id: 'mau',
      name: '月活跃用户',
      description: 'Monthly Active Users，反映平台规模',
      weight: 20,
      unit: '人',
      higherIsBetter: true
    },
    {
      id: 'growth',
      name: '增长率',
      description: 'DAU 月环比增长率',
      weight: 20,
      unit: '%',
      higherIsBetter: true
    },
    {
      id: 'tokenConsumption',
      name: 'Token 消耗',
      description: '月 Token 消耗量，反映实际使用量',
      weight: 15,
      unit: 'tokens',
      higherIsBetter: true
    },
    {
      id: 'githubStars',
      name: 'GitHub Stars',
      description: '开源项目的社区关注度',
      weight: 10,
      unit: 'stars',
      higherIsBetter: true
    },
    {
      id: 'ecosystemScore',
      name: '生态完善度',
      description: '插件数量、文档完善度、社区活跃度等综合评分',
      weight: 10,
      unit: '分',
      higherIsBetter: true
    }
  ],
  items: [
    {
      id: 'coze',
      rank: 1,
      name: 'Coze (扣子)',
      logo: '🔷',
      description: '字节跳动推出的 AI Bot 开发平台，用户规模最大',
      url: 'https://www.coze.cn',
      factors: {
        dau: 45600,
        mau: 189000,
        growth: 22.5,
        tokenConsumption: 368000000,
        githubStars: 0,
        ecosystemScore: 85
      },
      score: 94.2,
      change: { rank: 0, score: 2.1 },
      tags: ['大厂出品', '低代码', '生态完善'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'dify',
      rank: 2,
      name: 'Dify',
      logo: '🤖',
      description: '开源 LLM 应用开发平台，开发者首选',
      url: 'https://dify.ai',
      github: 'https://github.com/langgenius/dify',
      factors: {
        dau: 28900,
        mau: 124000,
        growth: 18.2,
        tokenConsumption: 245000000,
        githubStars: 85600,
        ecosystemScore: 92
      },
      score: 91.8,
      change: { rank: 1, score: 3.5 },
      tags: ['开源', '企业级', '工作流'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'wenxin',
      rank: 3,
      name: '文心智能体',
      logo: '🌐',
      description: '百度文心大模型智能体平台',
      url: 'https://agents.baidu.com',
      factors: {
        dau: 32100,
        mau: 156000,
        growth: 14.2,
        tokenConsumption: 285000000,
        githubStars: 0,
        ecosystemScore: 78
      },
      score: 87.5,
      change: { rank: -1, score: 1.2 },
      tags: ['百度', '大模型', '智能体'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'fastgpt',
      rank: 4,
      name: 'FastGPT',
      logo: '⚡',
      description: '知识库问答系统，快速搭建 AI 客服',
      url: 'https://fastgpt.in',
      github: 'https://github.com/labring/FastGPT',
      factors: {
        dau: 18600,
        mau: 78000,
        growth: 15.8,
        tokenConsumption: 158000000,
        githubStars: 42500,
        ecosystemScore: 80
      },
      score: 82.3,
      change: { rank: 0, score: 2.8 },
      tags: ['知识库', '客服', '开源'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'openclaw',
      rank: 5,
      name: 'OpenClaw',
      logo: '🦾',
      description: '开源 AI Agent 编排框架，多模型多渠道支持',
      url: 'https://openclaw.ai',
      github: 'https://github.com/openclaw/openclaw',
      factors: {
        dau: 12580,
        mau: 45600,
        growth: 12.5,
        tokenConsumption: 85000000,
        githubStars: 2500,
        ecosystemScore: 88
      },
      score: 76.8,
      change: { rank: 2, score: 4.2 },
      tags: ['开源框架', '多模型', '生态'],
      lastUpdated: '2026-03-18'
    }
  ]
};

// ==================== 2. Skill 榜单 ====================
export const skillRanking: RankingCategory = {
  id: 'skills',
  name: 'Skill 热度榜',
  icon: '🔧',
  description: '基于下载量、使用频率、评分等多维度评估 Skill 热度',
  updateFrequency: '每周更新',
  factors: [
    {
      id: 'downloads',
      name: '总下载量',
      description: '累计安装次数',
      weight: 30,
      unit: '次',
      higherIsBetter: true
    },
    {
      id: 'weeklyDownloads',
      name: '周下载量',
      description: '近7天新增下载',
      weight: 25,
      unit: '次',
      higherIsBetter: true
    },
    {
      id: 'rating',
      name: '用户评分',
      description: '1-5星平均评分',
      weight: 20,
      unit: '分',
      higherIsBetter: true
    },
    {
      id: 'usageFrequency',
      name: '使用频次',
      description: '日均调用次数',
      weight: 15,
      unit: '次/日',
      higherIsBetter: true
    },
    {
      id: 'githubStars',
      name: 'GitHub Stars',
      description: '开源 Skill 的社区关注度',
      weight: 10,
      unit: 'stars',
      higherIsBetter: true
    }
  ],
  items: [
    {
      id: 'skill-creator',
      rank: 1,
      name: 'skill-creator',
      logo: '🛠️',
      description: '创建、编辑、审计 Agent Skills 的开发工具',
      url: 'https://clawhub.com/skills/skill-creator',
      github: 'https://github.com/openclaw/skill-creator',
      factors: {
        downloads: 25600,
        weeklyDownloads: 1200,
        rating: 4.8,
        usageFrequency: 3500,
        githubStars: 156
      },
      score: 96.5,
      change: { rank: 0, score: 1.2 },
      tags: ['开发工具', '必备', '官方'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'xiaohongshu',
      rank: 2,
      name: 'xiaohongshu',
      logo: '📱',
      description: '小红书内容工具，搜索帖子、获取详情、评论互动',
      url: 'https://clawhub.com/skills/xiaohongshu',
      factors: {
        downloads: 21800,
        weeklyDownloads: 1800,
        rating: 4.6,
        usageFrequency: 5200,
        githubStars: 89
      },
      score: 94.2,
      change: { rank: 2, score: 3.8 },
      tags: ['社交媒体', '内容', '热门'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'tavily',
      rank: 3,
      name: 'tavily',
      logo: '🔍',
      description: 'Tavily 搜索引擎集成，高质量网页搜索和内容提取',
      url: 'https://clawhub.com/skills/tavily-tool',
      github: 'https://github.com/openclaw/tavily-tool',
      factors: {
        downloads: 19500,
        weeklyDownloads: 950,
        rating: 4.7,
        usageFrequency: 4200,
        githubStars: 128
      },
      score: 91.8,
      change: { rank: -1, score: 0.5 },
      tags: ['搜索', 'API', '实用'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'healthcheck',
      rank: 4,
      name: 'healthcheck',
      logo: '🏥',
      description: '主机安全加固和健康检查工具',
      url: 'https://clawhub.com/skills/healthcheck',
      factors: {
        downloads: 16800,
        weeklyDownloads: 680,
        rating: 4.5,
        usageFrequency: 1200,
        githubStars: 88
      },
      score: 87.3,
      change: { rank: 1, score: 2.1 },
      tags: ['安全', '运维', '服务器'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'imap-smtp-email',
      rank: 5,
      name: 'imap-smtp-email',
      logo: '📧',
      description: '邮件收发技能，支持 IMAP/SMTP 协议',
      url: 'https://clawhub.com/skills/imap-smtp-email',
      factors: {
        downloads: 15200,
        weeklyDownloads: 520,
        rating: 4.4,
        usageFrequency: 2100,
        githubStars: 95
      },
      score: 85.6,
      change: { rank: -2, score: -1.2 },
      tags: ['邮件', '通讯', '办公'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'weather',
      rank: 6,
      name: 'weather',
      logo: '🌤️',
      description: '天气查询技能，支持 wttr.in 和 Open-Meteo',
      url: 'https://clawhub.com/skills/weather',
      factors: {
        downloads: 14200,
        weeklyDownloads: 380,
        rating: 4.3,
        usageFrequency: 2800,
        githubStars: 72
      },
      score: 82.1,
      change: { rank: 0, score: 0.8 },
      tags: ['天气', '生活', '实用'],
      lastUpdated: '2026-03-18'
    }
  ]
};

// ==================== 3. Git 生态榜单 ====================
export const gitEcosystemRanking: RankingCategory = {
  id: 'git-ecosystem',
  name: 'Git 生态榜',
  icon: '🐙',
  description: '基于 GitHub 数据评估 AI Agent 相关开源项目影响力',
  updateFrequency: '每日更新',
  factors: [
    {
      id: 'stars',
      name: 'GitHub Stars',
      description: '项目受欢迎程度',
      weight: 25,
      unit: 'stars',
      higherIsBetter: true
    },
    {
      id: 'forks',
      name: 'Forks',
      description: '项目被 Fork 次数，反映参与度',
      weight: 20,
      unit: 'forks',
      higherIsBetter: true
    },
    {
      id: 'openIssues',
      name: 'Open Issues',
      description: '活跃的 Issue 数量（反映社区活跃度）',
      weight: 10,
      unit: 'issues',
      higherIsBetter: true
    },
    {
      id: 'contributors',
      name: 'Contributors',
      description: '贡献者数量',
      weight: 15,
      unit: '人',
      higherIsBetter: true
    },
    {
      id: 'lastCommit',
      name: '最近提交',
      description: '距离上次提交的天数',
      weight: 10,
      unit: '天',
      higherIsBetter: false // 越小越好
    },
    {
      id: 'releases',
      name: 'Releases',
      description: '版本发布数量',
      weight: 10,
      unit: '个',
      higherIsBetter: true
    },
    {
      id: 'prs',
      name: 'Pull Requests',
      description: '合并的 PR 数量',
      weight: 10,
      unit: '个',
      higherIsBetter: true
    }
  ],
  items: [
    {
      id: 'dify',
      rank: 1,
      name: 'Dify',
      logo: '🤖',
      description: 'LLM 应用开发平台，GitHub 最热门的 AI Agent 项目',
      url: 'https://dify.ai',
      github: 'https://github.com/langgenius/dify',
      factors: {
        stars: 85600,
        forks: 12800,
        openIssues: 580,
        contributors: 320,
        lastCommit: 0.5, // 半天前
        releases: 156,
        prs: 8900
      },
      score: 98.2,
      change: { rank: 0, score: 2.5 },
      tags: ['开源', '企业级', '热门'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'fastgpt',
      rank: 2,
      name: 'FastGPT',
      logo: '⚡',
      description: '知识库问答系统',
      url: 'https://fastgpt.in',
      github: 'https://github.com/labring/FastGPT',
      factors: {
        stars: 42500,
        forks: 6800,
        openIssues: 320,
        contributors: 180,
        lastCommit: 1,
        releases: 89,
        prs: 4200
      },
      score: 91.5,
      change: { rank: 1, score: 3.2 },
      tags: ['知识库', 'RAG', '开源'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'openclaw',
      rank: 3,
      name: 'OpenClaw',
      logo: '🦾',
      description: 'AI Agent 编排框架',
      url: 'https://openclaw.ai',
      github: 'https://github.com/openclaw/openclaw',
      factors: {
        stars: 2500,
        forks: 420,
        openIssues: 85,
        contributors: 89,
        lastCommit: 0.2,
        releases: 45,
        prs: 680
      },
      score: 78.6,
      change: { rank: 2, score: 5.8 },
      tags: ['框架', '新兴', '增长快'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'langchain',
      rank: 4,
      name: 'LangChain',
      logo: '🔗',
      description: '构建 LLM 应用的框架',
      url: 'https://langchain.com',
      github: 'https://github.com/langchain-ai/langchain',
      factors: {
        stars: 98500,
        forks: 15800,
        openIssues: 1200,
        contributors: 580,
        lastCommit: 0.3,
        releases: 256,
        prs: 12500
      },
      score: 95.8,
      change: { rank: -2, score: 0.2 },
      tags: ['框架', '标杆', '成熟'],
      lastUpdated: '2026-03-18'
    },
    {
      id: 'coze-sdk',
      rank: 5,
      name: 'Coze SDK',
      logo: '🔷',
      description: '扣子官方 SDK',
      url: 'https://github.com/coze-dev/coze-js',
      github: 'https://github.com/coze-dev/coze-js',
      factors: {
        stars: 6800,
        forks: 890,
        openIssues: 45,
        contributors: 28,
        lastCommit: 2,
        releases: 24,
        prs: 320
      },
      score: 72.3,
      change: { rank: 0, score: 1.5 },
      tags: ['SDK', '官方', '字节'],
      lastUpdated: '2026-03-18'
    }
  ]
};

// 所有榜单
export const allRankings = [
  clawPlatformRanking,
  skillRanking,
  gitEcosystemRanking
];

// 格式化数字
export function formatNumber(num: number, unit?: string): string {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '亿';
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  if (num < 1 && num > 0) {
    return num.toFixed(1);
  }
  return Math.round(num).toLocaleString() + (unit ? ` ${unit}` : '');
}

// 获取排名变化图标
export function getRankChangeIcon(change: number): string {
  if (change > 0) return '↑';
  if (change < 0) return '↓';
  return '-';
}

// 获取排名变化颜色
export function getRankChangeColor(change: number): string {
  if (change > 0) return '#22c55e';
  if (change < 0) return '#ef4444';
  return '#94a3b8';
}
