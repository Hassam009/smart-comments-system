import re
import google.generativeai as genai
from app.config import settings


TOXIC_KEYWORDS = [
    r"\bidiot\b", r"\bstupid\b", r"\bspam\b", r"\bclick here\b", r"\bbuy now\b",
    r"\bfree money\b", r"\bugh\b", r"\bhate\b"
]


genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-flash-latest')

async def classify_text(text: str) -> str:
    """Classifies text as 'safe' or 'needs_review' using a hybrid AI approach."""
   
    text_lower = text.lower()
    for pattern in TOXIC_KEYWORDS:
        if re.search(pattern, text_lower):
            return "needs_review"

   
    try:
        if not settings.GEMINI_API_KEY or "your_gemini" in settings.GEMINI_API_KEY:
             return "safe"

        prompt = (
            "You are a STRICT comment moderation assistant. Classify the following comment as "
            "either 'safe' or 'needs_review'.\n\n"
            "CRITERIA FOR 'needs_review':\n"
            "- HARASSMENT: Any personal attacks, insults, or mean-spirited comments.\n"
            "- WISHING HARM: Wishing failure, harm, or death on others.\n"
            "- TOXICITY: Any inflammatory behavior.\n"
            "- SPAM: Obvious promotional content.\n\n"
            "CRITERIA FOR 'safe':\n"
            "- Constructive feedback and polite disagreement only.\n\n"
            f"Comment: \"{text}\"\n"
            "Respond with ONLY the word 'safe' or 'needs_review'."
        )
        
        response = await model.generate_content_async(prompt)
        result = response.text.strip().lower()

        if "needs_review" in result:
            return "needs_review"
        return "safe"

    except Exception:
        return "safe"
