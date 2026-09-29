const vertexShader = /* glsl */ `
attribute vec3 aTarget0;
attribute vec3 aTarget1;
attribute vec3 aTarget2;
attribute vec3 aTarget3;
attribute vec3 aTarget4;
attribute vec3 aTarget5;
attribute vec3 aScatter;
attribute float aRandom;

uniform float uStage;
uniform float uIntro;
uniform vec3 uMouse;
uniform float uRepelStrength;
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;

varying float vRandom;

vec3 targetFor(float stage) {
  if (stage < 0.5) return aTarget0;
  if (stage < 1.5) return aTarget1;
  if (stage < 2.5) return aTarget2;
  if (stage < 3.5) return aTarget3;
  if (stage < 4.5) return aTarget4;
  return aTarget5;
}

void main() {
  float stage = clamp(uStage, 0.0, 5.0);
  float base = floor(stage);
  float mixFactor = smoothstep(0.0, 1.0, fract(stage));

  vec3 from = targetFor(base);
  vec3 to = targetFor(base + 1.0);
  vec3 shaped = mix(from, to, mixFactor);

  float delay = aRandom * 0.45;
  float formed = smoothstep(delay, delay + 0.55, uIntro);
  vec3 position = mix(aScatter, shaped, formed);

  float drift = sin(uTime * 0.6 + aRandom * 6.2831) * 0.06;
  position += normalize(position + vec3(0.0001)) * drift;

  vec3 toMouse = position - uMouse;
  float distanceToMouse = length(toMouse);
  float radius = 1.6;
  float influence = smoothstep(radius, 0.0, distanceToMouse);
  position += normalize(toMouse + vec3(0.0001)) * influence * uRepelStrength;

  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * uPixelRatio * (0.55 + aRandom * 0.9) * (1.0 / -viewPosition.z);
  vRandom = aRandom;
}
`;

export default vertexShader;
