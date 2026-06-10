# ml-service/main.py

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# ── App Setup ─────────────────────────────────────────────
app = FastAPI(
    title="MockMentor ML Service",
    description="ML microservice for emotion detection, fluency analysis, answer scoring",
    version="1.0.0"
)

# ── CORS (allows your React frontend + Node backend to call this) ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # tighten this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request Body Models ────────────────────────────────────
class AnswerPayload(BaseModel):
    user_answer: str
    ideal_answer: str

class WeakAreaPayload(BaseModel):
    sessions: list

# ── Health Check ───────────────────────────────────────────
@app.get("/")
def root():
    return {
        "service": "MockMentor ML Service",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
def health():
    return {"status": "ok"}

# ── Fluency Analysis Route (stub) ──────────────────────────
@app.post("/analyze-fluency")
async def analyze_fluency_route(audio: UploadFile = File(...)):
    # Full logic will be added in Phase 1
    return {
        "status": "stub",
        "message": "Fluency analysis not yet implemented",
        "filename": audio.filename
    }

# ── Emotion Detection Route (stub) ─────────────────────────
@app.post("/analyze-emotion")
async def analyze_emotion_route(frame: UploadFile = File(...)):
    # Full logic will be added in Phase 2
    return {
        "status": "stub",
        "message": "Emotion detection not yet implemented",
        "filename": frame.filename
    }

# ── Answer Scoring Route (stub) ────────────────────────────
@app.post("/score-answer")
async def score_answer_route(payload: AnswerPayload):
    # Full logic will be added in Phase 3
    return {
        "status": "stub",
        "message": "Answer scoring not yet implemented",
        "received": {
            "user_answer": payload.user_answer[:50],
            "ideal_answer": payload.ideal_answer[:50]
        }
    }

# ── Weak Area Detection Route (stub) ──────────────────────
@app.post("/weak-areas")
async def weak_areas_route(payload: WeakAreaPayload):
    # Full logic will be added in Phase 4
    return {
        "status": "stub",
        "message": "Weak area detection not yet implemented",
        "session_count": len(payload.sessions)
    }

# ── Run directly ───────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)