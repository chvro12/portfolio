# Portfolio PST

Un projet portfolio complet avec backend FastAPI et frontend React.

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI 0.116.1
- **Base de données**: SQLAlchemy 2.0 + SQLite (par défaut) / PostgreSQL (production)
- **Authentification**: JWT avec système d'admin
- **API Endpoints**: 
  - `/health` - Vérification de l'état du serveur
  - `/api/auth/login` - Connexion admin
  - `/api/content` - Gestion du contenu du site (GET/PUT)
- **CORS**: Configuré pour accepter toutes les origines

### Frontend (React + Vite)
- **Framework**: React 18
- **Build tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Installation et Démarrage

### Backend
```bash
# Installer les dépendances Python
pip install -r requirements.txt

# Démarrer le serveur
uvicorn main:app --reload
```

### Frontend
```bash
# Installer les dépendances Node.js
npm install

# Démarrer en mode développement
npm run dev

# Build pour la production
npm run build
```

## 📁 Structure du Projet

```
portfolio/
├── main.py                 # API FastAPI principale
├── config.py              # Configuration (env vars)
├── db.py                  # Configuration base de données
├── models.py              # Modèles SQLAlchemy
├── security.py            # Authentification JWT
├── seed_content.py        # Contenu initial du site
├── requirements.txt       # Dépendances Python
├── routers/               # Routeurs API
│   ├── __init__.py
│   ├── auth.py           # Authentification
│   └── content.py        # Gestion contenu
├── package.json           # Configuration Node.js
├── index.html             # Point d'entrée HTML
├── src/
│   ├── App.jsx           # Composant principal React
│   ├── main.jsx          # Point d'entrée React
│   └── index.css         # Styles CSS
├── public/
│   └── cv.pdf           # CV en PDF
└── config files...       # Vite, Tailwind, PostCSS
```

## 🔧 Technologies Utilisées

**Backend:**
- FastAPI 0.116.1
- Uvicorn 0.35.0
- SQLAlchemy 2.0.32
- Pydantic 2.11.7
- PyJWT 2.9.0
- Python Multipart

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## 🔐 Authentification

Le système d'authentification utilise JWT :

- **Endpoint de connexion**: `POST /api/auth/login`
- **Identifiants par défaut** (à changer en production) :
  - Email: `sambathiampro@icloud.com`
  - Mot de passe: `Kaolack99@@`
- **Token JWT** valide 12h par défaut

## 📊 Gestion du Contenu

Le contenu du site est stocké en base de données et peut être modifié via l'API :

- **GET `/api/content`** : Récupérer le contenu actuel
- **PUT `/api/content`** : Modifier le contenu (requiert authentification)

Le contenu inclut :
- Section hero avec texte animé
- Compétences organisées par domaines
- Expériences professionnelles avec missions détaillées
- Informations de contact

## 🌐 Variables d'Environnement

Créez un fichier `.env` ou configurez sur votre plateforme de déploiement :

```bash
ADMIN_EMAIL=sambathiampro@icloud.com
ADMIN_PASSWORD=Kaolack99@@
JWT_SECRET=change-me-in-render
JWT_EXPIRE_MIN=720
ALLOWED_ORIGINS=*
DATABASE_URL=sqlite:///./site.db
```

## 🚀 Déploiement

### Local
```bash
# Backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend
npm run build
```

### Production (Render, Heroku, etc.)
- Configurez les variables d'environnement
- Changez `JWT_SECRET` pour un secret sécurisé
- Utilisez une base PostgreSQL pour la production
- Le frontend peut être déployé sur Hostinger, Vercel, etc.

## 📝 API Documentation

Une fois le serveur démarré, accédez à :
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔮 Évolutions Futures

- Interface d'administration pour modifier le contenu
- Système de blog/articles
- Analytics et métriques de visite
- Intégration avec des services externes (LinkedIn, GitHub)
- Système de notifications 