// 市面上Claw软件产品数据
// 包含QClaw、MaxClaw、KimiClaw等面向用户的Claw软件

export interface ClawSoftware {
  id: string;
  name: string;
  logo: string;
  company: string; // 厂商
  description: string;
  type: 'local' | 'cloud' | 'hybrid'; // 本地/云端/混合
  website: string;
  downloadUrl?: string;
  docsUrl?: string;
  // 核心功能
  features: string[];
  // 支持平台
  platforms: ('windows' | 'mac' | 'linux' | 'ios' | 'android' | 'web')[];
  // 定价
  pricing: {
    model: 'free' | 'freemium' | 'subscription' | 'one-time';
    freeTier: boolean;
    startingPrice?: string; // 起售价
  };
  // 核心数据
  stats: {
    dau: number;           // 日活跃用户
    mau: number;           // 月活跃用户
    totalUsers: number;    // 总用户数
    tokenConsumption: {    // Token 消耗（估算）
      daily: number;
      monthly: number;
      total: number;
    };
    growth: {              // 增长率
      dauGrowth: number;   // DAU 日增长率 %
      mauGrowth: number;   // MAU 月增长率 %
    };
  };
  // 用户评分
  rating: {
    score: number;        // 1-5分
    reviewCount: number;  // 评论数
  };
  // 优势/劣势
  pros: string[];
  cons: string[];
  // 发布时间
  releaseDate: string;
  lastUpdated: string;
  tags: string[];
}

// 市面上主要的Claw软件
export const clawSoftwares: ClawSoftware[] = [
  {
    id: 'qclaw',
    name: 'QClaw',
    logo: '🦞',
    company: '腾讯电脑管家',
    description: '腾讯基于OpenClaw打造的本地AI助手，支持微信直连远程操控电脑，内置5000+技能生态',
    type: 'local',
    website: 'https://claw.guanjia.qq.com',
    downloadUrl: 'https://claw.guanjia.qq.com/download',
    docsUrl: 'https://docs.claw.guanjia.qq.com',
    features: [
      '微信/QQ直连远程操控',
      '智能文件操作',
      '自动开发编程',
      '社媒自动运营',
      '学术文献整理',
      '智能日程提醒',
      '长期记忆功能'
    ],
    platforms: ['windows', 'mac'],
    pricing: {
      model: 'freemium',
      freeTier: true,
      startingPrice: '内测免费'
    },
    stats: {
      dau: 125000,
      mau: 580000,
      totalUsers: 2100000,
      tokenConsumption: {
        daily: 85000000,
        monthly: 2580000000,
        total: 15800000000
      },
      growth: {
        dauGrowth: 15.8,
        mauGrowth: 42.5
      }
    },
    rating: {
      score: 4.6,
      reviewCount: 12580
    },
    pros: [
      '微信直连，零门槛上手',
      '本地部署，数据安全',
      '内置5000+技能',
      '支持国产大模型',
      '腾讯大厂背书'
    ],
    cons: [
      '仅支持Windows/Mac',
      '需要内测资格',
      '功能受限于微信生态'
    ],
    releaseDate: '2026-03-10',
    lastUpdated: '2026-03-18',
    tags: ['大厂出品', '微信直连', '本地部署', '新手友好']
  },
  {
    id: 'maxclaw',
    name: 'MaxClaw',
    logo: '🎭',
    company: 'MiniMax',
    description: 'MiniMax推出的云端AI Agent服务，深度集成飞书/钉钉，面向企业用户',
    type: 'cloud',
    website: 'https://claw.minimax.chat',
    docsUrl: 'https://docs.minimax.chat/claw',
    features: [
      '云端免部署',
      '飞书/钉钉深度集成',
      '企业级权限管理',
      'MiniMax M2.5模型',
      '团队协作功能',
      'API接口开放',
      '数据云端同步'
    ],
    platforms: ['web', 'ios', 'android'],
    pricing: {
      model: 'subscription',
      freeTier: false,
      startingPrice: '¥99/月'
    },
    stats: {
      dau: 89000,
      mau: 420000,
      totalUsers: 1580000,
      tokenConsumption: {
        daily: 62000000,
        monthly: 1860000000,
        total: 9800000000
      },
      growth: {
        dauGrowth: 22.5,
        mauGrowth: 38.2
      }
    },
    rating: {
      score: 4.4,
      reviewCount: 8650
    },
    pros: [
      '云端免部署，开箱即用',
      '企业级功能完善',
      '飞书/钉钉深度集成',
      '团队协作支持好'
    ],
    cons: [
      '需要付费订阅',
      '数据存储在云端',
      '对个人用户门槛较高'
    ],
    releaseDate: '2026-02-15',
    lastUpdated: '2026-03-18',
    tags: ['企业级', '云端', '飞书钉钉', 'MiniMax']
  },
  {
    id: 'kimiclaw',
    name: 'KimiClaw',
    logo: '🌙',
    company: '月之暗面',
    description: 'Kimi推出的云端AI Agent服务，集成在Kimi APP内，极简使用体验',
    type: 'cloud',
    website: 'https://kimi.moonshot.cn/claw',
    docsUrl: 'https://docs.moonshot.cn/claw',
    features: [
      'Kimi APP内直接使用',
      'Kimi K2.5模型原生支持',
      '浏览器自动化',
      '文件自动处理',
      'ClawHub技能市场',
      '极简交互设计',
      '多端同步'
    ],
    platforms: ['web', 'ios', 'android'],
    pricing: {
      model: 'subscription',
      freeTier: true,
      startingPrice: '¥199/月'
    },
    stats: {
      dau: 156000,
      mau: 720000,
      totalUsers: 2800000,
      tokenConsumption: {
        daily: 98000000,
        monthly: 2940000000,
        total: 18500000000
      },
      growth: {
        dauGrowth: 28.5,
        mauGrowth: 45.8
      }
    },
    rating: {
      score: 4.7,
      reviewCount: 21500
    },
    pros: [
      'Kimi用户无缝使用',
      '极简设计，体验流畅',
      'K2.5模型能力强',
      '有免费额度'
    ],
    cons: [
      '高级功能需付费',
      '依赖Kimi生态',
      '企业功能较弱'
    ],
    releaseDate: '2026-01-20',
    lastUpdated: '2026-03-18',
    tags: ['Kimi', '极简', '个人用户', '增长快']
  },
  {
    id: 'jvsclaw',
    name: 'JVS Claw',
    logo: '☁️',
    company: '阿里云',
    description: '阿里云推出的手机版OpenClaw，集成Clawbot与云端独立环境ClawSpace',
    type: 'cloud',
    website: 'https://claw.aliyun.com',
    downloadUrl: 'https://apps.apple.com/cn/app/jvs-claw',
    docsUrl: 'https://help.aliyun.com/claw',
    features: [
      '手机端操作',
      '云端独立环境',
      '自然语言指令',
      '阿里云生态集成',
      '多端协同',
      '企业级安全',
      '按量付费'
    ],
    platforms: ['ios', 'android', 'web'],
    pricing: {
      model: 'freemium',
      freeTier: true,
      startingPrice: '按量付费'
    },
    stats: {
      dau: 68000,
      mau: 320000,
      totalUsers: 980000,
      tokenConsumption: {
        daily: 42000000,
        monthly: 1260000000,
        total: 6500000000
      },
      growth: {
        dauGrowth: 18.2,
        mauGrowth: 32.5
      }
    },
    rating: {
      score: 4.3,
      reviewCount: 5680
    },
    pros: [
      '手机端体验好',
      '阿里云生态支持',
      '云端环境隔离安全',
      '灵活的付费方式'
    ],
    cons: [
      '仅移动端为主',
      '生态相对较新',
      '功能相对简单'
    ],
    releaseDate: '2026-02-28',
    lastUpdated: '2026-03-18',
    tags: ['阿里云', '移动端', '云端', '企业级']
  },
  {
    id: 'openclaw',
    name: 'OpenClaw',
    logo: '🦞',
    company: '开源社区',
    description: '开源AI Agent框架，需要自行部署，适合技术极客和开发者',
    type: 'local',
    website: 'https://openclaw.ai',
    downloadUrl: 'https://github.com/openclaw/openclaw',
    docsUrl: 'https://docs.openclaw.ai',
    features: [
      '完全开源免费',
      '支持全球主流模型',
      '多平台集成',
      '5700+社区插件',
      '高度可定制',
      '本地数据安全',
      '社区驱动开发'
    ],
    platforms: ['windows', 'mac', 'linux'],
    pricing: {
      model: 'free',
      freeTier: true,
      startingPrice: '免费'
    },
    stats: {
      dau: 45000,
      mau: 185000,
      totalUsers: 520000,
      tokenConsumption: {
        daily: 28000000,
        monthly: 840000000,
        total: 4200000000
      },
      growth: {
        dauGrowth: 35.2,
        mauGrowth: 58.6
      }
    },
    rating: {
      score: 4.8,
      reviewCount: 8900
    },
    pros: [
      '完全免费开源',
      '功能最全面',
      '社区生态丰富',
      '支持全球模型',
      '隐私性最强'
    ],
    cons: [
      '技术门槛高',
      '需要自行部署',
      '无官方客服支持'
    ],
    releaseDate: '2025-08-01',
    lastUpdated: '2026-03-18',
    tags: ['开源', '极客', '免费', '功能最全']
  }
];

// 汇总统计数据
export const totalStats = {
  totalDAU: clawSoftwares.reduce((sum, s) => sum + s.stats.dau, 0),
  totalMAU: clawSoftwares.reduce((sum, s) => sum + s.stats.mau, 0),
  totalUsers: clawSoftwares.reduce((sum, s) => sum + s.stats.totalUsers, 0),
  totalTokenDaily: clawSoftwares.reduce((sum, s) => sum + s.stats.tokenConsumption.daily, 0),
  totalTokenMonthly: clawSoftwares.reduce((sum, s) => sum + s.stats.tokenConsumption.monthly, 0),
  avgRating: clawSoftwares.reduce((sum, s) => sum + s.rating.score, 0) / clawSoftwares.length,
  totalReviewCount: clawSoftwares.reduce((sum, s) => sum + s.rating.reviewCount, 0)
};

// 按不同维度排序
export const sortedByDAU = [...clawSoftwares].sort((a, b) => b.stats.dau - a.stats.dau);
export const sortedByMAU = [...clawSoftwares].sort((a, b) => b.stats.mau - a.stats.mau);
export const sortedByRating = [...clawSoftwares].sort((a, b) => b.rating.score - a.rating.score);
export const sortedByGrowth = [...clawSoftwares].sort((a, b) => b.stats.growth.dauGrowth - a.stats.growth.dauGrowth);
export const sortedByToken = [...clawSoftwares].sort((a, b) => b.stats.tokenConsumption.daily - a.stats.tokenConsumption.daily);

// 格式化数字
export function formatNumber(num: number): string {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '亿';
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toLocaleString();
}

// 格式化增长率
export function formatGrowth(growth: number): string {
  const sign = growth >= 0 ? '+' : '';
  return `${sign}${growth.toFixed(1)}%`;
}

// 获取平台图标
export function getPlatformIcon(platform: string): string {
  const icons: Record<string, string> = {
    windows: '🪟',
    mac: '🍎',
    linux: '🐧',
    ios: '📱',
    android: '🤖',
    web: '🌐'
  };
  return icons[platform] || '💻';
}

// 获取类型标签
export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    local: '本地软件',
    cloud: '云端服务',
    hybrid: '混合部署'
  };
  return labels[type] || type;
}
