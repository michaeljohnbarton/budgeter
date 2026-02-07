using System;
using Budgeter.Api.Models;
using System.Data.SqlClient;
using Budgeter.Api.Services;
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
	}
}

