import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

/**
 * Main App Component
 * 
 * This is the root component of our SaaS landing page.
 * It manages the dark/light theme state and renders all sections.
 */
function App() {
  // Theme state - defaults to dark mode
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  // Check for saved theme preference on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      // Check system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(prefersDark)
    }
  }, [])
  
  // Update document class and save preference when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])
  
  // Toggle theme function passed to Navbar
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode)
  }
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-dark-300 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Navigation Bar - sticky at top */}
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      {/* Main Content */}
      <main>
        {/* Hero Section - Above the fold content */}
        <Hero isDarkMode={isDarkMode} />
        
        {/* Features Section - Product highlights */}
        <Features isDarkMode={isDarkMode} />
        
        {/* Pricing Section - Pricing tiers */}
        <Pricing isDarkMode={isDarkMode} />
        
        {/* Testimonials Section - Social proof */}
        <Testimonials isDarkMode={isDarkMode} />
      </main>
      
      {/* Footer - Links and copyright */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}

export default App
