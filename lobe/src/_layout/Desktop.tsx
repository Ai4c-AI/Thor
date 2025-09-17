import { memo, useMemo, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import useThemeStore from "../store/theme";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { LayoutProps } from "./type";
import { Home, Sun, Moon, MonitorSpeaker, LogOut, Settings, User } from "lucide-react";
import AnnouncementBanner from "../components/AnnouncementBanner";
import { cn } from "@/lib/utils";

// 用户下拉菜单组件
const UserDropdown = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-10 w-10 border-2 border-border hover:border-ring transition-colors">
          <AvatarImage src="/logo.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => navigate('/current')}>
          <User className="mr-2 h-4 w-4" />
          {t('nav.current')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/setting')}>
          <Settings className="mr-2 h-4 w-4" />
          {t('nav.setting')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          {t('common.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

UserDropdown.displayName = "UserDropdown";

// 侧边栏组件
const Sidebar = memo(({ nav }: { nav: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleLogoClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <aside className="w-60 bg-card border-r border-border flex flex-col">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center justify-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={handleLogoClick}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/logo.png" alt="Thor" />
                    <AvatarFallback>T</AvatarFallback>
                  </Avatar>
                  <h1 className="text-xl font-bold text-foreground">
                    Thor
                  </h1>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Thor AI Platform Management System</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-2">
          {nav}
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = "DesktopSidebar";

// 主题切换组件
const ThemeToggle = memo(() => {
  const { t } = useTranslation();
  const { themeMode, toggleTheme } = useThemeStore();

  const handleThemeSwitch = useCallback((mode: 'light' | 'dark' | 'auto') => {
    toggleTheme(mode);
  }, [toggleTheme]);

  const themeIcons = {
    light: <Sun className="h-4 w-4" />,
    dark: <Moon className="h-4 w-4" />,
    auto: <MonitorSpeaker className="h-4 w-4" />
  };

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
        {(['light', 'dark', 'auto'] as const).map((mode) => (
          <Tooltip key={mode}>
            <TooltipTrigger asChild>
              <Button
                variant={themeMode === mode ? "default" : "ghost"}
                size="sm"
                onClick={() => handleThemeSwitch(mode)}
                className="h-8 w-8 p-0"
              >
                {themeIcons[mode]}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t(`common.theme.${mode}`)}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
});

ThemeToggle.displayName = "ThemeToggle";

// 头部操作组件
const HeaderActions = memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleModelClick = useCallback(() => {
    navigate('/model');
  }, [navigate]);

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        onClick={handleModelClick}
        className="gap-2"
      >
        <Home className="h-4 w-4" />
        {t('nav.model')}
      </Button>
      <LanguageSwitcher />
      <ThemeToggle />
      <UserDropdown />
    </div>
  );
});

HeaderActions.displayName = "HeaderActions";

// 主布局组件
const DesktopLayout = memo<LayoutProps>(({ nav }) => {
  return (
    <div className="relative">
      <AnnouncementBanner />
      <div className="min-h-screen h-screen overflow-hidden bg-background flex">
        <Sidebar nav={nav} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-end items-center px-6 h-16 bg-background border-b border-border z-10">
            <HeaderActions />
          </header>
          <main className="m-4 flex flex-col flex-1 overflow-auto">
            <div className="bg-card rounded-lg border border-border p-6 flex-1 min-h-0 overflow-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
});

DesktopLayout.displayName = "DesktopMainLayout";

export default DesktopLayout;