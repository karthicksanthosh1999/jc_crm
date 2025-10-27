/*
  Warnings:

  - You are about to drop the column `address` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `idProofPublicId` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePublicId` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "address",
ADD COLUMN     "idProofPublicId" TEXT NOT NULL,
ADD COLUMN     "imagePublicId" TEXT NOT NULL;
