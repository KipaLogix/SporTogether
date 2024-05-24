/*
  Warnings:

  - You are about to drop the column `sport` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Sports` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sportId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_sport_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "sport",
ADD COLUMN     "sportId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Sports";

-- CreateTable
CREATE TABLE "Sport" (
    "id" SERIAL NOT NULL,
    "sport" TEXT NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
