from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List, Dict, Any
from pydantic import BaseModel
from datetime import datetime, timedelta
import sqlite3
import jwt
import os

# ---------- Config ----------
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "").split(",")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./site.db").replace("sqlite:///", "")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@example.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "changeme")
JWT_SECRET = os.getenv("JWT_SECRET", "supersecret")
JWT_ALG = os.getenv("JWT_ALG", "HS256")
JWT_EXPIRE_MIN = int(os.getenv("JWT_EXPIRE_MIN", "720"))

# ---------- Modèles Pydantic ----------
class Experience(BaseModel):
    id: int
    key: str
    start: str
    end: str
    title: str
    dateLabel: str
    sector: str
    details: str
    tags: List[str]

class Mission(BaseModel):
    id: int
    expKey: str
    type: str
    title: str
    resume: str
    details: str
    tools: List[str]
    impact: str

class Skill(BaseModel):
    id: int
    group: str
    items: List[str]

class Link(BaseModel):
    id: int
    label: str
    url: str
    icon: str

class SiteData(BaseModel):
    experiences: List[Experience]
    missions: List[Mission]
    skills: List[Skill]
    links: List[Link]

# ---------- Modèles d'authentification ----------
class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ContentUpdate(BaseModel):
    data: Dict[str, Any]

# ---------- Fonctions DB ----------
def fetch_all(query, mapper):
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute(query)
    rows = cur.fetchall()
    conn.close()
    return [mapper(dict(row)) for row in rows]

def map_experience(row):
    row["tags"] = row["tags"].split(",") if row.get("tags") else []
    return row

def map_mission(row):
    row["tools"] = row["tools"].split(",") if row.get("tools") else []
    return row

def map_skill(row):
    row["items"] = row["items"].split(",") if row.get("items") else []
    return row

# ---------- Fonctions d'authentification ----------
def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MIN),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer(auto_error=True))) -> str:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        return payload.get("sub")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")

# ---------- App ----------
app = FastAPI(title="PST Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
def health():
    return {"ok": True}

# Route publique pour le front
@app.get("/api/public/site", response_model=SiteData)
def public_site():
    experiences = fetch_all("SELECT * FROM experiences", map_experience)
    missions = fetch_all("SELECT * FROM missions", map_mission)
    skills = fetch_all("SELECT * FROM skills", map_skill)
    links = fetch_all("SELECT * FROM links", lambda r: r)
    return {
        "experiences": experiences,
        "missions": missions,
        "skills": skills,
        "links": links
    }

# ---------- Routes d'authentification ----------
@app.post("/auth/login", response_model=TokenResponse)
def login(data: LoginRequest):
    if data.email == ADMIN_EMAIL and data.password == ADMIN_PASSWORD:
        token = create_token(data.email)
        return {"access_token": token}
    raise HTTPException(status_code=401, detail="Identifiants invalides")

@app.get("/content")
def get_content(user: str = Depends(get_current_user)):
    # Pour l'instant, retourner des données par défaut en attendant la DB
    return {
        "experiences": [],
        "missions": [],
        "skills": [],
        "links": []
    }

@app.put("/content")
def update_content(update: ContentUpdate, user: str = Depends(get_current_user)):
    # Pour l'instant, juste confirmer la mise à jour
    return {"status": "success", "updated": True, "data": update.data}

# Ici tu gardes tes routes Admin existantes (login, CRUD, etc.)
# from routes_admin import router as admin_router
# app.include_router(admin_router)
