
import { Experience, Education, Project, SkillCategory } from './types';
import { Code2, Server, Cloud, Database, Cpu, Terminal, Globe, Layout } from 'lucide-react';

export const PROFILE = {
  name: "Oussama Elamrani",
  title: "Computer Engineering Student (Class of 2026)",
  subtitle: "Full Stack Developer & Cloud Enthusiast",
  image: "https://github.com/oussamaelamranii.png",
  email: "elamrani.oussamaa@gmail.com",
  phone: "+212 7 66 64 97 72",
  location: "Oujda, Morocco",
  linkedin: "https://www.linkedin.com/in/oussama-elamranii/",
  github: "https://github.com/oussamaelamranii",
  about: "Computer Engineering student (Class of 2026) with a strong foundation in software architecture, microservices, and cloud technologies. Passionate about building scalable solutions and exploring new technologies through continuous learning.",
};

export const SKILLS: SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: ["C#", "Java", "PHP", "JavaScript"],
    icon: Code2
  },
  {
    name: "Frameworks & Technologies",
    skills: ["Spring", "Spring Boot", "ASP.NET", "Jakarta EE", "Symfony", "Angular", "Bootstrap"],
    icon: Layout
  },
  {
    name: "Databases & ORM",
    skills: ["MySQL", "SQL Server", "SQLite", "MongoDB", "PDO", "Entity Framework", "Hibernate", "Doctrine"],
    icon: Database
  },
  {
    name: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "Jenkins", "Ansible", "SonarQube", "Grafana", "Prometheus", "Maven", "Azure", "Terraform", "Argo CD"],
    icon: Cloud
  },
  {
    name: "Principles & Architectures",
    skills: ["SOLID", "Design Patterns", "Microservices", "MVC", "CQRS", "API REST & RESTful", "UML", "Merise"],
    icon: Server
  },
  {
    name: "Methodologies & Tools",
    skills: ["Scrum", "Kanban", "Git", "GitHub", "GitLab"],
    icon: Terminal
  }
];

export const EXPERIENCE: Experience[] = [
  {
    title: "Computer engineer at SQLI Oujda",
    company: "Internship",
    period: "June 2025 – July 2025",
    description: [
      "Designed and developed an internal medical visit management & scheduling system.",
      "Designed and developed an invitations and confirmations module featuring email-based invitations and status management.",
      "Implemented CQRS architecture in Symfony 7.3 (Twig, Bootstrap, JS) with LDAP authentication.",
      "Real-time notifications via Mercure and behavior-driven tests (TDD) for robustness.",
      "Continuous quality assurance using PHPStan, CS-Fixer, and SonarQube.",
      "Pre-production environment setup with Docker/Ansible, plus CI/CD on GitLab CE.",
      "Agile collaboration, Git/GitLab version control, and strict workflow adherence."
    ],
    tech: ["Symfony 7.3", "Angular", "Docker", "Ansible", "GitLab CI", "Mercure"]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Computer Engineering Degree",
    school: "Graduate School of Engineering (EHEI), Oujda",
    period: "2023-2026 (Present)"
  },
  {
    degree: "Preparatory Cycle",
    school: "Graduate School of Engineering (EHEI), Oujda",
    period: "2021 - 2023"
  },
  {
    degree: "High School Diploma in Physical Sciences",
    school: "High School Riad, Oujda",
    period: "2020-2021"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Student Guidance Platform",
    status: "In Progress",
    category: "Web",
    description: [
      "Developed a web application providing academic path guidance (Bac → Bac+5) & institution selection.",
      "Features entrance exam simulators, cost-of-living estimation, visa advice & help resources.",
      "Architecture: Microservices."
    ],
    tech: ["Spring Boot", "Angular 18", "Docker", "K8s", "Terraform", "Ansible", "SonarQube", "Jenkins", "Azure"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
    link: "https://github.com/oussamaelamranii"
  },
  {
    title: "Modular Agriculture System",
    year: "2025",
    category: "IoT",
    description: [
      "Automated irrigation control & soil moisture monitoring via IoT sensors.",
      "Personalized weather recommendations & user notifications based on crop type.",
      "Field geolocation & an integrated online store.",
      "Architecture: Microservices."
    ],
    tech: ["ASP.NET Core", "Symfony 7", "Spring Boot", "Arduino", "Angular 18", "Docker", "K8s", "Azure", "Redis"],
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1000&auto=format&fit=crop",
    link: "https://github.com/oussamaelamranii"
  },
  {
    title: "Morocco Travel Assistant",
    year: "2025",
    category: "Web",
    description: [
      "Developed a travel planning application providing Morocco trip planning & curated activity recommendations.",
      "Tailored accommodation suggestions & itinerary management."
    ],
    tech: ["Jakarta EE", "HTML", "CSS", "Bootstrap", "JavaScript", "MySQL"],
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1000&auto=format&fit=crop",
    link: "https://github.com/oussamaelamranii"
  },
  {
    title: "CRM System",
    year: "2025",
    category: "Web",
    description: [
      "Developed a comprehensive Customer Relationship Management system.",
      "Streamlined client interactions and data management.",
      "Architecture: Microservices."
    ],
    tech: ["Symfony", "Docker", "Jenkins", "Ansible", "GitLab CI"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    link: "https://github.com/oussamaelamranii"
  },
  {
    title: "Gym Management System",
    year: "2024",
    category: "Web",
    description: [
      "Web-based gym management solution with member tracking.",
      "Includes a built-in calorie calculator and subscription management.",
      "Features an intuitive dashboard for administrators."
    ],
    tech: ["PHP", "JavaScript", "HTML", "CSS", "MySQL"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
    link: "https://github.com/oussamaelamranii"
  },
  {
    title: "Personalized AI Gym Coach",
    year: "2025",
    category: "Mobile",
    description: [
      "AI-powered personalized coaching platform to help users reach fitness goals.",
      "Provides tailored workout plans and progress tracking.",
      "Architecture: Microservices."
    ],
    tech: ["ASP.NET Core", "Angular", "Docker", "Azure", "DevOps"],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
    link: "https://github.com/oussamaelamranii"
  }
];

export const CERTIFICATIONS = [
  "Azure AZ-900 (Microsoft)",
  "Create a web API with ASP.NET Core controllers (Microsoft)",
  "Create a web UI with ASP.NET Core (Microsoft)",
  "Persist and retrieve relational data by using Entity Framework Core (Microsoft)",
  "C# (freeCodeCamp with Microsoft)",
  "Java (HackerRank)",
  "Angular (HackerRank)",
  "JavaScript (HackerRank)",
  "SQL (HackerRank)",
  "DELF B2 (French)"
];

export const INTERESTS = [
  "Sports : Taekwondo, swimming, bodybuilding, chess"
];

export const LANGUAGES = [
  "Arabe : Native language",
  "Français : B2 Level",
  "Anglais : Reading, Writing, Speaking"
];

export const SOFT_SKILLS = [
  "Technology watch (continuous exploration)",
  "Self-learning (continuous training)",
  "Team spirit (collaboration, support, synergy)"
];

export const EXTRACURRICULAR = [
  "CPM Club EHEI : IT Cell Manager",
  "Rotaract Club EHEI : Digital Communication Cell Manager"
];
