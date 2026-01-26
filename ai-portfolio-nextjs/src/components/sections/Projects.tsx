'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

const projects = [
  {
    title: 'AI Document Extractor',
    description: 'Intelligent document processing system using GPT-4 Vision API to extract structured data from invoices, receipts, and forms.',
    tags: ['Python', 'OpenAI', 'FastAPI', 'React'],
    github: 'https://github.com/EHTISHAM-AI-ENTHUSIAST/EHTISHAM-AI-ENTHUSIAST/tree/main/document-vision-ai',
    live: '#',
    category: 'AI',
  },
  {
    title: 'Lead Scraper Dashboard',
    description: 'Automated business lead generation tool with Google Maps integration and intelligent email extraction.',
    tags: ['Python', 'Selenium', 'Streamlit', 'Automation'],
    github: 'https://github.com/EHTISHAM-AI-ENTHUSIAST/EHTISHAM-AI-ENTHUSIAST/tree/main/lead-scraper-dashboard',
    live: '#',
    category: 'Automation',
  },
  {
    title: 'E-Commerce API',
    description: 'Production-ready REST API with JWT authentication, product management, and order processing.',
    tags: ['FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
    github: 'https://github.com/EHTISHAM-AI-ENTHUSIAST/EHTISHAM-AI-ENTHUSIAST/tree/main/ecommerce-api',
    live: '#',
    category: 'Backend',
  },
  {
    title: 'SaaS Landing Page',
    description: 'Modern, conversion-optimized landing page with smooth animations and responsive design.',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
    github: 'https://github.com/EHTISHAM-AI-ENTHUSIAST/EHTISHAM-AI-ENTHUSIAST/tree/main/saas-landing-page',
    live: '#',
    category: 'Frontend',
  },
  {
    title: 'Task Tracker MVP',
    description: 'Full-stack task management application with real-time updates and collaborative features.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com/EHTISHAM-AI-ENTHUSIAST/EHTISHAM-AI-ENTHUSIAST/tree/main/task-tracker-mvp',
    live: '#',
    category: 'Full-Stack',
  },
  {
    title: 'AI Portfolio (This Site)',
    description: 'Modern portfolio with AI chatbot integration, built with Next.js 14 and Framer Motion.',
    tags: ['Next.js', 'OpenAI', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/EHTISHAM-AI-ENTHUSIAST/EHTISHAM-AI-ENTHUSIAST/tree/main/ai-portfolio-nextjs',
    live: '#',
    category: 'Full-Stack',
  },
]

const categories = ['All', 'AI', 'Full-Stack', 'Frontend', 'Backend', 'Automation']

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary-400 font-medium mb-4 block">My Work</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl glass overflow-hidden card-hover"
            >
              <div className="h-48 bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-4xl opacity-50"></span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded bg-white/5 text-gray-400">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                    <Github className="w-4 h-4" />Code
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors">
                    <ExternalLink className="w-4 h-4" />Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="text-center mt-12">
          <a href="https://github.com/EHTISHAM-AI-ENTHUSIAST" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
            View all projects on GitHub<ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
