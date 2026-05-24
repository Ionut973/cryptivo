-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "descriptionFullEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "descriptionFullRo" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "descriptionFullRu" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "descriptionShortEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "descriptionShortRo" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "descriptionShortRu" TEXT NOT NULL DEFAULT '';
