namespace KlinikaAPI.Models.Domain
{
    public class Admission
    {
        public int Id { get; set; }
        public DateTime AdmissionDateTime { get; set; }
        public int PatientId { get; set; }
        public Patient Patient { get; set; }
        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public bool IsEmergency { get; set; }
    }
}
