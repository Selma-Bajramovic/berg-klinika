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
        public DbSet<Finding> Findings { get; set; }



    }
}
