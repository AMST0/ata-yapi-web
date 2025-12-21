"use client";

import { useEffect, useState } from "react";
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
    const [displayValue, setDisplayValue] = useState(value);

    const spring = useSpring(value, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const display = useTransform(spring, (current) =>
        current.toFixed(decimals)
    );

    useEffect(() => {
        if (reducedMotion) {
            setDisplayValue(value);
        } else {
            spring.set(value);
        }
    }, [value, spring, reducedMotion]);

    useEffect(() => {
        if (!reducedMotion) {
            const unsubscribe = display.on("change", (v) => {
                setDisplayValue(parseFloat(v));
            });
            return () => unsubscribe();
        }
    }, [display, reducedMotion]);

    if (reducedMotion) {
        return (
            <span className={className}>
                {value.toFixed(decimals)}
            </span>
        );
    }

    return (
        <motion.span className={className}>
            {displayValue.toFixed(decimals)}
        </motion.span>
    );
}
