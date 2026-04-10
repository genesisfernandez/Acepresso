import { useTheme } from "../../context/ThemeContext";
import { getTheme }  from "../../utils/theme";

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  const { darkMode } = useTheme();
  const t = getTheme(darkMode);

  return (
    <div className={`rounded-2xl border shadow-sm overflow-hidden transition-colors duration-300 ${t.card}`}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className={`border-b ${t.border}`}>
            {["Name", "Email", "Position", "Department", "Salary", "Status", "Actions"].map((h) => (
              <th key={h} className={`text-left px-5 py-3 text-[10px] font-semibold uppercase tracking-wider ${t.text}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className={`border-b transition-colors ${t.hoverRow}`}>
              <td className={`px-5 py-3 font-medium ${t.title}`}>{emp.name}</td>
              <td className={`px-5 py-3 ${t.text}`}>{emp.email}</td>
              <td className={`px-5 py-3 ${t.text}`}>{emp.position}</td>
              <td className={`px-5 py-3 ${t.text}`}>{emp.department}</td>
              <td className={`px-5 py-3 font-semibold ${t.title}`}>
                ₱{Number(emp.salary).toLocaleString()}
              </td>
              <td className="px-5 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  emp.status === "Active" ? t.statusActive : t.statusInactive
                }`}>
                  {emp.status}
                </span>
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(emp)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-opacity hover:opacity-70 ${t.editBtn}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(emp)}
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
    </div>
  );
}