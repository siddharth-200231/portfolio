import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Mail, Linkedin, Code2, GraduationCap, Briefcase, Heart, Car, Code, Database, Terminal, Globe, Download } from 'lucide-react';

// Noise texture for subtle background effects
const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

// Magnetic button component for interactive hover effects
const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      x.set(clientX - rect.left - rect.width / 2);
      y.set(clientY - rect.top - rect.height / 2);
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Hover glow effect for interactive elements
const HoverGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, 
            rgba(34, 211, 238, 0.15),
            transparent 80%)`
        }}
      />
    </motion.div>
  );
};

// Section wrapper with entrance animations
const Section = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, type: 'spring' }}
      className={`py-20 relative ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      <HoverGlow />
      {children}
    </motion.section>
  );
};

// Skill card component with hover animations
const SkillCard = ({ icon: Icon, title, skills }: { icon: any; title: string; skills: string[] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="group relative bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-3xl rounded-2xl p-6 border border-gray-800 hover:border-cyan-400/20 transition-all duration-300 shadow-2xl"
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ background: noiseTexture }} />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <motion.div 
            animate={{ rotate: [0, 15, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="p-3 bg-gradient-to-br from-cyan-400/90 to-purple-600/90 rounded-lg shadow-lg"
          >
            <Icon className="text-white" size={24} />
          </motion.div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {skills.map((skill, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="px-3 py-2 bg-gray-900/50 rounded-full text-sm font-medium text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300 transition-all duration-300 backdrop-blur-sm border border-gray-800/50 hover:border-cyan-400/30"
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// Project card component with dynamic hover effects
const ProjectCard = ({ title, description, tech, icon: Icon }: { title: string; description: string; tech: string[]; icon: any }) => {
  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);

  const handleHover = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const rect = currentTarget.getBoundingClientRect();
    hoverX.set(clientX - rect.left);
    hoverY.set(clientY - rect.top);
  };

  return (
    <motion.div 
      onMouseMove={handleHover}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="group relative bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-3xl rounded-2xl p-8 border border-gray-800 hover:border-cyan-400/20 transition-all duration-300 shadow-2xl overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ background: noiseTexture }} />
      <motion.div
        className="absolute -inset-px bg-gradient-radial from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          x: hoverX,
          y: hoverY,
          background: useMotionTemplate`radial-gradient(300px circle at ${hoverX}px ${hoverY}px, 
            rgba(34, 211, 238, 0.1),
            transparent 80%)`
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            whileHover={{ rotate: 12 }}
            className="p-4 bg-gradient-to-br from-cyan-400/90 to-purple-600/90 rounded-xl shadow-lg"
          >
            <Icon className="text-white" size={28} />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-100">{title}</h3>
        </div>
        <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t, index) => (
            <motion.span 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1.5 bg-gray-900/50 rounded-full text-sm font-medium text-cyan-300 hover:bg-cyan-400/10 transition-all duration-300 backdrop-blur-sm border border-gray-800/50 hover:border-cyan-400/30"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main App component
function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Dynamic grid background */}
      <motion.div 
        style={{ rotate, y }}
        className="fixed inset-0 opacity-10 mix-blend-overlay pointer-events-none"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgb(17 24 39 / 0.5)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Progress bar */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 origin-left z-50 backdrop-blur-sm shadow-xl"
      />

      {/* Hero Section */}
      <Section className="h-fit flex items-center justify-center">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="mb-12"
          >
            <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-2xl relative">
              <div className="absolute inset-0 rounded-full bg-cyan-400/30 animate-pulse blur-xl" />
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="relative overflow-hidden rounded-full"
              >
                <img src="/pfp.jpeg" alt="Siddharth Sahu" className="w-40 h-40 rounded-full border-4 border-black/50" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 mix-blend-overlay" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Siddharth Sahu
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {['Full Stack Dev', 'Mern Stack Developer', 'DevOps'].map((text, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="px-6 py-2 bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-700/50"
              >
                <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent text-sm md:text-base">
                  {text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-6"
          >
            {[
              { icon: Github, link: 'https://github.com/siddharth-200231' },
              { icon: Mail, link: 'sahusidd715@gmail.com' },
              { icon: Linkedin, link: 'https://www.linkedin.com/in/siddharth-sahu-40aa57289/' },
              { icon: Code2, link: 'https://leetcode.com/u/siddharth_123456/' },
            ].map((item, index) => (
              <MagneticButton key={index}>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={item.link}
                  className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-cyan-400/50 backdrop-blur-xl transition-all group"
                >
                  <item.icon className="text-gray-400 group-hover:text-cyan-400 transition-colors" size={28} />
                </motion.a>
              </MagneticButton>
            ))}
          </motion.div>

          {/* Download CV Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12"
          >
            <a
              href="/siddcv.pdf" // Replace with your CV path
              download="Siddharth_Sahu_CV.pdf"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full text-white font-medium hover:from-cyan-500 hover:to-purple-700 transition-all"
            >
              <Download className="mr-2" size={20} />
              Download CV
            </a>
          </motion.div>
        </div>

        {/* Animated floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30"
            initial={{
              scale: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            animate={{
              scale: [0, Math.random() * 0.5 + 0.3, 0],
              x: [0, Math.random() * 400 - 200, 0],
              y: [0, Math.random() * 400 - 200, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
          />
        ))}
      </Section>

      {/* Education & Experience Section */}
      <Section className="relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Education */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-gray-800/50 backdrop-blur-2xl rounded-2xl border border-gray-700/50 hover:border-cyan-400/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <GraduationCap className="text-cyan-400" size={32} />
                <h2 className="text-3xl font-bold text-gray-100">Education</h2>
              </div>
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-700/50">
                  <h3 className="text-xl font-semibold text-gray-100">Siksha 'O' Anusandhan University</h3>
                  <p className="text-gray-400 mt-2">B.Tech in Computer Science</p>
                  <p className="text-cyan-400 font-medium mt-2">CGPA: 8.18</p>
                  <p className="text-gray-500 text-sm mt-2">2021 - 2025</p>
                </div>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-gray-800/50 backdrop-blur-2xl rounded-2xl border border-gray-700/50 hover:border-purple-400/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <Briefcase className="text-purple-400" size={32} />
                <h2 className="text-3xl font-bold text-gray-100">Experience</h2>
              </div>
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-700/50">
                  <h3 className="text-xl font-semibold text-gray-100">Block Stars Pvt Ltd</h3>
                  <p className="text-gray-400 mt-2">Full Stack Developer</p>
                  <div className="mt-4 space-y-3 text-gray-400">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                      Designed responsive UI components
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                      Optimized RESTful APIs integration
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            Technical Arsenal
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Code, title: "Languages", skills: ['JavaScript', 'Java', 'Python'] },
              { icon: Globe, title: "Frontend", skills: ['React', 'Next.js', 'Tailwind CSS'] },
              { icon: Terminal, title: "Backend", skills: ['Node.js', 'Express.js', 'REST APIs'] },
              { icon: Database, title: "Databases", skills: ['MongoDB', 'MySQL'] },
              { icon: Code2, title: "DevOps", skills: ['Git', 'GitHub', 'Vercel'] },
              { icon: Terminal, title: "ML", skills: ['Scikit-learn', 'Pandas', 'Numpy'] }
            ].map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section className="relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Key Projects
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <ProjectCard
              icon={Car}
              title="GoCabs"
              description="Real-time cab booking platform with live tracking and instant updates."
              tech={['React', 'Node.js', 'WebSockets', 'MongoDB']}
            />
            <ProjectCard
              icon={Heart}
              title="Heart Disease Detector"
              description="ML model predicting heart disease with 84% accuracy using Random Forest."
              tech={['Python', 'Pandas', 'Scikit-learn']}
            />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-black/80 to-gray-900/50 py-12 border-t border-gray-800 backdrop-blur-2xl">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center space-x-8 mb-8"
          >
            {[Github, Mail, Linkedin].map((Icon, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -5, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-3 bg-gray-900/50 rounded-full backdrop-blur-lg hover:bg-cyan-400/20 transition-all border border-gray-800/50 hover:border-cyan-400/30"
              >
                <Icon className="text-gray-400 hover:text-cyan-400 transition-colors" size={24} />
              </motion.a>
            ))}
          </motion.div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Siddharth Sahu. Crafted with <span className="text-cyan-400">passion</span> in the dark.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;