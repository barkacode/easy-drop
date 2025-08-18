/*
  Warnings:

  - You are about to drop the `ProductOnBundle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductOnBundle" DROP CONSTRAINT "ProductOnBundle_bundleId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnBundle" DROP CONSTRAINT "ProductOnBundle_productId_fkey";

-- DropTable
DROP TABLE "ProductOnBundle";

-- CreateTable
CREATE TABLE "_BundleProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BundleProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BundleProducts_B_index" ON "_BundleProducts"("B");

-- AddForeignKey
ALTER TABLE "_BundleProducts" ADD CONSTRAINT "_BundleProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "bundle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BundleProducts" ADD CONSTRAINT "_BundleProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
