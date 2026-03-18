export const prerender = false;

const GITHUB_API_BASE = 'https://api.github.com';

export async function GET() {
  try {
    // 获取OpenClaw数据
    const openclawData = await fetchRepoData('openclaw', 'openclaw');
    const difyData = await fetchRepoData('langgenius', 'dify');
    const fastgptData = await fetchRepoData('labring', 'FastGPT');

    const data = {
      openclaw: openclawData,
      dify: difyData,
      fastgpt: fastgptData,
      updatedAt: new Date().toISOString()
    };

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // 缓存1小时
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function fetchRepoData(owner: string, repo: string) {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'ClawStats-Bot'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      openIssues: data.open_issues_count || 0,
      lastCommit: data.pushed_at,
      updatedAt: data.updated_at,
      url: data.html_url
    };
  } catch (error) {
    console.error(`Failed to fetch ${owner}/${repo}:`, error);
    return null;
  }
}
