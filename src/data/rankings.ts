// 榜单系统数据
// 支持多维度因子评分和权重配置

import { clawSoftwares, formatNumber, formatGrowth } from './clawSoftwares';

export interface RankingFactor {
  id: string;
  name: string;
  description: string;
  weight: number;
  unit?: string;
  higherIsBetter: boolean;
}

export interface RankedItem {
  id: string;
  rank: number;
  name: string;
  logo?: string;
  description: string;
  url: string;
  github?: string;
  company: string;
  type: string;
  platforms: string[];
  features: string[];
  pricing: {
    model: string;
    freeTier: boolean;
    startingPrice?: string;
  };
  // 各因子原始值
  factors: Record<string, number>;
  // 综合得分 (0-100)
  score: number;
  // 环比变化
  change?: {
    rank: number;
    score: number;
  };
  tags: string[];
  lastUpdated: string;
  // 完整数据引用
  fullData?: any;
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

// ==================== Claw 软件榜单 ====================
export const clawSoftwareRanking: RankingCategory = {
  id: 'claw-softwares',
  name: 'Claw软件榜',
  icon: '🦞',
  description: '综合评估市面上主流Claw软件的用户规模、活跃度和市场影响力',
  updateFrequency: '每日更新',
  factors: [
    {
      id: 'dau',
      name: '日活跃用户',
      description: 'Daily Active Users，反映软件当前热度',
      weight: 25,
      unit: '人',
      higherIsBetter: true
    },
    {
      id: 'mau',
      name: '月活跃用户',
      description: 'Monthly Active Users，反映软件规模',
      weight: 20,
      unit: '人',
      higherIsBetter: true
    },
    {
      id: 'websiteTraffic',
      name: '官网访问量',
      description: '官网日访问量(PV)，反映品牌关注度',
      weight: 15,
      unit: 'PV',
      higherIsBetter: true
    },
    {
      id: 'growth',
      name: '增长率',
      description: 'DAU 月环比增长率',
      weight: 15,
      unit: '%',
      higherIsBetter: true
    },
    {
      id: 'tokenConsumption',
      name: 'Token消耗',
      description: '月Token消耗量，反映实际使用量',
      weight: 10,
      unit: 'tokens',
      higherIsBetter: true
    },
    {
      id: 'rating',
      name: '用户评分',
      description: '用户满意度评分',
      weight: 10,
      unit: '分',
      higherIsBetter: true
    },
    {
      id: 'ecosystemScore',
      name: '功能完善度',
      description: '功能丰富度、平台支持、生态完善度',
      weight: 5,
      unit: '分',
      higherIsBetter: true
    }
  ],
  items: clawSoftwares.map((software, index) => ({
    id: software.id,
    rank: index + 1,
    name: software.name,
    logo: software.logo,
    description: software.description,
    url: software.website,
    github: software.downloadUrl?.includes('github') ? software.downloadUrl : undefined,
    company: software.company,
    type: software.type,
    platforms: software.platforms,
    features: software.features,
    pricing: software.pricing,
    factors: {
      dau: software.stats.dau,
      mau: software.stats.mau,
      websiteTraffic: software.stats.websiteTraffic.daily,
      growth: software.stats.growth.dauGrowth,
      tokenConsumption: software.stats.tokenConsumption.monthly,
      rating: software.rating.score * 20, // 5分制转百分制
      ecosystemScore: software.features.length * 10
    },
    score: calculateScore(software),
    change: software.stats.growth.dauGrowth > 20 ? { rank: 1, score: 3.5 } : 
            software.stats.growth.dauGrowth > 10 ? { rank: 0, score: 1.2 } : 
            { rank: -1, score: -0.5 },
    tags: software.tags,
    lastUpdated: software.lastUpdated,
    fullData: software
  })).sort((a, b) => b.score - a.score).map((item, index) => ({ ...item, rank: index + 1 }))
};

// 计算综合得分
function calculateScore(software: any): number {
  const weights = {
    dau: 0.25,
    mau: 0.20,
    websiteTraffic: 0.15,
    growth: 0.15,
    tokenConsumption: 0.10,
    rating: 0.10,
    ecosystemScore: 0.05
  };
  
  // 归一化计算（简化版）
  const maxDAU = 200000;
  const maxMAU = 800000;
  const maxTraffic = 150000;
  const maxToken = 3000000000;
  
  const dauScore = (software.stats.dau / maxDAU) * 100;
  const mauScore = (software.stats.mau / maxMAU) * 100;
  const trafficScore = (software.stats.websiteTraffic.daily / maxTraffic) * 100;
  const growthScore = Math.min(software.stats.growth.dauGrowth * 2, 100); // 增长率50%封顶
  const tokenScore = (software.stats.tokenConsumption.monthly / maxToken) * 100;
  const ratingScore = software.rating.score * 20;
  const ecoScore = Math.min(software.features.length * 10, 100);
  
  return Math.round(
    dauScore * weights.dau +
    mauScore * weights.mau +
    trafficScore * weights.websiteTraffic +
    growthScore * weights.growth +
    tokenScore * weights.tokenConsumption +
    ratingScore * weights.rating +
    ecoScore * weights.ecosystemScore
  );
}

// ==================== Skill 榜单 ====================
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
      company: 'OpenClaw Team',
      type: 'development',
      platforms: ['windows', 'mac', 'linux'],
      features: ['创建Skill', '编辑Skill', '审计Skill'],
      pricing: { model: 'free', freeTier: true },
      factors: {
        downloads: 25600,
        weeklyDownloads: 1200,
        rating: 96,
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
      company: 'Community',
      type: 'social',
      platforms: ['web'],
      features: ['搜索帖子', '获取详情', '评论互动'],
      pricing: { model: 'free', freeTier: true },
      factors: {
        downloads: 21800,
        weeklyDownloads: 1800,
        rating: 92,
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
      company: 'OpenClaw Team',
      type: 'search',
      platforms: ['web'],
      features: ['网页搜索', '内容提取'],
      pricing: { model: 'free', freeTier: true },
      factors: {
        downloads: 19500,
        weeklyDownloads: 950,
        rating: 94,
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
      company: 'OpenClaw Team',
      type: 'security',
      platforms: ['linux'],
      features: ['安全加固', '健康检查'],
      pricing: { model: 'free', freeTier: true },
      factors: {
        downloads: 16800,
        weeklyDownloads: 680,
        rating: 90,
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
      company: 'OpenClaw Team',
      type: 'communication',
      platforms: ['web'],
      features: ['邮件收发', '附件处理'],
      pricing: { model: 'free', freeTier: true },
      factors: {
        downloads: 15200,
        weeklyDownloads: 520,
        rating: 88,
        usageFrequency: 2100,
        githubStars: 95
      },
      score: 85.6,
      change: { rank: -2, score: -1.2 },
      tags: ['邮件', '通讯', '办公'],
      lastUpdated: '2026-03-18'
    }
  ]
};

// ==================== Git 生态榜单 ====================
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
      id: 'contributors',
      name: 'Contributors',
      description: '贡献者数量',
      weight: 15,
      unit: '人',
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
      id: 'lastCommit',
      name: '最近提交',
      description: '距离上次提交的天数',
      weight: 10,
      unit: '天',
      higherIsBetter: false
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
      company: 'LangGenius',
      type: 'platform',
      platforms: ['web'],
      features: ['应用开发', '工作流', '模型管理'],
      pricing: { model: 'freemium', freeTier: true },
      factors: {
        stars: 85600,
        forks: 12800,
        contributors: 320,
        openIssues: 580,
        lastCommit: 0.5,
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
      company: 'Labring',
      type: 'platform',
      platforms: ['web'],
      features: ['知识库', '问答', 'RAG'],
      pricing: { model: 'freemium', freeTier: true },
      factors: {
        stars: 42500,
        forks: 6800,
        contributors: 180,
        openIssues: 320,
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
      logo: '🦞',
      description: 'AI Agent 编排框架',
      url: 'https://openclaw.ai',
      github: 'https://github.com/openclaw/openclaw',
      company: 'OpenClaw Community',
      type: 'framework',
      platforms: ['windows', 'mac', 'linux'],
      features: ['Agent编排', '多模型', '插件系统'],
      pricing: { model: 'free', freeTier: true },
      factors: {
        stars: 2500,
        forks: 420,
        contributors: 89,
        openIssues: 85,
        lastCommit: 0.2,
        releases: 45,
        prs: 680
      },
      score: 78.6,
      change: { rank: 2, score: 5.8 },
      tags: ['框架', '新兴', '增长快'],
      lastUpdated: '2026-03-18'
    }
  ]
};

// 所有榜单
export const allRankings = [
  clawSoftwareRanking,
  skillRanking,
  gitEcosystemRanking
];

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

export { formatNumber, formatGrowth };
