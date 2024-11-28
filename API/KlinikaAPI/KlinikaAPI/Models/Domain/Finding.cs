namespace KlinikaAPI.Models.Domain
{
    public class Finding
    {
        public int Id { get; set; }
        public int AdmissionId { get; set; }
        public Admission Admission { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
