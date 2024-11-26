namespace KlinikaAPI.Models.Domain
{
    public class Doctor:Person
    {
        public string Title { get; set; }
        public string DoctorCode { get; set; }
    }
}
