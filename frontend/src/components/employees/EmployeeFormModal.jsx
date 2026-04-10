import { useTheme } from "../../context/ThemeContext";
import { getTheme }  from "../../utils/theme";

export default function EmployeeFormModal({
  show, onClose, onSubmit, editing, form, setForm, saving, formError,
}) {
  const { darkMode } = useTheme();
  const t = getTheme(darkMode);

  if (!show) return null;

  const inputCls = `w-full px-3 py-2 rounded-lg border text-sm outline-none transition ${t.input}`;
  const labelCls = `block text-xs font-semibold mb-1 ${t.text}`;

  const fields = [
    { key: "name",       label: "Name",        type: "text",   placeholder: "Full name"          },
    { key: "email",      label: "Email",        type: "email",  placeholder: "email@example.com"  },
    { key: "position",   label: "Position",     type: "text",   placeholder: "e.g. Barista"       },
    { key: "department", label: "Department",   type: "text",   placeholder: "e.g. Operations"    },
    { key: "salary",     label: "Salary (₱)",   type: "number", placeholder: "0"                  },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-2xl border shadow-xl p-6 transition-colors duration-300 ${t.overlay}`}>
        <h2 className={`text-lg font-bold mb-5 ${t.title}`}>
          {editing ? "Edit Employee" : "Add Employee"}
        </h2>

        {formError && <p className="text-red-500 text-xs mb-3">{formError}</p>}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {fields.map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className={labelCls}>{label}</label>
                <input
                  className={inputCls}
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  required
                />
              </div>
            ))}

            <div>
              <label className={labelCls}>Status</label>
              <select
                className={inputCls}
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-opacity hover:opacity-70 ${t.cancelBtn}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 ${t.button}`}
            >
              {saving ? "Saving..." : editing ? "Save Changes" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}