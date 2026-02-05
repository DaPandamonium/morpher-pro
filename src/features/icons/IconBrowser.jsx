import React, { useState, useMemo, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import {
  iconBrowserModal,
  iconBrowserPanel,
  iconBrowserHeader,
  iconBrowserBody,
  iconGrid,
  iconCard,
  iconPreviewPanel,
  iconPreviewBox,
  librarySelector,
  libraryButton,
  iconLoadingState,
} from "../../../styled-system/recipes";
import { css } from "../../../styled-system/css";
import { Button, Input } from "../../components";
import { loadIconLibrary, getAvailableLibraries } from "./IconSetLoader";
import { extractIconPath } from "../../lib/icon-extractor";

// Styles using PandaCSS - all using token references
const styles = {
  title: css({ fontSize: "1.2rem", fontWeight: 700, color: "{colors.text}" }),
  headerLeft: css({
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
  }),
  searchBox: css({ padding: "{spacing.lg} {spacing.lg} 0" }),
  iconName: css({
    fontSize: "0.65rem",
    color: "{colors.textMuted}",
    textAlign: "center",
    wordBreak: "break-word",
    lineHeight: 1.2,
  }),
  iconSymbol: css({ width: "24px", height: "24px", color: "{colors.text}" }),
  noSelection: css({
    color: "{colors.textDim}",
    textAlign: "center",
    fontSize: "0.85rem",
    padding: "40px 20px",
  }),
  previewTitle: css({
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "{colors.text}",
  }),
  previewMeta: css({ fontSize: "0.7rem", color: "{colors.textMuted}" }),
  previewMetaSpaced: css({
    fontSize: "0.7rem",
    color: "{colors.textMuted}",
    marginTop: "{spacing.sm}",
  }),
  previewMetaSubtle: css({
    fontSize: "0.65rem",
    color: "{colors.textSubtle}",
    marginTop: "{spacing.sm}",
  }),
  actionButtons: css({
    display: "flex",
    flexDirection: "column",
    gap: "{spacing.sm}",
  }),
  previewSvg: css({ width: "80%", height: "80%" }),
  gridContainer: css({
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  }),
  mobileActionBar: css({
    display: { base: "flex", md: "none" },
    gap: "{spacing.sm}",
    padding: "{spacing.md} {spacing.lg}",
    borderTop: "1px solid {colors.border}",
    background: "{colors.card}",
    alignItems: "center",
  }),
  mobileActionContent: css({
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }),
  mobileIconName: css({
    fontSize: "0.85rem",
    color: "{colors.text}",
    fontWeight: 500,
  }),
  loadingSpinner: css({
    width: "32px",
    height: "32px",
    border: "3px solid {colors.border}",
    borderTopColor: "{colors.accent}",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  }),
};

const MAX_INITIAL_ICONS = 200;

export default function IconBrowser({
  onSelectStart,
  onSelectEnd,
  onClose,
  colorMode,
  solidColor,
  gradientStart,
  gradientEnd,
  renderMode,
}) {
  // State
  const [currentLibrary, setCurrentLibrary] = useState("lucide");
  const [icons, setIcons] = useState({});
  const [libraryConfig, setLibraryConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const libraries = useMemo(() => getAvailableLibraries(), []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setSelectedIcon(null);
      setSearch("");

      try {
        const { icons: loadedIcons, config } =
          await loadIconLibrary(currentLibrary);

        if (!cancelled) {
          setIcons(loadedIcons);
          setLibraryConfig(config);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load icon library:", error);
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [currentLibrary]);

  const iconNames = useMemo(() => Object.keys(icons), [icons]);

  const filteredIcons = useMemo(() => {
    if (!search) return iconNames.slice(0, MAX_INITIAL_ICONS);
    const lowerSearch = search.toLowerCase();
    return iconNames.filter((name) => name.toLowerCase().includes(lowerSearch));
  }, [iconNames, search]);

  const handleSelectPath = useCallback(
    async (targetPath) => {
      if (!selectedIcon || !icons[selectedIcon]) return;

      setIsExtracting(true);

      try {
        const pathData = await extractIconPath(icons[selectedIcon], {
          size: 24,
        });

        if (pathData) {
          const iconData = {
            path: pathData,
            iconName: selectedIcon,
            library: currentLibrary,
            libraryName: libraryConfig?.name,
            package:
              currentLibrary === "lucide"
                ? "lucide-react"
                : `react-icons/${currentLibrary}`,
          };

          if (targetPath === "start") {
            onSelectStart(iconData);
          } else {
            onSelectEnd(iconData);
          }
          onClose();
        }
      } catch (error) {
        console.error("Failed to extract icon path:", error);
      } finally {
        setIsExtracting(false);
      }
    },
    [
      selectedIcon,
      icons,
      currentLibrary,
      libraryConfig,
      onSelectStart,
      onSelectEnd,
      onClose,
    ],
  );

  const getColorStyle = useCallback(() => {
    const baseProps =
      libraryConfig?.renderMode === "stroke" || renderMode === "stroke"
        ? { strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }
        : {};

    if (colorMode === "currentColor") {
      return renderMode === "stroke"
        ? { ...baseProps, stroke: "#A855F7", fill: "none" }
        : { fill: "#A855F7" };
    }

    if (colorMode === "solid") {
      return renderMode === "stroke"
        ? { ...baseProps, stroke: solidColor, fill: "none" }
        : { fill: solidColor };
    }

    return renderMode === "stroke"
      ? { ...baseProps, stroke: "url(#previewGrad)", fill: "none" }
      : { fill: "url(#previewGrad)" };
  }, [colorMode, solidColor, renderMode, libraryConfig]);

  const SelectedIconComponent = selectedIcon ? icons[selectedIcon] : null;

  return (
    <div className={iconBrowserModal()} onClick={onClose}>
      <div className={iconBrowserPanel()} onClick={(e) => e.stopPropagation()}>
        <div className={iconBrowserHeader()}>
          <div className={styles.headerLeft}>
            <div className={styles.title}>Browse Icons</div>
            <div className={librarySelector()}>
              {libraries.map((lib) => (
                <button
                  key={lib.key}
                  className={libraryButton({
                    active: currentLibrary === lib.key,
                  })}
                  onClick={() => setCurrentLibrary(lib.key)}
                  title={lib.description}
                >
                  {lib.name}
                </button>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            title="Close"
            className={css({
              position: "absolute",
              top: "12px",
              right: "24px",
              padding: "8px",
              height: "auto",
              color: "{colors.textMuted}",
              _hover: { color: "{colors.text}", background: "{colors.bg}" },
            })}
          >
            <X size={20} />
          </Button>
        </div>

        <div className={iconBrowserBody()}>
          {isLoading ? (
            <div className={iconLoadingState()}>
              <div className={styles.loadingSpinner} />
              <span>
                Loading {libraries.find((l) => l.key === currentLibrary)?.name}
                ...
              </span>
            </div>
          ) : (
            <>
              <div className={styles.gridContainer}>
                <div className={styles.searchBox}>
                  <Input
                    placeholder={`Search ${iconNames.length} icons...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    width="100%"
                  />
                  <div className={styles.previewMetaSpaced}>
                    {filteredIcons.length} icons{" "}
                    {!search &&
                      `shown (type to search all ${iconNames.length})`}
                  </div>
                </div>

                <div className={iconGrid()}>
                  {filteredIcons.map((name) => {
                    const Icon = icons[name];
                    return (
                      <button
                        key={name}
                        className={iconCard({
                          selected: selectedIcon === name,
                        })}
                        onClick={() => setSelectedIcon(name)}
                      >
                        <Icon className={styles.iconSymbol} />
                        <span className={styles.iconName}>
                          {name
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .slice(0, 20)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={iconPreviewPanel()}>
                {SelectedIconComponent ? (
                  <>
                    <div>
                      <div className={styles.previewTitle}>Live Preview</div>
                      <div className={styles.previewMeta}>
                        {selectedIcon.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    </div>

                    <div className={iconPreviewBox()}>
                      <svg
                        viewBox={libraryConfig?.viewBox || "0 0 24 24"}
                        className={styles.previewSvg}
                      >
                        {colorMode === "gradient" && (
                          <defs>
                            <linearGradient
                              id="previewGrad"
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
                        <SelectedIconComponent
                          size={24}
                          style={getColorStyle()}
                        />
                      </svg>
                    </div>

                    <div>
                      <div className={styles.previewMetaSpaced}>
                        <strong>Applied Settings:</strong>
                      </div>
                      <div className={styles.previewMeta}>
                        • Library: <strong>{libraryConfig?.name}</strong>
                      </div>
                      <div className={styles.previewMeta}>
                        • Color: <strong>{colorMode}</strong>
                      </div>
                      <div className={styles.previewMeta}>
                        • Render: <strong>{renderMode}</strong>
                      </div>
                      <div className={styles.previewMetaSubtle}>
                        ViewBox: {libraryConfig?.viewBox || "0 0 24 24"}
                      </div>
                    </div>

                    <div className={styles.actionButtons}>
                      <Button
                        variant="secondary"
                        onClick={() => handleSelectPath("start")}
                        disabled={isExtracting}
                      >
                        {isExtracting
                          ? "Extracting..."
                          : "📥 Use as Start Path"}
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleSelectPath("end")}
                        disabled={isExtracting}
                      >
                        {isExtracting ? "Extracting..." : "📥 Use as End Path"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className={styles.noSelection}>
                    ← Select an icon to see live preview with your current
                    settings
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {selectedIcon && !isLoading && (
          <div className={styles.mobileActionBar}>
            <div className={styles.mobileActionContent}>
              {SelectedIconComponent && (
                <SelectedIconComponent className={styles.iconSymbol} />
              )}
              <span className={styles.mobileIconName}>
                {selectedIcon
                  .replace(/([A-Z])/g, " $1")
                  .trim()
                  .slice(0, 15)}
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleSelectPath("start")}
              disabled={isExtracting}
            >
              Start
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSelectPath("end")}
              disabled={isExtracting}
            >
              End
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
