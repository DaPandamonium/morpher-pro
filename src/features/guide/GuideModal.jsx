import React from "react";
import { css } from "../../../styled-system/css";
import { X, Copy, Share2, Download, Code } from "lucide-react";
import { Button } from "../../components";

const modalOverlay = css({
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(2px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
});

const modalContent = css({
  background: "{colors.surface}",
  border: "1px solid {colors.border}",
  borderRadius: "{radii.lg}",
  width: "90%",
  maxWidth: "500px",
  maxHeight: "85vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  animation: "scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
});

const modalHeader = css({
  padding: "{spacing.md}",
  borderBottom: "1px solid {colors.border}",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const modalBody = css({
  padding: "{spacing.md}",
  overflowY: "auto",
});

const modalCloseBtn = css({
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "{colors.textMuted}",
  padding: "4px",
  borderRadius: "{radii.md}",
  transition: "all 0.2s",
  _hover: { background: "{colors.bg}", color: "{colors.text}" },
});

const styles = {
  section: css({
    marginBottom: "{spacing.lg}",
    "&:last-child": { marginBottom: 0 },
  }),
  sectionTitle: css({
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "{colors.text}",
    marginBottom: "{spacing.sm}",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }),
  text: css({
    fontSize: "0.85rem",
    color: "{colors.textMuted}",
    lineHeight: "1.5",
    marginBottom: "8px",
  }),
  code: css({
    fontFamily: "{fonts.mono}",
    fontSize: "0.8rem",
    background: "rgba(0,0,0,0.3)",
    padding: "2px 6px",
    borderRadius: "4px",
    color: "{colors.accent}",
  }),
  list: css({
    paddingLeft: "20px",
    margin: 0,
    "& li": {
      fontSize: "0.85rem",
      color: "{colors.textMuted}",
      marginBottom: "4px",
    },
  }),
};

export default function GuideModal({ onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={modalOverlay} onClick={handleOverlayClick}>
      <div className={modalContent}>
        <div className={modalHeader}>
          <h2 className={css({ fontSize: "1.2rem", fontWeight: 700 })}>
            MorpherPro
          </h2>
          <button className={modalCloseBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className={modalBody}>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <Code size={16} /> Using Your Own SVGs
            </div>
            <p className={styles.text}>
              Open the <strong>Path Playground</strong> panel in the sidebar.
            </p>
            <ul className={styles.list}>
              <li>
                Paste an{" "}
                <strong>
                  entire <code>&lt;svg&gt;</code> code block
                </strong>{" "}
                directly.
              </li>
              <li>
                Or paste just the path data (<code>d="..."</code>) into the
                Start/End inputs.
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <Share2 size={16} /> Export & Share
            </div>
            <p className={styles.text}>
              Once you've crafted the perfect morph:
            </p>
            <ul className={styles.list}>
              <li>
                <strong className={css({ color: "{colors.text}" })}>
                  Export
                </strong>
                : Get the raw SVG or React / Framer Motion code.
              </li>
              <li>
                <strong className={css({ color: "{colors.text}" })}>
                  Share
                </strong>
                : Generate a link to save your current settings.
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={css({ fontSize: "1.2rem" })}>🐼</span> About
            </div>
            <p className={styles.text}>
              <strong>What is this for?</strong>
              <br />A tool to help developers create and fine-tune SVG morphing
              animations.
            </p>
            <p className={styles.text}>
              <strong>Why was this made?</strong>
              <br />I got tired of manually adjusting icons for every project.
              This tool automates the process and serves as a demo for{" "}
              <a
                href="https://panda-css.com/"
                target="_blank"
                rel="noreferrer"
                className={css({
                  fontWeight: "bold",
                  color: "#F6E458",
                  textDecoration: "underline",
                  _hover: { opacity: 0.8 },
                })}
              >
                PandaCSS
              </a>
              .
            </p>
          </div>
        </div>

        <div
          className={css({
            padding: "{spacing.md}",
            borderTop: "1px solid {colors.border}",
            display: "flex",
            justifyContent: "flex-end",
          })}
        >
          <Button variant="primary" onClick={onClose}>
            Got it!
          </Button>
        </div>
      </div>
    </div>
  );
}
