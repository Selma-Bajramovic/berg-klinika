namespace KlinikaAPI.Models.dto
{
    public class DoctorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string JMBG { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string Title { get; set; }
        public bool IsSpec {  get; set; }
        public string DoctorCode { get; set; }
    }
}
