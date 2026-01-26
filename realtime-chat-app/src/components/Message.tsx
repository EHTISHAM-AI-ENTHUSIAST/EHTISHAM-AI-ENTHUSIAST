import { format } from 'date-fns'

interface ChatMessage {
  id: string
  text: string
  username: string
  timestamp: Date
  type: 'message' | 'system'
}

interface MessageProps {
  message: ChatMessage
  isOwn: boolean
}

export function Message({ message, isOwn }: MessageProps) {
  if (message.type === 'system') {
    return (
      <div className="flex justify-center message-enter">
        <span className="px-4 py-2 bg-gray-700/50 rounded-full text-sm text-gray-400">
          {message.text}
        </span>
      </div>
    )
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} message-enter`}>
      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
        {!isOwn && (
          <span className="text-xs text-gray-400 ml-3 mb-1 block">
            {message.username}
          </span>
        )}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isOwn
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
              : 'bg-gray-700 text-white rounded-bl-md'
          }`}
        >
          <p className="break-words">{message.text}</p>
          <span
            className={`text-xs mt-1 block ${
              isOwn ? 'text-blue-200' : 'text-gray-400'
            }`}
          >
            {format(new Date(message.timestamp), 'HH:mm')}
          </span>
        </div>
      </div>
    </div>
  )
}
