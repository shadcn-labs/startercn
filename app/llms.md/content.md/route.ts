import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { requestOrigin } from "@/lib/agent-discovery/request-origin";

export const revalidate = false;

const homepageMarkdown = (origin: string): string => {
  const base = origin.replace(/\/$/, "");

  return `# ${SITE.NAME}

${SITE.DESCRIPTION.SHORT}

${SITE.DESCRIPTION.LONG}

## Quick links

- [Get started](${base}${ROUTES.DOCS_INSTALLATION})
- [Browse components](${base}${ROUTES.DOCS_COMPONENTS})
- [Documentation](${base}${ROUTES.DOCS})
- [LLM index (llms.txt)](${base}${ROUTES.LLMS})
- [API catalog](${base}${ROUTES.API_CATALOG})
- [OpenAPI description](${base}${ROUTES.OPENAPI})
- [Agent skills index](${base}${ROUTES.AGENT_SKILLS_INDEX})
`;
};

const markdownResponse = (body: string, includeBody: boolean) => {
  const tokens = Math.ceil(body.length / 4);

  return new Response(includeBody ? body : null, {
    headers: {
      "Cache-Control": "public, max-age=60",
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokens),
    },
  });
};

export const GET = (request: Request) => {
  const body = homepageMarkdown(requestOrigin(request));

  return markdownResponse(body, true);
};

export const HEAD = (request: Request) => {
  const body = homepageMarkdown(requestOrigin(request));

  return markdownResponse(body, false);
};
