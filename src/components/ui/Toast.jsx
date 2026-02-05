import React, { useState, useCallback } from "react";
import { css } from "../../../styled-system/css";
import { ToastContext } from "./ToastContext";

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500); // 4.5s duration
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={css({
            position: "fixed",
            top: "80px",
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingLeft: { base: "0", md: "300px" }, // Offset center by sidebar width on desktop
            zIndex: 9999,
            pointerEvents: "none", // Allow clicks to pass through the wrapper
          })}
        >
          <div
            className={css({
              pointerEvents: "auto",
              background: "#0a0a0a",
              border: "1px solid token(colors.accent)",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              animation: "slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            })}
          >
            <span className={css({ color: "token(colors.accent)" })}>✓</span>
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
