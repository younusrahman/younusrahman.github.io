import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { MdMargin } from "react-icons/md";

interface AnimatedHeaderProps {
  title: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  // NEW: Positioning props
  position?: "fixed" | "absolute" | "relative";
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: number;
}

const useViewport = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  title,
  color = "#3b82f6",
  size = "md",
  // NEW: Default positioning values
  position = "relative",
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
  zIndex = "auto",
}) => {
  const { width } = useViewport();
  const isSmallScreen = width < 900;

  const sizeMap = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20, x: -10 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  const underlineVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const dotVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 2,
      transition: {
        delay: 0.6 + i * 0.1,
        type: "spring",
        stiffness: 150,
      },
    }),
  };

  if (!isSmallScreen) return null;

  return (
    <motion.div
      exit={{ opacity: 0, y: -20 }}
      className="mb-6 w-full max-w-[899px] px-4"
      style={{
        position, // "fixed", "absolute", or "relative"
        top,
        left,
        right,
        bottom,
        zIndex,
      }}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center">
        {[
          "#d35400", // Orange
          "#00cec9", // Turquoise
          "#16a085", // Green
          "#2eb1ed", // Blue
          "#ECD596", // Beige
        ].map((color, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-current mr-2"
            style={{ color }}
            variants={dotVariants}
            custom={i}
          />
        ))}
        <motion.h2
          className={`${sizeMap[size]} font-bold tracking-tight mr-2`}
          variants={headerVariants}
          style={{ color, paddingLeft: "25%", fontSize: "9vw" }}
        >
          {title}
        </motion.h2>
      </div>
      <motion.div
        className="h-2 mt-1"
        style={{ backgroundColor: color }}
        variants={underlineVariants}
      />
    </motion.div>
  );
};

export default AnimatedHeader;
