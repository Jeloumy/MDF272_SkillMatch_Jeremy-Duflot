# SkillMatch API (MDF272)

API de matching entre Freelances et Entreprises réalisée par Jérémy Duflot.

## 🛠 Technologies
- Node.js & Express
- TypeScript
- Prisma ORM (PostgreSQL)

## 🚀 Installation

1. Cloner le projet
\`\`\`bash
git clone https://github.com/TonPseudo/MDF272_SkillMatch_Jeremy-Duflot.git
cd MDF272_SkillMatch_Jeremy-Duflot
\`\`\`

2. Installer les dépendances
\`\`\`bash
npm install
\`\`\`

3. Configurer l'environnement
Renommez le fichier `.env.example` en `.env` et ajoutez votre URL de base de données :
\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/skillmatch_db"
\`\`\`

4. Lancer les migrations (Base de données)
\`\`\`bash
npx prisma migrate dev
\`\`\`

5. Démarrer le serveur
\`\`\`bash
npm start
\`\`\`

## 🧪 Tester l'API
Le serveur se lance sur `http://localhost:8000`.
Les requêtes `.http` sont disponibles dans le dossier `requests/` (ou à la racine) pour tester les endpoints.
