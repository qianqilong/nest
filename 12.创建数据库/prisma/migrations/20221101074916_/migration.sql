-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `realName` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `gender` INTEGER NULL,
    `birthday` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userType` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bill` (
    `bid` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `billCode` VARCHAR(191) NULL,
    `billName` VARCHAR(191) NULL,
    `billCom` VARCHAR(191) NULL,
    `billNum` INTEGER NULL,
    `money` DOUBLE NULL,
    `pay` INTEGER NULL,
    `Date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pid` INTEGER UNSIGNED NULL,

    PRIMARY KEY (`bid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider` (
    `pid` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `providerCode` VARCHAR(191) NULL,
    `providerName` VARCHAR(191) NOT NULL,
    `people` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `fax` VARCHAR(191) NULL,
    `describe` VARCHAR(191) NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`pid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bill` ADD CONSTRAINT `bill_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `provider`(`pid`) ON DELETE SET NULL ON UPDATE CASCADE;
