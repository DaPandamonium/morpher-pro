import React, { useState, useEffect, useRef } from "react";
import { css } from "../../../styled-system/css";
import { easingButton } from "../../../styled-system/recipes";
import {
  Card,
  ColorPicker,
  Input,
  Label,
  SegmentedControl,
  Slider,
} from "../../components";
import { useMorph } from "../../hooks/useMorph";
import { EASINGS } from "../../lib/easings";

const layout = {
  viewport: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: { base: "flex-start", md: "center" },
    padding: { base: "40px 16px 0", md: "20px" },
    paddingBottom: { base: "100px", md: "20px" },
    backgroundImage: "radial-gradient({colors.border} 1px, transparent 1px)",
    backgroundSize: "30px 30px",
    width: "100%",
    minHeight: "100%",
  }),
  previewSvg: css({
    width: { base: "80%", md: "60%" },
    maxWidth: "100%",
    height: "auto",
    maxHeight: "40vh",
    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
  }),
  mobileSpacer: css({
    height: "40px",
    width: "100%",
    flexShrink: 0,
    display: { base: "block", md: "none" },
  }),
  controlGrid: css({
    display: "grid",
    gridTemplateColumns: { base: "1fr", md: "70px 1fr" },
    gap: "10px 12px",
    alignItems: "center",
    marginBottom: "{spacing.lg}",
  }),
  row: css({
    display: "flex",
    gap: "{spacing.md}",
    alignItems: "center",
    flexWrap: "wrap",
  }),
  rowEnd: css({
    display: "flex",
    gap: "{spacing.sm}",
    alignItems: "center",
    marginLeft: { base: "0", md: "auto" },
    width: { base: "100%", md: "auto" },
    justifyContent: { base: "space-between", md: "flex-start" },
  }),
  progressRow: css({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "{spacing.sm}",
    fontSize: "0.65rem",
    color: "{colors.textSubtle}",
    fontFamily: "{fonts.mono}",
  }),
  easingSection: css({
    marginTop: "20px",
    borderTop: "1px solid {colors.border}",
    paddingTop: "15px",
  }),
  easingLabel: css({
    display: "block",
    fontSize: "0.7rem",
    color: "{colors.textDim}",
    marginBottom: "{spacing.sm}",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: 700,
  }),
  easingButtons: css({
    display: "flex",
    gap: "{spacing.sm}",
    flexWrap: "wrap",
  }),
  directionBtn: css({
    padding: "5px 12px",
    fontSize: "0.6rem",
    borderRadius: "{radii.sm}",
    transition: "all 0.2s ease",
    cursor: "pointer",
    border: "none",
  }),
  directionBtnNormal: css({
    background: "rgba(0,0,0,0.2)",
    color: "{colors.textMuted}",
  }),
  directionBtnActive: css({
    background: "{colors.accentMuted}",
    color: "{colors.text}",
  }),
  gradientArrow: css({ fontSize: "0.7rem", color: "{colors.textDim}" }),
  cardWrapper: css({ marginInline: "auto", width: "100%", maxWidth: "400px" }),
  controlTopRow: css({
    display: "flex",
    gap: "{spacing.sm}",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "{spacing.md}",
  }),
  viewboxRow: css({ display: "flex", gap: "6px", alignItems: "center" }),
  viewboxInput: css({
    fontFamily: "{fonts.mono}",
    fontSize: "0.7rem",
    textAlign: "center",
    wordSpacing: "4px",
  }),
  durationSection: css({
    marginTop: "{spacing.lg}",
    marginBottom: "{spacing.sm}",
  }),
  mobileFooter: css({
    display: { base: "flex", md: "none" },
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "12px",
    marginTop: "{spacing.xl}",
    padding: "12px 16px",
    marginInline: "-16px",
    width: "calc(100% + 32px)",
    borderTop: "1px solid {colors.border}",
    fontSize: "0.65rem",
    color: "{colors.textSubtle}",
    background: "{colors.surface}",
  }),
};

export default function EditorViewport({
  pathA,
  pathB,
  viewBox,
  setViewBox,
  renderMode,
  setRenderMode,
  colorMode,
  setColorMode,
  solidColor,
  setSolidColor,
  gradientStart,
  setGradientStart,
  gradientEnd,
  setGradientEnd,
  duration,
  setDuration,
  easing,
  setEasing,
  autoPlay = false,
  mobileFooter = null,
}) {
  const [isSwapped, setIsSwapped] = useState(false);
  const [progress, setProgress] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const effectiveA = isSwapped ? pathB : pathA;
  const effectiveB = isSwapped ? pathA : pathB;

  const requestRef = useRef();
  const startTimeRef = useRef();
  const waitTimeRef = useRef(0);
  const directionRef = useRef(1);
  const isWaitingRef = useRef(false);

  const interpolator = useMorph(effectiveA, effectiveB);

  useEffect(() => {
    if (!isPlaying) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      startTimeRef.current = null;
      isWaitingRef.current = false;
      return;
    }

    const animate = (time) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      if (isWaitingRef.current) {
        if (time - waitTimeRef.current < 1000) {
          requestRef.current = requestAnimationFrame(animate);
          return;
        }
        isWaitingRef.current = false;
        startTimeRef.current = time;
        directionRef.current *= -1;
      }

      const runtime = time - startTimeRef.current;
      let relativeProgress = runtime / duration;

      if (relativeProgress >= 1) {
        setProgress(directionRef.current === 1 ? 1 : 0);
        isWaitingRef.current = true;
        waitTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      const t =
        directionRef.current === 1 ? relativeProgress : 1 - relativeProgress;
      const easingFn = EASINGS[easing] || EASINGS.linear;
      setProgress(Math.max(0, Math.min(1, easingFn(t))));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, easing, duration]);

  const currentPath = interpolator(progress);

  const getColorStyle = () => {
    const strokeProps = {
      fill: "none",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };
    if (colorMode === "currentColor")
      return renderMode === "stroke"
        ? { ...strokeProps, stroke: "currentColor" }
        : { fill: "currentColor" };
    if (colorMode === "solid")
      return renderMode === "stroke"
        ? { ...strokeProps, stroke: solidColor }
        : { fill: solidColor };
    return renderMode === "stroke"
      ? { ...strokeProps, stroke: "url(#morphGrad)" }
      : { fill: "url(#morphGrad)" };
  };

  const startAnimation = (name) => {
    setEasing(name);
    setIsPlaying(true);
    startTimeRef.current = null;
    isWaitingRef.current = false;
    directionRef.current = 1;
    setProgress(0);
  };

  return (
    <section className={layout.viewport}>
      <Card variant="canvas" className={layout.cardWrapper}>
        <svg viewBox={viewBox} className={layout.previewSvg}>
          {colorMode === "gradient" && (
            <defs>
              <linearGradient
                id="morphGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={gradientStart} />
                <stop offset="100%" stopColor={gradientEnd} />
              </linearGradient>
            </defs>
          )}
          <path d={currentPath} {...getColorStyle()} />
        </svg>
      </Card>

      <Card variant="controls" className={layout.cardWrapper}>
        <div className={layout.controlTopRow}>
          <button
            className={`${layout.directionBtn} ${isSwapped ? layout.directionBtnActive : layout.directionBtnNormal}`}
            onClick={() => setIsSwapped(!isSwapped)}
          >
            {isSwapped ? "↓ Reversed" : "↑ Normal"}
          </button>
          <div className={layout.viewboxRow}>
            <Label>ViewBox</Label>
            <Input
              value={viewBox}
              onChange={(e) => setViewBox(e.target.value)}
              placeholder="0 0 24 24"
              width="110px"
              className={layout.viewboxInput}
            />
          </div>
        </div>

        <div className={layout.controlGrid}>
          <Label>Render</Label>
          <SegmentedControl
            value={renderMode}
            onChange={setRenderMode}
            options={[
              { value: "fill", label: "Fill" },
              { value: "stroke", label: "Stroke" },
            ]}
          />

          <Label>Color</Label>
          <div className={layout.row}>
            <SegmentedControl
              value={colorMode}
              onChange={setColorMode}
              size="sm"
              options={[
                {
                  value: "currentColor",
                  label: "CSS",
                  title: "Use currentColor",
                },
                { value: "solid", label: "Solid", title: "Use solid color" },
                { value: "gradient", label: "Grad", title: "Use gradient" },
              ]}
              style={{ flex: "none" }}
            />
            {colorMode === "solid" && (
              <ColorPicker
                value={solidColor}
                onChange={setSolidColor}
                title="Pick solid color"
              />
            )}
            {colorMode === "gradient" && (
              <div className={layout.row}>
                <ColorPicker
                  value={gradientStart}
                  onChange={setGradientStart}
                  title="Start color"
                />
                <span className={layout.gradientArrow}>→</span>
                <ColorPicker
                  value={gradientEnd}
                  onChange={setGradientEnd}
                  title="End color"
                />
              </div>
            )}
          </div>
        </div>

        <div className={layout.progressRow}>
          <span>{(progress * 100).toFixed(0)}%</span>
        </div>
        <Slider
          value={progress}
          onChange={(e) => {
            setIsPlaying(false);
            setProgress(parseFloat(e.target.value));
          }}
        />

        <div className={layout.durationSection}>
          <div className={layout.progressRow}>
            <span>Duration (ms)</span>
            <span>{duration}</span>
          </div>
          <Slider
            min={300}
            max={3000}
            step={100}
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
          />
        </div>

        <div className={layout.easingSection}>
          <label className={layout.easingLabel}>Auto-Play Morph:</label>
          <div className={layout.easingButtons}>
            {Object.keys(EASINGS).map((name) => (
              <button
                key={name}
                className={easingButton({
                  active: isPlaying && easing === name,
                })}
                onClick={() => startAnimation(name)}
              >
                {name}
              </button>
            ))}
            <button
              className={easingButton({ isStop: !isPlaying })}
              onClick={() => setIsPlaying(false)}
            >
              Stop
            </button>
          </div>
        </div>
      </Card>

      {mobileFooter && (
        <>
          <div className={layout.mobileSpacer} />
          <div className={layout.mobileFooter}>{mobileFooter}</div>
        </>
      )}
    </section>
  );
}
