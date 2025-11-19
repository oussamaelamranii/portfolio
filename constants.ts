import { Experience, Education, Project, SkillCategory } from './types';
import { Code2, Server, Cloud, Database, Cpu, Terminal, Globe, Layout } from 'lucide-react';

export const PROFILE = {
  name: "Oussama Elamrani",
  title: "Computer Engineering Student",
  subtitle: "Full Stack Developer & Cloud Enthusiast",
  email: "elamrani.oussamaa@gmail.com",
  phone: "+212 7 66 64 97 72",
  location: "Oujda, Morocco",
  linkedin: "https://linkedin.com/in/oussama-elamrani", // Assumed based on name
  github: "https://github.com/oussamaelamranii",
  about: "Computer Engineering student (Class of 2026) with a strong foundation in software architecture, microservices, and cloud technologies. Passionate about building scalable solutions and exploring new technologies through continuous learning.",
};

export const SKILLS: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["C#", "Java", "PHP", "JavaScript", "TypeScript", "SQL"],
    icon: Code2
  },
  {
    name: "Frameworks",
    skills: ["Spring Boot", "Angular", "ASP.NET Core", "Symfony", "Jakarta EE", "React"],
    icon: Layout
  },
  {
    name: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "Azure", "Jenkins", "Ansible", "Terraform", "Argo CD"],
    icon: Cloud
  },
  {
    name: "Architecture",
    skills: ["Microservices", "CQRS", "RESTful APIs", "SOLID Principles", "Design Patterns"],
    icon: Server
  },
  {
    name: "Tools & DB",
    skills: ["Git", "SonarQube", "Grafana", "Prometheus", "MySQL", "Redis", "SQL Server"],
    icon: Database
  }
];

export const EXPERIENCE: Experience[] = [
  {
    title: "Computer Engineer Intern",
    company: "SQLI Oujda",
    period: "June 2025 – July 2025",
    description: [
      "Designed and developed an internal medical visit management & scheduling system.",
      "Implemented CQRS architecture in Symfony 7.3 with LDAP authentication.",
      "Built real-time notifications via Mercure and ensured robustness with TDD.",
      "Set up pre-production environments using Docker, Ansible, and GitLab CI/CD pipelines."
    ],
    tech: ["Symfony", "Angular", "Docker", "Ansible", "GitLab CI"]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Computer Engineering Degree",
    school: "Graduate School of Engineering (EHEI), Oujda",
    period: "2023 - 2026 (Present)"
  },
  {
    degree: "Preparatory Cycle",
    school: "Graduate School of Engineering (EHEI), Oujda",
    period: "2021 - 2023"
  },
  {
    degree: "High School Diploma in Physical Sciences",
    school: "High School Riad, Oujda",
    period: "2020 - 2021"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Student Guidance Platform",
    status: "In Progress",
    category: "Web",
    description: [
      "Comprehensive academic path guidance platform (Bac → Bac+5).",
      "Features entrance exam simulators, cost calculators, and visa advice.",
      "Microservices architecture deployed on Azure."
    ],
    tech: ["Spring Boot", "Angular 18", "K8s", "Terraform", "Azure"]
  },
  {
    title: "Modular Agriculture System",
    year: "2025",
    category: "IoT",
    description: [
      "IoT system for automated irrigation and soil moisture monitoring.",
      "Personalized weather recommendations and integrated online store.",
      "Utilizes Arduino/ESP8266 sensors and microservices backend."
    ],
    tech: ["ASP.NET Core", "Spring Boot", "Angular", "IoT", "Redis"]
  },
  {
    title: "Morocco Travel Assistant",
    year: "2025",
    category: "Web",
    description: [
      "Travel planning app offering curated activity recommendations.",
      "Tailored accommodation suggestions and itinerary management."
    ],
    tech: ["Jakarta EE", "HTML/CSS", "Bootstrap", "MySQL"]
  }
];

export const CERTIFICATIONS = [
  "Azure AZ-900 (Microsoft)",
  "C# (freeCodeCamp/Microsoft)",
  "Java (HackerRank)",
  "Angular (HackerRank)",
  "DELF B2 (French)"
];

export const INTERESTS = [
  "Taekwondo", "Swimming", "Bodybuilding", "Chess"
];
