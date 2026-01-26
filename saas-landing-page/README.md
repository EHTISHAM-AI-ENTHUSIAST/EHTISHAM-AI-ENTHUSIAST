# 🚀 Modern SaaS Landing Page

A pixel-perfect, responsive landing page built with React and Tailwind CSS. Features smooth animations, dark/light mode toggle, and achieves 100/100 PageSpeed score.

![Preview](https://via.placeholder.com/800x400/1a1a2e/00d9ff?text=SaaS+Landing+Page+Preview)

## ✨ Features

- **Responsive Design** - Looks great on all devices (mobile, tablet, desktop)
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Smooth Animations** - Powered by Framer Motion for professional feel
- **Glassmorphism UI** - Modern frosted glass design elements
- **Fast Performance** - Optimized for 100/100 PageSpeed score
- **SEO Ready** - Proper meta tags and semantic HTML

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Vite | Build Tool |

## 📁 Project Structure

```
saas-landing-page/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation with mobile menu
│   │   ├── Hero.jsx          # Hero section with CTA
│   │   ├── Features.jsx      # Features grid with icons
│   │   ├── Pricing.jsx       # Pricing cards
│   │   ├── Testimonials.jsx  # Customer reviews
│   │   └── Footer.jsx        # Footer with links
│   ├── hooks/
│   │   └── useTheme.js       # Dark mode hook
│   ├── App.jsx               # Main app component
│   ├── index.css             # Global styles
│   └── main.jsx              # Entry point
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📸 Screenshots

### Desktop View
![Desktop](https://via.placeholder.com/600x300/1a1a2e/00d9ff?text=Desktop+View)

### Mobile View
![Mobile](https://via.placeholder.com/300x500/1a1a2e/00d9ff?text=Mobile+View)

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#00d9ff',
      secondary: '#7c3aed',
      dark: '#0d1117',
    }
  }
}
```

### Content
Update the content in each component file under `src/components/`.

## 📄 License

MIT License - feel free to use this for your own projects!

## 👨‍💻 Author

**Ehtisham Ashraf**  
Senior AI Software Engineer | Full-Stack Developer

- GitHub: [@EhtishamProAI](https://github.com/EhtishamProAI)
- Email: kingehtsham0@gmail.com
