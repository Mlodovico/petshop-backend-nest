/*
  Warnings:

  - Added the required column `agr` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pet` ADD COLUMN `agr` INTEGER NOT NULL,
    ADD COLUMN `weight` INTEGER NOT NULL;
