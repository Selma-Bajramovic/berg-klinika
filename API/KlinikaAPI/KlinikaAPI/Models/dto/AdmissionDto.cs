namespace KlinikaAPI.Models.dto
{
    public class AdmissionDto
    {
        public int Id { get; set; }
        public DateTime AdmissionDateTime { get; set; }
        public string PatientName { get; set; }
        public string DoctorDetails { get; set; }
        public bool IsEmergency { get; set; }
    }
}
