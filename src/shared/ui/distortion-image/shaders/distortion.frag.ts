const fragmentShader = /* glsl */ `
uniform sampler2D uTexture;
uniform vec2 uPointer;
uniform vec2 uCover;
uniform float uHover;
uniform float uTime;

varying vec2 vUv;

void main() {
  vec2 uv = vUv - 0.5;
  uv *= uCover;
  uv += 0.5;

  vec2 toPointer = uv - uPointer;
  float distanceToPointer = length(toPointer);
  float wave = sin(distanceToPointer * 18.0 - uTime * 3.0);
  float falloff = smoothstep(0.55, 0.0, distanceToPointer);
  vec2 offset = toPointer * wave * falloff * uHover * 0.12;

  gl_FragColor = texture2D(uTexture, uv + offset);
}
`;

export default fragmentShader;
