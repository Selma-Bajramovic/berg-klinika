using KlinikaAPI.Models.Domain;

namespace KlinikaAPI.Repositories.Interface
{
    public interface IFindingRepository
    {
        Task<IEnumerable<Finding>> GetAllFindingsAsync();
        Task<Finding?> GetFindingByIdAsync(int id);
        Task AddFindingAsync(Finding finding);
        Task UpdateFindingAsync(Finding finding);
        Task DeleteFindingAsync(int id);
    }
}
