"use client";

import { OrthographicCamera, View } from "@react-three/drei";
import Image from "next/image";
import { Suspense } from "react";

import { useWebGLEnabled } from "@/shared/lib/webgl";

import { DistortionPlane } from "./distortion-plane";

interface DistortionImageProps {
  src: string;
  alt: string;
}

export function DistortionImage({ src, alt }: DistortionImageProps) {
  const webglEnabled = useWebGLEnabled();

  if (!webglEnabled) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 480px, 100vw"
        className="object-cover"
      />
    );
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 480px, 100vw"
        className="object-cover"
      />
      <View className="absolute inset-0" aria-label={alt}>
        <Suspense fallback={null}>
          <OrthographicCamera makeDefault position={[0, 0, 5]} />
          <DistortionPlane src={src} />
        </Suspense>
      </View>
    </>
  );
}
