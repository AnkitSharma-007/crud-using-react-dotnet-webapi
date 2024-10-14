using Microsoft.AspNetCore.Mvc;
using react_dotnet_webapi.Server.Interfaces;
using react_dotnet_webapi.Server.Models;


namespace react_dotnet_webapi.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployee employeeService;

        public EmployeeController(IEmployee _employee)
        {
            employeeService = _employee;
        }

        [HttpGet]
        public List<Employee> Get()
        {
            return employeeService.GetAllEmployees();
        }

        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            employeeService.AddEmployee(employee);
            return Ok();
        }

        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            return employeeService.GetEmployeeData(id);
        }

        [HttpPut]
        public IActionResult Put(Employee employee)
        {
            employeeService.UpdateEmployee(employee);
            return Ok();
        }

        [HttpDelete("{employeeId}")]
        public IActionResult Delete(int employeeId)
        {
            employeeService.DeleteEmployee(employeeId);
            return Ok();
        }

        [HttpGet]
        [Route("GetCityList")]
        public IEnumerable<City> GetCityList()
        {
            return employeeService.GetCities();
        }


    }
}
