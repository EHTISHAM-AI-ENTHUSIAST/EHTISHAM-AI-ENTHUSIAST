"""
Utility Functions

Helper functions for data cleaning, export, and validation.
"""

import pandas as pd
import re
from io import BytesIO
from typing import Optional


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean and validate scraped data.
    
    Performs the following operations:
    - Remove duplicate entries
    - Clean phone numbers
    - Validate email addresses
    - Fill missing values appropriately
    
    Args:
        df: Raw DataFrame from scraping
        
    Returns:
        Cleaned DataFrame
    """
    # Create a copy to avoid modifying original
    df = df.copy()
    
    # Ensure all expected columns exist
    expected_columns = ['name', 'address', 'phone', 'email', 'website', 'rating', 'reviews', 'category', 'scraped_at']
    for col in expected_columns:
        if col not in df.columns:
            df[col] = None
    
    # Remove duplicates based on name and address
    if 'name' in df.columns and 'address' in df.columns:
        df = df.drop_duplicates(subset=['name', 'address'], keep='first')
    
    # Clean phone numbers
    if 'phone' in df.columns:
        df['phone'] = df['phone'].apply(clean_phone_number)
    
    # Validate emails
    if 'email' in df.columns:
        df['email'] = df['email'].apply(validate_email)
    
    # Fill missing ratings with None (will display as empty)
    if 'rating' in df.columns:
        df['rating'] = pd.to_numeric(df['rating'], errors='coerce')
    
    # Fill missing review counts with 0
    if 'reviews' in df.columns:
        df['reviews'] = pd.to_numeric(df['reviews'], errors='coerce').fillna(0).astype(int)
    
    # Reset index after cleaning
    df = df.reset_index(drop=True)
    
    return df


def clean_phone_number(phone: Optional[str]) -> Optional[str]:
    """
    Clean and format a phone number.
    
    Args:
        phone: Raw phone number string
        
    Returns:
        Cleaned phone number or None if invalid
    """
    if not phone or pd.isna(phone):
        return None
    
    # Remove all non-numeric characters except + for country code
    cleaned = re.sub(r'[^\d+]', '', str(phone))
    
    # Check if it's a valid length (minimum 7 digits)
    digits_only = re.sub(r'\D', '', cleaned)
    if len(digits_only) < 7:
        return None
    
    # Format US numbers nicely
    if len(digits_only) == 10:
        return f"({digits_only[:3]}) {digits_only[3:6]}-{digits_only[6:]}"
    elif len(digits_only) == 11 and digits_only.startswith('1'):
        return f"+1 ({digits_only[1:4]}) {digits_only[4:7]}-{digits_only[7:]}"
    
    return cleaned


def validate_email(email: Optional[str]) -> Optional[str]:
    """
    Validate and clean an email address.
    
    Args:
        email: Raw email string
        
    Returns:
        Cleaned email or None if invalid
    """
    if not email or pd.isna(email):
        return None
    
    email = str(email).strip().lower()
    
    # Basic email regex pattern
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    if re.match(pattern, email):
        return email
    
    return None


def export_to_excel(df: pd.DataFrame) -> BytesIO:
    """
    Export DataFrame to Excel format.
    
    Args:
        df: DataFrame to export
        
    Returns:
        BytesIO buffer containing Excel file
    """
    buffer = BytesIO()
    
    with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Leads')
        
        # Get the worksheet
        worksheet = writer.sheets['Leads']
        
        # Auto-adjust column widths
        for idx, col in enumerate(df.columns):
            max_length = max(
                df[col].astype(str).map(len).max(),
                len(col)
            ) + 2
            # Excel column letters
            col_letter = chr(65 + idx) if idx < 26 else chr(64 + idx // 26) + chr(65 + idx % 26)
            worksheet.column_dimensions[col_letter].width = min(max_length, 50)
    
    buffer.seek(0)
    return buffer


def export_to_csv(df: pd.DataFrame) -> str:
    """
    Export DataFrame to CSV format.
    
    Args:
        df: DataFrame to export
        
    Returns:
        CSV string
    """
    return df.to_csv(index=False)


def extract_emails_from_text(text: str) -> list:
    """
    Extract all email addresses from a text string.
    
    Args:
        text: Text to search for emails
        
    Returns:
        List of found email addresses
    """
    if not text:
        return []
    
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    emails = re.findall(pattern, text.lower())
    
    # Remove duplicates while preserving order
    seen = set()
    unique_emails = []
    for email in emails:
        if email not in seen:
            seen.add(email)
            unique_emails.append(email)
    
    return unique_emails


def extract_phones_from_text(text: str) -> list:
    """
    Extract all phone numbers from a text string.
    
    Args:
        text: Text to search for phone numbers
        
    Returns:
        List of found phone numbers
    """
    if not text:
        return []
    
    # Pattern matches various phone formats
    patterns = [
        r'\+?1?\s*\(?[2-9]\d{2}\)?\s*[-.\s]?\d{3}\s*[-.\s]?\d{4}',  # US format
        r'\d{3}[-.\s]?\d{3}[-.\s]?\d{4}',  # Simple format
        r'\(\d{3}\)\s*\d{3}[-.\s]?\d{4}',  # (xxx) xxx-xxxx
    ]
    
    phones = []
    for pattern in patterns:
        found = re.findall(pattern, text)
        phones.extend(found)
    
    # Clean and deduplicate
    cleaned = []
    seen = set()
    for phone in phones:
        clean = clean_phone_number(phone)
        if clean and clean not in seen:
            seen.add(clean)
            cleaned.append(clean)
    
    return cleaned
