'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const initialMessage: Message = {
  role: 'assistant',
  content: "Hi! I'm Ehtisham's AI assistant. I can answer questions about his skills, experience, and projects. How can I help you today?"
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting right now. Please try again later or contact Ehtisham directly at kingehtsham0@gmail.com" 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg z-50 ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[380px] h-[500px] rounded-2xl glass border border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-dark-200/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'assistant' ? 'bg-gradient-to-r from-primary-500 to-purple-500' : 'bg-white/10'
                  }`}>
                    {message.role === 'assistant' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-2xl ${
                    message.role === 'assistant' ? 'bg-dark-200 text-gray-300' : 'bg-primary-500 text-white'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-dark-200 p-3 rounded-2xl">
                    <div className="typing-indicator flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-dark-200/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 bg-dark-300 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-primary-500 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
