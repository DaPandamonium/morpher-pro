export const EASINGS = {
  linear: (t) => t,
  ease: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  bounce: (t) => {
    const n1 = 7.5625,
      d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
  elastic: (x) => {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
      ? 0
      : x === 1
        ? 1
        : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  },
  wobble: (t) => {
    return t === 0 || t === 1
      ? t
      : Math.sin(t * Math.PI * 6) * (1 - t) * 0.5 + t;
  },
  glitch: (t) => {
    if (t === 0 || t === 1) return t;
    const noise = (Math.random() - 0.5) * 0.3;
    return Math.max(0, Math.min(1, t + noise));
  },
  back: (t) => {
    const c1 = 3;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  steps: (t) => {
    if (t === 1) return 1;
    const steps = 8;
    return Math.floor(t * steps) / steps;
  },
};
