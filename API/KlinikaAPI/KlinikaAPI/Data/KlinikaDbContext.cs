using KlinikaAPI.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace KlinikaAPI.Data
{
    public class KlinikaDbContext   :  DbContext
    {
        public KlinikaDbContext(DbContextOptions<KlinikaDbContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Admission> Admissions { get; set; }


        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Doctor>().HasData(
        //        new Doctor
        //        {
        //            Id=1,
        //            Name = "Selma",
        //            Surname = "Bajramović",
        //            JMBG = "1808002155002",
        //            DateOfBirth = new DateTime(2002, 8, 18),
        //            Gender = "Žensko",
        //            Address = "Ulica 1",
        //            PhoneNumber = "062000111",
        //            Title = "Specijalizant",
        //            DoctorCode = GenerateDoctorCode("Selma", "Bajramović", 1)

        //        });

        //    modelBuilder.Entity<Patient>().HasData(
        //        new Patient
        //        {
        //            Id =2,
        //            Name = "Lana",
        //            Surname = "Memić",
        //            JMBG = "1112223334445",
        //            DateOfBirth = new DateTime(2000, 7, 10),
        //            Gender = "Muško",
        //            Address = "Ulica 2",
        //            PhoneNumber = "062111888"
        //        },
        //        new Patient
        //        {
        //            Id = 3,
        //            Name = "Elma",
        //            Surname = "Mustafić",
        //            JMBG = "1234567890123",
        //            DateOfBirth = new DateTime(2003, 9, 28),
        //            Gender = "Žensko",
        //            Address = "Ulica 3",
        //            PhoneNumber = "063111999"
        //        }
        //        );


        //    base.OnModelCreating(modelBuilder);
        //}

        //private static string GenerateDoctorCode(string name, string surname, int id)
        //{
        //    return $"{name[0]}{surname[0]}{id}".ToUpper();
        //}
    }
}
