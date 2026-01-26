'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle } from 'lucide-react'

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-primary-400 font-medium mb-4 block">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let&apos;s Work <span className="gradient-text">Together</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s create something amazing together.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-8">Feel free to reach out through any of the following channels. I typically respond within 24 hours.</p>
            </div>
            <div className="space-y-6">
              <a href="mailto:kingehtsham0@gmail.com" className="flex items-center gap-4 p-4 rounded-xl glass hover:bg-white/10 transition-colors group">
                <div className="p-3 rounded-lg bg-primary-500/20"><Mail className="w-6 h-6 text-primary-400" /></div>
                <div><p className="text-sm text-gray-500">Email</p><p className="text-white group-hover:text-primary-400 transition-colors">kingehtsham0@gmail.com</p></div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-xl glass">
                <div className="p-3 rounded-lg bg-primary-500/20"><MapPin className="w-6 h-6 text-primary-400" /></div>
                <div><p className="text-sm text-gray-500">Location</p><p className="text-white">Lahore, Pakistan</p></div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl glass">
                <div className="p-3 rounded-lg bg-primary-500/20"><Phone className="w-6 h-6 text-primary-400" /></div>
                <div><p className="text-sm text-gray-500">Availability</p><p className="text-white">Open to freelance opportunities</p></div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center p-8 rounded-2xl glass text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div><label htmlFor="name" className="block text-sm text-gray-400 mb-2">Name</label><input type="text" id="name" name="name" required className="input-field" placeholder="John Doe" /></div>
                  <div><label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email</label><input type="email" id="email" name="email" required className="input-field" placeholder="john@example.com" /></div>
                </div>
                <div><label htmlFor="subject" className="block text-sm text-gray-400 mb-2">Subject</label><input type="text" id="subject" name="subject" required className="input-field" placeholder="Project Inquiry" /></div>
                <div><label htmlFor="message" className="block text-sm text-gray-400 mb-2">Message</label><textarea id="message" name="message" required rows={5} className="input-field resize-none" placeholder="Tell me about your project..." /></div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2">
                  {isSubmitting ? (<><Loader2 className="w-5 h-5 animate-spin" />Sending...</>) : (<><Send className="w-5 h-5" />Send Message</>)}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
