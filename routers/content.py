import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models import SiteContent
from security import require_token
from seed_content import default_content

router = APIRouter(prefix="/content", tags=["content"])

def load_or_seed(db: Session) -> SiteContent:
    row = db.query(SiteContent).filter(SiteContent.id == 1).first()
    if not row:
        row = SiteContent(id=1, json=default_content())
        db.add(row)
        db.commit()
        db.refresh(row)
    return row

@router.get("")
def get_content(db: Session = Depends(get_db)):
    row = load_or_seed(db)
    try:
        return json.loads(row.json)
    except Exception:
        raise HTTPException(status_code=500, detail="Contenu invalide en base")

@router.put("")
def put_content(payload: dict, user: str = Depends(require_token), db: Session = Depends(get_db)):
    # on stocke tel quel le JSON reçu (structure libre, front/admin doivent garder les mêmes clés)
    serialized = json.dumps(payload, ensure_ascii=False)
    row = db.query(SiteContent).filter(SiteContent.id == 1).first()
    if not row:
        row = SiteContent(id=1, json=serialized)
        db.add(row)
    else:
        row.json = serialized
    db.commit()
    return {"status": "ok"}
