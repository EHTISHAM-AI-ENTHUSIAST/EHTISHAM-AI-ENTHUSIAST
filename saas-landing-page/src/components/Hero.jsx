import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Users, TrendingUp } from 'lucide-react'

/**
 * Hero Component
 * 
 * The main above-the-fold section featuring:
 * - Animated headline and subheadline
 * - CTA buttons (primary and secondary)
 * - Social proof stats
 * - Floating decorative elements
 */
function Hero({ isDarkMode }) {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }
  
  // Social proof statistics
  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Users' },
    { icon: TrendingUp, value: '99.9%', label: 'Uptime' },
    { icon: Sparkles, value: '50M+', label: 'Tasks Automated' },
  ]
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>
      
      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            isDarkMode 
              ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' 
              : 'bg-primary-50 text-primary-600 border border-primary-200'
          }`}>
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Advanced AI
          </span>
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
        >
          Transform Your Workflow
          <span className="block gradient-text mt-2">With Intelligent AI</span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p 
          variants={itemVariants}
          className={`max-w-2xl mx-auto text-lg sm:text-xl mb-10 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          FlowAI helps teams automate repetitive tasks, analyze data intelligently, 
          and boost productivity by 10x. Start your journey to effortless efficiency.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* Primary CTA */}
          <motion.a
            href="#pricing"
            className="group flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl btn-glow transition-all text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          
          {/* Secondary CTA */}
          <motion.a
            href="#demo"
            className={`group flex items-center px-8 py-4 font-semibold rounded-xl transition-all text-lg ${
              isDarkMode 
                ? 'bg-dark-100 text-white hover:bg-dark-200 border border-gray-700' 
                : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="mr-2 w-5 h-5 text-primary-500" />
            Watch Demo
          </motion.a>
        </motion.div>
        
        {/* Social Proof Stats */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <stat.icon className={`w-5 h-5 mr-2 ${
                  isDarkMode ? 'text-primary-400' : 'text-primary-500'
                }`} />
                <span className="text-2xl sm:text-3xl font-bold">{stat.value}</span>
              </div>
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Bottom Gradient Fade */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${
        isDarkMode ? 'from-dark-300' : 'from-gray-50'
      } to-transparent pointer-events-none`} />
    </section>
  )
}

export default Hero
