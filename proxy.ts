import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROUTES } from "@/constants/routes";
import { docsContentRoute, homeContentRoute } from "@/lib/docs";

const { rewrite: rewriteDocs } = rewritePath(
  `${ROUTES.DOCS}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${ROUTES.DOCS}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`
);

const AGENT_AUDIT_USER_AGENT =
  /afdocs|isitagentready|is-it-agent-ready|agent[- ]?ready/i;

const isAgentAuditRequest = (request: NextRequest) =>
  AGENT_AUDIT_USER_AGENT.test(request.headers.get("user-agent") ?? "");

const rewriteToDocsMarkdown = (request: NextRequest) => {
  const result = rewriteDocs(request.nextUrl.pathname);

  if (!result) {
    return null;
  }

  return NextResponse.rewrite(new URL(result, request.nextUrl));
};

const proxy = (request: NextRequest) => {
  if (
    request.nextUrl.pathname === "/" &&
    (request.method === "GET" || request.method === "HEAD") &&
    isMarkdownPreferred(request)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = homeContentRoute;

    return NextResponse.rewrite(url);
  }

  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (
    (request.nextUrl.pathname === ROUTES.DOCS ||
      request.nextUrl.pathname.startsWith(`${ROUTES.DOCS}/`)) &&
    isAgentAuditRequest(request)
  ) {
    return rewriteToDocsMarkdown(request) ?? NextResponse.next();
  }

  if (isMarkdownPreferred(request)) {
    return rewriteToDocsMarkdown(request) ?? NextResponse.next();
  }

  return NextResponse.next();
};

export default proxy;
