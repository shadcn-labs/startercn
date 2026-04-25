export const GITHUB = {
  branch: "main",
  repo: "shadcn-registry-kit",
  user: "mehmetpekcan",
} as const;

const githubUrl = `https://github.com/${GITHUB.user}/${GITHUB.repo}`;

export const LINK = {
  DISCORD: "https://discord.gg/mehmetpekcan",
  GITHUB: githubUrl,
  LICENSE: `${githubUrl}/blob/${GITHUB.branch}/LICENSE`,
  PORTFOLIO: "https://github.com/mehmetpekcan",
  SPONSOR: "https://github.com/sponsors/mehmetpekcan",
  X: "https://x.com/mehmetpekcan",
  X_SHADCN_LABS: "https://x.com/shadcnlabs",
} as const;
