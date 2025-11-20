
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
  linkedin: "https://linkedin.com/in/oussama-elamrani", 
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
    name: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "Jenkins", "Ansible", "SonarQube", "Grafana", "Prometheus", "Maven", "Azure", "Terraform", "Argo CD"],
    icon: Cloud
  },
  {
    name: "Principles & Architectures",
    skills: ["SOLID", "Design Patterns", "Microservices", "MVC", "CQRS", "API REST & RESTful"],
    icon: Server
  },
  {
    name: "Methodologies & Tools",
    skills: ["Scrum", "Kanban", "Git", "GitHub", "GitLab"],
    icon: Database
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
    tech: ["Spring Boot", "Angular 18", "Docker", "K8s", "Terraform", "Ansible", "SonarQube", "Jenkins", "Azure"]
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
    tech: ["ASP.NET Core", "Symfony 7", "Spring Boot", "Arduino", "Angular 18", "Docker", "K8s", "Azure", "Redis"]
  },
  {
    title: "Morocco Travel Assistant",
    year: "2025",
    category: "Web",
    description: [
      "Developed a travel planning application providing Morocco trip planning & curated activity recommendations.",
      "Tailored accommodation suggestions & itinerary management."
    ],
    tech: ["Jakarta EE", "HTML", "CSS", "Bootstrap", "JavaScript", "MySQL"]
  }
];

export const CERTIFICATIONS = [
  "Azure AZ-900 (Microsoft)",
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
