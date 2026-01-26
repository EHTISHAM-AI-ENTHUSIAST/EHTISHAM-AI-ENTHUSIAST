import Link from 'next/link'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

const footerLinks = {
  navigation: [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com/EHTISHAM-AI-ENTHUSIAST', icon: Github },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ehtisham-ashraf-b9b220395', icon: Linkedin },
    { name: 'Email', href: 'mailto:kingehtsham0@gmail.com', icon: Mail },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark-200/50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Ehtisham Ashraf
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Full-Stack Developer & AI Engineer building intelligent web applications 
              that make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {footerLinks.social.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Ehtisham Ashraf. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using Next.js & AI
          </p>
        </div>
      </div>
    </footer>
  )
}
