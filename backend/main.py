from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import openai
import os

import firebase_admin
from firebase_admin import credentials, firestore

# Load environment variables from .env
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Setup OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Load Firebase credentials
firebase_creds = os.getenv("FIREBASE_CREDENTIALS")
cred = credentials.Certificate(firebase_creds)
firebase_admin.initialize_app(cred)
db = firestore.client()

# Input schema for note summarization
class NoteRequest(BaseModel):
    text: str

# Root route for health check
@app.get("/")
def read_root():
    return {"message": "NoteWise backend is running ✅"}

# Summarize note and save to Firestore
@app.post("/summarize")
def summarize_note(note: NoteRequest):
    try:
        # AI Summary
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You're a helpful study assistant. Summarize text into bullet-point study notes."},
                {"role": "user", "content": note.text}
            ],
            temperature=0.5,
            max_tokens=500
        )
        summary = response['choices'][0]['message']['content']

        # Save to Firestore
        db.collection("notes").add({
            "original": note.text,
            "summary": summary
        })

        return {"summary": summary}

    except Exception as e:
        return {"error": str(e)}
