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
          url: "/admin/product/productList",
        },
        {
          title: "Số lượng tồn kho",
          url: "#",
        },
        {
          title: "Trạng thái sản phẩm",
          url: "#",
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
          url: "/admin/product/categories",
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
          url: "/admin/product/order",
        },
        {
          title: "Chi tiết đơn hàng",
          url: "#",
        },
        {
          title: "Trạng thái đơn hàng",
          url: "#",
        },
        {
          title: "Thanh toán",
          url: "#",
        },
      ],
    },
    {
      title: "Khách hàng",
      url: "#",
      icon: User,
      items: [
        {
          title: "Danh sách khách hàng",
          url: "#",
        },
        {
          title: "Thông tin khách hàng",
          url: "#",
        },
        {
          title: "Lịch sử mua hàng",
          url: "#",
        },
        {
          title: "Trạng thái tài khoản",
          url: "#",
        },
      ],
    },
    {
      title: "Đánh giá sản phẩm",
      url: "#",
      icon: Star,
      items: [
        {
          title: "Review",
          url: "#",
        },
        {
          title: "Chặn spam",
          url: "#",
        },
        {
          title: "Theo dõi rating",
          url: "#",
        },
      ],
    },
    {
      title: "Khuyến mãi",
      url: "#",
      icon: BadgeDollarSign,
      items: [
        {
          title: "Flash sale",
          url: "#",
        },
        {
          title: "Tạo mã giảm giá",
          url: "#",
        },
        {
          title: "Giảm giá theo mùa",
          url: "#",
        },
        {
          title: "Giảm giá theo danh mục",
          url: "#",
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
