import React from "react";
import { css } from "../../../styled-system/css";

const styles = {
  shell: css({
    display: "flex",
    flexDirection: "column",
    height: "100dvh", // Use dynamic viewport height for mobile
    width: "100%",
    overflow: "hidden",
  }),
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: { base: "12px 16px", md: "12px 24px" },
    borderBottom: "1px solid {colors.border}",
    background: "{colors.surface}",
    zIndex: 10,
  }),
  headerLeft: css({
    display: "flex",
    alignItems: "center",
    gap: "{spacing.md}",
  }),
  hamburger: css({
    display: { base: "flex", md: "none" },
    flexDirection: "column",
    justifyContent: "center",
    gap: "4px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    width: "24px",
    height: "24px",
    padding: 0,
    "& span": {
      display: "block",
      width: "100%",
      height: "2px",
      background: "{colors.text}",
      borderRadius: "2px",
      transition: "0.2s",
    },
  }),
  logo: css({
    fontWeight: 800,
    fontSize: { base: "1rem", md: "1.2rem" },
    "& span": { color: "{colors.accent}" },
  }),
  main: css({
    display: "flex",
    flex: 1,
    overflow: "hidden",
    position: "relative",
  }),
  mainContent: css({
    flex: 1,
    width: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  }),
  backdrop: css({
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 15,
    display: { base: "block", md: "none" },
    backdropFilter: "blur(2px)",
  }),
  footer: css({
    display: { base: "none", md: "flex" },
    justifyContent: "flex-end",
    padding: "{spacing.sm} {spacing.xl}",
    fontSize: "0.7rem",
    color: "{colors.textSubtle}",
    borderTop: "1px solid {colors.border}",
    background: "{colors.surface}",
  }),
};

const getSidebarStyles = (isSidebarOpen) =>
  css({
    position: { base: "absolute", md: "relative" },
    zIndex: 20,
    height: "100%",
    background: "{colors.surface}",
    transform: {
      base: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
      md: "none",
    },
    display: { base: isSidebarOpen ? "block" : "none", md: "block" },
    transition: "transform 0.3s ease",
    width: { base: "280px", md: "auto" },
    borderRight: "1px solid {colors.border}",
    boxShadow: { base: "4px 0 20px rgba(0,0,0,0.5)", md: "none" },
  });

const getHamburgerSpanStyle = (isSidebarOpen, position) => {
  if (position === "top") {
    return css({
      transform: isSidebarOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
    });
  }
  if (position === "middle") {
    return css({ opacity: isSidebarOpen ? 0 : 1 });
  }
  return css({
    transform: isSidebarOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
  });
};

export default function AppShell({
  header,
  sidebar,
  main,
  footer,
  isSidebarOpen,
  setSidebarOpen,
}) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {/* Mobile Hamburger */}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className={styles.hamburger}
          >
            <span
              className={getHamburgerSpanStyle(isSidebarOpen, "top")}
            ></span>
            <span
              className={getHamburgerSpanStyle(isSidebarOpen, "middle")}
            ></span>
            <span
              className={getHamburgerSpanStyle(isSidebarOpen, "bottom")}
            ></span>
          </button>

          <div className={styles.logo}>
            Morpher<span>Pro</span>
          </div>
        </div>

        {header}
      </header>

      <main className={styles.main}>
        {/* Sidebar Container */}
        <div className={getSidebarStyles(isSidebarOpen)}>{sidebar}</div>

        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className={styles.backdrop}
          />
        )}

        <div className={styles.mainContent}>{main}</div>
      </main>

      <footer className={styles.footer}>{footer}</footer>
    </div>
  );
}
