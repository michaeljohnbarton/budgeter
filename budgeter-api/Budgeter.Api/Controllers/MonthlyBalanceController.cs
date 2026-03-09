using Budgeter.Api.Models.MonthlyBalance;
using Budgeter.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Budgeter.Api.Controllers
{
	[Route("api/[controller]")]
	public class MonthlyBalanceController : Controller
	{
		private readonly IMonthlyBalanceService _monthlyBalanceService;

		public MonthlyBalanceController(IMonthlyBalanceService monthlyBalanceService)
		{
			_monthlyBalanceService = monthlyBalanceService;
		}

		[HttpPost]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public IActionResult Create([FromBody] CreateMonthlyBalance monthlyBalanceToCreate)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				_monthlyBalanceService.Create(monthlyBalanceToCreate);
				return Ok();
			}
			catch (SqlException e)
			{
				if (e.Number == 547)
				{
					return BadRequest("Month or subcategory does not exist");
				}
				throw;
			}
		}

		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public IEnumerable<MonthlyBalance> Get()
		{
			return _monthlyBalanceService.Get();
		}
	}
}
