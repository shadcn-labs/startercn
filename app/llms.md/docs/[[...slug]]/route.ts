import { notFound } from "next/navigation";

import { getLLMText, getPageMarkdownUrl, source } from "@/lib/source";

export const revalidate = false;

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) => {
  const { slug } = await params;
  const page = source.getPage(slug?.slice(0, -1));
  if (!page) {
    notFound();
  }

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};

export const generateStaticParams = () =>
  source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageMarkdownUrl(page).segments,
  }));
