/*
  Warnings:

  - The primary key for the `Sport` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_sportId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "sportId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Sport" DROP CONSTRAINT "Sport_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sport_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sport_id_seq";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
