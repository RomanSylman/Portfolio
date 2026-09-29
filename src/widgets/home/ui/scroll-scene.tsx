"use client";

import { PerspectiveCamera, View } from "@react-three/drei";

import { useStageTracker } from "@/shared/lib/scroll";
import { useWebGLEnabled } from "@/shared/lib/webgl";

import { useIntroTimeline } from "../lib/use-intro-timeline";
import { MorphParticles } from "./morph-particles";
import { SceneRig } from "./scene-rig";

export function ScrollScene() {
  useStageTracker();
  useIntroTimeline();
  const webglEnabled = useWebGLEnabled();

  if (!webglEnabled) return null;

  return (
    <View className="pointer-events-none fixed inset-0 -z-10">
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <SceneRig>
        <MorphParticles />
      </SceneRig>
    </View>
  );
}
