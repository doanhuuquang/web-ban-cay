"use client";

import * as React from "react";
import {
  Frame,
  Map,
  ChartBarStacked,
  PieChart,
  Star,
  Package2,
  ShoppingCart,
  User,
  BadgeDollarSign,
  LayoutDashboard,
} from "lucide-react";

import AppLogo from "@/components/shared/app-logo";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { DashboardLogo } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "sanbatcaobang",
    email: "sbcb@osisa.sumxue",
    avatar: "/assets/avatar/sisa.png",
  },
  logo: [
    {
      logo: AppLogo,
    },
  ],
  home: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
    },
  ],
  navMain: [
    {
      title: "Sản phẩm",
      url: "#",
      icon: Package2,
      items: [
        {
          title: "Danh sách sản phẩm",
          url: "/admin/product",
        },

        {
          title: "sản phẩm sắp hết hàng",
          url: "/admin/inventory-product",
        },
      ],
    },
    {
      title: "Danh mục",
      url: "#",
      icon: ChartBarStacked,
      items: [
        {
          title: "Danh sách danh mục",
          url: "/admin/categories",
        },
      ],
    },
    {
      title: "Đơn hàng",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Danh sách đơn hàng",
          url: "/admin/orders",
        },
      ],
    },
    {
      title: "Người dùng",
      url: "#",
      icon: User,
      items: [
        {
          title: "Tài khoản",
          url: "/admin/users/customer",
        },
      ],
    },
    {
      title: "Báo cáo",
      url: "#",
      icon: Star,
      items: [
        {
          title: "Doanh thu hàng năm",
          url: "/admin/revenue/annual-revenue",
        },

        {
          title: "Doanh thu theo danh mục",
          url: "/admin/revenue/category-revenue",
        },
        {
          title: "Doanh thu hàng tháng",
          url: "/admin/revenue/monthly-revenue",
        },
        {
          title: "Doanh thu theo sản phẩm",
          url: "/admin/revenue/product-revenue",
        },
        {
          title: "Doanh thu hàng quý",
          url: "/admin/revenue/quarterly-revenue",
        },
      ],
    },
    {
      title: "Khuyến mãi",
      url: "#",
      icon: BadgeDollarSign,
      items: [
        {
          title: "Mã giảm giá",
          url: "/admin/coupons",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo teams={data.logo} />
      </SidebarHeader>
      <SidebarContent>
        <a
          className="flex gap-2 items-center mx-auto py-2 px-3 font-medium w-full justify-start rounded-md hover:bg-gray-200"
          href={data.home[0].url}
        >
          <LayoutDashboard size={16} />
          {data.home[0].title}
        </a>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
