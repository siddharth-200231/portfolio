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

// Enhanced Hero Section with Responsive Design
const EnhancedHero = () => {
  return (
    <section className="h-fit relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid opacity-20">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent animate-pulse" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-gray-400 text-lg md:text-xl font-medium">Hello, I'm</h2>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-500 to-blue-500">
                Siddharth Sahu
              </h1>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="h-1 w-12 bg-purple-500" />
                <p className="text-lg md:text-xl text-gray-400">Full Stack Developer</p>
              </div>
            </div>

            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Crafting digital experiences through clean code and modern design.
              Specialized in building scalable web applications with cutting-edge technologies.
            </p>

            <div className="flex gap-4 flex-col sm:flex-row justify-center lg:justify-start">
              <button className="px-6 md:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Get in Touch
              </button>
              <button className="px-6 md:px-8 py-3 border border-gray-700 rounded-full text-white font-medium hover:border-purple-500 transition-all duration-300">
                View Projects
              </button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {["React", "TypeScript", "Node.js", "AWS"].map((tech, i) => (
                <div key={i} className="tech-pill whitespace-nowrap">
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="relative mt-12 lg:mt-0">
            <div className="relative z-10 max-w-[300px] md:max-w-[400px] mx-auto">
              <div className="relative perspective-card group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl transform -skew-x-12 group-hover:skew-x-0 transition-transform duration-300" />
                <div className="relative bg-gray-900/80 backdrop-blur-xl p-4 md:p-8 rounded-3xl border border-gray-800 group-hover:border-purple-500/50 transition-all duration-300">
                  <img 
                    src="/pfp.jpeg" 
                    alt="Siddharth Sahu"
                    className="w-full aspect-[4/5] object-cover rounded-2xl"
                  />
                  
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4">
                    {[Github, Linkedin, Mail].map((Icon, i) => (
                      <a
                        key={i}
                        className="p-2 md:p-3 bg-gray-800/90 rounded-full backdrop-blur-xl hover:bg-purple-500/20 transition-colors duration-300"
                        href="#"
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
              <div className="floating-element absolute top-20 left-0 w-16 md:w-20 h-16 md:h-20 bg-purple-500/10 rounded-full blur-xl" />
              <div className="floating-element absolute bottom-20 right-0 w-24 md:w-32 h-24 md:h-32 bg-blue-500/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
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
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid opacity-20">
          <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent animate-pulse" />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-gray-400 text-xl font-medium">What I've Built</h2>
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-500 to-blue-500">
                  Featured Projects
                </h1>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-purple-500" />
                  <p className="text-xl text-gray-400">Recent Work</p>
                </div>
              </div>

              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                Explore my latest projects showcasing expertise in full-stack development, 
                machine learning, and modern web technologies.
              </p>
            </div>

            {/* Right Content - Projects Grid */}
            <div className="relative">
              <div className="grid gap-6">
                {projectsData.map((project, i) => (
                  <GlowingCard key={i} className="transform hover:scale-105 transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
                          {project.icon}
                        </div>
                        <h3 className="text-2xl font-bold gradient-text">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 mb-6">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, j) => (
                          <span
                            key={j}
                            className="tech-pill"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlowingCard>
                ))}
              </div>

              {/* Floating Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="floating-element absolute top-20 left-0 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />
                <div className="floating-element absolute bottom-20 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

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
