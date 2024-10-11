/*
  Warnings:

  - Added the required column `retornar_para` to the `Envio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `envio` ADD COLUMN `retornar_para` VARCHAR(191) NOT NULL;
