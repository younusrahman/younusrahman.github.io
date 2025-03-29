import ContactItems from "component/Contact/ContactItems";
import { contactItems } from "./data";
import ContactForm from "component/Contact/ContactForm";
import styles from "./index.module.css";

export default function Contact() {
  return (
    <div className={`${styles.contactSection}`}>
      <ContactItems items={contactItems} />
      <ContactForm />
    </div>
  );
}
