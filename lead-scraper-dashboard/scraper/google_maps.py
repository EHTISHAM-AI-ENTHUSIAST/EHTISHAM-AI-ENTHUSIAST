"""
Google Maps Scraper

Extracts business information from Google Maps search results.
Includes business name, address, phone, rating, and reviews.
"""

from typing import List, Dict, Optional
import re
from datetime import datetime

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException

from scraper.base_scraper import BaseScraper


class GoogleMapsScraper(BaseScraper):
    """
    Scraper for extracting business data from Google Maps.
    
    Searches for businesses and extracts:
    - Business name
    - Address
    - Phone number
    - Website
    - Rating and review count
    - Business category
    
    Example:
        with GoogleMapsScraper(headless=True) as scraper:
            results = scraper.scrape("restaurants in New York", max_results=50)
    """
    
    BASE_URL = "https://www.google.com/maps"
    
    def __init__(self, headless: bool = True, delay: int = 3):
        """
        Initialize Google Maps scraper.
        
        Args:
            headless: Run browser without GUI
            delay: Base delay between actions
        """
        super().__init__(headless=headless, delay=delay)
    
    def scrape(self, query: str, max_results: int = 50) -> List[Dict]:
        """
        Scrape business listings from Google Maps.
        
        Args:
            query: Search query (e.g., "restaurants in New York")
            max_results: Maximum number of results to scrape
            
        Returns:
            List of dictionaries with business information
        """
        results = []
        
        try:
            # Set up browser if not already done
            if not self.driver:
                self.setup_driver()
            
            # Navigate to Google Maps
            self.driver.get(self.BASE_URL)
            self.random_delay()
            
            # Find and use the search box
            search_box = self.wait_for_element(By.ID, "searchboxinput")
            if not search_box:
                # Try fallback selectors
                fallback_selectors = ["input[name='q']", "input[aria-label='Search Google Maps']"]
                for selector in fallback_selectors:
                    search_box = self.wait_for_element(By.CSS_SELECTOR, selector)
                    if search_box:
                        break
            
            if not search_box:
                raise Exception("Could not find search box")
            
            # Enter search query
            search_box.clear()
            search_box.send_keys(query)
            search_box.send_keys(Keys.ENTER)
            
            # Wait for results to load
            self.random_delay(2.0, 4.0)
            
            # Scroll through results with human-like pauses
            try:
                # Try finding feed with multiple selectors
                selectors = ["[role='feed']", "div[aria-label^='Results for']"]
                results_container = None
                
                for selector in selectors:
                    try:
                        results_container = self.wait_for_element(By.CSS_SELECTOR, selector)
                        if results_container:
                            break
                    except:
                        continue
                
                if results_container:
                    self._scroll_results_panel(results_container, max_results)
            except Exception as e:
                print(f"Scrolling warning: {str(e)}")
            
            # Extract business listings with upgraded selector
            listings = self.driver.find_elements(
                By.CSS_SELECTOR, 
                "div[role='article']"  # Updated selector for 2024 maps
            )
            
            if not listings:
                # Fallback selector
                listings = self.driver.find_elements(By.CLASS_NAME, "hfpxzc")
            
            # Process each listing
            for i, listing in enumerate(listings[:max_results]):
                try:
                    business_data = self._extract_listing_data(listing)
                    if business_data:
                        business_data['scraped_at'] = datetime.now().isoformat()
                        results.append(business_data)
                except Exception as e:
                    print(f"Error extracting listing {i}: {str(e)}")
                    continue
                
                # Add delay between extractions
                if i % 5 == 0:
                    self.random_delay(0.5, 1.0)
        
        except Exception as e:
            print(f"Scraping error: {str(e)}")
        
        return results
    
    def _scroll_results_panel(self, container, target_count: int):
        """
        Scroll within the results panel to load more listings.
        
        Args:
            container: The results container element
            target_count: Target number of results to load
        """
        scroll_script = """
            arguments[0].scrollTop = arguments[0].scrollHeight;
        """
        
        prev_count = 0
        no_change_count = 0
        
        while no_change_count < 3:
            # Get current listing count
            listings = self.driver.find_elements(
                By.CSS_SELECTOR, 
                "[role='feed'] > div > div > a"
            )
            current_count = len(listings)
            
            # Check if we have enough results
            if current_count >= target_count:
                break
            
            # Check if count hasn't changed
            if current_count == prev_count:
                no_change_count += 1
            else:
                no_change_count = 0
            
            prev_count = current_count
            
            # Scroll down
            self.driver.execute_script(scroll_script, container)
            self.random_delay(0.5, 1.0)
    
    def _extract_listing_data(self, listing) -> Optional[Dict]:
        """
        Extract data from a single business listing.
        
        Args:
            listing: Selenium WebElement for the listing
            
        Returns:
            Dictionary with business data or None if extraction fails
        """
        try:
            # Click on listing to load details
            listing.click()
            self.random_delay(0.5, 1.0)
            
            # Extract business name
            try:
                # Try specific class first, then fall back to generic h1
                selectors = ["h1.DUwDvf", "h1.fontHeadlineLarge", "h1"]
                name_element = None
                
                for selector in selectors:
                    try:
                        name_element = self.driver.find_element(By.CSS_SELECTOR, selector)
                        # Check if element is visible
                        if name_element.is_displayed():
                            break
                    except:
                        continue
                
                if not name_element:
                    # Last resort: try getting from the listing element attribute if possible
                    name = listing.get_attribute("aria-label")
                else:
                    name = name_element.text
            except Exception:
                name = None
            
            if not name:
                return None
            
            # Extract address
            address = self._get_text_safely("[data-item-id='address']")
            if not address:
                # Try fallback for address
                address = self._get_text_safely(".Io6YTe.fontBodyMedium")
            
            # Extract phone
            phone = self._get_text_safely("[data-item-id*='phone']")
            
            # Extract website
            website = self._get_attribute_safely(
                "[data-item-id='authority']", 
                "href"
            )
            
            # Extract email from website if available
            email = None
            if website:
                try:
                    email = self._extract_email_from_website(website)
                except Exception as e:
                    print(f"Failed to extract email from {website}: {e}")
            
            # Extract rating
            rating = self._extract_rating()
            
            # Extract review count
            reviews = self._extract_review_count()
            
            # Extract category
            category = self._get_text_safely("button[jsaction*='category']")
            
            return {
                'name': name,
                'address': address,
                'phone': phone,
                'website': website,
                'rating': rating,
                'reviews': reviews,
                'category': category,
                'email': email
            }
            
        except Exception as e:
            print(f"Error extracting listing data: {str(e)}")
            return None

    def _extract_email_from_website(self, url: str) -> Optional[str]:
        """
        Visit the website and extract email address using regex.
        Opens the site in a new tab to preserve Google Maps state.
        """
        if not url:
            return None
            
        original_window = self.driver.current_window_handle
        email = None
        
        try:
            # Open new tab
            self.driver.switch_to.new_window('tab')
            self.driver.get(url)
            
            # Wait briefly for load
            self.random_delay(1.5, 2.5)
            
            # Simple regex search in page source
            page_source = self.driver.page_source
            # Basic email regex
            email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
            emails = re.findall(email_pattern, page_source)
            
            if emails:
                # Filter to remove common false positives like "example@email.com" or image files
                ignored_domains = ['sentry.io', 'wixpress.com', 'example.com', 'domain.com']
                ignored_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.css', '.js']
                
                valid_emails = []
                for e in emails:
                    e_lower = e.lower()
                    if any(ext in e_lower for ext in ignored_extensions):
                        continue
                    if any(domain in e_lower for domain in ignored_domains):
                        continue
                    # Basic length check
                    if len(e) < 5 or len(e) > 50:
                        continue
                    valid_emails.append(e)
                
                if valid_emails:
                    email = valid_emails[0]
                    
        except Exception:
            # Silently fail for website issues to keep scraper running
            pass
            
        finally:
            # Always ensure we close the tab and return to main window
            try:
                # If we have more than one window, close the current one (the website)
                if len(self.driver.window_handles) > 1:
                    self.driver.close()
                self.driver.switch_to.window(original_window)
            except Exception:
                # If switching fails, try to ensure we are at least on a valid window
                if self.driver.window_handles:
                    self.driver.switch_to.window(self.driver.window_handles[0])
                    
        return email
    
    def _get_text_safely(self, selector: str) -> Optional[str]:
        """Safely get text from an element."""
        try:
            element = self.driver.find_element(By.CSS_SELECTOR, selector)
            return element.text.strip()
        except NoSuchElementException:
            return None
    
    def _get_attribute_safely(self, selector: str, attribute: str) -> Optional[str]:
        """Safely get attribute from an element."""
        try:
            element = self.driver.find_element(By.CSS_SELECTOR, selector)
            return element.get_attribute(attribute)
        except NoSuchElementException:
            return None
    
    def _extract_rating(self) -> Optional[float]:
        """Extract the business rating."""
        try:
            rating_text = self._get_text_safely("div.F7nice span[aria-hidden='true']")
            if rating_text:
                # Rating is usually in format "4.5" or "4,5" (localized)
                rating_text = rating_text.replace(",", ".")
                return float(rating_text)
        except (ValueError, TypeError):
            pass
        return None
    
    def _extract_review_count(self) -> Optional[int]:
        """Extract the number of reviews."""
        try:
            reviews_text = self._get_text_safely("div.F7nice span:last-child")
            if reviews_text:
                # Extract numbers from text like "(1,234 reviews)"
                numbers = re.findall(r'[\d,]+', reviews_text)
                if numbers:
                    return int(numbers[0].replace(",", ""))
        except (ValueError, TypeError):
            pass
        return None
