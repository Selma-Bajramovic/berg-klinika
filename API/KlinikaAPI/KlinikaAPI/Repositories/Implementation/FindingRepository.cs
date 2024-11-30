using KlinikaAPI.Data;
using KlinikaAPI.Models.Domain;
using KlinikaAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace KlinikaAPI.Repositories.Implementation
{
    public class FindingRepository : IFindingRepository
    {
        private readonly KlinikaDbContext _context;

        public FindingRepository(KlinikaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Finding>> GetAllFindingsAsync()
        {
            return await _context.Findings
                .Include(f => f.Admission)
                .ThenInclude(a => a.Patient)
                .Include(f => f.Admission.Doctor)
                .ToListAsync();
        }

        public async Task<Finding?> GetFindingByIdAsync(int id)
        {
            return await _context.Findings
                .Include(f => f.Admission)
                .ThenInclude(a => a.Patient)
                .Include(f => f.Admission.Doctor)
                .FirstOrDefaultAsync(f => f.Id == id);
        }


        public async Task AddFindingAsync(Finding finding)
        {
            await _context.Findings.AddAsync(finding);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateFindingAsync(Finding finding)
        {
            _context.Findings.Update(finding);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteFindingAsync(int id)
        {
            var finding = await _context.Findings.FindAsync(id);
            if (finding != null)
            {
                _context.Findings.Remove(finding);
                await _context.SaveChangesAsync();
            }
        }
    }
}
