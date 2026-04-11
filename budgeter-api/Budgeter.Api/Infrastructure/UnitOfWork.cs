using System.Data;
using Microsoft.Data.SqlClient;

namespace Budgeter.Api.Infrastructure
{
	public interface IUnitOfWork : IDisposable
	{
		IDbConnection Connection { get; }
		IDbTransaction? Transaction { get; }

		void Begin();
		void Commit();
		void Rollback();
	}

	public class UnitOfWork : IUnitOfWork
	{
		public IDbConnection Connection { get; }
		public IDbTransaction? Transaction { get; private set; }

		public UnitOfWork()
		{
			string connectionString = "Server=localhost;Database=budgeter;Integrated Security=False;User Id=sa;Password=Mjbarton46;TrustServerCertificate=True;";
			Connection = new SqlConnection(connectionString);
			Transaction = null;
		}

		public void Begin()
		{
			if (Connection.State != ConnectionState.Open)
				Connection.Open();

			Transaction = Connection.BeginTransaction();
		}

		public void Commit() => Transaction?.Commit();

		public void Rollback() => Transaction?.Rollback();

		public void Dispose()
		{
			Transaction?.Dispose();
			Connection?.Dispose();
		}
	}
}
