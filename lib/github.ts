export type GithubProject = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  production_url: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  screenshot_url: string;
  fallback_screenshot_url: string;
};

type GithubRepository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
};

type VercelProject = {
  id: string;
  name: string;
  link?: {
    type?: string;
    repo?: string;
  };
  targets?: {
    production?: {
      alias?: string[];
    };
  };
};

function normalizeUrl(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;
  const value = url.trim();
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function githubRepoKey(owner: string, repo: string) {
  return `${owner.toLowerCase()}/${repo.toLowerCase()}`;
}

function chooseProductionDomain(project: VercelProject): string | null {
  const aliases = project.targets?.production?.alias || [];
  const clean = aliases
    .map((value) => value.trim())
    .filter(Boolean)
    .filter((value) => !value.includes("-git-"))
    .sort((a, b) => a.length - b.length || a.localeCompare(b));

  return clean[0] ? `https://${clean[0]}` : null;
}

async function getVercelProductionDomains(owner: string, repositories: GithubRepository[]) {
  const token = process.env.VERCEL_TOKEN?.trim();
  if (!token) return new Map<string, string>();

  const teamId = process.env.VERCEL_TEAM_ID?.trim();
  const query = teamId ? `&teamId=${encodeURIComponent(teamId)}` : "";
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  try {
    const response = await fetch(
      `https://api.vercel.com/v9/projects?limit=100${query}`,
      { headers, next: { revalidate: 60, tags: ["vercel-projects"] } }
    );

    if (!response.ok) return new Map<string, string>();

    const data = (await response.json()) as { projects?: VercelProject[] };
    const repoKeys = new Set(
      repositories.map((repo) => githubRepoKey(owner, repo.name))
    );
    const result = new Map<string, string>();

    for (const project of data.projects || []) {
      const linkedRepo = project.link?.type === "github" ? project.link.repo : null;
      const linkedKey = linkedRepo ? githubRepoKey(owner, linkedRepo.split("/").pop() || "") : null;

      if (linkedRepo && repoKeys.has(linkedRepo.toLowerCase())) {
        const domain = chooseProductionDomain(project);
        if (domain) result.set(linkedRepo.toLowerCase(), domain);
        continue;
      }

      const nameKey = githubRepoKey(owner, project.name);
      if (repoKeys.has(nameKey)) {
        const domain = chooseProductionDomain(project);
        if (domain) result.set(nameKey, domain);
      }
    }

    return result;
  } catch {
    return new Map<string, string>();
  }
}

export async function getFeaturedGithubProjects(): Promise<GithubProject[]> {
  const username = process.env.GITHUB_USERNAME?.trim() || "dagimdesalegn";

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 60, tags: ["github-projects"] },
      }
    );

    if (!response.ok) return [];

    const repositories = (await response.json()) as GithubRepository[];

    const featured = repositories
      .filter(
        (repo) =>
          !repo.fork &&
          repo.topics?.some(
            (topic) => topic.trim().toLowerCase() === "portfolio-featured"
          )
      )
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    const vercelDomains = await getVercelProductionDomains(username, featured);

    return featured.map((repo) => {
      const githubKey = githubRepoKey(username, repo.name);
      const productionUrl =
        vercelDomains.get(githubKey) || normalizeUrl(repo.homepage);

      const screenshotUrl = productionUrl
        ? `https://image.thum.io/get/width/1200/crop/900/noanimate/${productionUrl}`
        : `https://opengraph.githubassets.com/1/${username}/${repo.name}`;

      return {
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: productionUrl,
        production_url: productionUrl,
        topics: repo.topics || [],
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        updated_at: repo.updated_at,
        screenshot_url: screenshotUrl,
        fallback_screenshot_url: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
      };
    });
  } catch {
    return [];
  }
}
