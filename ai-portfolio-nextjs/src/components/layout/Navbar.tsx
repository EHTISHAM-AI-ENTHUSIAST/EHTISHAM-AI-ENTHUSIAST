'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'py-6'
      }`}
    >
      <nav className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative group">
          <span className="text-2xl font-bold gradient-text">EA</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-gray-300 hover:text-white transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Social Links & CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/EHTISHAM-AI-ENTHUSIAST"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ehtisham-ashraf-b9b220395"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <Link href="#contact" className="btn-primary text-sm">
            Let&apos;s Talk
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-4 mx-4 rounded-xl overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <a
                  href="https://github.com/EHTISHAM-AI-ENTHUSIAST"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ehtisham-ashraf-b9b220395"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
