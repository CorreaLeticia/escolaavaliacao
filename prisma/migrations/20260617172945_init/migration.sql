-- CreateTable
CREATE TABLE `professores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `professores_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turmas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `professorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atividades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` TEXT NOT NULL,
    `turmaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `professores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atividades` ADD CONSTRAINT `atividades_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
