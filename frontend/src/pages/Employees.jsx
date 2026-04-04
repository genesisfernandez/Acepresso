import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const API = "http://localhost:5000/api/employees";

const EMPTY_FORM = {
  name: "", email: "", position: "", department: "", salary: "", status: "Active",
};

export default function Employees() {
  const { darkMode } = useTheme();
  const dk = darkMode;

  const [employees, setEmployees] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editing,   setEditing]   = useState(null); // null = create, object = edit
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [saving,    setSaving]    = useState(false);
  const [formError, setFormError] = useState("");

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Theme tokens ────────────────────────────────────────────────────────────
  const bg        = dk ? "bg-[#0f110f]"                   : "bg-[#F7F8E5]";
  const card      = dk ? "bg-[#1a1f1a] border-[#2e382e]"  : "bg-white border-[#ECEFD2]";
  const titleText = dk ? "text-[#F7F8E5]"                 : "text-[#020202]";
  const dimText   = dk ? "text-[#9a9890]"                 : "text-[#6D6A61]";
  const accentBg  = dk ? "bg-[#F7F8E5] text-[#232D23]"   : "bg-[#232D23] text-[#F7F8E5]";
  const inputCls  = `w-full px-3 py-2 rounded-lg border text-sm outline-none transition
    ${dk
      ? "bg-[#0f110f] border-[#2e382e] text-[#F7F8E5] placeholder-[#6D6A61] focus:border-[#F7F8E5]"
      : "bg-white border-[#ECEFD2] text-[#020202] placeholder-[#6D6A61] focus:border-[#232D23]"}`;
  const labelCls  = `block text-xs font-semibold mb-1 ${dimText}`;
  const overlayBg = dk ? "bg-[#1a1f1a] border-[#2e382e]" : "bg-white border-[#ECEFD2]";

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(data.employees);
    } catch (err) {
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  // ── Handlers ────────────────────────────────────────────────────────────────
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

  const closeModal = () => { setShowModal(false); setEditing(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      if (editing) {
        await axios.put(`${API}/${editing._id}`, form, { headers });
      } else {
        await axios.post(API, form, { headers });
      }
      closeModal();
      fetchEmployees();
    } catch (err) {
      setFormError(err.response?.data?.message ?? "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/${deleteTarget._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteTarget(null);
      fetchEmployees();
    } catch {
      alert("Delete failed.");
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`}>
      <main className="max-w-7xl mx-auto px-10 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${titleText}`}>Employees</h1>
            <p className={`text-xs mt-1 ${dimText}`}>{employees.length} total records</p>
          </div>
          <button onClick={openCreate} className={`px-5 py-2.5 rounded-xl text-sm font-semibold shadow transition-opacity hover:opacity-80 ${accentBg}`}>
            + Add Employee
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Table Card */}
        <div className={`rounded-2xl border shadow-sm overflow-hidden transition-colors duration-300 ${card}`}>
          {loading ? (
            <div className={`p-10 text-center text-sm ${dimText}`}>Loading...</div>
          ) : employees.length === 0 ? (
            <div className={`p-10 text-center text-sm ${dimText}`}>No employees found.</div>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className={`border-b ${dk ? "border-[#2e382e]" : "border-[#ECEFD2]"}`}>
                  {["Name", "Email", "Position", "Department", "Salary", "Status", "Actions"].map((h) => (
                    <th key={h} className={`text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider ${dimText}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className={`border-b transition-colors ${
                      dk ? "border-[#1a1f1a] hover:bg-[#232D23]" : "border-[#F7F8E5] hover:bg-[#F7F8E5]"
                    }`}
                  >
                    <td className={`px-5 py-3 font-medium ${titleText}`}>{emp.name}</td>
                    <td className={`px-5 py-3 ${dimText}`}>{emp.email}</td>
                    <td className={`px-5 py-3 ${dimText}`}>{emp.position}</td>
                    <td className={`px-5 py-3 ${dimText}`}>{emp.department}</td>
                    <td className={`px-5 py-3 font-semibold ${titleText}`}>₱{Number(emp.salary).toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        emp.status === "Active"
                          ? dk ? "bg-[#1a2e1a] text-[#7acc7a]" : "bg-[#dff0df] text-[#1a4a1a]"
                          : dk ? "bg-[#2e1a1a] text-[#cc7a7a]" : "bg-[#f5dede] text-[#6a1a1a]"
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(emp)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-opacity hover:opacity-70 ${
                            dk ? "bg-[#232D23] text-[#F7F8E5] border-[#2e382e]" : "bg-[#ECEFD2] text-[#232D23] border-[#ECEFD2]"
                          }`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(emp)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold border transition-opacity hover:opacity-70 bg-red-100 text-red-700 border-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* ── Create / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-2xl border shadow-xl p-6 transition-colors duration-300 ${overlayBg}`}>
            <h2 className={`text-lg font-bold mb-5 ${titleText}`}>
              {editing ? "Edit Employee" : "Add Employee"}
            </h2>

            {formError && <p className="text-red-500 text-xs mb-3">{formError}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Name</label>
                  <input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Full name" />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input className={inputCls} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="email@example.com" />
                </div>
                <div>
                  <label className={labelCls}>Position</label>
                  <input className={inputCls} value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} required placeholder="e.g. Barista" />
                </div>
                <div>
                  <label className={labelCls}>Department</label>
                  <input className={inputCls} value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} required placeholder="e.g. Operations" />
                </div>
                <div>
                  <label className={labelCls}>Salary (₱)</label>
                  <input className={inputCls} type="number" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} required placeholder="0" />
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select className={inputCls} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={closeModal} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-opacity hover:opacity-70 ${
                  dk ? "border-[#2e382e] text-[#9a9890]" : "border-[#ECEFD2] text-[#6D6A61]"
                }`}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 ${accentBg}`}>
                  {saving ? "Saving..." : editing ? "Save Changes" : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-sm rounded-2xl border shadow-xl p-6 ${overlayBg}`}>
            <h2 className={`text-lg font-bold mb-2 ${titleText}`}>Delete Employee</h2>
            <p className={`text-sm mb-6 ${dimText}`}>
              Are you sure you want to delete <span className="font-semibold">{deleteTarget.name}</span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-opacity hover:opacity-70 ${
                dk ? "border-[#2e382e] text-[#9a9890]" : "border-[#ECEFD2] text-[#6D6A61]"
              }`}>
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-600 text-white transition-opacity hover:opacity-80">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}