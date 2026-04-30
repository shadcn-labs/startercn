"use client";

import { Volume2Icon, VibrateIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Kbd } from "@/components/ui/kbd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { useHapticsEnabled } from "@/hooks/use-haptic-toggle";
import { useIsMac } from "@/hooks/use-is-mac";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSoundEnabled } from "@/hooks/use-sound-toggle";

export const SiteSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const isMac = useIsMac();
  const [soundEnabled, setSoundEnabled] = useSoundEnabled();
  const [hapticsEnabled, setHapticsEnabled] = useHapticsEnabled();

  useHotkeys(
    "meta+s, ctrl+s",
    () => {
      setSoundEnabled((prev) => !prev);
    },
    { preventDefault: true }
  );

  useHotkeys(
    "meta+h, ctrl+h",
    () => {
      setHapticsEnabled((prev) => !prev);
    },
    { preventDefault: true }
  );

  const trigger = (
    <Button
      variant="ghost"
      size="icon"
      className="group/settings extend-touch-target size-8"
      aria-label="Settings"
    >
      <SettingsIcon />
    </Button>
  );

  const content = (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2 pl-1">
        <div className="flex items-center gap-2">
          <span className="text-sm">Toggle Sound</span>
          {!isMobile && <Kbd>{isMac ? "⌘" : "Ctrl"}+S</Kbd>}
        </div>
        <Toggle
          pressed={soundEnabled}
          onPressedChange={setSoundEnabled}
          aria-label="Toggle sound"
          variant="ghost"
          size="icon-sm"
        >
          <Volume2Icon />
        </Toggle>
      </div>
      <div className="flex items-center justify-between gap-2 pl-1">
        <div className="flex items-center gap-2">
          <span className="text-sm">Toggle Haptics</span>
          {!isMobile && <Kbd>{isMac ? "⌘" : "Ctrl"}+H</Kbd>}
        </div>
        <Toggle
          pressed={hapticsEnabled}
          onPressedChange={setHapticsEnabled}
          aria-label="Toggle haptics"
          variant="ghost"
          size="icon-sm"
        >
          <VibrateIcon />
        </Toggle>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen} sounds>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>Manage site preferences</DrawerDescription>
            </DrawerHeader>
            <div className="px-4">{content}</div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button size="sm">Done</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen} sounds>
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
          <PopoverContent className="p-1 w-fit">{content}</PopoverContent>
        </Popover>
      )}
    </>
  );
};
