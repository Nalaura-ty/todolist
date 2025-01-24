/*
  Warnings:

  - You are about to drop the column `categoryId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Task_categoryId_fkey` ON `task`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `categoryId`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `category`;
