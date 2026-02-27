using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Budgeter.Api.Models;
using Budgeter.Api.Services;
using Budgeter.Repository.Infrastructure;
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

		[HttpPost]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status409Conflict)]
		public IActionResult Create([FromBody] CreateMonth monthToCreate)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				_monthService.Create(monthToCreate);
				return Ok();
			}
			catch (SqlException e)
			{
				if (e.Number == 2627)
				{
					return Conflict("Month already exists");
				}
				throw;
			}
		}

		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public IEnumerable<Month> Get()
		{
			return _monthService.Get();
		}

		[HttpPut("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Update([FromRoute] int id, [FromBody] UpdateMonth monthToUpdate)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				_monthService.Update(id, monthToUpdate);
				return Ok();
			}
			catch (NotFoundException e)
			{
				return NotFound(e.Message);
			}
		}

		[HttpDelete("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Delete([FromRoute] int id)
		{
			try
			{
				_monthService.Delete(id);
				return Ok();
			}
			catch (NotFoundException e)
			{
				return NotFound(e.Message);
			}
		}
	}
}