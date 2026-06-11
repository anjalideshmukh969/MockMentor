# ml-service/modules/fluency_analysis.py

import whisper        # converts audio to text
import spacy          # understands and analyzes text
import os

# ── Load models once when file is imported ─────────────────
# (Loading takes time, so we do it once, not on every request)

print("Loading Whisper model...")
whisper_model = whisper.load_model("base")
# "base" is a small fast model, good enough for our use
# other options: "tiny" (faster), "small", "medium", "large" (more accurate but slower)

print("Loading spaCy model...")
nlp = spacy.load("en_core_web_sm")
# en_core_web_sm = small English model we downloaded

print("Fluency module ready!")

# ── Filler words list ──────────────────────────────────────
# These are words people say when they're nervous or thinking
FILLER_WORDS = {
    "um", "uh", "like", "you know", "basically",
    "literally", "actually", "so", "right", "okay",
    "hmm", "err", "kind of", "sort of"
}

# ── Main function ──────────────────────────────────────────
def analyze_fluency(audio_path: str) -> dict:
    """
    Takes an audio file path,
    returns fluency analysis as a dictionary.
    """

    # ── Step 1: Transcribe audio to text using Whisper ─────
    print(f"Transcribing audio: {audio_path}")
    result = whisper_model.transcribe(audio_path)

    text = result["text"].strip()
    # result["text"] = the full spoken text as a string
    # .strip() removes extra spaces from start/end

    duration_seconds = result.get("duration", 1)
    # how long the audio was in seconds
    # we use 1 as default to avoid dividing by zero

    print(f"Transcribed: {text[:100]}...")  # print first 100 chars

    # ── Step 2: Split into words ───────────────────────────
    words = text.lower().split()
    # .lower() converts to lowercase so "Um" and "um" both match
    # .split() breaks string into list of words
    total_words = len(words)

    # ── Step 3: Find filler words ──────────────────────────
    fillers_found = []
    for word in words:
        # clean punctuation from word before checking
        clean_word = word.strip(".,!?;:")
        if clean_word in FILLER_WORDS:
            fillers_found.append(clean_word)

    filler_count = len(fillers_found)

    # ── Step 4: Calculate pace (words per minute) ─────────
    words_per_minute = (total_words / duration_seconds) * 60
    # Good pace is roughly 120-150 wpm in interviews
    # Too fast = nervous, too slow = unsure

    # ── Step 5: Pace feedback ──────────────────────────────
    if words_per_minute < 100:
        pace_feedback = "Too slow — try to be more confident and fluent"
    elif words_per_minute > 180:
        pace_feedback = "Too fast — slow down, take a breath"
    else:
        pace_feedback = "Good pace — clear and comfortable"

    # ── Step 6: Calculate clarity score ───────────────────
    # Simple formula:
    # Start at 100, subtract 5 for each filler word
    # Minimum score is 0
    clarity_score = max(0, 100 - (filler_count * 5))

    # ── Step 7: Use spaCy for sentence analysis ────────────
    doc = nlp(text)
    sentences = list(doc.sents)
    # doc.sents = all sentences spaCy detected in the text

    sentence_count = len(sentences)
    avg_sentence_length = (
        total_words / sentence_count
        if sentence_count > 0
        else 0
    )

    # ── Step 8: Build and return result ───────────────────
    return {
        "transcript": text,
        "total_words": total_words,
        "duration_seconds": round(duration_seconds, 1),
        "words_per_minute": round(words_per_minute, 1),
        "pace_feedback": pace_feedback,
        "filler_count": filler_count,
        "filler_words_found": fillers_found,
        "clarity_score": round(clarity_score, 1),
        "sentence_count": sentence_count,
        "avg_sentence_length": round(avg_sentence_length, 1),
        "overall_feedback": (
            "Excellent fluency!" if clarity_score >= 80
            else "Good, minor improvements needed" if clarity_score >= 60
            else "Needs improvement — practice reducing filler words"
        )
    }