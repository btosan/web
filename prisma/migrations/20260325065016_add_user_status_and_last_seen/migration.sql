/*
  Warnings:

  - Made the column `catName` on table `CaseStudyCategory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tagName` on table `CaseStudyTag` required. This step will fail if there are existing NULL values in that column.
  - Made the column `catName` on table `ProjectCategory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tagName` on table `ProjectTag` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "CaseStudyCategory" ALTER COLUMN "catName" SET NOT NULL;

-- AlterTable
ALTER TABLE "CaseStudyTag" ALTER COLUMN "tagName" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProjectCategory" ALTER COLUMN "catName" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProjectTag" ALTER COLUMN "tagName" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastSeenAt" TIMESTAMP(3),
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
