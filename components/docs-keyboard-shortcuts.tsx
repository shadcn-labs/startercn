"use client";

import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

import { useFeedback } from "@/hooks/use-feedback";
import { runViewTransition } from "@/lib/view-transitions";

export const DocsKeyboardShortcuts = ({
  previous,
  next,
}: {
  previous: string | null;
  next: string | null;
}) => {
  const router = useRouter();
  const playClick = useFeedback({ sound: "click" });

  useHotkeys(
    "left",
    (event) => {
      if (!previous || event.defaultPrevented) {
        return;
      }

      playClick();
      runViewTransition(() => router.push(previous), "nav-back");
    },
    {
      enableOnContentEditable: false,
      enableOnFormTags: false,
      preventDefault: true,
    },
    [previous, playClick, router]
  );

  useHotkeys(
    "right",
    (event) => {
      if (!next || event.defaultPrevented) {
        return;
      }

      playClick();
      runViewTransition(() => router.push(next), "nav-forward");
    },
    {
      enableOnContentEditable: false,
      enableOnFormTags: false,
      preventDefault: true,
    },
    [next, playClick, router]
  );

  return null;
};
