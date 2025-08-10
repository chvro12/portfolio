from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
import sqlite3
import os

# ---------- Config ----------
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "").split(",")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./site.db").replace("sqlite:///", "")

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

# Ici tu gardes tes routes Admin existantes (login, CRUD, etc.)
# from routes_admin import router as admin_router
# app.include_router(admin_router)
