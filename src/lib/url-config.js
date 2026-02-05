import LZString from "lz-string";

export const parseUrlConfig = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const config = params.get("c") || params.get("config");
    if (config) {
      let state;
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(config);
        if (decompressed) {
          state = JSON.parse(decompressed);
        }
      } catch {
        // Ignore parse error
      }
      if (!state) {
        try {
          const decoded = config.replace(/-/g, "+").replace(/_/g, "/");
          const padded = decoded + "=".repeat((4 - (decoded.length % 4)) % 4);
          state = JSON.parse(atob(padded));
        } catch (e) {
          console.error("Failed to parse config:", e);
        }
      }

      if (state) {
        window.history.replaceState({}, "", window.location.pathname);
        return state;
      }
    }
  } catch (e) {
    console.error("Failed to load shared config:", e);
  }
  return null;
};

export const urlConfig = parseUrlConfig();
