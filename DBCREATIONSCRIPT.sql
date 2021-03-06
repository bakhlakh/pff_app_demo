USE [master]
GO
/****** Object:  Database [PFF]    Script Date: 6/3/2022 10:43:49 AM ******/
CREATE DATABASE [PFF]
 
GO
ALTER DATABASE [PFF] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PFF].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PFF] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PFF] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PFF] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PFF] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PFF] SET ARITHABORT OFF 
GO
ALTER DATABASE [PFF] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PFF] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PFF] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PFF] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PFF] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PFF] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PFF] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PFF] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PFF] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PFF] SET  ENABLE_BROKER 
GO
ALTER DATABASE [PFF] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PFF] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PFF] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PFF] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PFF] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PFF] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PFF] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PFF] SET RECOVERY FULL 
GO
ALTER DATABASE [PFF] SET  MULTI_USER 
GO
ALTER DATABASE [PFF] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PFF] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PFF] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PFF] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PFF] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PFF] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'PFF', N'ON'
GO
ALTER DATABASE [PFF] SET QUERY_STORE = OFF
GO
USE [PFF]
GO
/****** Object:  UserDefinedFunction [dbo].[FN_CHECKUSERS]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[FN_CHECKUSERS] (@username VARCHAR(50),@pwd VARCHAR(150))
RETURNS INT
AS 
BEGIN
IF(SELECT COUNT(*) FROM USERS WHERE UserName=@username AND UserPassword = @pwd)>0
 RETURN 1
ELSE
 RETURN 0
RETURN 0
END
GO
/****** Object:  Table [dbo].[Absences]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Absences](
	[AbsenceID] [int] IDENTITY(1,1) NOT NULL,
	[SeanceID] [int] NOT NULL,
	[StagiaireID] [int] NOT NULL,
	[Justified] [varchar](3) NOT NULL,
	[AdditionalInfo] [varchar](300) NULL,
PRIMARY KEY CLUSTERED 
(
	[AbsenceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FiliereModule]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FiliereModule](
	[ModuleID] [varchar](10) NOT NULL,
	[FiliereID] [varchar](10) NOT NULL,
	[MassHorraire] [int] NULL,
	[CREATED_AT] [date] NOT NULL,
	[UPDATED_AT] [date] NOT NULL,
	[DELETED_AT] [date] NOT NULL,
 CONSTRAINT [PK_FiliereModule] PRIMARY KEY CLUSTERED 
(
	[ModuleID] ASC,
	[FiliereID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Filieres]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Filieres](
	[FiliereID] [varchar](10) NOT NULL,
	[NomFiliere] [varchar](100) NULL,
	[Description] [varchar](300) NULL,
	[TypeDiplome] [varchar](3) NULL,
	[CREATED_AT] [date] NOT NULL,
	[UPDATED_AT] [date] NOT NULL,
	[DELETED_AT] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[FiliereID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Formateur]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Formateur](
	[FormateurID] [int] NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[LastName] [varchar](100) NOT NULL,
	[Email] [varchar](168) NULL,
	[Phone] [varchar](12) NULL,
	[CIN] [varchar](8) NOT NULL,
	[Nationalite] [varchar](20) NOT NULL,
	[CREATED_AT] [date] NOT NULL,
	[UPDATED_AT] [date] NOT NULL,
	[DELETED_AT] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[FormateurID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Groupes]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Groupes](
	[AnneScolaire] [varchar](10) NOT NULL,
	[GroupID] [varchar](20) NOT NULL,
	[FiliereID] [varchar](10) NULL,
	[Niveau] [int] NULL,
	[CREATED_AT] [date] NOT NULL,
	[UPDATED_AT] [date] NOT NULL,
	[DELETED_AT] [date] NOT NULL,
 CONSTRAINT [PK_GROUP] PRIMARY KEY CLUSTERED 
(
	[AnneScolaire] ASC,
	[GroupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Modules]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Modules](
	[ModuleID] [varchar](10) NOT NULL,
	[Intitule] [varchar](50) NULL,
	[Description] [varchar](300) NULL,
	[CREATED_AT] [date] NOT NULL,
	[UPDATED_AT] [date] NOT NULL,
	[DELETED_AT] [date] NOT NULL,
 CONSTRAINT [PK_Modules] PRIMARY KEY CLUSTERED 
(
	[ModuleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rooms]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rooms](
	[RoomID] [int] NOT NULL,
	[Intitule] [varchar](50) NULL,
	[FloorID] [int] NULL,
	[CREATED_AT] [date] NOT NULL,
	[UPDATED_AT] [date] NOT NULL,
	[DELETED_AT] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RoomID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Seances]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Seances](
	[SeanceID] [int] IDENTITY(1000,1) NOT NULL,
	[TITLE] [varchar](200) NOT NULL,
	[RoomID] [int] NULL,
	[ModuleID] [varchar](10) NULL,
	[Objectives] [varchar](300) NULL,
	[DateSeance] [date] NOT NULL,
	[StartTime] [varchar](10) NOT NULL,
	[FormateurID] [int] NULL,
	[Commentaires] [varchar](300) NULL,
	[GroupID] [varchar](20) NULL,
	[AnneScolaire] [varchar](10) NULL,
	[CREATED_AT] [date] NOT NULL,
	[UPDATED_AT] [date] NOT NULL,
	[DELETED_AT] [date] NOT NULL,
	[TypeSeance] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[SeanceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stagiaires]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stagiaires](
	[StagiaireID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[LastName] [varchar](100) NOT NULL,
	[Phone] [varchar](12) NOT NULL,
	[AnneScolaire] [varchar](10) NULL,
	[GroupID] [varchar](20) NULL,
	[Email] [varchar](169) NOT NULL,
	[CIN] [varchar](10) NOT NULL,
	[BirthDate] [date] NOT NULL,
	[Address] [varchar](200) NOT NULL,
	[Nationalite] [varchar](50) NOT NULL,
	[statue] [varchar](30) NOT NULL,
	[PhotoUri] [varchar](255) NULL,
	[CREATED_AT] [date] NOT NULL,
	[UPDATED_AT] [date] NOT NULL,
	[DELETED_AT] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[StagiaireID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Teaching]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teaching](
	[GroupID] [varchar](20) NOT NULL,
	[AnneScolaire] [varchar](10) NOT NULL,
	[FormateurID] [int] NOT NULL,
	[ModuleID] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[FormateurID] ASC,
	[GroupID] ASC,
	[AnneScolaire] ASC,
	[ModuleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USERS]    Script Date: 6/3/2022 10:43:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USERS](
	[UserName] [varchar](50) NOT NULL,
	[EmailAddress] [varchar](164) NOT NULL,
	[UserPasswordHash] [varbinary](8000) NOT NULL,
	[UserPasswordSalt] [varbinary](8000) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[CreationDate] [date] NOT NULL,
	[Level] [int] NOT NULL,
	[LastAccessed] [date] NOT NULL,
	[CREATED_AT] [date] NOT NULL,
	[UPDATED_AT] [date] NOT NULL,
	[DELETED_AT] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Absences] ON 

INSERT [dbo].[Absences] ([AbsenceID], [SeanceID], [StagiaireID], [Justified], [AdditionalInfo]) VALUES (11, 1052, 12, N'NO', NULL)
INSERT [dbo].[Absences] ([AbsenceID], [SeanceID], [StagiaireID], [Justified], [AdditionalInfo]) VALUES (12, 1052, 2, N'NO', NULL)
INSERT [dbo].[Absences] ([AbsenceID], [SeanceID], [StagiaireID], [Justified], [AdditionalInfo]) VALUES (13, 1052, 13, N'NO', NULL)
INSERT [dbo].[Absences] ([AbsenceID], [SeanceID], [StagiaireID], [Justified], [AdditionalInfo]) VALUES (14, 1053, 12, N'NO', NULL)
INSERT [dbo].[Absences] ([AbsenceID], [SeanceID], [StagiaireID], [Justified], [AdditionalInfo]) VALUES (15, 1053, 13, N'NO', NULL)
SET IDENTITY_INSERT [dbo].[Absences] OFF
GO
INSERT [dbo].[FiliereModule] ([ModuleID], [FiliereID], [MassHorraire], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'EGTS101', N'AEP', 122, CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[FiliereModule] ([ModuleID], [FiliereID], [MassHorraire], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'EGTS101', N'DGD', 123, CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[FiliereModule] ([ModuleID], [FiliereID], [MassHorraire], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'EGTS104', N'AEP', 34, CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[FiliereModule] ([ModuleID], [FiliereID], [MassHorraire], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'EGTS104', N'DGD', 100, CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[FiliereModule] ([ModuleID], [FiliereID], [MassHorraire], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M100', N'DGD', 121, CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[FiliereModule] ([ModuleID], [FiliereID], [MassHorraire], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M101', N'AEP', 122, CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date))
INSERT [dbo].[FiliereModule] ([ModuleID], [FiliereID], [MassHorraire], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M102', N'DGD', 122, CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[FiliereModule] ([ModuleID], [FiliereID], [MassHorraire], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M103', N'DGD', 12, CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date))
INSERT [dbo].[FiliereModule] ([ModuleID], [FiliereID], [MassHorraire], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M104', N'DGD', 23, CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[FiliereModule] ([ModuleID], [FiliereID], [MassHorraire], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M202', N'DGD', 222, CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[FiliereModule] ([ModuleID], [FiliereID], [MassHorraire], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M203', N'AEP', 100, CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date))
GO
INSERT [dbo].[Filieres] ([FiliereID], [NomFiliere], [Description], [TypeDiplome], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'AEP', N'Aide Educateur en Préscolaire', N'L’aide-éducateur, en collaboration avec l’éducateur ou directement sous la responsabilité du Directeur de l’établissement prend en charge les jeunes enfants, les accompagne dans leur adaptation à la vie en collectivité et dans leur apprentissage de la vie sociale.', N'T', CAST(N'0001-01-01' AS Date), CAST(N'2022-06-02' AS Date), CAST(N'0001-01-01' AS Date))
INSERT [dbo].[Filieres] ([FiliereID], [NomFiliere], [Description], [TypeDiplome], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'DGD', N' Digital Design', N'Le tronc commun en Digital Design vise à offrir une opportunité aux stagaires pour acquérir des connaissances solides sur la création des designs numériques pour des projets multimédias et graphiques, y compris des sites Web, des applications mobiles,  de la publicité, des animations, des courriels,', N'TS', CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[Filieres] ([FiliereID], [NomFiliere], [Description], [TypeDiplome], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'DGI', N'Développement Digital option Applications Mobiles', N'Un technicien spécialisé en Développement digital – option Développement Mobile est un professionnel responsable de tenir compte des spécificités de l’affichage des applications sur les différents outils. Deux possibilités s’offrent à lui : Adapter un site internet classique pour une application mob', N'TS', CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[Filieres] ([FiliereID], [NomFiliere], [Description], [TypeDiplome], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'DGWF', N'Développement Digital option Web Full Stack', N'Un technicien spécialisé enDéveloppement digital – option Full Stackest un professionnel capable de réaliser des tâches à n''importe quel niveau technique de la pile des différentes couches qui constituent une application informatique ou un site web .', N'TS', CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[Filieres] ([FiliereID], [NomFiliere], [Description], [TypeDiplome], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'DIA', N'Intelligence Artificielle', N'Le Tronc Commun en Intelligence Artificielle vise à doter les stagiares en compétences fortes sur les techniques, méthodes et langages utilisés dans l’Intelligence Artificielle tout en se basant sur des connaissances en mathématiques et informatique. ', N'TS', CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[Filieres] ([FiliereID], [NomFiliere], [Description], [TypeDiplome], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'DID', N'Infrastructure Digitale', N'Le tronc commun en infrastructure digitale est une  étape cruciale qui vise à former des stagiares pour concevoir, administrer, optimiser, et sécuriser des architectures et infrastructures IT.', N'TS', CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
INSERT [dbo].[Filieres] ([FiliereID], [NomFiliere], [Description], [TypeDiplome], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'DIDCC', N'Infrastructure Digitale option Cloud Computing', N'Un technicien spécialisé en infrastructure digitale – option Cloud Computing est un professionnel chargé du stockage et de la gestion des données à l''extérieur de l''entreprise. Il est également affecté à la sécurisation de leur accès à partir des postes de travail et des appareils mobiles.', N'TS', CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date), CAST(N'2022-05-18' AS Date))
GO
INSERT [dbo].[Formateur] ([FormateurID], [FirstName], [LastName], [Email], [Phone], [CIN], [Nationalite], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (0, N'Formateur1', N'Formateur1', N'Formateur@email.com', N'066666666', N'CIN123', N'Moroccan', CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
INSERT [dbo].[Formateur] ([FormateurID], [FirstName], [LastName], [Email], [Phone], [CIN], [Nationalite], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (2, N'Mohamed', N'Chikh', N'string', N'09999999', N'KFB4333', N'Maroccain', CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
GO
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'AEP201', N'AEP', 2, CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DGD101', N'DGD', 1, CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DGD102', N'DGD', 1, CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DGD103', N'DGD', 1, CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DGI101', N'DGI', 1, CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DGI102', N'DGI', 1, CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DGI103', N'DGI', 1, CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DID101', N'DID', 1, CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DID102', N'DID', 1, CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DID103', N'DID', 1, CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date), CAST(N'2022-05-19' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DIDCC101', N'DIDCC', 1, CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DIDCC102', N'DIDCC', 1, CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date))
INSERT [dbo].[Groupes] ([AnneScolaire], [GroupID], [FiliereID], [Niveau], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'2021-2022', N'DIDCC201', N'DIDCC', 2, CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date))
GO
INSERT [dbo].[Modules] ([ModuleID], [Intitule], [Description], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'EGTS101', N'Soft skills', N'Soft Skills.', CAST(N'0001-01-01' AS Date), CAST(N'2022-05-29' AS Date), CAST(N'0001-01-01' AS Date))
INSERT [dbo].[Modules] ([ModuleID], [Intitule], [Description], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'EGTS104', N'Gestion des entreprises', N'notions de base sur la Gestion des entreprises ', CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
INSERT [dbo].[Modules] ([ModuleID], [Intitule], [Description], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M100', N'Information sur la formation', N'Information sur la formation', CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
INSERT [dbo].[Modules] ([ModuleID], [Intitule], [Description], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M101', N'Algorithme', N'les notions de base de l''Algorithme  ', CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
INSERT [dbo].[Modules] ([ModuleID], [Intitule], [Description], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M102', N'Programmation structurer', N'Les notions de base en programmation structurer utilisent la language du programmation Python', CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
INSERT [dbo].[Modules] ([ModuleID], [Intitule], [Description], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M103', N'Programmation oriente objet', N'Les notions de base sur la programmation oriente objet.', CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
INSERT [dbo].[Modules] ([ModuleID], [Intitule], [Description], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M104', N'Modelisation UML', N'Les notions de bases sure la modelisation de la structure des donnes dans un programme  utilisant la language de modelisation unifier UML', CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
INSERT [dbo].[Modules] ([ModuleID], [Intitule], [Description], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M201', N'Modelisation des DB (MEURISE/SQLSERVER)', N'notions de bases sur la modelisation des bases des donnes utilisant la methode de modelisation MEURISE et l''environnement SQL SERVER de Microsoft', CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
INSERT [dbo].[Modules] ([ModuleID], [Intitule], [Description], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M202', N'HTML/CSS/JS', N'Front end developement and design', CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
INSERT [dbo].[Modules] ([ModuleID], [Intitule], [Description], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'M203', N'Client-Serveur', N'Client Serveur i hate the antichrist', CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
GO
INSERT [dbo].[Rooms] ([RoomID], [Intitule], [FloorID], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (1, N'SALLE 1', 1, CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
INSERT [dbo].[Rooms] ([RoomID], [Intitule], [FloorID], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (2, N'SALLE 2', 1, CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date))
GO
SET IDENTITY_INSERT [dbo].[Seances] ON 

INSERT [dbo].[Seances] ([SeanceID], [TITLE], [RoomID], [ModuleID], [Objectives], [DateSeance], [StartTime], [FormateurID], [Commentaires], [GroupID], [AnneScolaire], [CREATED_AT], [UPDATED_AT], [DELETED_AT], [TypeSeance]) VALUES (1052, N'ZXCZXCxcvxcV', 1, N'M104', N'ASDASD', CAST(N'2022-05-30' AS Date), N'08:30', 2, N'SDADASD', N'DGD102', N'2021-2022', CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), N'Presentiel')
INSERT [dbo].[Seances] ([SeanceID], [TITLE], [RoomID], [ModuleID], [Objectives], [DateSeance], [StartTime], [FormateurID], [Commentaires], [GroupID], [AnneScolaire], [CREATED_AT], [UPDATED_AT], [DELETED_AT], [TypeSeance]) VALUES (1053, N'ASDASDA', 1, N'M104', N'ASDAS', CAST(N'2022-05-31' AS Date), N'13:30', 2, N'ASDASDAS', N'DGD102', N'2021-2022', CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), CAST(N'0001-01-01' AS Date), N'Presentiel')
SET IDENTITY_INSERT [dbo].[Seances] OFF
GO
SET IDENTITY_INSERT [dbo].[Stagiaires] ON 

INSERT [dbo].[Stagiaires] ([StagiaireID], [FirstName], [LastName], [Phone], [AnneScolaire], [GroupID], [Email], [CIN], [BirthDate], [Address], [Nationalite], [statue], [PhotoUri], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (2, N'Nouh', N'Bakhlakh', N'066666666', N'2021-2022', N'DGD102', N'nouhbk@gmail.com', N'KB179289', CAST(N'2000-09-05' AS Date), N'bendibane', N'Maroccain', N'Active', NULL, CAST(N'0001-01-01' AS Date), CAST(N'2022-05-31' AS Date), CAST(N'0001-01-01' AS Date))
INSERT [dbo].[Stagiaires] ([StagiaireID], [FirstName], [LastName], [Phone], [AnneScolaire], [GroupID], [Email], [CIN], [BirthDate], [Address], [Nationalite], [statue], [PhotoUri], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (12, N'Belahsen', N'Mohamed', N'0222222222', N'2021-2022', N'DGD102', N'exemple@exemple.com', N'CS1N2M3', CAST(N'1992-05-22' AS Date), N'ssss', N'Maroccain', N'Active', NULL, CAST(N'0001-01-01' AS Date), CAST(N'2022-05-31' AS Date), CAST(N'0001-01-01' AS Date))
INSERT [dbo].[Stagiaires] ([StagiaireID], [FirstName], [LastName], [Phone], [AnneScolaire], [GroupID], [Email], [CIN], [BirthDate], [Address], [Nationalite], [statue], [PhotoUri], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (13, N'MOHAMED', N'NADA', N'43534534', N'2021-2022', N'DGD102', N'NADA@GMAIL.COM', N'KWN134', CAST(N'2002-05-23' AS Date), N'DSFSDFSDFSDF', N'Maroccain', N'Active', NULL, CAST(N'0001-01-01' AS Date), CAST(N'2022-05-31' AS Date), CAST(N'0001-01-01' AS Date))
SET IDENTITY_INSERT [dbo].[Stagiaires] OFF
GO
INSERT [dbo].[USERS] ([UserName], [EmailAddress], [UserPasswordHash], [UserPasswordSalt], [FirstName], [LastName], [CreationDate], [Level], [LastAccessed], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'dio', N'string', 0xE289670D6179E7D4877201B2EECF75DD4195EA77AE30CC67B79996CC8621A84912872F5A48118BA175188B5A3990D879180A81F5E766E5FAB5CF543BD11DA5F7, 0x82CCA6406792A05D1A6E16D702A0E6CF115A2BB7A87881A4A5E104F00D4728E64332C3917BC50BCC8A1B825D572AD8B8884448A9CC9FFDC2AD82B4EF5BD80D200DA25E89A954E0D7A73A469C93C572A9DD92F996FCC80631B31EE8F9439030F45EB8ECA0E57806DC1AAAF5CB836EAE80F145F583B5A02E88A45E77B9C4674730, N'string', N'string', CAST(N'2022-03-26' AS Date), 1, CAST(N'2022-03-26' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
INSERT [dbo].[USERS] ([UserName], [EmailAddress], [UserPasswordHash], [UserPasswordSalt], [FirstName], [LastName], [CreationDate], [Level], [LastAccessed], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'dio2', N'dio2', 0x28D443316389BB376C25430CE594E08A9C008BFD600237AEA2606804C89AC109E5D0058DFDE5A1DAA2E104FB39767D5627A27A458E7419C8EC82B80D4FCA1B6E, 0x0EF0706E8B714E8250C168347F32AABA4BB2F99E317FE712BF3A125B0A67BFD7D7513708A02B410C0DEF841C668922F9DFE97C4EA4A05530C2D254B7D70EC6D4CD74D1FCA4DB91937793F3F7E20907A1CCE7BB0F8D5B6B5637DF776835BEFDFCEDAD127145F2473178A0EAE49979F803D3E5C58B486F3DFE9E1B1774D9FB007C, N'dio', N'joestar', CAST(N'2022-05-31' AS Date), 2, CAST(N'2022-05-31' AS Date), CAST(N'2022-05-31' AS Date), CAST(N'2022-05-31' AS Date), CAST(N'2022-05-31' AS Date))
INSERT [dbo].[USERS] ([UserName], [EmailAddress], [UserPasswordHash], [UserPasswordSalt], [FirstName], [LastName], [CreationDate], [Level], [LastAccessed], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'salmanada', N'salmanada@gmail.com', 0x33C00C24ED5FD62774CBAC8F98859E45BBAD08BFAF6649F9B28BBD4BAB444FBDC9D60968A9DCB3C8D0D1DFE9B22B4DA3AC8A3BBC2BAF83875BF0699CB6732CF3, 0x1D4B009B8DD14D4361E516EE38429B6E9B8113B619B9CDC67B6927A55E565C044D1057EA2FDE530DE4C6CB3DA4E2AE9326F2DCB2517CC3A64189C45843D88652AD236EEABE1BDD2AE987D30169C49DC4A84DF623A4C5B69E313D51DE184D66E26ADA0894F8A8BC4A6C7E52AA9F8B383B43F9599C033EA2C163D8824BEB2C81D6, N'salma', N'nada', CAST(N'2022-05-29' AS Date), 1, CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date), CAST(N'2022-05-29' AS Date))
INSERT [dbo].[USERS] ([UserName], [EmailAddress], [UserPasswordHash], [UserPasswordSalt], [FirstName], [LastName], [CreationDate], [Level], [LastAccessed], [CREATED_AT], [UPDATED_AT], [DELETED_AT]) VALUES (N'User1', N'example@example.com', 0x88A815CD1409220850778CCCEA9FC8BA3FC71A5B9E4BD91D5B15DD6E56FB20C48123B9BFE48B934EE42A54F3E82673E072998611BCF10EECF8AEA8963BEF315F, 0xFFC631D85FCC25BA59EC6BCCAF49AC12963CC9AE71F26A5F29A3816AA6FB3365896AC8D630E9B695A6453122217060F951FDB4BE1E821B0484642CDCE08FCA0AB09243757C9B0D1457F4D0FCB3A5EDF0F48C9E30222D3C625C85C8FBC6AB02097354F383380402695F8AEC0BC15D976AF88526ACEFFC8531B4E48983711DBD16, N'Mohamed', N'Darkaoui', CAST(N'2022-05-04' AS Date), 1, CAST(N'2022-05-04' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date), CAST(N'2022-05-14' AS Date))
GO
/****** Object:  Index [UQ__Absences__92C160FE3B364CEB]    Script Date: 6/3/2022 10:43:50 AM ******/
ALTER TABLE [dbo].[Absences] ADD UNIQUE NONCLUSTERED 
(
	[SeanceID] ASC,
	[StagiaireID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Formateu__A9D105342997CD6C]    Script Date: 6/3/2022 10:43:50 AM ******/
ALTER TABLE [dbo].[Formateur] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Formateu__C1F8DC5644343A7A]    Script Date: 6/3/2022 10:43:50 AM ******/
ALTER TABLE [dbo].[Formateur] ADD UNIQUE NONCLUSTERED 
(
	[CIN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Seances__2050E7A4F76F7EDE]    Script Date: 6/3/2022 10:43:50 AM ******/
ALTER TABLE [dbo].[Seances] ADD UNIQUE NONCLUSTERED 
(
	[DateSeance] ASC,
	[FormateurID] ASC,
	[StartTime] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Stagiair__C1F8DC5667C86918]    Script Date: 6/3/2022 10:43:50 AM ******/
ALTER TABLE [dbo].[Stagiaires] ADD UNIQUE NONCLUSTERED 
(
	[CIN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__USERS__49A14740551F2A5E]    Script Date: 6/3/2022 10:43:50 AM ******/
ALTER TABLE [dbo].[USERS] ADD UNIQUE NONCLUSTERED 
(
	[EmailAddress] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Absences] ADD  DEFAULT ('NO') FOR [Justified]
GO
ALTER TABLE [dbo].[FiliereModule] ADD  DEFAULT (getdate()) FOR [CREATED_AT]
GO
ALTER TABLE [dbo].[FiliereModule] ADD  DEFAULT (getdate()) FOR [UPDATED_AT]
GO
ALTER TABLE [dbo].[FiliereModule] ADD  DEFAULT (getdate()) FOR [DELETED_AT]
GO
ALTER TABLE [dbo].[Filieres] ADD  DEFAULT (getdate()) FOR [CREATED_AT]
GO
ALTER TABLE [dbo].[Filieres] ADD  DEFAULT (getdate()) FOR [UPDATED_AT]
GO
ALTER TABLE [dbo].[Filieres] ADD  DEFAULT (getdate()) FOR [DELETED_AT]
GO
ALTER TABLE [dbo].[Formateur] ADD  DEFAULT (getdate()) FOR [CREATED_AT]
GO
ALTER TABLE [dbo].[Formateur] ADD  DEFAULT (getdate()) FOR [UPDATED_AT]
GO
ALTER TABLE [dbo].[Formateur] ADD  DEFAULT (getdate()) FOR [DELETED_AT]
GO
ALTER TABLE [dbo].[Groupes] ADD  DEFAULT (getdate()) FOR [CREATED_AT]
GO
ALTER TABLE [dbo].[Groupes] ADD  DEFAULT (getdate()) FOR [UPDATED_AT]
GO
ALTER TABLE [dbo].[Groupes] ADD  DEFAULT (getdate()) FOR [DELETED_AT]
GO
ALTER TABLE [dbo].[Modules] ADD  DEFAULT (getdate()) FOR [CREATED_AT]
GO
ALTER TABLE [dbo].[Modules] ADD  DEFAULT (getdate()) FOR [UPDATED_AT]
GO
ALTER TABLE [dbo].[Modules] ADD  DEFAULT (getdate()) FOR [DELETED_AT]
GO
ALTER TABLE [dbo].[Rooms] ADD  DEFAULT (getdate()) FOR [CREATED_AT]
GO
ALTER TABLE [dbo].[Rooms] ADD  DEFAULT (getdate()) FOR [UPDATED_AT]
GO
ALTER TABLE [dbo].[Rooms] ADD  DEFAULT (getdate()) FOR [DELETED_AT]
GO
ALTER TABLE [dbo].[Seances] ADD  DEFAULT (getdate()) FOR [CREATED_AT]
GO
ALTER TABLE [dbo].[Seances] ADD  DEFAULT (getdate()) FOR [UPDATED_AT]
GO
ALTER TABLE [dbo].[Seances] ADD  DEFAULT (getdate()) FOR [DELETED_AT]
GO
ALTER TABLE [dbo].[Seances] ADD  DEFAULT ('Presentiel') FOR [TypeSeance]
GO
ALTER TABLE [dbo].[Stagiaires] ADD  DEFAULT (getdate()) FOR [CREATED_AT]
GO
ALTER TABLE [dbo].[Stagiaires] ADD  DEFAULT (getdate()) FOR [UPDATED_AT]
GO
ALTER TABLE [dbo].[Stagiaires] ADD  DEFAULT (getdate()) FOR [DELETED_AT]
GO
ALTER TABLE [dbo].[USERS] ADD  DEFAULT (getdate()) FOR [CreationDate]
GO
ALTER TABLE [dbo].[USERS] ADD  DEFAULT (getdate()) FOR [CREATED_AT]
GO
ALTER TABLE [dbo].[USERS] ADD  DEFAULT (getdate()) FOR [UPDATED_AT]
GO
ALTER TABLE [dbo].[USERS] ADD  DEFAULT (getdate()) FOR [DELETED_AT]
GO
ALTER TABLE [dbo].[Absences]  WITH CHECK ADD FOREIGN KEY([SeanceID])
REFERENCES [dbo].[Seances] ([SeanceID])
GO
ALTER TABLE [dbo].[Absences]  WITH CHECK ADD FOREIGN KEY([StagiaireID])
REFERENCES [dbo].[Stagiaires] ([StagiaireID])
GO
ALTER TABLE [dbo].[FiliereModule]  WITH CHECK ADD FOREIGN KEY([FiliereID])
REFERENCES [dbo].[Filieres] ([FiliereID])
GO
ALTER TABLE [dbo].[FiliereModule]  WITH CHECK ADD FOREIGN KEY([ModuleID])
REFERENCES [dbo].[Modules] ([ModuleID])
GO
ALTER TABLE [dbo].[Groupes]  WITH CHECK ADD FOREIGN KEY([FiliereID])
REFERENCES [dbo].[Filieres] ([FiliereID])
GO
ALTER TABLE [dbo].[Seances]  WITH CHECK ADD FOREIGN KEY([FormateurID])
REFERENCES [dbo].[Formateur] ([FormateurID])
GO
ALTER TABLE [dbo].[Seances]  WITH CHECK ADD FOREIGN KEY([ModuleID])
REFERENCES [dbo].[Modules] ([ModuleID])
GO
ALTER TABLE [dbo].[Seances]  WITH CHECK ADD FOREIGN KEY([RoomID])
REFERENCES [dbo].[Rooms] ([RoomID])
GO
ALTER TABLE [dbo].[Seances]  WITH CHECK ADD  CONSTRAINT [FK_Groupes_Seances] FOREIGN KEY([AnneScolaire], [GroupID])
REFERENCES [dbo].[Groupes] ([AnneScolaire], [GroupID])
GO
ALTER TABLE [dbo].[Seances] CHECK CONSTRAINT [FK_Groupes_Seances]
GO
ALTER TABLE [dbo].[Stagiaires]  WITH CHECK ADD  CONSTRAINT [FK_Groupes_Stagiares] FOREIGN KEY([AnneScolaire], [GroupID])
REFERENCES [dbo].[Groupes] ([AnneScolaire], [GroupID])
GO
ALTER TABLE [dbo].[Stagiaires] CHECK CONSTRAINT [FK_Groupes_Stagiares]
GO
ALTER TABLE [dbo].[Teaching]  WITH CHECK ADD FOREIGN KEY([AnneScolaire], [GroupID])
REFERENCES [dbo].[Groupes] ([AnneScolaire], [GroupID])
GO
ALTER TABLE [dbo].[Teaching]  WITH CHECK ADD FOREIGN KEY([FormateurID])
REFERENCES [dbo].[Formateur] ([FormateurID])
GO
ALTER TABLE [dbo].[Teaching]  WITH CHECK ADD FOREIGN KEY([ModuleID])
REFERENCES [dbo].[Modules] ([ModuleID])
GO
ALTER TABLE [dbo].[Absences]  WITH CHECK ADD CHECK  (([Justified]='YES' OR [Justified]='NO'))
GO
ALTER TABLE [dbo].[Filieres]  WITH CHECK ADD  CONSTRAINT [CK__Filieres__TypeDi__5CD6CB2B] CHECK  (([TypeDiplome] like 'TS' OR [TypeDiplome] like 'T' OR [TypeDiplome] like 'FQ'))
GO
ALTER TABLE [dbo].[Filieres] CHECK CONSTRAINT [CK__Filieres__TypeDi__5CD6CB2B]
GO
ALTER TABLE [dbo].[Seances]  WITH CHECK ADD CHECK  (([TypeSeance]='Presentiel' OR [TypeSeance]='Distance'))
GO
ALTER TABLE [dbo].[USERS]  WITH CHECK ADD CHECK  (([Level]>=(1) AND [Level]<=(2)))
GO
/****** Object:  StoredProcedure [dbo].[GetXModuleFiliere]    Script Date: 6/3/2022 10:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetXModuleFiliere] @IDF VARCHAR(100)
AS

select * from Modules where ModuleID not in (SELECT Modules.ModuleID FROM Modules 
join FiliereModule on modules.ModuleID =FiliereModule.ModuleID
where FiliereModule.FiliereID =@IDF )
GO
USE [master]
GO
ALTER DATABASE [PFF] SET  READ_WRITE 
GO
