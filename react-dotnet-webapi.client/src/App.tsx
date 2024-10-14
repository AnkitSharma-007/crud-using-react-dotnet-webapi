import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";

const App = () => {
  return (
    <>
      <NavMenu />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default App;
