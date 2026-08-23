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

        [HttpGet("finance-kpis")]
        public async Task<IActionResult> GetFinanceKpis()
        {
            var kpis = await _portalService.GetFinanceKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no Finance KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("commercial-kpis")]
        public async Task<IActionResult> GetCommercialKpis()
        {
            var kpis = await _portalService.GetCommercialKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no Commercial KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("tourism-kpis")]
        public async Task<IActionResult> GetTourismKpis()
        {
            var kpis = await _portalService.GetTourismKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no Tourism KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("operations-kpis")]
        public async Task<IActionResult> GetOperationsKpis()
        {
            var kpis = await _portalService.GetOperationsKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no Operations KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("maintenance-kpis")]
        public async Task<IActionResult> GetMaintenanceKpis()
        {
            var kpis = await _portalService.GetMaintenanceKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no maintenance KPI data.");
            }
            return Ok(kpis);
        }

        // ============== Sales Department ==============
        [HttpGet("sales-kpis")]
        public async Task<IActionResult> GetSalesKpis()
        {
            var kpis = await _portalService.GetSalesKpisAsync();
            if (kpis == null)
            {
                return StatusCode(503, "Portal API is unavailable or returned no Sales KPI data.");
            }
            return Ok(kpis);
        }

        [HttpGet("mohu-groups")]
        public async Task<IActionResult> GetMohuGroups()
        {
            var data = await _portalService.GetMohuGroupsAsync();
            if (data == null) return StatusCode(503, "Portal API is unavailable or returned no data.");
            return Ok(data);
        }

        [HttpGet("mohu-feedbacks")]
        public async Task<IActionResult> GetMohuFeedbacks()
        {
            var data = await _portalService.GetMohuFeedbacksAsync();
            if (data == null) return StatusCode(503, "Portal API is unavailable or returned no data.");
            return Ok(data);
        }

        [HttpGet("mohu-violations")]
        public async Task<IActionResult> GetMohuViolations()
        {
            var data = await _portalService.GetMohuViolationsAsync();
            if (data == null) return StatusCode(503, "Portal API is unavailable or returned no data.");
            return Ok(data);
        }

        [HttpGet("mohu-permits")]
        public async Task<IActionResult> GetMohuPermits()
        {
            var data = await _portalService.GetMohuPermitsAsync();
            if (data == null) return StatusCode(503, "Portal API is unavailable or returned no data.");
            return Ok(data);
        }

        [HttpGet("health")]
        public async Task<IActionResult> GetHealth()
        {
            var available = await _portalService.IsPortalAvailableAsync();
            return Ok(new { available });
        }

        // ============== Fleet: 5 new indicators ==============
        [HttpGet("fleet-indicators")]
        public async Task<IActionResult> GetFleetIndicators()
        {
            var data = await _portalService.GetFleetIndicatorsAsync();
            if (data == null) return StatusCode(503, "Portal API is unavailable or returned no fleet indicators.");
            return Ok(data);
        }

        // ============== Maintenance Department landing page ==============
        [HttpGet("maintenance-workorders")]
        public async Task<IActionResult> GetMaintenanceWorkOrders(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] System.DateTime? fromDate = null,
            [FromQuery] System.DateTime? toDate = null)
        {
            var data = await _portalService.GetMaintenanceWorkOrdersPagedAsync(page, pageSize, fromDate, toDate);
            if (data == null) return StatusCode(503, "Portal API is unavailable or returned no maintenance data.");
            return Ok(data);
        }

        [HttpPost("maintenance-upload")]
        public async Task<IActionResult> UploadMaintenanceExcel(Microsoft.AspNetCore.Http.IFormFile file, [FromQuery] string branchName = "الورشة المركزية")
        {
            if (file == null || file.Length == 0) return BadRequest("No file uploaded.");
            if (!IsXlsxFile(file))
                return BadRequest("Only .xlsx or .xls files are supported.");

            var data = await _portalService.UploadMaintenanceExcelAsync(file, branchName);
            if (data == null) return StatusCode(503, "Portal API is unavailable or the upload failed.");
            return Ok(data);
        }

        // ============== Storage / Warehouse Department landing page ==============
        [HttpGet("warehouse-items")]
        public async Task<IActionResult> GetWarehouseItems(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] System.DateTime? fromDate = null,
            [FromQuery] System.DateTime? toDate = null)
        {
            var data = await _portalService.GetWarehouseItemsAsync(page, pageSize, fromDate, toDate);
            if (data == null) return StatusCode(503, "Portal API is unavailable or returned no warehouse data.");
            return Ok(data);
        }

        [HttpGet("warehouse-kpis")]
        public async Task<IActionResult> GetWarehouseKpis()
        {
            var data = await _portalService.GetWarehouseKpisAsync();
            if (data == null) return StatusCode(503, "Portal API is unavailable or returned no warehouse KPI data.");
            return Ok(data);
        }

        [HttpPost("warehouse-upload")]
        public async Task<IActionResult> UploadWarehouseExcel(Microsoft.AspNetCore.Http.IFormFile file)
        {
            if (file == null || file.Length == 0) return BadRequest("No file uploaded.");
            if (!IsXlsxFile(file))
                return BadRequest("Only .xlsx or .xls files are supported.");

            var data = await _portalService.UploadWarehouseExcelAsync(file);
            if (data == null) return StatusCode(503, "Portal API is unavailable or the upload failed.");
            return Ok(data);
        }

        // File-extension checks based purely on IFormFile.FileName can fail for non-ASCII
        // (e.g. Arabic) file names, since some browsers/proxies mangle the Content-Disposition
        // filename encoding in multipart uploads. Fall back to the browser-reported ContentType
        // when the extension can't be read reliably.
        private static bool IsXlsxFile(Microsoft.AspNetCore.Http.IFormFile file)
        {
            // .xls (legacy Excel 97-2003) is also accepted here - the ERP backend converts it
            // to .xlsx automatically before parsing.
            var ext = System.IO.Path.GetExtension(file.FileName)?.Trim().ToLowerInvariant();
            if (ext == ".xlsx" || ext == ".xls") return true;

            return string.Equals(file.ContentType, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", System.StringComparison.OrdinalIgnoreCase)
                || string.Equals(file.ContentType, "application/vnd.ms-excel", System.StringComparison.OrdinalIgnoreCase);
        }
    }
}
