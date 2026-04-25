"use client";

import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { CodeBlockCommand } from "@/components/code-block-command";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function RegistryAddButton({
  children,
  className,
  registry,
  size = "sm",
  variant = "ghost",
  onClick,
  ...props
}: {
  registry: { name: string } | string;
} & Omit<React.ComponentProps<typeof Button>, "children"> & {
    children?: React.ReactNode;
  }) {
  const [isOpen, setIsOpen] = useState(false);

  const registryName = typeof registry === "string" ? registry : registry.name;

  const commands = useMemo(
    () => ({
      bun: `bunx --bun shadcn@latest add ${registryName}`,
      npm: `npx shadcn@latest add ${registryName}`,
      pnpm: `pnpm dlx shadcn@latest add ${registryName}`,
      yarn: `yarn shadcn@latest add ${registryName}`,
    }),
    [registryName]
  );

  const trigger = (
    <Button
      className={cn(className)}
      onClick={onClick}
      size={size}
      variant={variant}
      {...props}
    >
      {children ?? (
        <>
          <PlusIcon />
          <span className="hidden sm:inline">Add</span>
        </>
      )}
    </Button>
  );

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Registry</DialogTitle>
          <DialogDescription className="text-balance">
            Run this command to add {registryName} to your project.
          </DialogDescription>
        </DialogHeader>
        <CodeBlockCommand
          __bun__={commands.bun}
          __npm__={commands.npm}
          __pnpm__={commands.pnpm}
          __yarn__={commands.yarn}
          copyEvent="copy_npm_command"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
