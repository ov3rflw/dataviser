-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- DropIndex
DROP INDEX `Message_receiverId_fkey` ON `Message`;

-- DropIndex
DROP INDEX `Message_senderId_fkey` ON `Message`;
