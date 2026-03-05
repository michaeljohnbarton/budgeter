using Microsoft.AspNetCore.Diagnostics;

namespace Budgeter.Api.Infrastructure
{
	public class GlobalExceptionHandler : IExceptionHandler
	{
		/*
		* Keeping it simple for now, in the future, consider...
		* - Not putting the raw exception message in the response (could be a security risk, and not user friendly)
		* - Adding more details to the response (e.g. stack trace, inner exception messages, etc.)
		* - Logging the exception (e.g. to a file, database, or external logging service)
		*/
		public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
		{
			var response = new ApiErrorResponse
			{
				Message = exception.Message
			};

			httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
			httpContext.Response.ContentType = "application/json";

			await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

			return true;
		}
	}
}

