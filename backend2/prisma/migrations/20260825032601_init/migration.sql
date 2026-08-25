-- CreateTable
CREATE TABLE "ecommerce"."Cart" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ecommerce"."Wishlist" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cart_userId_idx" ON "ecommerce"."Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_productId_key" ON "ecommerce"."Cart"("userId", "productId");

-- CreateIndex
CREATE INDEX "Wishlist_userId_idx" ON "ecommerce"."Wishlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_productId_key" ON "ecommerce"."Wishlist"("userId", "productId");

-- AddForeignKey
ALTER TABLE "ecommerce"."Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ecommerce"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ecommerce"."Wishlist" ADD CONSTRAINT "Wishlist_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ecommerce"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
