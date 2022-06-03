using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace testWebAPI1.Models
{
    public partial class PFFContext : DbContext
    {
        public PFFContext()
        {
        }

        public PFFContext(DbContextOptions<PFFContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Absence> Absences { get; set; } = null!;
        public virtual DbSet<Filiere> Filieres { get; set; } = null!;
        public virtual DbSet<FiliereModule> FiliereModules { get; set; } = null!;
        public virtual DbSet<Formateur> Formateurs { get; set; } = null!;
        public virtual DbSet<Groupe> Groupes { get; set; } = null!;
        public virtual DbSet<Module> Modules { get; set; } = null!;
        public virtual DbSet<Room> Rooms { get; set; } = null!;
        public virtual DbSet<Seance> Seances { get; set; } = null!;
        public virtual DbSet<Stagiaire> Stagiaires { get; set; } = null!;
        public virtual DbSet<Teaching> Teachings { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
               // optionsBuilder.UseSqlServer("Server=localhost, 1433;Database=PFF;User Id=sa;Password=PFFGENERICPASSWORD123!");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Absence>(entity =>
            {
                entity.HasIndex(e => new { e.SeanceId, e.StagiaireId }, "UQ__Absences__92C160FE3B364CEB")
                    .IsUnique();

                entity.Property(e => e.AbsenceId).HasColumnName("AbsenceID");

                entity.Property(e => e.AdditionalInfo)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.Justified)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('NO')");

                entity.Property(e => e.SeanceId).HasColumnName("SeanceID");

                entity.Property(e => e.StagiaireId).HasColumnName("StagiaireID");

                entity.HasOne(d => d.Seance)
                    .WithMany(p => p.Absences)
                    .HasForeignKey(d => d.SeanceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Absences__Seance__7D439ABD");

                entity.HasOne(d => d.Stagiaire)
                    .WithMany(p => p.Absences)
                    .HasForeignKey(d => d.StagiaireId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Absences__Stagia__7E37BEF6");
            });

            modelBuilder.Entity<Filiere>(entity =>
            {
                entity.Property(e => e.FiliereId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("FiliereID");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("date")
                    .HasColumnName("CREATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DeletedAt)
                    .HasColumnType("date")
                    .HasColumnName("DELETED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Description)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.NomFiliere)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TypeDiplome)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("date")
                    .HasColumnName("UPDATED_AT")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<FiliereModule>(entity =>
            {
                entity.HasKey(e => new { e.ModuleId, e.FiliereId });

                entity.ToTable("FiliereModule");

                entity.Property(e => e.ModuleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ModuleID");

                entity.Property(e => e.FiliereId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("FiliereID");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("date")
                    .HasColumnName("CREATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DeletedAt)
                    .HasColumnType("date")
                    .HasColumnName("DELETED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("date")
                    .HasColumnName("UPDATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Filiere)
                    .WithMany(p => p.FiliereModules)
                    .HasForeignKey(d => d.FiliereId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FiliereMo__Filie__5629CD9C");

                entity.HasOne(d => d.Module)
                    .WithMany(p => p.FiliereModules)
                    .HasForeignKey(d => d.ModuleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FiliereMo__Modul__571DF1D5");
            });

            modelBuilder.Entity<Formateur>(entity =>
            {
                entity.ToTable("Formateur");

                entity.HasIndex(e => e.Email, "UQ__Formateu__A9D105342997CD6C")
                    .IsUnique();

                entity.HasIndex(e => e.Cin, "UQ__Formateu__C1F8DC5644343A7A")
                    .IsUnique();

                entity.Property(e => e.FormateurId)
                    .ValueGeneratedNever()
                    .HasColumnName("FormateurID");

                entity.Property(e => e.Cin)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .HasColumnName("CIN");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("date")
                    .HasColumnName("CREATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DeletedAt)
                    .HasColumnType("date")
                    .HasColumnName("DELETED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email)
                    .HasMaxLength(168)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nationalite)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("date")
                    .HasColumnName("UPDATED_AT")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Groupe>(entity =>
            {
                entity.HasKey(e => new { e.AnneScolaire, e.GroupId })
                    .HasName("PK_GROUP");

                entity.Property(e => e.AnneScolaire)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.GroupId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("GroupID");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("date")
                    .HasColumnName("CREATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DeletedAt)
                    .HasColumnType("date")
                    .HasColumnName("DELETED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FiliereId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("FiliereID");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("date")
                    .HasColumnName("UPDATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Filiere)
                    .WithMany(p => p.Groupes)
                    .HasForeignKey(d => d.FiliereId)
                    .HasConstraintName("FK__Groupes__Filiere__5812160E");
            });

            modelBuilder.Entity<Module>(entity =>
            {
                entity.Property(e => e.ModuleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ModuleID");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("date")
                    .HasColumnName("CREATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DeletedAt)
                    .HasColumnType("date")
                    .HasColumnName("DELETED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Description)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.Intitule)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("date")
                    .HasColumnName("UPDATED_AT")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.Property(e => e.RoomId)
                    .ValueGeneratedNever()
                    .HasColumnName("RoomID");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("date")
                    .HasColumnName("CREATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DeletedAt)
                    .HasColumnType("date")
                    .HasColumnName("DELETED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FloorId).HasColumnName("FloorID");

                entity.Property(e => e.Intitule)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("date")
                    .HasColumnName("UPDATED_AT")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Seance>(entity =>
            {
                entity.HasIndex(e => new { e.DateSeance, e.FormateurId, e.StartTime }, "UQ__Seances__2050E7A4F76F7EDE")
                    .IsUnique();

                entity.Property(e => e.SeanceId).HasColumnName("SeanceID");

                entity.Property(e => e.AnneScolaire)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Commentaires)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("date")
                    .HasColumnName("CREATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DateSeance).HasColumnType("date");

                entity.Property(e => e.DeletedAt)
                    .HasColumnType("date")
                    .HasColumnName("DELETED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FormateurId).HasColumnName("FormateurID");

                entity.Property(e => e.GroupId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("GroupID");

                entity.Property(e => e.ModuleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ModuleID");

                entity.Property(e => e.Objectives)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.RoomId).HasColumnName("RoomID");

                entity.Property(e => e.StartTime)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("TITLE");

                entity.Property(e => e.TypeSeance)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Presentiel')");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("date")
                    .HasColumnName("UPDATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Formateur)
                    .WithMany(p => p.Seances)
                    .HasForeignKey(d => d.FormateurId)
                    .HasConstraintName("FK__Seances__Formate__59063A47");

                entity.HasOne(d => d.Module)
                    .WithMany(p => p.Seances)
                    .HasForeignKey(d => d.ModuleId)
                    .HasConstraintName("FK__Seances__ModuleI__59FA5E80");

                entity.HasOne(d => d.Room)
                    .WithMany(p => p.Seances)
                    .HasForeignKey(d => d.RoomId)
                    .HasConstraintName("FK__Seances__RoomID__5AEE82B9");

                entity.HasOne(d => d.Groupe)
                    .WithMany(p => p.Seances)
                    .HasForeignKey(d => new { d.AnneScolaire, d.GroupId })
                    .HasConstraintName("FK_Groupes_Seances");
            });

            modelBuilder.Entity<Stagiaire>(entity =>
            {
                entity.HasIndex(e => e.Cin, "UQ__Stagiair__C1F8DC5667C86918")
                    .IsUnique();

                entity.Property(e => e.StagiaireId).HasColumnName("StagiaireID");

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.AnneScolaire)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.BirthDate).HasColumnType("date");

                entity.Property(e => e.Cin)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("CIN");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("date")
                    .HasColumnName("CREATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DeletedAt)
                    .HasColumnType("date")
                    .HasColumnName("DELETED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email)
                    .HasMaxLength(169)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.GroupId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("GroupID");

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nationalite)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.PhotoUri)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Statue)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("statue");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("date")
                    .HasColumnName("UPDATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Groupe)
                    .WithMany(p => p.Stagiaires)
                    .HasForeignKey(d => new { d.AnneScolaire, d.GroupId })
                    .HasConstraintName("FK_Groupes_Stagiares");
            });

            modelBuilder.Entity<Teaching>(entity =>
            {
                entity.HasKey(e => new { e.FormateurId, e.GroupId, e.AnneScolaire, e.ModuleId })
                    .HasName("PK__Teaching__6AE169002E5D1A4A");

                entity.ToTable("Teaching");

                entity.Property(e => e.FormateurId).HasColumnName("FormateurID");

                entity.Property(e => e.GroupId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("GroupID");

                entity.Property(e => e.AnneScolaire)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ModuleId)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("ModuleID");

                entity.HasOne(d => d.Formateur)
                    .WithMany(p => p.Teachings)
                    .HasForeignKey(d => d.FormateurId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Teaching__Format__5EBF139D");

                entity.HasOne(d => d.Module)
                    .WithMany(p => p.Teachings)
                    .HasForeignKey(d => d.ModuleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Teaching__Module__5FB337D6");

                entity.HasOne(d => d.Groupe)
                    .WithMany(p => p.Teachings)
                    .HasForeignKey(d => new { d.AnneScolaire, d.GroupId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Teaching__5DCAEF64");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserName)
                    .HasName("PK__USERS__C9F284575FEF1DB2");

                entity.ToTable("USERS");

                entity.HasIndex(e => e.EmailAddress, "UQ__USERS__49A14740551F2A5E")
                    .IsUnique();

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("date")
                    .HasColumnName("CREATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CreationDate)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DeletedAt)
                    .HasColumnType("date")
                    .HasColumnName("DELETED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.EmailAddress)
                    .HasMaxLength(164)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastAccessed).HasColumnType("date");

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("date")
                    .HasColumnName("UPDATED_AT")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UserPasswordHash).HasMaxLength(8000);

                entity.Property(e => e.UserPasswordSalt).HasMaxLength(8000);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
