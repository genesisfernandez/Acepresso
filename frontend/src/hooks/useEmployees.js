import { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await getEmployees();
      setEmployees(data.employees);
    } catch {
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  const addEmployee    = async (form) => { await createEmployee(form);       await fetchEmployees(); };
  const editEmployee   = async (id, form) => { await updateEmployee(id, form); await fetchEmployees(); };
  const removeEmployee = async (id) => { await deleteEmployee(id);           await fetchEmployees(); };

  useEffect(() => { fetchEmployees(); }, []);

  return { employees, loading, error, addEmployee, editEmployee, removeEmployee };
};