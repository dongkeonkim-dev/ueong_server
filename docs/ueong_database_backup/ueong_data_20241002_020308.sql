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
/*(chat_id, seller_id, buyer_id, last_message_id, post_id)*/;
INSERT INTO `chats` VALUES (1,1,2,1,1),(2,1,2,2,2),(3,1,3,3,3);
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);    
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,2,'노트북 아직 있나요?','2024-05-23 08:46:11',0,1),(2,1,'네, 아직 있습니다.','2024-05-23 08:50:11',0,1),(3,1,'자켓 새건가요?','2024-05-23 09:46:12',0,2),(4,2,'네, 거의 새겁니다.','2024-05-23 08:46:11',1,2),(5,2,'라켓 할인 가능한가요?','2024-05-23 08:46:11',1,3);
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
INSERT INTO `photo` VALUES (1,'apple.jpeg','/uploads/images/apple.jpeg',1),(2,'cycle.jpeg','/uploads/images/cycle.jpeg',1),(3,'apple.jpeg','/uploads/images/apple.jpeg',2),(4,'shoes.jpeg','/uploads/images/shoes.jpeg',2),(5,'labtop.jpeg','/uploads/images/labtop.jpeg',3),(6,'cycle.jpeg','/uploads/images/cycle.jpeg',3),(7,'shoes.jpeg','/uploads/images/shoes.jpeg',4),(8,'apple.jpeg','/uploads/images/apple.jpeg',4),(9,'labtop.jpeg','/uploads/images/labtop.jpeg',5),(10,'cycle.jpeg','/uploads/images/cycle.jpeg',5),(11,'shoes.jpeg','/uploads/images/shoes.jpeg',6),(12,'apple.jpeg','/uploads/images/apple.jpeg',6),(13,'cycle.jpeg','/uploads/images/cycle.jpeg',7),(14,'labtop.jpeg','/uploads/images/labtop.jpeg',7),(15,'shoes.jpeg','/uploads/images/shoes.jpeg',8),(16,'apple.jpeg','/uploads/images/apple.jpeg',8),(17,'labtop.jpeg','/uploads/images/labtop.jpeg',9),(18,'cycle.jpeg','/uploads/images/cycle.jpeg',9),(19,'shoes.jpeg','/uploads/images/shoes.jpeg',10),(20,'apple.jpeg','/uploads/images/apple.jpeg',10),(21,'cycle.jpeg','/uploads/images/cycle.jpeg',11),(22,'labtop.jpeg','/uploads/images/labtop.jpeg',11),(23,'shoes.jpeg','/uploads/images/shoes.jpeg',12),(24,'apple.jpeg','/uploads/images/apple.jpeg',12),(25,'cycle.jpeg','/uploads/images/cycle.jpeg',13),(26,'labtop.jpeg','/uploads/images/labtop.jpeg',13),(27,'shoes.jpeg','/uploads/images/shoes.jpeg',14),(28,'apple.jpeg','/uploads/images/apple.jpeg',14),(29,'labtop.jpeg','/uploads/images/labtop.jpeg',15),(30,'cycle.jpeg','/uploads/images/cycle.jpeg',15),(31,'shoes.jpeg','/uploads/images/shoes.jpeg',16),(32,'apple.jpeg','/uploads/images/apple.jpeg',16),(33,'cycle.jpeg','/uploads/images/cycle.jpeg',17),(34,'labtop.jpeg','/uploads/images/labtop.jpeg',17),(35,'shoes.jpeg','/uploads/images/shoes.jpeg',18),(36,'apple.jpeg','/uploads/images/apple.jpeg',18),(37,'cycle.jpeg','/uploads/images/cycle.jpeg',19),(38,'labtop.jpeg','/uploads/images/labtop.jpeg',19),(39,'shoes.jpeg','/uploads/images/shoes.jpeg',20),(40,'apple.jpeg','/uploads/images/apple.jpeg',20),(41,'cycle.jpeg','/uploads/images/cycle.jpeg',21),(42,'labtop.jpeg','/uploads/images/labtop.jpeg',21),(43,'shoes.jpeg','/uploads/images/shoes.jpeg',22),(44,'apple.jpeg','/uploads/images/apple.jpeg',22),(45,'cycle.jpeg','/uploads/images/cycle.jpeg',23),(46,'labtop.jpeg','/uploads/images/labtop.jpeg',23),(47,'shoes.jpeg','/uploads/images/shoes.jpeg',24),(48,'apple.jpeg','/uploads/images/apple.jpeg',24),(49,'cycle.jpeg','/uploads/images/cycle.jpeg',25),(50,'labtop.jpeg','/uploads/images/labtop.jpeg',25),(51,'shoes.jpeg','/uploads/images/shoes.jpeg',26),(52,'apple.jpeg','/uploads/images/apple.jpeg',26),(53,'cycle.jpeg','/uploads/images/cycle.jpeg',27),(54,'labtop.jpeg','/uploads/images/labtop.jpeg',27),(55,'shoes.jpeg','/uploads/images/shoes.jpeg',28),(56,'apple.jpeg','/uploads/images/apple.jpeg',28),(57,'cycle.jpeg','/uploads/images/cycle.jpeg',29),(58,'labtop.jpeg','/uploads/images/labtop.jpeg',29),(59,'shoes.jpeg','/uploads/images/shoes.jpeg',30),(60,'apple.jpeg','/uploads/images/apple.jpeg',30),(61,'cycle.jpeg','/uploads/images/cycle.jpeg',31),(62,'labtop.jpeg','/uploads/images/labtop.jpeg',31),(63,'shoes.jpeg','/uploads/images/shoes.jpeg',32),(64,'apple.jpeg','/uploads/images/apple.jpeg',32),(65,'cycle.jpeg','/uploads/images/cycle.jpeg',33),(66,'labtop.jpeg','/uploads/images/labtop.jpeg',33),(67,'shoes.jpeg','/uploads/images/shoes.jpeg',34),(68,'apple.jpeg','/uploads/images/apple.jpeg',34),(69,'cycle.jpeg','/uploads/images/cycle.jpeg',35),(70,'labtop.jpeg','/uploads/images/labtop.jpeg',35),(71,'shoes.jpeg','/uploads/images/shoes.jpeg',36),(72,'apple.jpeg','/uploads/images/apple.jpeg',36),(73,'cycle.jpeg','/uploads/images/cycle.jpeg',37),(74,'labtop.jpeg','/uploads/images/labtop.jpeg',37),(75,'shoes.jpeg','/uploads/images/shoes.jpeg',38),(76,'apple.jpeg','/uploads/images/apple.jpeg',38),(77,'cycle.jpeg','/uploads/images/cycle.jpeg',39),(78,'labtop.jpeg','/uploads/images/labtop.jpeg',39),(79,'shoes.jpeg','/uploads/images/shoes.jpeg',40),(80,'apple.jpeg','/uploads/images/apple.jpeg',40),(81,'cycle.jpeg','/uploads/images/cycle.jpeg',41),(82,'labtop.jpeg','/uploads/images/labtop.jpeg',41),(83,'shoes.jpeg','/uploads/images/shoes.jpeg',42),(84,'apple.jpeg','/uploads/images/apple.jpeg',42),(85,'cycle.jpeg','/uploads/images/cycle.jpeg',43),(86,'labtop.jpeg','/uploads/images/labtop.jpeg',43),(87,'shoes.jpeg','/uploads/images/shoes.jpeg',44),(88,'apple.jpeg','/uploads/images/apple.jpeg',44),(89,'cycle.jpeg','/uploads/images/cycle.jpeg',45),(90,'labtop.jpeg','/uploads/images/labtop.jpeg',45),(91,'shoes.jpeg','/uploads/images/shoes.jpeg',46),(92,'apple.jpeg','/uploads/images/apple.jpeg',46),(93,'cycle.jpeg','/uploads/images/cycle.jpeg',47),(94,'labtop.jpeg','/uploads/images/labtop.jpeg',47),(95,'shoes.jpeg','/uploads/images/shoes.jpeg',48),(96,'apple.jpeg','/uploads/images/apple.jpeg',48),(97,'cycle.jpeg','/uploads/images/cycle.jpeg',49),(98,'labtop.jpeg','/uploads/images/labtop.jpeg',49),(99,'shoes.jpeg','/uploads/images/shoes.jpeg',50),(100,'apple.jpeg','/uploads/images/apple.jpeg',50),(101,'cycle.jpeg','/uploads/images/cycle.jpeg',51),(102,'labtop.jpeg','/uploads/images/labtop.jpeg',51),(103,'shoes.jpeg','/uploads/images/shoes.jpeg',52),(104,'apple.jpeg','/uploads/images/apple.jpeg',52),(105,'cycle.jpeg','/uploads/images/cycle.jpeg',53),(106,'labtop.jpeg','/uploads/images/labtop.jpeg',53),(107,'shoes.jpeg','/uploads/images/shoes.jpeg',54),(108,'apple.jpeg','/uploads/images/apple.jpeg',54),(109,'cycle.jpeg','/uploads/images/cycle.jpeg',55),(110,'labtop.jpeg','/uploads/images/labtop.jpeg',55),(111,'shoes.jpeg','/uploads/images/shoes.jpeg',56),(112,'apple.jpeg','/uploads/images/apple.jpeg',56),(113,'cycle.jpeg','/uploads/images/cycle.jpeg',57),(114,'labtop.jpeg','/uploads/images/labtop.jpeg',57),(115,'shoes.jpeg','/uploads/images/shoes.jpeg',58),(116,'apple.jpeg','/uploads/images/apple.jpeg',58),(117,'cycle.jpeg','/uploads/images/cycle.jpeg',59),(118,'labtop.jpeg','/uploads/images/labtop.jpeg',59),(119,'shoes.jpeg','/uploads/images/shoes.jpeg',60),(120,'apple.jpeg','/uploads/images/apple.jpeg',60),(121,'cycle.jpeg','/uploads/images/cycle.jpeg',61),(122,'labtop.jpeg','/uploads/images/labtop.jpeg',61),(123,'shoes.jpeg','/uploads/images/shoes.jpeg',62),(124,'apple.jpeg','/uploads/images/apple.jpeg',62),(125,'cycle.jpeg','/uploads/images/cycle.jpeg',63),(126,'labtop.jpeg','/uploads/images/labtop.jpeg',63),(127,'shoes.jpeg','/uploads/images/shoes.jpeg',64),(128,'apple.jpeg','/uploads/images/apple.jpeg',64),(129,'cycle.jpeg','/uploads/images/cycle.jpeg',65),(130,'labtop.jpeg','/uploads/images/labtop.jpeg',65),(131,'shoes.jpeg','/uploads/images/shoes.jpeg',66),(132,'apple.jpeg','/uploads/images/apple.jpeg',66),(133,'cycle.jpeg','/uploads/images/cycle.jpeg',67),(134,'labtop.jpeg','/uploads/images/labtop.jpeg',67),(135,'shoes.jpeg','/uploads/images/shoes.jpeg',68),(136,'apple.jpeg','/uploads/images/apple.jpeg',68),(137,'cycle.jpeg','/uploads/images/cycle.jpeg',69),(138,'labtop.jpeg','/uploads/images/labtop.jpeg',69),(139,'shoes.jpeg','/uploads/images/shoes.jpeg',70),(140,'apple.jpeg','/uploads/images/apple.jpeg',70);
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'노트북 판매합니다',1,'거래대기',500000,1,1,37.5665,126.978,'광화문 근처','좋은 상태의 노트북입니다.','2024-05-23 08:46:11',1),(2,'냉장고 팝니다',2,'거래대기',200000,2,2,37.4979,127.0276,'강남역 근처','거의 새것입니다.','2024-05-23 08:46:11',1),(3,'겨울 자켓',3,'거래대기',100000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','따뜻하고 포근합니다.','2024-05-23 08:46:11',1),(4,'해리포터 책 전집',4,'거래대기',30000,5,4,35.1544,129.1183,'광안리 다리 근처','전 7권 세트','2024-05-23 08:46:11',1),(5,'테니스 라켓',5,'거래대기',150000,1,5,37.4563,126.7052,'인천공항 근처','가볍고 내구성 좋음','2024-05-23 08:46:11',1),(6,'자전거 팝니다',5,'거래대기',80000,2,1,37.5665,126.978,'광화문 근처','거의 새 자전거','2024-05-24 04:39:37',1),(7,'텔레비전 판매',2,'거래대기',150000,3,2,37.4979,127.0276,'강남역 근처','깨끗한 상태','2024-05-24 04:43:08',1),(8,'여름 신발',3,'거래대기',30000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','편한 신발','2024-05-24 04:43:08',1),(9,'요가 매트',5,'거래대기',20000,5,4,35.1544,129.1183,'광안리 다리 근처','거의 새것','2024-05-24 04:43:08',1),(10,'자전거',1,'거래대기',90000,1,5,37.4563,126.7052,'인천공항 근처','새 자전거','2024-05-24 04:43:08',1),(11,'의자 팝니다',1,'거래대기',50000,4,1,37.5665,126.978,'광화문 근처','튼튼한 의자','2024-05-24 04:43:08',1),(12,'책상 팝니다',2,'거래대기',70000,2,2,37.4979,127.0276,'강남역 근처','큰 책상','2024-05-24 04:43:08',1),(13,'커피머신',2,'거래대기',30000,3,3,35.1587,129.1603,'해운대 해수욕장 근처','상태 양호','2024-05-24 04:43:08',1),(14,'게임기 팝니다',4,'거래대기',200000,5,5,37.4563,126.7052,'인천공항 근처','새 제품','2024-05-24 04:44:36',1),(15,'의류 팝니다',3,'거래대기',40000,3,1,37.5665,126.978,'광화문 근처','새 옷','2024-05-24 04:44:36',1),(16,'노트북',1,'거래대기',600000,2,2,37.4979,127.0276,'강남역 근처','좋은 상태의 노트북','2024-05-24 04:44:36',1),(17,'전자레인지',2,'거래대기',50000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','깨끗한 상태','2024-05-24 04:44:36',1),(18,'에어컨',2,'거래대기',300000,1,4,35.1544,129.1183,'광안리 다리 근처','새 것과 같음','2024-05-24 04:44:36',1),(19,'청소기',1,'거래대기',100000,5,5,37.4563,126.7052,'인천공항 근처','사용감 있음','2024-05-24 04:44:36',1),(20,'냉장고',2,'거래대기',500000,2,1,37.5665,126.978,'광화문 근처','대형 냉장고','2024-05-24 04:44:36',1),(21,'세탁기',2,'거래대기',200000,3,2,37.4979,127.0276,'강남역 근처','상태 양호','2024-05-24 04:44:36',1),(22,'책 판매',4,'거래대기',15000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','중고 책','2024-05-24 04:44:36',1),(23,'운동기구',5,'거래대기',80000,5,4,35.1544,129.1183,'광안리 다리 근처','상태 좋음','2024-05-24 04:44:36',1),(24,'카메라',1,'거래대기',150000,1,5,37.4563,126.7052,'인천공항 근처','새 제품','2024-05-24 04:44:36',1),(25,'프린터',2,'거래대기',30000,2,1,37.5665,126.978,'광화문 근처','정상 작동','2024-05-24 04:44:36',1),(26,'모니터',2,'거래대기',70000,3,2,37.4979,127.0276,'강남역 근처','깨끗한 상태','2024-05-24 04:44:36',1),(27,'헤드폰',1,'거래대기',40000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','좋은 소리','2024-05-24 04:44:36',1),(28,'블렌더',2,'거래대기',20000,5,4,35.1544,129.1183,'광안리 다리 근처','사용감 있음','2024-05-24 04:44:36',1),(29,'휴대폰',1,'거래대기',300000,1,5,37.4563,126.7052,'인천공항 근처','새 제품','2024-05-24 04:44:36',1),(30,'스마트워치',2,'거래대기',150000,2,1,37.5665,126.978,'광화문 근처','새 것과 같음','2024-05-24 04:44:36',1),(31,'태블릿',1,'거래대기',400000,3,2,37.4979,127.0276,'강남역 근처','좋은 상태','2024-05-24 04:44:36',1),(32,'드론',2,'거래대기',300000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','새 것','2024-05-24 04:44:36',1),(33,'게임기',4,'거래대기',200000,5,4,35.1544,129.1183,'광안리 다리 근처','좋은 상태','2024-05-24 04:44:36',1),(34,'헬멧',5,'거래대기',50000,1,5,37.4563,126.7052,'인천공항 근처','거의 새 것','2024-05-24 04:44:36',1),(35,'책상',2,'거래대기',70000,2,1,37.5665,126.978,'광화문 근처','깨끗한 상태','2024-05-24 04:44:36',1),(36,'의자',1,'거래대기',30000,3,2,37.4979,127.0276,'강남역 근처','튼튼함','2024-05-24 04:44:36',1),(37,'책',4,'거래대기',15000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','중고 책','2024-05-24 04:44:36',1),(38,'게임기 팝니다',4,'거래대기',200000,5,5,37.4563,126.7052,'인천공항 근처','새 제품','2024-05-24 04:44:40',1),(39,'의류 팝니다',3,'거래대기',40000,3,1,37.5665,126.978,'광화문 근처','새 옷','2024-05-24 04:44:40',1),(40,'노트북',1,'거래대기',600000,2,2,37.4979,127.0276,'강남역 근처','좋은 상태의 노트북','2024-05-24 04:44:40',1),(41,'전자레인지',2,'거래대기',50000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','깨끗한 상태','2024-05-24 04:44:40',1),(42,'에어컨',2,'거래대기',300000,1,4,35.1544,129.1183,'광안리 다리 근처','새 것과 같음','2024-05-24 04:44:40',1),(43,'청소기',1,'거래대기',100000,5,5,37.4563,126.7052,'인천공항 근처','사용감 있음','2024-05-24 04:44:40',1),(44,'냉장고',2,'거래대기',500000,2,1,37.5665,126.978,'광화문 근처','대형 냉장고','2024-05-24 04:44:40',1),(45,'세탁기',2,'거래대기',200000,3,2,37.4979,127.0276,'강남역 근처','상태 양호','2024-05-24 04:44:40',1),(46,'책 판매',4,'거래대기',15000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','중고 책','2024-05-24 04:44:40',1),(47,'운동기구',5,'거래대기',80000,5,4,35.1544,129.1183,'광안리 다리 근처','상태 좋음','2024-05-24 04:44:40',1),(48,'카메라',1,'거래대기',150000,1,5,37.4563,126.7052,'인천공항 근처','새 제품','2024-05-24 04:44:40',1),(49,'프린터',2,'거래대기',30000,2,1,37.5665,126.978,'광화문 근처','정상 작동','2024-05-24 04:44:40',1),(50,'모니터',2,'거래대기',70000,3,2,37.4979,127.0276,'강남역 근처','깨끗한 상태','2024-05-24 04:44:40',1),(51,'헤드폰',1,'거래대기',40000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','좋은 소리','2024-05-24 04:44:40',1),(52,'블렌더',2,'거래대기',20000,5,4,35.1544,129.1183,'광안리 다리 근처','사용감 있음','2024-05-24 04:44:40',1),(53,'휴대폰',1,'거래대기',300000,1,5,37.4563,126.7052,'인천공항 근처','새 제품','2024-05-24 04:44:40',1),(54,'스마트워치',2,'거래대기',150000,2,1,37.5665,126.978,'광화문 근처','새 것과 같음','2024-05-24 04:44:40',1),(55,'태블릿',1,'거래대기',400000,3,2,37.4979,127.0276,'강남역 근처','좋은 상태','2024-05-24 04:44:40',1),(56,'드론',2,'거래대기',300000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','새 것','2024-05-24 04:44:40',1),(57,'게임기',4,'거래대기',200000,5,4,35.1544,129.1183,'광안리 다리 근처','좋은 상태','2024-05-24 04:44:40',1),(58,'헬멧',5,'거래대기',50000,1,5,37.4563,126.7052,'인천공항 근처','거의 새 것','2024-05-24 04:44:40',1),(59,'책상',2,'거래대기',70000,2,1,37.5665,126.978,'광화문 근처','깨끗한 상태','2024-05-24 04:44:40',1),(60,'의자',1,'거래대기',30000,3,2,37.4979,127.0276,'강남역 근처','튼튼함','2024-05-24 04:44:40',1),(61,'책',4,'거래대기',15000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','중고 책','2024-05-24 04:44:40',1),(62,'의류',1,'거래대기',40000,1,5,37.4563,126.7052,'인천공항 근처','새 옷','2024-05-24 04:45:43',1),(63,'전자제품',2,'거래대기',30000,2,1,37.5665,126.978,'광화문 근처','사용감 있음','2024-05-24 04:45:43',1),(64,'게임기',4,'거래대기',200000,3,2,37.4979,127.0276,'강남역 근처','새 제품','2024-05-24 04:45:43',1),(65,'노트북',1,'거래대기',600000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','좋은 상태','2024-05-24 04:45:43',1),(66,'텔레비전',2,'거래대기',150000,5,4,35.1544,129.1183,'광안리 다리 근처','깨끗한 상태','2024-05-24 04:45:43',1),(67,'자전거',5,'거래대기',80000,1,5,37.4563,126.7052,'인천공항 근처','거의 새 것','2024-05-24 04:45:43',1),(68,'요가매트',5,'거래대기',20000,2,1,37.5665,126.978,'광화문 근처','새 것','2024-05-24 04:45:43',1),(69,'신발',3,'거래대기',30000,3,2,37.4979,127.0276,'강남역 근처','좋은 상태','2024-05-24 04:45:43',1),(70,'카메라',1,'거래대기',150000,4,3,35.1587,129.1603,'해운대 해수욕장 근처','새 제품','2024-05-24 04:45:43',1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post_search_history`
--

LOCK TABLES `post_search_history` WRITE;
/*!40000 ALTER TABLE `post_search_history` DISABLE KEYS */;
INSERT INTO `post_search_history` VALUES (1,1,'노트북','2024-05-23 08:46:11'),(2,2,'냉장고','2024-05-23 08:46:11'),(3,3,'자켓','2024-05-23 08:46:11'),(4,4,'책','2024-05-23 08:46:11'),(5,5,'라켓','2024-05-23 08:46:11');
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
INSERT INTO `users` VALUES (1,'유저1','user1@example.com','$2b$10$LLwnpFwdcPe06vsOCUUz2uz2jVLrmBEJglfwc.Ma88yLRmOxFZhxW','일반회원',1,'username1',NULL),(2,'유저2','user2@example.com','$2b$10$uRG1mSe6etLJkmUIaVnxRuhqcxfxjm8CjMSaAohQ4Lh8DXVPEh0BC','일반회원',1,'username2',NULL),(3,'관리자','admin@example.com','$2b$10$8r3finKIIZc2ELdh.8MaLeCsfUmtPPiNQktJm3AZJmyCAh/KGrRVy','관리자',1,'adminuser',NULL),(4,'유저3','user3@example.com','$2b$10$U65KIh347ham6RlUFMTda.4skxv3qj5SxCzNlUfVMS6MWE2gFyCAC','일반회원',1,'username3',NULL),(5,'유저4','user4@example.com','$2b$10$GfFz6.VN116r93xre.XanOsIvqiOA1V0dpkUwDofZ/oBLzEghm4Q.','일반회원',1,'username4',NULL);
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

-- Dump completed on 2024-10-02  2:03:09
