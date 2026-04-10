import { useTheme } from "../../context/ThemeContext";
import { getTheme }  from "../../utils/theme";

export default function DeleteModal({ target, onConfirm, onCancel }) {
  const { darkMode } = useTheme();
  const t = getTheme(darkMode);

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-sm rounded-2xl border shadow-xl p-6 ${t.overlay}`}>
        <h2 className={`text-lg font-bold mb-2 ${t.title}`}>Delete Employee</h2>
        <p className={`text-sm mb-6 ${t.text}`}>
          Are you sure you want to delete{" "}
          <span className="font-semibold">{target.name}</span>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-opacity hover:opacity-70 ${t.cancelBtn}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-600 text-white transition-opacity hover:opacity-80"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}