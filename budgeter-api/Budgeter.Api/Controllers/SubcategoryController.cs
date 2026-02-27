using System.Data.SqlClient;
using Budgeter.Api.Models;
using Budgeter.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Budgeter.Api.Controllers
{
    [Route("api/[controller]")]
	public class SubcategoryController : Controller
	{
		private readonly ISubcategoryService _subcategoryService;

		public SubcategoryController(ISubcategoryService subcategoryService)
		{
			_subcategoryService = subcategoryService;
		}

		[HttpPost]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public IActionResult Create([FromBody] CreateSubcategory subcategoryToCreate)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				_subcategoryService.Create(subcategoryToCreate);
				return Ok();
			}
			catch (SqlException e)
			{
				if (e.Number == 547)
				{
					return BadRequest("Category does not exist");
				}
				throw;
			}
		}
	}
}