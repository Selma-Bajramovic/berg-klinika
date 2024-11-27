using KlinikaAPI.Models.Domain;

namespace KlinikaAPI.Repositories.Interface
{
    public interface IAdmissionRepository
    {
        Task<IEnumerable<Admission>> GetAdmissionsAsync(DateTime? fromDate, DateTime? toDate);

        Task<Admission?> GetAdmissionByIdAsync(int id);

        Task AddAdmissionAsync(Admission admission);

        Task UpdateAdmissionAsync(Admission admission);

        Task DeleteAdmissionAsync(int id);

    }
}
