"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Properties", href: "/admin/properties" },
    { name: "Cities", href: "/admin/cities" },
    { name: "Blogs", href: "/admin/blogs" },
  ];

  return (
    <div className="flex h-screen bg-brand-light font-body">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
        <div className="flex bg-brand-primary h-16 items-center justify-center shadow-md">
          <h1 className="font-heading text-2xl tracking-wider text-white">
            SpringHouse
          </h1>
        </div>

        <div className="p-4">
          <p className="px-4 text-xs font-bold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>
          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between bg-white px-8 shadow-sm">
          <h2 className="font-heading text-xl text-brand-dark">
            {navItems.find((item) => item.href === pathname)?.name ||
              "Dashboard"}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold">
              A
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
