"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import React from "react";
import { number, TypeOf } from "zod";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  function NavItem({ item }: { item: (typeof items)[number] }) {
    const isMatch = item.items?.some((s) => s.url === pathname); //Check submenu xem có url === pathname không.
    const [open, setOpen] = React.useState<boolean>(
      !!(item.isActive || isMatch) // !!(...) ép về boolean.
    );
    React.useEffect(() => {
      setOpen(!!(item.isActive || isMatch)); //set submenu open == isActive : submenu có thể tự ĐÓNG lại
    }, [isMatch, item.isActive, item.items]);

    return (
      <Collapsible
        asChild
        open={open}
        onOpenChange={setOpen}
        key={item.title}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    className={pathname === subItem.url ? "bg-muted" : ""}
                  >
                    <a href={subItem.url}>
                      <span>{subItem.title}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
