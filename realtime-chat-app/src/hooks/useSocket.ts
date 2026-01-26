import { useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

interface UseSocketOptions {
  url?: string
  onConnect?: () => void
  onDisconnect?: () => void
}

export function useSocket({ url = 'http://localhost:3001', onConnect, onDisconnect }: UseSocketOptions = {}) {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    socketRef.current = io(url, {
      transports: ['websocket', 'polling'],
    })

    socketRef.current.on('connect', () => {
      console.log('Socket connected')
      onConnect?.()
    })

    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected')
      onDisconnect?.()
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [url, onConnect, onDisconnect])

  const emit = useCallback((event: string, data?: any) => {
    socketRef.current?.emit(event, data)
  }, [])

  const on = useCallback((event: string, callback: (...args: any[]) => void) => {
    socketRef.current?.on(event, callback)
    return () => {
      socketRef.current?.off(event, callback)
    }
  }, [])

  return {
    socket: socketRef.current,
    emit,
    on,
  }
}
