import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Mail, Linkedin, Code2, GraduationCap, Briefcase, Heart, Car, Code, Database, Terminal, Globe, Download } from 'lucide-react';

// Noise texture SVG pattern
const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

// Magnetic interaction component
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
      whileHover={{ scale: 1.05 }}
      className={`relative cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Hover glow effect component
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
      className="absolute inset-0 pointer-events-none"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(34,211,238,0.1), transparent 80%)`
        }}
      />
    </motion.div>
  );
};

// Animated section wrapper
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
      <HoverGlow />
      {children}
    </motion.section>
  );
};

// Skill card component
const SkillCard = ({ icon: Icon, title, skills }: { icon: any; title: string; skills: string[] }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-2xl rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-400/30 transition-all relative group overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light" style={{ background: noiseTexture }} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <motion.div 
            animate={{ rotate: [0, 15, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg"
          >
            <Icon className="text-white" size={24} />
          </motion.div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {skills.map((skill, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="px-4 py-2 bg-gray-700/30 rounded-full text-sm font-medium text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300 transition-colors backdrop-blur-sm"
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// Project card component
const ProjectCard = ({ title, description, tech, icon: Icon }: { title: string; description: string; tech: string[]; icon: any }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-2xl rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-400/30 transition-all overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light" style={{ background: noiseTexture }} />
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            whileHover={{ rotate: 12 }}
            className="p-4 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl"
          >
            <Icon className="text-white" size={28} />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-100">{title}</h3>
        </div>
        <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-3">
          {tech.map((t, index) => (
            <motion.span 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gray-700/30 rounded-full text-sm font-medium text-cyan-300 hover:bg-cyan-400/10 transition-colors backdrop-blur-sm"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated grid background */}
      <motion.div 
        style={{ rotate }}
        className="fixed inset-0 opacity-20 mix-blend-soft-light"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(55 65 81 / 0.5)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Progress bar */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 origin-left z-50 backdrop-blur-sm"
      />

      {/* Hero section */}
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
                className="text-5xl text-white font-bold"
              >
                <img src="/pfp.jpeg" alt="Siddharth Sahu" className="w-40 h-40 rounded-full" />
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

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30"
            initial={{
              scale: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            animate={{
              scale: [0, 1, 0],
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
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
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 py-12 border-t border-gray-700/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center space-x-8 mb-8"
          >
            {[Github, Mail, Linkedin].map((Icon, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -5, scale: 1.1 }}
                href="#"
                className="p-3 bg-gray-700/50 rounded-full backdrop-blur-lg hover:bg-cyan-400/20 transition-all"
              >
                <Icon className="text-gray-400 hover:text-cyan-400 transition-colors" size={24} />
              </motion.a>
            ))}
          </motion.div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Siddharth Sahu. Crafted with <span className="text-cyan-400">innovation</span> and React.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;