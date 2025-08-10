from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from config import ADMIN_EMAIL, ADMIN_PASSWORD
from security import create_token

router = APIRouter(prefix="/auth", tags=["auth"])

class LoginBody(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(body: LoginBody):
    if body.email == ADMIN_EMAIL and body.password == ADMIN_PASSWORD:
        token = create_token(sub=body.email)
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Identifiants invalides")
