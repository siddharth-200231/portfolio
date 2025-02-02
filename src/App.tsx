import React, { useRef, lazy, Suspense } from "react";
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
  MapPin,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Lazy load heavy components
const LazyImage = lazy(() => import("./LazyImage"));

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
    description:
      "Remote | Designed and implemented reusable UI components and responsive web pages.",
    icon: <Briefcase className="text-white" size={24} />,
  },
  {
    date: "Jun 2023 - Sep 2023",
    title: "Open Source Contributor",
    subtitle: "Google Summer of Code",
    description:
      "Contributed to open-source projects focusing on developer tools",
    icon: <Code2 className="text-white" size={24} />,
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
  {
    title: "Tools",
    skills: ["Git", "Webpack", "Jest", "Figma"],
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
  {
    title: "Portfolio Generator",
    description: "AI-powered portfolio builder with dynamic templates",
    technologies: ["Next.js", "GPT-4", "Tailwind"],
    icon: <Code className="text-white" size={32} />,
  },
];

// HolographicSection Component with Wavy Background
const HolographicSection = ({ children, className = "" }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Enhanced wave animation
    gsap.to(".wave", {
      x: "100%",
      duration: 15,
      repeat: -1,
      ease: "none",
      yoyo: true,
    });
  });

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <div
          className="wave absolute w-[400%] h-[150%] bg-gradient-to-r from-transparent via-white/15 to-transparent"
          style={{ top: "40%", left: "-100%", transform: "rotate(-4deg)" }}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">{children}</div>
    </section>
  );
};

// Enhanced GlowingCard with hover animation
const GlowingCard = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scale animation on hover
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
      paused: true,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    cardRef.current.addEventListener("mouseenter", () => {
      gsap.to(cardRef.current, { scale: 1.05, duration: 0.3 });
    });

    cardRef.current.addEventListener("mouseleave", () => {
      gsap.to(cardRef.current, { scale: 1, duration: 0.3 });
    });
  });

  return (
    <div
      ref={cardRef}
      className="glowing-card group relative bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-2xl rounded-3xl border border-gray-800 p-6 shadow-2xl transition-transform duration-300 hover:border-white/50 will-change-transform"
    >
      {children}
    </div>
  );
};

// New AnimatedText Component
const AnimatedText = ({ children, className }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 90%",
      },
    });
  });

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

// Enhanced Hero Section
const EnhancedHero = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Profile image floating animation
    gsap.to(imageContainerRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Social icons animation
    gsap.from(socialIconsRef.current, {
      stagger: 0.1,
      scale: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".social-icons-container",
        start: "top 80%",
      },
    });

    // Title animation
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
      },
    });

    // Text flicker animation
    gsap.to(titleRef.current, {
      opacity: 0.8,
      duration: 0.1,
      repeat: 3,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1,
    });
  });

  const contactInfo = [
    { label: "Email", value: "siddharth@example.com", icon: <Mail /> },
    { label: "Location", value: "Bhubaneswar, India", icon: <MapPin /> },
  ];

  return (
    <HolographicSection className="h-fit flex items-center">
      <div className="text-center hero-content">
        <div className="mb-12 inline-block relative" ref={imageContainerRef}>
          <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden">
            <Suspense
              fallback={<div className="w-48 h-48 bg-gray-800 rounded-full" />}
            >
              <LazyImage
                src="/pfp.jpeg"
                alt="Siddharth Sahu"
                className="w-full h-full rounded-full border-4 border-black/80 backdrop-blur-xl"
              />
            </Suspense>
            <div className="holographic-bg absolute inset-0 rounded-full bg-conic-gradient from-white via-gray-500 to-gray-900 opacity-20" />
          </div>
        </div>

        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl font-extrabold mb-6 glitch-text text-white"
        >
          Siddharth Sahu
        </h1>

        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Full Stack Architect crafting immersive digital experiences through
          innovative code and modern design.
        </p>

        <div className="flex justify-center gap-6 mb-8 social-icons-container">
          {[Github, Mail, Linkedin, Code2].map((Icon, i) => (
            <div
              key={i}
              ref={(el) => (socialIconsRef.current[i] = el!)}
              className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-lg hover:border-white/50 transition-colors icon"
            >
              <Icon className="text-gray-300 h-8 w-8" />
            </div>
          ))}
        </div>

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

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {contactInfo.map((info, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-400">
              <div className="p-2 bg-gray-800/50 rounded-lg">{info.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{info.label}</p>
                <p className="text-white">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HolographicSection>
  );
};

// About Section
const AboutSection = () => (
  <HolographicSection className="py-12">
    <div className="max-w-4xl mx-auto">
      <GlowingCard>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <LazyImage
              src="/avatar.jpeg"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">About Me</h3>
            <p className="text-gray-400">
              Passionate full-stack developer with expertise in building
              scalable web applications. Open-source contributor and tech
              community enthusiast.
            </p>
          </div>
        </div>
      </GlowingCard>
    </div>
  </HolographicSection>
);

// TimelineItem Component with animation
const TimelineItem = ({ item, index }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(itemRef.current, {
      x: index % 2 === 0 ? 50 : -50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 90%",
      },
    });
  });

  return (
    <div ref={itemRef} className="relative mb-8">
      <div
        className={`flex ${
          index % 2 === 0 ? "flex-row" : "flex-row-reverse"
        } items-center`}
      >
        <div className="w-6 h-6 bg-white rounded-full z-10" />
        <div className="flex-1 p-6">
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
  );
};

// App Component
function App() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Smooth scroll setup
      gsap.to(container.current, {
        scrollTo: { y: 0, autoKill: false },
        duration: 1.5,
        ease: "power3.inOut",
      });

      // Holographic background rotation and color shift
      gsap.to(".holographic-bg", {
        rotation: 360,
        repeat: -1,
        duration: 20,
        ease: "none",
      });

      gsap.to(".holographic-bg", {
        background:
          "conic-gradient(from 90deg, #ffffff, #cccccc, #999999, #ffffff)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900"
    >
      <EnhancedHero />
      <AboutSection />

      {/* Timeline Section */}
      <HolographicSection className="py-12">
        <AnimatedText className="text-3xl font-bold text-center mb-12">
          Experience & Education
        </AnimatedText>
        <div className="relative max-w-4xl mx-auto">
          {timelineData.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </HolographicSection>

      {/* Skills Section */}
      <HolographicSection className="py-12">
        <AnimatedText className="text-3xl font-bold text-center mb-12">
          Technical Expertise
        </AnimatedText>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillsData.map((skill, i) => (
            <GlowingCard key={i}>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-white/20 to-gray-500/20 rounded-lg">
                    <Code className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {skill.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {skill.skills.map((item, j) => (
                    <span
                      key={j}
                      className="px-3 py-2 bg-gray-800/50 rounded-lg text-sm text-center text-white backdrop-blur-sm hover:bg-gradient-to-r from-white/10 to-gray-500/10 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </GlowingCard>
          ))}
        </div>
      </HolographicSection>

      {/* Projects Section */}
      <HolographicSection className="py-12">
        <AnimatedText className="text-3xl font-bold text-center mb-12">
          Featured Projects
        </AnimatedText>
        <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
          {projectsData.map((project, i) => (
            <GlowingCard key={i}>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  {project.icon}
                  <h3 className="text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 bg-gray-800/50 rounded-full text-sm text-white backdrop-blur-sm hover:bg-gradient-to-r from-white/10 to-gray-500/10 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlowingCard>
          ))}
        </div>
      </HolographicSection>

      {/* Contact Section */}
      <HolographicSection className="py-12">
        <AnimatedText className="text-3xl font-bold text-center mb-12">
          Let's Connect
        </AnimatedText>
        <div className="max-w-4xl mx-auto">
          <GlowingCard>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="text-white" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-white">siddharth@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-white" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-white">Bhubaneswar, India</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Social Media</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com"
                      className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <Github className="text-white" size={24} />
                    </a>
                    <a
                      href="https://linkedin.com"
                      className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <Linkedin className="text-white" size={24} />
                    </a>
                    <a
                      href="mailto:siddharth@example.com"
                      className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <Mail className="text-white" size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </GlowingCard>
        </div>
      </HolographicSection>

      {/* Footer Section */}
      <footer className="relative border-t border-gray-800/50 py-12 backdrop-blur-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-8">
            {[Github, Mail, Linkedin].map((Icon, i) => (
              <div
                key={i}
                className="text-gray-400 hover:text-white transition-colors icon"
              >
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
