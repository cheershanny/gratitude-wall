/*
  Warnings:

  - You are about to drop the column `content` on the `Message` table. All the data in the column will be lost.
  - Added the required column `message` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Message` DROP COLUMN `content`,
    ADD COLUMN `message` VARCHAR(191) NOT NULL;
