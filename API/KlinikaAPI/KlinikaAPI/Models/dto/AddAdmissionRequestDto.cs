namespace KlinikaAPI.Models.dto
{
    public class AddAdmissionRequestDto
    {
        public DateTime AdmissionDateTime { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public bool IsEmergency { get; set; }
    }
}
