/*
  Warnings:

  - A unique constraint covering the columns `[qr_token]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orders_qr_token_key" ON "orders"("qr_token");
