import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import DepartmentComponent from './components/DepartmentComponent'
import LoginComponent from './components/LoginComponent'
import RequireAuth from './auth/RequireAuth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>

      <HeaderComponent />

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<LoginComponent />} />

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <ListEmployeeComponent />
            </RequireAuth>
          }
        />

        <Route
          path="/employees"
          element={
            <RequireAuth>
              <ListEmployeeComponent />
            </RequireAuth>
          }
        />

        <Route
          path="/add-employee"
          element={
            <RequireAuth>
              <EmployeeComponent />
            </RequireAuth>
          }
        />

        <Route
          path="/edit-employee/:id"
          element={
            <RequireAuth>
              <EmployeeComponent />
            </RequireAuth>
          }
        />

        <Route
          path="/departments"
          element={
            <RequireAuth>
              <ListDepartmentComponent />
            </RequireAuth>
          }
        />

        <Route
          path="/add-department"
          element={
            <RequireAuth>
              <DepartmentComponent />
            </RequireAuth>
          }
        />

        <Route
          path="/edit-department/:id"
          element={
            <RequireAuth>
              <DepartmentComponent />
            </RequireAuth>
          }
        />
      </Routes>

      <FooterComponent />

    </BrowserRouter>
  )
}

export default App
