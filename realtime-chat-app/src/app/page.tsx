'use client'

import { useState } from 'react'
import { ChatRoom } from '@/components/ChatRoom'
import { JoinRoom } from '@/components/JoinRoom'

export default function Home() {
  const [username, setUsername] = useState<string>('')
  const [room, setRoom] = useState<string>('')
  const [joined, setJoined] = useState(false)

  const handleJoin = (name: string, roomName: string) => {
    setUsername(name)
    setRoom(roomName)
    setJoined(true)
  }

  const handleLeave = () => {
    setJoined(false)
    setUsername('')
    setRoom('')
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      {!joined ? (
        <JoinRoom onJoin={handleJoin} />
      ) : (
        <ChatRoom username={username} room={room} onLeave={handleLeave} />
      )}
    </main>
  )
}
