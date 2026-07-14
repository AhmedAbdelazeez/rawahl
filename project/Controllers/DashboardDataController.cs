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

        [HttpGet("compliance-kpis")]
        public async Task<IActionResult> GetComplianceKpis()
        {
            var kpis = await _portalService.GetComplianceKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no compliance KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("operational-audit-kpis")]
        public async Task<IActionResult> GetOperationalAuditKpis()
        {
            var kpis = await _portalService.GetOperationalAuditKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no operational audit KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("hr-kpis")]
        public async Task<IActionResult> GetHrKpis()
        {
            var kpis = await _portalService.GetHrKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no HR KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("it-kpis")]
        public async Task<IActionResult> GetItKpis()
        {
            var kpis = await _portalService.GetItKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no IT KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("hse-kpis")]
        public async Task<IActionResult> GetHseKpis()
        {
            var kpis = await _portalService.GetHseKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no HSE KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("procurement-kpis")]
        public async Task<IActionResult> GetProcurementKpis()
        {
            var kpis = await _portalService.GetProcurementKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no Procurement KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("strategy-kpis")]
        public async Task<IActionResult> GetStrategyKpis()
        {
            var kpis = await _portalService.GetStrategyKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no Strategy KPI data.");
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
