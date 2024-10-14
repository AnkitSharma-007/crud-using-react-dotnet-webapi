import { Link } from "react-router-dom";
import useEmployee from "./hooks/useEmployee";
import ApiClient from "./services/api-client";
import { Employee } from "./models/employee";

const FetchEmployee = () => {
  const { data: employees, isLoading } = useEmployee();

  const confirmDelete = (id?: number) => {
    const confirmDelete = confirm(
      "Do you want to delete the employee with Id: " + id
    );
    if (confirmDelete) {
      const apiClient = new ApiClient<Employee>();

      apiClient.deleteData(id!).then(() => {
        window.location.reload(); // Do we have a better way to reload data?
      });
    }
  };

  const contents = isLoading ? (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <>
      <div className="d-flex justify-content-end">
        <Link to="/employee/add" className="btn btn-primary">
          Add new employee
        </Link>
      </div>
      <br />

      <table className="table shadow table-striped align-middle table-bordered">
        <thead className="table-success">
          <tr className="text-center">
            <th>Name</th>
            <th>Gender</th>
            <th>Department</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr className="text-center" key={employee.employeeId}>
              <td>{employee.name}</td>
              <td>{employee.gender}</td>
              <td>{employee.department}</td>
              <td>{employee.city}</td>
              <td>
                <Link
                  to={`/employee/edit/${employee.employeeId}`}
                  className="btn btn-outline-dark"
                >
                  <span>
                    <i className="bi bi-pencil-fill me-1"></i>
                  </span>
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-danger ms-2"
                  onClick={() => confirmDelete(employee.employeeId)}
                >
                  <span>
                    <i className="bi bi-trash3-fill me-1"></i>
                  </span>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return <div>{contents}</div>;
};

export default FetchEmployee;
