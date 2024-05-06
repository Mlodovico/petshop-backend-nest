/*
  Warnings:

  - You are about to drop the column `agr` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `birthdata` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the `Clients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `age` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthdate` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Clients` DROP FOREIGN KEY `Clients_petId_fkey`;

-- AlterTable
ALTER TABLE `Pet` DROP COLUMN `agr`,
    DROP COLUMN `birthdata`,
    ADD COLUMN `age` INTEGER NOT NULL,
    ADD COLUMN `birthdate` DATETIME(3) NOT NULL,
    ADD COLUMN `clientId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Clients`;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `plain` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pet` ADD CONSTRAINT `Pet_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
