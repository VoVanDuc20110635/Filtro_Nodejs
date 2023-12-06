-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: filtrobaomatweb
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `danhmuc`
--

DROP TABLE IF EXISTS `danhmuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `danhmuc` (
  `madanhmuc` int(11) NOT NULL AUTO_INCREMENT,
  `TenDanhMuc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `TinhTrang` int(11) DEFAULT NULL,
  PRIMARY KEY (`madanhmuc`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhmuc`
--

LOCK TABLES `danhmuc` WRITE;
/*!40000 ALTER TABLE `danhmuc` DISABLE KEYS */;
INSERT INTO `danhmuc` VALUES (1,'Cà phê bột',0),(2,'Cà phê nén',NULL),(3,'Cà phê nhân xanh',NULL),(4,'Cà phê hạt đã rang',NULL),(5,'Cà phê hạt',NULL),(6,'TET',1),(7,'ATCAT',1),(8,'Test',0),(9,'test1234',0);
/*!40000 ALTER TABLE `danhmuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dathang`
--

DROP TABLE IF EXISTS `dathang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `dathang` (
  `madathang` int(11) NOT NULL AUTO_INCREMENT,
  `MaKH` int(11) DEFAULT NULL,
  `NgayDatHang` date DEFAULT NULL,
  `SDT` varchar(45) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `DiaChi` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Tong` int(11) DEFAULT NULL,
  `TinhTrang` int(11) DEFAULT NULL,
  `PhuongThucThanhToan` int(11) DEFAULT NULL,
  `Zip` int(11) DEFAULT NULL,
  `ThanhPho` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`madathang`),
  KEY `FK_DH_MAKH_KH_idx` (`MaKH`),
  KEY `FK_DH_PTTT_ID_idx` (`PhuongThucThanhToan`),
  CONSTRAINT `FK_DH_MAKH_KH` FOREIGN KEY (`MaKH`) REFERENCES `khachhang` (`makh`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_DH_PTTT_ID` FOREIGN KEY (`PhuongThucThanhToan`) REFERENCES `phuongthuc_thanhtoan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dathang`
--

LOCK TABLES `dathang` WRITE;
/*!40000 ALTER TABLE `dathang` DISABLE KEYS */;
INSERT INTO `dathang` VALUES (8,1010,'2023-04-10','123456789','phu@gmail.com','ACDC/12',1380000,2,1,2580,'HN'),(9,1014,'2023-04-11','0789654123','letgo@gmail.com','quan 12',1175000,1,1,70000,'HCM'),(10,1010,'2023-04-11','07721113120','phutv1990@gmail.com','TPHCM',1950000,2,1,4508,'HCM'),(11,1010,'2023-04-11','0789654123',NULL,'ACDC/12',1800000,2,1,2580,'HCM'),(12,1014,'2023-04-11','0789654123','letgo@gmail.com','TPHCM',185000,1,1,70000,'HCM'),(13,1015,'2023-04-12','07721113120','cf96@gmail.com','TPHCM',185000,1,1,70000,'HCM'),(14,1016,'2023-04-12','0789654123','sangpro123@gmail.com','Quang Trung',1545000,1,1,70000,'HCM'),(15,1018,'2023-04-16','0789654123','dk8@gmail.com','Q12',185000,1,1,70000,'HCM'),(16,1010,'2023-04-16','0789654123','phu123@gmail.com','',2175000,4,1,2580,'HCM'),(17,1018,'2023-04-17','0789654123','dk8@gmail.com','Tôn Đảng',970000,6,1,70000,'HCM'),(18,1015,'2023-04-17','07721132120','cf96@gmail.com','',510000,4,1,70000,'HCM'),(19,1010,'2023-04-19','01472583690','phutv1990@gmail.com','TPHCM',805000,4,1,70000,'HCM'),(20,1019,'2023-04-22','0789654123','jnt12@gmail.com','ACDC/12',185000,1,1,70000,'HCM'),(21,1019,'2023-04-22','0789654123','jnt12@gmail.com','TPHCM',1235000,1,1,70000,'HCM'),(22,1020,'2023-04-22','0789654123','tk1@gmail.com','Lê Thánh Tôn',405000,1,1,4508,'HCM'),(23,1015,'2023-05-13','0949691700','Phutv1990@gmail.com','K2 P1',2500000,4,1,700000,'Trà Vinh'),(24,1015,'2023-05-13','0949691700','Phutv1990@gmail.com','K2 P1',310000,2,1,700000,'Trà Vinh'),(25,1015,'2023-05-13','0949691700','Phutv1990@gmail.com','K2 P1',380000,1,1,700000,'Trà Vinh'),(26,1015,'2023-05-13','0949691700','Phutv1990@gmail.com','K2 P1',185000,1,1,700000,'Trà Vinh'),(27,1010,'2023-05-14','0949691700','Phutv1990@gmail.com','K2 P1',1210000,1,1,700000,'Trà Vinh'),(28,1010,'2023-05-14','0949691700','Phutv1990@gmail.com','K2 P1',950000,4,1,700000,'Trà Vinh'),(29,1010,'2023-05-14','0123456789','phutv199@gmail.com','localhost',220000,1,1,1,'TPHCM'),(30,1017,'2023-05-16','0949691700','Phutv1990@gmail.com','K2 P1',620000,2,1,700000,'Trà Vinh'),(31,1017,'2023-05-16','0949691701','Phutv1990@gmail.com','K2 P1',185000,4,1,700000,'Trà Vinh'),(32,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(33,1133,'2023-05-26','0913605573','20110635@student.hcmute.edu.vn','Ký túc xá khu B, đại học quốc gia, thành phố HCM',280000,2,1,13221,'Bình Dương'),(34,1133,'2023-05-26','0913605573','20110635@student.hcmute.edu.vn','Ký túc xá khu B, đại học quốc gia, thành phố HCM',390000,1,1,4654,'Bình Dương'),(35,1133,'2023-05-26','0913605573','20110635@student.hcmute.edu.vn','Ký túc xá khu B, đại học quốc gia, thành phố HCM',200000,1,1,45321,'Bình Dương'),(36,1156,'2023-06-28','0913605573','20110635@student.hcmute.edu.vn','Ký túc xá khu B, đại học quốc gia, thành phố HCM',265000,5,1,6546,'Bình Dương'),(37,1167,'2023-06-28','0913605573','20110635@student.hcmute.edu.vn','Ký túc xá khu B, đại học quốc gia, thành phố HCM',265000,5,1,6546,'Bình Dương'),(38,1167,'2023-06-28','0913605573','20110635@student.hcmute.edu.vn','Ký túc xá khu B, đại học quốc gia, thành phố HCM',265000,5,1,6546,'Bình Dương'),(39,1167,NULL,NULL,'voduc0100@gmail.com','1234 Main St',NULL,1,1,NULL,NULL),(40,1167,'2023-12-05','0869990187','voduc0100@gmail.com','Ha Noi',1202000,1,1,530,'Ha Noi'),(41,1167,'2023-12-05','0869990187','voduc0100@gmail.com','Ha Noi',1202000,1,1,530,'Ha Noi'),(42,1167,'2023-12-05','0869990187','voduc0100@gmail.com','Ha Noi',912000,1,1,530,'Ha Noi');
/*!40000 ALTER TABLE `dathang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dathang_chitiet`
--

DROP TABLE IF EXISTS `dathang_chitiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `dathang_chitiet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MaDatHang` int(11) DEFAULT NULL,
  `MaSPChitiet` int(11) DEFAULT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  `GiaTien` int(11) DEFAULT NULL,
  `Tong` int(11) DEFAULT NULL,
  `MaSP` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_DHCT_MADH_DH_idx` (`MaDatHang`),
  KEY `FK_DHCT_MASP_SP_idx` (`MaSPChitiet`),
  CONSTRAINT `FK_DHCT_MADH_DH` FOREIGN KEY (`MaDatHang`) REFERENCES `dathang` (`madathang`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_DHCT_MASP_SP` FOREIGN KEY (`MaSPChitiet`) REFERENCES `sanpham_chitiet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dathang_chitiet`
--

LOCK TABLES `dathang_chitiet` WRITE;
/*!40000 ALTER TABLE `dathang_chitiet` DISABLE KEYS */;
INSERT INTO `dathang_chitiet` VALUES (60,40,99,1,670000,670000,1),(61,40,88,1,532000,532000,1),(62,41,99,1,670000,670000,1),(63,41,88,1,532000,532000,1),(64,42,88,1,532000,532000,2),(65,42,102,1,380000,380000,7);
/*!40000 ALTER TABLE `dathang_chitiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giohang`
--

DROP TABLE IF EXISTS `giohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `giohang` (
  `MaGioHang` int(11) NOT NULL AUTO_INCREMENT,
  `MaKH` int(11) DEFAULT NULL,
  `ThoiGianTao` date DEFAULT NULL,
  `ThoiGianCapNhat` date DEFAULT NULL,
  `Tong` int(11) DEFAULT NULL,
  `TrangThai` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`MaGioHang`),
  KEY `FK_GH_MATK_TK_idx` (`MaKH`),
  CONSTRAINT `FK_GH_MATK_TK` FOREIGN KEY (`MaKH`) REFERENCES `khachhang` (`makh`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giohang`
--

LOCK TABLES `giohang` WRITE;
/*!40000 ALTER TABLE `giohang` DISABLE KEYS */;
INSERT INTO `giohang` VALUES (22,1019,'2023-04-22','2023-04-22',NULL,1),(31,1010,'2023-05-15','2023-05-15',NULL,1),(32,1015,'2023-05-15','2023-05-15',NULL,1),(35,1025,'2023-05-22','2023-05-24',NULL,1),(36,1064,'2023-05-23','2023-05-23',NULL,1),(40,1133,'2023-05-27','2023-05-27',NULL,1),(42,1156,'2023-09-24','2023-09-24',NULL,1),(43,1167,'2023-11-18','2023-11-25',NULL,1),(44,1159,'2023-11-18',NULL,NULL,1);
/*!40000 ALTER TABLE `giohang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giohang_chitiet`
--

DROP TABLE IF EXISTS `giohang_chitiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `giohang_chitiet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `magiohang` int(11) DEFAULT NULL,
  `maspchitiet` int(11) DEFAULT NULL,
  `masp` int(11) DEFAULT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  `GiaTien` int(11) DEFAULT NULL,
  `Tong` int(11) DEFAULT NULL,
  `ThoiGianMua` date DEFAULT NULL,
  `magiohangtam` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_GHCT_ID_MGH_idx` (`magiohang`),
  KEY `FK_GHCT_MASP_SP_idx` (`maspchitiet`),
  KEY `FK_GHCT_MGHT_ID_idx` (`magiohangtam`),
  KEY `FK_GHCT_MASP_SP` (`masp`),
  CONSTRAINT `FK_GHCT_ID_MGH` FOREIGN KEY (`magiohang`) REFERENCES `giohang` (`MaGioHang`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_GHCT_MASP_SP` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_GHCT_MASP_SPCT` FOREIGN KEY (`maspchitiet`) REFERENCES `sanpham_chitiet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_GHCT_MGHT_ID` FOREIGN KEY (`magiohangtam`) REFERENCES `giohang_temp` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giohang_chitiet`
--

LOCK TABLES `giohang_chitiet` WRITE;
/*!40000 ALTER TABLE `giohang_chitiet` DISABLE KEYS */;
INSERT INTO `giohang_chitiet` VALUES (144,NULL,NULL,2,1,375000,375000,'2023-11-25',207),(145,NULL,NULL,18,1,185000,185000,'2023-11-25',207),(146,NULL,NULL,3,1,200000,200000,'2023-11-25',208),(147,NULL,NULL,17,1,310000,310000,'2023-11-26',209),(148,NULL,NULL,17,1,310000,310000,'2023-11-26',210),(149,NULL,87,2,1,375000,375000,'2023-11-26',211),(150,NULL,132,17,1,310000,310000,'2023-11-26',212),(152,NULL,NULL,12,1,170000,170000,'2023-11-26',213),(153,NULL,132,17,1,310000,310000,'2023-11-26',214),(154,NULL,NULL,12,1,170000,170000,'2023-11-26',214),(155,NULL,87,2,1,375000,375000,'2023-11-26',215),(156,NULL,NULL,12,1,170000,170000,'2023-11-26',215),(163,NULL,NULL,2,1,375000,375000,'2023-12-05',218),(164,NULL,133,17,1,310000,310000,'2023-12-05',219),(165,NULL,147,22,1,600000,600000,'2023-12-05',219),(166,NULL,101,7,NULL,0,0,'2023-12-05',220),(167,NULL,87,2,NULL,470000,0,'2023-12-05',221),(168,NULL,91,3,NULL,1000000,0,'2023-12-05',221),(169,NULL,95,5,NULL,400000,0,'2023-12-05',222),(170,NULL,92,4,1,100000,100000,'2023-12-05',223),(171,NULL,86,2,1,250000,250000,'2023-12-05',223),(175,NULL,88,2,1,700000,700000,'2023-12-05',226),(182,43,94,4,1,350000,350000,'2023-12-06',NULL),(183,NULL,102,7,1,380000,380000,'2023-12-06',231);
/*!40000 ALTER TABLE `giohang_chitiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giohang_temp`
--

DROP TABLE IF EXISTS `giohang_temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `giohang_temp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ThoiGianTao` date DEFAULT NULL,
  `ThoiGianCapNhat` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=233 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giohang_temp`
--

LOCK TABLES `giohang_temp` WRITE;
/*!40000 ALTER TABLE `giohang_temp` DISABLE KEYS */;
INSERT INTO `giohang_temp` VALUES (1,'2023-04-07',NULL),(2,'2023-04-07',NULL),(3,'2023-04-07',NULL),(4,'2023-04-07',NULL),(5,'2023-04-07','2023-04-07'),(6,'2023-04-07','2023-04-07'),(7,'2023-04-07','2023-04-07'),(8,'2023-04-07','2023-04-07'),(9,'2023-04-07','2023-04-07'),(10,'2023-04-09','2023-04-09'),(11,'2023-04-10','2023-04-10'),(12,'2023-04-10','2023-04-10'),(13,'2023-04-10','2023-04-10'),(14,'2023-04-10','2023-04-10'),(15,'2023-04-10','2023-04-10'),(16,'2023-04-10','2023-04-10'),(17,'2023-04-10','2023-04-10'),(18,'2023-04-10','2023-04-10'),(19,'2023-04-10','2023-04-10'),(20,'2023-04-10','2023-04-10'),(21,'2023-04-10','2023-04-10'),(22,'2023-04-10','2023-04-10'),(23,'2023-04-12','2023-04-12'),(24,'2023-04-12','2023-04-12'),(25,'2023-04-12','2023-04-12'),(26,'2023-04-12','2023-04-12'),(27,'2023-04-12','2023-04-12'),(28,'2023-04-12','2023-04-12'),(29,'2023-04-12','2023-04-12'),(30,'2023-04-12','2023-04-12'),(31,'2023-04-12','2023-04-12'),(32,'2023-04-30','2023-04-30'),(33,'2023-05-15','2023-05-15'),(34,'2023-05-15','2023-05-15'),(35,'2023-05-22','2023-05-22'),(36,'2023-05-22','2023-05-22'),(37,'2023-05-22','2023-05-22'),(38,'2023-05-22','2023-05-22'),(39,'2023-05-22','2023-05-22'),(40,'2023-05-22','2023-05-22'),(41,'2023-05-22','2023-05-22'),(42,'2023-05-22','2023-05-22'),(43,'2023-05-22','2023-05-22'),(44,'2023-05-22','2023-05-22'),(45,'2023-05-22','2023-05-22'),(46,'2023-05-22','2023-05-22'),(47,'2023-05-22','2023-05-22'),(48,'2023-05-22','2023-05-22'),(49,'2023-05-22','2023-05-22'),(50,'2023-05-22','2023-05-22'),(51,'2023-05-22','2023-05-22'),(52,'2023-05-22','2023-05-22'),(53,'2023-05-22','2023-05-22'),(54,'2023-05-22','2023-05-22'),(55,'2023-05-22','2023-05-22'),(56,'2023-05-22','2023-05-22'),(57,'2023-05-22','2023-05-22'),(58,'2023-05-22','2023-05-22'),(59,'2023-05-23','2023-05-23'),(60,'2023-05-23','2023-05-23'),(61,'2023-05-23','2023-05-23'),(62,'2023-05-23','2023-05-23'),(63,'2023-05-23','2023-05-23'),(64,'2023-05-23','2023-05-23'),(65,'2023-05-23','2023-05-23'),(66,'2023-05-23','2023-05-23'),(67,'2023-05-23','2023-05-23'),(68,'2023-05-23','2023-05-23'),(69,'2023-05-23','2023-05-23'),(70,'2023-05-23','2023-05-23'),(71,'2023-05-24','2023-05-24'),(72,'2023-05-24','2023-05-24'),(73,'2023-05-24','2023-05-24'),(74,'2023-05-24','2023-05-24'),(75,'2023-05-24','2023-05-24'),(76,'2023-05-24','2023-05-24'),(77,'2023-05-24','2023-05-24'),(78,'2023-05-24','2023-05-24'),(79,'2023-05-24','2023-05-24'),(80,'2023-05-24','2023-05-24'),(81,'2023-05-24','2023-05-24'),(82,'2023-05-24','2023-05-24'),(83,'2023-05-24','2023-05-24'),(84,'2023-05-24','2023-05-24'),(85,'2023-05-24','2023-05-24'),(86,'2023-05-24','2023-05-24'),(87,'2023-05-24','2023-05-24'),(88,'2023-05-24','2023-05-24'),(89,'2023-05-24','2023-05-24'),(90,'2023-05-24','2023-05-24'),(91,'2023-05-24','2023-05-24'),(92,'2023-05-24','2023-05-24'),(93,'2023-05-24','2023-05-24'),(94,'2023-05-24','2023-05-24'),(95,'2023-05-24','2023-05-24'),(96,'2023-05-24','2023-05-24'),(97,'2023-05-24','2023-05-24'),(98,'2023-05-24','2023-05-24'),(99,'2023-05-24','2023-05-24'),(100,'2023-05-24','2023-05-24'),(101,'2023-05-24','2023-05-24'),(102,'2023-05-24','2023-05-24'),(103,'2023-05-24','2023-05-24'),(104,'2023-05-24','2023-05-24'),(105,'2023-05-24','2023-05-24'),(106,'2023-05-24','2023-05-24'),(107,'2023-05-24','2023-05-24'),(108,'2023-05-24','2023-05-24'),(109,'2023-05-24','2023-05-24'),(110,'2023-05-24','2023-05-24'),(111,'2023-05-24','2023-05-24'),(112,'2023-05-24','2023-05-24'),(113,'2023-05-24','2023-05-24'),(114,'2023-05-24','2023-05-24'),(115,'2023-05-24','2023-05-24'),(116,'2023-05-24','2023-05-24'),(117,'2023-05-24','2023-05-24'),(118,'2023-05-24','2023-05-24'),(119,'2023-05-24','2023-05-24'),(120,'2023-05-24','2023-05-24'),(121,'2023-05-24','2023-05-24'),(122,'2023-05-24','2023-05-24'),(123,'2023-05-24',NULL),(124,'2023-05-24','2023-05-24'),(125,'2023-05-24','2023-05-24'),(126,'2023-05-24','2023-05-24'),(127,'2023-05-24','2023-05-24'),(128,'2023-05-24','2023-05-24'),(129,'2023-05-24','2023-05-24'),(130,'2023-05-26','2023-05-26'),(131,'2023-05-26','2023-05-26'),(132,'2023-05-26','2023-05-26'),(133,'2023-05-26','2023-05-26'),(134,'2023-05-26','2023-05-26'),(135,'2023-09-24',NULL),(136,'2023-09-24',NULL),(137,'2023-09-24',NULL),(138,'2023-09-24',NULL),(139,'2023-09-24','2023-09-24'),(140,'2023-09-24','2023-09-24'),(141,'2023-09-24','2023-09-24'),(142,'2023-09-24','2023-09-24'),(143,'2023-09-24','2023-09-24'),(144,'2023-09-24','2023-09-24'),(145,'2023-09-24','2023-09-24'),(146,'2023-09-24','2023-09-24'),(147,'2023-09-24','2023-09-24'),(148,'2023-09-24','2023-09-24'),(149,'2023-09-24','2023-09-24'),(150,'2023-09-24','2023-09-24'),(151,'2023-09-24','2023-09-24'),(152,'2023-09-24','2023-09-24'),(153,'2023-10-28',NULL),(154,'2023-11-14','2023-11-14'),(155,'2023-11-14','2023-11-14'),(156,'2023-11-18',NULL),(157,'2023-11-18','2023-11-18'),(158,'2023-11-18','2023-11-18'),(159,'2023-11-18','2023-11-18'),(160,'2023-11-18','2023-11-18'),(161,'2023-11-18','2023-11-18'),(162,'2023-11-18','2023-11-18'),(163,'2023-11-18','2023-11-18'),(164,'2023-11-18','2023-11-18'),(165,'2023-11-18','2023-11-18'),(166,'2023-11-18','2023-11-18'),(167,'2023-11-18','2023-11-18'),(168,'2023-11-18','2023-11-18'),(169,'2023-11-18','2023-11-18'),(170,'2023-11-18','2023-11-18'),(171,'2023-11-18','2023-11-18'),(172,'2023-11-18','2023-11-18'),(173,'2023-11-18','2023-11-18'),(174,'2023-11-18','2023-11-18'),(175,'2023-11-24',NULL),(176,'2023-11-24',NULL),(177,'2023-11-24','2023-11-24'),(178,'2023-11-24','2023-11-24'),(179,'2023-11-24','2023-11-24'),(180,'2023-11-25',NULL),(181,'2023-11-25',NULL),(182,'2023-11-25',NULL),(183,'2023-11-25',NULL),(184,'2023-11-25',NULL),(185,'2023-11-25',NULL),(186,'2023-11-25',NULL),(187,'2023-11-25',NULL),(188,'2023-11-25',NULL),(189,'2023-11-25','2023-11-25'),(190,'2023-11-25',NULL),(191,'2023-11-25',NULL),(192,'2023-11-25',NULL),(193,'2023-11-25',NULL),(194,'2023-11-25',NULL),(195,'2023-11-25',NULL),(196,'2023-11-25','2023-11-25'),(197,'2023-11-25','2023-11-25'),(198,'2023-11-25','2023-11-25'),(199,'2023-11-25','2023-11-25'),(200,'2023-11-25','2023-11-25'),(201,'2023-11-25','2023-11-25'),(202,'2023-11-25','2023-11-25'),(203,'2023-11-25','2023-11-25'),(204,'2023-11-25','2023-11-25'),(205,'2023-11-25','2023-11-25'),(206,'2023-11-25',NULL),(207,'2023-11-25','2023-11-25'),(208,'2023-11-25','2023-11-25'),(209,'2023-11-26','2023-11-26'),(210,'2023-11-26','2023-11-26'),(211,'2023-11-26','2023-11-26'),(212,'2023-11-26','2023-11-26'),(213,'2023-11-26','2023-11-26'),(214,'2023-11-26','2023-11-26'),(215,'2023-11-26','2023-11-26'),(216,'2023-11-26','2023-11-26'),(217,'2023-12-05','2023-12-05'),(218,'2023-12-05','2023-12-05'),(219,'2023-12-05','2023-12-05'),(220,'2023-12-05','2023-12-05'),(221,'2023-12-05','2023-12-05'),(222,'2023-12-05','2023-12-05'),(223,'2023-12-05','2023-12-05'),(224,'2023-12-05','2023-12-05'),(225,'2023-12-05','2023-12-05'),(226,'2023-12-05','2023-12-05'),(227,'2023-12-05','2023-12-05'),(228,'2023-12-05','2023-12-05'),(229,'2023-12-06','2023-12-06'),(230,'2023-12-06',NULL),(231,'2023-12-06','2023-12-06'),(232,'2023-12-06','2023-12-06');
/*!40000 ALTER TABLE `giohang_temp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guestcarts`
--

DROP TABLE IF EXISTS `guestcarts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `guestcarts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thoigiantao` datetime DEFAULT NULL,
  `thoigiancapnhat` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guestcarts`
--

LOCK TABLES `guestcarts` WRITE;
/*!40000 ALTER TABLE `guestcarts` DISABLE KEYS */;
/*!40000 ALTER TABLE `guestcarts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadon`
--

DROP TABLE IF EXISTS `hoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hoadon` (
  `mahoadon` int(11) NOT NULL AUTO_INCREMENT,
  `MaKH` int(11) DEFAULT NULL,
  `NgayMua` date DEFAULT NULL,
  `Tong` int(11) DEFAULT NULL,
  PRIMARY KEY (`mahoadon`),
  KEY `FK_HD_MKH_KH` (`MaKH`),
  CONSTRAINT `FK_HD_MKH_KH` FOREIGN KEY (`MaKH`) REFERENCES `khachhang` (`makh`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1022 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadon`
--

LOCK TABLES `hoadon` WRITE;
/*!40000 ALTER TABLE `hoadon` DISABLE KEYS */;
INSERT INTO `hoadon` VALUES (1000,1015,'2023-04-12',185000),(1001,1016,'2023-04-12',1545000),(1002,1010,'2023-04-10',1380000),(1003,1018,'2023-04-16',185000),(1004,1010,'2023-04-16',2175000),(1005,1010,'2023-04-16',2175000),(1006,1010,'2023-04-10',1380000),(1007,1010,'2023-04-11',1950000),(1008,1010,'2023-04-11',1800000),(1009,1018,'2023-04-17',970000),(1010,1015,'2023-04-17',510000),(1011,1015,'2023-04-17',510000),(1012,1010,'2023-04-16',2175000),(1013,1010,'2023-04-19',805000),(1014,1015,'2023-05-13',2500000),(1015,1015,'2023-05-13',310000),(1016,1010,'2023-05-14',950000),(1017,1017,'2023-05-16',185000),(1018,1017,'2023-05-16',185000),(1019,1017,'2023-05-16',620000),(1020,1017,'2023-05-16',620000),(1021,1133,'2023-05-26',280000);
/*!40000 ALTER TABLE `hoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadon_chitiet`
--

DROP TABLE IF EXISTS `hoadon_chitiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hoadon_chitiet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MaHoaDon` int(11) DEFAULT NULL,
  `MaSP` int(11) DEFAULT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  `GiaTien` int(11) DEFAULT NULL,
  `Tong` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_HDCT_MSP_SP_idx` (`MaSP`),
  KEY `FK_HDCT_MHD_HD_idx` (`MaHoaDon`),
  CONSTRAINT `FK_HDCT_MASP_SP` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`masp`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_HDCT_MHD_HD` FOREIGN KEY (`MaHoaDon`) REFERENCES `hoadon` (`mahoadon`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadon_chitiet`
--

LOCK TABLES `hoadon_chitiet` WRITE;
/*!40000 ALTER TABLE `hoadon_chitiet` DISABLE KEYS */;
INSERT INTO `hoadon_chitiet` VALUES (1,1000,18,1,185000,185000),(2,1001,18,1,185000,185000),(3,1001,22,2,600000,1200000),(4,1001,6,2,80000,160000),(5,1002,21,2,170000,340000),(6,1002,3,1,200000,200000),(7,1002,18,1,185000,185000),(8,1002,16,1,220000,220000),(9,1002,18,1,185000,185000),(10,1002,19,1,250000,250000),(11,1003,18,1,185000,185000),(12,1004,22,3,600000,1800000),(13,1004,2,1,375000,375000),(14,1005,22,3,600000,1800000),(15,1005,2,1,375000,375000),(16,1006,21,2,170000,340000),(17,1006,3,1,200000,200000),(18,1006,18,1,185000,185000),(19,1006,16,1,220000,220000),(20,1006,18,1,185000,185000),(21,1006,19,1,250000,250000),(22,1007,22,2,600000,1200000),(23,1007,13,1,750000,750000),(24,1008,22,3,600000,1800000),(25,1009,18,2,185000,370000),(26,1009,22,1,600000,600000),(27,1010,21,3,170000,510000),(28,1011,21,3,170000,510000),(29,1012,22,3,600000,1800000),(30,1012,2,1,375000,375000),(31,1013,17,2,310000,620000),(32,1013,18,1,185000,185000),(33,1014,11,2,650000,1300000),(34,1014,10,2,600000,1200000),(35,1015,17,1,310000,310000),(36,1016,1,1,950000,950000),(37,1017,18,1,185000,185000),(38,1018,18,1,185000,185000),(39,1019,3,1,200000,200000),(40,1019,15,1,420000,420000),(41,1020,3,1,200000,200000),(42,1020,15,1,420000,420000),(43,1021,6,1,80000,80000),(44,1021,3,1,200000,200000);
/*!40000 ALTER TABLE `hoadon_chitiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `huongvi`
--

DROP TABLE IF EXISTS `huongvi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `huongvi` (
  `mahuongvi` int(11) NOT NULL AUTO_INCREMENT,
  `TenHuongVi` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `MoTa` varchar(100) DEFAULT NULL,
  `TinhTrang` int(11) DEFAULT NULL,
  PRIMARY KEY (`mahuongvi`),
  UNIQUE KEY `TenHuongVi_UNIQUE` (`TenHuongVi`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `huongvi`
--

LOCK TABLES `huongvi` WRITE;
/*!40000 ALTER TABLE `huongvi` DISABLE KEYS */;
INSERT INTO `huongvi` VALUES (1,'Nhẹ','Hương vị nhẹ nhàng',1),(2,'Trung bình','Hương vị trung bình',1),(3,'Mạnh','Hương vị mạnh',1),(4,'Đậm đà','Đậm đà',1),(5,'Đắng','Hương vị đắng',1);
/*!40000 ALTER TABLE `huongvi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `khachhang` (
  `makh` int(11) NOT NULL AUTO_INCREMENT,
  `HoTen` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NgaySinh` date DEFAULT NULL,
  `GioiTinh` varchar(50) DEFAULT NULL,
  `DiaChi` varchar(200) DEFAULT NULL,
  `ThanhPho` varchar(100) DEFAULT NULL,
  `Zip` int(11) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `SDT` varchar(50) DEFAULT NULL,
  `TinhTrang` int(11) DEFAULT NULL,
  `MaTK` int(11) DEFAULT NULL,
  PRIMARY KEY (`makh`),
  KEY `FK_KH_MATK_TK_idx` (`MaTK`),
  CONSTRAINT `FK_KH_MATK_TK` FOREIGN KEY (`MaTK`) REFERENCES `taikhoan` (`matk`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (1010,'zafu','2000-06-14','Nam','Trần Xuân Soạn','HCM',70000,'','01472583690',NULL,12),(1011,'ogp',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,13),(1012,'zafuvip',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,14),(1013,'real',NULL,NULL,NULL,NULL,NULL,'okh1k59@gmail.com',NULL,NULL,15),(1014,'letgo',NULL,NULL,NULL,NULL,NULL,'letgo@gmail.com',NULL,NULL,16),(1015,'Nguyễn Công Phượng','1996-08-12','Nam','TPHCM','HCM',70000,'cf96@gmail.com','077211321201',NULL,17),(1016,'Thanh Sang',NULL,NULL,NULL,NULL,NULL,'sangpro123@gmail.com',NULL,NULL,18),(1017,'On Gia Phu','1998-08-12','Nam','123 Quang Trung','HCM',70000,'zafu1@gmail.com','0123456987',NULL,19),(1018,'Jason','1998-08-17','Nam','123 Quang Trung','HCM',70000,'dk8@gmail.com','0123456988',NULL,20),(1019,'Jonathan',NULL,NULL,NULL,NULL,NULL,'jnt12@gmail.com',NULL,NULL,21),(1020,'Testing1',NULL,NULL,NULL,NULL,NULL,'tk1@gmail.com',NULL,NULL,22),(1024,'Xuan Quang',NULL,NULL,NULL,NULL,NULL,'xq@gmail.com',NULL,NULL,33),(1025,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,37),(1026,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,38),(1027,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1028,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,39),(1029,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1030,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,40),(1031,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1032,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,41),(1033,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,42),(1034,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,43),(1036,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,45),(1037,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,46),(1038,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,47),(1039,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,48),(1040,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,49),(1041,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,50),(1042,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,51),(1043,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,52),(1044,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,53),(1045,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,54),(1046,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,55),(1047,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,56),(1048,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,57),(1049,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,58),(1050,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,59),(1051,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,60),(1052,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,61),(1053,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,62),(1054,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,63),(1055,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,64),(1056,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,65),(1057,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,66),(1058,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,67),(1059,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,68),(1060,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,69),(1061,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,70),(1062,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,71),(1063,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,72),(1064,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,73),(1065,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,74),(1066,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,75),(1068,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,77),(1069,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,78),(1070,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,79),(1071,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,80),(1072,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,81),(1073,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,82),(1074,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,83),(1075,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,84),(1076,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,85),(1077,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,86),(1078,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,87),(1079,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,88),(1080,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,89),(1081,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,90),(1082,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,91),(1083,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,92),(1084,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,93),(1085,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,94),(1086,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,95),(1087,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,96),(1088,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,97),(1089,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,98),(1090,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,99),(1091,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,100),(1092,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,101),(1093,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,102),(1094,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1095,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1096,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1097,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1098,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,103),(1099,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1100,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1101,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1102,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1103,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1104,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1105,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1106,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1107,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1108,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1109,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1110,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1111,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1112,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1113,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1114,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1115,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1116,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1117,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1118,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1119,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1120,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,104),(1121,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,105),(1122,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,106),(1123,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,107),(1124,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,108),(1125,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,109),(1126,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,110),(1127,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,111),(1128,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,112),(1129,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,113),(1130,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,114),(1131,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,115),(1132,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,116),(1133,'Võ Văn Đức',NULL,NULL,NULL,NULL,NULL,'duc@gak',NULL,NULL,117),(1134,'hacker 1',NULL,NULL,NULL,NULL,NULL,'duc@kadnak',NULL,NULL,118),(1135,'hacker2',NULL,NULL,NULL,NULL,NULL,'hacker2@meme',NULL,NULL,119),(1136,'kk',NULL,NULL,NULL,NULL,NULL,'kk@kk',NULL,NULL,120),(1137,'hacker3',NULL,NULL,NULL,NULL,NULL,'hacker3@memae',NULL,NULL,121),(1138,'hacker4',NULL,NULL,NULL,NULL,NULL,'hacker4@memae',NULL,NULL,122),(1139,'hacker5',NULL,NULL,NULL,NULL,NULL,'hacker5@memae',NULL,NULL,123),(1140,'duc51',NULL,NULL,NULL,NULL,NULL,'duc@kaka',NULL,NULL,124),(1141,'hacker6',NULL,NULL,NULL,NULL,NULL,'hacker6@memae',NULL,NULL,125),(1142,'hacker7',NULL,NULL,NULL,NULL,NULL,'hacker7@memae',NULL,NULL,126),(1143,'Võ Văn Đức',NULL,NULL,NULL,NULL,NULL,'duc@kka',NULL,NULL,127),(1144,'vo van duc',NULL,NULL,NULL,NULL,NULL,'duc@akjd',NULL,NULL,128),(1145,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1146,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1147,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1148,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,129),(1149,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1150,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1151,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,NULL),(1152,'ZAP',NULL,NULL,NULL,NULL,NULL,'zaproxy@example.com',NULL,NULL,130),(1153,'duc54',NULL,NULL,NULL,NULL,NULL,'duc@ahdsk',NULL,NULL,131),(1154,'helan john',NULL,NULL,NULL,NULL,NULL,'john001@gmail.com',NULL,NULL,132),(1155,'helan la',NULL,NULL,NULL,NULL,NULL,'john003@gmail.com',NULL,NULL,133),(1156,'duc88','2002-11-02','Male','Lam Dong','HCM',1,'duc@kjan','086',NULL,134),(1157,'duc1717',NULL,NULL,NULL,NULL,NULL,'duc@1283',NULL,NULL,135),(1158,'duc99',NULL,NULL,NULL,NULL,NULL,'duc@asdfdsa',NULL,NULL,136),(1159,'Võ Văn Đức',NULL,NULL,NULL,NULL,NULL,'duc@asdf',NULL,NULL,137),(1160,'Võ Văn Đức',NULL,NULL,NULL,NULL,NULL,'duc77@gmail.com',NULL,NULL,138),(1161,'Võ Văn Đức',NULL,NULL,NULL,NULL,NULL,'duc1010@gmail.com',NULL,NULL,139),(1162,'Vo Van Duc',NULL,NULL,NULL,NULL,NULL,'duc101@gmail.com',NULL,NULL,140),(1163,'Vo Van Duc','2002-11-02','Male','Lam Dong, Dong Nai','HCM',1,'duc102@gmail.com','086',NULL,141),(1164,'Võ Văn Đức',NULL,NULL,NULL,NULL,NULL,'duc103@gmail.com',NULL,NULL,142),(1165,'Vo Van Duc',NULL,NULL,NULL,NULL,NULL,'duc105@gmail.com',NULL,NULL,143),(1166,'duc0100',NULL,NULL,NULL,NULL,NULL,'voduc0100@gmail.com',NULL,NULL,144),(1167,'Võ Văn Đức','2002-11-02','Male','Ha Noi','Ha Noi',530,'voduc0100@gmail.com','0869990187',1,145);
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lienhe`
--

DROP TABLE IF EXISTS `lienhe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `lienhe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ten` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `chude` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `tinnhan` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lienhe`
--

LOCK TABLES `lienhe` WRITE;
/*!40000 ALTER TABLE `lienhe` DISABLE KEYS */;
INSERT INTO `lienhe` VALUES (11,'Võ Văn Đức','20110635@student.hcmute.edu.vn','Login Error','I can\'t log in your web'),(12,'a','a@a','a',NULL),(13,'Name','Email','Subject',NULL),(14,'Name','Email','Subject','Message');
/*!40000 ALTER TABLE `lienhe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `luong`
--

DROP TABLE IF EXISTS `luong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `luong` (
  `maluong` int(11) NOT NULL AUTO_INCREMENT,
  `VaiTro` varchar(50) DEFAULT NULL,
  `HinhThuc` varchar(50) DEFAULT NULL,
  `LuongTheoGio` int(11) DEFAULT NULL,
  PRIMARY KEY (`maluong`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `luong`
--

LOCK TABLES `luong` WRITE;
/*!40000 ALTER TABLE `luong` DISABLE KEYS */;
INSERT INTO `luong` VALUES (1,'Nhan Vien','Part-time',50000),(2,'Admin','Full-time',80000);
/*!40000 ALTER TABLE `luong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `nhanvien` (
  `manv` int(11) NOT NULL AUTO_INCREMENT,
  `HoTen` varchar(50) DEFAULT NULL,
  `NgaySinh` date DEFAULT NULL,
  `GioiTinh` varchar(50) NOT NULL,
  `SDT` varchar(50) DEFAULT NULL,
  `MaLuong` int(11) DEFAULT NULL,
  `MaTK` int(11) DEFAULT NULL,
  `TinhTrang` int(11) DEFAULT NULL,
  PRIMARY KEY (`manv`),
  UNIQUE KEY `UQ__NhanVien__CA1930A552DDABDA` (`SDT`),
  KEY `FK_NHANVIEN_MATK_TK_idx` (`MaTK`),
  KEY `FK_NHANVIEN_ML_LUONG_idx` (`MaLuong`),
  CONSTRAINT `FK_NHANVIEN_MATK_TK` FOREIGN KEY (`MaTK`) REFERENCES `taikhoan` (`matk`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_NHANVIEN_ML_LUONG` FOREIGN KEY (`MaLuong`) REFERENCES `luong` (`maluong`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhanvien`
--

LOCK TABLES `nhanvien` WRITE;
/*!40000 ALTER TABLE `nhanvien` DISABLE KEYS */;
INSERT INTO `nhanvien` VALUES (1,'Huynh Banh','1996-10-10','Nam','0123456789',1,31,0),(2,'Nguyen An','1998-06-12','Nu','0987654321',1,23,1),(3,'Tran Bich Thuy','2000-01-11','Nu','0111111111',2,28,1),(4,'Tran Canh','1997-07-26','Nam','0147258369',2,29,1),(11,'Nguyễn Công Phượng','1998-08-17','Nam','07721132120',NULL,32,1);
/*!40000 ALTER TABLE `nhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phanhoi`
--

DROP TABLE IF EXISTS `phanhoi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `phanhoi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `masp` int(11) NOT NULL,
  `makh` int(11) NOT NULL,
  `noidung` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ngayph` date DEFAULT NULL,
  `sosao` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PHANHOI_MASP_SP_idx` (`masp`),
  KEY `FK_PHANHOI_MAKH_KH_idx` (`makh`),
  CONSTRAINT `FK_PHANHOI_MAKH_KH` FOREIGN KEY (`makh`) REFERENCES `khachhang` (`makh`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_PHANHOI_MASP_SP` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phanhoi`
--

LOCK TABLES `phanhoi` WRITE;
/*!40000 ALTER TABLE `phanhoi` DISABLE KEYS */;
INSERT INTO `phanhoi` VALUES (26,6,1167,'it is good','2023-11-25',4),(27,6,1167,'hehhe','2023-11-25',5);
/*!40000 ALTER TABLE `phanhoi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phuongthuc_thanhtoan`
--

DROP TABLE IF EXISTS `phuongthuc_thanhtoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `phuongthuc_thanhtoan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Ten` varchar(100) DEFAULT NULL,
  `MoTa` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phuongthuc_thanhtoan`
--

LOCK TABLES `phuongthuc_thanhtoan` WRITE;
/*!40000 ALTER TABLE `phuongthuc_thanhtoan` DISABLE KEYS */;
INSERT INTO `phuongthuc_thanhtoan` VALUES (1,'Thanh toán COD','Chỉ nhận tiền khi lấy được hàng'),(2,'Thanh toán qua thẻ ngân hàng','Giao dịch qua thẻ credit hoặc debit của ngân hàng');
/*!40000 ALTER TABLE `phuongthuc_thanhtoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sanpham` (
  `masp` int(11) NOT NULL AUTO_INCREMENT,
  `TenSanPham` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  `DaBan` int(11) DEFAULT NULL,
  `GiaTien` int(11) DEFAULT NULL,
  `MaHuongVi` int(11) DEFAULT NULL,
  `MoTa` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Anh` varchar(500) DEFAULT NULL,
  `NgayTao` date DEFAULT NULL,
  `TinhTrang` int(11) DEFAULT NULL,
  `GiamGia` int(11) DEFAULT NULL,
  `MaDanhMuc` int(11) DEFAULT NULL,
  PRIMARY KEY (`masp`),
  KEY `FK_SANPHAM_DM_DM_idx` (`MaDanhMuc`),
  KEY `FK_SANPHAM_HV_HV_idx` (`MaHuongVi`),
  CONSTRAINT `FK_SANPHAM_DM_DM` FOREIGN KEY (`MaDanhMuc`) REFERENCES `danhmuc` (`madanhmuc`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_SANPHAM_HV_THV` FOREIGN KEY (`MaHuongVi`) REFERENCES `huongvi` (`mahuongvi`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Cà phê hạt Lavazza Gran Espresso',0,0,0,4,'Với sự kế hợp đặt biệt của hạt Arabica, và hạt Robusta tạo nên loại cà phê đậm đà phù hợp với những khách hàng yêu thích Espreso','Lavazza-Gran-Espresso.png','2023-04-24',1,0,5),(2,'Cà phê Blagu hạt đã rang',0,0,0,3,'Hương hoa\r\nSi-rô cùng với hương vị của quả boysenberry và blueberry và một số hương vị khác tạo nên cảm giác mới mẻ cho người uống.','c9233a70-bc7a-4d01-b4b5-77b31f729d00-Blagu_roasted.jpg','2023-05-04',1,0,4),(3,'Cà phê nén Nespresso Ristretto',0,0,0,2,'Trọng tâm duy nhất của Nespresso là cung cấp cà phê chất lượng cao nhất và trải nghiệm cà phê sau mỗi tách','b2c19ca9-f878-4032-abb6-0b21bf4149a0-risetretto.jpeg','2023-05-08',1,0,2),(4,'Cà phê nhân xanh Brazil Fazenda',0,0,0,1,'Cà phê Brazil từ vùng Fazenda da Lagoa samba mang đến độ chua tròn đầy, vị ngọt dễ chịu, độ phức tạp tốt, hạt Hazelnut, đường nâu, caramel, táo đỏ, mơ, trà hoa hồng, mật đường.','e75cd495-0dda-459c-8f2d-9a073686c198-brazil_fazenda.jpg','2023-05-08',1,0,3),(5,'Cà phê bột Lavazza Ground',0,0,0,2,'Một loại cà phê đầy đủ hương vị nổi bật với những nốt hương caramel khói','f6edeb90-cadf-45ea-932d-28fd3348350e-Lavazza_Groundjpg.jpg','2023-05-08',1,0,1),(6,'Cà phê Blagu hạt đã rang Tazania Kilimanjaro',0,0,0,3,'Hương hoa cùng độ chua nhẹ, tròn vị, hậu vị ngọt và thơm hương hoa quả nhiệt đới cùng trà đen  ','05fd2660-b4f7-47f5-9399-022ad68afcd2-Tazania_Kilimanjaro.jpg','2023-05-08',1,0,4),(7,'Cà phê hạt Carraro Globo Arabic',0,0,0,5,'100% arabica- sự phối hợp giữa 4 loại arabica chất lượng tạo nên vị ngọt kéo dài, tinh tế bổi bật hương hoa','362f5c5a-2108-4680-bc3e-87d7a19f6417-Globo_Arabica.jpg','2023-05-08',1,0,5),(8,'Cà phê nén Illy Iperespresso Itenso Bold Roasted',0,0,0,2,'Cà phê rang được rang đậm, thể hiện đầy đủ hương vị. Một kết thúc mạnh mẽ với các nốt hương sống động của ca cao và trái cây khô.  ','56b9a99d-cbea-4b9e-a106-4aaf70ca736d-intenso.jpg','2023-05-08',1,0,2),(9,'Cà phê nhân xanh Sidamo Guji Bensa',0,0,0,1,'Hương vị: Hoa cơm cháy (Elderflower), ổi hồng, vỏ nho, rượu vang trắng, quả mọng, mượt','3506022b-522c-4d58-a59b-e6f7ed67e055-Guji_Bensa.jpg','2023-05-08',1,0,3),(10,'Cà phê hạt Carraro Globo Rosso',0,0,0,4,'Sự pha trộn Globo Rosso bao gồm ba loại Arabica và ba loại Robusta được chọn lọc theo từng đợt','e30989fb-7b55-4052-aba9-cd4bd61fb9f6-Globo_Rosso.png','2023-05-08',1,0,5),(11,'Cà phê hạt Carraro Globo Oro',0,0,0,4,'100% arabica- sự phối hợp giữa 4 loại arabica chất lượng tạo nên vị ngọt kéo dài, tinh tế bổi bật hương hoa','0e5c7d80-8ec3-49c5-9f09-a7bedb6b913a-Globo_Oro.png','2023-05-08',1,0,5),(12,'Cà phê nén Blagu Kiểu Ý',0,0,0,2,'Hương vị cà phê rang xay tự nhiên','85f716e1-1c6c-4738-955a-d8bb84c8219a-italian.jpg','2023-05-08',1,0,2),(13,'Cà phê Blagu hạt đã rang, Gesha Panama vùng Finca Lerida',0,0,0,3,'Hương vị trái cây và hương hoa đặc trưng, hậu vị với độ chua, ngọt thanh tao và thể chất cân bằng hoàn hảo.','e934d40f-0832-4fc0-be49-b7fbd04a7130-gesha.jpg','2023-05-08',1,0,4),(14,'Cà phê nhân xanh Golden Arabica Bourbon',0,0,0,2,'BLAGU nguyên hạt chưa rang Golden Arabica Bourbon 100% (1 kg)','48df4c0a-8019-46b4-a124-7349af0e6796-Golden_Arabica.png','2023-05-08',1,0,3),(15,'Cà phê nhân xanh Green Bean Costa Rica Hacienda Sonora Centroamericano',0,0,0,3,'Cà phê Costa Rica rang sáng có hương vị sống động, với độ chua nhẹ từ trước tạo ra một kết thúc ngọt ngào.','f0504b1c-41c6-4316-8a53-521b87ccc814-costa_rica.jpg','2023-05-08',1,0,3),(16,'Cà phê bột Lavazza Crema E Gusto Arabica/Robusta Blend',0,0,0,5,'Đầy đủ hương vị, và hương thơm, dư vị phong phú với ghi chú sô cô la.','f090e9f4-d8cc-4b10-962b-a56eb9d8be88-Creme_E_Gusto.jpg','2023-05-08',1,0,1),(17,'Cà phê bột Lavazza Club 100% Arabica',0,0,0,5,'Một loại cà phê đặc biệt với hương vị mãnh liệt và hương thơm tinh tế.','5b062eb6-7070-4505-a28b-edd1272f50b3-Lavazza_Club.jpg','2023-05-08',1,0,1),(18,'Cà phê viên nén Nespresso Ispirazione Venezia Switzerland',0,0,0,5,'Hương thơm cà phê tinh tế, sự cân bằng, hài hòa giữa vị Caramel và cà phê sóng sánh.','36f94100-1fcf-4f3f-98cc-6ce6b363cb15-switzerland.jpg','2023-05-08',1,0,2),(19,'Cà phê Viên Nén Starbucks by Nespresso',0,0,0,5,'Hương thơm ngào ngạt, cơ thể và hương vị đều cân bằng — với vị của các loại hạt và ca cao do quá trình rang mang lại.','42d0105e-c9a4-448a-9ac0-5fc40d7a7c66-starbuck.jpg','2023-05-08',1,10,2),(20,'Cà phê hạt đã rang Illy Arabica Guatemala',0,0,0,4,'Vị đậm đà. Cà phê được trồng ở vùng núi hoang sơ của Guatemala có hương thơm phức hợp với hương sô cô la, caramel và mật ong nổi bật','b5679135-cab9-465d-9080-8d9e282ff78c-Guatemala.jpg','2023-05-08',1,0,4),(21,'Cà phê Blagu hạt đã rang Guru 3 blend Cold brew',0,0,0,2,'Những nốt cho chocolate đậm đà, hòa quyện với sự ngọt ngào của kẹo cam cùng vị trà đen, hậu ngọt kéo dài kèm theo vị chua thanh từ các hạt arabica.','126e9abf-9899-416a-a702-49e1f896a2a7-Cold_Brew.png','2023-05-08',1,0,4),(22,'Cà phê bột Lavazza Qualita Rossa',0,0,0,3,'Hỗn hợp Globo Oro bao gồm 5 loại hạt Arabica và ba loại Robusta chất lượng được chọn theo từng đợt. Nhẹ nhàng, hương thơm dai dẳng','19300d88-f9f3-4cd2-9464-597b97672b7a-lavazza_rossa.jpg','2023-05-08',1,0,1),(23,'Cà phê hạt Lavazza Espresso Top Class',0,0,0,1,'Sự pha trộn của nó là thành phần của những hạt cà phê Arabica tốt nhất từ ​​Nam và Trung Mỹ và những hạt cà phê Robusta hảo hạng của Indonesia.','8325be6b-d8b6-4701-9d87-0fdd6f9b48ee-lavazza_topClass.jpg','2023-05-08',1,0,5),(24,'Cà phê nhân xanh Ethiopia Nensebo Refisa',0,0,0,2,'Khi uống bạn có thể cảm nhận được vị ngọt như Si-rô, hương thơm nồng nàn của trái cây, một chút của nốt hương ngọt của đường nâu và mứt anh đào','753e33af-feb3-4a2b-9a6b-084c643e95e8-refisa.jpg','2023-05-08',1,0,3);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham_chitiet`
--

DROP TABLE IF EXISTS `sanpham_chitiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sanpham_chitiet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `masp` int(11) DEFAULT NULL,
  `cannang` int(11) DEFAULT NULL,
  `tonkho` int(11) DEFAULT NULL,
  `gia` int(11) DEFAULT NULL,
  `trangthai` int(11) DEFAULT NULL,
  `giamgia` int(11) DEFAULT NULL,
  `daban` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_PD_Product_idx` (`masp`),
  CONSTRAINT `FK_PD_Product` FOREIGN KEY (`masp`) REFERENCES `sanpham` (`masp`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham_chitiet`
--

LOCK TABLES `sanpham_chitiet` WRITE;
/*!40000 ALTER TABLE `sanpham_chitiet` DISABLE KEYS */;
INSERT INTO `sanpham_chitiet` VALUES (83,1,250,30,350000,1,10,0),(84,1,500,20,670000,1,0,0),(85,1,1000,20,1000000,1,15,0),(86,2,250,30,250000,1,10,0),(87,2,500,20,470000,1,5,0),(88,2,1000,20,700000,1,24,0),(89,3,250,10,350000,1,0,0),(90,3,500,20,670000,1,0,0),(91,3,1000,32,1000000,1,0,0),(92,4,250,30,100000,1,0,0),(93,4,500,25,180000,1,0,0),(94,4,1000,20,350000,1,0,0),(95,5,250,10,400000,1,0,0),(96,5,500,10,780000,1,0,0),(97,5,1000,10,1150000,1,0,0),(98,6,250,15,350000,1,0,0),(99,6,500,12,670000,1,0,0),(100,6,1000,20,1000000,1,0,0),(101,7,250,10,200000,1,0,0),(102,7,500,20,380000,1,0,0),(103,7,1000,30,780000,1,0,0),(104,8,250,30,350000,1,0,0),(105,8,500,20,670000,1,0,0),(106,8,1000,20,1000000,1,0,0),(107,9,250,15,150000,1,0,0),(108,9,500,30,280000,1,0,0),(109,9,1000,20,400000,1,0,0),(110,10,250,30,350000,1,0,0),(111,10,500,20,670000,1,0,0),(112,10,1000,20,1000000,1,0,0),(113,11,250,30,230000,1,0,0),(114,11,500,20,440000,1,0,0),(115,11,1000,20,870000,1,0,0),(116,12,250,15,350000,1,0,0),(117,12,500,8,670000,1,0,0),(118,12,1000,17,1000000,1,0,0),(119,13,250,23,70000,1,0,0),(120,13,500,15,120000,1,0,0),(121,13,1000,19,250000,1,0,0),(122,14,250,30,350000,1,0,0),(123,14,500,20,670000,1,0,0),(124,14,1000,20,1000000,1,0,0),(125,15,250,12,120000,1,0,0),(126,15,500,15,220000,1,0,0),(127,15,1000,9,450000,1,0,0),(128,16,250,16,350000,1,0,0),(129,16,500,17,670000,1,0,0),(130,16,1000,8,1000000,1,0,0),(131,17,250,30,150000,1,0,0),(132,17,500,20,280000,1,0,0),(133,17,1000,20,550000,1,0,0),(134,18,250,12,350000,1,0,0),(135,18,500,16,670000,1,0,0),(136,18,1000,17,1000000,1,0,0),(137,19,250,30,160000,1,0,0),(138,19,500,20,300000,1,0,0),(139,19,1000,20,590000,1,0,0),(140,20,250,7,350000,1,0,0),(141,20,500,8,670000,1,0,0),(142,20,1000,9,1000000,1,0,0),(143,21,250,15,170000,1,0,0),(144,21,500,12,320000,1,0,0),(145,21,1000,9,630000,1,0,0),(146,22,250,20,350000,1,0,0),(147,22,500,29,670000,1,0,0),(148,22,1000,14,1000000,1,0,0),(149,23,250,30,370000,1,0,0),(150,23,500,20,720000,1,0,0),(151,23,1000,20,1430000,1,0,0),(152,24,250,5,460000,1,0,0),(153,24,500,8,940000,1,0,0),(154,24,1000,2,1800000,1,0,0);
/*!40000 ALTER TABLE `sanpham_chitiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipper`
--

DROP TABLE IF EXISTS `shipper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `shipper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matk` int(11) DEFAULT NULL,
  `madathang` int(11) DEFAULT NULL,
  `ngayvanchuyen` date DEFAULT NULL,
  `ngaygiaohang` date DEFAULT NULL,
  `tinhtrang` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_TK_MATK_MATK_idx` (`matk`),
  KEY `FK_DH_MADH_MADH_idx` (`madathang`),
  CONSTRAINT `FK_DH_MADH_MADH` FOREIGN KEY (`madathang`) REFERENCES `dathang` (`madathang`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_TK_MATK_MATK` FOREIGN KEY (`matk`) REFERENCES `taikhoan` (`matk`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipper`
--

LOCK TABLES `shipper` WRITE;
/*!40000 ALTER TABLE `shipper` DISABLE KEYS */;
INSERT INTO `shipper` VALUES (1,34,31,'2023-05-16',NULL,1),(2,34,32,'2023-05-16',NULL,1),(3,34,23,'2023-05-16',NULL,1);
/*!40000 ALTER TABLE `shipper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysdiagrams`
--

DROP TABLE IF EXISTS `sysdiagrams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sysdiagrams` (
  `name` varchar(160) NOT NULL,
  `principal_id` int(11) NOT NULL,
  `diagram_id` int(11) NOT NULL,
  `version` int(11) DEFAULT NULL,
  `definition` longblob,
  PRIMARY KEY (`diagram_id`),
  UNIQUE KEY `UK_principal_name` (`principal_id`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysdiagrams`
--

LOCK TABLES `sysdiagrams` WRITE;
/*!40000 ALTER TABLE `sysdiagrams` DISABLE KEYS */;
/*!40000 ALTER TABLE `sysdiagrams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan`
--

DROP TABLE IF EXISTS `taikhoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `taikhoan` (
  `matk` int(11) NOT NULL AUTO_INCREMENT,
  `TaiKhoan` varchar(50) DEFAULT NULL,
  `MatKhau` varchar(500) DEFAULT NULL,
  `NgayTao` date DEFAULT NULL,
  `MaVaiTro` int(11) DEFAULT NULL,
  `TinhTrang` int(11) DEFAULT NULL,
  `password_reset_token` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`matk`),
  UNIQUE KEY `UQ__TaiKhoan__D5B8C7F039955D82` (`TaiKhoan`),
  UNIQUE KEY `UQ__TaiKhoan__D5B8C7F08B36CD08` (`TaiKhoan`),
  UNIQUE KEY `UQ__TaiKhoan__D5B8C7F0C701C38D` (`TaiKhoan`),
  UNIQUE KEY `UQ__TaiKhoan__D5B8C7F0AC18A387` (`TaiKhoan`),
  UNIQUE KEY `password_reset_token` (`password_reset_token`),
  KEY `FK_TAIKHOAN_TK_VT_idx` (`MaVaiTro`),
  CONSTRAINT `FK_TAIKHOAN_TK_VT` FOREIGN KEY (`MaVaiTro`) REFERENCES `vaitro` (`mavaitro`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan`
--

LOCK TABLES `taikhoan` WRITE;
/*!40000 ALTER TABLE `taikhoan` DISABLE KEYS */;
INSERT INTO `taikhoan` VALUES (12,'zafu','$2a$10$yggrV/i6HxymQQVILSLec.2qxBaGXUjXfbQkKbmump3OhVSIA/YGS','2023-04-03',3,1,NULL),(13,'taolaongiaphu','$2a$10$9D6EnTNpo7qx5sAM4s5.1O/26FC7E/cBdkyQa0QbzA0q2G44jeWoK','2023-04-03',3,1,NULL),(14,'giaphuvip','$2a$10$/CSQMc3viQHnudGGxMGIuOf0yID4ZDJ96dXyHUymv5V6bQeb4FwJ6','2023-04-03',3,1,NULL),(15,'real','$2a$10$H6AUfmzm6CjpJ.W5xRmynO3MSCl04YCO7IIOgM1BVe4sXmo2hr4iG','2023-04-04',3,1,NULL),(16,'letgo','$2a$10$MenJs/fgq1ibKU2JtPuQgOFcnnSW4ZD542leZ4/qV/GSGvwbq/MKa','2023-04-09',3,1,NULL),(17,'CongFung','$2a$10$zwsmraH066/HqTXoUsO4iuJdpAmBnMWZ4yGCUfXW7vpPR0N/MO3Hm','2023-04-12',3,1,NULL),(18,'sangpro123','$2a$10$53j8.1b5P91iEcifTX5tfuoGdriDXmoRLpTmVwtbCS0I7olSGwavG','2023-04-12',3,1,NULL),(19,'zafu1','$2a$10$PjdcWqhK8fYuHWU0rY9zLO3dXE3eZ6mTEnRi4OXvoF6vtuUhJPaRm','2023-04-15',3,1,NULL),(20,'daka8','$2a$10$k9.ptaLhRi7fmIDoLynoA.ZDzTVsIMauxUtDMfv65kBav8j5lmRf2','2023-04-16',3,1,NULL),(21,'jnt12','$2a$10$MR8gtIXkRIyvr59n8B8M1OIUkG0fd/tc418Qxd/krZT4mGZchY522','2023-04-22',3,1,NULL),(22,'tk1','$2a$10$Wm9gBBpP3PG9Sxa6.a5st.JSta..P/fIUKXKtWaY5dbProjCmaaru','2023-04-22',3,1,NULL),(23,'test1','$2a$10$OhxT/xU1g5YpffZjeHmRW.OutiA3hSzy5qnk/OTX1BU5FTLU/vLHm','2023-04-24',2,1,NULL),(28,'temp1','$2a$10$O6KRhhBfgjHZi3KYjwsaA.8gPuTACD8A1kiY7/EyW2v2XXpx60NYq','2023-04-24',2,1,NULL),(29,'temp2','123','2023-04-23',2,1,NULL),(30,'me','123','2023-04-23',2,1,NULL),(31,'admin','$2a$10$cWjk2hCTjzzeYmLh52Fa8eQaZHioWfRHsloxccXaDCqYvoIkqOLqW','2023-04-28',1,1,NULL),(32,'test2','$2a$10$aUFTSJNWHBqydAyrTpWXqOVBqGyEtcWJYWBF8BuOU4xHSmrkOrnq6','2023-05-16',2,1,NULL),(33,'xq32','$2a$10$zVskbLDjgb657R3VxGIEreB0CLC6n6XPK6KERLhfYLIZ3.LtlJtsW','2023-05-16',3,1,NULL),(34,'shipper1','$2a$10$uRiIWaA8Q1IgjHPW4v2IcuXjHs0w4AbkbhKK.65TZgt6EyY2rci3K','2023-05-16',4,1,NULL),(36,'shipper2','$2a$10$tbxcI0XlWdG51PDTPJjuQ.5ttnXM.28GryuwdnDTpBvhzwvp7u.R.','2023-05-16',4,1,NULL),(37,'ZAP','$2a$10$XZpnEDSOljsRMki9VfbVp.8NDG4ZUbV0tzHEcczd/xVEM5ikWwDpq','2023-05-22',3,1,NULL),(38,'c:/Windows/system.ini','$2a$10$XpKOKmZCyc5dmu/ygmMMOuI1BnFUm0JEjQ3VSs7RaZkGYf2J3s.16','2023-05-22',3,1,NULL),(39,'c:\\Windows\\system.ini','$2a$10$XF1mz2rP5aeMs2OLSouGnelgFCmArk/9l2V9mOuHd89mf/pNqUM4m','2023-05-22',3,1,NULL),(40,'/etc/passwd','$2a$10$QSJ3ALEpzIzPOxvUQZADm.1XVwryvIOILBmIIwNWZ3ZUjBGSQN6i.','2023-05-22',3,1,NULL),(41,'c:/','$2a$10$ZsjmO0dsqCNQdY/RF2cuve0A7C2MABsD3FgKNKAiBl6AhMMJbpdFS','2023-05-22',3,1,NULL),(42,'/','$2a$10$2TXceJJZc6Z0m0ZblmlaEelFT89Sx0exjzKkPXGD9tCUKgVbpU8oS','2023-05-22',3,1,NULL),(43,'c:\\','$2a$10$WytnW2OP5.opNzwI9vWPp.JjAc9rnhlF3wYOzbbrF9LEv4zNLZRWS','2023-05-22',3,1,NULL),(45,'WEB-INF/web.xml','$2a$10$3OFXeIrq405WD/kEfWWsF.RNeBeHJhju51CGI/A6NPj7uT40AjDda','2023-05-22',3,1,NULL),(46,'WEB-INF\\web.xml','$2a$10$8/ga8PnJ0.JvcnXiRVkIHeozn59qU8HfxHUZuOXM8kS642F.OXhZa','2023-05-22',3,1,NULL),(47,'/WEB-INF/web.xml','$2a$10$lH6aeF1OIhSqO.yUvUaYd..yVBVARuxqMWea8pPq9CHObZ9xl1Taa','2023-05-22',3,1,NULL),(48,'\\WEB-INF\\web.xml','$2a$10$GEyJugrhShZ6cevBBarjNuO3e0im2TlrRPQbHj8L7ihkoY7pnL2SS','2023-05-22',3,1,NULL),(49,'thishouldnotexistandhopefullyitwillnot','$2a$10$Mqlo7Tmz5RR3IeuX4fHm6uGrX09mop7tVMVsv/i5fRH4b4vf0Myg6','2023-05-22',3,1,NULL),(50,'http://www.google.com/','$2a$10$wDmmRbfkvgvVs47/Qdm9fuLhLAWWYNeM.Rhfeak8CAZ7KugJ2NP3O','2023-05-22',3,1,NULL),(51,'http://www.google.com:80/','$2a$10$8mxDB/3/kvlE2YVJgBlkzuPaoUe/xqvCWLpKuLlI0TCYMEE.C3/Uq','2023-05-22',3,1,NULL),(52,'http://www.google.com','$2a$10$WgbM35M.PJc.UVvr0FxvfOC7VyBBm./ILj9BR4xUHSv/hgCcI4cZm','2023-05-22',3,1,NULL),(53,'http://www.google.com/search?q=OWASP%20ZAP','$2a$10$0KRSAtbeWPe5jcTKjwPKE.SDBblOVIKxCR7RZskkbnxERjVI/DRN2','2023-05-22',3,1,NULL),(54,'http://www.google.com:80/search?q=OWASP%20ZAP','$2a$10$.TY2WDDxbIzOVfJ9f0Pk4Obv7GjI4sOtZIMsiE8wzyfKqW24gXMLW','2023-05-22',3,1,NULL),(55,'www.google.com/','$2a$10$DMjvZir233vSgm9DtCDke.2oHxeHtnGgIfqAMsj5554VosWkyzwQO','2023-05-22',3,1,NULL),(56,'www.google.com:80/','$2a$10$DgbnDa8PP6CxgnYhbWuxHu6KtjVQzzwH.5.NjisczInQO3JUOtqz6','2023-05-22',3,1,NULL),(57,'www.google.com','$2a$10$gftd3NdVputKMkxOP6emNuHz/pFcVqSlBKuSWGjgxV3QvEHy4N6vu','2023-05-22',3,1,NULL),(58,'www.google.com/search?q=OWASP%20ZAP','$2a$10$SDwKIEpol0E9eBUSHxbIqO9.I2WM2MsriYXbx9cXdfqgK12gGUxZS','2023-05-22',3,1,NULL),(59,'www.google.com:80/search?q=OWASP%20ZAP','$2a$10$KJpA3UnM/Jyi5noIps2eg.PzvDUPLR7OWeLXGU.WlzXgZcg4N83tK','2023-05-22',3,1,NULL),(60,'7444753436292628805.owasp.org','$2a$10$kg1PHkZpcgYn3FQYINB6KOoreuq8y6Zbc4Rzo1NGn4Zpbr9hs9yJi','2023-05-22',3,1,NULL),(61,'http://7444753436292628805.owasp.org','$2a$10$dHucLvr4ka2ZySD78qprcersJnspWPdqr43AfvASqajG9VWgPkPX2','2023-05-22',3,1,NULL),(62,'https://7444753436292628805.owasp.org','$2a$10$27TEJBvkc.bq7mVKOaLCj.Guhg77pCRu0KKeqqTGTCiFSQv4tJjU6','2023-05-22',3,1,NULL),(63,'https://7444753436292628805%2eowasp%2eorg','$2a$10$VWl4u0h7iFC7jGl2GaurR.eAW.84zmiArdB4fOg7Q9sdB7VFT4wza','2023-05-22',3,1,NULL),(64,'5;URL=\'https://7444753436292628805.owasp.org\'','$2a$10$TyCh0BxawaRhCtRIXYSiluIrlvqxrNXrFXrt3zBvP94Lywpx8bHQG','2023-05-22',3,1,NULL),(65,'URL=\'http://7444753436292628805.owasp.org\'','$2a$10$RtC5YXZb9SWgsWcl6OrTa.ExxdX6AqtMeeY3BkFAQpT.kXvZ1KOj.','2023-05-22',3,1,NULL),(66,'http://\\7444753436292628805.owasp.org','$2a$10$pcak1AB6F/6pHQlYoprAiu0PXgOW6B7qX.shSbyTMK5zcv4miCqb2','2023-05-22',3,1,NULL),(67,'https://\\7444753436292628805.owasp.org','$2a$10$YrVrjXnFnAcpQnO2Odgz5OPMXAW9fuhoFlMPtw/tu6JCQm3j055OK','2023-05-22',3,1,NULL),(68,'//7444753436292628805.owasp.org','$2a$10$35.Dt5KOWOJPYr0XklHG/OJ.RcNk.gvjilPuLkV/7WLEjSIhHSb6O','2023-05-22',3,1,NULL),(69,'<!--#EXEC cmd=\"ls /\"-->','$2a$10$GJp5PuZ.eRMz8VUpAPGxk.ku1ypWbq7CmJoYecHraEdoALm1YaMiG','2023-05-22',3,1,NULL),(70,'\"><!--#EXEC cmd=\"ls /\"--><','$2a$10$Pq6mPJPthby.oLfibXQXDuZ.m2PsHsMg3e8VTJeZ5iBnxvf8N3G1y','2023-05-22',3,1,NULL),(71,'<!--#EXEC cmd=\"dir \\\"-->','$2a$10$15NbAWbndVxHfdeuee5S9ul1lpf9zbo02spxYpPUZk7dzlKTmpaKS','2023-05-22',3,1,NULL),(72,'\"><!--#EXEC cmd=\"dir \\\"--><','$2a$10$7gKKitdlePr2vcr4XIr8SOgME7YVoGaVM1xcCPDKK/gYdA2Y7iPue','2023-05-22',3,1,NULL),(73,'0W45pz4p','$2a$10$BUjR4QqB3jh4nUdSToSXOOFIMNVK0ZSi1Pj1jEEGynXDEeRTZ0Kj2','2023-05-22',3,1,NULL),(74,'ZAP0W45pz4p','$2a$10$/st1yr8E53h9nR52z3vwvOL9BpECctXL8zhr3se83a/m5PLNtyfIS','2023-05-22',3,1,NULL),(75,'\'\"<scrIpt>alert(1);</scRipt>','$2a$10$Q6BSw0QjOCOK2eIb9Wqm7uTu7S2dvSiIMU/aHcJMiK5cldDsb5Z5e','2023-05-22',3,1,NULL),(77,'zApPX10sS','$2a$10$NMXQR091F3liiNwvA0u5P.W23smsAqF12GYVVBELzwg3ogc7vVVRG','2023-05-22',3,1,NULL),(78,'\'','$2a$10$hTOIZuZTP/.VbjPrndJLzuiWHo0DKVatO.yqA5Yhq197S/R5Cs6mC','2023-05-22',3,1,NULL),(79,'ZAP\'','$2a$10$uxULvePQ1OL8ruji31H21ep0vjX8OIrV8jIGIRTv8eX/bo/eetXZK','2023-05-22',3,1,NULL),(80,'\"','$2a$10$fgGckCipD.dWEhH3PN/7veAxnRqaablDbGXIQvKm0Tr/rEKVUYlUi','2023-05-22',3,1,NULL),(81,'ZAP\"','$2a$10$zef0PfIaLD8/35rUQ6eF3Oj2zFSMetoj47j5v0pKjLi.ub6s5iC4O','2023-05-22',3,1,NULL),(82,';','$2a$10$KRAdnEtYYv1.f83N8Vf8q.07z9L8SpWnlrJJu6t0wo.QDkY79e2rq','2023-05-22',3,1,NULL),(83,'ZAP;','$2a$10$7Pu6X17Rl9w7jJHvPDlUsuOVdbjPfxZG1.b3FjQkX3t02KqXQ2OdW','2023-05-22',3,1,NULL),(84,'\'(','$2a$10$1Ov7/A2nLKbSSACDkGKAkO63tjkrKeZLWyY5cK4guVyHpgSjNYqmq','2023-05-22',3,1,NULL),(85,'ZAP\'(','$2a$10$PMK1G/LO2f6d5e3VpPpRbOXpgzhsLK7N/GLf1h1Sj3vDFo4S8ujoG','2023-05-22',3,1,NULL),(86,'ZAP AND 1=1 -- ','$2a$10$mFw6TZgG1yHcnb1JxxKd0uYtDCrjrxDlcDJad7rTu4gaqwj7O8Nhu','2023-05-22',3,1,NULL),(87,'ZAP\' AND \'1\'=\'1\' -- ','$2a$10$UuXHRAT2RDffLqan1br10uaNmKQY8bv1YinPgMaV9H3kiAaDy5hmq','2023-05-22',3,1,NULL),(88,'ZAP\" AND \"1\"=\"1\" -- ','$2a$10$XzA3XvEZAvdqzw6DkdYlgeuTDy1LEVzHn6kCD4k8BTVf2W8CYmnJy','2023-05-22',3,1,NULL),(89,'ZAP AND 1=1','$2a$10$B62uDEUWrCt5FfwcQjQZhOBtrFKQaxRbSBM8lLiL605iy4ezqYG2G','2023-05-22',3,1,NULL),(90,'ZAP\' AND \'1\'=\'1','$2a$10$1wWluPpFGHdwf8rXx.11SuY4HHAL86Q2LxHbsVwIO4.tuBwPpvccS','2023-05-22',3,1,NULL),(91,'ZAP\" AND \"1\"=\"1','$2a$10$KK6zMsFT6s8cdNWaJyyLa.jEe.8jkfuNDvwDqdpcd.XOSITpETVbe','2023-05-22',3,1,NULL),(92,'ZAP UNION ALL select NULL -- ','$2a$10$tuBukQJnjHXSFuSSh3qiXOvzHlaiem4.z7l10uaLDrGOA6roZgFDW','2023-05-22',3,1,NULL),(93,'ZAP\' UNION ALL select NULL -- ','$2a$10$xWuyYBiL7ckGidDHp7ST6u9GpcdxPqTdXjdwV2vmmtorbqPXIJiCO','2023-05-22',3,1,NULL),(94,'ZAP\" UNION ALL select NULL -- ','$2a$10$WGZU11VhEItIcIXYlvGshesx93uXymK1FjNiaI1G55mfv2ZuetooG','2023-05-22',3,1,NULL),(95,'ZAP) UNION ALL select NULL -- ','$2a$10$c.ZxceofxU5CCBXJYCE8QOUei7nteWa.rAL8fMxwitkGKulRMMJMy','2023-05-22',3,1,NULL),(96,'ZAP\') UNION ALL select NULL -- ','$2a$10$rK5sRB9UB7FVZTwvS3ip/.jBJKJpwsncgeHZRWTPkAWQQjHSxCWAW','2023-05-22',3,1,NULL),(97,'ZAP / sleep(15) ','$2a$10$UioV7v0fhv45SE7rm1uyc.2MMko4WBjxzRDC..kwpGri131M3FNm.','2023-05-22',3,1,NULL),(98,'ZAP\' / sleep(15) / \'','$2a$10$3TyMj1c2hGGRB2KmiL2SOOcbA3lghtKu.hcHRSBqXSn5N//..mz66','2023-05-22',3,1,NULL),(99,'ZAP\" / sleep(15) / \"','$2a$10$ZttAByEg3pWzZvdv6ox1aekI8lOlih9Q8RHybyKC9rGUvAVEPpuOG','2023-05-22',3,1,NULL),(100,'ZAP and 0 in (select sleep(15) ) -- ','$2a$10$eM3VdCypAbIY43h6mszEX.JeG9Fcu5hM17E5IBMchqSoUG6akyOgO','2023-05-22',3,1,NULL),(101,'ZAP\' and 0 in (select sleep(15) ) -- ','$2a$10$kUnSJXUC48OzbyM5LCNL7uDwUmcOJIu1l30YXJCjM26ozJ4.TP3Z2','2023-05-22',3,1,NULL),(102,'ZAP\" and 0 in (select sleep(15) ) -- ','$2a$10$0fOg43z8yp.cCSa2HndmeOZpUf7.wPfyJWRZgD7I/pupQITsgOLNS','2023-05-22',3,1,NULL),(103,'\"java.lang.Thread.sleep\"(15000)','$2a$10$FNGOwo5bs9/mouBCt57NJujfnjRax8cQ6pJhf7Gs/aJCbLD012fWe','2023-05-22',3,1,NULL),(104,'register','$2a$10$eBs9aY24FzGoqi.dss7eqeHNeZOAM3ATYDePA0uMH/aYDIadVKsh.','2023-05-23',3,1,NULL),(105,'1297796892753182131.owasp.org','$2a$10$bHDeWCVnsxFirBTy9d1na.Z0miaELi2aRwhsvuzLpuqBmw43d7q8q','2023-05-23',3,1,NULL),(106,'http://1297796892753182131.owasp.org','$2a$10$haruG8j9Pv1H88F9Q1YdG.KJZkKY.evkyLlsshIW7cS4efegzSJ4u','2023-05-23',3,1,NULL),(107,'https://1297796892753182131.owasp.org','$2a$10$bB06bIrO93CPmn4jRRg2NeZo5RcJFkXTKBQrX1jllTL3DeJetwQ..','2023-05-23',3,1,NULL),(108,'https://1297796892753182131%2eowasp%2eorg','$2a$10$gI9VJa2mVSyT./JKaROSZuav9QfHuSlGv101fJoBG9O.ayMUimHea','2023-05-23',3,1,NULL),(109,'5;URL=\'https://1297796892753182131.owasp.org\'','$2a$10$OQFcKBlbUV1Rp5t1g8eZKennv6S/p4jvLfbFcMEfrPL8mBmmY6XkO','2023-05-23',3,1,NULL),(110,'URL=\'http://1297796892753182131.owasp.org\'','$2a$10$oVDMbBFzlVtHHI3qI4ztPeWBGee7pEgQCha6ZCp6gdvw19MZ38EAO','2023-05-23',3,1,NULL),(111,'http://\\1297796892753182131.owasp.org','$2a$10$uSsrNI5vh0UqdAUNcBzDMep22Eyuv/A8cPCA/i9MXRV0ymF5cwSlm','2023-05-23',3,1,NULL),(112,'https://\\1297796892753182131.owasp.org','$2a$10$UDzCGXrnKUPx3xrB6XbKf.gd5m0YVo.syTEFnoyv7oIOlBwJqstim','2023-05-23',3,1,NULL),(113,'//1297796892753182131.owasp.org','$2a$10$p7WsCQ.1dXPLVf5A9Jgxc.QznkCKUTDYDJcmT5ULTr1UEKFoM0RhG','2023-05-23',3,1,NULL),(114,'</span><scrIpt>alert(1);</scRipt><span>','$2a$10$GgrtVhfKU0DvWq.FnqMYX.LycmIPkJZVVGZJ7/YeAqjA7JCU6lNsS','2023-05-23',3,1,NULL),(115,'</span><img src=x onerror=prompt()><span>','$2a$10$oMRMoRCgSrd4UEf3qTDXj.DyLyDmNOk3IRefBYBTfxtXwPssaB3Ee','2023-05-23',3,1,NULL),(116,'<img src=x onerror=prompt()>','$2a$10$iB2d0mYEQYWqlFAEEgxOxeelfjjsuTjo9/MLtTcWRexwLVQczTuH6','2023-05-23',3,1,NULL),(117,'duc50','$2a$10$Bp1AVT.iMwQr8Dlvx7vdIOvkW9.sLlHkuxuQiCR9kAeVxfy2BsWqq','2023-05-23',3,1,NULL),(118,'hacker1','$2a$10$iu/ENFEW/UxTwsMPQa3DAubzsLTkxNFcohNGjtRscgcpBOMt4sJbe','2023-05-23',3,1,NULL),(119,'hacker2','$2a$10$.gOplfs/kUcQA3guroEJouRw1Pfud5b4XhcF6eVFzuPkHSH4rAnJ6','2023-05-23',3,1,NULL),(120,'kk','$2a$10$Mo072DokMnizum5TocXbVeyB4yBBQw/lw1YF2aN6c9nA1mbbm.DFi','2023-05-23',3,1,NULL),(121,'hacker3','$2a$10$Tyfn0dSNvbNcPvV6pNQCuu/MGqKUbiHrZwVSTyyF079mVg3q6K2LG','2023-05-23',3,1,NULL),(122,'hacker4','$2a$10$zgy6h/qaRkXAuWfKf9AUHuGIeEk4K/.QCWQ.ruCfGvihTzLHJ.ItS','2023-05-23',3,1,NULL),(123,'hacker5','$2a$10$77Rac.cJM4RnXIOT4jXAL.hc6eHzG15FKdv//4xELzUSznS//Hucq','2023-05-23',3,1,NULL),(124,'duc51','$2a$10$xY1.SsgtbpEvg0FYBhHxyupvcCKkPBOfxb9gHZj3HICMg3Y.4hUUK','2023-05-23',3,1,NULL),(125,'hacker6','$2a$10$EFIklG.0QXi.2tESVApGD.1DfV1hg1/8W8uPFym4aVIJIAL1N3qb.','2023-05-23',3,1,NULL),(126,'hacker7','$2a$10$tdwskpm6HLJsTodtmUFe0uf9DrQxCqzTrmZTZXL1JxKUz8M.NHI3u','2023-05-23',3,1,NULL),(127,'duc52','$2a$10$vsvpR2UImjZ/qw2WIdrLV.ty8l7/bDTMU2RSyrFKEgCz4FyEsAVsi','2023-05-24',3,1,NULL),(128,'duc53','$2a$10$hKQwYM7v2Ww5mwj6Wn9fsuLw/EBi3pQKmAYpZlZjGdWjnrFIJTdSm','2023-05-24',3,1,NULL),(129,'/register','$2a$10$MrjMzYa6TXLUkexLh7Q5Zea0QuI3UUOAH7v4deXJWOzQuCVYWhdci','2023-05-24',3,1,NULL),(130,'\\register','$2a$10$CBWgN4lgV0wQ6.M903WGmeaErS.Nwa1h6Q0iK/FHJMiEAX5p4T7lK','2023-05-24',3,1,NULL),(131,'duc54','$2a$10$zQbJ.eWvVc0cyKg0PNBXvuPGyPh5fEd2..KJMrl0PHWUNbWV9lkFS','2023-05-24',3,1,NULL),(132,'john001','$2a$10$JJTrvKbwYYNzrkEQnqKyNOk/yE1snS8zNGkrlwGz7nqdtRATr6k16','2023-05-24',3,1,NULL),(133,'john001 la','$2a$10$bV4uVHlnvP6/7m0CpxbVyOf8VqT0A/JWfvs9SiUxJegL5jcsP.wPW','2023-05-26',3,1,NULL),(134,'duc88','$2a$10$/XWPI4yoWtnLm4C5PSyqvuMWwAYSt9mSyHIqmWRmG0BcYdfq1nKs.','2023-05-27',3,1,NULL),(135,'duc1717','$2a$10$kTvKeuX2UZjZ5MM65ezN1uqoq6PuUxc3dJLVjIphDrTNOgumaj4oi','2023-05-28',3,1,NULL),(136,'duc109','$2a$10$Ub2YdJhs7R7xpApTf9IL9eheeS1/01zvZMebY5rCXyvJbNw3hdrT2','2023-05-30',3,1,NULL),(137,'duc99','$2a$10$4lVwKG654zwW2G7FSHdCFez/yrkjnE5WsiMfZxoSLHPvdCPUrc7he','2023-05-30',3,1,NULL),(138,'duc77','12345','2023-05-30',3,1,NULL),(139,'duc1010','12345','2023-05-30',3,1,NULL),(140,'duc101','Duc2112002@','2023-09-18',3,1,NULL),(141,'duc102','$2a$10$uxa53cGN.novceLcZcO5a.40s5v16xkjf.BBgF0wkMESjm3X8oHTS','2023-09-18',3,1,NULL),(142,'duc103','$2b$10$qAgnBinMopmUpbdpsiU6nOi8scNIvYxNusC37/91z3CYum/Q2MF2u','2023-09-18',3,1,NULL),(143,'duc105','$2b$10$96sT1sttSwI0RksT6IvT/OB5wmyOgpntYTQEJqsoWlK/3t2Czx/i.','2023-09-18',3,1,NULL),(144,'Võ Văn Đức','$2b$10$JFVwppLfr/uk0JjXltvM7uy.1Iokrrkbu8Nzm/qJULkPsetrFuZv2','2023-11-18',3,1,NULL),(145,'duc0100','$2b$10$Gx4MEagxA0f.KGtkTVLOauEOZw10n2OV/nLNZbGzSmP6l8zgd6iCa','2023-11-18',3,1,NULL);
/*!40000 ALTER TABLE `taikhoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaitro`
--

DROP TABLE IF EXISTS `vaitro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `vaitro` (
  `mavaitro` int(11) NOT NULL AUTO_INCREMENT,
  `TenVaiTro` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`mavaitro`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaitro`
--

LOCK TABLES `vaitro` WRITE;
/*!40000 ALTER TABLE `vaitro` DISABLE KEYS */;
INSERT INTO `vaitro` VALUES (1,'Admin'),(2,'Nhan Vien'),(3,'KhachHang'),(4,'Shipper');
/*!40000 ALTER TABLE `vaitro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-06 10:28:53
