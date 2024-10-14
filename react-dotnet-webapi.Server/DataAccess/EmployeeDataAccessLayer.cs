using Microsoft.EntityFrameworkCore;
using react_dotnet_webapi.Server.Interfaces;
using react_dotnet_webapi.Server.Models;

namespace react_dotnet_webapi.Server.DataAccess
{
    public class EmployeeDataAccessLayer : IEmployee
    {
        private readonly EmployeeDbContext dbContext;

        public EmployeeDataAccessLayer(EmployeeDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public List<Employee> GetAllEmployees()
        {
            try
            {
                List<Employee> lstEmploye = new();

                lstEmploye = dbContext.Employees.OrderBy(x => x.EmployeeId).ToList();

                return lstEmploye;
            }
            catch
            {
                throw;
            }
        }

        public void AddEmployee(Employee employee)
        {
            try
            {
                dbContext.Employees.Add(employee);
                dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void UpdateEmployee(Employee employee)
        {
            try
            {
                dbContext.Entry(employee).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public Employee GetEmployeeData(int employeeId)
        {
            try
            {
                Employee? employee = dbContext?.Employees.Find(employeeId);

                if (employee is not null)
                {
                    return employee;
                }
                return new Employee();

            }
            catch
            {
                throw;
            }
        }

        public void DeleteEmployee(int employeeId)
        {
            try
            {
                Employee? employee = dbContext.Employees.Find(employeeId);
                if (employee is not null)
                {
                    dbContext.Employees.Remove(employee);
                    dbContext.SaveChanges();
                }
            }
            catch
            {
                throw;
            }
        }

        public List<City> GetCities()
        {
            return dbContext.Cities.OrderBy(x => x.CityId).ToList();
        }

    }
}
