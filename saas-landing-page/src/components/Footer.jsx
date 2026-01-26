import { motion } from 'framer-motion'
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react'

/**
 * Footer Component
 * 
 * Site footer with:
 * - Logo and description
 * - Navigation links organized by category
 * - Social media links
 * - Copyright notice
 */
function Footer({ isDarkMode }) {
  // Footer link groups
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'],
    Company: ['About', 'Blog', 'Careers', 'Press Kit', 'Partners'],
    Resources: ['Documentation', 'API Reference', 'Guides', 'Templates', 'Community'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  }
  
  // Social media links
  const socialLinks = [
    { icon: Github, href: 'https://github.com/EhtishamProAI', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:kingehtsham0@gmail.com', label: 'Email' },
  ]
  
  return (
    <footer id="contact" className={`section-padding ${
      isDarkMode ? 'bg-dark-400' : 'bg-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Logo and Links */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <motion.a 
              href="#"
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">FlowAI</span>
            </motion.a>
            <p className={`mb-6 max-w-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Transform your workflow with intelligent AI automation. 
              Built for teams that demand excellence.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-dark-200 text-gray-400 hover:text-primary-400 hover:bg-dark-100' 
                      : 'bg-gray-200 text-gray-600 hover:text-primary-500 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#"
                      className={`text-sm transition-colors ${
                        isDarkMode 
                          ? 'text-gray-400 hover:text-primary-400' 
                          : 'text-gray-600 hover:text-primary-500'
                      }`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Divider */}
        <div className={`border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-300'
        }`} />
        
        {/* Bottom Section - Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            © {new Date().getFullYear()} FlowAI. All rights reserved.
          </p>
          <p className={`text-sm mt-2 sm:mt-0 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Built with ❤️ by <a href="https://github.com/EhtishamProAI" className="text-primary-500 hover:underline">Ehtisham Ashraf</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
