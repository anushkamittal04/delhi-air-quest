import { NavLink as RouterNavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Navigation, Leaf, Trophy, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import breathwiseLogo from "@/assets/breathwise-logo.png";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/travel", label: "Travel Alerts", icon: Navigation },
  { to: "/eco-quest", label: "Eco Quest", icon: Leaf },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-3 mb-8">
          <img src={breathwiseLogo} alt="BreathWise" className="w-9 h-9 rounded-lg object-cover" />
          <span className="font-display font-bold text-sidebar-foreground text-lg">BreathWise</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <RouterNavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </RouterNavLink>
          ))}
        </nav>

        {user && (
          <div className="border-t border-sidebar-border pt-4">
            <div className="px-3 mb-3">
              <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/50">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              Log out
            </button>
          </div>
        )}
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={breathwiseLogo} alt="BreathWise" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-display font-bold text-foreground">BreathWise</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-14 left-0 right-0 bg-card border-b border-border p-4 shadow-elevated" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <RouterNavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </RouterNavLink>
              ))}
            </nav>
            {user && (
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors w-full mt-2"
              >
                <LogOut className="w-5 h-5" />
                Log out
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:p-8 p-4 pt-18 md:pt-8 max-w-5xl">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
