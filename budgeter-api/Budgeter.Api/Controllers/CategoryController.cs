using System;
using System.Data.SqlClient;
using Budgeter.Api.Models;
using Budgeter.Api.Services;
using Budgeter.Repository.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Budgeter.Api.Controllers
{
	[Route("api/[controller]")]
	public class CategoryController : Controller
	{
		private readonly ICategoryService _categoryService;

		public CategoryController(ICategoryService categoryService)
		{
			_categoryService = categoryService;
		}

		[HttpPost]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public IActionResult Create([FromBody] CreateCategory categoryToCreate)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				_categoryService.Create(categoryToCreate);
				return Ok();
			}
			catch (SqlException e)
			{
				if (e.Number == 547)
				{
					return BadRequest("Bank account does not exist");
				}
				throw;
			}
		}

		[HttpGet]
		public IEnumerable<Category> Get()
		{
			return _categoryService.Get();
		}

		[HttpPut("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Update([FromRoute] int id, [FromBody] UpdateCategory categoryToUpdate)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				_categoryService.Update(id, categoryToUpdate);
				return Ok();
			}
			catch (NotFoundException e)
			{
				return NotFound(e.Message);
			}
		}
	}
}