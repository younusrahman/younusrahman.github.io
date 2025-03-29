import { FaBarsProgress, FaBriefcase, FaCodeBranch, FaGem, FaGraduationCap, FaLanguage, FaLaptopCode, FaPalette, FaServer, FaUsers, FaUserTie } from "react-icons/fa6";
import {
  PiChatCircleFill,
  PiVideoFill,
  PiCookingPotFill,
  PiBooksFill,
} from "react-icons/pi";
import { MdSportsGymnastics, MdOutlineDesignServices } from "react-icons/md";
import { FaGlobeEurope, FaProjectDiagram, FaTools } from "react-icons/fa";
import { IconType } from "react-icons";
import { TimelineItem } from "context/types";


export const skillsData: TimelineItem[] = [
  {
    id: "technical-skills",
    title: "Technical Skills",
    icon: FaBarsProgress,
    groups: [
      {
        name: "Programming Languages",
        alignment: "right",
        items: ["C#", "JavaScript", "TypeScript", "SQL", "Python"],
      },
      {
        name: "Frontend Development",
        alignment: "right",
        items: ["React", "Vue", "Angular", "HTML5", "CSS3", "SASS"],
      },
      {
        name: "Backend Development",
        alignment: "right",
        items: [".NET", "ASP.NET Core", "Node.js", "Express", "GraphQL"],
      },
      {
        name: "Database Systems",
        alignment: "right",
        items: ["SQL Server", "MySQL", "MongoDB", "PostgreSQL", "Redis"],
      },
      {
        name: "DevOps & Cloud",
        alignment: "right",
        items: ["Docker", "Kubernetes", "Azure", "AWS", "CI/CD Pipelines"],
      },
      {
        name: "Testing",
        alignment: "right",
        items: ["Unit Testing", "Integration Testing", "Cypress", "Jest"],
      },
    ],
  },
  {
    id: "design-skills",
    title: "Design Skills",
    icon: FaPalette,
    groups: [
      {
        name: "UI/UX Design",
        alignment: "left",
        items: ["Figma", "Adobe XD", "Sketch", "User Flows", "Wireframing"],
      },
      {
        name: "Prototyping",
        alignment: "left",
        items: [
          "Interactive Prototypes",
          "Micro-interactions",
          "Design Systems",
        ],
      },
      {
        name: "User Research",
        alignment: "left",
        items: [
          "User Interviews",
          "Personas",
          "Usability Testing",
          "A/B Testing",
        ],
      },
    ],
  },
  {
    id: "soft-skills",
    title: "Professional Skills",
    icon: FaUserTie,
    groups: [
      {
        name: "Communication",
        alignment: "right",
        items: ["Technical Writing", "Presentations", "Client Communication"],
      },
      {
        name: "Project Management",
        alignment: "right",
        items: ["Agile Methodology", "Scrum", "Kanban", "Jira"],
      },
      {
        name: "Team Collaboration",
        alignment: "right",
        items: ["Remote Work", "Pair Programming", "Code Reviews"],
      },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    icon: FaGlobeEurope,
    groups: [
      {
        name: "Proficiency",
        alignment: "left",
        items: [
          "English (Fluent)",
          "Swedish (Fluent)",
          "Bengali (Native)",
          "Hindi (Professional)",
        ],
      },
    ],
  },
];

export const experienceData: TimelineItem[] = [
  {
    id: "karolinska",
    title: "Senior Software Developer",
    icon: FaLaptopCode,
    date: "2022 - Present",
    location: "Karolinska University Hospital, Stockholm",
    groups: [
      {
        name: "Key Responsibilities",
        alignment: "right",
        items: [
          "Lead development of patient management system using .NET 6 and React",
          "Architected microservices infrastructure with Docker and Kubernetes",
          "Implemented authentication using Keycloak and OAuth 2.0",
        ],
      },
      {
        name: "Achievements",
        alignment: "right",
        items: [
          "Reduced system latency by 40% through performance optimization",
          "Mentored 3 junior developers in React and TypeScript",
          "Implemented CI/CD pipeline reducing deployment time by 65%",
        ],
      },
    ],
  },
  {
    id: "smode",
    title: "Full Stack Developer",
    icon: FaServer,
    date: "2020 - 2022",
    location: "Smode Tech, Remote",
    groups: [
      {
        name: "Projects",
        alignment: "left",
        items: [
          "Developed AR visualization platform with Three.js and ASP.NET Core",
          "Built real-time collaboration features using WebSockets",
          "Created design system for consistent UI across applications",
        ],
      },
      {
        name: "Technologies",
        alignment: "left",
        items: [
          "Frontend: React, TypeScript, Redux",
          "Backend: .NET Core, SignalR, Entity Framework",
          "Infrastructure: Azure Functions, Cosmos DB",
        ],
      },
    ],
  },
  {
    id: "ericsson",
    title: "Network Engineer",
    icon: FaTools,
    date: "2018 - 2020",
    location: "Ericsson, Kista",
    groups: [
      {
        name: "Responsibilities",
        alignment: "right",
        items: [
          "Configured and maintained LTE network infrastructure",
          "Automated network monitoring using Python scripts",
          "Participated in 5G network testing and deployment",
        ],
      },
    ],
  },
];

export const educationData: TimelineItem[] = [
  {
    id: "newton",
    title: ".NET Systems Development",
    icon: FaGraduationCap,
    date: "2020 - 2022",
    location: "Newton University, Stockholm",
    groups: [
      {
        name: "Curriculum",
        alignment: "right",
        items: [
          "Advanced C# and .NET Core",
          "Cloud Computing with Azure",
          "Software Architecture Patterns",
          "Agile Development Methodologies",
        ],
      },
    ],
  },
  {
    id: "iths",
    title: "UX Design Certification",
    icon: FaPalette,
    date: "2024",
    location: "IT-Högskolan, Stockholm",
    groups: [
      {
        name: "Skills Acquired",
        alignment: "left",
        items: [
          "User Research Methods",
          "Interaction Design Principles",
          "Accessibility Standards (WCAG)",
          "Design Thinking Process",
        ],
      },
    ],
  },
];

export const hobbiesData = [
  {
    icon: PiCookingPotFill,
    title: "Cooking",
    description:
      "I love experimenting in the kitchen. I often follow recipes from the internet but sometimes venture to improvise and create something entirely my own. Cooking is both relaxing and creative for me.",
    aos: "fade-right",
  },
  {
    icon: PiChatCircleFill,
    title: "Talk",
    description:
      "I love talking because it gives me the chance to share knowledge and, just as importantly, learn something new in return. Meaningful conversations are both inspiring and enriching for me.",
    aos: "zoom-out-up",
  },
  {
    icon: PiVideoFill,
    title: "Documentaries and Leisure",
    description:
      'Movie nights are always nice, but I have a particular fondness for documentaries. They teach me new things and give me a deeper understanding of the world—which is exactly what I enjoy during my "downtime."',
    aos: "fade-left",
  },
  {
    icon: MdSportsGymnastics,
    title: "Exercise and Health",
    description:
      "Physical activity is an important part of my life, especially since my work doesn’t involve much movement. I work out regularly to keep my body strong and my mind sharp.",
    aos: "fade-right",
  },
  {
    icon: MdOutlineDesignServices,
    title: "Web Design",
    description:
      "I’m fascinated by web design and enjoy exploring different techniques and tools to create stylish and functional websites. It’s a blend of technology and creativity that truly appeals to me.",
    aos: "zoom-out-up",
  },
  {
    icon: PiBooksFill,
    title: "Reading & Listing",
    description:
      "I’m always eager to learn more. Reading about the latest technology or listening to news on the radio and the web is something I do daily. It keeps me informed and inspired.",
    aos: "fade-left",
  },
];

export const socialLinksData = [
  {
    id: 1,
    url: "https://www.facebook.com/younus.rahman/",
    icon: "AiOutlineFacebook",
  },
  {
    id: 2,
    url: "https://www.linkedin.com/in/younus-rahman-1b3b0717a/",
    icon: "RiLinkedinBoxLine",
  },
  {
    id: 3,
    url: "https://twitter.com/younusrahman",
    icon: "LiaTwitterSquare",
  },
  {
    id: 4,
    url: "https://github.com/younusrahman",
    icon: "LiaGithubSquare",
  },
];

export const aboutContentData = {
  introduction: {
    greeting: "Hey there!   ",
    content:
      "I'm Younus Rahman, a passionate .NET system developer with a love for technology, problem-solving, and creating meaningful solutions. Born in Dhaka, Bangladesh, in 1987, I've always been drawn to the world of IT. My journey into tech has been shaped by curiosity, determination, and a desire to make a positive impact through my work. I'm a structured and socially oriented person who enjoys connecting with people and exploring new places. When I'm not coding, you'll find me savoring my favorite dishes like panta bhat (fermented rice) with fried hilsa fish or indulging in snacks like fochka (crispy balls filled with spiced potatoes and chickpeas). Food, for me, is not just a pleasure but also a way to stay connected to my roots.",
  },
  sections: [
    {
      title: "My Journey into Tech",
      content:
        "My path to becoming a developer wasn't conventional. Without formal IT training early on, I started my career in healthcare while keeping my passion for technology alive. I eventually landed my first IT role as a network technician, where I discovered my true calling—coding. The thrill of solving problems and building systems was undeniable, and I knew I wanted to pursue it further.\n\nI later specialized in system development, focusing on .NET and fullstack development. This opened the door to exciting opportunities in the tech industry, where I've been able to work on complex systems, collaborate with talented teams, and contribute to projects that benefit society. Every day, I'm inspired by the endless possibilities of technology and the impact it can have on people's lives.",
      alignment: "left",
    },
    {
      title: "Beyond Work",
      content:
        "Life has taught me the importance of balance, resilience, and gratitude. Becoming a father has been the most profound and rewarding experience, and I'm deeply grateful for my family's love and support. Together, we've navigated life's ups and downs, building a life filled with joy, hope, and beautiful moments. I'm also thankful for the opportunities I've had to grow, both personally and professionally. Whether it's earning my driver's license, exploring new cultures, or overcoming challenges, I've learned that with determination and a clear vision, anything is possible.",
      alignment: "left",
    },
    {
      title: "What Drives Me",
      content:
        "I'm driven by the desire to create innovative and secure solutions that make a positive impact. Whether it's developing backend systems with .NET and C#, building user-friendly interfaces with React and Vue, or optimizing workflows with DevOps tools like Docker and Kubernetes, I'm always striving to grow and improve. In life, I believe in setting meaningful goals and finding happiness in the journey, not just the destination. My philosophy is to focus on smaller, achievable targets that bring frequent rewards and build confidence. This mindset has helped me stay motivated and resilient, even in the face of challenges.",
      alignment: "right",
    },
    {
      title: "Looking Ahead",
      content:
        "I'm excited about the future and the opportunities it holds. My goal is to continue growing as a developer, contributing to meaningful projects, and inspiring others to pursue their dreams—no matter where they start. Life has taught me that with determination, support, and a clear vision, anything is possible.",
      alignment: "right",
    },
  ],
  link: {
    text: "More about me . .",
    to: "/more",
  },
};
