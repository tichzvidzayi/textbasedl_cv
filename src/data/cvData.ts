export interface ContactInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  dates: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  dates: string;
}

export interface Certification {
  platform: string;
  name: string;
}

export interface Project {
  name: string;
  description: string;
  github?: string;
  live?: string;
}

export interface CVData {
  contact: ContactInfo;
  summary: string;
  skills: {
    frontend: string[];
    uiux: string[];
    apis: string[];
    backend: string[];
    devops: string[];
    security: string[];
    optimization: string[];
  };
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  publications: string[];
  softSkills: string[];
  interests: string[];
}

export const cvData: CVData = {
  contact: {
    name: "Tich Zvidzayi",
    title: "Full-Stack Software Engineer",
    location: "Gauteng, South Africa",
    phone: "+27 63 323 8051",
    email: "tzvidzayi@hotmail.com",
    website: "tich.vercel.app",
    github: "github.com/tichzvidzayi",
    linkedin: "linkedin.com/in/tichzvidzayi"
  },
  summary: `Accomplished Full-Stack Software Engineer with over 7 years of experience.
Specializes in React.js, Node, Laravel, C, and Next.js micro-frontends for applications in logistics, automotive, and legal tech.
Expert in JavaScript (ES6+), TypeScript, RESTful APIs, GraphQL, and WebSockets, with a focus on secure, scalable, and responsive interfaces.
Proficient in CI/CD automation, performance optimization (DynaTrace, Grafana), and modern authorization (JWT).
Adept at leading Agile teams to deliver user-centric solutions, driving innovation and operational efficiency.
Holds a Masters in Computer Science from Rhodes University.
Passionate about leveraging technology to enhance community safety and impact.`,
  skills: {
    frontend: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "JSX",
      "Babel",
      "Vue.js",
      "jQuery",
      "Design Patterns (Singleton, Observer)",
      "Event Handlers"
    ],
    uiux: [
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "MetroUI",
      "Figma",
      "Canva",
      "Adobe Photoshop"
    ],
    apis: [
      "RESTful APIs",
      "GraphQL",
      "WebSockets (Infobip)",
      "Service Workers (PWAs)",
      "Web/Shared Workers"
    ],
    backend: [
      "Node.js",
      "Express",
      "C",
      ".NET",
      "ASP.NET",
      "PHP",
      "Laravel",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "SQL Server",
      "Redis",
      "AWS (EC2, Lambda, S3)",
      "GCP",
      "Docker",
      "nGrok"
    ],
    devops: [
      "Webpack",
      "NPM",
      "Git",
      "GitHub",
      "GitLab",
      "BitBucket",
      "Docker",
      "Linux Administration",
      "GitHub Actions",
      "Agile Methodologies",
      "Test Automation (Jest)"
    ],
    security: [
      "JSON Web Tokens (JWT)",
      "Secure Authentication in Microservices"
    ],
    optimization: [
      "DynaTrace",
      "Grafana"
    ]
  },
  experience: [
    {
      title: "Lead Software Engineer",
      company: "Code67 Tech Solutions",
      location: "Johannesburg, South Africa",
      dates: "Sep 2024 – Present",
      responsibilities: [
        "Architected scalable micro-frontend solutions with React.js and Next.js for Unisure (Insurance) and Jhpiego (Public Health NGO), enhancing situational awareness and user engagement."
      ],
      technologies: ["React.js", "Next.js", "TypeScript", "Micro-frontends"]
    },
    {
      title: "Software Engineer",
      company: "BMW Group Pty",
      location: "Pretoria, South Africa",
      dates: "Aug 2023 - Aug 2024",
      responsibilities: [
        "Integrated RESTful APIs, GraphQL, and Infobip WebSockets for real-time communication, improving application responsiveness by 30%.",
        "Led Agile teams to translate complex requirements into secure, high-quality code using TypeScript, ES6+, and JWT authentication.",
        "Automated CI/CD pipelines with GitHub Actions, deploying to AWS and Vercel, achieving 99.9% uptime."
      ],
      technologies: ["React.js", "Next.js", "TypeScript", "Laravel", "C", "Tailwind CSS", "Infobip", "AWS", "MongoDB", "PostgreSQL", "GraphQL", "Redis"]
    },
    {
      title: "Software Engineer",
      company: "KITS Pty",
      location: "Cape Town, South Africa",
      dates: "Nov 2022 - Aug 2023",
      responsibilities: [
        "Spearheaded UI redesigns using React.js and Next.js micro-frontends, optimizing real-time data integrations for global automotive systems, reducing latency by 25%.",
        "Developed reusable components with JavaScript design patterns and JSX, accelerating feature delivery in Agile sprints.",
        "Utilized DynaTrace for performance benchmarking and Web Workers for UI responsiveness, ensuring seamless user experiences."
      ],
      technologies: ["JavaScript", "React.js", "Node.js", "TypeScript", "Next.js", "MongoDB", "GraphQL", "AWS", "Redis"]
    },
    {
      title: "Software Engineer",
      company: "Pargopoints Pty (Pargo)",
      location: "Cape Town, South Africa",
      dates: "Jan 2022 - Nov 2022",
      responsibilities: [
        "Designed automated workflows with React.js micro-frontends for legal tech solutions, improving process efficiency by 20%.",
        "Contributed to Agile sprints, building responsive features with TypeScript, REST APIs, and secure JWT authentication.",
        "Engineered Pargo-Premium full-stack features with React.js and Vue.js micro-frontends, enhancing real-time logistics insights.",
        "Optimized performance using Grafana and automated deployments with Docker and Git, reducing deployment time by 15%."
      ],
      technologies: ["C", "JavaScript", "React.js", "Node.js", "TypeScript", "REST APIs"]
    },
    {
      title: "Backend Developer",
      company: "Insight Technologies Pty",
      location: "Grahamstown, South Africa",
      dates: "Nov 2019 - Aug 2021",
      responsibilities: [
        "Developed article feeds and mail services, upgrading to PHP 7.x for improved performance and scalability.",
        "Collaborated on requirements and ensured code quality through automated testing."
      ],
      technologies: ["LAMP Stack", "Node", "PHP", "MySQL", "PHP", "Laravel", "JavaScript", "Vue.js", "Node.js", "TypeScript", "Docker", "Grafana", "PostgreSQL", "AWS"]
    },
    {
      title: "Assistant Lecturer",
      company: "Rhodes University",
      location: "Grahamstown, South Africa",
      dates: "Mar 2019 - Feb 2021",
      responsibilities: [
        "Taught software development courses, focusing on JavaScript, React, and Agile methodologies, mentoring students for industry readiness.",
        "Assisted in grading and promoted clean code practices."
      ],
      technologies: ["JavaScript", "C", "LAMP Stack"]
    }
  ],
  education: [
    {
      degree: "Masters in Computer Science",
      institution: "Rhodes University",
      location: "Grahamstown, South Africa",
      dates: "2019 - 2021"
    },
    {
      degree: "Bachelors in Computer Science",
      institution: "Rhodes University",
      location: "Grahamstown, South Africa",
      dates: "2015 - 2018"
    }
  ],
  certifications: [
    { platform: "LinkedIn", name: "Human Leadership" },
    { platform: "LinkedIn", name: "Building Web APIs with ASP.NET Core in .NET 6" },
    { platform: "LinkedIn", name: "React.js Essential Training" },
    { platform: "Udemy", name: "Complete Linux Training Course" },
    { platform: "Udemy", name: "Microsoft Azure DevOps & Amazon Web Services DevOps Masterclass" },
    { platform: "Coursera (University of Minnesota)", name: "Introduction to Software Testing" },
    { platform: "Coursera (University of Alberta)", name: "Software Processes and Agile Practices" },
    { platform: "HackerRank", name: "C Certification" }
  ],
  projects: [
    {
      name: "ECommerce Store",
      description: "React.js SPA with FakeStore API, showcasing reusable components and Tailwind CSS.",
      github: "https://github.com/tichzvidzayi/ecommerce-store",
      live: "https://ecommerce-store.vercel.app"
    },
    {
      name: "Virtual Games",
      description: "React.js VR game app with TypeScript and real-time interactions.",
      github: "https://github.com/tichzvidzayi/virtual-games",
      live: "https://virtual-games.vercel.app"
    },
    {
      name: "Text-To-Speech GCP",
      description: "Full-stack app with React.js frontend and Node.js backend, integrating Google Cloud API.",
      github: "https://github.com/tichzvidzayi/text-to-speech-gcp"
    },
    {
      name: "Point of Sale (POS)",
      description: "Scalable POS with React-inspired components and JWT security.",
      github: "https://github.com/tichzvidzayi/pos-system"
    },
    {
      name: "Onroute Logistics",
      description: "React.js logistics tracking app with real-time dashboards.",
      github: "https://github.com/tichzvidzayi/onroute-logistics"
    },
    {
      name: "User Management System",
      description: "Laravel/Vue.js app for user management with extensible UI.",
      github: "https://github.com/tichzvidzayi/user-management"
    },
    {
      name: "tMedia Player",
      description: "C desktop media player optimized for performance.",
      github: "https://github.com/tichzvidzayi/tmedia-player"
    }
  ],
  publications: [
    "IST Africa 2021: LTSP Client Image Maintenance (IEEE Xplore, March 2021)"
  ],
  softSkills: [
    "Leadership & Team Collaboration",
    "Problem-Solving & Adaptability",
    "Effective Communication"
  ],
  interests: [
    "Astronomy",
    "Blockchain",
    "Taekwondo"
  ]
};
