using System;
using System.Collections.Generic;
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
    }
}