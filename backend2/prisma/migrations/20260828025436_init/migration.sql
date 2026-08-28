/*
  Warnings:

  - Added the required column `paymentId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ecommerce"."Order" ADD COLUMN     "paymentId" TEXT NOT NULL;
