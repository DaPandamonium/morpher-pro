import React from "react";
import ReactDOM from "react-dom/client";

/**
 * Normalizes SVG path data to absolute coordinates.
 */
function absolutizePath(d) {
  if (!d) return "";

  const tokens = d.match(/[a-df-z]|[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/gi);
  if (!tokens) return "";

  let currentX = 0;
  let currentY = 0;
  let startX = 0;
  let startY = 0;
  let result = [];
  let cmdIndex = 0;

  while (cmdIndex < tokens.length) {
    const cmd = tokens[cmdIndex];
    const isCmd = /^[a-df-z]$/i.test(cmd);

    if (!isCmd) {
      cmdIndex++;
      continue;
    }

    const type = cmd.toLowerCase();
    const isRelative = cmd === type;
    cmdIndex++;

    switch (type) {
      case "m": {
        let first = true;
        while (
          cmdIndex + 1 < tokens.length &&
          !/^[a-df-z]$/i.test(tokens[cmdIndex])
        ) {
          const x = parseFloat(tokens[cmdIndex++]);
          const y = parseFloat(tokens[cmdIndex++]);

          if (isRelative) {
            currentX += x;
            currentY += y;
          } else {
            currentX = x;
            currentY = y;
          }

          if (first) {
            startX = currentX;
            startY = currentY;
            result.push(`M${currentX} ${currentY}`);
            first = false;
          } else {
            result.push(`L${currentX} ${currentY}`);
          }
        }
        break;
      }
      case "l": {
        while (
          cmdIndex + 1 < tokens.length &&
          !/^[a-df-z]$/i.test(tokens[cmdIndex])
        ) {
          const x = parseFloat(tokens[cmdIndex++]);
          const y = parseFloat(tokens[cmdIndex++]);
          if (isRelative) {
            currentX += x;
            currentY += y;
          } else {
            currentX = x;
            currentY = y;
          }
          result.push(`L${currentX} ${currentY}`);
        }
        break;
      }
      case "h": {
        while (
          cmdIndex < tokens.length &&
          !/^[a-df-z]$/i.test(tokens[cmdIndex])
        ) {
          const x = parseFloat(tokens[cmdIndex++]);
          if (isRelative) {
            currentX += x;
          } else {
            currentX = x;
          }
          result.push(`L${currentX} ${currentY}`);
        }
        break;
      }
      case "v": {
        while (
          cmdIndex < tokens.length &&
          !/^[a-df-z]$/i.test(tokens[cmdIndex])
        ) {
          const y = parseFloat(tokens[cmdIndex++]);
          if (isRelative) {
            currentY += y;
          } else {
            currentY = y;
          }
          result.push(`L${currentX} ${currentY}`);
        }
        break;
      }
      case "c": {
        while (
          cmdIndex + 5 < tokens.length &&
          !/^[a-df-z]$/i.test(tokens[cmdIndex])
        ) {
          let x1 = parseFloat(tokens[cmdIndex++]);
          let y1 = parseFloat(tokens[cmdIndex++]);
          let x2 = parseFloat(tokens[cmdIndex++]);
          let y2 = parseFloat(tokens[cmdIndex++]);
          let x = parseFloat(tokens[cmdIndex++]);
          let y = parseFloat(tokens[cmdIndex++]);

          if (isRelative) {
            x1 += currentX;
            y1 += currentY;
            x2 += currentX;
            y2 += currentY;
            x += currentX;
            y += currentY;
          }
          currentX = x;
          currentY = y;
          result.push(`C${x1} ${y1} ${x2} ${y2} ${x} ${y}`);
        }
        break;
      }
      case "s": {
        while (
          cmdIndex + 3 < tokens.length &&
          !/^[a-df-z]$/i.test(tokens[cmdIndex])
        ) {
          let x2 = parseFloat(tokens[cmdIndex++]);
          let y2 = parseFloat(tokens[cmdIndex++]);
          let x = parseFloat(tokens[cmdIndex++]);
          let y = parseFloat(tokens[cmdIndex++]);

          if (isRelative) {
            x2 += currentX;
            y2 += currentY;
            x += currentX;
            y += currentY;
          }
          currentX = x;
          currentY = y;
          result.push(`S${x2} ${y2} ${x} ${y}`);
        }
        break;
      }
      case "q": {
        while (
          cmdIndex + 3 < tokens.length &&
          !/^[a-df-z]$/i.test(tokens[cmdIndex])
        ) {
          let x1 = parseFloat(tokens[cmdIndex++]);
          let y1 = parseFloat(tokens[cmdIndex++]);
          let x = parseFloat(tokens[cmdIndex++]);
          let y = parseFloat(tokens[cmdIndex++]);

          if (isRelative) {
            x1 += currentX;
            y1 += currentY;
            x += currentX;
            y += currentY;
          }
          currentX = x;
          currentY = y;
          result.push(`Q${x1} ${y1} ${x} ${y}`);
        }
        break;
      }
      case "t": {
        while (
          cmdIndex + 1 < tokens.length &&
          !/^[a-df-z]$/i.test(tokens[cmdIndex])
        ) {
          let x = parseFloat(tokens[cmdIndex++]);
          let y = parseFloat(tokens[cmdIndex++]);

          if (isRelative) {
            x += currentX;
            y += currentY;
          }
          currentX = x;
          currentY = y;
          result.push(`T${x} ${y}`);
        }
        break;
      }
      case "a": {
        while (
          cmdIndex + 6 < tokens.length &&
          !/^[a-df-z]$/i.test(tokens[cmdIndex])
        ) {
          const rx = tokens[cmdIndex++];
          const ry = tokens[cmdIndex++];
          const rot = tokens[cmdIndex++];
          const large = tokens[cmdIndex++];
          const sweep = tokens[cmdIndex++];
          let x = parseFloat(tokens[cmdIndex++]);
          let y = parseFloat(tokens[cmdIndex++]);

          if (isRelative) {
            x += currentX;
            y += currentY;
          }
          currentX = x;
          currentY = y;
          result.push(`A${rx} ${ry} ${rot} ${large} ${sweep} ${x} ${y}`);
        }
        break;
      }
      case "z": {
        currentX = startX;
        currentY = startY;
        result.push("Z");
        break;
      }
    }
  }
  return result.join(" ");
}

/**
 * Extracts path data from an SVG element by parsing all child shapes.
 * @param {SVGElement} svg - The SVG element to extract paths from
 * @returns {string} Combined path data
 */
function extractPathsFromSVG(svg) {
  const elements = Array.from(
    svg.querySelectorAll(
      "path, circle, rect, line, polyline, polygon, ellipse",
    ),
  );

  return elements
    .map((el) => {
      const tag = el.tagName.toLowerCase();
      let d = "";

      if (tag === "path") {
        d = el.getAttribute("d") || "";
      } else if (tag === "line") {
        const x1 = el.getAttribute("x1");
        const y1 = el.getAttribute("y1");
        const x2 = el.getAttribute("x2");
        const y2 = el.getAttribute("y2");
        d = `M${x1} ${y1}L${x2} ${y2}`;
      } else if (tag === "rect") {
        const x = parseFloat(el.getAttribute("x") || 0);
        const y = parseFloat(el.getAttribute("y") || 0);
        const w = parseFloat(el.getAttribute("width") || 0);
        const h = parseFloat(el.getAttribute("height") || 0);
        d = `M${x} ${y}h${w}v${h}h${-w}Z`;
      } else if (tag === "circle" || tag === "ellipse") {
        const cx = parseFloat(el.getAttribute("cx") || 0);
        const cy = parseFloat(el.getAttribute("cy") || 0);
        const rx =
          tag === "circle"
            ? parseFloat(el.getAttribute("r") || 0)
            : parseFloat(el.getAttribute("rx") || 0);
        const ry =
          tag === "circle" ? rx : parseFloat(el.getAttribute("ry") || 0);
        d = `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`;
      } else if (tag === "polyline" || tag === "polygon") {
        const points = el.getAttribute("points").trim().split(/\s+|,/);
        for (let i = 0; i < points.length; i += 2) {
          d += `${i === 0 ? "M" : "L"}${points[i]} ${points[i + 1]}`;
        }
        if (tag === "polygon") d += "Z";
      }

      return absolutizePath(d);
    })
    .filter(Boolean)
    .join(" ");
}

/**
 * Extracts SVG path data from a React icon component. *
 * @param {React.ComponentType} IconComponent - The icon component to extract from
 * @param {object} props - Props to pass to the icon component (e.g., { size: 24 })
 * @returns {Promise<string|null>} The combined path data or null if extraction fails
 */
export function extractIconPath(IconComponent, props = { size: 24 }) {
  return new Promise((resolve) => {
    if (!IconComponent) {
      resolve(null);
      return;
    }

    const container = document.createElement("div");
    container.style.cssText =
      "position:absolute;opacity:0;pointer-events:none;";
    document.body.appendChild(container);
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(IconComponent, props));

    setTimeout(() => {
      const svg = container.querySelector("svg");

      if (svg) {
        const pathData = extractPathsFromSVG(svg);
        resolve(pathData || null);
      } else {
        resolve(null);
      }

      root.unmount();
      document.body.removeChild(container);
    }, 50);
  });
}

/**
 * @deprecated  extractIconPath instead
 */
export async function extractLucideIconPath(iconName) {
  const icons = await import("lucide-react");
  const Icon = icons[iconName];
  return Icon ? extractIconPath(Icon, { size: 24 }) : null;
}
