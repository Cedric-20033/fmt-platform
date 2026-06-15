"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  from?: Direction;
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
  children: React.ReactNode;
}

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up:    { x: 0,  y: 1  },
  down:  { x: 0,  y: -1 },
  left:  { x: 1,  y: 0  },
  right: { x: -1, y: 0  },
  none:  { x: 0,  y: 0  },
};

export function Reveal({
  from = "up",
  duration = 0.5,
  delay = 0,
  distance = 40,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { x, y } = OFFSET[from];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: x * distance, y: y * distance }}
      animate={visible ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}