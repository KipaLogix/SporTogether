-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Sport" AS ENUM ('FOOTBALL', 'BASKETBALL', 'TENNIS', 'VOLLEYBALL', 'HANDBALL', 'RUGBY', 'SWIMMING', 'RUNNING', 'CYCLING', 'GOLF', 'BOXING', 'MARTIAL_ARTS', 'YOGA', 'DANCE', 'FITNESS', 'GYMNASTICS', 'SKIING', 'SNOWBOARDING', 'ICE_SKATING', 'ICE_HOCKEY', 'CURLING', 'SQUASH', 'BADMINTON', 'TABLE_TENNIS', 'BILLIARDS', 'DARTS', 'CHESS', 'POKER', 'BRIDGE', 'BACKGAMMON', 'VIDEO_GAMES', 'BOARD_GAMES', 'CARD_GAMES', 'OTHER');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "sport" "Sport"[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Location" (
    "userId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "country" TEXT,
    "city" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_userId_key" ON "Location"("userId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
