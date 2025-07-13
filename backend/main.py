from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials, firestore
from transformers import pipeline

# Load env
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Firebase setup (optional for later save features)
cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load summarizer model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

class NoteRequest(BaseModel):
    text: str

@app.post("/summarize")
async def summarize(note: NoteRequest):
    try:
        text = note.text.strip().replace("\n", " ")
        input_text = text[:1024]  # truncate for BART input limit

        result = summarizer(input_text, max_length=180, min_length=40, do_sample=False)
        summary = result[0]['summary_text']

        # Post-process summary into bullet format
        bullets = summary.split('. ')
        formatted = "✨ **Summary:**\n\n" + "\n".join([f"• {line.strip().rstrip('.')}" for line in bullets if line.strip()]) + "."

        return {"summary": formatted}
    except Exception as e:
        return {"error": str(e)}
