import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modal.module.css";

type AnimationType = "fade" | "slide" | "scale" | "flip";
type EasingType = "linear" | "easeIn" | "easeOut" | "easeInOut";

interface AnimationConfig {
  type?: AnimationType;
  duration?: number;
  easing?: EasingType;
}

interface SuperAnimationModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animation?: AnimationConfig;
  overlayAnimation?: AnimationConfig;
  closeOnOverlayClick?: boolean;
}

const SuperAnimationModal: React.FC<SuperAnimationModalProps> = ({
  isOpen,
  onClose,
  children,
  animation = { type: "fade", duration: 0.3 },
  overlayAnimation = { type: "fade", duration: 0.3 },
  closeOnOverlayClick = true,
}) => {
  const getVariants = (config: AnimationConfig) => {
    switch (config.type) {
      case "slide":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: config.duration },
          },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: config.duration },
          },
        };
      case "flip":
        return {
          hidden: { opacity: 0, rotateX: 90 },
          visible: {
            opacity: 1,
            rotateX: 0,
            transition: { duration: config.duration },
          },
        };
      default: // fade
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: config.duration } },
        };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={styles.overlay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={getVariants(overlayAnimation)}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal Content */}
          <div className={styles.modalWrapper}>
            <motion.div
              className={styles.modalContent}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={getVariants(animation)}
            >
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close modal"
              >
                &times;
              </button>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuperAnimationModal;
