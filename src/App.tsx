import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Mail, Linkedin, Code2, MapPin, Phone, GraduationCap, Briefcase, Heart, Car, Code, Database, Terminal, Globe } from 'lucide-react';

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
      className={`py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const SkillCard = ({ icon: Icon, title, skills }: { icon: any; title: string; skills: string[] }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg transform group-hover:rotate-12 transition-transform">
          <Icon className="text-white" size={24} />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {title}
        </h3>
      </div>
      <ul className="grid grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="px-4 py-2 bg-gray-50/50 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 transition-colors"
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const ProjectCard = ({ title, description, tech, icon: Icon }: { title: string; description: string; tech: string[]; icon: any }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="group relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Icon className="text-white" size={28} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-3">
          {tech.map((t, index) => (
            <motion.span 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-100 transition-colors"
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

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Progress Bar */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 origin-left z-50"
      />

      {/* Hero Section */}
      <Section className="min-h-fit flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 transform -skew-y-6" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="mb-12"
          >
            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
              <span className="text-5xl text-white font-bold animate-pulse">SS</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-gray-900 mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Siddharth Sahu
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-medium text-gray-600 mb-12"
          >
            Building Digital Experiences with <span className="text-blue-600">Innovation</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center space-x-8"
          >
            {[
              { icon: Github, link: 'https://github.com' },
              { icon: Mail, link: 'mailto:email@example.com' },
              { icon: Linkedin, link: 'https://linkedin.com' },
              { icon: Code2, link: 'https://leetcode.com' },
            ].map((item, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={item.link}
                className="p-3 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <item.icon className="text-gray-700 hover:text-blue-600" size={28} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-24 animate-float"
          >
            <div className="w-8 h-8 mx-auto border-4 border-blue-500 rounded-full animate-ping" />
          </motion.div>
        </div>
      </Section>

      {/* Education & Experience */}
      <Section className="bg-white/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Education */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-white rounded-2xl shadow-xl border-l-8 border-blue-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <GraduationCap className="text-blue-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Education</h2>
              </div>
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">Siksha 'O' Anusandhan University</h3>
                  <p className="text-gray-600 mt-2">B.Tech in Computer Science</p>
                  <p className="text-blue-600 font-medium mt-2">CGPA: 8.18</p>
                  <p className="text-gray-500 text-sm mt-2">2021 - 2025</p>
                </div>
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-white rounded-2xl shadow-xl border-l-8 border-indigo-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <Briefcase className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Experience</h2>
              </div>
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">Block Stars Pvt Ltd</h3>
                  <p className="text-gray-600 mt-2">Full Stack Developer</p>
                  <div className="mt-4 space-y-3 text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      Designed responsive UI components
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
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
      <Section className="bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
      <Section className="bg-white/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
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
      <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-12">
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
                className="p-3 bg-white/10 rounded-full backdrop-blur-lg hover:bg-white/20 transition-all"
              >
                <Icon className="text-white" size={24} />
              </motion.a>
            ))}
          </motion.div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Siddharth Sahu. Crafted with passion and React.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;