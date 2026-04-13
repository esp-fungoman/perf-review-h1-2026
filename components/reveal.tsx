"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  children: React.ReactNode;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  ...props
}: RevealProps) {
  const offset = direction === "up" ? { y: 48 } : direction === "left" ? { x: -48 } : direction === "right" ? { x: 48 } : {};

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
