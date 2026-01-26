import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

/**
 * Testimonials Component
 * 
 * Displays customer testimonials in a card layout.
 * Each testimonial includes:
 * - Customer photo
 * - Quote text
 * - Star rating
 * - Customer name and role
 */
function Testimonials({ isDarkMode }) {
  // Testimonial data
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO at TechStart',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      quote: 'FlowAI has completely transformed how our team operates. We\'ve automated 80% of our repetitive tasks and our productivity has skyrocketed.',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Founder at DataDrive',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      quote: 'The AI capabilities are genuinely impressive. It understood our workflow patterns and suggested optimizations we hadn\'t even considered.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager at ScaleUp',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      quote: 'Best investment we\'ve made this year. The ROI was evident within the first month. Our team now focuses on creative work instead of busywork.',
      rating: 5,
    },
  ]
  
  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
    ))
  }
  
  return (
    <section id="testimonials" className="section-padding">
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
            Loved by
            <span className="gradient-text"> Thousands</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Don't just take our word for it. Here's what our customers have to say 
            about their experience with FlowAI.
          </p>
        </motion.div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl ${
                isDarkMode 
                  ? 'bg-dark-200 border border-gray-800' 
                  : 'bg-white border border-gray-100 shadow-sm'
              }`}
            >
              {/* Quote Icon */}
              <Quote className={`w-8 h-8 mb-4 ${
                isDarkMode ? 'text-primary-500/30' : 'text-primary-200'
              }`} />
              
              {/* Testimonial Quote */}
              <p className={`mb-6 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                "{testimonial.quote}"
              </p>
              
              {/* Star Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Customer Info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 bg-gray-200"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className={`text-sm mb-6 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            TRUSTED BY TEAMS AT
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix'].map((company) => (
              <span 
                key={company}
                className={`text-xl font-bold ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
