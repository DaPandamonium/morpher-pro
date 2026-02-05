import { interpolate } from "flubber";

/**
 * Creates a flubber interpolator with default optimization settings.
 * @param {string} pathA - The start SVG path.
 * @param {string} pathB - The end SVG path.
 * @param {Object} options - Flubber options.
 * @returns {Function} - The interpolator function (t => path).
 */
export const createInterpolator = (pathA, pathB, options = {}) => {
  const defaults = {
    maxSegmentLength: 0.2,
    single: true,
  };

  try {
    return interpolate(pathA, pathB, { ...defaults, ...options });
  } catch (error) {
    console.warn("Flubber interpolation failed:", error);
    return (t) => (t < 0.5 ? pathA : pathB);
  }
};
