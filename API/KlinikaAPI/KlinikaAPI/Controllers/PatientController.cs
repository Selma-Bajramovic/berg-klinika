using KlinikaAPI.Models.Domain;
using KlinikaAPI.Models.dto;
using KlinikaAPI.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KlinikaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientRepository _patientRepository;

        public PatientController(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await _patientRepository.GetAllPatientsAsync();
            var patientDtos = patients.Select(p => new PatientDto
            {
                Id = p.Id,
                Name = p.Name,
                Surname = p.Surname,
                JMBG = p.JMBG,
                DateOfBirth = p.DateOfBirth,
                Gender = p.Gender,
                Address = p.Address,
                PhoneNumber = p.PhoneNumber
            });

            return Ok(patientDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientById(int id)
        {
            var patient = await _patientRepository.GetPatientByIdAsync(id);
            if (patient == null)
                return NotFound($"Patient with ID {id} not found.");

            var patientDto = new PatientDto
            {
                Id = patient.Id,
                Name = patient.Name,
                Surname = patient.Surname,
                JMBG = patient.JMBG,
                DateOfBirth = patient.DateOfBirth,
                Gender = patient.Gender,
                Address = patient.Address,
                PhoneNumber = patient.PhoneNumber
            };

            return Ok(patientDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddPatient([FromBody] AddPatientRequestDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var patient = new Patient
            {
                Name = request.Name,
                Surname = request.Surname,
                JMBG = request.JMBG,
                DateOfBirth = request.DateOfBirth,
                Gender = request.Gender,
                Address = request.Address,
                PhoneNumber = request.PhoneNumber
            };

            await _patientRepository.AddPatientAsync(patient);

            return Ok(new { message = "Patient added successfully.", Id = patient.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, [FromBody] AddPatientRequestDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingPatient = await _patientRepository.GetPatientByIdAsync(id);
            if (existingPatient == null)
                return NotFound($"Patient with ID {id} not found.");

            existingPatient.Name = request.Name;
            existingPatient.Surname = request.Surname;
            existingPatient.JMBG = request.JMBG;
            existingPatient.DateOfBirth = request.DateOfBirth;
            existingPatient.Gender = request.Gender;
            existingPatient.Address = request.Address;
            existingPatient.PhoneNumber = request.PhoneNumber;

            await _patientRepository.UpdatePatientAsync(existingPatient);

            return Ok(new { message = "Patient updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var existingPatient = await _patientRepository.GetPatientByIdAsync(id);
            if (existingPatient == null)
                return NotFound($"Patient with ID {id} not found.");

            await _patientRepository.DeletePatientAsync(id);

            return Ok(new { message = "Patient deleted successfully." });
        }

    }
}
