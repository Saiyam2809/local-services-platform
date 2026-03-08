/*
  Warnings:

  - You are about to drop the column `serviceType` on the `ProviderProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProviderProfile" DROP COLUMN "serviceType",
ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "ProviderProfile" ADD CONSTRAINT "ProviderProfile_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
