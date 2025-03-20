-- CreateTable
CREATE TABLE `Alert` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `srcIp` VARCHAR(191) NOT NULL,
    `alertType` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IP` (
    `ip` VARCHAR(191) NOT NULL,
    `hostname` VARCHAR(191) NULL,
    `netbiosName` VARCHAR(191) NULL,

    PRIMARY KEY (`ip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `srcIp` VARCHAR(191) NOT NULL,
    `detectionType` VARCHAR(191) NOT NULL,
    `packetCount` INTEGER NOT NULL,
    `threshold` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `ip` VARCHAR(191) NULL,
    `timestamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alert` ADD CONSTRAINT `Alert_srcIp_fkey` FOREIGN KEY (`srcIp`) REFERENCES `IP`(`ip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detection` ADD CONSTRAINT `Detection_srcIp_fkey` FOREIGN KEY (`srcIp`) REFERENCES `IP`(`ip`) ON DELETE RESTRICT ON UPDATE CASCADE;
