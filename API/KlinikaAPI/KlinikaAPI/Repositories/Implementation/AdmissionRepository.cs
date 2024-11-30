using KlinikaAPI.Data;
using KlinikaAPI.Models.Domain;
using KlinikaAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace KlinikaAPI.Repositories.Implementation
{
    public class AdmissionRepository : IAdmissionRepository
    {
        private readonly KlinikaDbContext _context;

        public AdmissionRepository(KlinikaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Admission>> GetAdmissionsAsync(DateTime? fromDate, DateTime? toDate)
        {
            var query = _context.Admissions
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .AsQueryable();

            if (fromDate.HasValue)
                query = query.Where(a => a.AdmissionDateTime >= fromDate.Value);

            if (toDate.HasValue)
                query = query.Where(a => a.AdmissionDateTime <= toDate.Value);

            return await query.ToListAsync();
        }

        public async Task<Admission?> GetAdmissionByIdAsync(int id)
        {
            return await _context.Admissions
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task AddAdmissionAsync(Admission admission)
        {
            await _context.Admissions.AddAsync(admission);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAdmissionAsync(Admission admission)
        {
            _context.Admissions.Update(admission);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAdmissionAsync(int id)
        {
            var admission = await _context.Admissions.FindAsync(id);
            if (admission != null)
            {
                _context.Admissions.Remove(admission);
                await _context.SaveChangesAsync();
            }
        }
    }
}
