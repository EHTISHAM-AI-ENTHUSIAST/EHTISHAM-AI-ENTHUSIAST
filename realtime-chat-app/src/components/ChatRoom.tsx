'use client'

import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Send, LogOut, Users, Smile } from 'lucide-react'
import { Message } from './Message'
import { TypingIndicator } from './TypingIndicator'
import { OnlineUsers } from './OnlineUsers'

interface ChatMessage {
  id: string
  text: string
  username: string
  timestamp: Date
  type: 'message' | 'system'
}

interface User {
  id: string
  username: string
}

interface ChatRoomProps {
  username: string
  room: string
  onLeave: () => void
}

export function ChatRoom({ username, room, onLeave }: ChatRoomProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [showUsers, setShowUsers] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket', 'polling'],
    })

    newSocket.on('connect', () => {
      console.log('Connected to server')
      newSocket.emit('join-room', { username, room })
    })

    newSocket.on('message', (message: ChatMessage) => {
      setMessages((prev) => [...prev, message])
    })

    newSocket.on('room-users', (users: User[]) => {
      setOnlineUsers(users)
    })

    newSocket.on('user-typing', (typingUsername: string) => {
      setTypingUsers((prev) => {
        if (!prev.includes(typingUsername)) {
          return [...prev, typingUsername]
        }
        return prev
      })
    })

    newSocket.on('user-stop-typing', (typingUsername: string) => {
      setTypingUsers((prev) => prev.filter((u) => u !== typingUsername))
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [username, room])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || !socket) return

    socket.emit('send-message', {
      text: inputMessage.trim(),
      room,
    })

    setInputMessage('')
    socket.emit('stop-typing', room)
    setIsTyping(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)

    if (!socket) return

    if (!isTyping) {
      setIsTyping(true)
      socket.emit('typing', room)
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop-typing', room)
      setIsTyping(false)
    }, 2000)
  }

  const handleLeave = () => {
    if (socket) {
      socket.emit('leave-room', room)
      socket.disconnect()
    }
    onLeave()
  }

  const getRoomEmoji = () => {
    switch (room) {
      case 'general': return '💬'
      case 'tech': return '💻'
      case 'random': return '🎲'
      case 'gaming': return '🎮'
      default: return '💬'
    }
  }

  return (
    <div className="w-full max-w-4xl h-[90vh] flex flex-col bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getRoomEmoji()}</span>
          <div>
            <h2 className="font-bold text-white capitalize">{room}</h2>
            <p className="text-sm text-gray-400">{onlineUsers.length} online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUsers(!showUsers)}
            className={`p-2 rounded-lg transition-colors ${
              showUsers ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Users className="w-5 h-5" />
          </button>
          <button
            onClick={handleLeave}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Smile className="w-12 h-12 mb-2" />
                <p>No messages yet. Say hello! 👋</p>
              </div>
            ) : (
              messages.map((msg) => (
                <Message
                  key={msg.id}
                  message={msg}
                  isOwn={msg.username === username}
                />
              ))
            )}
            {typingUsers.length > 0 && (
              <TypingIndicator users={typingUsers} />
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-gray-900 border-t border-gray-700">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Online Users Sidebar */}
        {showUsers && (
          <OnlineUsers users={onlineUsers} currentUser={username} />
        )}
      </div>
    </div>
  )
}
