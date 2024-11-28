using KlinikaAPI.Models.Domain;
using KlinikaAPI.Models.dto;
using KlinikaAPI.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KlinikaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FindingController : ControllerBase
    {
        private readonly IFindingRepository _findingRepository;

        public FindingController(IFindingRepository findingRepository)
        {
            _findingRepository = findingRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFindings()
        {
            var findings = await _findingRepository.GetAllFindingsAsync();
            var findingDtos = findings.Select(f => new FindingDto
            {
                Id = f.Id,
                AdmissionId = f.AdmissionId,
                Description = f.Description,
                CreatedAt = f.CreatedAt
            });

            return Ok(findingDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFindingById(int id)
        {
            var finding = await _findingRepository.GetFindingByIdAsync(id);
            if (finding == null)
                return NotFound($"Finding with ID {id} not found.");

            var findingDto = new FindingDto
            {
                Id = finding.Id,
                AdmissionId = finding.AdmissionId,
                Description = finding.Description,
                CreatedAt = finding.CreatedAt
            };

            return Ok(findingDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddFinding([FromBody] AddFindingRequestDto addFindingRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var finding = new Finding
            {
                AdmissionId = addFindingRequest.AdmissionId,
                Description = addFindingRequest.Description,
                CreatedAt = DateTime.UtcNow
            };

            await _findingRepository.AddFindingAsync(finding);

            return Ok(new { message = "Finding added successfully.", Id = finding.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFinding(int id, [FromBody] AddFindingRequestDto updateFindingRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingFinding = await _findingRepository.GetFindingByIdAsync(id);
            if (existingFinding == null)
                return NotFound($"Finding with ID {id} not found.");

            existingFinding.AdmissionId = updateFindingRequest.AdmissionId;
            existingFinding.Description = updateFindingRequest.Description;

            await _findingRepository.UpdateFindingAsync(existingFinding);

            return Ok(new { message = "Finding updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFinding(int id)
        {
            var existingFinding = await _findingRepository.GetFindingByIdAsync(id);
            if (existingFinding == null)
                return NotFound($"Finding with ID {id} not found.");

            await _findingRepository.DeleteFindingAsync(id);

            return Ok(new { message = "Finding deleted successfully." });
        }
    }
}
