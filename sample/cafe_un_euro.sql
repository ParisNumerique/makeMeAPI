# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# H�te: 46.18.195.236 (MySQL 5.1.69-log)
# Base de donn�es: 3969_parisnum
# Temps de g�n�ration: 2014-01-02 10:41:51 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Affichage de la table cafe
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cafe`;

CREATE TABLE `cafe` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text,
  `address` text,
  `zipcode` int(5) DEFAULT NULL,
  `photo` text,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL,
  `prix_comptoir` double DEFAULT NULL,
  `prix_salle` double DEFAULT NULL,
  `prix_terrasse` double DEFAULT NULL,
  `like` int(11) DEFAULT '0',
  `publish` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `cafe` WRITE;
/*!40000 ALTER TABLE `cafe` DISABLE KEYS */;

INSERT INTO `cafe` (`id`, `name`, `address`, `zipcode`, `photo`, `lat`, `lon`, `prix_comptoir`, `prix_salle`, `prix_terrasse`, `like`, `publish`)
VALUES
	(1,'Chez Prune','36 rue Beaurepaire',75010,NULL,48.8717032,2.3644379,1,0,0,1,1),
	(2,'Le Plomb du cantal','3 rue Gaîté',75014,NULL,48.8407374,2.3245437,1,1,0,0,1),
	(3,'Chez Fafa','44 rue Vinaigriers',75010,NULL,48.8731834,2.3611093,1,0,0,0,1),
	(4,'Epicerie Musicale','55bis quai de Valmy',75010,NULL,48.8706909,2.3654601,1,1,0,2,1),
	(5,'La cantine de Zoé','136 rue du Faubourg poissonnière',75010,NULL,48.8806106,2.3499913,1,0,0,0,1),
	(6,'le chateau d\'eau','67 rue du Château d\'eau',75010,NULL,48.8728641,2.3544506,1,0,0,2,1),
	(7,'Le sully','13 rue du Faubourg Saint Denis',75010,NULL,48.8702843,2.3528531,1,0,0,2,1),
	(8,'En attendant l\'or ','3 rue Faidherbe ',75011,NULL,48.8508931,2.3842062,1,0,0,2,1),
	(9,'Extra old café','307 fg saint Antoine',75011,NULL,48.8490067,2.3926268,1,0,0,0,1),
	(10,'L\'horizon','93, rue de la Roquette',75011,NULL,48.8573345,2.3792339,1,0,0,3,1),
	(11,'L\'ingénu','184 bd Voltaire',75011,NULL,48.8546754,2.3853411,1,0,0,0,1),
	(12,'La Caravane','Rue de la Fontaine au Roi',75011,NULL,48.8681623,2.3737304,0,0,0,0,1),
	(13,'Le Centenaire','104 rue amelot',75011,NULL,48.8625473,2.3675257,1,1,0,0,1),
	(14,'Le Plein soleil','90 avenue Parmentier',75011,NULL,48.8653141,2.3745343,1,0,0,8,1),
	(15,'Le Pure café','14 rue Jean Macé',75011,NULL,48.8534141,2.3833947,1,0,0,0,1),
	(16,'Panem','18 rue de Crussol',75011,NULL,48.8642297,2.3685097,0,0,0,0,1),
	(17,'Pause Café','41 rue de Charonne',75011,NULL,48.8533752,2.376748,1,0,0,1,1),
	(18,'Assaporare Dix sur Dix','75, avenue Ledru-Rollin',75012,NULL,48.8499465,2.3746488,1,0,0,0,1),
	(19,'Au pays de Vannes','34 bis rue de Wattignies',75012,NULL,48.8358879,2.3957386,1,0,0,1,1),
	(20,'Aux cadrans','21 ter boulevard Diderot',75012,NULL,48.8458354,2.3727568,1,0,0,0,1),
	(21,'Bistrot Saint-Antoine','58 rue du Fbg Saint-Antoine ',75012,NULL,48.8519259,2.3732106,1,0,0,8,1),
	(22,'Café Pierre','202 rue du faubourg st antoine',75012,NULL,48.8499292,2.3852133,1,0,0,1,1),
	(23,'L\'empreinte','54, avenue Daumesnil',75012,NULL,48.8454077,2.3791358,1,0,0,1,1),
	(24,'La Liberté','196 rue du faubourg saint-antoine',75012,NULL,48.8500825,2.3839439,1,1,0,5,1),
	(25,'Le Chat bossu','126, rue du Faubourg Saint Antoine',75012,NULL,48.8507088,2.3784988,1,0,0,0,1),
	(26,'Le Killy Jen','28 bis boulevard Diderot',75012,NULL,48.8460936,2.3757635,1,0,0,0,1),
	(27,'L\'âge d\'or','26 rue du Docteur Magnan',75013,NULL,48.8263486,2.3598961,1,0,0,1,1),
	(28,'L\'Écir','59 Boulevard Saint-Jacques',75014,NULL,48.8330389,2.3360189,1,0,0,0,1),
	(29,'Le Couvent','69 rue Broca',75013,NULL,48.8370306,2.3469866,1,1,0,0,1),
	(30,'Le Kleemend\'s','34 avenue Pierre Mendès-France',75013,NULL,48.8388626,2.370298,1,0,0,0,1),
	(31,'Le Caminito','48 rue du Dessous des Berges',75013,NULL,48.8267071,2.3745356,1,1,0,0,0),
	(32,'Tamm Bara','7 rue Clisson ',75013,NULL,48.832998,2.3691769,1,0,0,0,1),
	(33,'Au Vin Des Rues','21 rue Boulard ',75014,NULL,48.8339264,2.3290476,1,0,0,0,1),
	(34,'Caprice café','12 avenue Jean Moulin',75014,NULL,48.8274287,2.3256439,1,0,0,0,1),
	(35,'Denfert café','58 boulvevard Saint Jacques',75014,NULL,48.8341356,2.3338475,1,0,0,2,1),
	(36,'Le petit club','55 rue de la tombe Issoire',75014,NULL,48.8297735,2.3338667,1,0,0,1,1),
	(37,'le Zango','58 rue Daguerre',75014,NULL,48.8349528,2.3270895,1,0,0,0,1),
	(38,'maison du vin ','52 rue des plantes ',75014,NULL,48.8286803,2.3220212,1,0,0,0,1),
	(39,'bistrot les timbrés','14 rue d\'alleray',75015,NULL,48.8381446,2.3012062,1,0,0,1,1),
	(40,'Café Dupont ','198 rue de la Convention',75015,NULL,48.8372355,2.2964162,0.99,0,0,1,1),
	(41,'Café Victor','10 boulevard Victor',75015,NULL,48.8357405,2.2793755,1,0,0,1,1),
	(42,'La Bauloise','36 rue du hameau',75015,NULL,48.834051,2.2873884,1,0,0,3,1),
	(43,'le 1 cinq','172 rue de vaugirard',75015,NULL,48.842545,2.3109561,1,0,0,0,1),
	(44,'Le café des amis','125 rue Blomet',75015,NULL,48.8397873,2.296955,1,1,0,0,1),
	(45,'Le Comptoir','354 bis rue Vaugirard',75015,NULL,48.8359885,2.293716,1,0,0,0,1),
	(46,'Le drapeau de la fidelité','21 rue Copreaux',75015,NULL,48.8415824,2.3069856,1,1,0,0,1),
	(47,'Le General Beuret','9 Place du General Beuret',75015,NULL,48.8417062,2.303106,1,0,0,4,1),
	(48,'Le Germinal','95 avenue Emile Zola',75015,NULL,48.8467068,2.2889379,1,0,0,1,1),
	(49,'Le Parc Vaugirard','358 rue de Vaugirard',75015,NULL,48.8353811,2.2923441,1,0,0,0,1),
	(50,'Le Piquet','48 avenue de la Motte Picquet',75015,NULL,48.8509557,2.3003021,1,0,0,1,1),
	(51,'Le Zinc','61 avenue de la Motte Picquet',75015,NULL,48.8494666,2.2987524,1,0,0,0,1),
	(52,'Les Artisans ','106 rue Lecourbe',75015,NULL,48.8428455,2.3032014,1,0,0,0,1),
	(53,'les montparnos','65 boulevard Pasteur ',75015,NULL,48.8410535,2.314792,1,0,0,0,1),
	(54,'Café antoine','17 rue Jean de la Fontaine ',75016,NULL,48.8516705,2.2738176,1,0,0,1,1),
	(55,'Bagels & Coffee Corner','Place de Clichy',75017,NULL,48.8835546,2.3270021,1,0,0,0,1),
	(56,'Caves populaires','22 rue des Dames',75017,NULL,48.8847686,2.3246547,1,0,0,1,1),
	(57,'Le BB (Bouchon des Batignolles)','2 rue Lemercier',75017,NULL,48.8853475,2.325363,1,1,0,0,1),
	(58,'Le Village','182 rue de Courcelles',75017,NULL,48.8843433,2.2980412,1,0,0,1,1),
	(59,'Les caves populaires','22 rue des Dames',75017,NULL,48.8847686,2.3246547,1,1,0,1,1),
	(60,'Pari\'s Café','174 avenue de Clichy',75017,NULL,48.8922563,2.3174785,1,0,0,0,1),
	(61,'Petits Freres des Pauvres ','47 rue de Batignolles',75017,NULL,48.8856369,2.319774,0,0,0,5,1),
	(62,'Trois pièces cuisine ','101 rue des dames ',75017,NULL,48.8829201,2.3181032,1,0,0,1,1),
	(63,'Au bon coin','49 rue des Cloys',75018,NULL,48.8931109,2.3377556,1,1,1,4,1),
	(64,'Botak cafe','1 rue Paul albert',75018,NULL,48.8864514,2.3450111,1,1,1,0,1),
	(65,'Canopy Café associatif','19 rue Pajol',75018,NULL,48.8860609,2.3608783,1,1,0,0,1),
	(66,'Institut des Cultures d\'Islam','19-23 rue Léon',75018,NULL,48.8879971,2.3535119,1,1,0,0,1),
	(67,'L\'Olive','8 rue L\'Olive',75018,NULL,48.8911361,2.3611862,1,0,0,0,1),
	(68,'Le Brio','216, rue Marcadet',75018,NULL,48.8918512,2.3335085,1,0,0,1,1),
	(69,'Le Chaumontois','12 rue Armand Carrel',75018,NULL,48.8826829,2.3804329,1,0,0,1,1),
	(70,'Le Müller','11 rue Feutrier',75018,NULL,48.8865398,2.346569,1,1,0,0,1),
	(71,'Le petit Bretonneau','Le petit Bretonneau - à l\'intérieur de l\'Hôpital',75018,NULL,48.89215,2.3444472,1,1,0,0,1),
	(72,'Le refuge','72 rue lamarck',75018,NULL,48.889956,2.3387554,1,0,0,3,1),
	(73,'Le Saint Jean','23 rue des abbesses',75018,NULL,48.8844805,2.3379817,1,0,0,0,1),
	(74,'Le Supercoin','3, rue Baudelique',75018,NULL,48.8921865,2.3470679,1,1,0,0,1),
	(75,'Populettes','86 bis rue Riquet',75018,NULL,48.8899586,2.362555,1,1,0,1,1),
	(76,'Le bar Fleuri ','1 rue du Plateau',75019,NULL,48.8779149,2.3854038,1,0,0,0,1),
	(77,'Le Bellerive','71 quai de Seine',75019,NULL,48.8882054,2.3773908,1,0,0,3,1),
	(78,'Café Martin','2 place Martin Nadaud',75001,NULL,48.8651483,2.3950055,1,0,0,5,1),
	(79,'Café Pistache','9 rue des petits champs',75001,NULL,48.8662799,2.3387014,1,0,0,1,1),
	(80,'Etienne','14 rue Turbigo, Paris',75001,NULL,48.8637383,2.3487509,1,0,0,4,1),
	(81,'La chaumière gourmande','Route de la Muette à Neuilly\nClub hippique du Jardin d’Acclimatation',75016,NULL,48.8716445,2.264346,0,1,0,3,1),
	(82,'Le bistrot de Maëlle et Augustin ','42 rue coquillère ',75001,NULL,48.8640493,2.3310526,1,0,0,0,1),
	(83,'Le Ragueneau','202 rue Saint-Honoré',75001,NULL,48.8626605,2.3374833,1,0,0,4,1),
	(84,'Le Reynou','2 bis quai de la mégisserie',75001,NULL,48.8573496,2.3468189,1,0,0,0,1),
	(85,'Peperoni','83 avenue de Wagram',75001,NULL,48.8802748,2.2995547,1,0,0,0,1),
	(86,'Ragueneau ','202 rue Saint Honoré',75001,NULL,48.8626605,2.3374833,1,0,0,0,0),
	(87,'Au panini de la place','47 rue Belgrand',75020,NULL,48.8646193,2.4080864,1,0,0,0,1),
	(88,'Chez Luna','108 rue de Ménilmontant ',75020,NULL,48.8695687,2.3934117,1,0,0,0,1),
	(89,'La Cagnotte','13 Rue Jean-Baptiste Dumay',75020,NULL,48.8745789,2.387767,1,0,0,0,1),
	(90,'Les Pères Populaires','46 rue de Buzenval',75020,NULL,48.851183,2.4018136,1,1,0,5,1),
	(91,'Melting Pot','3 rue de Lagny',75020,NULL,48.8488707,2.4000605,1,0,0,2,1),
	(92,'Au cerceau d\'or','129 boulevard sebastopol',75002,NULL,48.8678927,2.3533424,1,0,0,1,1),
	(93,'Brûlerie San José','30 rue des Petits-Champs',75002,NULL,48.8670035,2.3360129,1,0,0,1,1),
	(94,'Chez Rutabaga','16 rue des Petits Champs',75002,NULL,48.8668321,2.3371474,1,1,0,0,1),
	(95,'Dédé la frite','52 rue Notre-Dame des Victoires',75002,NULL,48.8698282,2.3427196,1,0,0,0,1),
	(96,'Drôle d\'endroit Montorgueil ','58 rue de Montorgueil',75002,NULL,48.8649594,2.3468862,1,1,0,1,1),
	(97,'L\'Entracte','place de l\'opera',75002,NULL,48.8701268,2.3324442,1,0,0,0,1),
	(98,'La Cordonnerie','142 Rue Saint-Denis 75002 Paris',75002,NULL,48.8652509,2.3505839,1,1,0,3,1),
	(99,'Le Biz','18 rue Favart',75002,NULL,48.8714246,2.3383422,1,0,0,1,1),
	(100,'Le Café frappé','95 rue Montmartre ',75002,NULL,48.8679184,2.3435947,1,0,0,1,1),
	(101,'Le Cap Bourbon','1 rue Louis le Grand',75002,NULL,48.8681962,2.3320214,1,0,0,10,1),
	(102,'Le Petit Choiseul','23 rue saint augustin',75002,NULL,48.8688189,2.3359142,1,1,0,1,1),
	(103,'La Perle','78 rue vieille du temple',75003,NULL,48.8598129,2.360535,1,0,0,7,1),
	(104,'Le Sévigné','15 rue du Parc Royal',75003,NULL,48.858745,2.3627501,1,0,0,1,1),
	(105,'Chez Oscar','11/13 boulevard Beaumarchais',75004,NULL,48.8546375,2.3685146,1,0,0,30,1),
	(106,'l\'Eléphant du nil','125 Rue Saint-Antoine',75004,NULL,48.8551966,2.3602744,1,0,0,2,1),
	(107,'La fronde ','33 rue des Archives',75004,NULL,48.8593729,2.3561373,1,0,0,1,1),
	(108,'Le Café Livres','10 rue Saint Martin',75004,NULL,48.8575135,2.3495034,1,0,0,0,1),
	(109,'La Brûlerie des Ternes','111 rue Mouffetard',75005,NULL,48.8406911,2.3497261,1,0,0,0,1),
	(110,'La Brûlerie des Ternes','111 rue Mouffetard',75005,NULL,48.8405198,2.3497936,1,0,0,0,0),
	(111,'Café Lea ','5 rue Claude Bernard ',75005,NULL,48.8386426,2.3499609,1,0,0,1,1),
	(112,'Cardinal Saint-Germain','11 boulevard Saint-Germain',75005,NULL,48.8492128,2.3543465,1,0,0,0,1),
	(113,'Invitez vous chez nous','7 rue Epée de Bois',75005,NULL,48.8415617,2.3508238,1,1,0,2,1),
	(114,'La Brûlerie des Ternes','111 rue mouffetard',75005,NULL,48.8405198,2.3497936,1,1,0,2,1),
	(115,'Le Café d\'avant','35 rue Claude Bernard',75005,NULL,48.8396789,2.3472037,1,0,0,1,1),
	(116,'La Montagne Sans Geneviève','13 Rue du Pot de Fer ',75005,NULL,48.8428428,2.3481946,0,1,0,1,1),
	(117,'Le Descartes','1 rue Thouin',75005,NULL,48.8450569,2.3497037,1,0,0,-10,1),
	(118,'Le Tournebride','104 rue Mouffetard',75005,NULL,48.8410496,2.3496551,1,0,0,-1,1),
	(119,'Waikiki','10 rue d\"Ulm',75005,NULL,48.844906,2.3454034,1,0,0,1,1),
	(120,'L\'avant comptoir','3 carrefour de l\'Odéon',75006,NULL,48.8521138,2.3388104,1,0,0,8,1),
	(121,'Les Vendangeurs','6/8 rue Stanislas',75006,NULL,48.8440313,2.3284984,1,0,0,0,1),
	(122,'Le Lucernaire ','53 rue Notre-Dame des Champs',75006,NULL,48.8441257,2.3304376,1,0,0,3,1),
	(123,'Café dans l\'aerogare Air France Invalides','2 rue Robert Esnault Pelterie',75007,NULL,48.8625222,2.3147833,1,0,0,2,1),
	(124,'Cafe de grenelle','188 rue de Grenelle',75007,NULL,48.8576764,2.3055923,1,0,0,0,1),
	(125,'Café Varenne','36 rue de Varenne',75007,NULL,48.8540007,2.3238174,1,0,0,0,1),
	(126,'Le Bosquet','46 avenue Bosquet',75007,NULL,48.8559688,2.3047388,1,0,0,1,1),
	(127,'Le Malar','88 rue Saint-Dominique',75007,NULL,48.8594913,2.3063231,1,0,0,3,1),
	(128,'Le Square','31 rue Saint-Dominique',75007,NULL,48.859153,2.3202114,1,0,0,0,1),
	(129,'Café beauveau','9 rue de Miromesnil ',75008,NULL,48.8718475,2.3160812,1,0,0,0,1),
	(130,'Café de la Mairie (du VIII)','rue de Lisbonne',75008,NULL,48.8776107,2.3125534,1,0,0,0,1),
	(131,'Le Fronton','63 rue de Ponthieu',75008,NULL,48.8723008,2.3044247,1,0,0,0,1),
	(132,'Le Relais Haussmann ','146, boulevard Haussmann',75008,NULL,48.8751755,2.3124662,1,0,0,0,1),
	(133,'Les Arcades','61 rue de Ponthieu',75008,NULL,48.8722433,2.3046405,1,0,0,0,1),
	(134,'L\'Angle','28 rue de Ponthieu',75008,NULL,48.8709497,2.308817,1,1,0,0,1),
	(135,'O\'Breizh','27 rue de Penthièvre',75008,NULL,48.872663,2.3152719,1,1,0,1,1),
	(136,'Café Zen','46 rue Victoire',75009,NULL,48.8752224,2.3361223,1,0,0,1,1),
	(137,'L\'anjou','1 rue de Montholon',75009,NULL,48.8766152,2.3484309,1,0,0,0,1),
	(138,'La Brocante','10 rue Rossini',75009,NULL,48.8732396,2.3391821,1,1,0,0,1),
	(139,'Le Brigadier ','12 rue Blanche',75009,NULL,48.8775979,2.3321119,1,0,0,0,1),
	(140,'Le Corail','79 rue la Fayette',75009,NULL,48.8764419,2.3457236,1,0,0,0,1),
	(141,'Le Dellac','14 rue Rougemont',75009,NULL,48.8722418,2.3461333,1,0,0,1,1),
	(160,'Chez Miamophile','6 rue Mélingue',75019,NULL,48.8748898,2.3860537,1,1,1,0,1),
	(159,'Le Saint René','148 Boulevard de Charonne ',75020,NULL,48.8565322,2.3944677,1,0,0,0,1),
	(157,'Le Pas Sage','1 Passage du Grand Cerf',75002,NULL,48.8646261,2.3502056,1,0,0,0,1),
	(158,'Le Dunois','77 rue Dunois',75013,NULL,48.8333779,2.3658065,1,0,0,0,1),
	(156,'L\'Inévitable ','22 rue Linné ',75005,NULL,48.8454711,2.3546926,1,0,0,0,1),
	(155,'Le Bloc','21 avenue Brochant',75017,NULL,48.8889483,2.3179437,1,0,0,0,1),
	(154,'Brasserie le Morvan','61 rue du château d\'eau',75010,NULL,48.872496,2.3553268,1,0,0,0,1),
	(153,'La Marine','55 bis quai de valmy ',75010,NULL,48.8703171,2.3651255,1,0,0,0,1),
	(152,'American Kitchen','49 rue bichat ',75010,NULL,48.8727462,2.366411,1,0,0,0,1),
	(151,'Café Clochette','16 avenue Richerand ',75010,NULL,48.8724186,2.3665066,1,0,0,0,1),
	(150,'La cantoche de Paname','40 Boulevard Beaumarchais',75011,NULL,48.8565846,2.3684818,0.9,0,0,0,1),
	(149,'NoMa','39 rue Notre Dame de Nazareth ',75003,NULL,48.8675092,2.3579364,1,0,0,0,1),
	(148,'Café rallye tournelles','11 Quai de la Tournelle',75005,NULL,48.8497236,2.3554868,1,0,0,0,1),
	(147,'O\'Paris','1 Rue des Envierges',75020,NULL,48.8717299,2.3866133,1,0,0,0,1),
	(146,'O q de poule','53 rue du ruisseau ',75018,NULL,48.8935973,2.340337,1,0,1,0,1),
	(145,'Le Zazabar','116 Rue de Ménilmontant',75020,NULL,48.8698527,2.3942723,1,0,0,0,1),
	(144,'Le café Monde et Médias','Place de la République',75003,NULL,48.867311,2.3637062,1,0,0,0,1),
	(143,'La Brasserie Gaité','3 rue de la Gaité',75014,NULL,48.8407297,2.3245474,0,0,1,0,1),
	(142,'Café Varenne','36 rue de Varenne',75007,NULL,48.8540114,2.3238235,1,0,0,0,1),
	(161,'La Renaissance','112 Rue Championnet ',75018,NULL,48.8957649,2.3395743,1,0,0,0,1),
	(162,'La Recoleta au Manoir','229 avenue Gambetta',75020,NULL,48.8747027,2.4054371,1,0,0,0,1),
	(163,'Le Pareloup','80 Rue Saint-Charles',75015,NULL,48.8473878,2.2861633,0.9,0,0,0,1),
	(164,'L\'européen ','21 Bis Boulevard Diderot ',75012,NULL,48.8458659,2.3732192,1,0,0,0,1),
	(165,'Face Bar','82 rue des archives',75003,NULL,48.8628889,2.3603088,1,-0,-0,0,1),
	(167,'Extérieur Quai','5, rue d\'Alsace',75010,NULL,48.876739,2.357609,1,-0,-0,0,1),
	(168,'zic zinc','95 rue claude decaen',75012,NULL,48.8387054,2.3962103,1,-0,-0,0,1),
	(169,'L\'entrepôt','157 rue Bercy 75012 Paris',75012,NULL,48.8421568,2.3759197,1,-0,-0,0,1),
	(170,'Chai 33','33 Cour Saint Emilion',75012,NULL,48.8332338,2.3867615,1,-0,-0,0,1),
	(171,'l\'Usine','1 rue d\'Avron',75020,NULL,48.8514543,2.3986789,1,-0,-0,0,1),
	(172,'L\'Assassin','99 rue Jean-Pierre Timbaud',75011,NULL,48.8687363,2.3799258,1,-0,-0,0,1),
	(173,'Le Poulailler','60 rue saint-sabin',75011,NULL,48.8591589,2.369006,1,-0,-0,0,1),
	(174,'Rivolux','16 rue de Rivoli',75004,NULL,48.8557092,2.3593607,1,-0,-0,0,1),
	(175,'Brasiloja','16 rue Ganneron',75018,NULL,48.8865387,2.3274937,1,-0,-0,0,1),
	(176,'Coffee Chope','344Vrue Vaugirard',75015,NULL,48.8365606,2.2947134,1,-0,-0,0,1),
	(177,'Le bal du pirate','60 rue des bergers',75015,NULL,48.842126,2.2804022,1,-0,-0,0,1),
	(178,'le lutece','380 rue de vaugirard ',75015,NULL,48.8331606,2.2888461,1,-0,-0,0,1),
	(179,'Drole d\'endroit pour une rencontre','58 rue de Montorgueil',75002,NULL,48.8649636,2.3469169,1,-0,-0,0,1),
	(180,'Le pari\'s café ','104 rue caulaincourt',75018,NULL,48.8896592,2.3401848,1,-0,-0,0,1),
	(181,'L\'antre d\'eux','16 rue DE MEZIERES',75006,NULL,48.8503448,2.3304553,1,-0,-0,0,1);

/*!40000 ALTER TABLE `cafe` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
