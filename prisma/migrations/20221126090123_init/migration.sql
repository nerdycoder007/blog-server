/*
  Warnings:

  - The `upadtedAt` column on the `Blogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "upadtedAt",
ADD COLUMN     "upadtedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
