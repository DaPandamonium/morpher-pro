// cSpell:ignore flubber
import { useMemo } from "react";
import { createInterpolator } from "../lib/flubber-adapter";

/**
 * @param {string} pathA - Origin path
 * @param {string} pathB - Target path
 * @returns {Function} - A function that takes `t` (0-1) and returns the interpolated path string.
 */
export function useMorph(pathA, pathB) {
  const interpolator = useMemo(
    () => (!pathA || !pathB ? () => "" : createInterpolator(pathA, pathB)),
    [pathA, pathB],
  );

  return interpolator;
}
