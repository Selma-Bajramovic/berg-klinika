using KlinikaAPI.Models.Domain;
using KlinikaAPI.Models.dto;
using KlinikaAPI.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KlinikaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : ControllerBase
    {
        private readonly IAdmissionRepository _admissionRepository;

        public AdmissionController(IAdmissionRepository admissionRepository)
        {
            _admissionRepository = admissionRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAdmissions([FromQuery] DateTime? fromDate, [FromQuery] DateTime? toDate)
        {
            var admissions = await _admissionRepository.GetAdmissionsAsync(fromDate, toDate);

            var admissionDtos = admissions.Select(a => new AdmissionDto
            {
                Id = a.Id,
                AdmissionDateTime = a.AdmissionDateTime,
                PatientName = $"{a.Patient.Name} {a.Patient.Surname}",
                DoctorDetails = $"{a.Doctor.Surname} {a.Doctor.Name} - {a.Doctor.DoctorCode}",
                IsEmergency = a.IsEmergency
            });

            return Ok(admissionDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdmissionById(int id)
        {
            var admission = await _admissionRepository.GetAdmissionByIdAsync(id);
            if (admission == null)
                return NotFound($"Admission with ID {id} not found.");

            var admissionDto = new AdmissionDto
            {
                Id = admission.Id,
                AdmissionDateTime = admission.AdmissionDateTime,
                PatientName = $"{admission.Patient.Name} {admission.Patient.Surname}",
                DoctorDetails = $"{admission.Doctor.Surname} {admission.Doctor.Name} - {admission.Doctor.DoctorCode}",
                IsEmergency = admission.IsEmergency
            };

            return Ok(admissionDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddAdmission([FromBody] AddAdmissionRequestDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (request.AdmissionDateTime < DateTime.Now)
                return BadRequest("Admission date and time cannot be in the past.");

            var admission = new Admission
            {
                AdmissionDateTime = request.AdmissionDateTime,
                PatientId = request.PatientId,
                DoctorId = request.DoctorId,
                IsEmergency = request.IsEmergency
            };

            await _admissionRepository.AddAdmissionAsync(admission);

            return Ok(new { message = "Admission added successfully.", Id = admission.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdmission(int id, [FromBody] AddAdmissionRequestDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingAdmission = await _admissionRepository.GetAdmissionByIdAsync(id);
            if (existingAdmission == null)
                return NotFound($"Admission with ID {id} not found.");

            if (request.AdmissionDateTime < DateTime.Now)
                return BadRequest("Admission date and time cannot be in the past.");

            existingAdmission.AdmissionDateTime = request.AdmissionDateTime;
            existingAdmission.IsEmergency = request.IsEmergency;

            await _admissionRepository.UpdateAdmissionAsync(existingAdmission);

            return Ok(new { message = "Admission updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmission(int id)
        {
            var existingAdmission = await _admissionRepository.GetAdmissionByIdAsync(id);
            if (existingAdmission == null)
                return NotFound($"Admission with ID {id} not found.");

            await _admissionRepository.DeleteAdmissionAsync(id);

            return Ok(new { message = "Admission deleted successfully." });
        }      
    }
}
