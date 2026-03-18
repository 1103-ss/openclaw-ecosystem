// 国产 Claw 平台数据
// 后续可接入真实 API 自动更新

export interface ClawPlatform {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: 'framework' | 'platform' | 'tool';
  website: string;
  github?: string;
  // 核心数据
  stats: {
    dau: number;           // 日活跃用户
    mau: number;           // 月活跃用户
    totalUsers: number;    // 总用户数
    tokenConsumption: {    // Token 消耗
      daily: number;       // 日消耗
      monthly: number;     // 月消耗
      total: number;       // 总消耗
    };
    growth: {              // 增长率
      dauGrowth: number;   // DAU 日增长率 %
      mauGrowth: number;   // MAU 月增长率 %
    };
  };
  // 趋势数据（最近30天）
  trend: {
    dates: string[];
    dau: number[];
    tokenDaily: number[];
  };
  lastUpdated: string;
}

// 示例数据
export const clawPlatforms: ClawPlatform[] = [
  {
    id: 'openclaw',
    name: 'OpenClaw',
    logo: '🦾',
    description: '开源 AI Agent 编排框架，支持多模型和多渠道',
    category: 'framework',
    website: 'https://openclaw.ai',
    github: 'https://github.com/openclaw/openclaw',
    stats: {
      dau: 12580,
      mau: 45600,
      totalUsers: 128500,
      tokenConsumption: {
        daily: 2800000,
        monthly: 85000000,
        total: 520000000
      },
      growth: {
        dauGrowth: 12.5,
        mauGrowth: 28.3
      }
    },
    trend: {
      dates: Array.from({length: 30}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return d.toISOString().split('T')[0];
      }),
      dau: [9800, 10200, 10500, 10800, 11000, 11200, 11500, 11800, 12000, 12200, 
            12100, 12300, 12500, 12400, 12600, 12800, 12700, 12900, 13000, 12800,
            12600, 12500, 12400, 12500, 12580, 12600, 12700, 12800, 12700, 12580],
      tokenDaily: [2200000, 2300000, 2400000, 2500000, 2600000, 2550000, 2650000, 
                   2700000, 2750000, 2800000, 2780000, 2820000, 2850000, 2800000,
                   2820000, 2850000, 2830000, 2880000, 2900000, 2850000, 2820000,
                   2800000, 2780000, 2800000, 2800000, 2820000, 2850000, 2880000, 2850000, 2800000]
    },
    lastUpdated: '2026-03-18'
  },
  {
    id: 'dify',
    name: 'Dify',
    logo: '🤖',
    description: 'LLM 应用开发平台，可视化构建 AI 工作流',
    category: 'platform',
    website: 'https://dify.ai',
    github: 'https://github.com/langgenius/dify',
    stats: {
      dau: 28900,
      mau: 124000,
      totalUsers: 356000,
      tokenConsumption: {
        daily: 8500000,
        monthly: 245000000,
        total: 1680000000
      },
      growth: {
        dauGrowth: 18.2,
        mauGrowth: 35.7
      }
    },
    trend: {
      dates: Array.from({length: 30}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return d.toISOString().split('T')[0];
      }),
      dau: [22000, 22800, 23500, 24200, 24800, 25500, 26000, 26500, 27000, 27500,
            27800, 28200, 28500, 28800, 28900, 29000, 29200, 29500, 29800, 29600,
            29400, 29200, 29000, 28900, 28800, 28900, 29000, 29100, 29000, 28900],
      tokenDaily: [6500000, 6800000, 7000000, 7200000, 7500000, 7700000, 7900000,
                   8000000, 8200000, 8400000, 8500000, 8550000, 8600000, 8500000,
                   8520000, 8550000, 8500000, 8600000, 8650000, 8550000, 8500000,
                   8450000, 8400000, 8450000, 8500000, 8550000, 8600000, 8650000, 8580000, 8500000]
    },
    lastUpdated: '2026-03-18'
  },
  {
    id: 'fastgpt',
    name: 'FastGPT',
    logo: '⚡',
    description: '基于 LLM 的知识库问答系统，快速搭建 AI 客服',
    category: 'platform',
    website: 'https://fastgpt.in',
    github: 'https://github.com/labring/FastGPT',
    stats: {
      dau: 18600,
      mau: 78000,
      totalUsers: 215000,
      tokenConsumption: {
        daily: 5200000,
        monthly: 158000000,
        total: 980000000
      },
      growth: {
        dauGrowth: 15.8,
        mauGrowth: 31.2
      }
    },
    trend: {
      dates: Array.from({length: 30}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return d.toISOString().split('T')[0];
      }),
      dau: [15000, 15400, 15800, 16200, 16600, 17000, 17300, 17600, 17900, 18200,
            18400, 18500, 18600, 18700, 18800, 18600, 18500, 18600, 18700, 18600,
            18500, 18400, 18600, 18500, 18600, 18500, 18600, 18700, 18600, 18600],
      tokenDaily: [4200000, 4300000, 4400000, 4500000, 4600000, 4700000, 4800000,
                   4900000, 5000000, 5100000, 5150000, 5200000, 5250000, 5200000,
                   5220000, 5250000, 5200000, 5280000, 5300000, 5250000, 5200000,
                   5150000, 5200000, 5180000, 5200000, 5220000, 5250000, 5280000, 5240000, 5200000]
    },
    lastUpdated: '2026-03-18'
  },
  {
    id: 'coze',
    name: 'Coze (扣子)',
    logo: '🔷',
    description: '字节跳动推出的 AI Bot 开发平台',
    category: 'platform',
    website: 'https://www.coze.cn',
    github: '',
    stats: {
      dau: 45600,
      mau: 189000,
      totalUsers: 520000,
      tokenConsumption: {
        daily: 12000000,
        monthly: 368000000,
        total: 2150000000
      },
      growth: {
        dauGrowth: 22.5,
        mauGrowth: 42.8
      }
    },
    trend: {
      dates: Array.from({length: 30}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return d.toISOString().split('T')[0];
      }),
      dau: [35000, 36500, 38000, 39500, 41000, 42500, 43500, 44500, 45200, 45800,
            46000, 46200, 45800, 45600, 45500, 45600, 45800, 46000, 46200, 46000,
            45800, 45600, 45500, 45600, 45600, 45800, 46000, 46200, 45900, 45600],
      tokenDaily: [9000000, 9500000, 10000000, 10500000, 11000000, 11500000, 11800000,
                   11900000, 12000000, 12100000, 12200000, 12100000, 12000000, 11900000,
                   12000000, 12100000, 12000000, 12200000, 12300000, 12100000, 12000000,
                   11900000, 12000000, 11950000, 12000000, 12100000, 12200000, 12300000, 12100000, 12000000]
    },
    lastUpdated: '2026-03-18'
  },
  {
    id: 'wenxin',
    name: '文心智能体',
    logo: '🌐',
    description: '百度文心大模型智能体平台',
    category: 'platform',
    website: 'https://agents.baidu.com',
    github: '',
    stats: {
      dau: 32100,
      mau: 156000,
      totalUsers: 420000,
      tokenConsumption: {
        daily: 9500000,
        monthly: 285000000,
        total: 1850000000
      },
      growth: {
        dauGrowth: 14.2,
        mauGrowth: 26.5
      }
    },
    trend: {
      dates: Array.from({length: 30}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return d.toISOString().split('T')[0];
      }),
      dau: [26000, 26800, 27500, 28200, 29000, 29800, 30500, 31200, 31800, 32200,
            32500, 32800, 32500, 32200, 32100, 32200, 32400, 32600, 32800, 32500,
            32200, 32000, 32100, 32000, 32100, 32200, 32400, 32600, 32300, 32100],
      tokenDaily: [7500000, 7800000, 8000000, 8200000, 8500000, 8800000, 9000000,
                   9200000, 9400000, 9500000, 9600000, 9700000, 9600000, 9500000,
                   9520000, 9550000, 9500000, 9600000, 9650000, 9580000, 9500000,
                   9450000, 9480000, 9450000, 9500000, 9550000, 9600000, 9650000, 9580000, 9500000]
    },
    lastUpdated: '2026-03-18'
  },
  {
    id: 'langchain-chinese',
    name: 'LangChain 中文网',
    logo: '🔗',
    description: 'LangChain 中文文档和社区',
    category: 'framework',
    website: 'https://www.langchain.com.cn',
    github: 'https://github.com/langchain-ai/langchain',
    stats: {
      dau: 8900,
      mau: 32000,
      totalUsers: 85000,
      tokenConsumption: {
        daily: 1200000,
        monthly: 36000000,
        total: 185000000
      },
      growth: {
        dauGrowth: 8.5,
        mauGrowth: 18.3
      }
    },
    trend: {
      dates: Array.from({length: 30}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return d.toISOString().split('T')[0];
      }),
      dau: [7500, 7700, 7900, 8100, 8300, 8500, 8650, 8800, 8900, 9000,
            8950, 9100, 9200, 9100, 8900, 8950, 9000, 9100, 9200, 9100,
            9000, 8950, 8900, 8950, 8900, 8950, 9000, 9100, 9000, 8900],
      tokenDaily: [1000000, 1050000, 1100000, 1120000, 1150000, 1180000, 1190000,
                   1200000, 1220000, 1230000, 1220000, 1240000, 1250000, 1240000,
                   1200000, 1210000, 1220000, 1240000, 1250000, 1230000, 1210000,
                   1200000, 1190000, 1200000, 1200000, 1210000, 1220000, 1240000, 1220000, 1200000]
    },
    lastUpdated: '2026-03-18'
  }
];

// 汇总统计数据
export const totalStats = {
  totalDAU: clawPlatforms.reduce((sum, p) => sum + p.stats.dau, 0),
  totalMAU: clawPlatforms.reduce((sum, p) => sum + p.stats.mau, 0),
  totalUsers: clawPlatforms.reduce((sum, p) => sum + p.stats.totalUsers, 0),
  totalTokenDaily: clawPlatforms.reduce((sum, p) => sum + p.stats.tokenConsumption.daily, 0),
  totalTokenMonthly: clawPlatforms.reduce((sum, p) => sum + p.stats.tokenConsumption.monthly, 0),
  avgGrowthDAU: clawPlatforms.reduce((sum, p) => sum + p.stats.growth.dauGrowth, 0) / clawPlatforms.length,
  avgGrowthMAU: clawPlatforms.reduce((sum, p) => sum + p.stats.growth.mauGrowth, 0) / clawPlatforms.length
};

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

// 获取增长率颜色
export function getGrowthColor(growth: number): string {
  if (growth >= 20) return '#22c55e'; // 绿色
  if (growth >= 10) return '#84cc16'; // 浅绿
  if (growth >= 0) return '#eab308';  // 黄色
  return '#ef4444'; // 红色
}
