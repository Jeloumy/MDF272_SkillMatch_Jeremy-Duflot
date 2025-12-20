-- CreateEnum
CREATE TYPE "StatutProjet" AS ENUM ('OUVERT', 'EN_COURS', 'TERMINE', 'ANNULE');

-- AlterTable
ALTER TABLE "Projet" ADD COLUMN     "statut" "StatutProjet" NOT NULL DEFAULT 'OUVERT';
