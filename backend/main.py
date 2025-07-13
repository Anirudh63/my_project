from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials, firestore
from transformers import pipeline

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Firebase
cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load summarization pipeline (from HuggingFace)
summarizer = pipeline("summarization", model="t5-small", tokenizer="t5-small")

# Pydantic request model
class NoteRequest(BaseModel):
    text: str

# Summarization endpoint
@app.post("/summarize")
async def summarize(note: NoteRequest):
    try:
        # Truncate if text is too long for t5-small
        input_text = note.text.strip().replace("\n", " ")
        input_text = "summarize: " + input_text[:512]  # max tokens for small model

        summary = summarizer(input_text, max_length=100, min_length=20, do_sample=False)[0]["summary_text"]
        return {"summary": summary}
    except Exception as e:
        return {"error": str(e)}
