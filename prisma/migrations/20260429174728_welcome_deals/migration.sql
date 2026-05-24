-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isWelcomeDeal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "welcomeDiscount" INTEGER NOT NULL DEFAULT 0;
