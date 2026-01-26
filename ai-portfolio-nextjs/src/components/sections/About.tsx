'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Brain, Rocket, Coffee } from 'lucide-react'

const highlights = [
  { icon: Code, label: 'Clean Code', description: 'Writing maintainable, scalable code' },
  { icon: Brain, label: 'AI Integration', description: 'Building intelligent solutions' },
  { icon: Rocket, label: 'Fast Delivery', description: 'Meeting deadlines consistently' },
  { icon: Coffee, label: 'Passionate', description: 'Loving what I do every day' },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-500/5 to-transparent" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary-400 font-medium mb-4 block">About Me</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Turning <span className="gradient-text">Ideas</span> Into Reality
            </h2>
            <div className="space-y-4 text-gray-400">
              <p>
                I&apos;m a passionate Full-Stack Developer and AI Engineer with over 3 years of experience 
                building web applications that make a difference. I specialize in creating intelligent, 
                user-centric solutions using modern technologies.
              </p>
              <p>
                My journey started with a curiosity about how things work on the web. Today, I combine 
                my expertise in frontend development, backend systems, and artificial intelligence to 
                build products that solve real-world problems.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new AI technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="p-4 rounded-xl glass"
                >
                  <item.icon className="w-6 h-6 text-primary-400 mb-2" />
                  <h3 className="font-semibold text-white">{item.label}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 p-8 rounded-2xl glass">
              {/* Code Block Visual */}
              <div className="bg-dark-300 rounded-lg p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <pre className="text-gray-300">
                  <code>{`const developer = {
  name: "Ehtisham Ashraf",
  role: "Full-Stack AI Engineer",
  skills: [
    "React/Next.js",
    "Python/FastAPI",
    "Machine Learning",
    "Cloud Deployment"
  ],
  passion: "Building the future",
  coffee: "unlimited ☕"
};

developer.create("amazing-apps");`}</code>
                </pre>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
