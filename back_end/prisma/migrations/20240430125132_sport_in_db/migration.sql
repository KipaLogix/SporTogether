/*
  Warnings:

  - Changed the type of `sport` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "sport",
ADD COLUMN     "sport" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Sport";

-- CreateTable
CREATE TABLE "Sport" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sport_fkey" FOREIGN KEY ("sport") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
