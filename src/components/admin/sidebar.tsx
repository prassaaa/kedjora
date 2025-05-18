"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  Users,
  Settings,
  BookOpen,
  FileCode,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/services", icon: FileCode, label: "Layanan" },
  { href: "/admin/portfolio", icon: Briefcase, label: "Portfolio" },
  { href: "/admin/testimonials", icon: MessageSquare, label: "Testimonial" },
  { href: "/admin/orders", icon: Users, label: "Pesanan" },
  { href: "/admin/blog", icon: BookOpen, label: "Blog" },
  { href: "/admin/pages", icon: FileText, label: "Halaman" },
  { href: "/admin/settings", icon: Settings, label: "Pengaturan" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  // Fungsi untuk logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r bg-slate-900">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link href="/admin" className="flex items-center">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </Link>
        </div>
        <div className="flex flex-col flex-grow px-4 mt-5">
          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto pb-5">
            <button 
              className="flex items-center w-full px-4 py-2 mt-5 text-sm font-medium text-slate-300 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}