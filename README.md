# Portfolio PST

Un projet portfolio complet avec backend FastAPI et frontend React.

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI
- **Fichier principal**: `main.py`
- **Endpoint de santé**: `/health`
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
├── main.py                 # API FastAPI
├── requirements.txt        # Dépendances Python
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
- FastAPI
- Uvicorn
- Pydantic
- Python Multipart

**Frontend:**
- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## 📝 API Endpoints

- `GET /health` - Endpoint de vérification de l'état du serveur

## 🌐 Déploiement

Le projet est configuré pour être facilement déployable sur différentes plateformes cloud. 