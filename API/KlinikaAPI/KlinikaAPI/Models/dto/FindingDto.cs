namespace KlinikaAPI.Models.dto
{
    public class FindingDto
    {
        public int Id { get; set; }
        public int AdmissionId { get; set; }
        public string DoctorDetails { get; set; }
        public string PatientName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
    
    }
}
