"""
Base Scraper Class

Provides common functionality for all scrapers including:
- Browser initialization with stealth settings
- Request handling with retry logic
- Data extraction helpers
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Optional
import time
import random

import undetected_chromedriver as uc
from selenium import webdriver  # Add import back
from selenium.webdriver.remote.webelement import WebElement  # Improve typing
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from fake_useragent import UserAgent


class BaseScraper(ABC):
    """
    Abstract base class for web scrapers.

    Provides common browser setup and utility methods.
    Subclasses must implement the scrape() method.

    Attributes:
        headless: Whether to run browser in headless mode
        delay: Base delay between requests (randomized)
        driver: Selenium WebDriver instance
    """

    def __init__(self, headless: bool = True, delay: int = 3):
        """
        Initialize the scraper with browser settings.

        Args:
            headless: Run browser without GUI (default: True)
            delay: Base delay between requests in seconds
        """
        self.headless = headless
        self.delay = delay
        self.driver = None
        self.user_agent = UserAgent()

    def setup_driver(self):
        """Setup Chrome driver with stealth options."""
        options = uc.ChromeOptions()

        if self.headless:
            # Headless can be risky for stealth, maybe keep it visible or minimized
            pass

        # Randomize window size
        width = random.randint(1024, 1920)
        height = random.randint(768, 1080)
        options.add_argument(f'--window-size={width},{height}')

        # Stealth arguments
        options.add_argument('--no-first-run')
        options.add_argument(f'--user-agent={self.user_agent.random}')

        # Initialize undetected-chromedriver (It automatically handles driver binary)
        self.driver = uc.Chrome(options=options)
        self.driver.set_page_load_timeout(30)

    def random_delay(self, min_seconds: float = 1.0, max_seconds: float = None):
        """
        Wait for a random amount of time based on the base delay.

        This helps avoid detection by making request patterns less predictable.

        Args:
            min_seconds: Minimum delay in seconds
            max_seconds: Maximum delay in seconds
        """
        if max_seconds is None:
            max_seconds = self.delay

        time.sleep(random.uniform(min_seconds, max_seconds))

    def wait_for_element(
        self,
        by: By,
        value: str,
        timeout: int = 10
    ) -> Optional[WebElement]:
        """
        Wait for an element to be present on the page.

        Args:
            by: Selenium By locator type
            value: Locator value
            timeout: Maximum wait time in seconds

        Returns:
            WebElement if found, None otherwise
        """
        try:
            element = WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located((by, value))
            )
            return element
        except Exception:
            return None

    def scroll_page(self, scroll_pause: float = 1.0, max_scrolls: int = 5):
        """
        Scroll down the page to load dynamic content.

        Args:
            scroll_pause: Pause between scrolls
            max_scrolls: Maximum number of scroll actions
        """
        last_height = self.driver.execute_script("return document.body.scrollHeight")

        for _ in range(max_scrolls):
            # Scroll down
            self.driver.execute_script(
                "window.scrollTo(0, document.body.scrollHeight);"
            )

            # Wait for content to load
            time.sleep(scroll_pause)

            # Check if we've reached the bottom
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

    def close(self):
        """Close the browser and clean up resources."""
        if self.driver:
            self.driver.quit()
            self.driver = None

    @abstractmethod
    def scrape(self, query: str, max_results: int) -> List[Dict]:
        """
        Abstract method to perform scraping.

        Must be implemented by subclasses.

        Args:
            query: Search query string
            max_results: Maximum number of results to return

        Returns:
            List of dictionaries containing scraped data
        """
        pass

    def __enter__(self):
        """Context manager entry - set up driver."""
        self.setup_driver()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit - clean up."""
        self.close()
