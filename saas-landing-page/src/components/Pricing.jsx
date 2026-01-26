import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

/**
 * Pricing Component
 * 
 * Displays pricing tiers in a responsive layout.
 * Features:
 * - Three pricing tiers (Free, Pro, Enterprise)
 * - Highlighted "Popular" badge on recommended plan
 * - Feature checklist for each tier
 * - CTA buttons with hover effects
 */
function Pricing({ isDarkMode }) {
  // Pricing plans configuration
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for individuals and small projects',
      features: [
        '100 AI tasks per month',
        'Basic analytics dashboard',
        'Email support',
        '1 team member',
        'Standard integrations',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      description: 'For growing teams that need more power',
      features: [
        'Unlimited AI tasks',
        'Advanced analytics & reports',
        'Priority support (24/7)',
        'Up to 10 team members',
        'All integrations',
        'Custom workflows',
        'API access',
      ],
      cta: 'Start Free Trial',
      highlighted: true, // This is the recommended plan
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For large organizations with custom needs',
      features: [
        'Everything in Professional',
        'Unlimited team members',
        'Dedicated account manager',
        'Custom AI model training',
        'SLA guarantee (99.99%)',
        'On-premise deployment',
        'SAML SSO',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ]
  
  return (
    <section id="pricing" className="section-padding">
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
            Simple, Transparent
            <span className="gradient-text"> Pricing</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
            No credit card required.
          </p>
        </motion.div>
        
        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative p-8 rounded-2xl transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-primary-500/10 to-secondary-500/10 border-2 border-primary-500'
                  : isDarkMode
                    ? 'bg-dark-200 border border-gray-800'
                    : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Plan Name */}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              
              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period !== 'forever' && (
                  <span className={`text-sm ml-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    /{plan.period}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className={`mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {plan.description}
              </p>
              
              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-xl font-semibold mb-8 transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white btn-glow'
                    : isDarkMode
                      ? 'bg-dark-100 text-white hover:bg-gray-700 border border-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </motion.button>
              
              {/* Features List */}
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'text-primary-500' : 'text-green-500'
                    }`} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
