"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
    value: number;
    decimals?: number;
    reducedMotion: boolean;
    className?: string;
}

export default function AnimatedNumber({
    value,
    decimals = 0,
    reducedMotion,
    className = "",
}: AnimatedNumberProps) {
    const spring = useSpring(value, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const display = useTransform(spring, (current) =>
        current.toFixed(decimals)
    );

    const displayRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!reducedMotion) {
            spring.set(value);
        }
    }, [value, reducedMotion, spring]);

    useEffect(() => {
        if (!reducedMotion && displayRef.current) {
            const unsubscribe = display.on("change", (v) => {
                if (displayRef.current) {
                    displayRef.current.textContent = parseFloat(v).toFixed(decimals);
                }
            });
            return () => unsubscribe();
        }
    }, [display, reducedMotion, decimals]);

    if (reducedMotion) {
        return (
            <span className={className}>
                {value.toFixed(decimals)}
            </span>
        );
    }

    return (
        <motion.span className={className}>
            <span ref={displayRef}>{value.toFixed(decimals)}</span>
        </motion.span>
    );
}
