-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: anapec_bdc
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agenda`
--

DROP TABLE IF EXISTS `agenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda` (
  `id` varchar(38) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `objet` varchar(255) NOT NULL,
  `date_RDV` date NOT NULL,
  `heure_RDV_debut` time NOT NULL,
  `heure_RDV_fin` time NOT NULL,
  `type_RDV` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `present` tinyint(1) DEFAULT 1,
  `beneficier_id` varchar(255) NOT NULL,
  `date_modification` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `commentaire` varchar(255) NOT NULL,
  `createur` varchar(255) NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda`
--

LOCK TABLES `agenda` WRITE;
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
INSERT INTO `agenda` VALUES ('9d98a545-1dff-4765-a532-88cdeeadfb00','Accueil','2024-11-28','11:21:00','12:21:00','Accueil','Present',1,'GB435675','2024-11-28 10:22:13','...','Dupont','2024-11-28','2024-11-28'),('9d98a58b-7520-4c12-aa4b-d7d7301848e5','Entretien d\'accueil','2024-11-29','12:22:00','13:22:00','Entretien d\'accueil','Present',1,'GB435675','2024-11-28 10:22:59','merci','Dupont','2024-11-28','2024-11-28'),('9d98a5d2-d223-49fe-b029-5e04f468afc7','Redaction de la carte des compétences','2024-11-28','14:23:00','16:23:00','Rédaction de la carte des compétences','Present',1,'GB435675','2024-11-28 10:23:46','merci','Dupont','2024-11-28','2024-11-28'),('9d98a61d-e4a5-4227-bddc-6623a8217ef9','Entretiens exploratoires','2024-11-30','14:24:00','16:24:00','Entretiens exploratoires','Present',1,'GB435675','2024-11-28 10:24:35','merci','Dupont','2024-11-28','2024-11-28'),('9d98a659-7ee5-44e4-b8ae-b458345c7b20','Entretien de projet','2024-12-05','13:24:00','14:25:00','Entretien de projet','Present',1,'GB435675','2024-11-28 10:25:14','merci','Dupont','2024-11-28','2024-11-28'),('9d9b071c-e1e8-4008-ab34-6ea04a4be1bc','helllllo','2024-11-29','15:47:00','15:47:00','Rédaction de la carte des compétences','Present',1,'GB435675','2024-11-29 14:47:45','hello','Doe','2024-11-29','2024-11-29'),('9d9b0780-1e23-46a9-986b-6f3117f6d763','hello','2024-11-29','15:48:00','16:48:00','Entretien d\'accueil','Present',1,'GB435675','2024-11-29 14:48:33','test','Doe','2024-11-29','2024-11-29');
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bdc`
--

DROP TABLE IF EXISTS `bdc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bdc` (
  `id` varchar(38) NOT NULL,
  `cin` varchar(255) DEFAULT NULL,
  `fiche_actuel` varchar(255) DEFAULT NULL,
  `date_creation` date DEFAULT NULL,
  `type_beneficier` varchar(255) DEFAULT NULL,
  `statusBDC` varchar(255) DEFAULT NULL,
  `statusEtape01` varchar(255) DEFAULT NULL,
  `statusEtape02` varchar(255) DEFAULT NULL,
  `statusEtape03` varchar(255) DEFAULT NULL,
  `dateCreationEtape01` date DEFAULT NULL,
  `dateCreationEtape02` date DEFAULT NULL,
  `dateCreationEtape03` date DEFAULT NULL,
  `statusFiche03` varchar(255) DEFAULT NULL,
  `statusFiche04` varchar(255) DEFAULT NULL,
  `statusFiche05` varchar(255) DEFAULT NULL,
  `statusFiche06` varchar(255) DEFAULT NULL,
  `statusFiche07` varchar(255) DEFAULT NULL,
  `statusFiche08` varchar(255) DEFAULT NULL,
  `statusFiche09` varchar(255) DEFAULT NULL,
  `statusFiche10` varchar(255) DEFAULT NULL,
  `statusFiche11` varchar(255) DEFAULT NULL,
  `statusFiche12` varchar(255) DEFAULT NULL,
  `statusFiche13` varchar(255) DEFAULT NULL,
  `statusFiche14` varchar(255) DEFAULT NULL,
  `statusFiche15` varchar(255) DEFAULT NULL,
  `statusFiche16` varchar(255) DEFAULT NULL,
  `statusFiche17` varchar(255) DEFAULT NULL,
  `statusFiche18` varchar(255) DEFAULT NULL,
  `statusFiche19` varchar(255) DEFAULT NULL,
  `statusFiche20` varchar(255) DEFAULT NULL,
  `statusFiche21` varchar(255) DEFAULT NULL,
  `statusFiche22` varchar(255) DEFAULT NULL,
  `dateCreationFiche03` date DEFAULT NULL,
  `dateCreationFiche04` date DEFAULT NULL,
  `dateCreationFiche05` date DEFAULT NULL,
  `dateCreationFiche06` date DEFAULT NULL,
  `dateCreationFiche07` date DEFAULT NULL,
  `dateCreationFiche08` date DEFAULT NULL,
  `dateCreationFiche09` date DEFAULT NULL,
  `dateCreationFiche10` date DEFAULT NULL,
  `dateCreationFiche11` date DEFAULT NULL,
  `dateCreationFiche12` date DEFAULT NULL,
  `dateCreationFiche13` date DEFAULT NULL,
  `dateCreationFiche14` date DEFAULT NULL,
  `dateCreationFiche15` date DEFAULT NULL,
  `dateCreationFiche16` date DEFAULT NULL,
  `dateCreationFiche17` date DEFAULT NULL,
  `dateCreationFiche18` date DEFAULT NULL,
  `dateCreationFiche19` date DEFAULT NULL,
  `dateCreationFiche20` date DEFAULT NULL,
  `dateCreationFiche21` date DEFAULT NULL,
  `dateCreationFiche22` date DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bdc`
--

LOCK TABLES `bdc` WRITE;
/*!40000 ALTER TABLE `bdc` DISABLE KEYS */;
INSERT INTO `bdc` VALUES ('9d76b1be-4488-4f80-97f8-11d736b50727','GB435675','fiche09','2024-11-11','adultes qualifiés','En cours','En cours',NULL,NULL,NULL,NULL,NULL,'Terminé','Terminé','Terminé',NULL,'Terminé','Initier','Terminé','Terminé',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-11-29','2024-11-29','2024-11-29',NULL,'2024-11-29',NULL,'2024-11-29','2024-11-15',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-11-29','2024-11-11'),('9d789f73-7d38-470a-aa07-36d42fadf1c6','GB435675',NULL,'2024-11-12','jeunes','Initier',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-11-12','2024-11-12');
/*!40000 ALTER TABLE `bdc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beneficier`
--

DROP TABLE IF EXISTS `beneficier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beneficier` (
  `id` varchar(38) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `prenom` varchar(38) NOT NULL,
  `nom` varchar(38) NOT NULL,
  `cin` varchar(30) NOT NULL,
  `motifDeSejour` varchar(40) NOT NULL,
  `adresse` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `nationnalite` varchar(200) NOT NULL,
  `date_naissance` varchar(40) NOT NULL,
  `telephone` varchar(100) NOT NULL,
  `statusProfessionnel` varchar(100) NOT NULL,
  `paysNaissance` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beneficier`
--

LOCK TABLES `beneficier` WRITE;
/*!40000 ALTER TABLE `beneficier` DISABLE KEYS */;
INSERT INTO `beneficier` VALUES ('UUID_BE_1','John','Doe','GB435675','Tourism','1234 Some Street, Some City','johndoe@email.com','American','1990-01-01','+1234567890','Employed','USA');
/*!40000 ALTER TABLE `beneficier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche03`
--

DROP TABLE IF EXISTS `fiche03`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche03` (
  `id` varchar(38) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dateCreation` date DEFAULT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `createur` varchar(255) DEFAULT NULL,
  `reponse_Q1` varchar(255) DEFAULT NULL,
  `reponse_Q2` varchar(255) DEFAULT NULL,
  `reponse_Q3` varchar(255) DEFAULT NULL,
  `reponse_Q4` varchar(255) DEFAULT NULL,
  `reponse_Q5` varchar(255) DEFAULT NULL,
  `reponse_Q6` varchar(255) DEFAULT NULL,
  `reponse_Q7` varchar(255) DEFAULT NULL,
  `reponse_Q8` varchar(255) DEFAULT NULL,
  `status_fiche` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche03`
--

LOCK TABLES `fiche03` WRITE;
/*!40000 ALTER TABLE `fiche03` DISABLE KEYS */;
INSERT INTO `fiche03` VALUES ('9d76b1be-a27d-4846-94d5-96c31661e8d0','2024-11-11','9d76b1be-4488-4f80-97f8-11d736b50727','GB435675',NULL,NULL,'demande_2','urgence_3','hello',NULL,'Accueil','2024-11-11','17:19','Terminé','2024-11-29','2024-11-11');
/*!40000 ALTER TABLE `fiche03` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche04`
--

DROP TABLE IF EXISTS `fiche04`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche04` (
  `id` varchar(38) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `reponse_Q1` date DEFAULT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `createur` varchar(255) DEFAULT NULL,
  `reponse_Q2` varchar(255) DEFAULT NULL,
  `reponse_Q3` varchar(255) DEFAULT NULL,
  `status_fiche` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche04`
--

LOCK TABLES `fiche04` WRITE;
/*!40000 ALTER TABLE `fiche04` DISABLE KEYS */;
INSERT INTO `fiche04` VALUES ('9d76b21f-7bd7-4e90-8374-10f77c0bcaad','2024-11-11','SDQF003','GB435675','GB435675','16','23','En cours','2024-11-29','2024-11-11');
/*!40000 ALTER TABLE `fiche04` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche05`
--

DROP TABLE IF EXISTS `fiche05`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche05` (
  `id` varchar(38) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `date_creation` varchar(255) DEFAULT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `createur` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche05`
--

LOCK TABLES `fiche05` WRITE;
/*!40000 ALTER TABLE `fiche05` DISABLE KEYS */;
INSERT INTO `fiche05` VALUES ('9d8872b5-735b-420c-bf1f-a58736738325','2024-11-29','SDQF003','GB435675','Doe','2024-11-29','2024-11-20');
/*!40000 ALTER TABLE `fiche05` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche05_categorie`
--

DROP TABLE IF EXISTS `fiche05_categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche05_categorie` (
  `id` varchar(38) NOT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `uuid_fiche05` varchar(255) DEFAULT NULL,
  `valeur_id_categorie` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche05_categorie`
--

LOCK TABLES `fiche05_categorie` WRITE;
/*!40000 ALTER TABLE `fiche05_categorie` DISABLE KEYS */;
/*!40000 ALTER TABLE `fiche05_categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche05_objectif`
--

DROP TABLE IF EXISTS `fiche05_objectif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche05_objectif` (
  `id` varchar(38) NOT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `uuid_fiche05` varchar(255) DEFAULT NULL,
  `valeur_id_objectif` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche05_objectif`
--

LOCK TABLES `fiche05_objectif` WRITE;
/*!40000 ALTER TABLE `fiche05_objectif` DISABLE KEYS */;
INSERT INTO `fiche05_objectif` VALUES ('9d98fc2d-7618-42df-a832-0bbd211673b4','9d8872b5-735b-420c-bf1f-a58736738325','GB435675','9d8872b5-735b-420c-bf1f-a58736738325','objectif_16','2024-11-28','2024-11-28'),('9d9b05bd-7ade-48fc-8624-634dc0ff55ce','9d8872b5-735b-420c-bf1f-a58736738325','GB435675','9d8872b5-735b-420c-bf1f-a58736738325','objectif_18','2024-11-29','2024-11-29');
/*!40000 ALTER TABLE `fiche05_objectif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche05_secteur`
--

DROP TABLE IF EXISTS `fiche05_secteur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche05_secteur` (
  `id` varchar(38) NOT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `uuid_fiche05` varchar(255) DEFAULT NULL,
  `valeur_id_secteur` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche05_secteur`
--

LOCK TABLES `fiche05_secteur` WRITE;
/*!40000 ALTER TABLE `fiche05_secteur` DISABLE KEYS */;
INSERT INTO `fiche05_secteur` VALUES ('9d98fc02-fcd5-49fb-9968-81ca9f85aa72','9d8872b5-735b-420c-bf1f-a58736738325','GB435675','9d8872b5-735b-420c-bf1f-a58736738325','secteur_8','2024-11-28','2024-11-28'),('9d98fc03-0340-48d1-b2f5-d71e17aef36f','9d8872b5-735b-420c-bf1f-a58736738325','GB435675','9d8872b5-735b-420c-bf1f-a58736738325','secteur_9','2024-11-28','2024-11-28'),('9d9b0591-b23d-469f-80b5-90c42e6aefc7','9d8872b5-735b-420c-bf1f-a58736738325','GB435675','9d8872b5-735b-420c-bf1f-a58736738325','secteur_14','2024-11-29','2024-11-29'),('9d9b0592-d1c8-4fac-854f-ea3ec3248065','9d8872b5-735b-420c-bf1f-a58736738325','GB435675','9d8872b5-735b-420c-bf1f-a58736738325','secteur_10','2024-11-29','2024-11-29');
/*!40000 ALTER TABLE `fiche05_secteur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche05_source`
--

DROP TABLE IF EXISTS `fiche05_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche05_source` (
  `id` varchar(38) NOT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `uuid_fiche05` varchar(255) DEFAULT NULL,
  `valeur_id_source` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche05_source`
--

LOCK TABLES `fiche05_source` WRITE;
/*!40000 ALTER TABLE `fiche05_source` DISABLE KEYS */;
INSERT INTO `fiche05_source` VALUES ('9d98fc2d-8007-4b47-8c09-27d72d1055aa','9d8872b5-735b-420c-bf1f-a58736738325','GB435675','9d8872b5-735b-420c-bf1f-a58736738325','source_20','2024-11-28','2024-11-28'),('9d9b05bd-86ec-4885-8338-55001c9e1f2b','9d8872b5-735b-420c-bf1f-a58736738325','GB435675','9d8872b5-735b-420c-bf1f-a58736738325','source_23','2024-11-29','2024-11-29');
/*!40000 ALTER TABLE `fiche05_source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche07`
--

DROP TABLE IF EXISTS `fiche07`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche07` (
  `id` varchar(38) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `reponse_Q1` varchar(255) DEFAULT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `reponse_Q2` varchar(500) DEFAULT NULL,
  `createur` varchar(255) DEFAULT NULL,
  `status_fiche` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche07`
--

LOCK TABLES `fiche07` WRITE;
/*!40000 ALTER TABLE `fiche07` DISABLE KEYS */;
INSERT INTO `fiche07` VALUES ('9d76c17a-cdcc-426e-8118-23dbc2e8c21c','2024-11-29','GB435675','GB435675','test 5','Doe','Terminé','2024-11-29','2024-11-11');
/*!40000 ALTER TABLE `fiche07` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche8_competence_connaissance`
--

DROP TABLE IF EXISTS `fiche8_competence_connaissance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche8_competence_connaissance` (
  `id` varchar(38) NOT NULL,
  `connaissance` varchar(38) NOT NULL,
  `uuid_fiche8` varchar(38) NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `createur` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_fiche8` (`uuid_fiche8`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche8_competence_connaissance`
--

LOCK TABLES `fiche8_competence_connaissance` WRITE;
/*!40000 ALTER TABLE `fiche8_competence_connaissance` DISABLE KEYS */;
INSERT INTO `fiche8_competence_connaissance` VALUES ('9d9b141d-6ccf-4fcf-bda9-e08dc3bd0c94','hello','9d8ae9b9-4def-42ab-a6e9-25960348945d','2024-11-29','2024-11-29','GB435675','9d76b1be-4488-4f80-97f8-11d736b50727','GB435675');
/*!40000 ALTER TABLE `fiche8_competence_connaissance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche8_competence_qualite`
--

DROP TABLE IF EXISTS `fiche8_competence_qualite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche8_competence_qualite` (
  `id` varchar(38) NOT NULL,
  `qualite` varchar(38) NOT NULL,
  `uuid_fiche8` varchar(38) NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `createur` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_fiche8` (`uuid_fiche8`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche8_competence_qualite`
--

LOCK TABLES `fiche8_competence_qualite` WRITE;
/*!40000 ALTER TABLE `fiche8_competence_qualite` DISABLE KEYS */;
INSERT INTO `fiche8_competence_qualite` VALUES ('9d96815c-e28e-4937-862c-e94bea1420ad','hello','9d8ae9b9-4def-42ab-a6e9-25960348945d','2024-11-27','2024-11-27','GB435675','9d76b1be-4488-4f80-97f8-11d736b50727','Yassine');
/*!40000 ALTER TABLE `fiche8_competence_qualite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche8_competence_technique`
--

DROP TABLE IF EXISTS `fiche8_competence_technique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche8_competence_technique` (
  `id` varchar(38) NOT NULL,
  `technique` varchar(38) NOT NULL,
  `uuid_fiche8` varchar(38) NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `createur` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_fiche8` (`uuid_fiche8`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche8_competence_technique`
--

LOCK TABLES `fiche8_competence_technique` WRITE;
/*!40000 ALTER TABLE `fiche8_competence_technique` DISABLE KEYS */;
INSERT INTO `fiche8_competence_technique` VALUES ('9d9b1426-41a7-40cd-9bb3-66b861d7d5a9','test','9d8ae9b9-4def-42ab-a6e9-25960348945d','2024-11-29','2024-11-29','GB435675','9d76b1be-4488-4f80-97f8-11d736b50727','GB435675');
/*!40000 ALTER TABLE `fiche8_competence_technique` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche8_connaissance`
--

DROP TABLE IF EXISTS `fiche8_connaissance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche8_connaissance` (
  `id` varchar(38) NOT NULL,
  `uuid_parameter_formation` varchar(38) NOT NULL,
  `connaissance` varchar(38) NOT NULL,
  `autoEvaluationMaitrise` varchar(2) NOT NULL,
  `autoEvaluationInteret` varchar(2) NOT NULL,
  `uuid_fiche8` varchar(38) NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `createur` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_parameter_formation` (`uuid_parameter_formation`),
  KEY `uuid_fiche8` (`uuid_fiche8`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche8_connaissance`
--

LOCK TABLES `fiche8_connaissance` WRITE;
/*!40000 ALTER TABLE `fiche8_connaissance` DISABLE KEYS */;
INSERT INTO `fiche8_connaissance` VALUES ('9da0f173-adaf-47e2-ae83-52d6c98fcf6c','formation_1','connaissance 2','--','+','9d8ae9b9-4def-42ab-a6e9-25960348945d','2024-12-02','2024-12-02','GB435675','9d76b1be-4488-4f80-97f8-11d736b50727','Doe'),('9da0f189-a0fc-4bf3-b598-8ceabdbaa16e','formation_2','cannaissance4','--','-','9d8ae9b9-4def-42ab-a6e9-25960348945d','2024-12-02','2024-12-02','GB435675','9d76b1be-4488-4f80-97f8-11d736b50727','Doe');
/*!40000 ALTER TABLE `fiche8_connaissance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fichier`
--

DROP TABLE IF EXISTS `fichier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichier` (
  `id` varchar(38) NOT NULL,
  `nom_liste` varchar(255) NOT NULL,
  `REM` varchar(255) NOT NULL,
  `REC` varchar(255) NOT NULL,
  `typeREM` varchar(38) NOT NULL,
  `typeREC` varchar(38) NOT NULL,
  `status` varchar(38) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichier`
--

LOCK TABLES `fichier` WRITE;
/*!40000 ALTER TABLE `fichier` DISABLE KEYS */;
INSERT INTO `fichier` VALUES ('secteur_11','secteur','','ressources_humaines','xlsx','xlsx','active'),('secteur_13','secteur','maintenance_électrique','','pdf','xlsx','active'),('secteur_7','secteur','','gestion_de_projets','docs','xlsx','active'),('secteur_8','secteur','informatique','','pdf','xlsx','active'),('secteur_9','secteur','maintenance_mécanique','','pdf','xlsx','active');
/*!40000 ALTER TABLE `fichier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formation`
--

DROP TABLE IF EXISTS `formation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formation` (
  `id` varchar(38) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_beneficier` varchar(255) DEFAULT NULL,
  `valeur_id` varchar(255) DEFAULT NULL,
  `FR` varchar(255) DEFAULT NULL,
  `AR` varchar(255) DEFAULT NULL,
  `EN` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `valeur_id` (`valeur_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formation`
--

LOCK TABLES `formation` WRITE;
/*!40000 ALTER TABLE `formation` DISABLE KEYS */;
INSERT INTO `formation` VALUES ('1','UUID_BE_1','formation_1','Certificat d’initiation professionnelle','شهادة التأسيس المهني','Professional Initiation Certificate'),('2','UUID_BE_1','formation_2','Bac + 5, master privé, MBA','بكالوريا + 5، ماجستير خاص، ماجستير في إدارة الأعمال','Bac + 5, private master, MBA'),('3','UUID_BE_1','formation_3','Baccalauréat','البكالوريا','Baccalaureate'),('4','UUID_BE_2','formation_4','Brevet de technicien supérieur (B.T.S.)','شهادة تقني سامي (B.T.S.)','Higher Technician Certificate (BTS)'),('5','UUID_BE_2','formation_5','Deum, capitaine, officier, agent d’autorité','ديوم، كابتن، ضابط، وكيل سلطة','Deum, captain, officer, authority agent'),('6','UUID_BE_2','formation_6','Diplôme de cycle pédagogique, diplôme de cycle général, DCN, agrégation','دبلوم الدورة التربوية، دبلوم الدورة العامة، DCN، التجميع','Pedagogical cycle diploma, general cycle diploma, DCN, aggregation'),('7','UUID_BE_2','formation_7','Ingénieur','مهندس','Engineer');
/*!40000 ALTER TABLE `formation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` varchar(38) NOT NULL,
  `date_creation` datetime NOT NULL,
  `sujet` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `cin` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES ('9d627fbf-ee72-4e81-a072-74c89fab4c69','2024-11-01 12:22:36','helloto','hello test','GH345673','Envoyé','2024-11-01','2024-11-01'),('9d629fd9-6c49-4d14-a368-81aa115c69db','2024-11-01 13:52:21','sujet 2','test 2','GH345673','Envoyé','2024-11-01','2024-11-01');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametre`
--

DROP TABLE IF EXISTS `parametre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parametre` (
  `uuid` varchar(38) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nom_liste` varchar(255) DEFAULT NULL,
  `valeur_id` varchar(255) DEFAULT NULL,
  `FR` varchar(255) DEFAULT NULL,
  `AR` varchar(255) DEFAULT NULL,
  `EN` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `valeur_id` (`valeur_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametre`
--

LOCK TABLES `parametre` WRITE;
/*!40000 ALTER TABLE `parametre` DISABLE KEYS */;
INSERT INTO `parametre` VALUES ('1','formation','formation_1','Certificat d’initiation professionnelle','شهادة بداية مهنية','Certificate of Professional Initiation'),('10','secteur','secteur_10','Laitière, chocolaterie et confiserie','صناعة الألبان، شوكولاتة وحلويات','Dairy, Chocolate, and Confectionery'),('11','secteur','secteur_11','Maintenance mécanique des équipements','صيانة ميكانيكية للمعدات','Mechanical Equipment Maintenance'),('12','secteur','secteur_12','Montage, assemblage et contrôle','التجميع، التركيب، والاختبار','Assembly, Assembly, and Control'),('13','secteur','secteur_13','Navigation aérienne et personnel d’accompagnement du transport','الملاحة الجوية وموظفو مرافقة النقل','Aerial Navigation and Transport Personnel'),('14','secteur','secteur_14','Navigation maritime','الملاحة البحرية','Maritime Navigation'),('15','categorie','categorie_15','Travailleur.euse indépendant.e / Profession libérale','عامل مستقل / مهنة حرة','Self-employed / Liberal Profession'),('16','objectif','objectif_16','Recherche d’emploi','البحث عن عمل','Job Search'),('17','objectif','objectif_17','Changement d’emploi','تغيير العمل','Job Change'),('18','objectif','objectif_18','Formation','تدريب','Training'),('19','objectif','objectif_19','Autre, spécifier :','آخر، حدد:','Other, specify:'),('2','formation','formation_2','Bac + 5, master privé, MBA','بكالوريا + 5، ماستر خاص، MBA','Bac + 5, Private Master, MBA'),('20','source','source_20','Organisme de Formation','مؤسسة تدريب','Training Organization'),('21','source','source_21','Entreprise','شركة','Company'),('22','source','source_22','Social Network','شبكة اجتماعية','Social Network'),('23','source','source_23','Relations personnelles','علاقات شخصية','Personal Relationships'),('3','formation','formation_3','Baccalauréat','بكالوريا','Baccalaureate'),('4','formation','formation_4','Brevet de technicien supérieur (B.T.S.)','شهادة تقني سامي (B.T.S.)','Higher Technician Certificate (B.T.S.)'),('426614174000','status','statut_01','Annulé','ملغى','Canceled'),('426614174001','status','statut_02','Reporté','مؤجل','Rescheduled'),('426614174002','status','statut_03','Présent','حاضر','Present'),('426614174003','RDV','rdv_01','Accueil','استقبال','Welcome'),('426614174004','RDV','rdv_02','Entretien d\'accueil','مقابلة ترحيبية','Welcome Interview'),('426614174005','RDV','rdv_03','Rédaction de la carte des compétences','إعداد خريطة المهارات','Skills Mapping'),('426614174006','RDV','rdv_04','Entretiens exploratoires','مقابلات استكشافية','Exploratory Interviews'),('426614174007','RDV','rdv_05','Entretien de projet','مقابلة المشروع','Project Interview'),('426614174008','RDV','rdv_06','Atelier de recherche dirigée sur les profils professionnels','ورشة بحث موجهة حول الملفات المهنية','Guided Workshop on Professional Profiles'),('426614174009','RDV','rdv_07','Le projet professionnel et le plan d\'action','المشروع المهني وخطة العمل','Professional Project and Action Plan'),('42661417401','delai_appel','appele_2','Deux semaines','أسبوعين','Two weeks'),('426614174010','RDV','rdv_08','Entretien de synthèse','مقابلة ختامية','Summary Interview'),('426614174011','RDV','rdv_09','Suivi à 6 mois','متابعة بعد 6 أشهر','6 Month Follow-up'),('426614174012','langues','langue_01','Français','عربي','English'),('426614174015','notification','notification_01','Envoyé','تم الإرسال','Sent'),('426614174016','notification','notification_02','Connecté','متصل','Connected'),('426614174017','notification','notification_03','Vu','تمت مشاهدته','Seen'),('426614174018','delai_appel','appele_1','Une semaine','أسبوع','One week'),('42661417402','delai_appel','appele_3','Un mois','شهر','One month'),('42661417403','delai_appel','appele_4','Autre, spécifie:','آخر، حدد:','Other, specify'),('42661417404','origine_demande','demande_1','Candidature spontanée','طلب تلقائي','Spontaneous application'),('42661417405','origine_demande','demande_2','Autre, spécifier','آخر، يُحدد','Other, specify'),('42661417406','urgence','urgence_1','Urgence élevée','الطوارئ العالية','High urgency'),('42661417407','urgence','urgence_2','Haute priorité','أولوية عالية','High priority'),('42661417408','urgence','urgence_3','Moyenne priorité','أولوية متوسطة','Medium priority'),('42661417409','urgence','urgence_4','Faible priorité','أولوية منخفضة','Low priority'),('5','formation','formation_5','Deum, capitaine, officier, agent d’autorité','ديوان، كابتن، ضابط، وكيل سلطة','Deum, Captain, Officer, Authority Agent'),('6','formation','formation_6','Diplôme de cycle pédagogique, diplôme de cycle général, DCN, agrégation','دبلوم الدورة التربوية، دبلوم الدورة العامة، DCN، تجميع','Pedagogical Cycle Diploma, General Cycle Diploma, DCN, Aggregation'),('7','formation','formation_7','Ingénieur','مهندس','Engineer'),('8','secteur','secteur_8','Intermédiation commerciale','الوساطة التجارية','Commercial Intermediation'),('9','secteur','secteur_9','Laboratoire photographique et cinématographique','مختبر التصوير الفوتوغرافي والسينمائي','Photographic and Cinematographic Laboratory'),('uuid-162','fiche','fiche_3','Premier contact','الاتصال الأول','First contact'),('uuid-163','fiche','fiche_4','Le contrat du Bilan des compétences','عقد تقييم المهارات','Skills Assessment Contract'),('uuid-164','fiche','fiche_5','Fiche d’information','ورقة المعلومات','Information Sheet'),('uuid-165','fiche','fiche_6','La planification du parcours du Bilan des compétences','تخطيط مسار تقييم الكفاءات','Planning of the skills assessment path'),('uuid-166','fiche','fiche_7','Qu’est-ce que j’attends du Bilan des compétences','ما الذي أتوقعه من تقييم المهارات','What I expect from the Skills Assessment'),('uuid-167','fiche','fiche_8','La Carte des Compétences','خريطة المهارات','Skills Map'),('uuid-168','fiche','fiche_9','Évaluation des compétences de la personne bénéficiaire','تقييم مهارات الشخص المستفيد','Evaluation of the Beneficiary\'s Skills'),('uuid-169','fiche','fiche_10','Mon travail actuel','عملي الحالي','My current job'),('uuid-170','phase','phase_1','1-La phase préliminaire','المرحلة التمهيدية','1-Preliminary Phase'),('uuid-171','phase','phase_2','2-La phase d’investigation','مرحلة التحقيق','2-Investigation Phase'),('uuid-172','phase','phase_3','3-La phase finale','المرحلة النهائية','3-Final Phase');
/*!40000 ALTER TABLE `parametre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `uuid` varchar(38) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nom_liste` varchar(255) DEFAULT NULL,
  `valeur_id` varchar(255) DEFAULT NULL,
  `FR` varchar(255) DEFAULT NULL,
  `AR` varchar(255) DEFAULT NULL,
  `EN` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES ('1','fiche03','fiche03_Q1','Date','التاريخ','Date'),('10','fiche03','fiche03_Q10','Statut professionnel actuel','الحالة المهنية الحالية','Current professional status'),('11','fiche03','fiche03_Q11','Origine de la demande','مصدر الطلب','Source of the request'),('12','fiche03','fiche03_Q12','Candidature spontanée','طلب عفوي','Spontaneous application'),('13','fiche03','fiche03_Q13','Degré d’urgence','درجة الاستعجال','Urgency level'),('14','fiche03','fiche03_Q14','Disponibilité et contraintes','التوافر والقيود','Availability and constraints'),('15','fiche03','fiche03_Q15','La personne sera appelée dans','سيتم الاتصال بالشخص في','The person will be called in'),('16','fiche03','fiche03_Q16','Date','التاريخ','Date'),('17','fiche03','fiche03_Q17','Heure','الساعة','Time'),('18','fiche04','fiche04_Q18','Avoir pris en considération ma propre situation professionnelle, scolaire et personnelle','أخذ بعين الاعتبار وضعي المهني والدراسي والشخصي','Considering my own professional, academic, and personal situation'),('19','fiche04','fiche04_Q19','Avoir reconnu un besoin d\'évaluation et de changement dans ma situation professionnelle et/ou de formation','الاعتراف بالحاجة إلى التقييم والتغيير في وضعي المهني و/أو التعليمي','Recognizing the need for assessment and change in my professional and/or educational situation'),('2','fiche03','fiche03_Q2','Nom','الاسم','Last Name'),('20','fiche04','fiche04_Q20','Avoir pris connaissance de la proposition du bilan de compétences qui sera organisé en','الاطلاع على عرض التقييم المهني الذي سيتم تنظيمه في','Having reviewed the proposal for the skills assessment that will be organized in'),('21','fiche04','fiche04_Q21','Rencontres individuelles et','لقاءات المجموعة','Individual meetings and '),('22','fiche04','fiche04_Q22','Rencontres de groupe','االلقاءات الفردية و','group meetings'),('23','fiche04','fiche04_Q23','Être conscient(e) qu\'il s\'agit pour le moment d\'un outil de réflexion et accepter les règles d\'élaboration et de mise en œuvre','أن تكون واعياً أنه في الوقت الحالي أداة للتفكير وقبول القواعد الخاصة بالإعداد والتنفيذ','Being aware that, for the moment, this is a tool for reflection and accepting the rules of development and implementation'),('24','fiche04','fiche04_Q24','Avoir rencontré le/la Conseiller.ère qui m\'accompagnera sur ce parcours et de travailler avec lui/elle ;','أن أكون قد قابلت المستشار/المستشارة الذي سيرافقني في هذا المسار وأعمل معه/معها','Having met the advisor who will accompany me on this journey and work with him/her'),('25','fiche04','fiche04_Q25','s\'engager activement dans la mise en œuvre du parcours proposé et de fournir toutes les informations utiles à la réalisation du Bilan des compétences','المشاركة بنشاط في تنفيذ المسار المقترح وتوفير جميع المعلومات اللازمة لإجراء تقييم المهارات','Actively engage in the implementation of the proposed journey and provide all necessary information for the completion of the skills assessment'),('26','fiche04','fiche04_Q26','Signature de la personne bénéficiaire','توقيع الشخص المستفيد','Signature of the beneficiary'),('27','fiche04','fiche04_Q27','Le/La conseiller.ère en emploi','المستشار/المستشارة في التوظيف','Employment advisor'),('28','fiche04','fiche04_Q28','- A  la confidentialité des informations qui émergeront pendant le parcours du Bilan des compétences ;','إلى سرية المعلومات التي ستظهر خلال مسار التقييم المهني',' to the confidentiality of the information that will emerge during the skills assessment process'),('29','fiche04','fiche04_Q29','- A soutenir le parcours avec la disponibilité de la structure, des outils, de la documentation et du professionnalisme adéquat','لدعم المسار بتوافر الهيكل، الأدوات، الوثائق، والمهنية المناسبة','To support the process with the availability of structure, tools, documentation, and adequate professionalism'),('3','fiche03','fiche03_Q3','Prénom','الاسم الأول','First Name'),('30','fiche04','fiche04_Q30','- A accompagner le / la bénéficiaire dans le parcours du Bilan','مرافقة المستفيد/ة في مسار التقييم','To support the beneficiary throughout the assessment process'),('4','fiche03','fiche03_Q4','Numéro CIN ou Carte de Séjour','رقم بطاقة الهوية أو بطاقة الإقامة','CIN number or Residence Card'),('5','fiche03','fiche03_Q5','Motif de séjour','سبب الإقامة','Reason for stay'),('6','fiche03','fiche03_Q6','Date de naissance','تاريخ الميلاد','Date of birth'),('7','fiche03','fiche03_Q7','Adresse','العنوان','Address'),('8','fiche03','fiche03_Q8','Téléphone / portable','الهاتف / المحمول','Phone / mobile'),('9','fiche03','fiche03_Q9','E-mail','البريد الإلكتروني','Email');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `random_token`
--

DROP TABLE IF EXISTS `random_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `random_token` (
  `id` varchar(38) NOT NULL,
  `token` varchar(255) NOT NULL,
  `cin` varchar(255) DEFAULT NULL,
  `nomAgent` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `date_expire` varchar(255) NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `random_token`
--

LOCK TABLES `random_token` WRITE;
/*!40000 ALTER TABLE `random_token` DISABLE KEYS */;
INSERT INTO `random_token` VALUES ('9d98c3f1-3939-4c03-995f-d02b8aaaef98','FXnCAS0UDeAHiSmm5kZyIYq3efVe4v2xOszJ1xpOpR013IUWlzIrRdJGHWj4',NULL,'2024-11-28 12:47:59','2024-11-28','2024-11-28'),('9d98fd56-af55-4d3b-a56e-d0dc82ec0be2','NTwDXcge0Xc2NwHXmN5nL0eHsSOedF08h3o2nQiH7hl17LmsZibpjZAdJLi4',NULL,'2024-11-28 15:28:29','2024-11-28','2024-11-28');
/*!40000 ALTER TABLE `random_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche10`
--

DROP TABLE IF EXISTS `reponse_fiche10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche10` (
  `id` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `entreprise` varchar(255) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `activite_principale` varchar(255) DEFAULT NULL,
  `activite_autre` varchar(255) DEFAULT NULL,
  `probleme` varchar(255) DEFAULT NULL,
  `decision_autonomie` varchar(255) DEFAULT NULL,
  `decision_autre` varchar(255) DEFAULT NULL,
  `decision_techno_outils` varchar(255) DEFAULT NULL,
  `decision_personne_entreprise` varchar(255) DEFAULT NULL,
  `decision_personne_hors_entreprise` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche10`
--

LOCK TABLES `reponse_fiche10` WRITE;
/*!40000 ALTER TABLE `reponse_fiche10` DISABLE KEYS */;
INSERT INTO `reponse_fiche10` VALUES ('9d7eccef-991a-45f0-b08c-a8278757b168','GB435675','I-ETERIA','test','activite 1','test','test','test','test','test','test','test','2024-11-15','2024-11-15');
/*!40000 ALTER TABLE `reponse_fiche10` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche11a`
--

DROP TABLE IF EXISTS `reponse_fiche11a`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche11a` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `duree` varchar(255) DEFAULT NULL,
  `tacheEffectue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`),
  KEY `uuid_condidat_2` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche11a`
--

LOCK TABLES `reponse_fiche11a` WRITE;
/*!40000 ALTER TABLE `reponse_fiche11a` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche11a` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche11a_n1`
--

DROP TABLE IF EXISTS `reponse_fiche11a_n1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche11a_n1` (
  `uuid` varchar(38) NOT NULL,
  `uuid_reponse_fiche11a` varchar(38) NOT NULL,
  `connaissance` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_reponse_fiche11a` (`uuid_reponse_fiche11a`),
  KEY `uuid_reponse_fiche11a_2` (`uuid_reponse_fiche11a`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche11a_n1`
--

LOCK TABLES `reponse_fiche11a_n1` WRITE;
/*!40000 ALTER TABLE `reponse_fiche11a_n1` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche11a_n1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche11a_n2_capa`
--

DROP TABLE IF EXISTS `reponse_fiche11a_n2_capa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche11a_n2_capa` (
  `uuid` varchar(38) NOT NULL,
  `capacite_operationnelles` varchar(255) NOT NULL,
  `uuid_reponse_fiche11a_n1` varchar(38) NOT NULL,
  `cod` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_reponse_fiche11a_n1` (`uuid_reponse_fiche11a_n1`),
  KEY `uuid_reponse_fiche11a_n1_2` (`uuid_reponse_fiche11a_n1`),
  KEY `uuid_reponse_fiche11a_n1_3` (`uuid_reponse_fiche11a_n1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche11a_n2_capa`
--

LOCK TABLES `reponse_fiche11a_n2_capa` WRITE;
/*!40000 ALTER TABLE `reponse_fiche11a_n2_capa` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche11a_n2_capa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche11a_n2_style`
--

DROP TABLE IF EXISTS `reponse_fiche11a_n2_style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche11a_n2_style` (
  `uuid` varchar(38) NOT NULL,
  `uuid_reponse_fiche11a_n1` varchar(38) NOT NULL,
  `style_personnel` varchar(255) DEFAULT NULL,
  `cod` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_reponse_fiche11a_n1` (`uuid_reponse_fiche11a_n1`),
  KEY `uuid_reponse_fiche11a_n1_2` (`uuid_reponse_fiche11a_n1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche11a_n2_style`
--

LOCK TABLES `reponse_fiche11a_n2_style` WRITE;
/*!40000 ALTER TABLE `reponse_fiche11a_n2_style` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche11a_n2_style` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche12`
--

DROP TABLE IF EXISTS `reponse_fiche12`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche12` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `formationIC_FormationQ1` varchar(255) DEFAULT NULL,
  `formationIC_connaissanceQ2` varchar(255) DEFAULT NULL,
  `histoireProfessionalle_Q3` varchar(255) DEFAULT NULL,
  `histoireProfessionalle_Q4` varchar(255) DEFAULT NULL,
  `histoireProfessionalle_Q5` varchar(255) DEFAULT NULL,
  `histoireProfessionalle_Q6` varchar(255) DEFAULT NULL,
  `histoireProfessionalle_Q7` varchar(255) DEFAULT NULL,
  `histoireProfessionalle_Q8` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche12`
--

LOCK TABLES `reponse_fiche12` WRITE;
/*!40000 ALTER TABLE `reponse_fiche12` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche12` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_1`
--

DROP TABLE IF EXISTS `reponse_fiche13_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_1` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence1_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence1_Q1_situation` varchar(255) DEFAULT NULL,
  `competence1_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence1_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence1_Q2_situation` varchar(255) DEFAULT NULL,
  `competence1_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence1_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence1_Q3_situation` varchar(255) DEFAULT NULL,
  `competence1_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence1_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence1_Q4_situation` varchar(255) DEFAULT NULL,
  `competence1_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence1_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence1_Q5_situation` varchar(255) DEFAULT NULL,
  `competence1_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence1_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence1_Q6_situation` varchar(255) DEFAULT NULL,
  `competence1_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence1_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence1_Q7_situation` varchar(255) DEFAULT NULL,
  `competence1_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence1_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence1_Q8_situation` varchar(255) DEFAULT NULL,
  `competence1_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence1_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence1_Q9_situation` varchar(255) DEFAULT NULL,
  `competence1_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence1_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence1_Q10_situation` varchar(255) DEFAULT NULL,
  `competence1_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence1_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence1_Q11_situation` varchar(255) DEFAULT NULL,
  `competence1_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_1`
--

LOCK TABLES `reponse_fiche13_1` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_10`
--

DROP TABLE IF EXISTS `reponse_fiche13_10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_10` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence10_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence10_Q1_situation` varchar(255) DEFAULT NULL,
  `competence10_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence10_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence10_Q2_situation` varchar(255) DEFAULT NULL,
  `competence10_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence10_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence10_Q3_situation` varchar(255) DEFAULT NULL,
  `competence10_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence10_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence10_Q4_situation` varchar(255) DEFAULT NULL,
  `competence10_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence10_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence10_Q5_situation` varchar(255) DEFAULT NULL,
  `competence10_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence10_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence10_Q6_situation` varchar(255) DEFAULT NULL,
  `competence10_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence10_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence10_Q7_situation` varchar(255) DEFAULT NULL,
  `competence10_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence10_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence10_Q8_situation` varchar(255) DEFAULT NULL,
  `competence10_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence10_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence10_Q9_situation` varchar(255) DEFAULT NULL,
  `competence10_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence10_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence10_Q10_situation` varchar(255) DEFAULT NULL,
  `competence10_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence10_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence10_Q11_situation` varchar(255) DEFAULT NULL,
  `competence10_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_10`
--

LOCK TABLES `reponse_fiche13_10` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_10` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_10` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_11`
--

DROP TABLE IF EXISTS `reponse_fiche13_11`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_11` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence11_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence11_Q1_situation` varchar(255) DEFAULT NULL,
  `competence11_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence11_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence11_Q2_situation` varchar(255) DEFAULT NULL,
  `competence11_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence11_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence11_Q3_situation` varchar(255) DEFAULT NULL,
  `competence11_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence11_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence11_Q4_situation` varchar(255) DEFAULT NULL,
  `competence11_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence11_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence11_Q5_situation` varchar(255) DEFAULT NULL,
  `competence11_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence11_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence11_Q6_situation` varchar(255) DEFAULT NULL,
  `competence11_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence11_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence11_Q7_situation` varchar(255) DEFAULT NULL,
  `competence11_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence11_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence11_Q8_situation` varchar(255) DEFAULT NULL,
  `competence11_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence11_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence11_Q9_situation` varchar(255) DEFAULT NULL,
  `competence11_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence11_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence11_Q10_situation` varchar(255) DEFAULT NULL,
  `competence11_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence11_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence11_Q11_situation` varchar(255) DEFAULT NULL,
  `competence11_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_11`
--

LOCK TABLES `reponse_fiche13_11` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_11` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_11` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_12`
--

DROP TABLE IF EXISTS `reponse_fiche13_12`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_12` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence12_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence12_Q1_situation` varchar(255) DEFAULT NULL,
  `competence12_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence12_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence12_Q2_situation` varchar(255) DEFAULT NULL,
  `competence12_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence12_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence12_Q3_situation` varchar(255) DEFAULT NULL,
  `competence12_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence12_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence12_Q4_situation` varchar(255) DEFAULT NULL,
  `competence12_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence12_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence12_Q5_situation` varchar(255) DEFAULT NULL,
  `competence12_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence12_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence12_Q6_situation` varchar(255) DEFAULT NULL,
  `competence12_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence12_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence12_Q7_situation` varchar(255) DEFAULT NULL,
  `competence12_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence12_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence12_Q8_situation` varchar(255) DEFAULT NULL,
  `competence12_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence12_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence12_Q9_situation` varchar(255) DEFAULT NULL,
  `competence12_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence12_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence12_Q10_situation` varchar(255) DEFAULT NULL,
  `competence12_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence12_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence12_Q11_situation` varchar(255) DEFAULT NULL,
  `competence12_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_12`
--

LOCK TABLES `reponse_fiche13_12` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_12` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_12` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_13`
--

DROP TABLE IF EXISTS `reponse_fiche13_13`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_13` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence13_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence13_Q1_situation` varchar(255) DEFAULT NULL,
  `competence13_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence13_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence13_Q2_situation` varchar(255) DEFAULT NULL,
  `competence13_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence13_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence13_Q3_situation` varchar(255) DEFAULT NULL,
  `competence13_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence13_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence13_Q4_situation` varchar(255) DEFAULT NULL,
  `competence13_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence13_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence13_Q5_situation` varchar(255) DEFAULT NULL,
  `competence13_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence13_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence13_Q6_situation` varchar(255) DEFAULT NULL,
  `competence13_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence13_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence13_Q7_situation` varchar(255) DEFAULT NULL,
  `competence13_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence13_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence13_Q8_situation` varchar(255) DEFAULT NULL,
  `competence13_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence13_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence13_Q9_situation` varchar(255) DEFAULT NULL,
  `competence13_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence13_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence13_Q10_situation` varchar(255) DEFAULT NULL,
  `competence13_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence13_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence13_Q11_situation` varchar(255) DEFAULT NULL,
  `competence13_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_13`
--

LOCK TABLES `reponse_fiche13_13` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_13` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_13` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_14`
--

DROP TABLE IF EXISTS `reponse_fiche13_14`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_14` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence14_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence14_Q1_situation` varchar(255) DEFAULT NULL,
  `competence14_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence14_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence14_Q2_situation` varchar(255) DEFAULT NULL,
  `competence14_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence14_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence14_Q3_situation` varchar(255) DEFAULT NULL,
  `competence14_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence14_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence14_Q4_situation` varchar(255) DEFAULT NULL,
  `competence14_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence14_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence14_Q5_situation` varchar(255) DEFAULT NULL,
  `competence14_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence14_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence14_Q6_situation` varchar(255) DEFAULT NULL,
  `competence14_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence14_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence14_Q7_situation` varchar(255) DEFAULT NULL,
  `competence14_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence14_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence14_Q8_situation` varchar(255) DEFAULT NULL,
  `competence14_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence14_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence14_Q9_situation` varchar(255) DEFAULT NULL,
  `competence14_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence14_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence14_Q10_situation` varchar(255) DEFAULT NULL,
  `competence14_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence14_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence14_Q11_situation` varchar(255) DEFAULT NULL,
  `competence14_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_14`
--

LOCK TABLES `reponse_fiche13_14` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_14` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_14` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_15`
--

DROP TABLE IF EXISTS `reponse_fiche13_15`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_15` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence15_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence15_Q1_situation` varchar(255) DEFAULT NULL,
  `competence15_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence15_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence15_Q2_situation` varchar(255) DEFAULT NULL,
  `competence15_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence15_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence15_Q3_situation` varchar(255) DEFAULT NULL,
  `competence15_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence15_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence15_Q4_situation` varchar(255) DEFAULT NULL,
  `competence15_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence15_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence15_Q5_situation` varchar(255) DEFAULT NULL,
  `competence15_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence15_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence15_Q6_situation` varchar(255) DEFAULT NULL,
  `competence15_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence15_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence15_Q7_situation` varchar(255) DEFAULT NULL,
  `competence15_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence15_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence15_Q8_situation` varchar(255) DEFAULT NULL,
  `competence15_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence15_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence15_Q9_situation` varchar(255) DEFAULT NULL,
  `competence15_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence15_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence15_Q10_situation` varchar(255) DEFAULT NULL,
  `competence15_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence15_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence15_Q11_situation` varchar(255) DEFAULT NULL,
  `competence15_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_15`
--

LOCK TABLES `reponse_fiche13_15` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_15` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_15` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_2`
--

DROP TABLE IF EXISTS `reponse_fiche13_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_2` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence2_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence2_Q1_situation` varchar(255) DEFAULT NULL,
  `competence2_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence2_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence2_Q2_situation` varchar(255) DEFAULT NULL,
  `competence2_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence2_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence2_Q3_situation` varchar(255) DEFAULT NULL,
  `competence2_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence2_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence2_Q4_situation` varchar(255) DEFAULT NULL,
  `competence2_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence2_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence2_Q5_situation` varchar(255) DEFAULT NULL,
  `competence2_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence2_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence2_Q6_situation` varchar(255) DEFAULT NULL,
  `competence2_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence2_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence2_Q7_situation` varchar(255) DEFAULT NULL,
  `competence2_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence2_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence2_Q8_situation` varchar(255) DEFAULT NULL,
  `competence2_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence2_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence2_Q9_situation` varchar(255) DEFAULT NULL,
  `competence2_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence2_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence2_Q10_situation` varchar(255) DEFAULT NULL,
  `competence2_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence2_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence2_Q11_situation` varchar(255) DEFAULT NULL,
  `competence2_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_2`
--

LOCK TABLES `reponse_fiche13_2` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_3`
--

DROP TABLE IF EXISTS `reponse_fiche13_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_3` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence3_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence3_Q1_situation` varchar(255) DEFAULT NULL,
  `competence3_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence3_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence3_Q2_situation` varchar(255) DEFAULT NULL,
  `competence3_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence3_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence3_Q3_situation` varchar(255) DEFAULT NULL,
  `competence3_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence3_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence3_Q4_situation` varchar(255) DEFAULT NULL,
  `competence3_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence3_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence3_Q5_situation` varchar(255) DEFAULT NULL,
  `competence3_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence3_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence3_Q6_situation` varchar(255) DEFAULT NULL,
  `competence3_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence3_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence3_Q7_situation` varchar(255) DEFAULT NULL,
  `competence3_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence3_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence3_Q8_situation` varchar(255) DEFAULT NULL,
  `competence3_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence3_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence3_Q9_situation` varchar(255) DEFAULT NULL,
  `competence3_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence3_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence3_Q10_situation` varchar(255) DEFAULT NULL,
  `competence3_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence3_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence3_Q11_situation` varchar(255) DEFAULT NULL,
  `competence3_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_3`
--

LOCK TABLES `reponse_fiche13_3` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_4`
--

DROP TABLE IF EXISTS `reponse_fiche13_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_4` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence4_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence4_Q1_situation` varchar(255) DEFAULT NULL,
  `competence4_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence4_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence4_Q2_situation` varchar(255) DEFAULT NULL,
  `competence4_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence4_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence4_Q3_situation` varchar(255) DEFAULT NULL,
  `competence4_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence4_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence4_Q4_situation` varchar(255) DEFAULT NULL,
  `competence4_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence4_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence4_Q5_situation` varchar(255) DEFAULT NULL,
  `competence4_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence4_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence4_Q6_situation` varchar(255) DEFAULT NULL,
  `competence4_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence4_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence4_Q7_situation` varchar(255) DEFAULT NULL,
  `competence4_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence4_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence4_Q8_situation` varchar(255) DEFAULT NULL,
  `competence4_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence4_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence4_Q9_situation` varchar(255) DEFAULT NULL,
  `competence4_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence4_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence4_Q10_situation` varchar(255) DEFAULT NULL,
  `competence4_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence4_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence4_Q11_situation` varchar(255) DEFAULT NULL,
  `competence4_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_4`
--

LOCK TABLES `reponse_fiche13_4` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_5`
--

DROP TABLE IF EXISTS `reponse_fiche13_5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_5` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence5_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence5_Q1_situation` varchar(255) DEFAULT NULL,
  `competence5_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence5_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence5_Q2_situation` varchar(255) DEFAULT NULL,
  `competence5_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence5_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence5_Q3_situation` varchar(255) DEFAULT NULL,
  `competence5_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence5_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence5_Q4_situation` varchar(255) DEFAULT NULL,
  `competence5_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence5_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence5_Q5_situation` varchar(255) DEFAULT NULL,
  `competence5_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence5_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence5_Q6_situation` varchar(255) DEFAULT NULL,
  `competence5_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence5_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence5_Q7_situation` varchar(255) DEFAULT NULL,
  `competence5_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence5_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence5_Q8_situation` varchar(255) DEFAULT NULL,
  `competence5_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence5_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence5_Q9_situation` varchar(255) DEFAULT NULL,
  `competence5_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence5_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence5_Q10_situation` varchar(255) DEFAULT NULL,
  `competence5_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence5_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence5_Q11_situation` varchar(255) DEFAULT NULL,
  `competence5_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_5`
--

LOCK TABLES `reponse_fiche13_5` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_5` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_5` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_6`
--

DROP TABLE IF EXISTS `reponse_fiche13_6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_6` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence6_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence6_Q1_situation` varchar(255) DEFAULT NULL,
  `competence6_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence6_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence6_Q2_situation` varchar(255) DEFAULT NULL,
  `competence6_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence6_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence6_Q3_situation` varchar(255) DEFAULT NULL,
  `competence6_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence6_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence6_Q4_situation` varchar(255) DEFAULT NULL,
  `competence6_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence6_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence6_Q5_situation` varchar(255) DEFAULT NULL,
  `competence6_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence6_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence6_Q6_situation` varchar(255) DEFAULT NULL,
  `competence6_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence6_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence6_Q7_situation` varchar(255) DEFAULT NULL,
  `competence6_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence6_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence6_Q8_situation` varchar(255) DEFAULT NULL,
  `competence6_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence6_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence6_Q9_situation` varchar(255) DEFAULT NULL,
  `competence6_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence6_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence6_Q10_situation` varchar(255) DEFAULT NULL,
  `competence6_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence6_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence6_Q11_situation` varchar(255) DEFAULT NULL,
  `competence6_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_6`
--

LOCK TABLES `reponse_fiche13_6` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_6` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_6` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_7`
--

DROP TABLE IF EXISTS `reponse_fiche13_7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_7` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence7_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence7_Q1_situation` varchar(255) DEFAULT NULL,
  `competence7_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence7_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence7_Q2_situation` varchar(255) DEFAULT NULL,
  `competence7_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence7_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence7_Q3_situation` varchar(255) DEFAULT NULL,
  `competence7_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence7_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence7_Q4_situation` varchar(255) DEFAULT NULL,
  `competence7_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence7_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence7_Q5_situation` varchar(255) DEFAULT NULL,
  `competence7_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence7_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence7_Q6_situation` varchar(255) DEFAULT NULL,
  `competence7_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence7_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence7_Q7_situation` varchar(255) DEFAULT NULL,
  `competence7_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence7_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence7_Q8_situation` varchar(255) DEFAULT NULL,
  `competence7_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence7_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence7_Q9_situation` varchar(255) DEFAULT NULL,
  `competence7_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence7_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence7_Q10_situation` varchar(255) DEFAULT NULL,
  `competence7_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence7_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence7_Q11_situation` varchar(255) DEFAULT NULL,
  `competence7_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_7`
--

LOCK TABLES `reponse_fiche13_7` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_7` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_7` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_8`
--

DROP TABLE IF EXISTS `reponse_fiche13_8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_8` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence8_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence8_Q1_situation` varchar(255) DEFAULT NULL,
  `competence8_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence8_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence8_Q2_situation` varchar(255) DEFAULT NULL,
  `competence8_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence8_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence8_Q3_situation` varchar(255) DEFAULT NULL,
  `competence8_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence8_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence8_Q4_situation` varchar(255) DEFAULT NULL,
  `competence8_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence8_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence8_Q5_situation` varchar(255) DEFAULT NULL,
  `competence8_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence8_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence8_Q6_situation` varchar(255) DEFAULT NULL,
  `competence8_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence8_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence8_Q7_situation` varchar(255) DEFAULT NULL,
  `competence8_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence8_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence8_Q8_situation` varchar(255) DEFAULT NULL,
  `competence8_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence8_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence8_Q9_situation` varchar(255) DEFAULT NULL,
  `competence8_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence8_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence8_Q10_situation` varchar(255) DEFAULT NULL,
  `competence8_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence8_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence8_Q11_situation` varchar(255) DEFAULT NULL,
  `competence8_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_8`
--

LOCK TABLES `reponse_fiche13_8` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_8` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_8` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_9`
--

DROP TABLE IF EXISTS `reponse_fiche13_9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_9` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence9_Q1_outilspratique` varchar(255) DEFAULT NULL,
  `competence9_Q1_situation` varchar(255) DEFAULT NULL,
  `competence9_Q1_niveau` int(11) NOT NULL DEFAULT 0,
  `competence9_Q2_outilspratique` varchar(255) DEFAULT NULL,
  `competence9_Q2_situation` varchar(255) DEFAULT NULL,
  `competence9_Q2_niveau` int(11) NOT NULL DEFAULT 0,
  `competence9_Q3_outilspratique` varchar(255) DEFAULT NULL,
  `competence9_Q3_situation` varchar(255) DEFAULT NULL,
  `competence9_Q3_niveau` int(11) NOT NULL DEFAULT 0,
  `competence9_Q4_outilspratique` varchar(255) DEFAULT NULL,
  `competence9_Q4_situation` varchar(255) DEFAULT NULL,
  `competence9_Q4_niveau` int(11) NOT NULL DEFAULT 0,
  `competence9_Q5_outilspratique` varchar(255) DEFAULT NULL,
  `competence9_Q5_situation` varchar(255) DEFAULT NULL,
  `competence9_Q5_niveau` int(11) NOT NULL DEFAULT 0,
  `competence9_Q6_outilspratique` varchar(255) DEFAULT NULL,
  `competence9_Q6_situation` varchar(255) DEFAULT NULL,
  `competence9_Q6_niveau` int(11) NOT NULL DEFAULT 0,
  `competence9_Q7_outilspratique` varchar(255) DEFAULT NULL,
  `competence9_Q7_situation` varchar(255) DEFAULT NULL,
  `competence9_Q7_niveau` int(11) NOT NULL DEFAULT 0,
  `competence9_Q8_outilspratique` varchar(255) DEFAULT NULL,
  `competence9_Q8_situation` varchar(255) DEFAULT NULL,
  `competence9_Q8_niveau` int(11) NOT NULL DEFAULT 0,
  `competence9_Q9_outilspratique` varchar(255) DEFAULT NULL,
  `competence9_Q9_situation` varchar(255) DEFAULT NULL,
  `competence9_Q9_niveau` int(11) NOT NULL DEFAULT 0,
  `competence9_Q10_outilspratique` varchar(255) DEFAULT NULL,
  `competence9_Q10_situation` varchar(255) DEFAULT NULL,
  `competence9_Q10_niveau` int(11) NOT NULL DEFAULT 0,
  `competence9_Q11_outilspratique` varchar(255) DEFAULT NULL,
  `competence9_Q11_situation` varchar(255) DEFAULT NULL,
  `competence9_Q11_niveau` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_9`
--

LOCK TABLES `reponse_fiche13_9` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_9` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_9` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche13_legende`
--

DROP TABLE IF EXISTS `reponse_fiche13_legende`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche13_legende` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competenceDevlopper1` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper2` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper3` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper4` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper5` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper6` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper7` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper8` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper9` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper10` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper11` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper12` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper13` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper14` int(11) NOT NULL DEFAULT 0,
  `competenceDevlopper15` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir1` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir2` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir3` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir4` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir5` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir6` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir7` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir8` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir9` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir10` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir11` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir12` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir13` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir14` int(11) NOT NULL DEFAULT 0,
  `competenceAimeriezAcquerir15` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche13_legende`
--

LOCK TABLES `reponse_fiche13_legende` WRITE;
/*!40000 ALTER TABLE `reponse_fiche13_legende` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche13_legende` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche14`
--

DROP TABLE IF EXISTS `reponse_fiche14`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche14` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `noteQ1` int(11) NOT NULL DEFAULT 0,
  `noteQ2` int(11) NOT NULL DEFAULT 0,
  `noteQ3` int(11) NOT NULL DEFAULT 0,
  `noteQ4` int(11) NOT NULL DEFAULT 0,
  `noteQ5` int(11) NOT NULL DEFAULT 0,
  `noteQ6` int(11) NOT NULL DEFAULT 0,
  `noteQ7` int(11) NOT NULL DEFAULT 0,
  `noteQ8` int(11) NOT NULL DEFAULT 0,
  `noteQ9` int(11) NOT NULL DEFAULT 0,
  `noteQ10` int(11) NOT NULL DEFAULT 0,
  `noteQ11` int(11) NOT NULL DEFAULT 0,
  `noteQ12` int(11) NOT NULL DEFAULT 0,
  `noteQ13` int(11) NOT NULL DEFAULT 0,
  `noteQ14` int(11) NOT NULL DEFAULT 0,
  `noteQ15` int(11) NOT NULL DEFAULT 0,
  `noteQ16` int(11) NOT NULL DEFAULT 0,
  `noteQ17` int(11) NOT NULL DEFAULT 0,
  `noteQ18` int(11) NOT NULL DEFAULT 0,
  `noteQ19` int(11) NOT NULL DEFAULT 0,
  `noteQ20` int(11) NOT NULL DEFAULT 0,
  `noteQ21` int(11) NOT NULL DEFAULT 0,
  `noteQ22` int(11) NOT NULL DEFAULT 0,
  `noteQ23` int(11) NOT NULL DEFAULT 0,
  `noteQ24` int(11) NOT NULL DEFAULT 0,
  `noteQ25` int(11) NOT NULL DEFAULT 0,
  `noteQ26` int(11) NOT NULL DEFAULT 0,
  `noteQ27` int(11) NOT NULL DEFAULT 0,
  `noteQ28` int(11) NOT NULL DEFAULT 0,
  `noteQ29` int(11) NOT NULL DEFAULT 0,
  `noteQ30` int(11) NOT NULL DEFAULT 0,
  `noteQ31` int(11) NOT NULL DEFAULT 0,
  `noteQ32` int(11) NOT NULL DEFAULT 0,
  `noteQ33` int(11) NOT NULL DEFAULT 0,
  `noteQ34` int(11) NOT NULL DEFAULT 0,
  `noteQ35` int(11) NOT NULL DEFAULT 0,
  `noteQ36` int(11) NOT NULL DEFAULT 0,
  `noteQ37` int(11) NOT NULL DEFAULT 0,
  `noteQ38` int(11) NOT NULL DEFAULT 0,
  `noteQ39` int(11) NOT NULL DEFAULT 0,
  `noteQ40` int(11) NOT NULL DEFAULT 0,
  `noteQ41` int(11) NOT NULL DEFAULT 0,
  `noteQ42` int(11) NOT NULL DEFAULT 0,
  `noteQ43` int(11) NOT NULL DEFAULT 0,
  `noteQ44` int(11) NOT NULL DEFAULT 0,
  `noteQ45` int(11) NOT NULL DEFAULT 0,
  `noteQ46` int(11) NOT NULL DEFAULT 0,
  `noteQ47` int(11) NOT NULL DEFAULT 0,
  `noteQ48` int(11) NOT NULL DEFAULT 0,
  `noteQ49` int(11) NOT NULL DEFAULT 0,
  `noteQ50` int(11) NOT NULL DEFAULT 0,
  `noteQ51` int(11) NOT NULL DEFAULT 0,
  `noteQ52` int(11) NOT NULL DEFAULT 0,
  `noteQ53` int(11) NOT NULL DEFAULT 0,
  `noteQ54` int(11) NOT NULL DEFAULT 0,
  `noteQ55` int(11) NOT NULL DEFAULT 0,
  `noteQ56` int(11) NOT NULL DEFAULT 0,
  `noteQ57` int(11) NOT NULL DEFAULT 0,
  `noteQ58` int(11) NOT NULL DEFAULT 0,
  `noteQ59` int(11) NOT NULL DEFAULT 0,
  `noteQ60` int(11) NOT NULL DEFAULT 0,
  `noteQ61` int(11) NOT NULL DEFAULT 0,
  `noteQ62` int(11) NOT NULL DEFAULT 0,
  `noteQ63` int(11) NOT NULL DEFAULT 0,
  `noteQ64` int(11) NOT NULL DEFAULT 0,
  `noteQ65` int(11) NOT NULL DEFAULT 0,
  `noteQ66` int(11) NOT NULL DEFAULT 0,
  `noteQ67` int(11) NOT NULL DEFAULT 0,
  `noteQ68` int(11) NOT NULL DEFAULT 0,
  `noteQ69` int(11) NOT NULL DEFAULT 0,
  `noteQ70` int(11) NOT NULL DEFAULT 0,
  `noteQ1Group` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche14`
--

LOCK TABLES `reponse_fiche14` WRITE;
/*!40000 ALTER TABLE `reponse_fiche14` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche14` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche15`
--

DROP TABLE IF EXISTS `reponse_fiche15`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche15` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `noteQ1` int(11) NOT NULL DEFAULT 0,
  `noteQ2` int(11) NOT NULL DEFAULT 0,
  `noteQ3` int(11) NOT NULL DEFAULT 0,
  `noteQ4` int(11) NOT NULL DEFAULT 0,
  `noteQ5` int(11) NOT NULL DEFAULT 0,
  `noteQ6` int(11) NOT NULL DEFAULT 0,
  `noteQ7` int(11) NOT NULL DEFAULT 0,
  `noteQ8` int(11) NOT NULL DEFAULT 0,
  `noteQ9` int(11) NOT NULL DEFAULT 0,
  `noteQ10` int(11) NOT NULL DEFAULT 0,
  `noteQ11` int(11) NOT NULL DEFAULT 0,
  `noteQ12` int(11) NOT NULL DEFAULT 0,
  `noteQ13` int(11) NOT NULL DEFAULT 0,
  `noteQ14` int(11) NOT NULL DEFAULT 0,
  `noteQ15` int(11) NOT NULL DEFAULT 0,
  `noteQ16` int(11) NOT NULL DEFAULT 0,
  `noteQ17` int(11) NOT NULL DEFAULT 0,
  `noteQ18` int(11) NOT NULL DEFAULT 0,
  `noteQ19` int(11) NOT NULL DEFAULT 0,
  `noteQ20` int(11) NOT NULL DEFAULT 0,
  `noteQ21` int(11) NOT NULL DEFAULT 0,
  `noteQ22` int(11) NOT NULL DEFAULT 0,
  `noteQ23` int(11) NOT NULL DEFAULT 0,
  `noteQ24` int(11) NOT NULL DEFAULT 0,
  `noteQ25` int(11) NOT NULL DEFAULT 0,
  `noteQ26` int(11) NOT NULL DEFAULT 0,
  `noteQ27` int(11) NOT NULL DEFAULT 0,
  `noteQ28` int(11) NOT NULL DEFAULT 0,
  `noteQ29` int(11) NOT NULL DEFAULT 0,
  `noteQ30` int(11) NOT NULL DEFAULT 0,
  `noteQ31` int(11) NOT NULL DEFAULT 0,
  `noteQ32` int(11) NOT NULL DEFAULT 0,
  `noteQ33` int(11) NOT NULL DEFAULT 0,
  `noteQ34` int(11) NOT NULL DEFAULT 0,
  `noteQ35` int(11) NOT NULL DEFAULT 0,
  `noteQ36` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche15`
--

LOCK TABLES `reponse_fiche15` WRITE;
/*!40000 ALTER TABLE `reponse_fiche15` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche15` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche16`
--

DROP TABLE IF EXISTS `reponse_fiche16`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche16` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `noteQ1` int(11) NOT NULL DEFAULT 0,
  `noteQ2` int(11) NOT NULL DEFAULT 0,
  `noteQ3` int(11) NOT NULL DEFAULT 0,
  `noteQ4` int(11) NOT NULL DEFAULT 0,
  `noteQ5` int(11) NOT NULL DEFAULT 0,
  `noteQ6` int(11) NOT NULL DEFAULT 0,
  `noteQ7` int(11) NOT NULL DEFAULT 0,
  `noteQ8` int(11) NOT NULL DEFAULT 0,
  `noteQ9` int(11) NOT NULL DEFAULT 0,
  `noteQ10` int(11) NOT NULL DEFAULT 0,
  `noteQ11` int(11) NOT NULL DEFAULT 0,
  `noteQ12` int(11) NOT NULL DEFAULT 0,
  `noteQ13` int(11) NOT NULL DEFAULT 0,
  `noteQ14` int(11) NOT NULL DEFAULT 0,
  `noteQ15` int(11) NOT NULL DEFAULT 0,
  `noteQ16` int(11) NOT NULL DEFAULT 0,
  `noteQ17` int(11) NOT NULL DEFAULT 0,
  `noteQ18` int(11) NOT NULL DEFAULT 0,
  `noteQ19` int(11) NOT NULL DEFAULT 0,
  `noteQ20` int(11) NOT NULL DEFAULT 0,
  `noteQ21` int(11) NOT NULL DEFAULT 0,
  `noteQ22` int(11) NOT NULL DEFAULT 0,
  `noteQ23` int(11) NOT NULL DEFAULT 0,
  `noteQ24` int(11) NOT NULL DEFAULT 0,
  `noteQ25` int(11) NOT NULL DEFAULT 0,
  `noteQ26` int(11) NOT NULL DEFAULT 0,
  `noteQ27` int(11) NOT NULL DEFAULT 0,
  `noteQ28` int(11) NOT NULL DEFAULT 0,
  `noteQ29` int(11) NOT NULL DEFAULT 0,
  `noteQ30` int(11) NOT NULL DEFAULT 0,
  `noteQ31` int(11) NOT NULL DEFAULT 0,
  `noteQ32` int(11) NOT NULL DEFAULT 0,
  `noteQ33` int(11) NOT NULL DEFAULT 0,
  `noteQ34` int(11) NOT NULL DEFAULT 0,
  `noteQ35` int(11) NOT NULL DEFAULT 0,
  `noteQ36` int(11) NOT NULL DEFAULT 0,
  `noteQ37` int(11) NOT NULL DEFAULT 0,
  `noteQ38` int(11) NOT NULL DEFAULT 0,
  `noteQ39` int(11) NOT NULL DEFAULT 0,
  `noteQ40` int(11) NOT NULL DEFAULT 0,
  `noteQ41` int(11) NOT NULL DEFAULT 0,
  `noteQ42` int(11) NOT NULL DEFAULT 0,
  `noteQ43` int(11) NOT NULL DEFAULT 0,
  `reponseQ44` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche16`
--

LOCK TABLES `reponse_fiche16` WRITE;
/*!40000 ALTER TABLE `reponse_fiche16` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche16` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche17b`
--

DROP TABLE IF EXISTS `reponse_fiche17b`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche17b` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `niveauAime1` int(11) NOT NULL DEFAULT 0,
  `numeroCol1` int(11) NOT NULL DEFAULT 0,
  `competence2` int(11) NOT NULL DEFAULT 0,
  `numeroCol2` int(11) NOT NULL DEFAULT 0,
  `competence3` int(11) NOT NULL DEFAULT 0,
  `numeroCol3` int(11) NOT NULL DEFAULT 0,
  `competence4` int(11) NOT NULL DEFAULT 0,
  `numeroCol4` int(11) NOT NULL DEFAULT 0,
  `competence5` int(11) NOT NULL DEFAULT 0,
  `numeroCol5` int(11) NOT NULL DEFAULT 0,
  `competence6` int(11) NOT NULL DEFAULT 0,
  `numeroCol6` int(11) NOT NULL DEFAULT 0,
  `competence7` int(11) NOT NULL DEFAULT 0,
  `numeroCol7` int(11) NOT NULL DEFAULT 0,
  `competence8` int(11) NOT NULL DEFAULT 0,
  `numeroCol8` int(11) NOT NULL DEFAULT 0,
  `competence9` int(11) NOT NULL DEFAULT 0,
  `numeroCol9` int(11) NOT NULL DEFAULT 0,
  `competence10` int(11) NOT NULL DEFAULT 0,
  `numeroCol10` int(11) NOT NULL DEFAULT 0,
  `competence11` int(11) NOT NULL DEFAULT 0,
  `numeroCol11` int(11) NOT NULL DEFAULT 0,
  `competence12` int(11) NOT NULL DEFAULT 0,
  `numeroCol12` int(11) NOT NULL DEFAULT 0,
  `competence13` int(11) NOT NULL DEFAULT 0,
  `numeroCol13` int(11) NOT NULL DEFAULT 0,
  `competence14` int(11) NOT NULL DEFAULT 0,
  `numeroCol14` int(11) NOT NULL DEFAULT 0,
  `competence15` int(11) NOT NULL DEFAULT 0,
  `numeroCol15` int(11) NOT NULL DEFAULT 0,
  `competence16` int(11) NOT NULL DEFAULT 0,
  `numeroCol16` int(11) NOT NULL DEFAULT 0,
  `competence17` int(11) NOT NULL DEFAULT 0,
  `numeroCol17` int(11) NOT NULL DEFAULT 0,
  `competence18` int(11) NOT NULL DEFAULT 0,
  `numeroCol18` int(11) NOT NULL DEFAULT 0,
  `competence19` int(11) NOT NULL DEFAULT 0,
  `numeroCol19` int(11) NOT NULL DEFAULT 0,
  `competence20` int(11) NOT NULL DEFAULT 0,
  `numeroCol20` int(11) NOT NULL DEFAULT 0,
  `competence21` int(11) NOT NULL DEFAULT 0,
  `numeroCol21` int(11) NOT NULL DEFAULT 0,
  `competence22` int(11) NOT NULL DEFAULT 0,
  `numeroCol22` int(11) NOT NULL DEFAULT 0,
  `competence23` int(11) NOT NULL DEFAULT 0,
  `numeroCol23` int(11) NOT NULL DEFAULT 0,
  `competence24` int(11) NOT NULL DEFAULT 0,
  `numeroCol24` int(11) NOT NULL DEFAULT 0,
  `competence25` int(11) NOT NULL DEFAULT 0,
  `numeroCol25` int(11) NOT NULL DEFAULT 0,
  `competence26` int(11) NOT NULL DEFAULT 0,
  `numeroCol26` int(11) NOT NULL DEFAULT 0,
  `competence27` int(11) NOT NULL DEFAULT 0,
  `numeroCol27` int(11) NOT NULL DEFAULT 0,
  `competence28` int(11) NOT NULL DEFAULT 0,
  `numeroCol28` int(11) NOT NULL DEFAULT 0,
  `competence29` int(11) NOT NULL DEFAULT 0,
  `numeroCol29` int(11) NOT NULL DEFAULT 0,
  `competence30` int(11) NOT NULL DEFAULT 0,
  `numeroCol30` int(11) NOT NULL DEFAULT 0,
  `competence31` int(11) NOT NULL DEFAULT 0,
  `numeroCol31` int(11) NOT NULL DEFAULT 0,
  `competence32` int(11) NOT NULL DEFAULT 0,
  `numeroCol32` int(11) NOT NULL DEFAULT 0,
  `competence33` int(11) NOT NULL DEFAULT 0,
  `numeroCol33` int(11) NOT NULL DEFAULT 0,
  `competence34` int(11) NOT NULL DEFAULT 0,
  `numeroCol34` int(11) NOT NULL DEFAULT 0,
  `competence35` int(11) NOT NULL DEFAULT 0,
  `numeroCol35` int(11) NOT NULL DEFAULT 0,
  `competence36` int(11) NOT NULL DEFAULT 0,
  `numeroCol36` int(11) NOT NULL DEFAULT 0,
  `competence37` int(11) NOT NULL DEFAULT 0,
  `numeroCol37` int(11) NOT NULL DEFAULT 0,
  `competence38` int(11) NOT NULL DEFAULT 0,
  `numeroCol38` int(11) NOT NULL DEFAULT 0,
  `competence39` int(11) NOT NULL DEFAULT 0,
  `numeroCol39` int(11) NOT NULL DEFAULT 0,
  `competence40` int(11) NOT NULL DEFAULT 0,
  `numeroCol40` int(11) NOT NULL DEFAULT 0,
  `competence41` int(11) NOT NULL DEFAULT 0,
  `numeroCol41` int(11) NOT NULL DEFAULT 0,
  `competence42` int(11) NOT NULL DEFAULT 0,
  `numeroCol42` int(11) NOT NULL DEFAULT 0,
  `competence43` int(11) NOT NULL DEFAULT 0,
  `numeroCol43` int(11) NOT NULL DEFAULT 0,
  `competence44` int(11) NOT NULL DEFAULT 0,
  `numeroCol44` int(11) NOT NULL DEFAULT 0,
  `competence45` int(11) NOT NULL DEFAULT 0,
  `numeroCol45` int(11) NOT NULL DEFAULT 0,
  `competence46` int(11) NOT NULL DEFAULT 0,
  `numeroCol46` int(11) NOT NULL DEFAULT 0,
  `competence47` int(11) NOT NULL DEFAULT 0,
  `numeroCol47` int(11) NOT NULL DEFAULT 0,
  `competence48` int(11) NOT NULL DEFAULT 0,
  `numeroCol48` int(11) NOT NULL DEFAULT 0,
  `competence49` int(11) NOT NULL DEFAULT 0,
  `numeroCol49` int(11) NOT NULL DEFAULT 0,
  `competence50` int(11) NOT NULL DEFAULT 0,
  `numeroCol50` int(11) NOT NULL DEFAULT 0,
  `competence51` int(11) NOT NULL DEFAULT 0,
  `numeroCol51` int(11) NOT NULL DEFAULT 0,
  `competence52` int(11) NOT NULL DEFAULT 0,
  `numeroCol52` int(11) NOT NULL DEFAULT 0,
  `competence53` int(11) NOT NULL DEFAULT 0,
  `numeroCol53` int(11) NOT NULL DEFAULT 0,
  `competence54` int(11) NOT NULL DEFAULT 0,
  `numeroCol54` int(11) NOT NULL DEFAULT 0,
  `competence55` int(11) NOT NULL DEFAULT 0,
  `numeroCol55` int(11) NOT NULL DEFAULT 0,
  `competence56` int(11) NOT NULL DEFAULT 0,
  `numeroCol56` int(11) NOT NULL DEFAULT 0,
  `competence57` int(11) NOT NULL DEFAULT 0,
  `numeroCol57` int(11) NOT NULL DEFAULT 0,
  `competence58` int(11) NOT NULL DEFAULT 0,
  `numeroCol58` int(11) NOT NULL DEFAULT 0,
  `competence59` int(11) NOT NULL DEFAULT 0,
  `numeroCol59` int(11) NOT NULL DEFAULT 0,
  `competence60` int(11) NOT NULL DEFAULT 0,
  `numeroCol60` int(11) NOT NULL DEFAULT 0,
  `competence61` int(11) NOT NULL DEFAULT 0,
  `numeroCol61` int(11) NOT NULL DEFAULT 0,
  `competence62` int(11) NOT NULL DEFAULT 0,
  `numeroCol62` int(11) NOT NULL DEFAULT 0,
  `competence63` int(11) NOT NULL DEFAULT 0,
  `numeroCol63` int(11) NOT NULL DEFAULT 0,
  `competence64` int(11) NOT NULL DEFAULT 0,
  `numeroCol64` int(11) NOT NULL DEFAULT 0,
  `competence65` int(11) NOT NULL DEFAULT 0,
  `numeroCol65` int(11) NOT NULL DEFAULT 0,
  `competence66` int(11) NOT NULL DEFAULT 0,
  `numeroCol66` int(11) NOT NULL DEFAULT 0,
  `competence67` int(11) NOT NULL DEFAULT 0,
  `numeroCol67` int(11) NOT NULL DEFAULT 0,
  `competence68` int(11) NOT NULL DEFAULT 0,
  `numeroCol68` int(11) NOT NULL DEFAULT 0,
  `competence69` int(11) NOT NULL DEFAULT 0,
  `numeroCol69` int(11) NOT NULL DEFAULT 0,
  `competence70` int(11) NOT NULL DEFAULT 0,
  `numeroCol70` int(11) NOT NULL DEFAULT 0,
  `competence71` int(11) NOT NULL DEFAULT 0,
  `numeroCol71` int(11) NOT NULL DEFAULT 0,
  `competence72` int(11) NOT NULL DEFAULT 0,
  `numeroCol72` int(11) NOT NULL DEFAULT 0,
  `competence73` int(11) NOT NULL DEFAULT 0,
  `numeroCol73` int(11) NOT NULL DEFAULT 0,
  `competence74` int(11) NOT NULL DEFAULT 0,
  `numeroCol74` int(11) NOT NULL DEFAULT 0,
  `competence75` int(11) NOT NULL DEFAULT 0,
  `numeroCol75` int(11) NOT NULL DEFAULT 0,
  `competence76` int(11) NOT NULL DEFAULT 0,
  `numeroCol76` int(11) NOT NULL DEFAULT 0,
  `competence77` int(11) NOT NULL DEFAULT 0,
  `numeroCol77` int(11) NOT NULL DEFAULT 0,
  `competence78` int(11) NOT NULL DEFAULT 0,
  `numeroCol78` int(11) NOT NULL DEFAULT 0,
  `competence79` int(11) NOT NULL DEFAULT 0,
  `numeroCol79` int(11) NOT NULL DEFAULT 0,
  `competence80` int(11) NOT NULL DEFAULT 0,
  `numeroCol80` int(11) NOT NULL DEFAULT 0,
  `competence81` int(11) NOT NULL DEFAULT 0,
  `numeroCol81` int(11) NOT NULL DEFAULT 0,
  `competence82` int(11) NOT NULL DEFAULT 0,
  `numeroCol82` int(11) NOT NULL DEFAULT 0,
  `competence83` int(11) NOT NULL DEFAULT 0,
  `numeroCol83` int(11) NOT NULL DEFAULT 0,
  `competence84` int(11) NOT NULL DEFAULT 0,
  `numeroCol84` int(11) NOT NULL DEFAULT 0,
  `competence85` int(11) NOT NULL DEFAULT 0,
  `numeroCol85` int(11) NOT NULL DEFAULT 0,
  `competence86` int(11) NOT NULL DEFAULT 0,
  `numeroCol86` int(11) NOT NULL DEFAULT 0,
  `competence87` int(11) NOT NULL DEFAULT 0,
  `numeroCol87` int(11) NOT NULL DEFAULT 0,
  `competence88` int(11) NOT NULL DEFAULT 0,
  `numeroCol88` int(11) NOT NULL DEFAULT 0,
  `competence89` int(11) NOT NULL DEFAULT 0,
  `numeroCol89` int(11) NOT NULL DEFAULT 0,
  `competence90` int(11) NOT NULL DEFAULT 0,
  `numeroCol90` int(11) NOT NULL DEFAULT 0,
  `competence91` int(11) NOT NULL DEFAULT 0,
  `numeroCol91` int(11) NOT NULL DEFAULT 0,
  `competence92` int(11) NOT NULL DEFAULT 0,
  `numeroCol92` int(11) NOT NULL DEFAULT 0,
  `competence93` int(11) NOT NULL DEFAULT 0,
  `numeroCol93` int(11) NOT NULL DEFAULT 0,
  `competence94` int(11) NOT NULL DEFAULT 0,
  `numeroCol94` int(11) NOT NULL DEFAULT 0,
  `competence95` int(11) NOT NULL DEFAULT 0,
  `numeroCol95` int(11) NOT NULL DEFAULT 0,
  `competence96` int(11) NOT NULL DEFAULT 0,
  `numeroCol96` int(11) NOT NULL DEFAULT 0,
  `competence97` int(11) NOT NULL DEFAULT 0,
  `numeroCol97` int(11) NOT NULL DEFAULT 0,
  `competence98` int(11) NOT NULL DEFAULT 0,
  `numeroCol98` int(11) NOT NULL DEFAULT 0,
  `competence99` int(11) NOT NULL DEFAULT 0,
  `numeroCol99` int(11) NOT NULL DEFAULT 0,
  `competence100` int(11) NOT NULL DEFAULT 0,
  `numeroCol100` int(11) NOT NULL DEFAULT 0,
  `competence101` int(11) NOT NULL DEFAULT 0,
  `numeroCol101` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche17b`
--

LOCK TABLES `reponse_fiche17b` WRITE;
/*!40000 ALTER TABLE `reponse_fiche17b` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche17b` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche18`
--

DROP TABLE IF EXISTS `reponse_fiche18`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche18` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `parcoursFormation` varchar(255) DEFAULT NULL,
  `outilsUtilises` varchar(255) DEFAULT NULL,
  `caracteristiques` varchar(255) DEFAULT NULL,
  `horairesRythmesTravail` varchar(255) DEFAULT NULL,
  `combienGagnezVous` varchar(255) DEFAULT NULL,
  `difficultesRencontrer` varchar(255) DEFAULT NULL,
  `environnementTravail` varchar(255) DEFAULT NULL,
  `professionnelsEnContact` varchar(255) DEFAULT NULL,
  `tachesEffectue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche18`
--

LOCK TABLES `reponse_fiche18` WRITE;
/*!40000 ALTER TABLE `reponse_fiche18` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche18` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche19`
--

DROP TABLE IF EXISTS `reponse_fiche19`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche19` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `competence_base` varchar(255) DEFAULT NULL,
  `hypothèse_parcours` varchar(255) DEFAULT NULL,
  `competence_techno_prod` varchar(255) DEFAULT NULL,
  `competence_transv` varchar(255) DEFAULT NULL,
  `interets_attitude` varchar(255) DEFAULT NULL,
  `bilan_competences` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche19`
--

LOCK TABLES `reponse_fiche19` WRITE;
/*!40000 ALTER TABLE `reponse_fiche19` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche19` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche20`
--

DROP TABLE IF EXISTS `reponse_fiche20`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche20` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `origineDemande` varchar(255) DEFAULT NULL,
  `objectifsBilan` varchar(255) DEFAULT NULL,
  `parcoursBilan` varchar(255) DEFAULT NULL,
  `perspectivesEvolutionProfessionnelPrincipal` varchar(255) DEFAULT NULL,
  `perspectivesEvolutionProfessionnelAlternatif` varchar(255) DEFAULT NULL,
  `pointsFortsSavoir` varchar(255) DEFAULT NULL,
  `pointsFortsSavoirFaire` varchar(255) DEFAULT NULL,
  `pointsFortsSavoirEtre` varchar(255) DEFAULT NULL,
  `aspectsPorterAttention` varchar(255) DEFAULT NULL,
  `date_creation` date DEFAULT NULL,
  `conseiller` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche20`
--

LOCK TABLES `reponse_fiche20` WRITE;
/*!40000 ALTER TABLE `reponse_fiche20` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche20` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche20_planaction`
--

DROP TABLE IF EXISTS `reponse_fiche20_planaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche20_planaction` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `quoiFaire` varchar(255) DEFAULT NULL,
  `quand` varchar(255) DEFAULT NULL,
  `ou` varchar(255) DEFAULT NULL,
  `financement` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche20_planaction`
--

LOCK TABLES `reponse_fiche20_planaction` WRITE;
/*!40000 ALTER TABLE `reponse_fiche20_planaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche20_planaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche21`
--

DROP TABLE IF EXISTS `reponse_fiche21`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche21` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `contrainte_opportunite` varchar(255) DEFAULT NULL,
  `secteur_developpement` varchar(255) DEFAULT NULL,
  `zone_territoriale` varchar(255) DEFAULT NULL,
  `professions_identifee` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche21`
--

LOCK TABLES `reponse_fiche21` WRITE;
/*!40000 ALTER TABLE `reponse_fiche21` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche21` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche21_projet`
--

DROP TABLE IF EXISTS `reponse_fiche21_projet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche21_projet` (
  `uuid` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `profil_choisi` varchar(255) DEFAULT NULL,
  `Domaine ou secteur` varchar(255) DEFAULT NULL,
  `profil_identifie_tache` varchar(255) DEFAULT NULL,
  `profil_identifie_competence` varchar(255) DEFAULT NULL,
  `analyse_ressources_partie1` varchar(255) DEFAULT NULL,
  `analyse_ressources_ai_deja` varchar(255) DEFAULT NULL,
  `analyse_ressources_a_devlopper` varchar(255) DEFAULT NULL,
  `analyse_ressources_a_aquerir` varchar(255) DEFAULT NULL,
  `parcours_entreprendre_actions` varchar(255) DEFAULT NULL,
  `parcours_entreprendre_contact` varchar(255) DEFAULT NULL,
  `parcours_entreprendre_tems` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche21_projet`
--

LOCK TABLES `reponse_fiche21_projet` WRITE;
/*!40000 ALTER TABLE `reponse_fiche21_projet` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche21_projet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche8`
--

DROP TABLE IF EXISTS `reponse_fiche8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche8` (
  `id` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) DEFAULT NULL,
  `reponseQ1` varchar(255) DEFAULT NULL,
  `reponseQ2` varchar(255) DEFAULT NULL,
  `reponseQ3` varchar(255) DEFAULT NULL,
  `activitesPrincipales` varchar(255) DEFAULT NULL,
  `activitesSecondaires` varchar(255) DEFAULT NULL,
  `aspectsPositifs` varchar(255) DEFAULT NULL,
  `aspectsNegatifs` varchar(255) DEFAULT NULL,
  `connaissancesNecessaires` varchar(255) DEFAULT NULL,
  `responsabilites` varchar(255) DEFAULT NULL,
  `problemesRencontres` varchar(255) DEFAULT NULL,
  `niveauAutonomie` varchar(255) DEFAULT NULL,
  `savoirFaire` varchar(255) DEFAULT NULL,
  `r` int(11) NOT NULL DEFAULT 0,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche8`
--

LOCK TABLES `reponse_fiche8` WRITE;
/*!40000 ALTER TABLE `reponse_fiche8` DISABLE KEYS */;
INSERT INTO `reponse_fiche8` VALUES ('9d8ae9b9-4def-42ab-a6e9-25960348945d','GB435675','kghfkjgkj','765765987','lkjhglgiu',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2024-11-29','2024-11-21');
/*!40000 ALTER TABLE `reponse_fiche8` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche8_experienceprofessionnelle`
--

DROP TABLE IF EXISTS `reponse_fiche8_experienceprofessionnelle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche8_experienceprofessionnelle` (
  `id` varchar(38) NOT NULL,
  `uuid_fiche8` varchar(38) DEFAULT NULL,
  `IntitulePoste` varchar(10) DEFAULT NULL,
  `activiteExercee` varchar(255) DEFAULT NULL,
  `periode` varchar(100) DEFAULT NULL,
  `circonstanceInterruption` varchar(255) DEFAULT NULL,
  `activitesPrincipales` varchar(255) DEFAULT NULL,
  `activitesSecondaires` varchar(255) DEFAULT NULL,
  `aspectsPositifs` varchar(255) DEFAULT NULL,
  `aspectsNegatifs` varchar(255) DEFAULT NULL,
  `connaissancesNecessaires` varchar(255) DEFAULT NULL,
  `responsabilites` varchar(255) DEFAULT NULL,
  `problemesRencontres` varchar(255) DEFAULT NULL,
  `niveauAutonomie` varchar(255) DEFAULT NULL,
  `savoirFaire` varchar(255) DEFAULT NULL,
  `CIN` varchar(255) DEFAULT NULL,
  `UUID_BDC` varchar(255) DEFAULT NULL,
  `createur` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_reponse_annexe8` (`uuid_fiche8`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche8_experienceprofessionnelle`
--

LOCK TABLES `reponse_fiche8_experienceprofessionnelle` WRITE;
/*!40000 ALTER TABLE `reponse_fiche8_experienceprofessionnelle` DISABLE KEYS */;
INSERT INTO `reponse_fiche8_experienceprofessionnelle` VALUES ('9da1080c-2f11-4074-a15a-9b744e0e6417','9d8ae9b9-4def-42ab-a6e9-25960348945d','test','activite','4 mois','circonstance',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'GB435675','9d76b1be-4488-4f80-97f8-11d736b50727','Doe','2024-12-02','2024-12-02');
/*!40000 ALTER TABLE `reponse_fiche8_experienceprofessionnelle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche8_extraprofessionnelle`
--

DROP TABLE IF EXISTS `reponse_fiche8_extraprofessionnelle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche8_extraprofessionnelle` (
  `id` varchar(38) NOT NULL,
  `uuid_fiche8` varchar(38) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `frequence` varchar(255) DEFAULT NULL,
  `lieu` varchar(255) DEFAULT NULL,
  `avecQui` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_fiche8` (`uuid_fiche8`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche8_extraprofessionnelle`
--

LOCK TABLES `reponse_fiche8_extraprofessionnelle` WRITE;
/*!40000 ALTER TABLE `reponse_fiche8_extraprofessionnelle` DISABLE KEYS */;
INSERT INTO `reponse_fiche8_extraprofessionnelle` VALUES ('9d8d3660-12b5-43df-9040-1df34a3201e7','9d8ae9b9-4def-42ab-a6e9-25960348945d','hello','frequent_2','re','re','2024-11-22','2024-11-22'),('9d970189-8282-4328-807c-8aae67434768','9d8ae9b9-4def-42ab-a6e9-25960348945d','calisthenics','frequent_3','lieu','moi','2024-11-27','2024-11-27'),('9d9b118d-ebbf-4903-8cc8-4143f7f5a90c','9d8ae9b9-4def-42ab-a6e9-25960348945d','hello','frequent_3','hello','hello','2024-11-29','2024-11-29');
/*!40000 ALTER TABLE `reponse_fiche8_extraprofessionnelle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche8_formationinitialecontinue`
--

DROP TABLE IF EXISTS `reponse_fiche8_formationinitialecontinue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche8_formationinitialecontinue` (
  `id` varchar(38) NOT NULL,
  `uuid_parameter_formation` varchar(38) NOT NULL,
  `uuid_parameter_connaissance` varchar(38) NOT NULL,
  `autoEvaluationMaitrise` varchar(2) NOT NULL,
  `autoEvaluationInteret` varchar(2) NOT NULL,
  `uuid_reponse_annexe8` varchar(38) NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_parameter_formation` (`uuid_parameter_formation`,`uuid_parameter_connaissance`,`uuid_reponse_annexe8`),
  KEY `uuid_reponse_annexe8` (`uuid_reponse_annexe8`),
  KEY `uuid_parameter_formation_2` (`uuid_parameter_formation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche8_formationinitialecontinue`
--

LOCK TABLES `reponse_fiche8_formationinitialecontinue` WRITE;
/*!40000 ALTER TABLE `reponse_fiche8_formationinitialecontinue` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche8_formationinitialecontinue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche9`
--

DROP TABLE IF EXISTS `reponse_fiche9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche9` (
  `id` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `sensResponsablite` varchar(255) DEFAULT NULL,
  `capacitesComminicationRelation` varchar(255) DEFAULT NULL,
  `ponctualite` varchar(255) DEFAULT NULL,
  `fiabilite` varchar(255) DEFAULT NULL,
  `autonomieTravail` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche9`
--

LOCK TABLES `reponse_fiche9` WRITE;
/*!40000 ALTER TABLE `reponse_fiche9` DISABLE KEYS */;
INSERT INTO `reponse_fiche9` VALUES ('9d7cc257-e656-4ff8-a726-dd7020c763ae','GB435675',NULL,'Satisfaction','Insatisfaction','Insatisfaction','Satisfaction','2024-11-29','2024-11-14');
/*!40000 ALTER TABLE `reponse_fiche9` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reponse_fiche9a`
--

DROP TABLE IF EXISTS `reponse_fiche9a`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reponse_fiche9a` (
  `id` varchar(38) NOT NULL,
  `uuid_condidat` varchar(38) NOT NULL,
  `connaissances_utilise` varchar(255) DEFAULT NULL,
  `ressouces_personnelles_joue` varchar(255) DEFAULT NULL,
  `activites_effecacites` varchar(255) DEFAULT NULL,
  `activites_effecacites_pourquoi` varchar(255) DEFAULT NULL,
  `activites_difficultes` varchar(255) DEFAULT NULL,
  `activites_difficultes_pourquoi` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_condidat` (`uuid_condidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reponse_fiche9a`
--

LOCK TABLES `reponse_fiche9a` WRITE;
/*!40000 ALTER TABLE `reponse_fiche9a` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse_fiche9a` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sigec_connaissance`
--

DROP TABLE IF EXISTS `sigec_connaissance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sigec_connaissance` (
  `id` varchar(38) NOT NULL,
  `uuid_parameter_formation` varchar(38) NOT NULL,
  `connaissance` varchar(38) NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigec_connaissance`
--

LOCK TABLES `sigec_connaissance` WRITE;
/*!40000 ALTER TABLE `sigec_connaissance` DISABLE KEYS */;
INSERT INTO `sigec_connaissance` VALUES ('UUID-1','formation_2','connaissance04','2024-11-27','2024-11-27');
/*!40000 ALTER TABLE `sigec_connaissance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sigec_experienceprofessionnelle`
--

DROP TABLE IF EXISTS `sigec_experienceprofessionnelle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sigec_experienceprofessionnelle` (
  `id` varchar(38) NOT NULL,
  `uuid_fiche8` varchar(38) DEFAULT NULL,
  `IntitulePoste` varchar(10) DEFAULT NULL,
  `activiteExercee` varchar(255) DEFAULT NULL,
  `periode` varchar(100) DEFAULT NULL,
  `circonstanceInterruption` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uuid_reponse_annexe8` (`uuid_fiche8`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigec_experienceprofessionnelle`
--

LOCK TABLES `sigec_experienceprofessionnelle` WRITE;
/*!40000 ALTER TABLE `sigec_experienceprofessionnelle` DISABLE KEYS */;
INSERT INTO `sigec_experienceprofessionnelle` VALUES ('UUID_1','9d8ae9b9-4def-42ab-a6e9-25960348945d','sigec_post','activiter','5month','circonstance');
/*!40000 ALTER TABLE `sigec_experienceprofessionnelle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-02 15:43:53
