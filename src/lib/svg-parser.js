const extractAttrs = (tagString) => {
  const attrs = {};
  const regex = /([a-zA-Z0-9:-]+)\s*=\s*(?:["']([^"']*)["'])/g;
  let match;
  while ((match = regex.exec(tagString)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
};

const converters = {
  circle: (attrs) => {
    const cx = parseFloat(attrs.cx || 0);
    const cy = parseFloat(attrs.cy || 0);
    const r = parseFloat(attrs.r || 0);
    return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy}`;
  },
  rect: (attrs) => {
    const x = parseFloat(attrs.x || 0);
    const y = parseFloat(attrs.y || 0);
    const w = parseFloat(attrs.width || 0);
    const h = parseFloat(attrs.height || 0);
    const radius = parseFloat(attrs.rx || attrs.ry || 0);

    if (radius === 0) {
      return `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`;
    }

    const r = radius;
    return `M ${x + r} ${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} V ${y + h - r} A ${r} ${r} 0 0 1 ${x + w - r} ${y + h} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + h - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`;
  },
  line: (attrs) => {
    return `M ${attrs.x1} ${attrs.y1} L ${attrs.x2} ${attrs.y2}`;
  },
  polyline: (attrs) => {
    if (!attrs.points) return "";
    const points = attrs.points.trim().split(/\s+|,/);
    let d = "";
    for (let i = 0; i < points.length; i += 2) {
      const px = points[i];
      const py = points[i + 1];
      if (px !== undefined && py !== undefined) {
        d += `${i === 0 ? "M" : "L"} ${px} ${py} `;
      }
    }
    return d.trim();
  },
  polygon: (attrs) => {
    const d = converters.polyline(attrs);
    return d ? d + " Z" : "";
  },
};

export const parseSVG = (svgString) => {
  const results = {
    paths: [],
    viewBox: null,
    isStroke: false,
    detectedType: "unknown",
  };

  const cleanSVG = svgString.replace(/\n/g, " ").replace(/\s+/g, " ");

  const vbMatch = cleanSVG.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  if (vbMatch && vbMatch[1]) {
    results.viewBox = vbMatch[1];
  }

  if (
    (cleanSVG.includes("stroke=") && cleanSVG.includes('fill="none"')) ||
    cleanSVG.includes("stroke-width")
  ) {
    results.isStroke = true;
  }

  const matchTags = (tagName, processor) => {
    const regex = new RegExp(`<${tagName}([^>]+)\\/?>`, "gi");
    let match;
    while ((match = regex.exec(cleanSVG)) !== null) {
      const attrs = extractAttrs(match[1]);
      let pathData = processor(attrs);
      pathData = pathData.trim();
      if (pathData.startsWith("m")) {
        const numberPattern = /-?[\d.]+(?:e[-+]?\d+)?/gi;
        numberPattern.lastIndex = 0;

        const first = numberPattern.exec(pathData);
        const second = numberPattern.exec(pathData);

        if (first && second) {
          const restIndex = numberPattern.lastIndex;
          const rest = pathData.slice(restIndex).trim();
          const x = first[0];
          const y = second[0];

          if (rest.length > 0) {
            pathData = `M ${x} ${y} l ${rest}`;
          } else {
            pathData = `M ${x} ${y}`;
          }
        } else {
          pathData = "M" + pathData.slice(1);
        }
      }
      if (pathData) {
        const moveMatch = pathData.match(/M\s*(-?\d+\.?\d*)\s*(-?\d+\.?\d*)/i);
        let x = 0,
          y = 0;
        if (moveMatch) {
          x = parseFloat(moveMatch[1]);
          y = parseFloat(moveMatch[2]);
        }
        results.paths.push({ d: pathData, x, y });
      }
    }
  };

  matchTags("path", (attrs) => attrs.d);
  matchTags("circle", converters.circle);
  matchTags("rect", converters.rect);
  matchTags("line", converters.line);
  matchTags("polyline", converters.polyline);
  matchTags("polygon", converters.polygon);

  results.paths.sort((a, b) => {
    const yDiff = a.y - b.y;
    if (Math.abs(yDiff) > 0.5) return yDiff;
    return a.x - b.x;
  });

  return {
    combinedPath: results.paths.map((p) => p.d).join(" "),
    viewBox: results.viewBox,
    isStroke: results.isStroke,
  };
};
