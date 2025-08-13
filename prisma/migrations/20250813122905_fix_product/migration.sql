-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('ON_DEMAND', 'FABRICATION_FERME', 'PHONOGRAPHIE');

-- CreateEnum
CREATE TYPE "PrintType" AS ENUM ('DTF', 'SERIGRAPHIE', 'BRODERIE');

-- CreateEnum
CREATE TYPE "ProductColor" AS ENUM ('BLACK', 'GRAY', 'WHITE');

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "category" "ProductCategory" NOT NULL DEFAULT 'ON_DEMAND',
ADD COLUMN     "color" "ProductColor",
ADD COLUMN     "inPack" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isIndividual" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "printType" "PrintType",
ADD COLUMN     "sizes" JSONB,
ALTER COLUMN "quantity" DROP NOT NULL;

-- AlterTable
ALTER TABLE "shopify_store" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';
