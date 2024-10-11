-- CreateTable
CREATE TABLE `Envio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_email_enviado` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NULL,
    `email_destino` VARCHAR(191) NOT NULL,
    `email_origem` VARCHAR(191) NOT NULL,
    `data_envio` DATETIME(3) NOT NULL,
    `assunto` VARCHAR(191) NOT NULL,
    `html` VARCHAR(191) NOT NULL,
    `ultimo_evento` VARCHAR(191) NOT NULL,
    `template` VARCHAR(191) NULL,

    UNIQUE INDEX `Envio_id_email_enviado_key`(`id_email_enviado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
