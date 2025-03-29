import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import styles from "./ContactComponent.module.css";
import { useGlobalState } from "context/GlobalProvider";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {color} = useGlobalState().THEMESELECTOR;
  useEffect(() => {
    emailjs.init({
      publicKey: "sE8RvkQ4NLs0jaIm7",
    });
  }, []);

  useEffect(() => {
    if (hasErrors) {
      validateField();
    }
  }, [formData, hasErrors]);

  const validateField = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = (): boolean => {
    const isValid = validateField();
    setHasErrors(!isValid);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (validateForm()) {
      setIsLoading(true);

      try {
        const dataWithTime = {
          ...formData,
          time: new Date().toLocaleString(),
        };
        const response = await emailjs.send(
          "service_4m0gnpw",
          "template_mcvpg2t",
          dataWithTime
        );
        if (!response.status) {
          throw new Error("Failed to send message");
        }

        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } catch (error) {
        console.error("Error:", error);
        setSubmitError("Failed to send message. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

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
  };

  const errorVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const successVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonStateVariants = {
    initial: { opacity: 1, backgroundColor: color},
    loading: {
      backgroundColor: {color},
      transition: { duration: 0.3 },
    },
    error: {
      backgroundColor: "#ef4444",
      transition: { duration: 0.3 },
    },
    success: {
      backgroundColor: "#10b981",
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className={`${styles.formContainer} blurBackground`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            className={styles.successContainer}
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className={styles.successMessage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Thank you for your message! We'll get back to you soon.
            </motion.div>
            <motion.button
              onClick={() => setIsSubmitted(false)}
              className={`${styles.goBackButton} ${styles.button}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go Back
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className={styles.form}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.span
                    className={styles.errorMessage}
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {errors.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.span
                    className={styles.errorMessage}
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {errors.email}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="subject" className={styles.label}>
                Subject
              </label>
              <motion.input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`${styles.input} ${errors.subject ? styles.inputError : ""}`}
                whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
              />
              <AnimatePresence>
                {errors.subject && (
                  <motion.span
                    className={styles.errorMessage}
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {errors.subject}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                whileFocus={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.span
                    className={styles.errorMessage}
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {errors.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {submitError && (
                <motion.div
                  className={styles.submitErrorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {submitError}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className={styles.buttonContainer}>
              <motion.button
                type="submit"
                className={`${styles.submitButton} ${styles.button}`}
                disabled={isLoading}
                variants={buttonStateVariants}
                initial="initial"
                animate={
                  isLoading ? "loading" : submitError ? "error" : "initial"
                }
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={styles.buttonContent}
                    >
                      <span className={styles.loadingDot}></span>
                      <span className={styles.loadingDot}></span>
                      <span className={styles.loadingDot}></span>
                    </motion.span>
                  ) : submitError ? (
                    <motion.span
                      key="error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={styles.buttonContent}
                    >
                      Try Again
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={styles.buttonContent}
                    >
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactForm;
