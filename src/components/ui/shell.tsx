import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Shell({ children }: { children: React.ReactNode; }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Sticky Header with high z-index */}
                <header className="flex sticky top-0 z-50 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <div className="p-5">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

