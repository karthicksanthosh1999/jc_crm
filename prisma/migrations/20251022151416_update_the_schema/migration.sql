/*
  Warnings:

  - Added the required column `city` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinCode` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "pinCode" INTEGER NOT NULL;
