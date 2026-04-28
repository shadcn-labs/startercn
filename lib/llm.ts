/* eslint-disable no-inline-comments -- turbopackIgnore must annotate dynamic imports inline. */
import type { Node as PageTreeNode } from "fumadocs-core/page-tree";

import { ROUTES } from "@/constants/routes";
import { isComponentsFolder } from "@/lib/docs";
import { getAllPagesFromFolder, getPagesFromFolder } from "@/lib/page-tree";

import type { PageTreeFolder } from "./page-tree";

interface DocsPageTree {
  children: PageTreeNode[];
}

const removeFrontmatter = (content: string) =>
  content.replace(/^---\n[\s\S]*?\n---\n?/, "");

const protectCodeFences = (content: string) => {
  const fences: string[] = [];
  const protectedContent = content.replaceAll(/```[\s\S]*?```/g, (match) => {
    const index = fences.push(match) - 1;
    return `%%STARTERCN_CODE_FENCE_${index}%%`;
  });

  return {
    content: protectedContent,
    restore: (value: string) =>
      value.replaceAll(
        /%%STARTERCN_CODE_FENCE_(\d+)%%/g,
        (_, index) => fences[Number(index)] ?? ""
      ),
  };
};

const componentListMarkdown = (
  pageTree: DocsPageTree,
  folderName = "Components"
) => {
  const folder = pageTree.children.find(
    (node): node is PageTreeFolder =>
      node.type === "folder" && node.name === folderName
  );

  if (!folder) {
    return "";
  }

  const pages = (
    isComponentsFolder(folder)
      ? getAllPagesFromFolder(folder)
      : getPagesFromFolder(folder)
  ).filter((page) => page.url !== ROUTES.DOCS_COMPONENTS);

  return pages.map((page) => `- [${page.name}](${page.url})`).join("\n");
};

const componentSourceMarkdown = async (
  name: string,
  src?: string,
  title?: string
) => {
  const guessedPaths = src
    ? [src]
    : [
        `registry/new-york/${name}.tsx`,
        `components/${name}.tsx`,
        `components/ui/${name}.tsx`,
      ];

  for (const guessedPath of guessedPaths) {
    try {
      const [{ readFile }, path] = await Promise.all([
        import(/* turbopackIgnore: true */ "node:fs/promises"),
        import(/* turbopackIgnore: true */ "node:path"),
      ]);
      const code = await readFile(
        path.join(process.cwd(), guessedPath),
        "utf-8"
      );
      if (code) {
        const lang =
          title?.split(".").pop() ?? guessedPath.split(".").pop() ?? "tsx";
        return `\`\`\`${lang}\n${code.trim()}\n\`\`\``;
      }
    } catch {
      // Try the next source path.
    }
  }

  return "";
};

export const processMdxForLLMs = async (
  raw: string,
  pageTree: DocsPageTree
) => {
  const protectedFences = protectCodeFences(removeFrontmatter(raw));
  let content = protectedFences.content
    .replaceAll(/^import\s.+$/gm, "")
    .replaceAll(
      /<ComponentsList(?:\s+folderName="([^"]+)")?\s*\/>/g,
      (_, folderName) => componentListMarkdown(pageTree, folderName)
    );

  const previews = [
    ...content.matchAll(
      /<ComponentPreview([^>]*)>[\s\S]*?<\/ComponentPreview>/g
    ),
  ];
  for (const preview of previews) {
    const attrs = preview[1] ?? "";
    const name = attrs.match(/\sname="([^"]+)"/)?.[1] ?? "";
    const src = attrs.match(/\ssrc="([^"]+)"/)?.[1];
    const title = attrs.match(/\stitle="([^"]+)"/)?.[1];
    const sourceMarkdown =
      name || src ? await componentSourceMarkdown(name, src, title) : "";

    content = content.replace(preview[0], sourceMarkdown);
  }

  const cleaned = content
    .replaceAll(/^<\/?[A-Z][^>]*>\s*$/gm, "")
    .replaceAll(/\n{3,}/g, "\n\n")
    .trim();

  return protectedFences.restore(cleaned).trim();
};
