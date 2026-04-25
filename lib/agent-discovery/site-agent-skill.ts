import { createHash } from "node:crypto";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

export const SITE_AGENT_SKILL_MD = `# ${SITE.NAME} — shadcn registry starter

## Summary

Help users discover, inspect, and install components from this public shadcn registry starter and its documentation site.

## Registry

- Registry JSON: \`/r/registry.json\`
- Docs: ${ROUTES.DOCS}

## Install

\`\`\`bash
npx shadcn@latest add ${SITE.URL}/r/your-component.json
\`\`\`

Prefer following the on-site installation guide: ${ROUTES.DOCS_INSTALLATION}
`;

export const siteAgentSkillDigest = (): string => {
  const hex = createHash("sha256")
    .update(SITE_AGENT_SKILL_MD, "utf-8")
    .digest("hex");

  return `sha256:${hex}`;
};
