let registrationPromise:
  | Promise<{
      gsap: typeof import("gsap").gsap;
      ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
      SplitText: typeof import("gsap/SplitText").SplitText;
    }>
  | undefined;

export function ensureGsapRegistered() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("GSAP can only be registered in the browser."));
  }

  registrationPromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/SplitText"),
  ]).then(([gsapModule, scrollTriggerModule, splitTextModule]) => {
    const gsap = gsapModule.gsap;
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    const SplitText = splitTextModule.SplitText;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    return { gsap, ScrollTrigger, SplitText };
  });

  return registrationPromise;
}
