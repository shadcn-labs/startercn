"use client";

import { CopyIcon, ExternalLinkIcon } from "lucide-react";
import * as React from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useFeedback } from "@/hooks/use-feedback";
import { siteConfig } from "@/lib/config";

interface MenuAction {
  href?: string;
  key: string;
  label: string;
  onSelect?: () => void | Promise<void>;
  shortcut?: string;
}

export function BrandContextMenu({
  children,
  copyValue,
  items = [],
  label = siteConfig.name,
}: {
  children: React.ReactNode;
  copyValue?: string;
  items?: MenuAction[];
  label?: string;
}) {
  const playClick = useFeedback({ sound: "click" });
  const { copyToClipboard } = useCopyToClipboard();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>{label}</ContextMenuLabel>
        {copyValue ? (
          <>
            <ContextMenuItem
              onSelect={async () => {
                playClick();
                await copyToClipboard(copyValue);
              }}
            >
              <CopyIcon />
              Copy value
              <ContextMenuShortcut>copy</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
          </>
        ) : null}
        {items.map((item) => (
          <ContextMenuItem
            key={item.key}
            asChild={Boolean(item.href)}
            onSelect={item.href ? undefined : item.onSelect}
            onClick={item.href ? playClick : undefined}
          >
            {item.href ? (
              <a href={item.href} rel="noreferrer" target="_blank">
                <ExternalLinkIcon />
                {item.label}
                {item.shortcut ? (
                  <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
                ) : null}
              </a>
            ) : (
              <>
                <ExternalLinkIcon />
                {item.label}
                {item.shortcut ? (
                  <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
                ) : null}
              </>
            )}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
