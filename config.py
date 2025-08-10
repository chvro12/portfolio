import os

# Admin credentials (définis-les sur Render → Environment)
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "sambathiampro@icloud.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "Kaolack99@@")

# JWT
JWT_SECRET = os.getenv("JWT_SECRET", "change-me-in-render")  # change en prod
JWT_ALG = "HS256"
JWT_EXPIRE_MIN = int(os.getenv("JWT_EXPIRE_MIN", "720"))  # 12h

# CORS
ALLOWED_ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "*").split(",") if o.strip()]

# DB
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./site.db")
