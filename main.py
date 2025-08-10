from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
from datetime import datetime, timedelta
import jwt
import os

# =========================
# Config & variables
# =========================
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@example.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "changeme")
JWT_SECRET = os.getenv("JWT_SECRET", "supersecret")
JWT_ALG = os.getenv("JWT_ALG", "HS256")
JWT_EXPIRE_MIN = int(os.getenv("JWT_EXPIRE_MIN", "720"))

# Contenu initial (simulation base)
SITE_CONTENT: Dict[str, Any] = {
    "hero": {
        "headline": "Bienvenue sur mon portfolio",
        "subtext": "Découvrez mes projets et expériences."
    },
    "skills": [
        {"name": "Python", "level": "Expert"},
        {"name": "FastAPI", "level": "Avancé"}
    ],
    "experiences": [
        {
            "company": "Entreprise Exemple",
            "role": "Développeur Backend",
            "missions": ["Développement API", "Intégration CI/CD"],
            "period": "2023 - Présent"
        }
    ]
}

# =========================
# Schémas Pydantic
# =========================
class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ContentUpdate(BaseModel):
    data: Dict[str, Any]

# =========================
# App FastAPI
# =========================
app = FastAPI(title="PST Backend", version="0.2.0")

# CORS
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Utils
# =========================
def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MIN)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def get_current_user(token: str = Depends(lambda: None)):
    from fastapi.security import HTTPBearer
    security = HTTPBearer()
    credentials = security()
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALG])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")

# =========================
# Routes
# =========================
@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/auth/login", response_model=TokenResponse)
def login(data: LoginRequest):
    if data.email == ADMIN_EMAIL and data.password == ADMIN_PASSWORD:
        token = create_token(data.email)
        return {"access_token": token}
    raise HTTPException(status_code=401, detail="Identifiants invalides")

@app.get("/content")
def get_content(user: str = Depends(get_current_user)):
    return SITE_CONTENT

@app.put("/content")
def update_content(update: ContentUpdate, user: str = Depends(get_current_user)):
    global SITE_CONTENT
    SITE_CONTENT = update.data
    return {"status": "success", "updated": True, "data": SITE_CONTENT}
