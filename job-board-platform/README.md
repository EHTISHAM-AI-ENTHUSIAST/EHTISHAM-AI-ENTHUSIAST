# Job Board Platform

A comprehensive job board platform with an admin dashboard, built with Next.js 14, Prisma, and NextAuth.js. Features job posting, application management, analytics, and role-based access control.

![Job Board Preview](https://via.placeholder.com/1200x630/1a1a2e/00d9ff?text=Job+Board+Platform)

## Features

### For Job Seekers
- Browse and search jobs by title, location, type
- Filter by remote, salary range, experience level
- Apply with resume and cover letter
- Track application status
- Save favorite jobs

### For Employers
- Post and manage job listings
- Review applications
- Company profile management
- Application tracking system
- Email notifications

### Admin Dashboard
- User management
- Job approval/rejection
- Analytics and reports
- Platform statistics
- Featured job management

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **File Upload**: UploadThing

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/EHTISHAM-AI-ENTHUSIAST/EHTISHAM-AI-ENTHUSIAST.git
cd EHTISHAM-AI-ENTHUSIAST/job-board-platform

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Configure DATABASE_URL, NEXTAUTH_SECRET, etc.

# Push database schema
npm run db:push

# Seed sample data (optional)
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

## Project Structure

```
job-board-platform/
 prisma/
    schema.prisma     # Database models
 src/
    app/
       (auth)/       # Auth pages (login, register)
       admin/        # Admin dashboard
       jobs/         # Job listings & details
       api/          # API routes
    components/
       ui/           # Reusable UI components
       jobs/         # Job-related components
       dashboard/    # Dashboard components
    lib/              # Utilities, auth config
 package.json
```

## API Endpoints

### Jobs
- `GET /api/jobs` - List all active jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (employer)
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Applications
- `GET /api/applications` - User's applications
- `POST /api/applications` - Apply for job
- `PUT /api/applications/:id` - Update status (employer)

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - User management
- `PUT /api/admin/jobs/:id/feature` - Feature/unfeature job

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Auth encryption key |
| `NEXTAUTH_URL` | App URL |
| `UPLOADTHING_SECRET` | File upload API key |

## Author

**Ehtisham Ashraf**  
Senior AI Software Engineer | Full-Stack Developer

- GitHub: [@EHTISHAM-AI-ENTHUSIAST](https://github.com/EHTISHAM-AI-ENTHUSIAST)
- LinkedIn: [Ehtisham Ashraf](https://www.linkedin.com/in/ehtisham-ashraf-b9b220395)
- Email: kingehtsham0@gmail.com

## License

MIT License
