# AI-Powered Portfolio Website

A modern, responsive portfolio website built with Next.js 14, featuring an AI chatbot powered by OpenAI, stunning animations with Framer Motion, and a sleek dark theme.

![Portfolio Preview](https://via.placeholder.com/1200x630/1a1a2e/00d9ff?text=AI+Portfolio)

## Features

- **AI Chatbot** - Interactive assistant powered by OpenAI GPT-3.5
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Mobile-first, works on all devices
- **Dark Theme** - Modern glassmorphism UI
- **SEO Optimized** - Meta tags and Open Graph support
- **Contact Form** - Easy way for visitors to reach out
- **Project Showcase** - Filterable portfolio grid
- **Skills Display** - Animated progress bars
- **Experience Timeline** - Career journey visualization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: OpenAI API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional, for chatbot)

### Installation

```bash
# Clone the repository
git clone https://github.com/EHTISHAM-AI-ENTHUSIAST/EHTISHAM-AI-ENTHUSIAST.git
cd EHTISHAM-AI-ENTHUSIAST/ai-portfolio-nextjs

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
ai-portfolio-nextjs/
 src/
    app/
       api/chat/       # AI chatbot API route
       globals.css     # Global styles
       layout.tsx      # Root layout
       page.tsx        # Home page
    components/
        ai/             # AI chatbot component
        layout/         # Navbar, Footer
        providers/      # Theme provider
        sections/       # Page sections
 public/                 # Static assets
 tailwind.config.ts      # Tailwind configuration
 package.json
```

## Customization

1. **Personal Info**: Update content in section components
2. **Colors**: Modify `tailwind.config.ts` for custom theme
3. **Projects**: Edit `Projects.tsx` to add your work
4. **AI Context**: Update system prompt in `api/chat/route.ts`

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for chatbot | Optional |

## Author

**Ehtisham Ashraf**  
Senior AI Software Engineer | Full-Stack Developer

- GitHub: [@EHTISHAM-AI-ENTHUSIAST](https://github.com/EHTISHAM-AI-ENTHUSIAST)
- LinkedIn: [Ehtisham Ashraf](https://www.linkedin.com/in/ehtisham-ashraf-b9b220395)
- Email: kingehtsham0@gmail.com

## License

MIT License - feel free to use this as a template for your own portfolio!
