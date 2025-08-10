import json

def default_content() -> str:
    data = {
        "hero": {
            "available": True,
            "headline": "Bonjour, je suis Papa Samba Thiam — Data ",
            "typewriter": ["analyst", "scientist", "analyst / scientist"],
            "subtitle": "Je transforme les données en décisions intelligentes. Modèles robustes, dashboards clairs et déploiements propres.",
            "links": {
                "github": "https://github.com/chvro12",
                "linkedin": "https://fr.linkedin.com/in/papa-samba-thiam",
                "cv": "/cv.pdf"  # laisse côté Hostinger
            }
        },
        "skills": [
            {"title": "Analyse & Viz", "items": ["Excel","Power BI","Tableau","A/B testing","Storytelling"]},
            {"title": "Langages & Data", "items": ["Python","SQL","R","JavaScript/TypeScript"]},
            {"title": "Data Platform", "items": ["Snowflake","PostgreSQL","Oracle","NoSQL"]},
            {"title": "Cloud & Dev", "items": ["Azure","AWS S3","Docker","GitLab CI","CircleCI"]},
            {"title": "ETL & Pipelines", "items": ["Talend","Scripts Bash/Powershell","REST"]},
            {"title": "ML / DS", "items": ["scikit-learn","TensorFlow","Segmentation","Time-series"]}
        ],
        "certs_tools": ["Power BI","Tableau","Snowflake","Azure","AWS","Git","Docker","scikit-learn","TensorFlow","PostgreSQL"],
        "experiences": [
            {
                "key": "boehringer",
                "start": "2024-08",
                "end": None,
                "title": "Sales Forces Efficiency Analyst · Boehringer Ingelheim",
                "dateLabel": "Depuis août 2024 — Lyon",
                "sector": "Pharma / Santé animale",
                "tags": ["Dashboard","Automatisation","Data Quality","Migration","Formation"],
                "details": [
                    "Rapports Power BI pour >60 délégués vétérinaires terrain",
                    "Rapports grands comptes (rebates, suivi conditions commerciales)",
                    "Automatisation collecte/transformations pour réduire le temps de reporting",
                    "Formation des équipes terrain et managers aux outils analytiques",
                    "Contrôles qualité automatisés (détection d'anomalies / incohérences)",
                    "Migration DataLand : Exasol → Snowflake (planification, exécution, QA post-migration)",
                    "Optimisation des workflows analytiques (latence → insights plus rapides)",
                    "Co-construction KPIs commerciaux avec métiers"
                ],
                "missions": [
                    {"id": "powerbi-reporting", "type": "Dashboard", "title":"Suivi terrain vétérinaire",
                     "resume":"KPI de couverture, fréquence, ciblage par territoire.",
                     "details":"Modélisation KPI; slicers zones/espèces; priorisation segments.",
                     "tools":["Power BI","DAX","Snowflake"], "impact":"+ visibilité, meilleures priorités terrain"},
                    {"id": "pipelines", "type": "Automatisation", "title":"Pipelines de collecte",
                     "resume":"Normalisation des flux terrains multi-sources.",
                     "details":"Ingestion quotidienne; mapping référentiels; incréments; alerting.",
                     "tools":["Python","CRON/Airflow","Talend"], "impact":"−50% temps de reporting"},
                    {"id": "dq-checks", "type": "Data Quality", "title":"Contrôles automatiques",
                     "resume":"Règles d'intégrité / cohérence.",
                     "details":"Doublons; plages; rapports d'anomalies; suivi correction.",
                     "tools":["SQL","dbt (opt)","Great Expectations (opt)"], "impact":"Données fiables"},
                    {"id": "migration", "type": "Migration", "title":"Exasol → Snowflake",
                     "resume":"Planification & exécution DataLand.",
                     "details":"Inventaire; reprise requêtes; benchmark coûts/latence; QA.",
                     "tools":["Snowflake","Exasol","SQL"], "impact":"Scalabilité, dette technique réduite"},
                    {"id": "enablement", "type": "Formation", "title":"Enablement utilisateurs",
                     "resume":"Ateliers Power BI & bonnes pratiques.",
                     "details":"Sessions managers/terrain; guides; templates BI standard.",
                     "tools":["Power BI","Confluence"], "impact":"Adoption + autonomie"}
                ]
            },
            {
                "key": "simen",
                "start": "2022-09",
                "end": "2023-03",
                "title": "Data Analyst · Ministère de l'Éducation Nationale — SIMEN",
                "dateLabel": "Sept. 2022 — Mars 2023 — Sénégal",
                "sector": "Éducation",
                "tags": ["BI","Automatisation","DWH"],
                "details": [
                    "Dashboards Power BI pour performances éducatives nationales",
                    "Automatisation collecte/nettoyage (+30% efficacité)",
                    "Data Warehouse PostgreSQL (centralisation, fiabilité)",
                    "Analyses comparatives inter-régions"
                ],
                "missions": [
                    {"id": "kpi-education", "type":"BI", "title":"Tableaux de bord nationaux",
                     "resume":"Suivi d'indicateurs régionaux/établissements.",
                     "details":"Modèle étoile; KPIs scolarisation, réussite; drilldowns.",
                     "tools":["Power BI","PostgreSQL"], "impact":"Ciblage des actions"},
                    {"id":"etl-edu","type":"Automatisation","title":"Collecte/nettoyage",
                     "resume":"Scripts d'intégration standardisés.",
                     "details":"Parsing fichiers; normalisation; intégrité; historisation.",
                     "tools":["Python","Talend"], "impact":"+30% efficacité"},
                    {"id":"dwh-edu","type":"DWH","title":"Entrepôt PostgreSQL",
                     "resume":"Centralisation fiable.",
                     "details":"Schéma étoile; index; vues matérialisées.",
                     "tools":["PostgreSQL","SQL"], "impact":"Accès fiable"}
                ]
            },
            {
                "key": "jumia",
                "start": "2021-02",
                "end": "2022-11",
                "title": "Operations Research Analyst · Jumia",
                "dateLabel": "Fév. 2021 — Nov. 2022 — Sénégal",
                "sector": "E-commerce",
                "tags": ["Prédiction","Segmentation","Marché","Produit"],
                "details": [
                    "Analyses volumétriques pour tendances marché & comportements",
                    "Modèles prédictifs ventes & stocks",
                    "Optimisation stratégies marketing & commerciales",
                    "Intégration insights produit",
                    "Outils de suivi des performances commerciales"
                ],
                "missions": [
                    {"id":"forecast","type":"Prédiction","title":"Prévisions vente/stock",
                     "resume":"Aligner supply & campagnes.",
                     "details":"XGBoost/Prophet; features saison/promo; MAPE.",
                     "tools":["Python","scikit-learn","Prophet"], "impact":"Ruptures minimisées"},
                    {"id":"segmentation","type":"Segmentation","title":"Segments clients",
                     "resume":"RFM & clustering.",
                     "details":"Score RFM; KMeans/DBSCAN; personas; ciblage CRM.",
                     "tools":["Python","scikit-learn"], "impact":"Conversion ↑"},
                    {"id":"market","type":"Marché","title":"Analyse marché",
                     "resume":"Tendances & comportements.",
                     "details":"Cohortes; A/B tests; élasticité prix.",
                     "tools":["Python","Tableau/Power BI"], "impact":"Roadmap informée"},
                    {"id":"product","type":"Produit","title":"Boucles feedback",
                     "resume":"Insights → features.",
                     "details":"Instrumentation events; dashboards produit; OKR.",
                     "tools":["SQL","BI"], "impact":"Rétention ↑"}
                ]
            }
        ],
        "contact": {
            "email": "sambathiampro@icloud.com",
            "phone": "06 20 06 77 18",
            "city": "Paris, France"
        }
    }
    return json.dumps(data, ensure_ascii=False)
