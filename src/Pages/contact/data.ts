import { ContactItemType } from "context/types";
import { FaPhone, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";

export const contactItems: ContactItemType[] = [
  {
    id: "phone",
    type: "phone",
    icon: FaPhone,
    label: "Phone",
    value: "0046728589977",
    displayValue: "(+46)<br>72 858 99 77",
    href: "tel:+46728589977",
    animation: {
      effect: "fade-right",
      duration: 1500,
      offset: 230,
    },
    hiddenCopyValue: "+46728589977",
  },
  {
    id: "email",
    type: "email",
    icon: FaEnvelope,
    label: "Email",
    value: "yrsoftwaredeveloper@gmail.com",
    displayValue: "yrsoftwaredeveloper<br>(AT)<br>Gmail.com",
    href: "mailto:yrsoftwaredeveloper@gmail.com",
    animation: {
      effect: "zoom-out-up",
      duration: 1500,
      offset: 230,
    },
    hiddenCopyValue: "yrsoftwaredeveloper@gmail.com",
  },
  {
    id: "address",
    type: "address",
    icon: FaMapMarkedAlt,
    label: "Address",
    value: "Ankdammsgatan 26, 171 43 solna Stockholm",
    displayValue: "Ankdammsgatan 26,<br>171 43 solna<br>Stockholm",
    href: "#contact",
    animation: {
      effect: "fade-left",
      duration: 1500,
      offset: 230,
    },
    mapIframe: `<iframe src="https://www.google.com/maps/embed?pb=!4v1743266019075!6m8!1m7!1svv7E2hYrCktw1R4GKf4_2g!2m2!1d59.35535759343357!2d17.993551978807!3f24.07807021930492!4f3.3021724540195834!5f1.4498844049397461" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    hiddenCopyValue: "Ankdammsgatan 26, 171 43 solna, Stockholm"
  },
];
