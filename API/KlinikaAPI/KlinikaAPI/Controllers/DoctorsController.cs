using KlinikaAPI.Models.Domain;
using KlinikaAPI.Models.dto;
using KlinikaAPI.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KlinikaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorRepository _doctorRepository;

        public DoctorsController(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _doctorRepository.GetAllDoctorsAsync();
            var doctorDtos = doctors.Select(d => new DoctorDto
            {
                Id = d.Id,
                Name = d.Name,
                Surname = d.Surname,
                JMBG=d.JMBG,
                DateOfBirth = d.DateOfBirth,
                Gender= d.Gender,
                Address=d.Address,
                PhoneNumber=d.PhoneNumber,
                Title = d.Title,
                DoctorCode = d.DoctorCode
            });
            return Ok(doctorDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctorById(int id)
        {
            var doctor = await _doctorRepository.GetDoctorByIdAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            var doctorDto = new DoctorDto
            {
                Id = doctor.Id,
                Name = doctor.Name,
                Surname = doctor.Surname,
                JMBG = doctor.JMBG,
                DateOfBirth = doctor.DateOfBirth,
                Gender = doctor.Gender,
                Address = doctor.Address,
                PhoneNumber = doctor.PhoneNumber,
                Title = doctor.Title,
                DoctorCode = doctor.DoctorCode
            };

            return Ok(doctorDto);
        }


        [HttpPost]
        public async Task<IActionResult> AddDoctor([FromBody] AddDoctorRequestDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var doctor = new Doctor
            {
                Name = request.Name,
                Surname = request.Surname,
                JMBG = request.JMBG,
                DateOfBirth = request.DateOfBirth,
                Gender = request.Gender,
                Address = request.Address,
                PhoneNumber = request.PhoneNumber,
                Title = request.Title
            };

            doctor.DoctorCode = GenerateDoctorCode(request.Name, request.Surname);

            await _doctorRepository.AddDoctorAsync(doctor);

            await _doctorRepository.UpdateDoctorAsync(doctor);

            var doctorDto = new DoctorDto
            {
                Id = doctor.Id,
                Name = doctor.Name,
                Surname = doctor.Surname,
                JMBG = doctor.JMBG,
                DateOfBirth = doctor.DateOfBirth,
                Gender = doctor.Gender,
                Address = doctor.Address,
                PhoneNumber = doctor.PhoneNumber,
                Title = doctor.Title,
                DoctorCode = doctor.DoctorCode + $"{doctor.Id}"
            };

            return Ok(doctorDto);

        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateDoctor(int id, [FromBody] AddDoctorRequestDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingDoctor = await _doctorRepository.GetDoctorByIdAsync(id);
            if (existingDoctor == null)
            {
                return NotFound($"Doctor with ID {id} not found.");
            }

            existingDoctor.Name = request.Name;
            existingDoctor.Surname = request.Surname;
            existingDoctor.JMBG = request.JMBG;
            existingDoctor.DateOfBirth = request.DateOfBirth;
            existingDoctor.Gender = request.Gender;
            existingDoctor.Address = request.Address;
            existingDoctor.PhoneNumber = request.PhoneNumber;
            existingDoctor.Title = request.Title;

            existingDoctor.DoctorCode = GenerateDoctorCode(existingDoctor.Name, existingDoctor.Surname) + $"{existingDoctor.Id}";

            await _doctorRepository.UpdateDoctorAsync(existingDoctor);

            var doctorDto = new DoctorDto
            {
                Id = existingDoctor.Id,
                Name = existingDoctor.Name,
                Surname = existingDoctor.Surname,
                JMBG = existingDoctor.JMBG,
                DateOfBirth = existingDoctor.DateOfBirth,
                Gender = existingDoctor.Gender,
                Address = existingDoctor.Address,
                PhoneNumber = existingDoctor.PhoneNumber,
                Title = existingDoctor.Title,
                DoctorCode = existingDoctor.DoctorCode
            };

            return Ok(doctorDto);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var existingDoctor = await _doctorRepository.GetDoctorByIdAsync(id);
            if (existingDoctor == null)
            {
                return NotFound($"Doctor with ID {id} not found.");
            }

            await _doctorRepository.DeleteDoctorAsync(id);

            return Ok(new { message = $"Doctor with ID {id} has been deleted." });
        }
        private string GenerateDoctorCode(string name, string surname)
        {
            return $"{name[0]}{surname[0]}".ToUpper();
        }


    }
}
