/*
  Warnings:

  - Added the required column `storeId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "storeId" TEXT NOT NULL;
