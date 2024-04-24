/*
  Warnings:

  - You are about to drop the column `category` on the `Items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "category",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Items_name_key" ON "Items"("name");
