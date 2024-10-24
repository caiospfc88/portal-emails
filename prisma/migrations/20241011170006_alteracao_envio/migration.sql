/*
  Warnings:

  - Added the required column `agendado` to the `Envio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `envio` ADD COLUMN `agendado` DATETIME(3) NOT NULL;
