-- CreateTable
CREATE TABLE `abouts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NULL,
    `description` TEXT NOT NULL,
    `year_exp` INTEGER NULL,
    `total_proj` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
