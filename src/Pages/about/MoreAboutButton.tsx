import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import styles from "./MoreAboutButton.module.css";

interface MoreAboutButtonProps {
  color: string;
  text: string;
  to: string;
}

export const MoreAboutButton = ({ color, text, to }: MoreAboutButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [buttonSize, setButtonSize] = useState(1);
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);
  const backgroundOpacity = useMotionValue(0);

  const backgroundImage = useMotionTemplate`radial-gradient(circle at 50% 50%, ${color} 0%, transparent 80%)`;

  // Elastic wobble effect
  useEffect(() => {
    if (isHovered) {
      animate(scale, [1, 1.05, 1], {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      });
      animate(rotate, [0, 5, -5, 0], {
        duration: 0.8,
        ease: "easeInOut",
      });
      animate(backgroundOpacity, [0, 0.4, 0], {
        duration: 1.5,
      });
    }
  }, [isHovered]);

  // Adjust button size based on text length
  useEffect(() => {
    const baseSize = 1;
    const maxLength = 12; // Max characters before scaling down
    const minScale = 0.7; // Minimum scale factor

    if (text.length > maxLength) {
      const scaleFactor = Math.max(minScale, maxLength / text.length);
      setButtonSize(scaleFactor);
    } else {
      setButtonSize(baseSize);
    }
  }, [text]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, type: "spring" }}
      style={{
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Link to={to} style={{ width: "100%", maxWidth: "100%" }}>
        <motion.div
          className={styles.button}
          style={
            {
              "--button-color": color,
              scale,
              rotate,
              backgroundImage,
              transformOrigin: "center",
              transform: `scale(${buttonSize})`,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "fit-content",
              maxWidth: "100%",
              margin: "0 auto",
            } as unknown as React.CSSProperties
          }
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileTap={{ scale: 0.95 * buttonSize }}
        >
          {/* Main text */}
          <motion.span
            className={styles.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "inline-block",
              maxWidth: "100%",
            }}
          >
            {text}
          </motion.span>

          {/* Floating circles */}
          <motion.div
            className={styles.circleFirst}
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              delay: 0.7,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
          />

          <motion.div
            className={styles.circleLast}
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              delay: 0.75,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
          />

          {/* Glow effect */}
          <motion.div
            className={styles.glow}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ opacity: 0.6, scale: 1.2 }}
          />

          {/* Elastic pulse effect */}
          <motion.div
            className={styles.pulse}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [1, 1.2, 1.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeOut",
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};
