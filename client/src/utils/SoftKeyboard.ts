import { useEffect, useState } from "react";

/**
 * The strip of the screen the page can actually use.
 *
 * On a phone the soft keyboard slides in over the bottom of the window without the window
 * itself getting any smaller - `100vh`, `window.innerHeight` and a `position: fixed` element
 * all keep their full size and half of them ends up hidden behind the keyboard.
 * Only the visual viewport knows what is left, so it is what a full screen layout measures
 * itself against.
 */
export type VisibleViewport = {
  /** Height left above the keyboard, in css pixels. */
  height: number;
  /**
   * How far the visible strip sits below the top of the window. Non zero on iOS, where opening
   * the keyboard scrolls the page instead of resizing it - a fixed element has to shift down by
   * this much to stay where the user sees it.
   */
  offsetTop: number;
};

/** Tracks {@link VisibleViewport}, re-rendering whenever the keyboard opens, closes or the page is panned. */
export function useVisibleViewport(): VisibleViewport {
  const [visibleViewport, setVisibleViewport] = useState<VisibleViewport>(currentVisibleViewport);

  useEffect(() => {
    const visualViewport = window.visualViewport;
    if (visualViewport == null) {
      return;
    }

    const update = () => setVisibleViewport(currentVisibleViewport());
    // The keyboard changes the height (resize) on android and the offset (scroll) on ios.
    visualViewport.addEventListener("resize", update);
    visualViewport.addEventListener("scroll", update);
    update();

    return () => {
      visualViewport.removeEventListener("resize", update);
      visualViewport.removeEventListener("scroll", update);
    };
  }, []);

  return visibleViewport;
}

function currentVisibleViewport(): VisibleViewport {
  const visualViewport = window.visualViewport;
  if (visualViewport == null) {
    return { height: window.innerHeight, offsetTop: 0 };
  }
  return { height: visualViewport.height, offsetTop: visualViewport.offsetTop };
}

/** How long to wait for the keyboard to finish its slide in animation when the viewport says nothing. */
const KEYBOARD_ANIMATION_TIMEOUT_MS = 500;
/** How long after the last viewport change the keyboard is considered settled. */
const VIEWPORT_SETTLED_MS = 100;

/**
 * Scrolls a focused input back into the visible strip once the soft keyboard has finished
 * sliding in.
 *
 * Scrolling right away would aim at a layout that is about to change - the keyboard animates
 * for a few hundred ms and the viewport keeps shrinking along the way - so the scroll waits for
 * the viewport to go quiet, and on browsers without a visual viewport simply for the timeout.
 */
export function scrollIntoViewOnceKeyboardOpens(element: HTMLElement): void {
  const visualViewport = window.visualViewport;

  let timeout = window.setTimeout(scrollIntoView, KEYBOARD_ANIMATION_TIMEOUT_MS);

  function scrollIntoView() {
    visualViewport?.removeEventListener("resize", onViewportChanged);
    element.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function onViewportChanged() {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(scrollIntoView, VIEWPORT_SETTLED_MS);
  }

  visualViewport?.addEventListener("resize", onViewportChanged);
}
