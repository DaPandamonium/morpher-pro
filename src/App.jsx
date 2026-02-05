import React, { useState, lazy, Suspense } from "react";
import { css } from "../styled-system/css";
import { Button } from "./components";
import { FaGithub } from "react-icons/fa";

import { GALLERY } from "./features/gallery/presets";
import AppShell from "./components/layout/AppShell";
import GallerySidebar from "./features/gallery/GallerySidebar";
import EditorViewport from "./features/editor/EditorViewport";
import CodePreview from "./features/editor/CodePreview";
import { ToastProvider } from "./components/ui/Toast";

const IconBrowser = lazy(() => import("./features/icons/IconBrowser"));
const ComponentPlayground = lazy(
  () => import("./features/preview/ComponentPlayground"),
);
const GuideModal = lazy(() => import("./features/guide/GuideModal"));

const LoadingFallback = () => (
  <div
    className={css({
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(4px)",
      zIndex: 100,
      color: "{colors.text}",
      fontSize: "0.9rem",
    })}
  >
    Loading...
  </div>
);

import { urlConfig } from "./lib/url-config";

export default function App() {
  const [activeData, setActiveData] = useState(
    urlConfig?.a && urlConfig?.b
      ? { a: urlConfig.a, b: urlConfig.b }
      : GALLERY.UI_ACTIONS["Menu to Close"],
  );

  const [iconMeta, setIconMeta] = useState({ a: null, b: null });

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showLucideBrowser, setShowLucideBrowser] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const [viewBox, setViewBox] = useState(urlConfig?.vb || "0 0 24 24");
  const [renderMode, setRenderMode] = useState("fill");
  const [colorMode, setColorMode] = useState(urlConfig?.cm || "gradient");
  const [solidColor, setSolidColor] = useState(urlConfig?.sc || "#8B5CF6");
  const [gradientStart, setGradientStart] = useState(
    urlConfig?.gs || "#A855F7",
  );
  const [gradientEnd, setGradientEnd] = useState(urlConfig?.ge || "#3B82F6");
  const [duration, setDuration] = useState(urlConfig?.d || 1500);
  const [easing, setEasing] = useState(urlConfig?.e || "ease");

  const handleIconPathSelect = (iconData, target) => {
    if (iconData) {
      const pathData = iconData.path || iconData;

      setActiveData((prev) => ({
        ...prev,
        [target]: pathData,
      }));

      if (iconData.iconName) {
        setIconMeta((prev) => ({
          ...prev,
          [target]: {
            name: iconData.iconName,
            library: iconData.library,
            libraryName: iconData.libraryName,
            package: iconData.package,
          },
        }));
      } else {
        setIconMeta((prev) => ({ ...prev, [target]: null }));
      }

      setViewBox("0 0 24 24");
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  const styles = {
    headerControls: css({
      display: "flex",
      gap: "{spacing.sm}",
      alignItems: "center",
      justifyContent: "flex-end",
    }),
    status: css({ fontSize: "0.7rem", color: "{colors.textDim}" }),
    tipBox: css({ fontSize: "0.7rem", color: "{colors.textMuted}" }),
    tipLink: css({ color: "{colors.accent}", textDecoration: "none" }),
  };

  const HeaderControls = (
    <div className={styles.headerControls}>
      <Button variant="secondary" onClick={() => setShowPlayground(true)}>
        Test
      </Button>
      <CodePreview
        pathA={activeData.a}
        pathB={activeData.b}
        duration={duration}
        easing={easing}
        colorMode={colorMode}
        solidColor={solidColor}
        iconMeta={iconMeta}
        viewBox={viewBox}
        gradientStart={gradientStart}
        gradientEnd={gradientEnd}
      />
    </div>
  );

  const FooterContent = (
    <div className={styles.tipBox}>
      <a
        href="https://github.com/DaPandamonium/morpher-pro"
        target="_blank"
        rel="noreferrer"
        className={styles.tipLink}
        style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
      >
        <FaGithub size={14} color="white" />
        Made by DaPanda 🐼❤️
      </a>
    </div>
  );

  return (
    <ToastProvider>
      <AppShell
        header={HeaderControls}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebar={
          <GallerySidebar
            currentPathA={activeData.a}
            currentPathB={activeData.b}
            onSelect={(data) => {
              setActiveData(data);
              closeSidebar();
            }}
            setViewBox={setViewBox}
            setRenderMode={setRenderMode}
            onOpenLucide={() => {
              setShowLucideBrowser(true);
              closeSidebar();
            }}
            onOpenPlayground={() => {
              setShowPlayground(true);
              closeSidebar();
            }}
            onOpenGuide={() => {
              setShowGuide(true);
              closeSidebar();
            }}
          />
        }
        main={
          <EditorViewport
            pathA={activeData.a}
            pathB={activeData.b}
            viewBox={viewBox}
            setViewBox={setViewBox}
            renderMode={renderMode}
            setRenderMode={setRenderMode}
            colorMode={colorMode}
            setColorMode={setColorMode}
            solidColor={solidColor}
            setSolidColor={setSolidColor}
            gradientStart={gradientStart}
            setGradientStart={setGradientStart}
            gradientEnd={gradientEnd}
            setGradientEnd={setGradientEnd}
            duration={duration}
            setDuration={setDuration}
            easing={easing}
            setEasing={setEasing}
            autoPlay={!!urlConfig}
            mobileFooter={FooterContent}
          />
        }
        footer={FooterContent}
      />

      {showLucideBrowser && (
        <Suspense fallback={<LoadingFallback />}>
          <IconBrowser
            onSelectStart={(pathData) => handleIconPathSelect(pathData, "a")}
            onSelectEnd={(pathData) => handleIconPathSelect(pathData, "b")}
            onClose={() => setShowLucideBrowser(false)}
            colorMode={colorMode}
            solidColor={solidColor}
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
            renderMode={renderMode}
          />
        </Suspense>
      )}

      {showPlayground && (
        <Suspense fallback={<LoadingFallback />}>
          <ComponentPlayground
            onClose={() => setShowPlayground(false)}
            pathA={activeData.a}
            pathB={activeData.b}
            colorMode={colorMode}
            solidColor={solidColor}
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
            duration={duration}
            easing={easing}
            renderMode={renderMode}
          />
        </Suspense>
      )}

      {showGuide && (
        <Suspense fallback={<LoadingFallback />}>
          <GuideModal onClose={() => setShowGuide(false)} />
        </Suspense>
      )}
    </ToastProvider>
  );
}
