# 🤖 AI-Powered Lead Scraper Dashboard

An automated lead generation tool that extracts business data from Google Maps, LinkedIn, and other sources. Features a beautiful Streamlit dashboard for easy data management and export.

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)
![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white)

## ✨ Features

- **Multi-Source Scraping** - Extract data from Google Maps, Yellow Pages, and more
- **Anti-Detection** - Built-in stealth mode to avoid bot detection
- **Beautiful Dashboard** - Streamlit-powered UI for easy data management
- **Export Options** - Download data as CSV, Excel, or JSON
- **Real-time Progress** - Live progress tracking during scraping
- **Data Cleaning** - Automatic deduplication and validation

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Python 3.10+ | Core Language |
| Streamlit | Dashboard UI |
| Selenium | Web Scraping |
| Pandas | Data Processing |
| BeautifulSoup | HTML Parsing |

## 📁 Project Structure

```
lead-scraper-dashboard/
├── app.py                   # Main Streamlit application
├── scraper/
│   ├── __init__.py
│   ├── base_scraper.py      # Base scraper class
│   ├── google_maps.py       # Google Maps scraper
│   └── utils.py             # Helper utilities
├── data/
│   └── .gitkeep             # Output directory
├── requirements.txt
└── README.md
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/EhtishamProAI/lead-scraper-dashboard.git
cd lead-scraper-dashboard

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Run the dashboard
streamlit run app.py
```

## 📸 Screenshots

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/1a1a2e/00d9ff?text=Lead+Scraper+Dashboard)

## ⚠️ Disclaimer

This tool is for educational purposes only. Always respect website terms of service and rate limits. Use responsibly.

## 👨‍💻 Author

**Ehtisham Ashraf**  
Senior AI Software Engineer | Automation Specialist

- GitHub: [@EhtishamProAI](https://github.com/EhtishamProAI)
- Email: kingehtsham0@gmail.com
