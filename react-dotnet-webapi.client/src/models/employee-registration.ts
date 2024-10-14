import { ZodNumber, ZodString } from "zod";

export interface EmployeeRegistration {
  employeeId: ZodNumber;
  name: ZodString;
  gender: ZodString;
  department: ZodString;
  city: ZodString;
}
