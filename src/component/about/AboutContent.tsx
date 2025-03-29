import React from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "@tanstack/react-router";
import yrimage from "assets/images/YRprofile-pic.png";
import { ThemeColor } from "context/types";
import { ProfilePicture } from "./ProfilePicture";
import { aboutContentData } from "Pages/about/data";
import { MoreAboutButton } from "Pages/about/MoreAboutButton";

interface AboutContentProps {
  styles: {
    [key: string]: string;
  };
  color: ThemeColor;
  children?: React.ReactNode;
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const floatingAnimation = {
  y: [-10, 10],
  transition: {
    y: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 3,
      ease: "easeInOut",
    },
  },
};

const linkHoverVariants: Variants = {
  hover: {
    scale: 1.05,
    textShadow: "0 0 10px currentColor",
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};

export const AboutContent: React.FC<AboutContentProps> = ({
  color,
  children,
  styles,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      ref={ref}
      className={styles.section}
      variants={containerVariants}
    >
      <motion.p
        className={`${styles.overColor} ${styles.p}`}
        style={{ fontSize: "1.3rem" }}
        variants={textVariants}
      >
        <motion.span
          style={{
            fontSize: "1.3rem",
            fontWeight: "bold",
            color: color,
            display: "inline-block",
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 4,
          }}
        >
          {aboutContentData.introduction.greeting}
        </motion.span>
        {aboutContentData.introduction.content}
      </motion.p>

      <div className={styles.wrap} style={{ borderColor: color }}>
        <div className={styles.col1}>
          <motion.div animate={floatingAnimation}>
            <ProfilePicture yrimage={yrimage} styles={styles} />
          </motion.div>

          <div className={styles.inner}>
            {aboutContentData.sections
              .filter((section) => section.alignment === "left")
              .map((section, index) => (
                <motion.div key={`left-${index}`} variants={containerVariants}>
                  <motion.h2
                    className={`${styles.h2}`}
                    style={{
                      color,
                      whiteSpace: "nowrap", // Prevent wrapping
                      fontSize: "clamp(1.5rem, 4vw, 2rem)", // Responsive font size with minimum and maximum
                    }}
                    variants={textVariants}
                  >
                    {section.title.split("").map((char, i) => (
                      <motion.span
                        key={`char-${i}`}
                        style={{ display: "inline-block" }}
                        custom={i}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: (i) => ({
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: i * 0.05,
                              duration: 0.5,
                            },
                          }),
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.h2>
                  <motion.p className={`${styles.p}`} variants={textVariants}>
                    {section.content}
                  </motion.p>
                </motion.div>
              ))}
          </div>
        </div>

        <div className={styles.col2}>
          <motion.div
            className={styles.img}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.5,
                type: "spring",
                damping: 10,
              },
            }}
            whileHover={{ scale: 1.03 }}
          />

          <div className={styles.inner}>
            {aboutContentData.sections
              .filter((section) => section.alignment === "right")
              .map((section, index) => (
                <motion.div key={`right-${index}`} variants={containerVariants}>
                  <motion.h2
                    className={`${styles.h2}`}
                    style={{
                      color,
                      textAlign:
                        section.alignment as React.CSSProperties["textAlign"],
                      whiteSpace: "nowrap", // Prevent wrapping
                      fontSize: "clamp(1.5rem, 4vw, 2rem)", // Responsive font size with minimum and maximum
                    }}
                    variants={textVariants}
                  >
                    {section.title}
                  </motion.h2>
                  <motion.p
                    className={`${styles.p}`}
                    style={{
                      textAlign:
                        section.alignment as React.CSSProperties["textAlign"],
                    }}
                    variants={textVariants}
                  >
                    {section.content}
                  </motion.p>
                </motion.div>
              ))}

            <motion.div className={styles.goTo} whileHover={{ scale: 1.02 }}>
              <Link
                to={aboutContentData.link.to}
                className={styles.goToLink}
                id="about-page"
              >
                <MoreAboutButton
                  color={color}
                  text="More about me"
                  to="/more"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {children}
    </motion.div>
  );
};
