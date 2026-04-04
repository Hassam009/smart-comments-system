import re

# List of toxic/spam keywords for rule-based classification
# In a real-world scenario, you might use a more advanced model like Hugging Face or OpenAI.
TOXIC_KEYWORDS = [
    r"\bidiot\b", r"\bstupid\b", r"\bspam\b", r"\bclick here\b", r"\bbuy now\b",
    r"\bfree money\b", r"\bugh\b", r"\bhate\b"
]

def classify_text(text: str) -> str:
    """
    Classifies a piece of text as 'safe' or 'needs_review'.
    
    This function uses a simple keyword matching approach.
    - If any of the toxic keywords are found in the text, it marks it as 'needs_review'.
    - Otherwise, it's marked as 'safe'.
    """
    # Normalize text to lowercase for consistent matching
    text_lower = text.lower()
    
    for pattern in TOXIC_KEYWORDS:
        if re.search(pattern, text_lower):
            # If any pattern matches, flag the comment
            return "needs_review"
    
    # No matches found, so it's safe
    return "safe"
