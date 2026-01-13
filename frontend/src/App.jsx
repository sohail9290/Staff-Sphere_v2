import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import LoginComponent from "./components/LoginComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import DepartmentComponent from "./components/DepartmentComponent";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<LoginComponent />} />

        {/* PROTECTED */}
        <Route element={<RequireAuth />}>
          <Route
            element={
              <>
                <HeaderComponent />
                <OutletWrapper />
                <FooterComponent />
              </>
            }
          >
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<EmployeeComponent />} />
            <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
            <Route path="/departments" element={<ListDepartmentComponent />} />
            <Route path="/add-department" element={<DepartmentComponent />} />
            <Route path="/edit-department/:id" element={<DepartmentComponent />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

function OutletWrapper() {
  return <Outlet />;
}

export default App;
