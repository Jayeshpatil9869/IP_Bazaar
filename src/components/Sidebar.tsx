import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, LayoutDashboard, User, LogOut, Settings } from "lucide-react";
import { User as UserType, Admin } from "../types";

interface SidebarProps {
  user?: UserType | null;
  admin?: Admin | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, admin, onLogout }) => {
  const location = useLocation();
  const isAdmin = !!admin;

  const userNavItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  const adminNavItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Requests",
      href: "/admin/requests",
      icon: Settings,
    },
    {
      name: "Registrations",
      href: "/admin/registrations",
      icon: User,
    },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="bg-white w-64 shadow-lg flex flex-col border-r border-muted hidden md:flex">
      {/* Desktop Sidebar Content */}
      {/* Logo */}
      <div className="p-6 border-b border-muted">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-primary mr-3" />
          <span className="text-2xl font-bold text-primary">IPV4Bazaar</span>
        </div>
        {isAdmin && (
          <span className="text-xs text-secondary mt-1 block">Admin Panel</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-muted">
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900">
            {isAdmin ? admin?.username : user?.name}
          </p>
          {!isAdmin && user?.email && (
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          )}
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

// Mobile Bottom Navigation Component
const MobileBottomNav: React.FC<SidebarProps> = ({ user, admin, onLogout }) => {
  const location = useLocation();
  const isAdmin = !!admin;

  const userNavItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  const adminNavItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Requests",
      href: "/admin/requests",
      icon: Settings,
    },
    {
      name: "Registrations",
      href: "/admin/registrations",
      icon: User,
    },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-muted shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-gray-600 hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
        <button
          onClick={onLogout}
          className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

// Combined Sidebar Component
const CombinedSidebar: React.FC<SidebarProps> = (props) => {
  return (
    <>
      <Sidebar {...props} />
      <MobileBottomNav {...props} />
    </>
  );
};

export default CombinedSidebar;
