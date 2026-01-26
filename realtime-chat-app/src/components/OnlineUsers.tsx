import { User, Circle } from 'lucide-react'

interface OnlineUser {
  id: string
  username: string
}

interface OnlineUsersProps {
  users: OnlineUser[]
  currentUser: string
}

export function OnlineUsers({ users, currentUser }: OnlineUsersProps) {
  return (
    <div className="w-64 bg-gray-900 border-l border-gray-700 p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Online — {users.length}
      </h3>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              user.username === currentUser ? 'bg-gray-800' : ''
            }`}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <Circle className="w-3 h-3 text-green-500 fill-green-500 absolute -bottom-0.5 -right-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.username}
                {user.username === currentUser && (
                  <span className="text-gray-400 font-normal"> (you)</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
