'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
    MotionStyle,
    SpringOptions,
} from 'framer-motion';

type TiltProps = {
    children: React.ReactNode;
    className?: string;
    style?: MotionStyle;
    rotationFactor?: number;
    isRevese?: boolean;
    springOptions?: SpringOptions;
};

export function Tilt({
    children,
    className,
    style,
    rotationFactor = 15,
    isRevese = false,
    springOptions,
}: TiltProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsEnabled(!mql.matches && !touch);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, springOptions);
    const ySpring = useSpring(y, springOptions);

    const rotateX = useTransform(
        ySpring,
        [-0.5, 0.5],
        isRevese
            ? [rotationFactor, -rotationFactor]
            : [-rotationFactor, rotationFactor]
    );
    const rotateY = useTransform(
        xSpring,
        [-0.5, 0.5],
        isRevese
            ? [-rotationFactor, rotationFactor]
            : [rotationFactor, -rotationFactor]
    );

    const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || !isEnabled) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPos = mouseX / width - 0.5;
        const yPos = mouseY / height - 0.5;

        x.set(xPos);
        y.set(yPos);
    };

    const handleMouseLeave = () => {
        if (!isEnabled) return;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                transformStyle: 'preserve-3d',
                ...style,
                transform: isEnabled ? transform : undefined,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
}
