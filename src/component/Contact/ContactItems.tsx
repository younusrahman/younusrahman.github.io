import React, { useState, useCallback } from "react";
import styles from "./ContactComponent.module.css";
import { ContactItemType } from "context/types";
import { IconType } from "react-icons";
import { motion, AnimatePresence } from "framer-motion";
import SuperAnimationModal from "component/Modal/ModalComponent";

interface ContactItemsProps {
  items: ContactItemType[];
  className?: string;
}

const ContactItems = ({ items, className }: ContactItemsProps) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [currentMapIframe, setCurrentMapIframe] = useState("");

  // Animation variants (keep your existing variants)

  const cleanTextForCopy = (htmlString: string) => {
    const temp = document.createElement("div");
    temp.innerHTML = htmlString;
    return temp.textContent || temp.innerText || "".replace(/\s+/g, " ").trim();
  };

  const handleItemClick = useCallback(
    async (item: ContactItemType) => {
      // Copy to clipboard
      const copyText = cleanTextForCopy(
        item.hiddenCopyValue || item.displayValue
      );

      try {
        await navigator.clipboard.writeText(copyText);
        setCopiedItem(item.label);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }

      // Handle specific actions
      if (item.type === "email") {
        window.location.href = item.href;
      } else if (item.type === "address" && item.mapIframe) {
        setCurrentMapIframe(item.mapIframe);
        setShowMapModal(true);
      }
    },
    [cleanTextForCopy]
  );

  const closeModal = useCallback(() => {
    setShowMapModal(false);
    // Optional: Clear iframe when closing
    setTimeout(() => setCurrentMapIframe(""), 300); // Match modal close duration
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      y: -5,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const iconVariants = {
    hover: {
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 2,
      rotate: [0, 10, -10, 0],
    },
  };

  

  const messageVariants = {
    // Correctly spelled
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <motion.div
        className={`${styles.row} ${styles["top-items"]} ${className}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            className={`blurBackground ${styles["contact-item"]}`}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleItemClick(item)}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <div className={`${styles["contact-item-inner"]}`}>
              <motion.div
                variants={iconVariants}
                style={{
                  fontSize: "2.5rem",
                  color: "var(--dynamic-match-bg-img-color)",
                }}
              >
                {item.icon && <item.icon />}
              </motion.div>

              <motion.p className={styles["contact-item-label"]}>
                {item.label}
              </motion.p>

              <div
                className={styles["contact-item-value"]}
                dangerouslySetInnerHTML={{ __html: item.displayValue }}
              />

              <AnimatePresence>
                {showMessage && copiedItem === item.label && (
                  <motion.div
                    className={styles.copyMessage}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={messageVariants}
                  >
                    ✓ Copied to clipboard!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <SuperAnimationModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        animation={{ type: "scale", duration: 0.3 }}
        overlayAnimation={{ type: "fade", duration: 0.3 }}
        closeOnOverlayClick={true}
      >
        {currentMapIframe && (
          <div dangerouslySetInnerHTML={{ __html: currentMapIframe }} />
        )}
      </SuperAnimationModal>
    </>
  );
};

export default React.memo(ContactItems);
