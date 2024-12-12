/*
  Warnings:

  - The `postedOn` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postedOn",
ADD COLUMN     "postedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "published" DROP DEFAULT;
