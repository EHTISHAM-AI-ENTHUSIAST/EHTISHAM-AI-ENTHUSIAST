'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, MapPin } from 'lucide-react'

const experiences = [
  {
    title: 'Senior AI Software Engineer',
    company: 'Freelance / Independent',
    location: 'Remote',
    period: '2023 - Present',
    description: [
      'Developing AI-powered web applications using OpenAI, LangChain, and modern frameworks',
      'Building full-stack solutions with Next.js, FastAPI, and cloud infrastructure',
      'Delivering 30+ projects for clients across various industries',
      'Implementing automation tools that save clients 100+ hours monthly',
    ],
    current: true,
  },
  {
    title: 'Full-Stack Developer',
    company: 'Tech Startup',
    location: 'Lahore, Pakistan',
    period: '2022 - 2023',
    description: [
      'Built and maintained multiple React/Next.js applications',
      'Developed RESTful APIs using Node.js and Python',
      'Implemented CI/CD pipelines and Docker containerization',
      'Collaborated with cross-functional teams in Agile environment',
    ],
    current: false,
  },
  {
    title: 'Junior Web Developer',
    company: 'Digital Agency',
    location: 'Lahore, Pakistan',
    period: '2021 - 2022',
    description: [
      'Created responsive websites using React and Tailwind CSS',
      'Integrated third-party APIs and payment gateways',
      'Optimized website performance and SEO',
      'Worked closely with designers to implement pixel-perfect UIs',
    ],
    current: false,
  },
]

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-padding bg-dark-200/30">
      <div className="container-custom">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-primary-400 font-medium mb-4 block">Career Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold">Work <span className="gradient-text">Experience</span></h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-purple-500 to-transparent" />
          {experiences.map((exp, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary-500 -translate-x-1/2 mt-2 ring-4 ring-dark-300" />
              <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className={`p-6 rounded-2xl glass ${exp.current ? 'border border-primary-500/30' : ''}`}>
                  {exp.current && <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-500/20 text-primary-400 rounded-full mb-3">Current Position</span>}
                  <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                  <p className="text-primary-400 font-medium mb-3">{exp.company}</p>
                  <div className={`flex flex-wrap gap-4 text-sm text-gray-500 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{exp.period}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{exp.location}</span>
                  </div>
                  <ul className={`space-y-2 text-gray-400 text-sm ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    {exp.description.map((item, i) => (<li key={i} className="flex items-start gap-2"><span className="text-primary-400 mt-1"></span>{item}</li>))}
                  </ul>
                </div>
              </div>
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
