import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Mail,
  Linkedin,
  Code2,
  GraduationCap,
  Briefcase,
  Heart,
  Car,
  Code,
  Download,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Timeline data
const timelineData = [
  {
    date: "Nov 2021 - Aug 2025",
    title: "Bachelor of Technology – Computer Science and Engineering",
    subtitle: "Siksha ’O’ Anusandhan University (ITER)",
    description: "CGPA: 8.18 | Bhubaneswar, Odisha",
    icon: <GraduationCap className="text-white" size={24} />,
  },
  {
    date: "Nov 2024 - Jan 2025",
    title: "Full Stack Developer",
    subtitle: "Block Stars Pvt Ltd",
    description: "Remote | Designed and implemented reusable UI components and responsive web pages.",
    icon: <Briefcase className="text-white" size={24} />,
  },
];

// Skills data
const skillsData = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "GraphQL", "REST APIs"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "PostgreSQL", "Firebase", "Redis"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD Pipelines"],
  },
  {
    title: "Machine Learning",
    skills: ["TensorFlow", "PyTorch", "Pandas", "Scikit-learn"],
  },
];

// Projects data
const projectsData = [
  {
    title: "GoCabs",
    description: "Real-time cab booking platform with live tracking",
    technologies: ["React", "Node.js", "WebSockets"],
    icon: <Car className="text-white" size={32} />,
  },
  {
    title: "Health AI",
    description: "Machine learning model for disease prediction",
    technologies: ["Python", "TensorFlow", "Pandas"],
    icon: <Heart className="text-white" size={32} />,
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    technologies: ["Next.js", "Stripe", "MongoDB"],
    icon: <Code2 className="text-white" size={32} />,
  },
];

// HolographicSection Component
const HolographicSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 overflow-hidden ${className}`}
    >
      <div className="holographic-bg absolute inset-0 opacity-10 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">{children}</div>
    </section>
  );
};

// GlowingCard Component
const GlowingCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "elastic.out(1, 0.75)",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Hover effect
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      paused: true,
    });

    cardRef.current?.addEventListener("mouseenter", () => gsap.to(cardRef.current, { scale: 1.05, duration: 0.3 }));
    cardRef.current?.addEventListener("mouseleave", () => gsap.to(cardRef.current, { scale: 1, duration: 0.3 }));
  });

  return (
    <div
      ref={cardRef}
      className="glowing-card group relative bg-black/80 backdrop-blur-2xl rounded-3xl border border-gray-800 p-8 shadow-2xl transition-transform duration-300 hover:border-white/50"
    >
      {children}
    </div>
  );
};

// App Component
function App() {
  const container = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useGSAP(() => {
    // Smooth scroll setup
    gsap.to(container.current, {
      scrollTo: { y: 0, autoKill: false },
      duration: 1.5,
      ease: "power3.inOut",
    });

    // Progress bar animation
    gsap.to(progressBarRef.current, {
      scaleX: 1,
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    // Holographic background rotation and color shift
    gsap.to(".holographic-bg", {
      rotation: 360,
      repeat: -1,
      duration: 20,
      ease: "none",
    });

    gsap.to(".holographic-bg", {
      background: "conic-gradient(from 90deg, #ffffff, #cccccc, #999999, #ffffff)",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Progress bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-white to-gray-500 origin-left z-50"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Animated grid lines */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full">
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0V80H0" fill="none" className="stroke-current" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Hero Section */}
      <HolographicSection className="h-fit flex items-center">
        <div className="text-center">
          <div className="mb-12 inline-block relative">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden">
              <img
                src="/pfp.jpeg"
                alt="Siddharth Sahu"
                className="w-full h-full rounded-full border-4 border-black/80 backdrop-blur-xl"
              />
              <div className="holographic-bg absolute inset-0 rounded-full bg-conic-gradient from-white via-gray-500 to-gray-900 opacity-20" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 glitch-text text-white">
            Siddharth Sahu
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Full Stack Architect crafting immersive digital experiences through innovative code and modern design.
          </p>

          <div className="flex justify-center gap-6 mb-8">
            {[Github, Mail, Linkedin, Code2].map((Icon, i) => (
              <div key={i} className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-lg hover:border-white/50 transition-colors">
                <Icon className="text-gray-300 h-8 w-8" />
              </div>
            ))}
          </div>

          {/* Download CV Button */}
          <div className="mx-auto">
            <a
              href="/siddcv.pdf"
              className="px-8 py-4 bg-gradient-to-r from-white/20 to-gray-500/20 rounded-xl backdrop-blur-lg flex items-center gap-2 hover:bg-gradient-to-r hover:from-white/30 hover:to-gray-500/30 transition-colors"
            >
              <Download className="text-white" />
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent font-semibold">
                Download CV
              </span>
            </a>
          </div>
        </div>
      </HolographicSection>

      {/* Timeline Section */}
      <HolographicSection>
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-white/20 to-gray-500/20" />
          {timelineData.map((item, i) => (
            <div key={i} className="relative mb-16 w-full">
              <div className={`flex ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center`}>
                <div className="w-6 h-6 bg-white rounded-full z-10" />
                <div className="flex-1 p-8">
                  <GlowingCard>
                    <div className="flex items-center gap-4 mb-4">
                      {item.icon}
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-2">{item.subtitle}</p>
                    <p className="text-gray-500 text-sm mb-4">{item.date}</p>
                    <p className="text-gray-400">{item.description}</p>
                  </GlowingCard>
                </div>
              </div>
            </div>
          ))}
        </div>
      </HolographicSection>

      {/* Skills Section */}
      <HolographicSection>
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-white via-gray-500 to-gray-900 bg-clip-text text-transparent">
            Technical Expertise
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillsData.map((skill, i) => (
            <GlowingCard key={i}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-white/20 to-gray-500/20 rounded-lg">
                  <Code className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">{skill.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.skills.map((item, j) => (
                  <span
                    key={j}
                    className="px-3 py-1.5 bg-gray-800/50 rounded-full text-sm text-white backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </GlowingCard>
          ))}
        </div>
      </HolographicSection>

      {/* Projects Section */}
      <HolographicSection className="bg-gradient-to-br from-gray-900/50 to-gray-800/20">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-gray-500 to-white bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
          {projectsData.map((project, i) => (
            <GlowingCard key={i}>
              <div className="flex items-center gap-4 mb-6">
                {project.icon}
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              </div>
              <p className="text-gray-400 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 bg-gray-500/10 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlowingCard>
          ))}
        </div>
      </HolographicSection>

      {/* Footer Section */}
      <footer className="relative border-t border-gray-800/50 py-12 backdrop-blur-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-8">
            {[Github, Mail, Linkedin].map((Icon, i) => (
              <div key={i} className="text-gray-400 hover:text-white transition-colors">
                <Icon size={24} />
              </div>
            ))}
          </div>
          <p className="text-gray-600">
            © {new Date().getFullYear()} Siddharth Sahu. Built with{" "}
            <span className="text-white">innovation</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;