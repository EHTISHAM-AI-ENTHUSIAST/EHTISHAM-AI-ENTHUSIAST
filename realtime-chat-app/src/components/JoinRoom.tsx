'use client'

import { useState } from 'react'
import { MessageSquare, Users, ArrowRight } from 'lucide-react'

interface JoinRoomProps {
  onJoin: (username: string, room: string) => void
}

const ROOMS = [
  { id: 'general', name: 'General', icon: '💬', description: 'General discussion' },
  { id: 'tech', name: 'Tech Talk', icon: '💻', description: 'Technology & coding' },
  { id: 'random', name: 'Random', icon: '🎲', description: 'Anything goes!' },
  { id: 'gaming', name: 'Gaming', icon: '🎮', description: 'Games & esports' },
]

export function JoinRoom({ onJoin }: JoinRoomProps) {
  const [username, setUsername] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('general')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Please enter a username')
      return
    }
    if (username.length < 2 || username.length > 20) {
      setError('Username must be 2-20 characters')
      return
    }
    onJoin(username.trim(), selectedRoom)
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to ChatApp</h1>
          <p className="text-gray-400">Join a room and start chatting!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              maxLength={20}
            />
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>

          {/* Room Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Select a Room
            </label>
            <div className="grid grid-cols-2 gap-3">
              {ROOMS.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setSelectedRoom(room.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedRoom === room.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                  }`}
                >
                  <span className="text-2xl mb-1 block">{room.icon}</span>
                  <span className="font-medium text-white block">{room.name}</span>
                  <span className="text-xs text-gray-400">{room.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Join Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
          >
            Join Chat
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Built with Next.js & Socket.IO
        </p>
      </div>
    </div>
  )
}
