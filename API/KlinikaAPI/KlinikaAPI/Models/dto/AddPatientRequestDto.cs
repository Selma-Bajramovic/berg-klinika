namespace KlinikaAPI.Models.dto
{
    public class AddPatientRequestDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string JMBG { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
    }

}
