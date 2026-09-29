const SMOOTHING_CONSTANT = 2;

/**
 * Frame-rate independent smoothing towards a target, the same curve as
 * `maath/easing`'s `damp`. Mutates `current[key]` and returns the new value.
 */
export function damp(
  current: Record<string, number>,
  key: string,
  target: number,
  smoothTime: number,
  delta: number,
) {
  const value = current[key] ?? 0;
  const factor = 1 - Math.exp((-SMOOTHING_CONSTANT * delta) / smoothTime);
  const next = value + (target - value) * factor;
  current[key] = next;
  return next;
}
