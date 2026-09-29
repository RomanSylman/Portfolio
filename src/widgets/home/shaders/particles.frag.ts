const fragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
uniform float uGlow;

varying float vRandom;

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float distanceFromCenter = length(coord);
  if (distanceFromCenter > 0.5) discard;

  float core = smoothstep(0.22, 0.0, distanceFromCenter);
  float halo = exp(-distanceFromCenter * 5.5);
  float alpha = (core * 0.9 + halo * uGlow) * uOpacity;
  alpha *= 0.65 + vRandom * 0.35;

  vec3 color = mix(uColor, vec3(1.0), halo * 0.45 * (0.4 + vRandom));
  gl_FragColor = vec4(color, alpha);
}
`;

export default fragmentShader;
