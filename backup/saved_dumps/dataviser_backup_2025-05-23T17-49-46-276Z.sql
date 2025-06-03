-- MySQL dump 10.13  Distrib 8.4.4, for macos14.7 (arm64)
--
-- Host: localhost    Database: dataviser
-- ------------------------------------------------------
-- Server version	8.4.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('0450092f-f566-45b6-8e12-884a1f9f596c','aeb0571542a66ffa4007d26b54cbbd461d37102c84f97056630fbd247f404c61','2025-03-10 21:33:02.050','20250212105735_add_message',NULL,NULL,'2025-03-10 21:33:02.023',1),('0dd81c95-52ce-4707-96e0-146fa835dabc','a4a923fce53a46d8d79a71cf9e24aed8305f2e0de46b483fea158ef2912c7d4a','2025-03-10 21:33:02.022','20250211160316_add_message',NULL,NULL,'2025-03-10 21:33:01.930',1),('5bc70316-37a3-4df3-940b-e50a982d2af0','00daa2dbc40c51cb71bd830bc2b3cefb316c150ba3ca5121e2b202b72a898ce2','2025-03-14 13:00:41.545','20250312193411_init',NULL,NULL,'2025-03-14 13:00:41.492',1),('697abdd1-a041-468c-ad27-876da2446f77','668430b26a14cf6d5e601aaf286c146c720b2823006fc2eb5f809bf2c6a7f855','2025-03-10 21:33:01.929','20250207203311_',NULL,NULL,'2025-03-10 21:33:01.908',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Alert`
--

DROP TABLE IF EXISTS `Alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Alert` (
  `id` int NOT NULL AUTO_INCREMENT,
  `srcIp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alertType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Alert_srcIp_fkey` (`srcIp`),
  CONSTRAINT `Alert_srcIp_fkey` FOREIGN KEY (`srcIp`) REFERENCES `IP` (`ip`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Alert`
--

LOCK TABLES `Alert` WRITE;
/*!40000 ALTER TABLE `Alert` DISABLE KEYS */;
INSERT INTO `Alert` VALUES (1,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.056'),(2,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.057'),(3,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.109'),(4,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.112'),(5,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.137'),(6,'192.168.68.68','DDOS','Possible attaque DDoS détectée depuis 192.168.68.68','2025-03-21 09:02:03.145'),(7,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.157'),(8,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.182'),(9,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.221'),(10,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.248'),(11,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.275'),(12,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.326'),(13,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.326'),(14,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.334'),(15,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.350'),(16,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.367'),(17,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.381'),(18,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.389'),(19,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.421'),(20,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.439'),(21,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.465'),(22,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.512'),(23,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.678'),(24,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.741'),(25,'192.168.68.68','DDOS','Possible attaque DDoS détectée depuis 192.168.68.68','2025-03-21 09:02:03.784'),(26,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.794'),(27,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.854'),(28,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.888'),(29,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.917'),(30,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.917'),(31,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:03.975'),(32,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.006'),(33,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.007'),(34,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.009'),(35,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.045'),(36,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.074'),(37,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.102'),(38,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.129'),(39,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.160'),(40,'192.168.68.68','DDOS','Possible attaque DDoS détectée depuis 192.168.68.68','2025-03-21 09:02:04.169'),(41,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.182'),(42,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.236'),(43,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.278'),(44,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.280'),(45,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.315'),(46,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.339'),(47,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.383'),(48,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.408'),(49,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.444'),(50,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.478'),(51,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.500'),(52,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.506'),(53,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.561'),(54,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.582'),(55,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.620'),(56,'192.168.68.68','DDOS','Possible attaque DDoS détectée depuis 192.168.68.68','2025-03-21 09:02:04.633'),(57,'199.232.171.8','DDOS','Possible attaque DDoS détectée depuis 199.232.171.8','2025-03-21 09:02:04.658');
/*!40000 ALTER TABLE `Alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Detection`
--

DROP TABLE IF EXISTS `Detection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Detection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `srcIp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detectionType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `packetCount` int NOT NULL,
  `threshold` int NOT NULL,
  `timestamp` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Detection_srcIp_fkey` (`srcIp`),
  CONSTRAINT `Detection_srcIp_fkey` FOREIGN KEY (`srcIp`) REFERENCES `IP` (`ip`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Detection`
--

LOCK TABLES `Detection` WRITE;
/*!40000 ALTER TABLE `Detection` DISABLE KEYS */;
INSERT INTO `Detection` VALUES (1,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.056'),(2,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.032'),(3,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.057'),(4,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.112'),(5,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.112'),(6,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.140'),(7,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.157'),(8,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.181'),(9,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.222'),(10,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.262'),(11,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.285'),(12,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.326'),(13,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.326'),(14,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.334'),(15,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.366'),(16,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.375'),(17,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.389'),(18,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.389'),(19,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.428'),(20,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.439'),(21,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.478'),(22,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.513'),(23,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.680'),(24,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.747'),(25,'192.168.68.68','DDOS',51,50,'2025-03-21 09:02:03.784'),(26,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.820'),(27,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.861'),(28,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.913'),(29,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.917'),(30,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.917'),(31,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:03.981'),(32,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.007'),(33,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.007'),(34,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.009'),(35,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.058'),(36,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.074'),(37,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.113'),(38,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.147'),(39,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.169'),(40,'192.168.68.68','DDOS',51,50,'2025-03-21 09:02:04.168'),(41,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.188'),(42,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.251'),(43,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.280'),(44,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.280'),(45,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.315'),(46,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.348'),(47,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.395'),(48,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.427'),(49,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.473'),(50,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.485'),(51,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.502'),(52,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.506'),(53,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.561'),(54,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.604'),(55,'192.168.68.68','DDOS',51,50,'2025-03-21 09:02:04.633'),(56,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.633'),(57,'199.232.171.8','DDOS',51,50,'2025-03-21 09:02:04.658');
/*!40000 ALTER TABLE `Detection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IP`
--

DROP TABLE IF EXISTS `IP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IP` (
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hostname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `netbiosName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IP`
--

LOCK TABLES `IP` WRITE;
/*!40000 ALTER TABLE `IP` DISABLE KEYS */;
INSERT INTO `IP` VALUES ('192.168.68.68',NULL,NULL),('199.232.171.8',NULL,NULL);
/*!40000 ALTER TABLE `IP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Log`
--

DROP TABLE IF EXISTS `Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `level` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timestamp` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Log`
--

LOCK TABLES `Log` WRITE;
/*!40000 ALTER TABLE `Log` DISABLE KEYS */;
INSERT INTO `Log` VALUES (1,'INFO','Démarrage de la surveillance réseau...','General','null','2025-03-14 13:00:58.000'),(2,'info','Événement détecté par Python','Python','127.0.0.1','2025-03-17 09:17:39.965');
/*!40000 ALTER TABLE `Log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `senderId` int NOT NULL,
  `receiverId` int NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
INSERT INTO `Message` VALUES (1,1,1,'salut gros','2025-03-14 15:35:01.461'),(2,1,1,'ezza','2025-03-14 15:35:14.423'),(3,1,1,'ez','2025-03-14 15:35:14.610'),(4,1,1,'eaz','2025-03-14 15:35:14.794'),(5,1,1,'e','2025-03-14 15:35:14.926'),(6,1,1,'ez','2025-03-14 15:35:15.162'),(7,1,1,'eza','2025-03-14 15:35:15.761');
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `hashedPassword` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'nono','nono','nono@nono.fr',NULL,'$2a$10$.ajAEJonHkerJrJ.b2A1EOgdXjRb19WodxebBbk4VcxdZbxbwHGfG','2025-03-11 18:51:02.309','2025-03-11 18:51:02.309');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-23 19:49:47
