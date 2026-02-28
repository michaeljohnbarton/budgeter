using System.Data.SqlClient;
using Budgeter.Api.Models;
using Budgeter.Api.Services;
using Budgeter.Repository.Infrastructure;
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

		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public IEnumerable<Subcategory> Get()
		{
			return _subcategoryService.Get();
		}

		[HttpPut("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Update([FromRoute] int id, [FromBody] UpdateSubcategory subcategoryToUpdate)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				_subcategoryService.Update(id, subcategoryToUpdate);
				return Ok();
			}
			catch (NotFoundException e)
			{
				return NotFound(e.Message);
			}
		}
	}
}