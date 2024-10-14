import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import useCity from "./hooks/useCity";
import { Employee } from "./models/employee";
import ApiClient from "./services/api-client";

const employeeSchema = z.object({
  employeeId: z.number().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  city: z.string().min(1, { message: "City is required" }),
});
type EmployeeFormData = z.infer<typeof employeeSchema>;

const AddEmployee = () => {
  const { data: cityList } = useCity();

  const { employeeId } = useParams();
  const id = parseInt(employeeId!);
  const formTitle = id > 0 ? "Edit" : "Add";

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  useEffect(() => {
    const apiClient = new ApiClient<Employee>();
    if (id > 0) {
      apiClient.fetchDataById(id).then((response) => {
        reset(response);
      });
    }
  }, [reset, id]);

  const onFormSubmit: SubmitHandler<EmployeeFormData> = (
    formData: EmployeeFormData
  ) => {
    const apiClient = new ApiClient<Employee>();
    if (id > 0) {
      apiClient.updateData(formData).then(() => {
        navigate("/");
      });
    } else {
      apiClient.saveData(formData).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <>
      <h1 className="display-5">{formTitle} employee</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                  />
                  {errors.name && (
                    <p className="text-danger text-start">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="Gender" className="form-label">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    className="form-control"
                    name="gender"
                  >
                    <option value="">-- Select Gender --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-danger text-start">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <input
                    {...register("department")}
                    type="text"
                    className="form-control"
                    id="department"
                    name="department"
                  />
                  {errors.department && (
                    <p className="text-danger text-start">
                      {errors.department.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="City" className="form-label">
                    City
                  </label>
                  <select
                    {...register("city")}
                    className="form-control"
                    name="city"
                  >
                    <option value="">-- Select City --</option>
                    {cityList.map((city) => (
                      <option key={city.cityId} value={city.cityName}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-danger text-start">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary me-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
