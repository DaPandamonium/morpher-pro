import React, { useState, useRef, useEffect } from "react";
import { useMorph } from "../../hooks/useMorph";
import { EASINGS } from "../../lib/easings";

export const MorphIcon = ({
  pathA,
  pathB,
  colorMode,
  solidColor,
  gradientStart,
  gradientEnd,
  duration,
  easing,
  renderMode,
  isHovered,
  size = "20px",
  style = {},
}) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const requestRef = useRef();
  const startTimeRef = useRef();
  const startProgressRef = useRef(0);
  const targetProgress = isHovered ? 1 : 0;

  const interpolator = useMorph(pathA, pathB);

  useEffect(() => {
    progressRef.current = progress;
    if (progressRef.current === targetProgress) return;

    startProgressRef.current = progressRef.current;
    startTimeRef.current = null;

    const animate = (time) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const relativeTime = Math.min(1, elapsed / duration);

      const easingFn = EASINGS[easing || "linear"] || EASINGS.linear;
      const easedT = easingFn(relativeTime);

      let newProgress;
      if (targetProgress === 1) {
        newProgress =
          startProgressRef.current + (1 - startProgressRef.current) * easedT;
      } else {
        newProgress =
          startProgressRef.current - startProgressRef.current * easedT;
      }

      if (relativeTime >= 1) {
        setProgress(targetProgress);
        return;
      }

      setProgress(newProgress);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, targetProgress, duration, easing]);

  const currentPath = interpolator(progress);

  const iconStyle = {
    width: size,
    height: size,
    display: "block",
    ...style,
  };

  const getColor = () => {
    if (colorMode === "solid") return solidColor;
    if (colorMode === "gradient") return "url(#pgGradient)";
    return "currentColor";
  };

  const getPathProps = () => {
    const color = getColor();
    if (renderMode === "stroke") {
      return {
        fill: "none",
        stroke: color,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      };
    }
    return {
      fill: color,
      stroke: "none",
    };
  };

  return (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      {colorMode === "gradient" && (
        <defs>
          <linearGradient id="pgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientStart} />
            <stop offset="100%" stopColor={gradientEnd} />
          </linearGradient>
        </defs>
      )}
      <path d={currentPath} {...getPathProps()} />
    </svg>
  );
};
