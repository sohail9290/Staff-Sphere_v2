import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import DepartmentComponent from './components/DepartmentComponent'
import LoginComponent from './components/LoginComponent';
import RequireAuth from './auth/RequireAuth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<LoginComponent />} />

        {/* PROTECTED */}
        <Route
          path="/*"
          element={
            <RequireAuth>
              <>
                <HeaderComponent />

                <Routes>
                  <Route path="/" element={<ListEmployeeComponent />} />
                  <Route path="/employees" element={<ListEmployeeComponent />} />
                  <Route path="/add-employee" element={<EmployeeComponent />} />
                  <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
                  <Route path="/departments" element={<ListDepartmentComponent />} />
                  <Route path="/add-department" element={<DepartmentComponent />} />
                  <Route path="/edit-department/:id" element={<DepartmentComponent />} />
                  <Route path="/login" element={<LoginComponent />} />
                </Routes>

                <FooterComponent />
              </>
            </RequireAuth>
          }
        />
      </Routes>

    </BrowserRouter>
  )
}

export default App
