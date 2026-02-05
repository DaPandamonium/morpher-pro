import React, { useState } from "react";
import { css } from "../../../styled-system/css";
import {
  drawer,
  categoryHeader,
  presetCard,
} from "../../../styled-system/recipes";
import { CircleHelp } from "lucide-react";
import { Label, Button } from "../../components";
import { GALLERY } from "./presets";
import { parseSVG } from "../../lib/svg-parser";

const layout = {
  scrollArea: css({
    overflowY: "auto",
    padding: "20px",
    paddingBottom: "100px",
    flex: 1,
    minHeight: 0,
  }),
  catGroup: css({
    marginBottom: "2px",
    borderBottom: "1px solid {colors.border}",
  }),
  arrow: css({
    fontSize: "0.6rem",
    transition: "transform 0.2s",
    opacity: 0.5,
  }),
  arrowOpen: css({ transform: "rotate(180deg)" }),
  catContent: css({ padding: "0 4px 12px 4px" }),
  catContentNested: css({ paddingLeft: "{spacing.sm}" }),
  playgroundPanel: css({
    marginTop: "auto",
    borderTop: "1px solid {colors.border}",
    background: "{colors.bg}",
  }),

  playgroundToggle: css({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "{spacing.lg} 20px",
    background: "transparent",
    border: "none",
    color: "{colors.text}",
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    cursor: "pointer",
    transition: "background 0.2s",
    _hover: { background: "rgba(255,255,255,0.03)" },
  }),
  toggleIcon: css({
    fontSize: "1.1rem",
    fontWeight: 400,
    color: "{colors.accent}",
  }),
  playgroundContent: css({
    padding: "0 20px 20px",
    animation: "slideDown 0.2s ease-out",
  }),
  inputGroup: css({ marginBottom: "{spacing.md}" }),
  inputLabelRow: css({
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  }),
  fileUploadLabel: css({
    cursor: "pointer",
    color: "{colors.accent}",
    fontSize: "0.58rem",
    fontWeight: "bold",
    opacity: 0.8,
    transition: "opacity 0.2s",
    position: "relative",
    overflow: "hidden",
    display: "inline-block",
    _hover: { opacity: 1, textDecoration: "underline" },
  }),
  hiddenInput: css({
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0,
    cursor: "pointer",
    width: "100%",
    height: "100%",
  }),
  browseLucideBtn: css({ width: "100%", marginTop: "{spacing.sm}" }),
};

function Category({
  name,
  items,
  isOpen,
  onToggle,
  currentPathA,
  onSelect,
  children,
}) {
  return (
    <div className={layout.catGroup}>
      <button className={categoryHeader()} onClick={onToggle}>
        <span>{name.replace("_", " ")}</span>
        <span className={`${layout.arrow} ${isOpen ? layout.arrowOpen : ""}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className={layout.catContent}>
          {children
            ? children
            : Object.entries(items).map(([itemName, data]) => (
                <button
                  key={itemName}
                  className={presetCard({ active: currentPathA === data.a })}
                  onClick={() => onSelect(data)}
                >
                  {itemName}
                </button>
              ))}
        </div>
      )}
    </div>
  );
}

function FileUploadInput({ onFileSelect }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => onFileSelect(event.target.result);
    reader.readAsText(file);
  };

  return (
    <label className={layout.fileUploadLabel}>
      Upload SVG
      <input
        type="file"
        accept=".svg"
        onChange={handleChange}
        className={layout.hiddenInput}
      />
    </label>
  );
}

export default function GallerySidebar({
  currentPathA,
  currentPathB,
  onSelect,
  setViewBox,
  setRenderMode,
  onOpenLucide,
  onOpenGuide,
}) {
  const [openCategories, setOpenCategories] = useState({});
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const toggleCategory = (cat) =>
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const handleSVGInput = (key, value) => {
    if (value.trim().startsWith("<svg") || value.includes("xmlns=")) {
      const parsed = parseSVG(value);
      if (parsed?.combinedPath) {
        onSelect({
          a: key === "a" ? parsed.combinedPath : currentPathA,
          b: key === "b" ? parsed.combinedPath : currentPathB,
        });
        if (parsed.viewBox) setViewBox(parsed.viewBox);
        if (parsed.isStroke) setRenderMode("stroke");
        else if (parsed.isStroke === false) setRenderMode("fill");
        return;
      }
    }
    onSelect({
      a: key === "a" ? value : currentPathA,
      b: key === "b" ? value : currentPathB,
    });
  };

  const handleFileUpload = (key, content) => {
    const parsed = parseSVG(content);
    if (parsed?.combinedPath) {
      onSelect({
        a: key === "a" ? parsed.combinedPath : currentPathA,
        b: key === "b" ? parsed.combinedPath : currentPathB,
      });
      if (parsed.viewBox) setViewBox(parsed.viewBox);
      setRenderMode(parsed.isStroke ? "stroke" : "fill");
    } else {
      alert("Could not find any valid shapes or paths in this SVG.");
    }
  };

  /* Removed unused handleLucideIconSelect */

  return (
    <aside className={drawer()}>
      <div className={layout.scrollArea}>
        <Category
          name="Examples"
          isOpen={!!openCategories["Examples"]}
          onToggle={() => toggleCategory("Examples")}
        >
          <div className={layout.catContentNested}>
            {Object.entries(GALLERY).map(([category, items]) => (
              <Category
                key={category}
                name={category}
                items={items}
                isOpen={!!openCategories[category]}
                onToggle={() => toggleCategory(category)}
                currentPathA={currentPathA}
                onSelect={onSelect}
              />
            ))}
          </div>
        </Category>

        <Category
          name="Icon Libraries"
          isOpen={!!openCategories["IconLibraries"]}
          onToggle={() => toggleCategory("IconLibraries")}
        >
          <Button
            variant="secondary"
            onClick={onOpenLucide}
            className={layout.browseLucideBtn}
          >
            Browse Icon Libraries
          </Button>
        </Category>
      </div>

      <div
        className={css({
          padding: "0 20px 12px",
          borderTop: "1px solid {colors.border}",
          paddingTop: "12px",
          background: "{colors.bg}",
        })}
      >
        <Button
          variant="ghost"
          onClick={onOpenGuide}
          className={css({
            width: "100%",
            justifyContent: "flex-start",
            gap: "8px",
            color: "{colors.textMuted}",
            fontSize: "0.75rem",
            opacity: 0.7,
            transition: "all 0.2s",
            _hover: { opacity: 1, color: "{colors.text}" },
          })}
        >
          <CircleHelp size={15} />
          Info
        </Button>
      </div>

      <div className={layout.playgroundPanel}>
        <button
          className={layout.playgroundToggle}
          onClick={() => setIsCustomOpen(!isCustomOpen)}
        >
          <span>⚡ Path Playground</span>
          <span className={layout.toggleIcon}>{isCustomOpen ? "−" : "+"}</span>
        </button>

        {isCustomOpen && (
          <div className={layout.playgroundContent}>
            {["a", "b"].map((key) => (
              <div key={key} className={layout.inputGroup}>
                <div className={layout.inputLabelRow}>
                  <Label>{key === "a" ? "Start Path" : "End Path"}</Label>
                  <FileUploadInput
                    onFileSelect={(content) => handleFileUpload(key, content)}
                  />
                </div>
                <textarea
                  value={key === "a" ? currentPathA : currentPathB}
                  onChange={(e) => handleSVGInput(key, e.target.value)}
                  placeholder="Paste path data (d=...) or full <svg> code here"
                  spellCheck="false"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
