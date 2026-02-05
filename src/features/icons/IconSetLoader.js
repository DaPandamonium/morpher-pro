/**
 * Icon library configuration.
 * Each entry defines metadata and a lazy loader for an icon set.
 */
export const ICON_LIBRARIES = {
  lucide: {
    name: "Lucide",
    description: "Beautiful & consistent icon toolkit",
    loader: () => import("lucide-react"),
    viewBox: "0 0 24 24",
    renderMode: "stroke",
    iconSize: 24,
  },
  md: {
    name: "Material Design",
    description: "Google Material Design icons",
    loader: () => import("react-icons/md"),
    viewBox: "0 0 24 24",
    renderMode: "fill",
    iconSize: 24,
  },
  hi: {
    name: "Heroicons",
    description: "Beautiful hand-crafted SVG icons",
    loader: () => import("react-icons/hi2"),
    viewBox: "0 0 24 24",
    renderMode: "fill",
    iconSize: 24,
  },
  bi: {
    name: "Bootstrap Icons",
    description: "Official Bootstrap icon library",
    loader: () => import("react-icons/bi"),
    viewBox: "0 0 24 24",
    renderMode: "fill",
    iconSize: 24,
  },
  fi: {
    name: "Feather",
    description: "Simply beautiful open source icons",
    loader: () => import("react-icons/fi"),
    viewBox: "0 0 24 24",
    renderMode: "stroke",
    iconSize: 24,
  },
};

const iconCache = new Map();

/**
 * @param {string} libraryKey - Key from ICON_LIBRARIES
 * @returns {Promise<{icons: Object, config: Object}>} The loaded icons and library config
 */
export async function loadIconLibrary(libraryKey) {
  const config = ICON_LIBRARIES[libraryKey];

  if (!config) {
    throw new Error(`Unknown icon library: ${libraryKey}`);
  }

  if (iconCache.has(libraryKey)) {
    return { icons: iconCache.get(libraryKey), config };
  }
  const module = await config.loader();
  let icons = {};

  if (libraryKey === "lucide") {
    icons = Object.entries(module)
      .filter(([name, value]) => {
        if (typeof value !== "object" || value === null) return false;
        const typeSymbol = value?.["$$typeof"]?.toString?.();
        if (
          !typeSymbol?.includes("forward_ref") &&
          !typeSymbol?.includes("memo")
        )
          return false;
        if (["createLucideIcon", "icons", "default"].includes(name))
          return false;
        if (name.startsWith("Lucide")) return false;
        if (!/^[A-Z]/.test(name)) return false;
        if (name.endsWith("Icon") && module[name.slice(0, -4)]) return false;
        return true;
      })
      .reduce((acc, [name, component]) => {
        acc[name] = component;
        return acc;
      }, {});
  } else {
    icons = Object.entries(module)
      .filter(([name, value]) => {
        if (typeof value !== "function") return false;
        if (!/^[A-Z]/.test(name)) return false;
        return true;
      })
      .reduce((acc, [name, component]) => {
        acc[name] = component;
        return acc;
      }, {});
  }

  console.log(
    `[IconSetLoader] Loaded ${Object.keys(icons).length} icons from ${libraryKey}`,
  );

  iconCache.set(libraryKey, icons);

  return { icons, config };
}

export function getAvailableLibraries() {
  return Object.entries(ICON_LIBRARIES).map(([key, config]) => ({
    key,
    name: config.name,
    description: config.description,
  }));
}
