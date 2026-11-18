import fallback from "@/data/site-content.json";

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  location?: string;
  technologies?: string[];
  visible?: boolean;
  order?: number;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  description?: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  visible?: boolean;
  order?: number;
};

export type SiteContent = {
  about: { eyebrow: string; title: string; body: string };
  experience: Experience[];
  certificates: Certificate[];
};

export async function getSiteContent(): Promise<SiteContent> {
  const repo = process.env.GITHUB_REPO || "dagimdesalegn/Portfolio";
  const branch = process.env.GITHUB_BRANCH || "main";
  const url = `https://raw.githubusercontent.com/${repo}/${branch}/data/site-content.json`;
  try {
    const response = await fetch(url, { next: { revalidate: 60, tags: ["site-content"] } });
    if (!response.ok) return fallback as SiteContent;
    const content = (await response.json()) as SiteContent;
    return {
      ...content,
      experience: (content.experience || []).filter(item => item.visible !== false).sort((a,b) => (a.order ?? 0) - (b.order ?? 0)),
      certificates: (content.certificates || []).filter(item => item.visible !== false).sort((a,b) => (a.order ?? 0) - (b.order ?? 0)),
    };
  } catch {
    return fallback as SiteContent;
  }
}
