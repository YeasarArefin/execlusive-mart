"use client";
import { cn } from "@/lib/utils";
import { Package, Package2, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const links = [
  { name: "Dashboard", to: "/admin/dashboard", icon: MdOutlineDashboard },
  { name: "Products", to: "/admin/products", icon: Package },
  { name: "Brands", to: "/admin/brands", icon: Tag },
  { name: "Orders", to: "/admin/orders", icon: Package2 },
  { name: "Banners", to: "/admin/banners", icon: Package2 },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h2 className="text-lg font-semibold px-4 py-2">Admin Panel</h2>
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-1 px-2">
        {links.map(({ name, to, icon: Icon }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              href={to}
              className={cn(
                "flex items-center gap-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100",
                isActive && "bg-red-50 text-red-600 border border-red-100"
              )}
            >
              <Icon className="text-md" />
              <span>{name}</span>
            </Link>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
