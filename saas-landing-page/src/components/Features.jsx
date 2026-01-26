import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Clock, 
  Globe, 
  Puzzle 
} from 'lucide-react'

/**
 * Features Component
 * 
 * Displays product features in a responsive grid layout.
 * Each feature card has:
 * - Icon with gradient background
 * - Title and description
 * - Hover animation effects
 */
function Features({ isDarkMode }) {
  // Feature items configuration
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process thousands of tasks in milliseconds with our optimized AI engine. No more waiting around.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and SOC 2 compliance. Your data is protected with the highest standards.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Get deep insights into your workflow with real-time dashboards and custom reports.',
    },
    {
      icon: Clock,
      title: 'Save 10+ Hours Weekly',
      description: 'Automate repetitive tasks and focus on what matters. Our users report massive time savings.',
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Lightning-fast performance worldwide with our distributed infrastructure across 50+ regions.',
    },
    {
      icon: Puzzle,
      title: '100+ Integrations',
      description: 'Connect with your favorite tools - Slack, Notion, Jira, GitHub, and many more.',
    },
  ]
  
  // Animation variants for the grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }
  
  return (
    <section id="features" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to
            <span className="gradient-text"> Scale</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Powerful features designed to help your team work smarter, not harder. 
            Built for modern businesses that demand excellence.
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`p-6 rounded-2xl transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-dark-200 hover:bg-dark-100 border border-gray-800 hover:border-primary-500/50' 
                  : 'bg-white hover:shadow-xl border border-gray-100'
              }`}
            >
              {/* Icon Container */}
              <div className="w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary-500" />
              </div>
              
              {/* Feature Title */}
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              
              {/* Feature Description */}
              <p className={`leading-relaxed ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features
