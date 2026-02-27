using System.Data.SqlClient;
using Budgeter.Api.Models;
using Budgeter.Api.Services;
using Budgeter.Repository.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Budgeter.Api.Controllers
{
	[Route("api/[controller]")]
	public class BankAccountController : Controller
	{
		private readonly IBankAccountService _bankAccountService;

		public BankAccountController(IBankAccountService bankAccountService)
		{
			_bankAccountService = bankAccountService;
		}

		[HttpPost]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public IActionResult Create([FromBody] CreateBankAccount bankAccountToCreate)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			_bankAccountService.Create(bankAccountToCreate);
			return Ok();
		}

		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public IEnumerable<BankAccount> Get()
		{
			return _bankAccountService.Get();
		}

		[HttpPut("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Update([FromRoute] int id, [FromBody] UpdateBankAccount bankAccountToUpdate)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				_bankAccountService.Update(id, bankAccountToUpdate);
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
				_bankAccountService.Delete(id);
				return Ok();
			}
			catch (NotFoundException e)
			{
				return NotFound(e.Message);
			}
			catch (SqlException e)
			{
				if (e.Number == 547)
				{
					return BadRequest("Bank account still has linked categories");
				}
				throw;
			}
		}
	}
}

