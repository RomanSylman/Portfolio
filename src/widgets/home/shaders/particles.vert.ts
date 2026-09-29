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
uniform float uGather;
uniform vec4 uGatherRect;
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

vec2 orbitPoint(float s, float halfW, float halfH) {
  float cr = min(halfW, halfH) * 0.42;
  float innerW = max(halfW - cr, 0.0);
  float innerH = max(halfH - cr, 0.0);
  float straightW = innerW * 2.0;
  float straightH = innerH * 2.0;
  float quarter = cr * 1.5707963;
  float peri = max(straightW * 2.0 + straightH * 2.0 + quarter * 4.0, 0.0001);
  float d = fract(s) * peri;
  float u;
  float a;

  if (d < straightW) return vec2(-innerW + d, halfH);
  d -= straightW;

  if (d < quarter) {
    u = d / max(quarter, 0.0001);
    a = 1.5707963 * (1.0 - u);
    return vec2(innerW, innerH) + vec2(cos(a), sin(a)) * cr;
  }
  d -= quarter;

  if (d < straightH) return vec2(halfW, innerH - d);
  d -= straightH;

  if (d < quarter) {
    u = d / max(quarter, 0.0001);
    a = -1.5707963 * u;
    return vec2(innerW, -innerH) + vec2(cos(a), sin(a)) * cr;
  }
  d -= quarter;

  if (d < straightW) return vec2(innerW - d, -halfH);
  d -= straightW;

  if (d < quarter) {
    u = d / max(quarter, 0.0001);
    a = -1.5707963 - 1.5707963 * u;
    return vec2(-innerW, -innerH) + vec2(cos(a), sin(a)) * cr;
  }
  d -= quarter;

  if (d < straightH) return vec2(-halfW, -innerH + d);
  d -= straightH;

  u = d / max(quarter, 0.0001);
  a = 3.14159265 - 1.5707963 * u;
  return vec2(-innerW, innerH) + vec2(cos(a), sin(a)) * cr;
}

vec2 orbitRibbon(float s, float halfW, float halfH, float offset) {
  vec2 point = orbitPoint(s, halfW, halfH);
  vec2 ahead = orbitPoint(s + 0.003, halfW, halfH);
  vec2 tangent = ahead - point;
  float tangentLen = length(tangent);
  vec2 outward = tangentLen > 0.0001
    ? vec2(-tangent.y, tangent.x) / tangentLen
    : vec2(0.0, 1.0);
  return point + outward * offset;
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

  float wave = aRandom * 0.04;
  float band = fract(aScatter.y * 0.271 + aRandom * 1.37);
  float burst = smoothstep(wave, 0.34 + wave, uGather);
  float spin = smoothstep(0.18 + wave, 1.0, uGather);
  float arrive = smoothstep(0.34 + wave, 1.0, uGather) * 0.65;
  float settle = max(burst, spin);

  vec2 leave = position.xy;
  float leaveLen = length(leave);
  if (leaveLen < 0.08) {
    float seed = aRandom * 6.2831853 + aScatter.x * 4.1;
    leave = vec2(cos(seed), sin(seed));
  } else {
    leave /= leaveLen;
  }
  position.xy += leave * mix(1.15, 1.95, aRandom) * burst;
  position.z *= mix(1.0, 0.4, burst);

  float drift = sin(uTime * 0.6 + aRandom * 6.2831) * 0.06 * (1.0 - settle);
  position += normalize(position + vec3(0.0001)) * drift;

  vec3 toMouse = position - uMouse;
  float distanceToMouse = length(toMouse);
  float radius = 1.6;
  float influence = smoothstep(radius, 0.0, distanceToMouse);
  position +=
    normalize(toMouse + vec3(0.0001)) * influence * uRepelStrength * (1.0 - settle);

  vec4 world = modelMatrix * vec4(position, 1.0);

  float halfW = uGatherRect.z + 0.06;
  float halfH = uGatherRect.w + 0.06;
  float s0 = fract(aScatter.x * 0.173 + aRandom);
  float offset = 0.12 + band * 0.28;
  vec2 slot = orbitRibbon(s0, halfW, halfH, offset);

  vec2 fromCard = world.xy - uGatherRect.xy;
  float startR = max(length(fromCard), 0.0001);
  float startAng = atan(fromCard.y, fromCard.x);
  float targetAng = atan(slot.y, slot.x);
  float delta = mod(targetAng - startAng + 3.14159265, 6.2831853) - 3.14159265;
  if (delta > 0.0) delta -= 6.2831853;

  float angNow = startAng + delta * spin;
  float radiusNow = mix(startR, length(slot), arrive);
  world.xy = uGatherRect.xy + vec2(cos(angNow), sin(angNow)) * radiusNow;
  world.z = mix(world.z, (aRandom - 0.5) * 0.08, spin);

  vec4 viewPosition = viewMatrix * world;
  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * uPixelRatio * (0.55 + aRandom * 0.9) * (1.0 / -viewPosition.z);
  vRandom = aRandom;
}
`;

export default vertexShader;
