'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary-400" />
          <span className="text-sm text-gray-300">Available for freelance work</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-white">Hi, I&apos;m </span>
          <span className="gradient-text">Ehtisham</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Full-Stack Developer & <span className="text-primary-400">AI Engineer</span> crafting 
          intelligent web experiences with cutting-edge technology
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#projects" className="btn-primary">
            View My Work
          </Link>
          <Link href="#contact" className="btn-secondary">
            Get In Touch
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { number: '50+', label: 'Projects' },
            { number: '3+', label: 'Years Exp.' },
            { number: '30+', label: 'Happy Clients' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.number}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <Link href="#about" className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
            <span className="text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
