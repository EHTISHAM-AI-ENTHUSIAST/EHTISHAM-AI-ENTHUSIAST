import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const systemPrompt = `You are an AI assistant for Ehtisham Ashraf's portfolio website. Your role is to answer questions about Ehtisham's skills, experience, and projects in a friendly and professional manner.

About Ehtisham Ashraf:
- Senior AI Software Engineer and Full-Stack Developer
- 3+ years of experience building web applications and AI solutions
- Located in Lahore, Pakistan, available for remote work

Technical Skills:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: Python, FastAPI, Node.js, PostgreSQL, MongoDB
- AI/ML: OpenAI API, LangChain, TensorFlow, Computer Vision, NLP
- DevOps: Docker, AWS, Vercel, CI/CD pipelines

Notable Projects:
1. AI Document Extractor - GPT-4 Vision powered document processing
2. Lead Scraper Dashboard - Automated business lead generation
3. E-Commerce API - Production-ready REST API with FastAPI
4. SaaS Landing Page - Modern landing page with animations
5. Task Tracker MVP - Full-stack task management app

Contact: kingehtsham0@gmail.com
GitHub: github.com/EHTISHAM-AI-ENTHUSIAST
LinkedIn: linkedin.com/in/ehtisham-ashraf-b9b220395

Keep responses concise, helpful, and encourage visitors to reach out for collaboration opportunities.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        message: "Thanks for your interest! While the AI is being set up, feel free to contact Ehtisham directly at kingehtsham0@gmail.com for any questions."
      })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content || "I couldn't generate a response. Please try again."

    return NextResponse.json({ message: reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({
      message: "I'm having trouble connecting. Please contact Ehtisham at kingehtsham0@gmail.com"
    }, { status: 500 })
  }
}
