import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
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

// Define timeline data
const timelineData = [
  {
    date: "Nov 2021 - Aug 2025",
    title: "Bachelor of Technology – Computer Science and Engineering",
    subtitle: "Siksha ’O’ Anusandhan University (ITER)",
    description: "CGPA: 8.18 | Bhubaneswar, Odisha",
    icon: <GraduationCap className="text-emerald-400" size={24} />,
  },
  {
    date: "Nov 2024 - Jan 2025",
    title: "Full Stack Developer",
    subtitle: "Block Stars Pvt Ltd",
    description: "Remote | Designed and implemented reusable UI components and responsive web pages.",
    icon: <Briefcase className="text-indigo-400" size={24} />,
  },
];

// Define skills data
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

// Define projects data
const projectsData = [
  {
    title: "GoCabs",
    description: "Real-time cab booking platform with live tracking",
    technologies: ["React", "Node.js", "WebSockets"],
    icon: <Car className="text-indigo-400" size={32} />,
  },
  {
    title: "Health AI",
    description: "Machine learning model for disease prediction",
    technologies: ["Python", "TensorFlow", "Pandas"],
    icon: <Heart className="text-emerald-400" size={32} />,
  },
];

// CyberButton Component
const CyberButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      x.set(e.clientX - rect.left - rect.width / 2);
      y.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`relative cursor-pointer overflow-hidden ${className}`}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          background: useMotionTemplate`radial-gradient(120px circle at ${springX}px ${springY}px, 
            rgba(110, 231, 183, 0.4),
            transparent 80%)`,
        }}
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
      />
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-500 rounded-xl" />
    </motion.div>
  );
};

// HolographicSection Component
const HolographicSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className={`relative py-24 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: useMotionTemplate`
            conic-gradient(
              from 230.29deg at 51.63% 52.16%,
              hsl(160, 60%, 50%) 0deg,
              hsl(180, 100%, 50%) 60deg,
              hsl(200, 100%, 50%) 120deg,
              hsl(220, 100%, 50%) 180deg,
              hsl(240, 100%, 50%) 240deg,
              hsl(260, 100%, 50%) 300deg,
              hsl(160, 60%, 50%) 360deg
            )
          `,
          filter: `blur(80px)`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">{children}</div>
    </motion.section>
  );
};

// GlowingCard Component
const GlowingCard = ({ children }: { children: React.ReactNode }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [0, 400], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 400], [-10, 10]), { stiffness: 300, damping: 30 });

  return (
    <motion.div
      onMouseMove={({ clientX, clientY, currentTarget }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="group relative bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-gray-800 p-8 shadow-2xl"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, 
            rgba(110, 231, 183, 0.1),
            transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

// App Component
function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const background = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(0deg, #0c0a1d 0%, #1a1438 100%)",
      "linear-gradient(180deg, #0c0a1d 0%, #2a1e5c 100%)",
    ]
  );

  // GlitchText Component
  const GlitchText = ({ children }: { children: string }) => (
    <div className="relative inline-block">
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-indigo-400 to-purple-400 bg-clip-text opacity-40"
        animate={{
          x: [-2, 2, -2, 2, 0],
          y: [1, -1, 1, -1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {children}
      </motion.span>
      <span className="relative bg-gradient-to-r from-emerald-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
        {children}
      </span>
    </div>
  );

  return (
    <motion.div style={{ background }} className="min-h-screen">
      {/* Animated grid lines */}
      <motion.div
        style={{ rotate }}
        className="fixed inset-0 opacity-5 pointer-events-none"
      >
        <svg className="w-full h-full">
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0V80H0" fill="none" className="stroke-current" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-indigo-500 origin-left z-50"
      />

      {/* Hero Section */}
      <HolographicSection className="h-fit flex items-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-12 inline-block relative"
          >
            <div className="relative w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-indigo-500 p-1 shadow-2xl">
              <div className="absolute inset-0 rounded-full animate-spin-slow [background:conic-gradient(rgba(110,231,183,0.4),transparent)]" />
              <motion.img
                src="/pfp.jpeg"
                alt="Siddharth Sahu"
                className="w-full h-full rounded-full border-4 border-gray-900/80 backdrop-blur-xl"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-pulse" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-extrabold mb-6"
          >
            <GlitchText>Siddharth Sahu</GlitchText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Full Stack Architect crafting immersive digital experiences through innovative code and modern design.
          </motion.p>

          <div className="flex justify-center gap-6 mb-8">
            {[Github, Mail, Linkedin, Code2].map((Icon, i) => (
              <CyberButton key={i}>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-lg block"
                >
                  <Icon className="text-gray-300 h-8 w-8" />
                </motion.a>
              </CyberButton>
            ))}
          </div>

          {/* Download CV Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <CyberButton className="mx-auto">
              <motion.a
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-400/20 to-indigo-400/20 rounded-xl backdrop-blur-lg flex items-center gap-2"
                href="/siddcv.pdf"
              >
                <Download className="text-emerald-400" />
                <span className="bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent font-semibold">
                  Download CV
                </span>
              </motion.a>
            </CyberButton>
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                initial={{
                  scale: 0,
                  x: Math.random() * 100 - 50 + "%",
                  y: Math.random() * 100 - 50 + "%",
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      </HolographicSection>

      {/* Timeline Section */}
      <HolographicSection>
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-emerald-400/20 to-indigo-400/20" />
          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              className="relative mb-16 w-full"
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className={`flex ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center`}>
                <div className="w-6 h-6 bg-emerald-400 rounded-full z-10" />
                <div className="flex-1 p-8">
                  <GlowingCard>
                    <div className="flex items-center gap-4 mb-4">
                      {item.icon}
                      <h3 className="text-2xl font-bold text-gray-100">{item.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-2">{item.subtitle}</p>
                    <p className="text-gray-500 text-sm mb-4">{item.date}</p>
                    <p className="text-gray-400">{item.description}</p>
                  </GlowingCard>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </HolographicSection>

      {/* Skills Section */}
      <HolographicSection>
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-emerald-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Technical Expertise
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillsData.map((skill, i) => (
            <GlowingCard key={i}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-400/20 to-indigo-400/20 rounded-lg">
                  <Code className="text-emerald-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-100">{skill.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.skills.map((item, j) => (
                  <motion.span
                    key={j}
                    className="px-3 py-1.5 bg-gray-800/50 rounded-full text-sm text-emerald-300 backdrop-blur-sm"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </GlowingCard>
          ))}
        </div>
      </HolographicSection>

      {/* Projects Section */}
      <HolographicSection className="bg-gradient-to-br from-gray-900/50 to-indigo-900/20">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projectsData.map((project, i) => (
            <GlowingCard key={i}>
              <div className="flex items-center gap-4 mb-6">
                {project.icon}
                <h3 className="text-2xl font-bold text-gray-100">{project.title}</h3>
              </div>
              <p className="text-gray-400 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 bg-indigo-400/10 text-indigo-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlowingCard>
          ))}
        </div>
      </HolographicSection>

      {/* Footer */}
      <footer className="relative border-t border-gray-800/50 py-12 backdrop-blur-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-8">
            <motion.a
              whileHover={{ y: -5 }}
              href="#"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              whileHover={{ y: -5 }}
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              whileHover={{ y: -5 }}
              href="#"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Mail size={24} />
            </motion.a>
          </div>
          <p className="text-gray-600">
            © {new Date().getFullYear()} Siddharth Sahu. Built with{" "}
            <span className="text-emerald-400">innovation</span>
          </p>
        </div>
      </footer>
    </motion.div>
  );
}

export default App;