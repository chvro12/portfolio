from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import Base, engine
from models import SiteContent
from config import ALLOWED_ORIGINS
from routers import auth, content

app = FastAPI(title="PST Backend", version="0.1.0")

# DB init
Base.metadata.create_all(bind=engine)

# CORS
allow_all = len(ALLOWED_ORIGINS) == 1 and ALLOWED_ORIGINS[0] == "*"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if allow_all else ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health
@app.get("/health")
def health():
    return {"status": "ok"}

# API (préfixe /api)
from fastapi import APIRouter
api = APIRouter(prefix="/api")
api.include_router(auth.router)
api.include_router(content.router)
app.include_router(api)
