# Real-Time Chat Application

A full-featured real-time chat application built with Next.js 14, Socket.IO, and a modern UI. Features include multiple chat rooms, typing indicators, online user lists, and message persistence.

![Chat App Preview](https://via.placeholder.com/1200x630/1a1a2e/00d9ff?text=Real-Time+Chat+App)

## Features

- **Real-Time Messaging** - Instant message delivery with Socket.IO
- **Multiple Chat Rooms** - Create and join different rooms
- **Typing Indicators** - See when others are typing
- **Online Users** - View who is in the room
- **Message History** - Persistent chat history with Prisma
- **User Authentication** - Secure login/signup
- **Responsive Design** - Works on desktop and mobile
- **Dark Theme** - Modern, eye-friendly interface

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, Socket.IO
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand
- **Authentication**: JWT + bcrypt

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/EHTISHAM-AI-ENTHUSIAST/EHTISHAM-AI-ENTHUSIAST.git
cd EHTISHAM-AI-ENTHUSIAST/realtime-chat-app

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your DATABASE_URL and JWT_SECRET

# Push database schema
npm run db:push

# Run development servers
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Project Structure

```
realtime-chat-app/
 server/
    index.js          # Socket.IO server
 src/
    app/              # Next.js pages
    components/       # React components
    hooks/            # Custom hooks (useSocket)
    lib/              # Utilities, Prisma client
 prisma/
    schema.prisma     # Database schema
 package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Messages
- `GET /api/messages/:room` - Get room history
- `POST /api/messages` - Save message

## Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `join` | Client  Server | Join a chat room |
| `sendMessage` | Client  Server | Send message |
| `message` | Server  Client | Receive message |
| `typing` | Client  Server | Typing status |
| `userTyping` | Server  Client | User typing notification |
| `userJoined` | Server  Client | User joined room |
| `userLeft` | Server  Client | User left room |

## Author

**Ehtisham Ashraf**  
Senior AI Software Engineer | Full-Stack Developer

- GitHub: [@EHTISHAM-AI-ENTHUSIAST](https://github.com/EHTISHAM-AI-ENTHUSIAST)
- LinkedIn: [Ehtisham Ashraf](https://www.linkedin.com/in/ehtisham-ashraf-b9b220395)
- Email: kingehtsham0@gmail.com

## License

MIT License
