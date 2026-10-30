import { useEffect, useState } from "react";

function waitForImage(image: HTMLImageElement, signal: AbortSignal): Promise<void> {
  if (typeof image.decode === "function") {
    return image.decode().catch(() => undefined);
  }
  if (image.complete) return Promise.resolve();

  return new Promise((resolve) => {
    const finish = () => resolve();
    image.addEventListener("load", finish, { once: true, signal });
    image.addEventListener("error", finish, { once: true, signal });
  });
}

export function useWelcomeIntro(open: boolean, sealSource: string) {
  const [assetsReady, setAssetsReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [slow, setSlow] = useState(false);
  const [visible, setVisible] = useState(() => document.visibilityState === "visible");

  useEffect(() => {
    const updateVisibility = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", updateVisibility);
    updateVisibility();
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!open || started) return;

    const controller = new AbortController();
    let active = true;
    const pageLoaded = document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          window.addEventListener("load", () => resolve(), {
            once: true,
            signal: controller.signal,
          });
        });

    // React can insert images after the window load event has fired.
    const images = Array.from(document.querySelectorAll<HTMLImageElement>("#root img"))
      .filter((image) => image.loading !== "lazy");
    const seal = new Image();
    seal.src = sealSource;

    Promise.all([
      pageLoaded,
      document.fonts?.ready.catch(() => undefined),
      ...images.map((image) => waitForImage(image, controller.signal)),
      waitForImage(seal, controller.signal),
    ]).then(() => {
      if (active) setAssetsReady(true);
    });

    const slowTimer = window.setTimeout(() => setSlow(true), 6000);
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(slowTimer);
    };
  }, [open, sealSource, started]);

  useEffect(() => {
    if (!open || !assetsReady || !visible || started) return;

    // Give the browser a painted frame before mounting the animation.
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setStarted(true));
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [assetsReady, open, started, visible]);

  return { started, slow, visible, startNow: () => setAssetsReady(true) };
}
