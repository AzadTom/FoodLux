/*
  Warnings:

  - Made the column `paymentId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ecommerce"."Order" ALTER COLUMN "paymentId" SET NOT NULL,
ALTER COLUMN "paymentId" SET DEFAULT '';
