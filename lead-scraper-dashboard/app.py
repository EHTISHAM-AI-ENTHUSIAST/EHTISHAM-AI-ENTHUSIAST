"""
Lead Scraper Dashboard - Main Streamlit Application

A beautiful dashboard for scraping business leads from various sources.
Features real-time progress tracking, data preview, and export options.

Author: Ehtisham Ashraf
Email: kingehtsham0@gmail.com
"""

import streamlit as st
import pandas as pd
from datetime import datetime
import time
import os

# Import our custom scraper modules
from scraper.google_maps import GoogleMapsScraper
from scraper.utils import clean_data, export_to_excel, export_to_csv


# Page configuration
st.set_page_config(
    page_title="Lead Scraper Dashboard",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)


# Custom CSS for better styling
st.markdown("""
<style>
    /* Main container styling */
    .main {
        padding: 1rem;
    }
    
    /* Card-like containers */
    .stMetric {
        background-color: #1e293b;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #334155;
    }
    
    /* Header styling */
    h1 {
        color: #00d9ff;
        font-weight: 700;
    }
    
    /* Success message styling */
    .success-box {
        padding: 1rem;
        background-color: #064e3b;
        border-radius: 0.5rem;
        border-left: 4px solid #10b981;
    }
    
    /* Warning message styling */
    .warning-box {
        padding: 1rem;
        background-color: #78350f;
        border-radius: 0.5rem;
        border-left: 4px solid #f59e0b;
    }
</style>
""", unsafe_allow_html=True)


def initialize_session_state():
    """Initialize session state variables for the app."""
    if 'scraped_data' not in st.session_state:
        st.session_state.scraped_data = None
    if 'scraping_in_progress' not in st.session_state:
        st.session_state.scraping_in_progress = False
    if 'total_scraped' not in st.session_state:
        st.session_state.total_scraped = 0


def render_header():
    """Render the main header section."""
    col1, col2 = st.columns([3, 1])
    
    with col1:
        st.title("🤖 Lead Scraper Dashboard")
        st.markdown("*Automated lead generation made simple*")
    
    with col2:
        st.metric("Total Leads Scraped", st.session_state.total_scraped)


def render_sidebar():
    """Render the sidebar with scraping options."""
    with st.sidebar:
        st.header("⚙️ Scraping Settings")
        
        # Source selection
        source = st.selectbox(
            "Select Data Source",
            ["Google Maps", "Yellow Pages", "LinkedIn (Coming Soon)"],
            index=0
        )
        
        st.divider()
        
        # Search parameters
        st.subheader("🔍 Search Parameters")
        
        keyword = st.text_input(
            "Business Keyword",
            placeholder="e.g., restaurants, dentists, plumbers"
        )
        
        location = st.text_input(
            "Location",
            placeholder="e.g., New York, NY"
        )
        
        max_results = st.slider(
            "Maximum Results",
            min_value=10,
            max_value=100,
            value=25,
            step=5
        )
        
        st.divider()
        
        # Advanced options
        with st.expander("🔧 Advanced Options"):
            delay = st.slider(
                "Delay between requests (seconds)",
                min_value=1,
                max_value=10,
                value=3
            )
            
            headless = st.checkbox("Run in headless mode", value=True)
            
            include_emails = st.checkbox("Extract emails", value=True)
            include_phones = st.checkbox("Extract phone numbers", value=True)
        
        st.divider()
        
        # Start scraping button
        start_button = st.button(
            "🚀 Start Scraping",
            type="primary",
            use_container_width=True,
            disabled=st.session_state.scraping_in_progress
        )
        
        return {
            'source': source,
            'keyword': keyword,
            'location': location,
            'max_results': max_results,
            'delay': delay,
            'headless': headless,
            'include_emails': include_emails,
            'include_phones': include_phones,
            'start': start_button
        }


def run_scraper(settings):
    """
    Execute the scraping process with progress tracking.
    
    Args:
        settings: Dictionary of scraping settings from sidebar
    """
    st.session_state.scraping_in_progress = True
    
    # Create progress indicators
    progress_bar = st.progress(0)
    status_text = st.empty()
    
    try:
        # Initialize the scraper
        status_text.text("🔄 Initializing scraper...")
        
        results = []
        if settings['source'] == "Google Maps":
            # Build search query
            query = f"{settings['keyword']} {settings['location']}" 
            status_text.text(f"🔍 Searching for: {query}")
            
            # Update status to indicate real work
            progress_bar.progress(0.1)
            status_text.text("🚀 Starting browser (this may take a few seconds)...")
            
            try:
                with GoogleMapsScraper(headless=settings['headless']) as scraper:
                    status_text.text(f"🌐 Browsing Google Maps for '{query}'...")
                    progress_bar.progress(0.3)
                    
                    # Run the actual scraper
                    results = scraper.scrape(query, max_results=settings['max_results'])
                    
                    progress_bar.progress(0.9)
                    status_text.text(f"✅ Found {len(results)} results. Processing...")
            except Exception as scraper_error:
                raise Exception(f"Scraper error: {str(scraper_error)}")
        else:
            st.error("This source is not yet implemented.")
            return

        # Clean and store the data
        df = pd.DataFrame(results)
        df = clean_data(df)
        
        st.session_state.scraped_data = df
        st.session_state.total_scraped += len(df)
        
        progress_bar.progress(1.0)
        status_text.text("✅ Scraping completed successfully!")
        
    except Exception as e:
        st.error(f"❌ Scraping failed: {str(e)}")
    
    finally:
        st.session_state.scraping_in_progress = False


def render_data_preview():
    """Render the data preview and export section."""
    if st.session_state.scraped_data is not None:
        df = st.session_state.scraped_data
        
        st.subheader("📋 Scraped Data Preview")
        
        # Metrics row
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric("Total Records", len(df))
        with col2:
            st.metric("With Email", df['email'].notna().sum())
        with col3:
            st.metric("With Phone", df['phone'].notna().sum())
        with col4:
            avg_rating = df['rating'].mean() if 'rating' in df.columns else 0
            st.metric("Avg Rating", f"{avg_rating:.1f} ⭐")
        
        st.divider()
        
        # Data table with filtering
        st.dataframe(
            df,
            use_container_width=True,
            hide_index=True,
            column_config={
                "name": st.column_config.TextColumn("Business Name", width="medium"),
                "address": st.column_config.TextColumn("Address", width="large"),
                "phone": st.column_config.TextColumn("Phone", width="small"),
                "email": st.column_config.TextColumn("Email", width="medium"),
                "rating": st.column_config.NumberColumn("Rating", format="%.1f ⭐"),
                "reviews": st.column_config.NumberColumn("Reviews", format="%d"),
            }
        )
        
        st.divider()
        
        # Export options
        st.subheader("💾 Export Data")
        col1, col2, col3 = st.columns(3)
        
        with col1:
            csv_data = df.to_csv(index=False).encode('utf-8')
            st.download_button(
                "📥 Download CSV",
                csv_data,
                file_name=f"leads_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                mime="text/csv",
                use_container_width=True
            )
        
        with col2:
            # Excel export
            excel_buffer = export_to_excel(df)
            st.download_button(
                "📥 Download Excel",
                excel_buffer,
                file_name=f"leads_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx",
                mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                use_container_width=True
            )
        
        with col3:
            json_data = df.to_json(orient='records', indent=2).encode('utf-8')
            st.download_button(
                "📥 Download JSON",
                json_data,
                file_name=f"leads_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                mime="application/json",
                use_container_width=True
            )


def render_empty_state():
    """Render the empty state when no data is available."""
    st.info("""
    👋 **Welcome to Lead Scraper Dashboard!**
    
    To get started:
    1. Enter a business keyword (e.g., "restaurants", "dentists")
    2. Enter a location (e.g., "New York, NY")
    3. Adjust the settings as needed
    4. Click **Start Scraping**
    
    Your results will appear here once scraping is complete.
    """)


def main():
    """Main application entry point."""
    # Initialize session state
    initialize_session_state()
    
    # Render header
    render_header()
    
    # Render sidebar and get settings
    settings = render_sidebar()
    
    # Main content area
    st.divider()
    
    # Handle scraping request
    if settings['start']:
        if not settings['keyword'] or not settings['location']:
            st.warning("⚠️ Please enter both a keyword and location to start scraping.")
        else:
            run_scraper(settings)
    
    # Show data preview or empty state
    if st.session_state.scraped_data is not None:
        render_data_preview()
    else:
        render_empty_state()
    
    # Footer
    st.divider()
    st.markdown("""
    <div style="text-align: center; color: #64748b; font-size: 0.875rem;">
        Built with ❤️ by <a href="https://github.com/EhtishamProAI" style="color: #00d9ff;">Ehtisham Ashraf</a>
        | <a href="mailto:kingehtsham0@gmail.com" style="color: #00d9ff;">Contact</a>
    </div>
    """, unsafe_allow_html=True)


if __name__ == "__main__":
    main()
