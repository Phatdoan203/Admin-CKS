import * as React from "react"
import { ChevronRight } from "lucide-react"


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";
// This is sample data.
const data = {
  navMain: [
    {
      title: "Quản lí chữ kí số",
      items: [
        {
          title: "Quản lí đăng kí CKS",
          to: "/signature-management"
        },
        {
          title: "Quản lí File CKS",
          to: "file-management"
        },
        {
          title: "Quản lí hủy CKS",
          to: "cancel-management"
        },
      ],
    },
    {
      title: "Báo cáo",
      
      items: [
        {
          title: "Tình trạng hồ sơ khách hàng",
          to: "/profile-report"
        },
      ]
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center h-16 bg-white">
          <img src="/Logo TNEX Finance.png" alt="logo" className="h-14 object-contain" />
        </div>
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                       
                        <SidebarMenuButton asChild >
                          <Link to={item.to}>{item.title}</Link>
                        </SidebarMenuButton>
                     
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
