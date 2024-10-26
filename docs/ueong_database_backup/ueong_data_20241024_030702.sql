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
-- Dumping data for table `address_emd`
--

LOCK TABLES `address_emd` WRITE;
/*!40000 ALTER TABLE `address_emd` DISABLE KEYS */;
INSERT INTO `address_emd` VALUES (1,'가회동',1,37.58008,126.9848),(2,'신사동',2,37.52401,127.0228),(3,'중동',3,37.57173,126.9055),(4,'광안동',4,35.16289,129.1124),(5,'용현동',5,37.45085,126.6471);
/*!40000 ALTER TABLE `address_emd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `address_sd`
--

LOCK TABLES `address_sd` WRITE;
/*!40000 ALTER TABLE `address_sd` DISABLE KEYS */;
INSERT INTO `address_sd` VALUES (1,'서울특별시'),(2,'부산광역시'),(3,'인천광역시'),(4,'대구광역시'),(5,'대전광역시');
/*!40000 ALTER TABLE `address_sd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `address_sgg`
--

LOCK TABLES `address_sgg` WRITE;
/*!40000 ALTER TABLE `address_sgg` DISABLE KEYS */;
INSERT INTO `address_sgg` VALUES (1,'종로구',1),(2,'서초구',1),(3,'해운대구',2),(4,'수영구',2),(5,'남구',3);
/*!40000 ALTER TABLE `address_sgg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ar_model`
--

LOCK TABLES `ar_model` WRITE;
/*!40000 ALTER TABLE `ar_model` DISABLE KEYS */;
INSERT INTO `ar_model` VALUES (1,'노트북_모델','/models/노트북_모델',1),(2,'냉장고_모델','/models/냉장고_모델',2),(3,'자켓_모델','/models/자켓_모델',3),(4,'책_모델','/models/책_모델',4),(5,'라켓_모델','/models/라켓_모델',5);
/*!40000 ALTER TABLE `ar_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'전자제품',NULL),(2,'가전제품',1),(3,'패션',NULL),(4,'도서',NULL),(5,'스포츠',NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (4,2,1,6,1);
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(1,71);
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (6,1,'안녕하세요','2024-10-17 08:47:08',0,4);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `my_village`
--

LOCK TABLES `my_village` WRITE;
/*!40000 ALTER TABLE `my_village` DISABLE KEYS */;
INSERT INTO `my_village` VALUES (1,1),(5,1),(1,2),(2,2),(1,3),(2,3),(3,3),(2,4),(3,4),(4,4),(4,5),(5,5);
/*!40000 ALTER TABLE `my_village` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (141,'image-1729154622924-688159779.jpg','/uploads/images/image-1729154622924-688159779.jpg',71),(142,'image-1729154622926-186424750.jpg','/uploads/images/image-1729154622926-186424750.jpg',71),(143,'image-1729154622928-176696861.jpg','/uploads/images/image-1729154622928-176696861.jpg',71),(144,'image-1729158982752-98829878.jpg','/uploads/images/image-1729158982752-98829878.jpg',72),(145,'image-1729158982753-262980397.jpg','/uploads/images/image-1729158982753-262980397.jpg',72),(146,'image-1729158982754-481677071.jpg','/uploads/images/image-1729158982754-481677071.jpg',72),(147,'image-1729277021747-135578480.jpg','/uploads/images/image-1729277021747-135578480.jpg',74),(148,'image-1729277021751-156555914.jpg','/uploads/images/image-1729277021751-156555914.jpg',74),(149,'image-1729277021752-839518769.jpg','/uploads/images/image-1729277021752-839518769.jpg',74),(150,'image-1729550336494-239500836.jpg','/uploads/images/image-1729550336494-239500836.jpg',75),(151,'image-1729550336499-342713150.jpg','/uploads/images/image-1729550336499-342713150.jpg',75),(152,'image-1729550336501-194477744.jpg','/uploads/images/image-1729550336501-194477744.jpg',75),(153,'image-1729551006718-344099910.jpg','/uploads/images/image-1729551006718-344099910.jpg',76),(154,'image-1729551709047-413743645.jpg','/uploads/images/image-1729551709047-413743645.jpg',77),(155,'image-1729551931298-866265840.jpg','/uploads/images/image-1729551931298-866265840.jpg',78),(156,'image-1729552015086-645341558.jpg','/uploads/images/image-1729552015086-645341558.jpg',79),(157,'image-1729552377290-777831299.jpg','/uploads/images/image-1729552377290-777831299.jpg',80),(158,'image-1729553754853-351879288.jpg','/uploads/images/image-1729553754853-351879288.jpg',83),(159,'image-1729553754859-13491127.jpg','/uploads/images/image-1729553754859-13491127.jpg',83),(160,'image-1729613008147-645076458.jpg','/uploads/images/image-1729613008147-645076458.jpg',84),(161,'image-1729613008149-38985897.jpg','/uploads/images/image-1729613008149-38985897.jpg',84);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'노트북 판매합니다',1,'거래대기',500000,2,1,37.5665,126.978,'광화문 근처','좋은 상태의 노트북입니다.','2024-05-23 08:46:11',1),(71,'123',1,'거래대기',123,1,1,37.58007999999996,126.98409008600991,'123','123','2024-10-17 08:43:43',1),(72,'123',1,'거래대기',123,1,1,37.580076057203264,126.98432449427747,'123','123','2024-10-17 09:56:23',1),(73,'123',1,'거래대기',123,1,1,37.58010365677587,126.98437500156652,'123','123','2024-10-18 18:42:21',1),(74,'123',1,'거래대기',123,1,1,37.58010365677587,126.98437500156652,'123','123','2024-10-18 18:43:42',1),(75,'1233',1,'거래대기',123,1,1,37.58007999999996,126.98438662259274,'1123','123','2024-10-21 22:38:56',1),(76,'11',1,'거래대기',1,1,1,37.58007999999996,126.98458584062043,'1','1','2024-10-21 22:50:06',1),(77,'1313',1,'거래대기',1313,1,1,37.58007999999996,126.98429072846871,'1313','1313','2024-10-21 23:01:49',1),(78,'1313',1,'거래대기',1313,1,1,37.58007999999996,126.98429072846871,'1313','1313','2024-10-21 23:05:31',1),(79,'1313',1,'거래대기',1313,1,1,37.58007999999996,126.98429072846871,'1313','1313','2024-10-21 23:06:55',1),(80,'1',1,'거래대기',1,1,1,37.58007999999996,126.98480000000019,'1','1','2024-10-21 23:12:57',1),(81,'2',1,'거래대기',2,1,1,37.58007999999996,126.98480000000019,'2','2','2024-10-21 23:13:04',1),(82,'123132',1,'거래대기',123,1,1,37.58007999999996,126.98480000000019,'12313','123','2024-10-21 23:35:12',1),(83,'131',1,'거래대기',1313,1,1,37.58007999999996,126.98480000000019,'1313','131','2024-10-21 23:35:54',1),(84,'자전거 팝니다',1,'거래대기',1500,1,2,37.52336943239564,127.02442920122175,'1층','새거에요','2024-10-22 16:03:28',1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post_search_history`
--

LOCK TABLES `post_search_history` WRITE;
/*!40000 ALTER TABLE `post_search_history` DISABLE KEYS */;
INSERT INTO `post_search_history` VALUES (2,2,'냉장고','2024-05-23 08:46:11'),(3,3,'자켓','2024-05-23 08:46:11'),(4,4,'책','2024-05-23 08:46:11'),(5,5,'라켓','2024-05-23 08:46:11'),(6,1,'','2024-10-23 17:54:23'),(7,1,'','2024-10-23 17:54:23'),(8,1,'','2024-10-23 17:54:23'),(9,1,'','2024-10-23 17:54:23'),(10,1,'','2024-10-23 17:54:23'),(11,1,'','2024-10-23 17:54:23'),(12,1,'','2024-10-23 17:54:23'),(13,1,'','2024-10-23 17:54:23'),(14,1,'','2024-10-23 17:54:23'),(15,1,'','2024-10-23 17:54:23'),(16,1,'','2024-10-23 17:54:23'),(17,1,'','2024-10-23 17:54:23'),(18,1,'','2024-10-23 17:54:23'),(19,1,'','2024-10-23 17:54:23'),(20,1,'','2024-10-23 17:54:23'),(21,1,'','2024-10-23 17:54:23'),(22,1,'','2024-10-23 17:54:23'),(23,1,'','2024-10-23 17:54:23'),(24,1,'','2024-10-23 17:54:23'),(25,1,'','2024-10-23 17:54:23'),(26,1,'','2024-10-23 17:54:23'),(27,1,'','2024-10-23 17:54:23'),(28,1,'','2024-10-23 17:54:23'),(29,1,'자전거','2024-10-22 22:11:55');
/*!40000 ALTER TABLE `post_search_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,1,2,'의심스러운 게시물',3,'처리대기'),(2,2,3,'설명에 모욕적인 언어 포함',4,'처리대기'),(3,3,4,'사기 가능성 있음',3,'처리대기'),(4,4,5,'부적절한 내용 포함',2,'처리대기'),(5,5,1,'스팸 게시물',1,'처리대기');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `report_reason`
--

LOCK TABLES `report_reason` WRITE;
/*!40000 ALTER TABLE `report_reason` DISABLE KEYS */;
INSERT INTO `report_reason` VALUES (1,'스팸'),(2,'부적절한 내용'),(3,'사기'),(4,'모욕적인 언어'),(5,'기타');
/*!40000 ALTER TABLE `report_reason` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_rate_history`
--

LOCK TABLES `user_rate_history` WRITE;
/*!40000 ALTER TABLE `user_rate_history` DISABLE KEYS */;
INSERT INTO `user_rate_history` VALUES (1,1,2,'2024-05-23 08:46:11',5),(2,2,3,'2024-05-23 08:46:11',4),(3,3,4,'2024-05-23 08:46:11',3),(4,4,5,'2024-05-23 08:46:11',4),(5,5,1,'2024-05-23 08:46:11',5);
/*!40000 ALTER TABLE `user_rate_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'유저12','user1@example.com','$2b$10$LLwnpFwdcPe06vsOCUUz2uz2jVLrmBEJglfwc.Ma88yLRmOxFZhxW','일반회원',1,'username1',NULL),(2,'유저2','user2@example.com','$2b$10$uRG1mSe6etLJkmUIaVnxRuhqcxfxjm8CjMSaAohQ4Lh8DXVPEh0BC','일반회원',1,'username2',NULL),(3,'관리자','admin@example.com','$2b$10$8r3finKIIZc2ELdh.8MaLeCsfUmtPPiNQktJm3AZJmyCAh/KGrRVy','관리자',1,'adminuser',NULL),(4,'유저3','user3@example.com','$2b$10$U65KIh347ham6RlUFMTda.4skxv3qj5SxCzNlUfVMS6MWE2gFyCAC','일반회원',1,'username3',NULL),(5,'유저4','user4@example.com','$2b$10$GfFz6.VN116r93xre.XanOsIvqiOA1V0dpkUwDofZ/oBLzEghm4Q.','일반회원',1,'username4',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-24  3:07:03
