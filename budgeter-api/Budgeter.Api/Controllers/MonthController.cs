using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Budgeter.Api.Models;
using Budgeter.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Budgeter.Api.Controllers
{
    [Route("api/[controller]")]
    public class MonthController : Controller
    {
        private readonly IMonthService _monthService;

        public MonthController(IMonthService monthService)
        {
            _monthService = monthService;
        }

        [HttpGet]
        public IEnumerable<Month> Get()
        {
            return _monthService.Get();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Create([FromBody] AddMonth monthToAdd)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _monthService.Create(monthToAdd);
                return Ok();
            }
            catch (SqlException e)
            {
                if(e.Number == 2627)
                {
                    return Conflict("Month already exists");
                }
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}