using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using project.Services;

namespace project.Controllers
{
    [ApiController]
    [Route("api/dashboard-data")]
    [Authorize] // requires authentication to the Dashboard portal
    public class DashboardDataController : ControllerBase
    {
        private readonly IPortalIntegrationService _portalService;

        public DashboardDataController(IPortalIntegrationService portalService)
        {
            _portalService = portalService;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var summary = await _portalService.GetDashboardSummaryAsync();
            if (summary == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no data.");
            }
            return Ok(summary);
        }

        [HttpGet("kpis")]
        public async Task<IActionResult> GetKpis()
        {
            var kpis = await _portalService.GetComputedKpisAsync();
            return Ok(kpis);
        }

        [HttpGet("projects")]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _portalService.GetProjectsAsync();
            return Ok(projects);
        }

        [HttpGet("fleet")]
        public async Task<IActionResult> GetFleet()
        {
            var fleet = await _portalService.GetFleetSummaryAsync();
            if (fleet == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no fleet data.");
            }
            return Ok(fleet);
        }

        [HttpGet("project-kpis")]
        public async Task<IActionResult> GetProjectKpis()
        {
            var kpis = await _portalService.GetProjectKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("health")]
        public async Task<IActionResult> GetHealth()
        {
            var available = await _portalService.IsPortalAvailableAsync();
            return Ok(new { available });
        }
    }
}
