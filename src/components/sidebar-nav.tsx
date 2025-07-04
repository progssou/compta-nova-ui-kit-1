
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  BookOpen, 
  CreditCard, 
  FileText, 
  Users, 
  Settings,
  Menu,
  X,
  Bell
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { AIAssistant } from "./ai-assistant";

interface SidebarNavProps {
  userRole?: "dirigeant" | "comptable" | "caissier";
}

export function SidebarNav({ userRole = "dirigeant" }: SidebarNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      title: "Tableau de bord",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["dirigeant", "comptable", "caissier"]
    },
    {
      title: "Journaux",
      href: "/journaux",
      icon: BookOpen,
      roles: ["dirigeant", "comptable"]
    },
    {
      title: "Comptes",
      href: "/comptes",
      icon: CreditCard,
      roles: ["dirigeant", "comptable"]
    },
    {
      title: "Pièces",
      href: "/pieces",
      icon: FileText,
      roles: ["dirigeant", "comptable", "caissier"]
    },
    {
      title: "Utilisateurs",
      href: "/users",
      icon: Users,
      roles: ["dirigeant"]
    },
    {
      title: "Paramètres",
      href: "/settings",
      icon: Settings,
      roles: ["dirigeant", "comptable"]
    }
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className={cn(
      "flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!isCollapsed && (
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CN</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">ComptaNova</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Jean Dupont
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {userRole}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {filteredNavigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                isCollapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && item.title}
            </Link>
          ))}
        </div>
      </ScrollArea>

      {/* AI Assistant */}
      <div className="p-4">
        <AIAssistant collapsed={isCollapsed} />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
          <ThemeToggle />
          {!isCollapsed && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Déconnexion</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
