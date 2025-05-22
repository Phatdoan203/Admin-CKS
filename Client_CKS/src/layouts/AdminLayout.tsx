import { AppSidebar } from "@/components/AdminComponents/SideBar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Outlet, useNavigate } from "react-router";
import { SlLogout } from "react-icons/sl";

export default function AdminLayout() {
     const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa token khỏi localStorage
        localStorage.removeItem('accessToken');
        // Optional: xóa refresh_token nếu có
        // localStorage.removeItem('refresh_token');

        // Chuyển hướng về trang đăng nhập
        navigate('/login-page');
    };
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="ml-auto">
                        <Button variant="ghost" className="px-4 py-2 text-2xl font-medium" onClick={handleLogout}>
                            <SlLogout />
                        </Button>
                    </div>
                </header>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}