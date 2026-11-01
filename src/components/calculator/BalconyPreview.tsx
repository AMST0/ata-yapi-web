"use client";

import { motion } from "framer-motion";

interface BalconyPreviewProps {
  mainWidth: number;
  mainHeight: number;
  leftWidth: number;
  leftHeight: number;
  rightWidth: number;
  rightHeight: number;
  type: "flat" | "L" | "U";
  reducedMotion: boolean;
}

export default function BalconyPreview({
  mainWidth,
  mainHeight,
  leftWidth,
  leftHeight,
  rightWidth,
  rightHeight,
  type,
  reducedMotion,
}: BalconyPreviewProps) {
  const svgWidth = 420;
  const svgHeight = 220;
  const padding = 28;

  const getScale = () => {
    let totalWidth = mainWidth;
    let totalHeight = mainHeight;

    if (type === "L") {
      totalWidth = mainWidth + leftWidth;
      totalHeight = Math.max(mainHeight, leftHeight);
    } else if (type === "U") {
      totalWidth = leftWidth + mainWidth + rightWidth;
      totalHeight = Math.max(mainHeight, leftHeight, rightHeight);
    }

    const availableWidth = svgWidth - padding * 2;
    const availableHeight = svgHeight - padding * 2 - 14;

    return Math.min(availableWidth / totalWidth, availableHeight / totalHeight, 0.62);
  };

  const scale = getScale();
  const gap = 2.5;

  const panelVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: (i: number) => ({
      scaleY: 1,
      opacity: 1,
      transition: reducedMotion
        ? { duration: 0 }
        : { delay: i * 0.02, duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
  };

  const renderSection = (
    x: number,
    y: number,
    w: number,
    h: number,
    realWidthCm: number,
    keyPrefix: string,
    offsetIndex: number,
    isAccent = false
  ) => {
    const panels = Math.max(1, Math.ceil(realWidthCm / 55));
    const panelW = Math.max(4, (w - gap * (panels + 1)) / panels);

    return (
      <g key={keyPrefix}>
        {/* Anodized Aluminum Outer Frame */}
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx="2"
          fill="#f8fafc"
          stroke={isAccent ? "#334155" : "#0f172a"}
          strokeWidth="2.5"
        />
        {/* Top & Bottom Rail */}
        <line x1={x} y1={y + 4} x2={x + w} y2={y + 4} stroke="#475569" strokeWidth="1" />
        <line x1={x} y1={y + h - 4} x2={x + w} y2={y + h - 4} stroke="#475569" strokeWidth="1" />

        {/* Tempered Glass Panels */}
        {Array.from({ length: panels }).map((_, i) => {
          const px = x + gap + i * (panelW + gap);
          const py = y + 5;
          const ph = Math.max(6, h - 10);
          return (
            <g key={`${keyPrefix}-${i}`}>
              <motion.rect
                x={px}
                y={py}
                width={panelW}
                height={ph}
                rx="1"
                fill={isAccent ? "url(#archGlassSide)" : "url(#archGlassMain)"}
                stroke="#64748b"
                strokeWidth="0.9"
                custom={offsetIndex + i}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
              />
              {/* Specular Glazing Reflection */}
              <line
                x1={px + panelW * 0.28}
                y1={py + ph * 0.18}
                x2={px + panelW * 0.72}
                y2={py + ph * 0.82}
                stroke="#ffffff"
                strokeOpacity="0.65"
                strokeWidth="1"
              />
            </g>
          );
        })}

        {/* Technical Dimension Readout */}
        <text
          x={x + w / 2}
          y={y + h + 15}
          textAnchor="middle"
          fill="#475569"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="600"
        >
          {realWidthCm} cm
        </text>
      </g>
    );
  };

  const renderGeometry = () => {
    if (type === "flat") {
      const w = mainWidth * scale;
      const h = mainHeight * scale;
      const x = (svgWidth - w) / 2;
      const y = (svgHeight - h - 10) / 2;
      return renderSection(x, y, w, h, mainWidth, "flat", 0);
    }

    if (type === "L") {
      const mW = mainWidth * scale;
      const mH = mainHeight * scale;
      const lW = leftWidth * scale;
      const lH = leftHeight * scale;
      const totalW = mW + lW;
      const startX = (svgWidth - totalW) / 2;
      const maxH = Math.max(mH, lH);
      const baseY = (svgHeight - maxH - 10) / 2 + maxH;
      const mainCount = Math.ceil(mainWidth / 55);

      return (
        <g>
          {renderSection(startX, baseY - mH, mW, mH, mainWidth, "main", 0)}
          {renderSection(startX + mW + 2, baseY - lH, lW, lH, leftWidth, "side", mainCount, true)}
        </g>
      );
    }

    const mW = mainWidth * scale;
    const mH = mainHeight * scale;
    const lW = leftWidth * scale;
    const lH = leftHeight * scale;
    const rW = rightWidth * scale;
    const rH = rightHeight * scale;
    const totalW = lW + mW + rW + 4;
    const startX = (svgWidth - totalW) / 2;
    const maxH = Math.max(mH, lH, rH);
    const baseY = (svgHeight - maxH - 10) / 2 + maxH;
    const leftCount = Math.ceil(leftWidth / 55);
    const mainCount = Math.ceil(mainWidth / 55);

    return (
      <g>
        {renderSection(startX, baseY - lH, lW, lH, leftWidth, "left", 0, true)}
        {renderSection(startX + lW + 2, baseY - mH, mW, mH, mainWidth, "main", leftCount)}
        {renderSection(
          startX + lW + mW + 4,
          baseY - rH,
          rW,
          rH,
          rightWidth,
          "right",
          leftCount + mainCount,
          true
        )}
      </g>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
      className="flex items-center justify-center w-full h-full"
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="max-w-full max-h-[220px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="archGlassMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="archGlassSide" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        {renderGeometry()}
      </svg>
    </motion.div>
  );
}
