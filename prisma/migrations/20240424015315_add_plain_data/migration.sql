/*
  Warnings:

  - Added the required column `plain` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Clients` ADD COLUMN `plain` VARCHAR(191) NOT NULL;
