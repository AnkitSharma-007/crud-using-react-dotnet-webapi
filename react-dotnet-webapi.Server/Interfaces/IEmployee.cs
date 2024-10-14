using react_dotnet_webapi.Server.Models;

namespace react_dotnet_webapi.Server.Interfaces
{
    public interface IEmployee
    {
        List<Employee> GetAllEmployees();
        void AddEmployee(Employee employee);
        void UpdateEmployee(Employee employee);
        Employee GetEmployeeData(int employeeId);
        void DeleteEmployee(int employeeId);
        List<City> GetCities();
    }
}
