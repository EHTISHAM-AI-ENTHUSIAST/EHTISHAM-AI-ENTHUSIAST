import { create } from 'zustand'

interface Message {
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

interface ChatState {
  messages: Message[]
  users: User[]
  typingUsers: string[]
  currentRoom: string | null
  addMessage: (message: Message) => void
  setUsers: (users: User[]) => void
  addTypingUser: (username: string) => void
  removeTypingUser: (username: string) => void
  setCurrentRoom: (room: string | null) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  users: [],
  typingUsers: [],
  currentRoom: null,
  
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
    
  setUsers: (users) => set({ users }),
  
  addTypingUser: (username) =>
    set((state) => ({
      typingUsers: state.typingUsers.includes(username)
        ? state.typingUsers
        : [...state.typingUsers, username],
    })),
    
  removeTypingUser: (username) =>
    set((state) => ({
      typingUsers: state.typingUsers.filter((u) => u !== username),
    })),
    
  setCurrentRoom: (room) => set({ currentRoom: room }),
  
  clearMessages: () => set({ messages: [] }),
}))
