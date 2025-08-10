from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
import jwt
import os

# ─────────────────────────────────────────────────────────
# Config via env
# ─────────────────────────────────────────────────────────
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@example.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "changeme")
JWT_SECRET = os.getenv("JWT_SECRET", "supersecret")
JWT_ALG = os.getenv("JWT_ALG", "HS256")
JWT_EXPIRE_MIN = int(os.getenv("JWT_EXPIRE_MIN", "720"))
ALLOWED_ORIGINS = [o.strip() for o in os.getenv(
    "ALLOWED_ORIGINS",
    "*"
).split(",") if o.strip()]

# ─────────────────────────────────────────────────────────
# Données du site (structure compatible avec ton front)
# Tu pourras ensuite remplacer par une vraie DB.
# ─────────────────────────────────────────────────────────
SITE_CONTENT: Dict[str, Any] = {
    "hero": {
        "headline": "Bonjour, je suis Papa Samba Thiam",
        "subtext": "Data analyst / scientist — Je transforme les données en décisions."
    },
    "links": [
        {"id": "l-gh", "label": "GitHub", "url": "https://github.com/chvro12"},
        {"id": "l-li", "label": "LinkedIn", "url": "https://fr.linkedin.com/in/papa-samba-thiam"}
    ],
    "skills": [
        {"id": "sg-analytics", "group": "Analyse & Viz", "items": ["Excel","Power BI","Tableau","A/B testing","Storytelling"]},
        {"id": "sg-ml", "group": "ML / DS", "items": ["scikit-learn","TensorFlow","Segmentation","Time-series"]}
    ],
    "experiences": [
        {
            "id": "exp-boehringer",
            "key": "boehringer",
            "start": "2024-08",
            "end": None,
            "title": "Sales Forces Efficiency Analyst · Boehringer Ingelheim",
            "dateLabel": "Depuis août 2024 — Lyon",
            "sector": "Pharma / Santé animale",
            "details": [
                "Rapports Power BI pour >60 délégués vétérinaires terrain",
                "Automatisation collecte/transformations",
                "Migration Exasol → Snowflake"
            ],
            "tags": ["Dashboard","Automatisation","Data Quality","Migration","Formation"]
        },
        {
            "id": "exp-simen",
            "key": "simen",
            "start": "2022-09",
            "end": "2023-03",
            "title": "Data Analyst · Ministère de l'Éducation Nationale — SIMEN",
            "dateLabel": "Sept. 2022 — Mars 2023 — Sénégal",
            "sector": "Éducation",
            "details": ["Dashboards nationaux","Entrepôt PostgreSQL","Automatisation collecte/nettoyage"],
            "tags": ["BI","Automatisation","DWH"]
        },
        {
            "id": "exp-jumia",
            "key": "jumia",
            "start": "2021-02",
            "end": "2022-11",
            "title": "Operations Research Analyst · Jumia",
            "dateLabel": "Fév. 2021 — Nov. 2022 — Sénégal",
            "sector": "E-commerce",
            "details": [
                "Analyses volumétriques — tendances marché & comportements",
                "Modèles prédictifs ventes & stocks",
                "Outils de suivi des performances commerciales"
            ],
            "tags": ["Prédiction","Segmentation","Marché","Produit"]
        }
    ],
    "missions": [
        # boehringer
        {"id":"m1","expKey":"boehringer","type":"Dashboard","title":"Suivi terrain vétérinaire","resume":"KPI de couverture, fréquence, ciblage par territoire.","details":"Modélisation KPI + slicers.","tools":["Power BI","DAX","Snowflake"],"impact":"Visibilité ↑"},
        {"id":"m2","expKey":"boehringer","type":"Automatisation","title":"Pipelines de collecte","resume":"Normalisation flux multi-sources.","details":"Scripts ingestion + incréments.","tools":["Python","CRON"],"impact":"-50% temps"},
        # simen
        {"id":"m3","expKey":"simen","type":"BI","title":"Tableaux de bord nationaux","resume":"Suivi indicateurs.","details":"Modèle étoile + drilldown.","tools":["Power BI","PostgreSQL"],"impact":"Ciblage des actions"},
        # jumia
        {"id":"m4","expKey":"jumia","type":"Prédiction","title":"Prévisions vente/stock","resume":"Aligner supply & campagnes.","details":"XGBoost/Prophet, features saison/promo.","tools":["Python","scikit-learn","Prophet"],"impact":"Ruptures minimisées"}
    ]
}

# ─────────────────────────────────────────────────────────
# Schemas
# ─────────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ContentUpdate(BaseModel):
    data: Dict[str, Any]

# ─────────────────────────────────────────────────────────
# App & CORS
# ─────────────────────────────────────────────────────────
app = FastAPI(title="PST Backend", version="0.3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS if ALLOWED_ORIGINS != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────────────────
# Auth helpers
# ─────────────────────────────────────────────────────────
security = HTTPBearer(auto_error=True)

def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MIN),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        return payload.get("sub")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalide")

# ─────────────────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────────────────
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
