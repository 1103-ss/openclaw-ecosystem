// GitHub API 数据获取脚本
// 用于获取开源项目的真实数据

const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubRepoData {
  stars: number;
  forks: number;
  openIssues: number;
  contributors: number;
  lastCommit: string;
  releases: number;
  prs: number;
  updatedAt: string;
}

// 获取仓库数据
async function getRepoData(owner: string, repo: string): Promise<GitHubRepoData | null> {
  try {
    // 获取基本信息
    const repoResponse = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`);
    if (!repoResponse.ok) throw new Error('Repo not found');
    const repoData = await repoResponse.json();

    // 获取contributors数量（可能需要处理分页）
    let contributorsCount = 0;
    try {
      const contributorsResponse = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?per_page=1`);
      const linkHeader = contributorsResponse.headers.get('link');
      if (linkHeader && linkHeader.includes('rel="last"')) {
        const match = linkHeader.match(/page=(\d+).*rel="last"/);
        contributorsCount = match ? parseInt(match[1]) : 0;
      } else {
        const contributors = await contributorsResponse.json();
        contributorsCount = Array.isArray(contributors) ? contributors.length : 0;
      }
    } catch (e) {
      console.warn('Failed to get contributors count');
    }

    // 获取releases数量
    let releasesCount = 0;
    try {
      const releasesResponse = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/releases?per_page=1`);
      const linkHeader = releasesResponse.headers.get('link');
      if (linkHeader && linkHeader.includes('rel="last"')) {
        const match = linkHeader.match(/page=(\d+).*rel="last"/);
        releasesCount = match ? parseInt(match[1]) : 0;
      }
    } catch (e) {
      console.warn('Failed to get releases count');
    }

    // 获取merged PRs数量
    let prsCount = 0;
    try {
      const prsResponse = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls?state=closed&per_page=1`);
      const linkHeader = prsResponse.headers.get('link');
      if (linkHeader && linkHeader.includes('rel="last"')) {
        const match = linkHeader.match(/page=(\d+).*rel="last"/);
        prsCount = match ? parseInt(match[1]) : 0;
      }
    } catch (e) {
      console.warn('Failed to get PRs count');
    }

    return {
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      openIssues: repoData.open_issues_count || 0,
      contributors: contributorsCount,
      lastCommit: repoData.pushed_at || repoData.updated_at,
      releases: releasesCount,
      prs: prsCount,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to fetch ${owner}/${repo}:`, error);
    return null;
  }
}

// 需要获取的仓库列表
const reposToFetch = [
  { owner: 'openclaw', repo: 'openclaw', id: 'openclaw' },
  { owner: 'langgenius', repo: 'dify', id: 'dify' },
  { owner: 'labring', repo: 'FastGPT', id: 'fastgpt' },
  // 可以添加更多...
];

// 主函数
async function fetchAllGitHubData() {
  const results: Record<string, GitHubRepoData> = {};
  
  for (const { owner, repo, id } of reposToFetch) {
    console.log(`Fetching ${owner}/${repo}...`);
    const data = await getRepoData(owner, repo);
    if (data) {
      results[id] = data;
      console.log(`✓ ${repo}: ${data.stars} stars, ${data.forks} forks`);
    }
    // 避免触发GitHub API限制，添加延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

// 执行
fetchAllGitHubData().then(data => {
  console.log('\n=== GitHub Data Summary ===');
  console.log(JSON.stringify(data, null, 2));
});

export { getRepoData, fetchAllGitHubData };
export type { GitHubRepoData };
