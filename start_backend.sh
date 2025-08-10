#!/bin/bash

echo "🚀 Démarrage du backend Portfolio PST..."
echo "📁 Répertoire: $(pwd)"
echo "🔧 Python: $(python3 --version)"
echo "📦 Dépendances: $(python3 -m pip list | grep -E "(fastapi|uvicorn|sqlalchemy)" | wc -l) packages installés"
echo ""

echo "🌐 Démarrage du serveur sur http://localhost:8000"
echo "📚 Documentation: http://localhost:8000/docs"
echo "🔍 Health check: http://localhost:8000/health"
echo ""

echo "⏹️  Pour arrêter: Ctrl+C"
echo ""

python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
