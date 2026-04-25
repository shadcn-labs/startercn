"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function CodeCollapsibleWrapper({
  className,
  children,
  navTriggerClassName,
  ...props
}: React.ComponentProps<"div"> & {
  navTriggerClassName?: string;
}) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      data-state={isOpened ? "open" : "closed"}
      className={cn("group/collapsible relative md:-mx-1", className)}
      {...props}
    >
      <div
        className={cn(
          "absolute top-1.5 right-9 z-10 flex items-center",
          navTriggerClassName
        )}
      >
        <button
          className="contents"
          onClick={() => setIsOpened((open) => !open)}
          type="button"
        >
          <Button
            className="text-muted-foreground h-7 rounded-md px-2"
            size="sm"
            variant="ghost"
          >
            {isOpened ? "Collapse" : "Expand"}
          </Button>
          <Separator className="mx-1.5 h-4!" orientation="vertical" />
        </button>
      </div>
      <div
        className="relative mt-6 overflow-hidden data-[state=closed]:max-h-64 data-[state=closed]:[content-visibility:auto] [&>figure]:mt-0 [&>figure]:md:mx-0!"
        data-state={isOpened ? "open" : "closed"}
      >
        {children}
      </div>
      <div className="from-code/70 to-code absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-linear-to-b group-data-[state=open]/collapsible:hidden">
        <Button
          onClick={() => setIsOpened(true)}
          size="sm"
          type="button"
          variant="outline"
        >
          Expand
        </Button>
      </div>
    </div>
  );
}
