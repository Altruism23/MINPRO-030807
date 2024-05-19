/*
  Warnings:

  - Added the required column `cretedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `cretedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `imageUrl` LONGTEXT NULL,
    ADD COLUMN `status` ENUM('PAID', 'PENDING', 'CANCEL') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `ticket` INTEGER NOT NULL,
    ADD COLUMN `total` INTEGER NOT NULL;
