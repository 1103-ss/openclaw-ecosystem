#!/usr/bin/env node
/**
 * 构建前数据获取脚本
 * 获取GitHub真实数据并更新到数据文件
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_API_BASE = 'https://api.github.com';

// 需要获取的仓库列表
const repos = [
  { owner: 'openclaw', repo: 'openclaw', id: 'openclaw' },
  { owner: 'langgenius', repo: 'dify', id: 'dify' },
  { owner: 'labring', repo: 'FastGPT', id: 'fastgpt' },
];

async function fetchRepoData(owner, repo) {
  try {
    console.log(`Fetching ${owner}/${repo}...`);
    
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'ClawStats-Bot'
      }
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch ${owner}/${repo}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    // 延迟避免API限制
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      openIssues: data.open_issues_count || 0,
      lastCommit: data.pushed_at,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error fetching ${owner}/${repo}:`, error.message);
    return null;
  }
}

async function updateDataFile() {
  const githubData = {};
  
  for (const { owner, repo, id } of repos) {
    const data = await fetchRepoData(owner, repo);
    if (data) {
      githubData[id] = data;
      console.log(`✓ ${repo}: ${data.stars.toLocaleString()} stars, ${data.forks.toLocaleString()} forks`);
    }
  }
  
  // 保存到JSON文件
  const dataDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const outputPath = path.join(dataDir, 'github-stats.json');
  fs.writeFileSync(outputPath, JSON.stringify(githubData, null, 2));
  
  console.log('\n✓ GitHub data saved to src/data/github-stats.json');
  console.log(`✓ Updated at: ${new Date().toISOString()}`);
}

updateDataFile().catch(console.error);
