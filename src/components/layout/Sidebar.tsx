import {
  LayoutDashboard,
  Users,
  School,
  FileText,
  LogOut,
  Map,
  Upload,
  Building2,
  BrainCircuit,
  GraduationCap,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuGroups = [
  {
    title: "MONITORING",
    menus: [
      {
        name: "Dashboard Dinas",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
      {
        name: "Peta Risiko",
        icon: Map,
        path: "/risk-map",
      },
    ],
  },

  {
    title: "SATUAN PENDIDIKAN",
    menus: [
      {
        name: "Daftar Sekolah",
        icon: School,
        path: "/schools",
      },
      {
        name: "Daftar Siswa Aktif",
        icon: Users,
        path: "/students",
      },
    ],
  },

  {
    title: "EARLY WARNING SYSTEM",
    menus: [
      {
        name: "Laporan Risiko",
        icon: AlertTriangle,
        path: "/ews-report",
      },
      {
        name: "Kasus Berisiko",
        icon: ShieldAlert,
        path: "/ews-cases",
      },
    ],
  },

  {
    title: "ATS & INTERVENSI",
    menus: [
      {
        name: "Data ATS",
        icon: GraduationCap,
        path: "/dropouts",
      },
      {
        name: "Kasus Intervensi",
        icon: BrainCircuit,
        path: "/interventions",
      },
      {
        name: "Monitoring Intervensi OPD",
        icon: Building2,
        path: "/opd-monitoring",
      },
      {
        name: "Laporan",
        icon: FileText,
        path: "/interventions/reports",
      },
    ],
  },

  {
    title: "TOOLS",
    menus: [
      {
        name: "Simulasi Prediksi",
        icon: BrainCircuit,
        path: "/prediction",
      },
      {
        name: "Upload & Prediksi",
        icon: Upload,
        path: "/upload-prediction",
      },
      // {
      //   name: "Laporan",
      //   icon: FileText,
      //   path: "/reports",
      // },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#172339] text-white min-h-screen p-5 hidden md:flex flex-col">
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-lg shadow-lg">
          EWS
        </div>

        <div>
          <h1 className="font-bold text-lg">EWS ATS</h1>

          <p className="text-sm text-slate-400">Kabupaten Sleman</p>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto">
        {menuGroups.map((group) => (
          <div key={group.title} className="mb-8">
            {/* GROUP TITLE */}
            <p className="text-xs font-bold tracking-[0.2em] text-slate-500 mb-4 px-3">
              {group.title}
            </p>

            {/* MENUS */}
            <div className="space-y-2">
              {group.menus.map((menu) => {
                const Icon = menu.icon;

                return (
                  <NavLink
                    key={menu.path}
                    to={menu.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={20} />

                    <span className="font-medium">{menu.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="pt-5 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-300 hover:bg-red-500/10 hover:text-red-200 transition">
          <LogOut size={20} />

          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
