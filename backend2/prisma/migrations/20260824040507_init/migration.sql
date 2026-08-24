-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ecommerce";

-- CreateEnum
CREATE TYPE "ecommerce"."ProductStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DRAFT');

-- CreateTable
CREATE TABLE "ecommerce"."Product" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "heading" TEXT,
    "subheading" TEXT,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "rating" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "status" "ecommerce"."ProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "categoryId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ecommerce"."Category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "ecommerce"."Product"("slug");

-- AddForeignKey
ALTER TABLE "ecommerce"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ecommerce"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
