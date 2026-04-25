"use client";

export type ViewTransitionType =
  | "default"
  | "nav-forward"
  | "nav-back"
  | "command";

export function runViewTransition(
  update: () => void,
  type: ViewTransitionType = "default"
) {
  if (typeof document === "undefined") {
    update();
    return;
  }

  const root = document.documentElement;
  const previousType = root.dataset.transitionType;
  root.dataset.transitionType = type;
  const enhancedDocument = document as Document & {
    startViewTransition?: (updateCallback: () => void | Promise<void>) => {
      finished: Promise<void>;
    };
  };

  const cleanup = () => {
    if (previousType) {
      root.dataset.transitionType = previousType;
      return;
    }

    delete root.dataset.transitionType;
  };

  if (!enhancedDocument.startViewTransition) {
    update();
    cleanup();
    return;
  }

  const transition = enhancedDocument.startViewTransition(update);
  void transition.finished.finally(cleanup);
}
