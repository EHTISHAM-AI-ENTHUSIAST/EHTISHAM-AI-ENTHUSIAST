interface TypingIndicatorProps {
  users: string[]
}

export function TypingIndicator({ users }: TypingIndicatorProps) {
  const getText = () => {
    if (users.length === 1) {
      return `${users[0]} is typing`
    } else if (users.length === 2) {
      return `${users[0]} and ${users[1]} are typing`
    } else {
      return `${users.length} people are typing`
    }
  }

  return (
    <div className="flex items-center gap-2 text-gray-400 text-sm pl-3">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
        <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
        <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
      </div>
      <span>{getText()}</span>
    </div>
  )
}
