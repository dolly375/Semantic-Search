from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import hashlib

app = FastAPI(title="FastAPI Embeddings & Search Service")

class TextIn(BaseModel):
    text: str

class SearchIn(BaseModel):
    query: str
    top_k: int = 5
    filters: dict | None = None

# Deterministic pseudo-embedding via sha256 hash -> floats (placeholder)
def compute_embedding(text: str, dim: int = 384):
    h = hashlib.sha256(text.encode("utf-8")).digest()
    vec = np.frombuffer(h, dtype=np.uint8).astype(np.float32)
    if vec.size >= dim:
        return (vec[:dim] / 255.0).tolist()
    # repeat to reach dim
    out = np.tile(vec, int(np.ceil(dim / vec.size)))[:dim]
    return (out / 255.0).tolist()

@app.post("/internal/embed")
async def embed(text_in: TextIn):
    emb = compute_embedding(text_in.text)
    return {"embedding": emb}

@app.post("/search")
async def search(payload: SearchIn):
    # In a real service: compute embedding, query pgvector in Postgres,
    # apply filters, return top-k records with scores.
    emb = compute_embedding(payload.query)
    # Mocked results: return top_k dummy records
    results = []
    for i in range(payload.top_k):
        results.append({
            "note_id": 1000 + i,
            "patient_id": 500 + i,
            "score": round(1.0 - i * 0.05, 4),
            "excerpt": f"Mocked result {i+1} for query: {payload.query}"
        })
    return {"query": payload.query, "embedding_length": len(emb), "results": results}

@app.get("/health")
async def health():
    return {"status": "ok"}
