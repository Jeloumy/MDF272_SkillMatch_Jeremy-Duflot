import { PrismaClient } from "@prisma/client";
import { getEnvVariable } from "../utiles";

const prisma = new PrismaClient();

const freelances = [
    {
        nom: "Alice Dev",
        email: "alice@skillmatch.com",
        skills: ["Python", "FastAPI", "Docker"],
        tjm: 450
    },
    {
        nom: "Bob Django",
        email: "bob@skillmatch.com",
        skills: ["Python", "Django"],
        tjm: 400
    },
    {
        nom: "Charlie Expert",
        email: "charlie@skillmatch.com",
        skills: ["Python", "FastAPI"],
        tjm: 600
    }
];

const entreprises = [
    {
        nom: "TechCorp",
        secteur: "Développement Web"
    },
    {
        nom: "DataSolutions",
        secteur: "Big Data"
    }
];

async function main() {
    console.log("🚀 Lancement de l'insertion des données...");

    // Boucle Freelances
    for (const freelance of freelances) {
        await prisma.freelance.create({
            data: freelance
        });
        console.log(`👤 Freelance créé : ${freelance.nom}`);
    }

    // Boucle Entreprises
    for (const entreprise of entreprises) {
        await prisma.entreprise.create({
            data: entreprise
        });
        console.log(`🏢 Entreprise créée : ${entreprise.nom}`);
    }

    // Ajout du Projet pour TechCorp
    const techCorp = await prisma.entreprise.findFirst({
        where: { nom: "TechCorp" }
    });

    if (techCorp) {
        await prisma.projet.create({
            data: {
                titre: "Développement API Backend",
                description: "API REST pour une application mobile",
                skillsRequis: ["Python", "FastAPI"],
                budgetMaxTjm: 500,
                entrepriseId: techCorp.id
            }
        });
        console.log("📂 Projet 'API Backend' attaché à TechCorp");
    }

    console.log("✅ SEED TERMINÉ AVEC SUCCÈS !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seed :");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());