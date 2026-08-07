"use client";

import type { ReactNode } from "react";

import { CustomCursor } from "@/components/custom-cursor/custom-cursor";
import { MagneticRuntime } from "@/components/magnetic-runtime/magnetic-runtime";
import { LoadingScreen } from "@/components/loading-screen/loading-screen";
import { MotionRuntime } from "@/components/motion-runtime/motion-runtime";
import type { Dictionary } from "@/content/dictionaries";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";

export function ClientProviders({
  children,
  cursorLabels,
}: {
  children: ReactNode;
  cursorLabels: Dictionary["cursor"];
}) {
  return (
    <SmoothScrollProvider>
      <LoadingScreen />
      <MotionRuntime />
      <CustomCursor labels={cursorLabels} />
      <MagneticRuntime />
      {children}
    </SmoothScrollProvider>
  );
}
