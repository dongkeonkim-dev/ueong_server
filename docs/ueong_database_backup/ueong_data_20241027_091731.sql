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
INSERT INTO `chats` VALUES (5,2,1,13,111);
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (2,111),(1,112);
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (7,1,'52355','2024-10-26 21:49:58',0,5),(8,1,'555','2024-10-26 21:50:06',0,5),(9,1,'33','2024-10-26 21:50:15',0,5),(10,2,'121','2024-10-26 21:51:01',0,5),(11,1,'44','2024-10-26 21:51:05',0,5),(12,1,'22','2024-10-26 21:51:24',0,5),(13,1,'444','2024-10-26 21:51:32',0,5);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `my_village`
--

LOCK TABLES `my_village` WRITE;
/*!40000 ALTER TABLE `my_village` DISABLE KEYS */;
INSERT INTO `my_village` VALUES (1,1),(5,1),(1,2),(2,2),(1,3),(2,3),(3,3),(1,4),(2,4),(3,4),(4,4),(4,5),(5,5);
/*!40000 ALTER TABLE `my_village` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (264,'/uploads/images/image-1729979289023-654645081.jpg',NULL,'2024-10-27 06:48:09'),(265,'/uploads/images/image-1729979289031-708084606.jpg',NULL,'2024-10-27 06:48:09'),(266,'/uploads/images/image-1729979289039-750637510.jpg',NULL,'2024-10-27 06:48:09'),(267,'/uploads/images/image-1729979295023-255299207.jpg',110,'2024-10-27 06:48:15'),(268,'/uploads/images/image-1729979295026-20189832.jpg',110,'2024-10-27 06:48:15'),(269,'/uploads/images/image-1729979299122-362587126.jpg',110,'2024-10-27 06:48:19'),(270,'/uploads/images/image-1729979299139-724170673.jpg',NULL,'2024-10-27 06:48:19'),(271,'/uploads/images/image-1729979299145-429139678.jpg',111,'2024-10-27 06:48:19'),(272,'/uploads/images/image-1729979362034-318776212.jpg',112,'2024-10-27 06:49:22'),(273,'/uploads/images/image-1729979362045-358593632.jpg',112,'2024-10-27 06:49:22'),(274,'/uploads/images/image-1729979724110-922035617.jpg',112,'2024-10-27 06:55:24'),(275,'/uploads/images/image-1729979724115-189513493.jpg',NULL,'2024-10-27 06:55:24'),(276,'/uploads/images/image-1729979724116-656615073.jpg',NULL,'2024-10-27 06:55:24');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (110,'1234',1,'거래대기',1,1,1,37.58007999999996,126.9848000000002,'11','1','2024-10-26 21:48:26',1),(111,'245',1,'거래대기',24,2,2,37.52401000000001,127.02280000000002,'24','24','2024-10-26 21:49:27',0),(112,'Hhh',1,'거래대기',777,1,2,37.52401000000001,127.02280000000002,'Ggg','Hhh','2024-10-26 21:55:32',1),(114,'새 게시물 제목',1,'거래대기',10000,6,2,37.5665,126.978,'서울특별시 중구','게시물 내용','2024-10-26 23:15:16',1),(115,'새 게시물 제목',1,'거래대기',10000,6,2,37.5665,126.978,'서울특별시 중구','게시물 내용','2024-10-26 23:16:16',1),(116,'새 게시물 제목',1,'거래대기',10000,6,2,37.5665,126.978,'서울특별시 중구','게시물 내용','2024-10-26 23:16:30',1),(118,'새 게시물 제목',1,'거래대기',10000,6,2,37.5665,126.978,'서울특별시 중구','게시물 내용','2024-10-26 23:17:21',1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post_search_history`
--

LOCK TABLES `post_search_history` WRITE;
/*!40000 ALTER TABLE `post_search_history` DISABLE KEYS */;
INSERT INTO `post_search_history` VALUES (2,2,'냉장고','2024-05-23 08:46:11'),(3,3,'자켓','2024-05-23 08:46:11'),(4,4,'책','2024-05-23 08:46:11'),(5,5,'라켓','2024-05-23 08:46:11'),(29,1,'자전거','2024-10-24 22:18:13'),(30,1,'1','2024-10-24 23:33:26');
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
INSERT INTO `users` VALUES (1,'유저1','user1@example.com','','일반회원',1,'username1','/uploads/images/image-1729936776174-327199452.jpg'),(2,'유저2','user2@example.com','$2b$10$uRG1mSe6etLJkmUIaVnxRuhqcxfxjm8CjMSaAohQ4Lh8DXVPEh0BC','일반회원',1,'username2',NULL),(6,'test1','test@test.com','$2b$10$9ywOnflpwIF.Ml52db4gS.WgOPFcPCNZSMZv.EapPyRP3JreLNXjK','일반회원',1,'test1',NULL),(9,'123','123@a.com','$2b$10$VPrx/ARCRklSlh1DBIdSc.ZGbzGqE85E16L4ktvUXZKPQuhlXEZf2','일반회원',1,'123',NULL);
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

-- Dump completed on 2024-10-27  9:17:32
