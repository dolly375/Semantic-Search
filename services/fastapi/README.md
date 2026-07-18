FastAPI service (embeddings & search)

Endpoints:
- POST /internal/embed  -> {text} returns {embedding: [...]}
- POST /search -> {query, top_k, filters} returns mocked top-k results
- GET /health -> health check

Run locally:
```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

Notes:
- Replace the placeholder compute_embedding with a real embedding model or provider.
- Implement actual Postgres + pgvector queries for vector search.
