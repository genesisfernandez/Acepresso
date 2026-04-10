import { useState }           from "react";
import { useTheme }           from "../context/ThemeContext";
import { getTheme }           from "../utils/theme";
import { useEmployees }       from "../hooks/useEmployees";
import EmployeeTable          from "../components/employees/EmployeeTable";
import EmployeeFormModal      from "../components/employees/EmployeeFormModal";
import DeleteModal            from "../components/employees/DeleteModal";

const EMPTY_FORM = {
  name: "", email: "", position: "", department: "", salary: "", status: "Active",
};

export default function Employees() {
  const { darkMode } = useTheme();
  const t = getTheme(darkMode);

  const { employees, loading, error, addEmployee, editEmployee, removeEmployee } = useEmployees();

  // ── Modal state ─────────────────────────────────────────────────────────────
  const [showModal,    setShowModal]    = useState(false);
  const [editing,      setEditing]      = useState(null);
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [saving,       setSaving]       = useState(false);
  const [formError,    setFormError]    = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowModal(true);
  };

  const openEdit = (emp) => {
    setEditing(emp);
    setForm({
      name:       emp.name,
      email:      emp.email,
      position:   emp.position,
      department: emp.department,
      salary:     emp.salary,
      status:     emp.status,
    });
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      editing
        ? await editEmployee(editing._id, form)
        : await addEmployee(form);
      closeModal();
    } catch (err) {
      setFormError(err.response?.data?.message ?? "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await removeEmployee(deleteTarget._id);
      setDeleteTarget(null);
    } catch {
      alert("Delete failed.");
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen transition-colors duration-300 ${t.bg}`}>
      <main className="max-w-7xl mx-auto px-10 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${t.title}`}>Employees</h1>
            <p className={`text-xs mt-1 ${t.text}`}>{employees.length} total records</p>
          </div>
          <button
            onClick={openCreate}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold shadow transition-opacity hover:opacity-80 ${t.button}`}
          >
            + Add Employee
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Table */}
        {loading ? (
          <div className={`p-10 text-center text-sm ${t.text}`}>Loading...</div>
        ) : employees.length === 0 ? (
          <div className={`p-10 text-center text-sm ${t.text}`}>No employees found.</div>
        ) : (
          <EmployeeTable
            employees={employees}
            onEdit={openEdit}
            onDelete={setDeleteTarget}
          />
        )}
      </main>

      {/* Modals */}
      <EmployeeFormModal
        show={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editing={editing}
        form={form}
        setForm={setForm}
        saving={saving}
        formError={formError}
      />

      <DeleteModal
        target={deleteTarget}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}