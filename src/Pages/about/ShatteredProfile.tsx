import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import styles from "./ShatterredProfile.module.css";

interface ShatteredProfileProps {
  image: string;
  color: string;
  className?: string;
}

export const ShatteredProfile = ({
  image,
  color,
  className,
}: ShatteredProfileProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.8]);

  // Reconstruction animation
  useEffect(() => {
    if (isInView) {
      const animateFragments = async () => {
        await Promise.all([
          animate(
            "#fragment1",
            { x: 0, y: 0, rotate: 0 },
            { delay: 0.2, type: "spring" }
          ),
          animate(
            "#fragment2",
            { x: 0, y: 0, rotate: 0 },
            { delay: 0.4, type: "spring" }
          ),
          animate(
            "#fragment3",
            { x: 0, y: 0, rotate: 0 },
            { delay: 0.6, type: "spring" }
          ),
        ]);
      };
      animateFragments();
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className={`${styles.container} ${className || ""}`}
      style={{ opacity }}
    >
      <img
        src={image}
        className={styles.fullImage}
        alt="Profile"
        aria-hidden="true"
      />

      {/* Fragment 1 - Top Left */}
      <motion.div
        id="fragment1"
        className={styles.fragment}
        style={{
          y: y1,
          backgroundImage: `url(${image})`,
          backgroundPosition: "0% 0%",
        }}
        initial={{ x: -100, y: -50, rotate: -15, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
      />

      {/* Fragment 2 - Top Right */}
      <motion.div
        id="fragment2"
        className={styles.fragment}
        style={{
          y: y2,
          backgroundImage: `url(${image})`,
          backgroundPosition: "100% 0%",
        }}
        initial={{ x: 100, y: -50, rotate: 15, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
      />

      {/* Fragment 3 - Bottom Left */}
      <motion.div
        id="fragment3"
        className={styles.fragment}
        style={{
          y: y3,
          backgroundImage: `url(${image})`,
          backgroundPosition: "0% 100%",
        }}
        initial={{ x: -50, y: 80, rotate: -10, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
      />

      {/* Particle Reconstruction Effect */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={styles.particle}
          style={{ backgroundColor: color }}
          initial={{
            opacity: 0,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            x: 0,
            y: 0,
            transition: {
              delay: i * 0.02,
              duration: 1.5,
              ease: "circOut",
            },
          }}
        />
      ))}
    </motion.div>
  );
};
