/*
  Warnings:

  - The `blogsId` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_blogsId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "blogsId",
ADD COLUMN     "blogsId" INTEGER[];

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_blogsId_fkey" FOREIGN KEY ("blogsId") REFERENCES "Blogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
