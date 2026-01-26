'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React/Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python/FastAPI', level: 92 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'REST/GraphQL', level: 88 },
    ],
  },
  {
    title: 'AI/ML',
    skills: [
      { name: 'OpenAI/LangChain', level: 88 },
      { name: 'TensorFlow', level: 75 },
      { name: 'Computer Vision', level: 80 },
      { name: 'NLP', level: 82 },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS/Vercel', level: 88 },
      { name: 'Git/GitHub', level: 95 },
      { name: 'CI/CD', level: 82 },
    ],
  },
]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section-padding bg-dark-200/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-medium mb-4 block">My Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="p-6 rounded-2xl glass card-hover"
            >
              <h3 className="text-xl font-semibold mb-6 text-white">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-primary-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-8">Technologies I work with</p>
          <div className="flex flex-wrap justify-center gap-8">
            {['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'].map(
              (tech) => (
                <div
                  key={tech}
                  className="px-6 py-3 rounded-lg glass text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
