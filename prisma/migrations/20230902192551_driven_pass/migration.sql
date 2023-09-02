-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDIT', 'DEBIT', 'BOTH');

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credential" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "cvv" INTEGER NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "virtual" BOOLEAN NOT NULL,
    "type" "CardType" NOT NULL,
    "nameOnCard" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "credential" ADD CONSTRAINT "credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
