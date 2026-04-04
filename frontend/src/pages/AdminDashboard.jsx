import React from "react";
import { useAuth } from "../context/authContext.jsx";
import { useTheme } from "../context/ThemeContext";

// ── Data ─────────────────────────────────────────────────────────────────────
const stats = [
  { label: "Today's Revenue",  value: "₱18,420", change: "+12%", up: true,  icon: "💰" },
  { label: "Orders Today",     value: "284",      change: "+8%",  up: true,  icon: "🧾" },
  { label: "Avg. Order Value", value: "₱64.90",   change: "-3%",  up: false, icon: "📊" },
  { label: "Active Staff",     value: "7",        change: "same", up: null,  icon: "👩‍🍳" },
];

const recentOrders = [
  { id: "#4821", item: "Caramel Macchiato",        qty: 2, total: "₱260", status: "Done",      time: "2 min ago"  },
  { id: "#4820", item: "Matcha Latte + Croissant",  qty: 1, total: "₱195", status: "Brewing",   time: "5 min ago"  },
  { id: "#4819", item: "Espresso Tonic",            qty: 3, total: "₱390", status: "Done",      time: "9 min ago"  },
  { id: "#4818", item: "Cold Brew Float",           qty: 1, total: "₱140", status: "Cancelled", time: "14 min ago" },
  { id: "#4817", item: "Dirty Matcha",              qty: 2, total: "₱280", status: "Done",      time: "18 min ago" },
];

const topItems = [
  { name: "Caramel Macchiato", sold: 84 },
  { name: "Cold Brew Float",   sold: 71 },
  { name: "Matcha Latte",      sold: 63 },
  { name: "Espresso Tonic",    sold: 49 },
  { name: "Dirty Matcha",      sold: 37 },
];

const weekSales  = [42, 68, 55, 90, 74, 110, 88];
const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const inventory = [
  { item: "Espresso Beans", stock: 3.2, unit: "kg",  warn: true  },
  { item: "Oat Milk",       stock: 12,  unit: "L",   warn: false },
  { item: "Matcha Powder",  stock: 0.8, unit: "kg",  warn: true  },
  { item: "Caramel Syrup",  stock: 4,   unit: "btl", warn: false },
];

// ── Sub-components ────────────────────────────────────────────────────────────
const StatusBadge = ({ status, dark }) => {
  const base = "px-2 py-0.5 rounded-full text-xs font-semibold";
  const map = {
    Done:      dark ? "bg-[#232D23] text-[#F7F8E5]" : "bg-[#232D23] text-[#F7F8E5]",
    Brewing:   dark ? "bg-[#6D6A61] text-[#F7F8E5]" : "bg-[#6D6A61] text-[#F7F8E5]",
    Cancelled: dark ? "bg-[#F7F8E5]/20 text-[#F7F8E5]/50" : "bg-[#020202] text-[#F7F8E5]",
  };
  return <span className={`${base} ${map[status] ?? ""}`}>{status}</span>;
};

const MiniBarChart = ({ dark }) => {
  const max = Math.max(...weekSales);
  return (
    <div className="flex items-end gap-2 h-28 mt-3">
      {weekSales.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
          <div
            className={`w-full rounded-t transition-all duration-500 ${dark ? "bg-[#F7F8E5]/80" : "bg-[#232D23]"}`}
            style={{ height: `${(v / max) * 100}%`, minHeight: 4 }}
          />
          <span className={`text-[10px] font-medium ${dark ? "text-[#9a9890]" : "text-[#6D6A61]"}`}>
            {weekLabels[i]}
          </span>
        </div>
      ))}
    </div>
  );
};

const OrdersTable = ({ orders, dark }) => (
  <table className="w-full text-sm border-collapse">
    <thead>
      <tr className={`border-b ${dark ? "border-[#2e382e]" : "border-[#ECEFD2]"}`}>
        {["Order", "Item", "Qty", "Total", "Status", "Time"].map((h) => (
          <th
            key={h}
            className={`text-left pb-2 pr-4 text-[10px] font-semibold uppercase tracking-wider ${dark ? "text-[#9a9890]" : "text-[#6D6A61]"}`}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {orders.map((o) => (
        <tr
          key={o.id}
          className={`border-b transition-colors ${
            dark
              ? "border-[#1a1f1a] hover:bg-[#232D23]"
              : "border-[#F7F8E5] hover:bg-[#F7F8E5]"
          }`}
        >
          <td className={`py-3 pr-4 font-mono text-xs ${dark ? "text-[#9a9890]" : "text-[#6D6A61]"}`}>{o.id}</td>
          <td className={`py-3 pr-4 font-medium ${dark ? "text-[#F7F8E5]" : "text-[#020202]"}`}>{o.item}</td>
          <td className={`py-3 pr-4 ${dark ? "text-[#9a9890]" : "text-[#6D6A61]"}`}>{o.qty}</td>
          <td className={`py-3 pr-4 font-semibold ${dark ? "text-[#F7F8E5]" : "text-[#232D23]"}`}>{o.total}</td>
          <td className="py-3 pr-4"><StatusBadge status={o.status} dark={dark} /></td>
          <td className={`py-3 text-xs ${dark ? "text-[#9a9890]" : "text-[#6D6A61]"}`}>{o.time}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// ── Main Dashboard ─────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const dk = darkMode;

  // Shorthand theme tokens
  const bg        = dk ? "bg-[#0f110f]"   : "bg-[#F7F8E5]";
  const card      = dk ? "bg-[#1a1f1a] border-[#2e382e]" : "bg-white border-[#ECEFD2]";
  const titleText = dk ? "text-[#F7F8E5]" : "text-[#020202]";
  const dimText   = dk ? "text-[#9a9890]" : "text-[#6D6A61]";
  const accentBg  = dk ? "bg-[#F7F8E5] text-[#232D23]" : "bg-[#232D23] text-[#F7F8E5]";
  const rankBg    = dk ? "bg-[#F7F8E5] text-[#232D23]" : "bg-[#232D23] text-[#F7F8E5]";
  const filterBtn = dk ? "bg-[#232D23] text-[#F7F8E5] border-[#2e382e]" : "bg-[#ECEFD2] text-[#232D23] border-[#ECEFD2]";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`}>
      <main className="max-w-7xl mx-auto px-10 py-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className={`text-xs mb-1 ${dimText}`}>
              {new Date().toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
            <h1 className={`text-3xl font-bold ${titleText}`}>
              Good morning, {user?.name?.split(" ")[0] ?? "Admin"} ☀️
            </h1>
          </div>
          <button className={`text-sm px-5 py-2.5 rounded-xl font-semibold shadow transition-opacity hover:opacity-80 ${accentBg}`}>
            + New Order
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-2xl p-5 border shadow-sm transition-colors duration-300 ${card}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                {s.up !== null && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    s.up
                      ? dk ? "bg-[#1a2e1a] text-[#7acc7a]" : "bg-[#dff0df] text-[#1a4a1a]"
                      : dk ? "bg-[#2e1a1a] text-[#cc7a7a]" : "bg-[#f5dede] text-[#6a1a1a]"
                  }`}>
                    {s.change}
                  </span>
                )}
              </div>
              <p className={`text-2xl font-bold mb-0.5 ${titleText}`}>{s.value}</p>
              <p className={`text-xs ${dimText}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Chart + Top Items ── */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className={`col-span-2 rounded-2xl p-6 border shadow-sm transition-colors duration-300 ${card}`}>
            <div className="flex items-center justify-between">
              <h2 className={`font-bold text-sm ${titleText}`}>Weekly Sales</h2>
              <span className={`text-xs ${dimText}`}>Units sold</span>
            </div>
            <MiniBarChart dark={dk} />
          </div>

          <div className={`rounded-2xl p-5 border shadow-sm transition-colors duration-300 ${card}`}>
            <h2 className={`font-bold text-sm mb-4 ${titleText}`}>Top Items</h2>
            <div className="flex flex-col gap-3">
              {topItems.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${rankBg}`}>
                      {i + 1}
                    </span>
                    <span className={`text-xs ${titleText}`}>{item.name}</span>
                  </div>
                  <span className={`text-xs font-bold ${dk ? "text-[#F7F8E5]" : "text-[#232D23]"}`}>{item.sold}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Recent Orders ── */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-5 transition-colors duration-300 ${card}`}>
          <h2 className={`font-bold text-sm mb-4 ${titleText}`}>Recent Orders</h2>
          <OrdersTable orders={recentOrders} dark={dk} />
        </div>

        {/* ── All Orders ── */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-5 transition-colors duration-300 ${card}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`font-bold text-base ${titleText}`}>All Orders</h2>
            <div className="flex gap-2">
              {["All", "Done", "Brewing", "Cancelled"].map((f) => (
                <button
                  key={f}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-opacity hover:opacity-70 ${filterBtn}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <OrdersTable orders={recentOrders} dark={dk} />
        </div>

        {/* ── Inventory ── */}
        <div className={`rounded-2xl p-6 border shadow-sm max-w-2xl transition-colors duration-300 ${card}`}>
          <h2 className={`font-bold text-base mb-6 ${titleText}`}>Inventory Status</h2>
          <div className="flex flex-col gap-4">
            {inventory.map((inv) => (
              <div
                key={inv.item}
                className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-colors duration-300 ${
                  inv.warn
                    ? dk ? "bg-[#2a1a1a] border-[#5a2a2a]" : "bg-[#fdf2f2] border-[#e8c4c4]"
                    : dk ? "bg-[#1a1f1a] border-[#2e382e]" : "bg-[#F7F8E5] border-[#ECEFD2]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{inv.warn ? "⚠️" : "✅"}</span>
                  <div>
                    <p className={`font-semibold text-sm ${titleText}`}>{inv.item}</p>
                    {inv.warn && (
                      <p className={`text-xs ${dk ? "text-[#e07060]" : "text-[#b03a2e]"}`}>
                        Low stock — reorder soon
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${dk ? "text-[#F7F8E5]" : "text-[#232D23]"}`}>
                    {inv.stock} {inv.unit}
                  </p>
                  <p className={`text-xs ${dimText}`}>in stock</p>
                </div>
              </div>
            ))}
          </div>
          <button className={`mt-6 w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-80 ${accentBg}`}>
            + Log Restock
          </button>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;