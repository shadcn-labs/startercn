import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WebMcpTools } from "@/components/web-mcp-tools";
import { ROUTES } from "@/constants/routes";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background relative flex min-h-svh flex-col">
      <blockquote className="sr-only">
        For the complete documentation index, see{" "}
        <a href={ROUTES.LLMS}>llms.txt</a>. Markdown variants are available by
        appending <code>.md</code> to any URL or sending an{" "}
        <code>Accept: text/markdown</code> header. An agent skill is available
        at{" "}
        <a href={ROUTES.AGENT_SKILLS_SITE_SKILL}>
          {ROUTES.AGENT_SKILLS_SITE_SKILL}
        </a>
        .
      </blockquote>
      <WebMcpTools />
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
