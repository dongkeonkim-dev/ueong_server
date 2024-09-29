-- MySQL dump 10.13  Distrib 8.0.37, for macos14 (arm64)
--
-- Host: localhost    Database: ueong
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `address_emd`
--

DROP TABLE IF EXISTS `address_emd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_emd` (
  `emd_id` int NOT NULL,
  `emd_name` varchar(45) NOT NULL,
  `sgg_id` int NOT NULL,
  PRIMARY KEY (`emd_id`),
  KEY `fk_address_emd_address_sgg_idx` (`sgg_id`),
  CONSTRAINT `fk_address_emd_address_sgg` FOREIGN KEY (`sgg_id`) REFERENCES `address_sgg` (`sgg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `address_sd`
--

DROP TABLE IF EXISTS `address_sd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_sd` (
  `sd_id` int NOT NULL,
  `sd_name` varchar(45) NOT NULL,
  PRIMARY KEY (`sd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `address_sgg`
--

DROP TABLE IF EXISTS `address_sgg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_sgg` (
  `sgg_id` int NOT NULL,
  `sgg_name` varchar(45) NOT NULL,
  `sd_id` int NOT NULL,
  PRIMARY KEY (`sgg_id`),
  KEY `fk_address_sgg_address_sd1_idx` (`sd_id`),
  CONSTRAINT `fk_address_sgg_address_sd1` FOREIGN KEY (`sd_id`) REFERENCES `address_sd` (`sd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ar_model`
--

DROP TABLE IF EXISTS `ar_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ar_model` (
  `ar_model_id` int NOT NULL AUTO_INCREMENT,
  `ar_model_name` varchar(45) NOT NULL,
  `ar_model_directory` varchar(45) NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`ar_model_id`),
  KEY `fk_ar_model_post1_idx` (`post_id`),
  CONSTRAINT `fk_ar_model_post1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  `parent_category_id` int DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `fk_category_category1_idx` (`parent_category_id`),
  CONSTRAINT `fk_category_category1` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `seller_id` int NOT NULL,
  `buyer_id` int NOT NULL,
  `last_message_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`chat_id`),
  KEY `fk_chats_users1_idx` (`seller_id`),
  KEY `fk_chats_users2_idx` (`buyer_id`),
  KEY `fk_chats_messages1_idx` (`last_message_id`),
  KEY `fk_chats_post1_idx` (`post_id`),
  CONSTRAINT `fk_chats_messages1` FOREIGN KEY (`last_message_id`) REFERENCES `messages` (`message_id`),
  CONSTRAINT `fk_chats_users1` FOREIGN KEY (`seller_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_chats_users2` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_chats_post1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`post_id`),
  KEY `fk_users_has_post_post1_idx` (`post_id`),
  KEY `fk_users_has_post_users1_idx` (`user_id`),
  CONSTRAINT `fk_users_has_post_post1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  CONSTRAINT `fk_users_has_post_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message_text` varchar(255) NOT NULL,
  `sent_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `chat_id` int NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `fk_messages_users1_idx` (`sender_id`),
  KEY `fk_messages_users2_idx` (`receiver_id`),
  KEY `fk_messages_chats1_idx` (`chat_id`),
  CONSTRAINT `fk_messages_users1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_messages_users2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_messages_chats1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`chat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `my_village`
--

DROP TABLE IF EXISTS `my_village`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_village` (
  `user_id` int NOT NULL,
  `emd_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`emd_id`),
  KEY `fk_users_has_address_emd_address_emd1_idx` (`emd_id`),
  KEY `fk_users_has_address_emd_users1_idx` (`user_id`),
  CONSTRAINT `fk_users_has_address_emd_address_emd1` FOREIGN KEY (`emd_id`) REFERENCES `address_emd` (`emd_id`),
  CONSTRAINT `fk_users_has_address_emd_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `photo_id` int NOT NULL AUTO_INCREMENT,
  `photo_name` varchar(255) NOT NULL,
  `photo_directory` varchar(255) NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `fk_image_post1_idx` (`post_id`),
  CONSTRAINT `fk_image_post1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_title` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `status` enum('거래대기','거래완료') NOT NULL DEFAULT '거래대기',
  `price` int NOT NULL,
  `writer_id` int NOT NULL,
  `emd_id` int NOT NULL,
  `desired_trading_location_latitude` double NOT NULL,
  `desired_trading_location_longitude` double NOT NULL,
  `desired_trading_location_detail` varchar(255) NOT NULL,
  `text` varchar(1023) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`post_id`),
  KEY `fk_post_address_emd1_idx` (`emd_id`),
  KEY `fk_post_users1_idx` (`writer_id`),
  KEY `fk_post_category1_idx` (`category_id`),
  CONSTRAINT `fk_post_address_emd1` FOREIGN KEY (`emd_id`) REFERENCES `address_emd` (`emd_id`),
  CONSTRAINT `fk_post_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `fk_post_users1` FOREIGN KEY (`writer_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_search_history`
--

DROP TABLE IF EXISTS `post_search_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_search_history` (
  `post_search_history_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `search_term` varchar(45) NOT NULL,
  `search_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_search_history_id`),
  KEY `fk_search_history_users1_idx` (`user_id`),
  CONSTRAINT `fk_search_history_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `reporter_id` int NOT NULL,
  `report_detail` varchar(255) NOT NULL,
  `report_reason_id` int NOT NULL,
  `status` enum('처리대기','처리완료') NOT NULL,
  PRIMARY KEY (`report_id`),
  KEY `fk_table1_post1_idx` (`post_id`),
  KEY `fk_report_users1_idx` (`reporter_id`),
  KEY `fk_report_report_reason1_idx` (`report_reason_id`),
  CONSTRAINT `fk_report_report_reason1` FOREIGN KEY (`report_reason_id`) REFERENCES `report_reason` (`report_reason_id`),
  CONSTRAINT `fk_report_users1` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_table1_post1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report_reason`
--

DROP TABLE IF EXISTS `report_reason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_reason` (
  `report_reason_id` int NOT NULL AUTO_INCREMENT,
  `report_reason_name` varchar(45) NOT NULL,
  PRIMARY KEY (`report_reason_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_rate_history`
--

DROP TABLE IF EXISTS `user_rate_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_rate_history` (
  `rate_history_id` int NOT NULL AUTO_INCREMENT,
  `rater_id` int NOT NULL,
  `ratee_id` int NOT NULL,
  `rate_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rate` int NOT NULL,
  PRIMARY KEY (`rate_history_id`),
  KEY `fk_users_has_users_users2_idx` (`ratee_id`),
  KEY `fk_users_has_users_users1_idx` (`rater_id`),
  CONSTRAINT `fk_users_has_users_users1` FOREIGN KEY (`rater_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_users_has_users_users2` FOREIGN KEY (`ratee_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `authority` enum('일반회원','관리자') NOT NULL,
  `is_active` tinyint NOT NULL,
  `username` varchar(32) NOT NULL,
  `profile_photo_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`)
  KEY `fk_user_photo1_idx` (`profile_photo_id`),
  CONSTRAINT `fk_user_photo1` FOREIGN KEY (`profile_photo_id`) REFERENCES `photo` (`photo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-30  0:40:30
