/*
  Warnings:

  - Added the required column `icon` to the `Sport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sport" ADD COLUMN     "icon" TEXT NOT NULL;
