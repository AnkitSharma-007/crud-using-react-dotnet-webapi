import { createBrowserRouter } from "react-router-dom";
import FetchEmployee from "./FetchEmployee";
import App from "./App";
import AddEmployee from "./AddEmployee";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <FetchEmployee /> },
      { path: "employee/add", element: <AddEmployee /> },
      { path: "employee/edit/:employeeId", element: <AddEmployee /> },
    ],
  },
]);

export default router;
