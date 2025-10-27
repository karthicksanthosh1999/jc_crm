-- AlterEnum
ALTER TYPE "LeadStatus" ADD VALUE 'CONVERTED';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'BED';
ALTER TYPE "Role" ADD VALUE 'ACCOUNT';
ALTER TYPE "Role" ADD VALUE 'TECH';
ALTER TYPE "Role" ADD VALUE 'QC';
ALTER TYPE "Role" ADD VALUE 'PLACEMENT';

-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "doj" DROP NOT NULL,
ALTER COLUMN "doe" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "idProof" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "pinCode" DROP NOT NULL,
ALTER COLUMN "idProofPublicId" DROP NOT NULL,
ALTER COLUMN "imagePublicId" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
