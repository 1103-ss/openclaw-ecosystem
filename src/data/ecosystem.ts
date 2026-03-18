// OpenClaw 生态数据
// 后续可接入 GitHub API / ClawHub API 自动更新

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  type: 'release' | 'skill' | 'plugin' | 'article' | 'community';
  date: string;
  url: string;
  source: string;
  tags?: string[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  author: string;
  stars: number;
  category: string;
  url: string;
  tags: string[];
  featured?: boolean;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  type: 'cli' | 'sdk' | 'integration';
  repo: string;
  stars: number;
  language: string;
  url: string;
}

// 示例数据 - 后续改为从 API 获取
export const latestNews: NewsItem[] = [
  {
    id: '1',
    title: 'OpenClaw v1.0 发布 - 全新 Agent 能力',
    summary: 'OpenClaw 正式发布 v1.0 版本，带来更强的 Agent 编排能力、多模型支持和改进的 Plugin 系统。',
    type: 'release',
    date: '2026-03-15',
    url: 'https://github.com/openclaw/openclaw/releases',
    source: 'GitHub',
    tags: ['release', 'major']
  },
  {
    id: '2',
    title: 'ClawHub Skills 市场上线',
    summary: 'ClawHub 正式推出 Skills 市场，开发者可以发布和分享自己的 Agent 技能包。',
    type: 'community',
    date: '2026-03-10',
    url: 'https://clawhub.com',
    source: 'ClawHub',
    tags: ['skills', 'marketplace']
  },
  {
    id: '3',
    title: '新 Skill: tavily-tool 发布',
    summary: 'Tavily 搜索集成技能，支持高质量网页搜索和内容提取，无需 Brave API Key。',
    type: 'skill',
    date: '2026-03-08',
    url: 'https://clawhub.com/skills/tavily-tool',
    source: 'ClawHub',
    tags: ['search', 'api']
  },
  {
    id: '4',
    title: '新 Skill: imap-smtp-email 发布',
    summary: '邮件收发技能，支持 IMAP/SMTP 协议，可读取、发送邮件，支持附件。',
    type: 'skill',
    date: '2026-03-05',
    url: 'https://clawhub.com/skills/imap-smtp-email',
    source: 'ClawHub',
    tags: ['email', 'imap', 'smtp']
  },
  {
    id: '5',
    title: 'clawhub-cli v2.0 更新',
    summary: 'ClawHub 命令行工具更新至 v2.0，新增 skill 发布、版本管理功能。',
    type: 'release',
    date: '2026-03-01',
    url: 'https://github.com/clawhub/clawhub-cli',
    source: 'GitHub',
    tags: ['cli', 'update']
  }
];

export const featuredSkills: Skill[] = [
  {
    id: 'tavily-tool',
    name: 'tavily',
    description: 'Tavily 搜索引擎集成，支持高质量网页搜索和内容提取',
    author: 'OpenClaw Team',
    stars: 128,
    category: '搜索',
    url: 'https://clawhub.com/skills/tavily-tool',
    tags: ['search', 'web', 'api'],
    featured: true
  },
  {
    id: 'imap-smtp-email',
    name: 'imap-smtp-email',
    description: '邮件收发技能，支持 IMAP/SMTP，可读写邮件和附件',
    author: 'OpenClaw Team',
    stars: 95,
    category: '通讯',
    url: 'https://clawhub.com/skills/imap-smtp-email',
    tags: ['email', 'imap', 'smtp', 'communication'],
    featured: true
  },
  {
    id: 'skill-creator',
    name: 'skill-creator',
    description: '创建、编辑、审计 Agent Skills 的开发工具',
    author: 'OpenClaw Team',
    stars: 156,
    category: '开发',
    url: 'https://clawhub.com/skills/skill-creator',
    tags: ['development', 'skill', 'authoring'],
    featured: true
  },
  {
    id: 'weather',
    name: 'weather',
    description: '天气查询技能，支持 wttr.in 和 Open-Meteo',
    author: 'OpenClaw Team',
    stars: 72,
    category: '生活',
    url: 'https://clawhub.com/skills/weather',
    tags: ['weather', 'forecast', 'utility']
  },
  {
    id: 'healthcheck',
    name: 'healthcheck',
    description: '主机安全加固和健康检查工具',
    author: 'OpenClaw Team',
    stars: 88,
    category: '安全',
    url: 'https://clawhub.com/skills/healthcheck',
    tags: ['security', 'hardening', 'server']
  },
  {
    id: 'xiaohongshu',
    name: 'xiaohongshu',
    description: '小红书内容工具，搜索帖子、获取详情、评论互动',
    author: 'Community',
    stars: 134,
    category: '社交媒体',
    url: 'https://clawhub.com/skills/xiaohongshu',
    tags: ['social', 'xiaohongshu', 'content']
  }
];

export const tools: Tool[] = [
  {
    id: 'openclaw',
    name: 'OpenClaw',
    description: '核心框架 - AI Agent 编排与运行时',
    type: 'cli',
    repo: 'openclaw/openclaw',
    stars: 2500,
    language: 'TypeScript',
    url: 'https://github.com/openclaw/openclaw'
  },
  {
    id: 'clawhub-cli',
    name: 'clawhub-cli',
    description: 'ClawHub 命令行工具 - Skills 发布与管理',
    type: 'cli',
    repo: 'clawhub/clawhub-cli',
    stars: 380,
    language: 'TypeScript',
    url: 'https://github.com/clawhub/clawhub-cli'
  },
  {
    id: 'openclaw-sdk',
    name: 'openclaw-sdk',
    description: 'OpenClaw JavaScript/TypeScript SDK',
    type: 'sdk',
    repo: 'openclaw/openclaw-sdk',
    stars: 520,
    language: 'TypeScript',
    url: 'https://github.com/openclaw/openclaw-sdk'
  },
  {
    id: 'openclaw-python',
    name: 'openclaw-python',
    description: 'OpenClaw Python 客户端库',
    type: 'sdk',
    repo: 'openclaw/openclaw-python',
    stars: 290,
    language: 'Python',
    url: 'https://github.com/openclaw/openclaw-python'
  }
];

export const stats = {
  totalSkills: 48,
  totalPlugins: 12,
  totalDownloads: '15.2K',
  activeContributors: 89,
  githubStars: 2500,
  discordMembers: 3200
};
