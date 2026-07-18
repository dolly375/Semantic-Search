Node.js API gateway (proxy to FastAPI embeddings/search)

Run locally:
```powershell
cd services\node-api
npm install
# set FASTAPI_URL if FastAPI runs on a non-default address
node index.js
```

Endpoints:
- POST /search -> forwarded to FastAPI /search
- GET /health -> health check
