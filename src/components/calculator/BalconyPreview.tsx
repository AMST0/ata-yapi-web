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
    const svgWidth = 360;
    const svgHeight = 200;
    const padding = 20;

    // Calculate scale based on type
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
        const availableHeight = svgHeight - padding * 2;

        return Math.min(availableWidth / totalWidth, availableHeight / totalHeight, 0.6);
    };

    const scale = getScale();
    const gap = 3;

    const panelVariants = {
        hidden: { scaleY: 0, opacity: 0 },
        visible: (i: number) => ({
            scaleY: 1,
            opacity: 1,
            transition: reducedMotion
                ? { duration: 0 }
                : { delay: i * 0.025, duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const },
        }),
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: reducedMotion ? 0 : 0.3 } },
        exit: { opacity: 0, transition: { duration: reducedMotion ? 0 : 0.2 } },
    };

    const renderFlatBalcony = () => {
        const w = mainWidth * scale;
        const h = mainHeight * scale;
        const x = (svgWidth - w) / 2;
        const y = (svgHeight - h) / 2;
        const panels = Math.ceil(mainWidth / 55);
        const panelW = (w - gap * (panels + 1)) / panels;

        return (
            <g>
                <rect x={x} y={y} width={w} height={h} rx="3" fill="none" stroke="#374151" strokeWidth="2.5" />
                {Array.from({ length: panels }).map((_, i) => (
                    <motion.rect
                        key={i}
                        x={x + gap + i * (panelW + gap)}
                        y={y + gap}
                        width={panelW}
                        height={h - gap * 2}
                        rx="2"
                        fill="url(#glassMain)"
                        stroke="#60a5fa"
                        strokeWidth="1"
                        custom={i}
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                    />
                ))}
            </g>
        );
    };

    const renderLBalcony = () => {
        const mW = mainWidth * scale;
        const mH = mainHeight * scale;
        const lW = leftWidth * scale;
        const lH = leftHeight * scale;

        const totalW = mW + lW;
        const startX = (svgWidth - totalW) / 2;
        const startY = (svgHeight - mH) / 2;

        const mainPanels = Math.ceil(mainWidth / 55);
        const leftPanels = Math.ceil(leftWidth / 55);
        const mainPanelW = (mW - gap * (mainPanels + 1)) / mainPanels;
        const leftPanelW = (lW - gap * (leftPanels + 1)) / leftPanels;

        return (
            <g>
                {/* Main Frame */}
                <rect x={startX} y={startY} width={mW} height={mH} rx="3" fill="none" stroke="#374151" strokeWidth="2.5" />
                {/* Left Side Frame */}
                <rect x={startX + mW - 1} y={startY + mH - lH} width={lW} height={lH} rx="3" fill="none" stroke="#374151" strokeWidth="2.5" />

                {/* Main Panels */}
                {Array.from({ length: mainPanels }).map((_, i) => (
                    <motion.rect key={`m${i}`} x={startX + gap + i * (mainPanelW + gap)} y={startY + gap} width={mainPanelW} height={mH - gap * 2} rx="2" fill="url(#glassMain)" stroke="#60a5fa" strokeWidth="1" custom={i} variants={panelVariants} initial="hidden" animate="visible" />
                ))}
                {/* Left Side Panels */}
                {Array.from({ length: leftPanels }).map((_, i) => (
                    <motion.rect key={`l${i}`} x={startX + mW + gap + i * (leftPanelW + gap)} y={startY + mH - lH + gap} width={leftPanelW} height={lH - gap * 2} rx="2" fill="url(#glassLeft)" stroke="#34d399" strokeWidth="1" custom={i + mainPanels} variants={panelVariants} initial="hidden" animate="visible" />
                ))}
            </g>
        );
    };

    const renderUBalcony = () => {
        const mW = mainWidth * scale;
        const mH = mainHeight * scale;
        const lW = leftWidth * scale;
        const lH = leftHeight * scale;
        const rW = rightWidth * scale;
        const rH = rightHeight * scale;

        const totalW = lW + mW + rW;
        const startX = (svgWidth - totalW) / 2;
        const startY = (svgHeight - mH) / 2;

        const mainPanels = Math.ceil(mainWidth / 55);
        const leftPanels = Math.ceil(leftWidth / 55);
        const rightPanels = Math.ceil(rightWidth / 55);

        const mainPanelW = (mW - gap * (mainPanels + 1)) / mainPanels;
        const leftPanelW = (lW - gap * (leftPanels + 1)) / leftPanels;
        const rightPanelW = (rW - gap * (rightPanels + 1)) / rightPanels;

        return (
            <g>
                {/* Left Side Frame */}
                <rect x={startX} y={startY + mH - lH} width={lW} height={lH} rx="3" fill="none" stroke="#374151" strokeWidth="2.5" />
                {/* Main Frame */}
                <rect x={startX + lW - 1} y={startY} width={mW} height={mH} rx="3" fill="none" stroke="#374151" strokeWidth="2.5" />
                {/* Right Side Frame */}
                <rect x={startX + lW + mW - 2} y={startY + mH - rH} width={rW} height={rH} rx="3" fill="none" stroke="#374151" strokeWidth="2.5" />

                {/* Left Panels */}
                {Array.from({ length: leftPanels }).map((_, i) => (
                    <motion.rect key={`l${i}`} x={startX + gap + i * (leftPanelW + gap)} y={startY + mH - lH + gap} width={leftPanelW} height={lH - gap * 2} rx="2" fill="url(#glassLeft)" stroke="#34d399" strokeWidth="1" custom={i} variants={panelVariants} initial="hidden" animate="visible" />
                ))}
                {/* Main Panels */}
                {Array.from({ length: mainPanels }).map((_, i) => (
                    <motion.rect key={`m${i}`} x={startX + lW + gap + i * (mainPanelW + gap)} y={startY + gap} width={mainPanelW} height={mH - gap * 2} rx="2" fill="url(#glassMain)" stroke="#60a5fa" strokeWidth="1" custom={i + leftPanels} variants={panelVariants} initial="hidden" animate="visible" />
                ))}
                {/* Right Panels */}
                {Array.from({ length: rightPanels }).map((_, i) => (
                    <motion.rect key={`r${i}`} x={startX + lW + mW + gap + i * (rightPanelW + gap)} y={startY + mH - rH + gap} width={rightPanelW} height={rH - gap * 2} rx="2" fill="url(#glassRight)" stroke="#a78bfa" strokeWidth="1" custom={i + leftPanels + mainPanels} variants={panelVariants} initial="hidden" animate="visible" />
                ))}
            </g>
        );
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="flex items-center justify-center w-full h-full">
            <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="max-w-full max-h-[200px]" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="glassMain" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="glassLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="glassRight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
                {type === "flat" && renderFlatBalcony()}
                {type === "L" && renderLBalcony()}
                {type === "U" && renderUBalcony()}
            </svg>
        </motion.div>
    );
}
