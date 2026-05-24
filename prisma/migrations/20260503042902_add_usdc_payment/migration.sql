-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cryptoAddress" TEXT,
ADD COLUMN     "cryptoCurrency" TEXT NOT NULL DEFAULT 'USDC',
ADD COLUMN     "cryptoNetwork" TEXT NOT NULL DEFAULT 'TRC20',
ADD COLUMN     "paymentMethod" TEXT NOT NULL DEFAULT 'CRYPTO',
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING';
