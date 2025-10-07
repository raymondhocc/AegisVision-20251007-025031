import { NavLink } from 'react-router-dom';
import { Shield, LayoutDashboard, Video, BarChart2, Bell, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppStore } from '@/stores/appStore';
const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/streams', icon: Video, label: 'Stream Management' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/alerts', icon: Bell, label: 'Alerts History' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];
export function Sidebar() {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  return (
    <aside className={cn(
      "flex flex-col bg-card border-r transition-all duration-300 ease-in-out",
      isSidebarOpen ? "w-64" : "w-20"
    )}>
      <div className="flex items-center h-16 px-6 border-b flex-shrink-0">
        <Shield className="h-8 w-8 text-primary flex-shrink-0" />
        {isSidebarOpen && <h1 className="ml-3 text-xl font-bold whitespace-nowrap overflow-hidden">Aegis Vision</h1>}
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.to}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) => cn(
                    "flex items-center p-3 rounded-lg transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {isSidebarOpen && <span className="ml-4 font-medium whitespace-nowrap">{item.label}</span>}
                </NavLink>
              </TooltipTrigger>
              {!isSidebarOpen && (
                <TooltipContent side="right" className="bg-card text-foreground">
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <div className="p-4 mt-auto border-t flex-shrink-0">
        {isSidebarOpen ? (
          <p className="text-xs text-muted-foreground text-center">
            Built with ❤️ at Cloudflare
          </p>
        ) : null}
      </div>
    </aside>
  );
}