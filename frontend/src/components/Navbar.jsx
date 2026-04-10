import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { useTheme } from "../context/ThemeContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation =
    user?.role === "admin"
      ? [
          { name: "Dashboard", to: "/admin-dashboard" },
          { name: "Employees", to: "/employees" },
          { name: "Reports", to: "/reports" },
        ]
      : [
          { name: "Dashboard", to: "/employee-dashboard" },
          { name: "Profile", to: "/profile" },
        ];

  return (
    <Disclosure as="nav" className="bg-primary shadow-md p-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Mobile button */}
          <div className="flex items-center sm:hidden">
            <DisclosureButton className="p-2 text-tertiary hover:text-accent hover:bg-secondary transition">
              <Bars3Icon className="block h-6 w-6 group-data-open:hidden" />
              <XMarkIcon className="hidden h-6 w-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            {/* <h2 className="text-accent font-semibold text-lg tracking-wide">Dashboard</h2> */}
            <img
                  alt="profile"
                  src={darkMode ? "./Acepresso-logo-light.png" : "./Acepresso-logo-dark.png"}
                  className="h-22 w-22 rounded-full border-2 border-secondary hover:border-accent transition"
                />
          </div>

          {/* Desktop nav */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-secondary text-accent"
                      : "text-tertiary hover:bg-secondary hover:text-accent",
                    "px-3 py-2 rounded-md text-sm font-medium transition"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Profile dropdown */}
          <div className="flex items-center">
            <Menu as="div" className="relative ml-3">
              <MenuButton className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary">
                <img
                  alt="profile"
                  src="./default-pfp.jpg"
                  className="h-12 w-12 rounded-full border-2 border-secondary hover:border-accent transition"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-secondary py-1 shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none">
                {/* User info header */}
                <div className="px-4 py-2 border-b border-tertiary/20">
                  <p className="text-xs text-tertiary uppercase tracking-widest">
                    {user?.role ?? "User"}
                  </p>
                </div>

                {/* Theme toggle */}
                <MenuItem>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-tertiary hover:bg-primary hover:text-accent transition"
                  >
                    {darkMode
                      ? <SunIcon className="h-4 w-4" />
                      : <MoonIcon className="h-4 w-4" />
                    }
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                </MenuItem>

                {/* Logout */}
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-tertiary hover:bg-primary hover:text-accent transition"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>

        </div>
      </div>

      {/* Mobile nav */}
      <DisclosurePanel className="sm:hidden px-2 pb-3 space-y-1 mt-2">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as={NavLink}
            to={item.to}
            className={({ isActive }) =>
              classNames(
                isActive
                  ? "bg-secondary text-accent"
                  : "text-tertiary hover:bg-secondary hover:text-accent",
                "block px-3 py-2 rounded-md text-base font-medium transition"
              )
            }
          >
            {item.name}
          </DisclosureButton>
        ))}
      </DisclosurePanel>
    </Disclosure>
  );
}