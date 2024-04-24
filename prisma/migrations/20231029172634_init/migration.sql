/*
  Warnings:

  - You are about to drop the `_ItemsToOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemsToStore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StoreToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemsToOrder" DROP CONSTRAINT "_ItemsToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemsToOrder" DROP CONSTRAINT "_ItemsToOrder_B_fkey";

-- DropForeignKey
ALTER TABLE "_ItemsToStore" DROP CONSTRAINT "_ItemsToStore_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemsToStore" DROP CONSTRAINT "_ItemsToStore_B_fkey";

-- DropForeignKey
ALTER TABLE "_StoreToUser" DROP CONSTRAINT "_StoreToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_StoreToUser" DROP CONSTRAINT "_StoreToUser_B_fkey";

-- DropTable
DROP TABLE "_ItemsToOrder";

-- DropTable
DROP TABLE "_ItemsToStore";

-- DropTable
DROP TABLE "_StoreToUser";

-- CreateTable
CREATE TABLE "ItemsToOrder" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ItemsToOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemsToStore" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "storeUuid" TEXT NOT NULL,

    CONSTRAINT "ItemsToStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToStore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeUuid" TEXT NOT NULL,

    CONSTRAINT "UserToStore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemsToOrder" ADD CONSTRAINT "ItemsToOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsToOrder" ADD CONSTRAINT "ItemsToOrder_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsToStore" ADD CONSTRAINT "ItemsToStore_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsToStore" ADD CONSTRAINT "ItemsToStore_storeUuid_fkey" FOREIGN KEY ("storeUuid") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToStore" ADD CONSTRAINT "UserToStore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToStore" ADD CONSTRAINT "UserToStore_storeUuid_fkey" FOREIGN KEY ("storeUuid") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
