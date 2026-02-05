import React, { useState, useEffect, useRef } from "react";
import LZString from "lz-string";
import { css } from "../../../styled-system/css";
import { Button } from "../../components";
import { useToast } from "../../components/ui/ToastContext";
import { Share2, Download, Copy, ChevronDown } from "lucide-react";

const styles = {
  // Desktop actions: normal flex row
  desktopActions: css({
    display: { base: "none", md: "flex" },
    gap: "10px",
  }),
  // Mobile actions: relative container for dropdown
  mobileActions: css({
    display: { base: "block", md: "none" },
    position: "relative",
    zIndex: 50,
  }),
  dropdownMenu: css({
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: "{spacing.sm}",
    background: "{colors.card}",
    borderRadius: "{radii.md}",
    border: "1px solid {colors.border}",
    padding: "{spacing.sm}",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    minWidth: "150px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
  }),
  dropdownBtn: css({ justifyContent: "flex-start" }),
  mobileDropdownBtn: css({ justifyContent: "center", width: "100%" }),
};

const EASING_MAP = {
  linear: { css: "linear", framer: "linear" },
  ease: { css: "ease-in-out", framer: "easeInOut" },
  bounce: {
    css: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    framer: [0.68, -0.55, 0.265, 1.55],
  },
  elastic: {
    css: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
    framer: [0.68, -0.6, 0.32, 1.6],
  },
  wobble: {
    css: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    framer: [0.175, 0.885, 0.32, 1.275],
  },
  glitch: {
    css: "linear",
    framer: "linear",
  },
  back: {
    css: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    framer: [0.34, 1.56, 0.64, 1],
  },
  steps: { css: "steps(8)", framer: "steps(8)" },
};

const generateIconImport = (iconMeta) => {
  if (!iconMeta?.a && !iconMeta?.b) return "";

  const imports = [];
  const packages = {};

  if (iconMeta?.a) {
    const pkg = iconMeta.a.package;
    if (!packages[pkg]) packages[pkg] = [];
    packages[pkg].push(iconMeta.a.name);
  }
  if (iconMeta?.b) {
    const pkg = iconMeta.b.package;
    if (!packages[pkg]) packages[pkg] = [];
    if (!packages[pkg].includes(iconMeta.b.name)) {
      packages[pkg].push(iconMeta.b.name);
    }
  }

  for (const [pkg, names] of Object.entries(packages)) {
    imports.push(`import { ${names.join(", ")} } from '${pkg}';`);
  }

  return imports.join("\n");
};

const formatIconComment = (iconMeta) => {
  if (!iconMeta?.a && !iconMeta?.b) return "";

  const startName = iconMeta?.a?.name || "custom";
  const endName = iconMeta?.b?.name || "custom";

  return `// Morphing: ${startName} → ${endName}`;
};

const generateSnippets = (
  pathA,
  pathB,
  durationSec,
  easing,
  colorMode,
  solidColor,
  iconMeta,
) => {
  const cssEasing = EASING_MAP[easing]?.css || "ease-in-out";
  const framerEasing = EASING_MAP[easing]?.framer || "easeInOut";
  const framerEasingStr = Array.isArray(framerEasing)
    ? JSON.stringify(framerEasing)
    : `"${framerEasing}"`;

  const colorProp =
    colorMode === "currentColor"
      ? 'fill="currentColor"'
      : colorMode === "solid"
        ? `fill="${solidColor}"`
        : "// use gradient defs";

  const iconImport = generateIconImport(iconMeta);
  const iconComment = formatIconComment(iconMeta);
  const importSection = iconImport ? `${iconImport}\n\n` : "";
  const commentSection = iconComment ? `${iconComment}\n` : "";

  return {
    react: `${importSection}${commentSection}<motion.path 
  initial={{ d: "${pathA}" }} 
  animate={{ d: "${pathB}" }} 
  transition={{ duration: ${durationSec}, ease: ${framerEasingStr} }}
  ${colorProp}
/>`,
    native: `${importSection}${commentSection}<Path
  d="${pathA}" 
  ${colorMode === "currentColor" ? 'fill="currentColor"' : `fill="${solidColor}"`}
/>
// Use Moti or Reanimated for morphing in RN`,
    css: `${commentSection}@keyframes morph {
  0% { d: path("${pathA}"); }
  100% { d: path("${pathB}"); }
}

.icon {
  animation: morph ${durationSec}s ${cssEasing} infinite alternate;
  ${colorMode === "currentColor" ? "fill: currentColor;" : colorMode === "solid" ? `fill: ${solidColor};` : "/* gradient via SVG defs */"}
}`,
  };
};

export default function CodePreview({
  pathA,
  pathB,
  duration,
  easing,
  colorMode,
  solidColor,
  iconMeta,
  viewBox = "0 0 24 24",
  gradientStart = "#A855F7",
  gradientEnd = "#3B82F6",
}) {
  const [copiedMode, setCopiedMode] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const { showToast } = useToast();

  const durationSec = (duration / 1000).toFixed(2);
  const snippets = generateSnippets(
    pathA,
    pathB,
    durationSec,
    easing,
    colorMode,
    solidColor,
    iconMeta,
  );
  const cssEasing = EASING_MAP[easing]?.css || "ease-in-out";

  const generateSvgFile = () => {
    const gradientDef =
      colorMode === "gradient"
        ? `
    <defs>
      <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${gradientStart}" />
        <stop offset="100%" stop-color="${gradientEnd}" />
      </linearGradient>
    </defs>`
        : "";

    const fillStyle =
      colorMode === "currentColor"
        ? "currentColor"
        : colorMode === "solid"
          ? solidColor
          : "url(#morphGrad)";

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100" height="100">
  <style>
    @keyframes morph {
      0% { d: path("${pathA}"); }
      100% { d: path("${pathB}"); }
    }
    .morph-path {
      animation: morph ${durationSec}s ${cssEasing} infinite alternate;
      fill: ${fillStyle};
    }
  </style>${gradientDef}
  <path class="morph-path" d="${pathA}" />
</svg>`;
  };

  const downloadSvg = () => {
    const svgContent = generateSvgFile();
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "morph-animation.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("SVG downloaded!");
    setDropdownOpen(false);
  };

  const copyShareLink = () => {
    const state = {
      a: pathA,
      b: pathB,
      d: duration,
      e: easing,
      cm: colorMode,
      sc: solidColor,
      gs: gradientStart,
      ge: gradientEnd,
      vb: viewBox,
    };

    const optimizePath = (p) =>
      p
        .replace(/(\d+\.\d{3})\d+/g, "$1")
        .replace(/\s+/g, " ")
        .trim();

    const optimizedState = {
      ...state,
      a: optimizePath(state.a),
      b: optimizePath(state.b),
    };

    const json = JSON.stringify(optimizedState);

    const compressed = LZString.compressToEncodedURIComponent(json);

    const url = `${window.location.origin}${window.location.pathname}?c=${compressed}`;
    navigator.clipboard.writeText(url);
    showToast("Share link copied!");
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedDesktop =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      const clickedMobile =
        mobileDropdownRef.current &&
        mobileDropdownRef.current.contains(event.target);

      if (!clickedDesktop && !clickedMobile) {
        setDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const copyToClipboard = (mode) => {
    navigator.clipboard.writeText(snippets[mode]);
    setCopiedMode(mode);
    showToast(`Copied ${mode.toUpperCase()} code!`);
    setTimeout(() => setCopiedMode(null), 2000);
    setDropdownOpen(false);
  };

  return (
    <>
      <div className={styles.desktopActions}>
        <Button
          variant="secondary"
          onClick={copyShareLink}
          title="Copy shareable link"
        >
          <Share2 size={14} style={{ marginRight: "4px" }} /> Share
        </Button>
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <Button
            variant="primary"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <Copy size={14} style={{ marginRight: "4px" }} /> Copy{" "}
            <ChevronDown
              size={12}
              style={{ marginLeft: "6px", marginTop: "1px" }}
            />
          </Button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Button
                variant="secondary"
                onClick={downloadSvg}
                className={styles.dropdownBtn}
              >
                <Download size={14} style={{ marginRight: "6px" }} /> SVG File
              </Button>
              <Button
                variant="secondary"
                onClick={() => copyToClipboard("react")}
                className={styles.dropdownBtn}
              >
                {copiedMode === "react" ? "✓ JSX" : "JSX Code"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => copyToClipboard("css")}
                className={styles.dropdownBtn}
              >
                {copiedMode === "css" ? "✓ CSS" : "CSS Code"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => copyToClipboard("native")}
                className={styles.dropdownBtn}
              >
                {copiedMode === "native" ? "✓ RN" : "React Native"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.mobileActions} ref={mobileDropdownRef}>
        <Button
          variant="secondary"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          Export{" "}
          <ChevronDown
            size={12}
            style={{ marginLeft: "6px", marginTop: "1px" }}
          />
        </Button>

        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <Button
              variant="secondary"
              onClick={copyShareLink}
              className={styles.mobileDropdownBtn}
            >
              <Share2 size={14} style={{ marginRight: "6px" }} /> Share
            </Button>
            <Button
              variant="secondary"
              onClick={downloadSvg}
              className={styles.mobileDropdownBtn}
            >
              <Download size={14} style={{ marginRight: "6px" }} /> SVG
            </Button>
            <Button
              variant="secondary"
              onClick={() => copyToClipboard("react")}
              className={styles.mobileDropdownBtn}
            >
              {copiedMode === "react" ? "✓ JSX" : "Copy JSX"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => copyToClipboard("css")}
              className={styles.mobileDropdownBtn}
            >
              {copiedMode === "css" ? "✓ CSS" : "Copy CSS"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => copyToClipboard("native")}
              className={styles.mobileDropdownBtn}
            >
              {copiedMode === "native" ? "✓ RN" : "Copy RN"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
