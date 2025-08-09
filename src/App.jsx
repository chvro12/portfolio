// Portfolio React — Papa Samba Thiam (Front complet avec tri, 3 niveaux & icônes uniformes)
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github, Linkedin, FileDown, Wand2, Mail, Phone, MapPin, Sparkles, Brain, Activity, Database, Cloud, Terminal, BarChart3, Menu, X, BriefcaseMedical, ShoppingBag, GraduationCap, Tag, Filter, ChevronRight, ShieldCheck } from "lucide-react";

const ACCENTS = { blue: { ring: "focus:ring-sky-300", text: "text-sky-700 dark:text-sky-300", border: "border-sky-100 dark:border-sky-900/40", glow: "shadow-[0_0_60px_-15px_rgba(56,189,248,0.35)]" } };

const Section = ({ children, className = "" }) => (<section className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>);
const Card = ({ children, className = "" }) => (<motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className={`rounded-2xl border bg-white/80 dark:bg-neutral-900/60 backdrop-blur p-5 shadow-sm hover:shadow-md ${className}`}>{children}</motion.div>);
const Pill = ({ icon: Icon, label }) => (<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] border bg-black/5 dark:bg-white/10"><Icon className="w-3.5 h-3.5"/>{label}</span>);
const prefetch = (href, rel = "preconnect", as) => { if (!href || typeof document === "undefined") return; if ([...document.head.querySelectorAll(`link[rel="${rel}"]`)].some(l => l.href === href)) return; const l = document.createElement("link"); l.rel = rel; l.href = href; if (as) l.as = as; document.head.appendChild(l); };
const SoftButton = ({ children, icon: Icon, href, onClick, className = "", magnetic = false, prefetchOnHover = false, ...rest }) => {
  const Comp = href ? "a" : "button"; const ref = useRef(null);
  const handleMove = (e) => { if (!magnetic || !ref.current) return; const r = ref.current.getBoundingClientRect(); const dx = (e.clientX - r.left - r.width/2)/8; const dy = (e.clientY - r.top - r.height/2)/8; ref.current.style.transform = `translate(${dx}px, ${dy}px)`; };
  const handleLeave = () => { if (!magnetic || !ref.current) return; ref.current.style.transform = "translate(0,0)"; };
  const handleEnter = () => { if (prefetchOnHover && href) prefetch(new URL(href, window.location.href).origin, "preconnect"); };
  return (<Comp ref={ref} href={href} onClick={onClick} onMouseMove={handleMove} onMouseLeave={handleLeave} onMouseEnter={handleEnter} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow dark:border-neutral-800 dark:bg-neutral-900/70 ${className}`} {...rest}>{Icon && <Icon className="w-4 h-4"/>}{children}</Comp>);
};
const Reveal = ({ children, delay = 0, y = 16 }) => { const ref = useRef(null); const inView = useInView(ref, { once: true, amount: 0.2 }); return <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut", delay }}>{children}</motion.div>; };

const TypedSuffix = () => {
  const phases = ["analyst", "scientist", "analyst / scientist"]; const maxLen = phases.reduce((m, s) => Math.max(m, s.length), 0);
  const [phase, setPhase] = useState(0); const [text, setText] = useState(""); const [typing, setTyping] = useState(true);
  useEffect(() => { let t; const full = phases[phase];
    if (typing && text.length < full.length) { t = setTimeout(() => setText(full.slice(0, text.length + 1)), 110); return () => clearTimeout(t); }
    if (typing && text.length === full.length) { t = setTimeout(() => { if (phase < 2) setTyping(false); }, phase < 2 ? 2000 : 99999999); return () => clearTimeout(t); }
    if (!typing && phase < 2) { if (text.length > 0) { t = setTimeout(() => setText(text.slice(0, -1)), 55); } else { setPhase(phase + 1); setTyping(true); } return () => clearTimeout(t); }
  }, [text, typing, phase]);
  const cursorClass = typing ? "opacity-0" : "animate-pulse";
  return (<span className="inline-block align-baseline" style={{ width: `${maxLen}ch` }}><span className="whitespace-nowrap">{text}</span><span className={`inline-block w-1.5 h-6 align-middle ml-1 bg-black dark:bg-white ${cursorClass}`} /></span>);
};
const CrossfadeTitles = () => { const suffixes = ["analyst", "scientist"]; const [i, setI] = useState(0); useEffect(() => { const id = setInterval(() => setI(v => (v + 1) % suffixes.length), 3000); return () => clearInterval(id); }, []);
  return (<div className="relative h-6 mt-1 text-xs text-black/60 dark:text-white/60"><span className="mr-1">Data</span><span className="relative inline-block"><AnimatePresence mode="wait"><motion.span key={suffixes[i]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute left-0 top-0">{suffixes[i]}</motion.span></AnimatePresence><span className="invisible">scientist</span></span></div>);
};

const EXPERIENCES = [
  { key: 'boehringer', start: '2024-08', end: null, title: 'Sales Forces Efficiency Analyst · Boehringer Ingelheim', dateLabel: 'Depuis août 2024 — Lyon', sector: 'Pharma / Santé animale', icon: BriefcaseMedical, details: [
    'Rapports Power BI pour >60 délégués vétérinaires terrain','Rapports grands comptes (rebates, suivi conditions commerciales)','Automatisation collecte/transformations pour réduire le temps de reporting','Formation des équipes terrain et managers aux outils analytiques','Contrôles qualité automatisés (détection d’anomalies / incohérences)','Migration DataLand : Exasol → Snowflake (planification, exécution, QA post-migration)','Optimisation des workflows analytiques (latence → insights plus rapides)','Co-construction KPIs commerciaux avec métiers',],
    tags: ['Dashboard', 'Automatisation', 'Data Quality', 'Migration', 'Formation'],
    missions: [
      { id: 'powerbi-reporting', type: 'Dashboard', icon: BarChart3, title: 'Suivi terrain vétérinaire', resume: 'KPI de couverture, fréquence, ciblage par territoire.', details: 'Modélisation des KPI de couverture clients, cadence de visite, priorisation des segments, pages slicers par zones et espèces.', tools: ['Power BI', 'DAX', 'Snowflake'], impact: '+ visibilité, meilleures priorités terrain' },
      { id: 'pipelines', type: 'Automatisation', icon: Terminal, title: 'Pipelines de collecte', resume: 'Normalisation des flux terrains multi-sources.', details: 'Scripts Python pour ingestion quotidienne, mapping référentiels, gestion des incréments, notifications d’échec.', tools: ['Python', 'Airflow (ou CRON)', 'Talend'], impact: '−50% temps de reporting' },
      { id: 'dq-checks', type: 'Data Quality', icon: ShieldCheck, title: 'Contrôles automatiques', resume: 'Règles d’intégrité / cohérence.', details: 'Règles de validation (doublons, valeurs hors plages), rapports d’anomalies, suivi des corrections.', tools: ['SQL', 'dbt (option)', 'Great Expectations (option)'], impact: 'Données fiables' },
      { id: 'migration', type: 'Migration', icon: Cloud, title: 'Exasol → Snowflake', resume: 'Planification & exécution DataLand.', details: 'Inventaire objets, reprise requêtes, benchmark coûts/latence, cutover progressif, QA post-migration.', tools: ['Snowflake', 'Exasol', 'SQL'], impact: 'Scalabilité, dette technique réduite' },
      { id: 'enablement', type: 'Formation', icon: GraduationCap, title: 'Enablement utilisateurs', resume: 'Ateliers Power BI & bonnes pratiques.', details: 'Sessions managers & terrain, guides d’usage, standardisation des templates BI.', tools: ['Power BI', 'Confluence'], impact: 'Adoption + autonomie' },
    ]
  },
  { key: 'simen', start: '2022-09', end: '2023-03', title: "Data Analyst · Ministère de l'Éducation Nationale — SIMEN", dateLabel: 'Sept. 2022 — Mars 2023 — Sénégal', sector: 'Éducation', icon: GraduationCap, details: [
    'Dashboards Power BI pour performances éducatives nationales','Automatisation collecte/nettoyage (+30% efficacité)','Data Warehouse PostgreSQL (centralisation, fiabilité)','Analyses comparatives inter‑régions',], tags: ['BI', 'Automatisation', 'DWH'],
    missions: [
      { id: 'kpi-education', type: 'BI', icon: BarChart3, title: 'Tableaux de bord nationaux', resume: 'Suivi d’indicateurs régionaux/établissements.', details: 'Modèle étoile, KPIs scolarisation, réussite, effectifs ; drilldowns région → établissement.', tools: ['Power BI', 'PostgreSQL'], impact: 'Ciblage des actions' },
      { id: 'etl-edu', type: 'Automatisation', icon: Terminal, title: 'Collecte/nettoyage', resume: 'Scripts d’intégration standardisés.', details: 'Parsing fichiers académiques, normalisation, contrôles d’intégrité, historisation.', tools: ['Python', 'Talend'], impact: '+30% efficacité' },
      { id: 'dwh-edu', type: 'DWH', icon: Database, title: 'Entrepôt PostgreSQL', resume: 'Centralisation fiable.', details: 'Schéma en étoile, indexation, vues matérialisées pour accélérer le reporting.', tools: ['PostgreSQL', 'SQL'], impact: 'Accès fiable' },
    ]
  },
  { key: 'jumia', start: '2021-02', end: '2022-11', title: 'Operations Research Analyst · Jumia', dateLabel: 'Fév. 2021 — Nov. 2022 — Sénégal', sector: 'E-commerce', icon: ShoppingBag, details: [
    'Analyses volumétriques pour tendances marché & comportements','Modèles prédictifs ventes & stocks','Optimisation stratégies marketing & commerciales','Intégration insights produit','Outils de suivi des performances commerciales',], tags: ['Prédiction', 'Segmentation', 'Marché', 'Produit'],
    missions: [
      { id: 'forecast', type: 'Prédiction', icon: Activity, title: 'Prévisions vente/stock', resume: 'Aligner supply & campagnes.', details: 'Modèles XGBoost/Prophet, features saison, promos, événements ; évaluation MAPE.', tools: ['Python', 'scikit-learn', 'Prophet'], impact: 'Ruptures minimisées' },
      { id: 'segmentation', type: 'Segmentation', icon: Brain, title: 'Segments clients', resume: 'RFM & clustering.', details: 'Score RFM, KMeans/DBSCAN, personas, ciblage CRM.', tools: ['Python', 'scikit-learn'], impact: 'Conversion ↑' },
      { id: 'market', type: 'Marché', icon: BarChart3, title: 'Analyse marché', resume: 'Tendances & comportements.', details: 'Analyse cohortes, A/B tests promo, élasticité prix.', tools: ['Python', 'Tableau/Power BI'], impact: 'Roadmap informée' },
      { id: 'product', type: 'Produit', icon: Terminal, title: 'Boucles feedback', resume: 'Insights → features.', details: 'Instrumentation events, tableaux de bord produit, OKR.', tools: ['SQL', 'BI'], impact: 'Rétention ↑' },
    ]
  },
];
const TYPE_ICON = { 'Dashboard': BarChart3,'Automatisation': Terminal,'Data Quality': ShieldCheck,'Migration': Cloud,'Formation': GraduationCap,'BI': BarChart3,'DWH': Database,'Prédiction': Activity,'Segmentation': Brain,'Marché': BarChart3,'Produit': Terminal, };
const byDescDate = (a, b) => { const endA = a.end ? new Date(a.end + '-01') : new Date(); const endB = b.end ? new Date(b.end + '-01') : new Date(); if (endA.getTime() !== endB.getTime()) return endB - endA; return new Date(b.start + '-01') - new Date(a.start + '-01'); };

export default function App() {
  const theme = useMemo(() => ACCENTS.blue, []);
  const [route, setRoute] = useState({ name: 'home' });
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)'); const apply = () => document.documentElement.classList.toggle('dark', mq.matches); apply(); mq?.addEventListener('change', apply); return () => mq?.removeEventListener('change', apply); }, []);
  useEffect(() => { prefetch('https://github.com', 'preconnect'); prefetch('https://fr.linkedin.com', 'preconnect'); }, []);
  return (<div className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(0,0,0,0.06),transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
        <motion.div className="absolute left-1/2 top-[-10rem] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full blur-3xl opacity-60" style={{ background: "rgba(56,189,248,0.25)" }} animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      </div>
      <nav className="border-b bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl sticky top-0 z-40">
        <Section className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className={`h-9 w-9 rounded-xl border flex items-center justify-center bg-white dark:bg-neutral-900 ${theme.border} ${theme.glow}`}><Sparkles className={`w-4 h-4 ${theme.text}`} /></div>
            <div className="leading-tight"><div className="font-semibold">Papa Samba Thiam</div><CrossfadeTitles /></div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <SoftButton href="#skills" icon={Brain}>Compétences</SoftButton>
            <SoftButton href="#experiences" icon={Activity}>Expériences</SoftButton>
            <SoftButton onClick={() => setRoute({ name: 'ai' })} icon={Wand2} magnetic className="bg-black text-white hover:bg-black/90 dark:bg:white dark:text-black">Tester mon IA</SoftButton>
          </div>
          <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border" onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu"><Menu className="w-5 h-5" /></button>
        </Section>
      </nav>
      <AnimatePresence>{mobileOpen && (<motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: 'spring', stiffness: 180, damping: 22 }} className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-neutral-950 border-l p-4">
            <div className="flex items-center justify-between"><div className="font-semibold">Menu</div><button className="inline-flex w-9 h-9 items-center justify-center rounded-lg border" onClick={() => setMobileOpen(false)} aria-label="Fermer le menu"><X className="w-5 h-5" /></button></div>
            <div className="mt-6 grid gap-2">
              <SoftButton href="#skills" onClick={() => setMobileOpen(false)}>Compétences</SoftButton>
              <SoftButton href="#experiences" onClick={() => setMobileOpen(false)}>Expériences</SoftButton>
              <SoftButton onClick={() => { setRoute({ name: 'ai' }); setMobileOpen(false); }} className="bg-black text-white hover:bg-black/90 dark:bg:white dark:text-black">Tester mon IA</SoftButton>
            </div>
          </motion.aside>
        </motion.div>)}</AnimatePresence>
      <AnimatePresence mode="wait">
        {route.name === 'home' && <Home key="home" setRoute={setRoute} />}
        {route.name === 'ai' && <AIPage key="ai" onBack={() => setRoute({ name: 'home' })} />}
        {route.name.startsWith('exp:') && (<ExperienceDetail key={route.name} expKey={route.name.split(':')[1]} onBack={() => setRoute({ name: 'home' })} onOpenMission={(missionId) => setRoute({ name: `mission:${route.name.split(':')[1]}:${missionId}` })} />)}
        {route.name.startsWith('mission:') && (<MissionDetail key={route.name} expKey={route.name.split(':')[1]} missionId={route.name.split(':')[2]} onBackToExp={() => setRoute({ name: `exp:${route.name.split(':')[1]}` })} />)}
      </AnimatePresence>
      <div id="ai" className="h-1" />
    </div>);
}

function Home({ setRoute }) {
  const GH = "https://github.com/chvro12"; const LI = "https://fr.linkedin.com/in/papa-samba-thiam"; const CV = "/cv.pdf";
  const sorted = [...EXPERIENCES].sort(byDescDate);
  return (<motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Section className="py-14 md:py-20 text-center">
        <Reveal><div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-black/60 dark:text-white/50 bg-white/80 dark:bg-neutral-900/70"><Sparkles className="w-3.5 h-3.5" /> Disponible pour opportunités</div></Reveal>
        <Reveal y={24}><h1 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight">Bonjour, je suis <span className="underline decoration-black/20 dark:decoration-white/20 underline-offset-4">Papa Samba Thiam</span> —<span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-black/60 dark:from-white dark:to-white/50"> Data <TypedSuffix /></span></h1></Reveal>
        <Reveal y={18}><p className="mt-4 text-base md:text-lg text-black/70 dark:text-white/60 max-w-2xl mx-auto">Je transforme les données en décisions intelligentes. Modèles robustes, dashboards clairs et déploiements propres.</p></Reveal>
        <Reveal y={16}><div className="mt-8 flex flex-wrap items-center justify-center gap-3"><SoftButton href={CV} icon={FileDown} download target="_blank" rel="noopener" prefetchOnHover>Télécharger CV</SoftButton><SoftButton href={GH} icon={Github} target="_blank" rel="noopener" prefetchOnHover>GitHub</SoftButton><SoftButton href={LI} icon={Linkedin} target="_blank" rel="noopener" prefetchOnHover>LinkedIn</SoftButton><SoftButton onClick={() => setRoute({ name: 'ai' })} icon={Wand2} magnetic className="bg-black text-white hover:bg-black/90 dark:bg:white dark:text-black">Tester mon IA</SoftButton></div></Reveal>
      </Section>
      <Section id="skills" className="py-14">
        <Reveal><h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Compétences</h2><p className="text-black/60 dark:text-white/60 mt-2">Regroupées par domaine pour plus de clarté.</p></Reveal>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkillGroup title="Analyse & Viz" items={["Excel", "Power BI", "Tableau", "A/B testing", "Storytelling"]} icon={BarChart3} />
          <SkillGroup title="Langages & Data" items={["Python", "SQL", "R", "JavaScript/TypeScript"]} icon={Terminal} />
          <SkillGroup title="Data Platform" items={["Snowflake", "PostgreSQL", "Oracle", "NoSQL"]} icon={Database} />
          <SkillGroup title="Cloud & Dev" items={["Azure", "AWS S3", "Docker", "GitLab CI", "CircleCI"]} icon={Cloud} />
          <SkillGroup title="ETL & Pipelines" items={["Talend", "Scripts Bash/Powershell", "REST"]} icon={Terminal} />
          <SkillGroup title="ML / DS" items={["scikit-learn", "TensorFlow", "Segmentation", "Time-series"]} icon={Brain} />
        </div>
        <div className="mt-10"><Reveal><h3 className="text-lg font-semibold">Certifications & Outils</h3></Reveal><div className="mt-4 flex flex-wrap gap-2">{['Power BI','Tableau','Snowflake','Azure','AWS','Git','Docker','scikit-learn','TensorFlow','PostgreSQL'].map(l => (<span key={l} className="text-xs px-3 py-1 rounded-full border bg-white/70 dark:bg-neutral-900/70">{l}</span>))}</div></div>
      </Section>
      <Section id="experiences" className="py-14">
        <Reveal><h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Expériences professionnelles</h2><p className="text-black/60 dark:text-white/60 mt-2">Un parcours orienté impact, de la donnée à la décision.</p></Reveal>
        <div className="mt-8 relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-black/10 to-transparent dark:from-white/10" />
          <div className="space-y-6">
            {sorted.map((exp, i) => (<Reveal key={exp.key} delay={i * 0.05}><div className="relative pl-10 md:pl-14">
                    <div className="absolute left-2.5 md:left-4 top-2 h-3 w-3 rounded-full border-2 border-sky-100 dark:border-sky-900/40 bg-white dark:bg-neutral-900" />
                    <Card>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="font-semibold flex items-center gap-2"><Pill icon={exp.icon} label={exp.sector} /> {exp.title}</div>
                        <div className="text-xs text-black/50 dark:text-white/40">{exp.dateLabel}</div>
                      </div>
                      <ul className="list-disc pl-5 mt-2 text-sm text-black/80 dark:text-white/80 space-y-1">{exp.details.map(d => <li key={d}>{d}</li>)}</ul>
                      <div className="mt-3 flex flex-wrap gap-2">{exp.tags.map(t => <span key={t} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border"><Tag className="w-3.5 h-3.5"/>{t}</span>)}</div>
                      <div className="mt-4"><SoftButton onClick={() => setRoute({ name: `exp:${exp.key}` })}>En savoir plus</SoftButton></div>
                    </Card>
                  </div></Reveal>))}
          </div>
        </div>
      </Section>
      <Section id="contact" className="py-14">
        <Reveal><h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h2><p className="text-black/60 dark:text-white/60 mt-2">Parlons de votre prochain défi data.</p></Reveal>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div><label className="text-sm text-black/70 dark:text-white/70">Nom</label><input className={`mt-1 w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900`} placeholder="Votre nom" /></div>
              <div><label className="text-sm text-black/70 dark:text-white/70">Email</label><input type="email" className={`mt-1 w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900`} placeholder="vous@exemple.com" /></div>
              <div><label className="text-sm text-black/70 dark:text-white/70">Message</label><textarea rows={4} className={`mt-1 w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900`} placeholder="Décrivez votre besoin" /></div>
              <SoftButton className="bg-black text-white hover:bg-black/90 dark:bg:white dark:text-black" icon={Mail}>Envoyer</SoftButton>
            </form>
          </Card>
          <Card><ContactCard /></Card>
        </div>
      </Section>
      <footer className="py-10 border-t bg-white/60 dark:bg-neutral-950/60"><Section className="text-sm text-black/60 dark:text-white/50">© {new Date().getFullYear()} Papa Samba Thiam — Fait avec React, Tailwind, Framer Motion.</Section></footer>
    </motion.main>);
}
function SkillGroup({ title, items, icon: Icon }) { return (<Card><div className="flex items-center gap-2 mb-2"><div className="h-8 w-8 rounded-xl border flex items-center justify-center bg-white dark:bg-neutral-900"><Icon className="w-4 h-4"/></div><div className="font-medium">{title}</div></div><div className="flex flex-wrap gap-2">{items.map(i => (<span key={i} className="text-xs px-2.5 py-1 rounded-full border bg-white/70 dark:bg-neutral-900/70">{i}</span>))}</div></Card>); }
function ContactCard() { return (<div className="space-y-3 text-sm"><div className="flex items-center gap-2"><Mail className="w-4 h-4" /> sambathiampro@icloud.com</div><div className="flex items-center gap-2"><Phone className="w-4 h-4" /> 06 20 06 77 18</div><div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Paris, France</div><div className="pt-2 text-black/60 dark:text-white/60">Réseaux pro</div><div className="flex gap-2"><SoftButton href="https://github.com/chvro12" icon={Github} target="_blank" rel="noopener" prefetchOnHover>GitHub</SoftButton><SoftButton href="https://fr.linkedin.com/in/papa-samba-thiam" icon={Linkedin} target="_blank" rel="noopener" prefetchOnHover>LinkedIn</SoftButton></div></div>); }
function Breadcrumb({ items }) { return (<nav className="text-xs text-black/60 dark:text-white/60 flex items-center gap-1">{items.map((it, idx) => (<span key={idx} className="inline-flex items-center gap-1">{idx>0 && <ChevronRight className="w-3.5 h-3.5"/>}{it.href ? <a href="#" onClick={(e)=>{e.preventDefault(); it.onClick?.();}} className="hover:underline">{it.label}</a> : <span>{it.label}</span>}</span>))}</nav>); }
function ExperienceDetail({ expKey, onBack, onOpenMission }) {
  const exp = EXPERIENCES.find(e => e.key === expKey);
  const missions = exp?.missions || [];
  const [filter, setFilter] = useState('Tous');
  const types = ['Tous', ...Array.from(new Set(missions.map(m => m.type)))];
  const filtered = missions.filter(m => filter === 'Tous' || m.type === filter);
  return (<motion.main initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 18 }} className="min-h-screen">
      <Section className="pt-10 pb-16">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="space-y-1">
            <Breadcrumb items={[{label:'Accueil', onClick:onBack},{label:'Expériences', onClick:onBack},{label:exp?.title}]} />
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{exp?.title}</h1>
            <p className="text-sm text-black/60 dark:text-white/60">{exp?.dateLabel} — <span className="inline-flex items-center gap-1"><exp.icon className="w-3.5 h-3.5"/> {exp?.sector}</span></p>
          </div>
          <SoftButton onClick={onBack}>Retour</SoftButton>
        </div>
        <Card className="mt-6"><div className="font-medium">Résumé</div><p className="text-sm text-black/70 dark:text-white/70 mt-2">{exp?.details?.[0]} • {exp?.details?.[1]} • {exp?.details?.[2]}</p></Card>
        <div className="mt-6 flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4"/> <span className="text-sm">Filtrer par type</span>
          {types.map(t => (<button key={t} onClick={() => setFilter(t)} className={`text-xs px-2.5 py-1 rounded-full border ${filter===t ? 'bg-black text-white dark:bg:white dark:text-black' : 'bg-white/70 dark:bg-neutral-900/70'}`}>{t}</button>))}
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {filtered.map((m) => { const Icon = m.icon || TYPE_ICON[m.type] || Tag; return (<Card key={m.id}>
                <div className="flex items-center justify-between gap-2"><div className="font-medium inline-flex items-center gap-2"><div className="h-8 w-8 rounded-xl border flex items-center justify-center bg-white dark:bg-neutral-900"><Icon className="w-4 h-4"/></div>{m.title}</div><span className="text-[11px] px-2 py-0.5 rounded-full border">{m.type}</span></div>
                <p className="text-sm text-black/70 dark:text-white/70 mt-2">{m.resume}</p>
                <div className="mt-2 text-xs text-black/60 dark:text-white/60">Impact : {m.impact}</div>
                <div className="mt-4"><SoftButton onClick={() => onOpenMission(m.id)}>Voir la mission</SoftButton></div>
              </Card>); })}
        </div>
      </Section>
      <footer className="py-10 border-t bg-white/60 dark:bg-neutral-950/60"><Section className="text-sm text-black/60 dark:text-white/50">© {new Date().getFullYear()} Papa Samba Thiam — Détails d’expérience</Section></footer>
    </motion.main>);
}
function MissionDetail({ expKey, missionId, onBackToExp }) {
  const exp = EXPERIENCES.find(e => e.key === expKey);
  const mission = exp?.missions?.find(m => m.id === missionId);
  const Icon = mission?.icon || TYPE_ICON[mission?.type] || Tag;
  return (<motion.main initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 18 }} className="min-h-screen">
      <Section className="pt-10 pb-16">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="space-y-1">
            <Breadcrumb items={[{label:'Accueil', onClick:onBackToExp},{label:'Expériences', onClick:onBackToExp},{label:exp?.title, onClick:onBackToExp},{label:mission?.title}]} />
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight inline-flex items-center gap-2"><div className="h-9 w-9 rounded-xl border flex items-center justify-center bg-white dark:bg-neutral-900"><Icon className="w-5 h-5"/></div>{mission?.title}</h1>
            <p className="text-sm text-black/60 dark:text-white/60">{exp?.dateLabel} — <span className="inline-flex items-center gap-1"><exp.icon className="w-3.5 h-3.5"/> {exp?.sector}</span> • <span className="px-2 py-0.5 rounded-full border text-[11px]">{mission?.type}</span></p>
          </div>
          <SoftButton onClick={onBackToExp}>Retour à {exp?.key}</SoftButton>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <Card className="lg:col-span-2">
            <div className="font-semibold">Résumé de la mission</div>
            <p className="text-sm text-black/70 dark:text-white/70 mt-2">{mission?.resume}</p>
            <div className="font-semibold mt-4">Détails</div>
            <p className="text-sm text-black/70 dark:text-white/70 mt-1">{mission?.details}</p>
          </Card>
          <Card>
            <div className="font-semibold">Outils utilisés</div>
            <div className="mt-2 flex flex-wrap gap-2">{(mission?.tools||[]).map(t => (<span key={t} className="text-xs px-2.5 py-1 rounded-full border bg-white/70 dark:bg-neutral-900/70">{t}</span>))}</div>
            <div className="font-semibold mt-4">Impact</div>
            <div className="text-sm text-black/70 dark:text-white/70 mt-1">{mission?.impact}</div>
          </Card>
        </div>
      </Section>
      <footer className="py-10 border-t bg-white/60 dark:bg-neutral-950/60"><Section className="text-sm text-black/60 dark:text-white/50">© {new Date().getFullYear()} Papa Samba Thiam — Mission</Section></footer>
    </motion.main>);
}

function AIPage({ onBack }) {
  const [input, setInput] = useState(""); const [loading, setLoading] = useState(false); const [result, setResult] = useState(null);
  return (<motion.main initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 18 }} className="min-h-screen">
      <Section className="pt-10 pb-16">
        <div className="flex items-center justify-between"><h1 className="text-2xl md:text-3xl font-semibold tracking-tight inline-flex items-center gap-2"><Wand2 className="w-6 h-6"/> Tester mon IA</h1><SoftButton onClick={onBack}>Retour</SoftButton></div>
        <div className={`mt-6 rounded-2xl border p-5 bg-white/70 dark:bg-neutral-900/70`}>
          <label className="text-sm text-black/70 dark:text-white/70">Décrivez votre problématique business</label>
          <textarea value={input} onChange={(e)=>setInput(e.target.value)} rows={5} className={`mt-2 w-full rounded-xl border px-3 py-2 bg-white dark:bg-neutral-900`} placeholder={"Ex: Réduire le churn de 15% sur 6 mois pour nos clients B2C..."} />
          <div className="mt-3 flex items-center gap-2">
            <SoftButton onClick={async ()=>{ setLoading(true); setResult(null); await new Promise(r=>setTimeout(r,900)); setResult(mockAnalyze(input)); setLoading(false); }} className="bg-black text-white hover:bg-black/90 dark:bg:white dark:text-black" icon={Wand2} magnetic>{loading ? "Analyse en cours..." : "Analyser"}</SoftButton>
            <span className="text-xs text-black/50 dark:text-white/40">API mockée — prêt à brancher FastAPI/Flask</span>
          </div>
        </div>
        <AnimatePresence>
          {loading && (<motion.div className="mt-8 grid md:grid-cols-2 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {[1,2,3,4].map(i => (<div key={i} className="rounded-2xl border p-5 bg-white/60 dark:bg-neutral-900/60 overflow-hidden"><div className="h-4 w-1/3 mb-3 bg-black/10 dark:bg-white/10 animate-pulse rounded" /><div className="space-y-2"><div className="h-3 w-full bg-black/10 dark:bg-white/10 animate-pulse rounded" /><div className="h-3 w-5/6 bg-black/10 dark:bg-white/10 animate-pulse rounded" /><div className="h-3 w-4/6 bg-black/10 dark:bg-white/10 animate-pulse rounded" /></div></div>))}
            </motion.div>)}
        </AnimatePresence>
        <AnimatePresence>
          {result && (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-8 grid md:grid-cols-2 gap-6">
              <Card><div className="font-semibold">Données nécessaires</div><ul className="list-disc pl-5 mt-2 text-sm text-black/70 dark:text-white/70">{result.requiredData.map((d) => (<li key={d}>{d}</li>))}</ul></Card>
              <Card><div className="font-semibold">Méthodologie recommandée</div><ol className="list-decimal pl-5 mt-2 text-sm text-black/70 dark:text-white/70 space-y-1">{result.methodology.map((m) => (<li key={m}>{m}</li>))}</ol></Card>
              <Card><div className="font-semibold">Modèle IA adapté</div><p className="text-sm text-black/70 dark:text-white/70 mt-2">{result.model}</p></Card>
              <Card><div className="font-semibold">Risques / limitations</div><ul className="list-disc pl-5 mt-2 text-sm text-black/70 dark:text-white/70">{result.risks.map((r) => (<li key={r}>{r}</li>))}</ul></Card>
            </motion.div>)}
        </AnimatePresence>
      </Section>
      <footer className="py-10 border-t bg-white/60 dark:bg-neutral-950/60"><Section className="text-sm text-black/60 dark:text-white/50">© {new Date().getFullYear()} Papa Samba Thiam — IA Playground</Section></footer>
    </motion.main>);
}
function mockAnalyze(prompt) {
  return {
    requiredData: ["Historique de ventes (24 mois)", "Caractéristiques clients (RFM, segments)", "Événements marketing / saisonnalité", "Contraintes métier (SLA, budgets)"],
    methodology: ["Cadrage: formuler la question décisionnelle", "Exploration: features clés, data leakage, qualité", "Modélisation: baseline simple → modèle avancé", "Évaluation: métriques métier + A/B test", "Déploiement: API + monitoring drift"],
    model: /texte/.test((prompt||'').toLowerCase()) ? "LLM + RAG (embeddings)" : /image/.test((prompt||'').toLowerCase()) ? "CNN/ViT" : /(temps|forecast|time|série)/.test((prompt||'').toLowerCase()) ? "Prophet / TFT / XGBoost time-series" : "XGBoost / LightGBM / Ridge",
    risks: ["Qualité / complétude de la donnée", "Biais / surapprentissage", "Coûts infra et latence", "Sécurité / conformité RGPD"],
  };
}
