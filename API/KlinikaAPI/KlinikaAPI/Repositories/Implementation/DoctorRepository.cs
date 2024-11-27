using KlinikaAPI.Data;
using KlinikaAPI.Models.Domain;
using KlinikaAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace KlinikaAPI.Repositories.Implementation
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly KlinikaDbContext _context;

        public DoctorRepository(KlinikaDbContext context)
        {
            _context = context;            
        }

        public async Task<IEnumerable<Doctor>> GetAllDoctorsAsync() {
            return await _context.Doctors.ToListAsync();
        }
       public async Task<Doctor> GetDoctorByIdAsync(int id)
        {
            return await _context.Doctors.FindAsync(id);
        }
        public async Task AddDoctorAsync(Doctor doctor)
        {
            await _context.Doctors.AddAsync(doctor);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateDoctorAsync(Doctor doctor)
        {
            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();

        }
        public async Task DeleteDoctorAsync(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor != null)
            {
                _context.Doctors.Remove(doctor);
                await _context.SaveChangesAsync();
            }
        }

    }
}
