import React, { memo, useState, useCallback, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '../components/ui/sidebar';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../components/ui/dropdown-menu';
import { Separator } from '../components/ui/separator';
import { cn } from '../lib/utils';
import { useIsMobile } from '../hooks/use-mobile';
import useThemeStore from '../store/theme';
import LanguageSwitcher from '../components/LanguageSwitcher';
import AnnouncementBanner from '../components/AnnouncementBanner';
import { LayoutProps } from './type';
import {
  Home,
  Sun,
  Moon,
  Monitor,
  Settings,
  LogOut,
  Menu
} from 'lucide-react';

// 主题切换组件
const ThemeToggle = memo(() => {
  const { themeMode, toggleTheme } = useThemeStore();
  const { t } = useTranslation();

  const handleThemeChange = useCallback(() => {
    const modes = ['light', 'dark', 'auto'] as const;
    const currentIndex = modes.indexOf(themeMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    toggleTheme(nextMode);
  }, [themeMode, toggleTheme]);

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleThemeChange}
      className="h-8 w-8 p-0"
      title={t(`theme.${themeMode}`)}
    >
      {getThemeIcon()}
    </Button>
  );
});

ThemeToggle.displayName = "ThemeToggle";

// 用户菜单组件
const UserMenu = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.png" alt="Thor" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={() => navigate('/current')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>{t('nav.current')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/setting')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>{t('nav.setting')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('common.logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

UserMenu.displayName = "UserMenu";

// 应用侧边栏组件
const AppSidebar = memo(({ nav }: { nav: React.ReactNode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { state } = useSidebar();

  const handleLogoClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Sidebar collapsible="icon" className="border-r bg-card group-data-[collapsible=icon]:w-12">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogoClick}
            className="flex items-center gap-2 p-1 w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-1"
          >
            <Avatar className="h-8 w-8 rounded-lg shrink-0">
              <AvatarImage src="/logo.png" alt="Thor" />
              <AvatarFallback className="rounded-lg">T</AvatarFallback>
            </Avatar>
            {state !== "collapsed" && (
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-foreground">Thor</span>
                <span className="truncate text-xs text-muted-foreground">
                  {t('app.description')}
                </span>
              </div>
            )}
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 group-data-[collapsible=icon]:px-1">
        {nav}
      </SidebarContent>
      <SidebarFooter className="border-t p-2 group-data-[collapsible=icon]:p-1">
        {state !== "collapsed" ? (
          <div className="flex items-center justify-between">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
});

AppSidebar.displayName = "AppSidebar";

// 应用头部组件
const AppHeader = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <SidebarTrigger className="-ml-1" />
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="flex items-center space-x-2">
              {isMobile && <SidebarTrigger className="-ml-1" />}
              <div className="hidden md:flex">
                <Separator orientation="vertical" className="mx-2 h-4" />
              </div>
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            {!isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/model')}
                className="h-9 px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Home className="mr-2 h-4 w-4" />
                {t('nav.model')}
              </Button>
            )}

            <div className="flex items-center space-x-2">
              <UserMenu />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
});

AppHeader.displayName = "AppHeader";

// 主布局组件
const MainLayout = memo<LayoutProps>(({ nav }) => {
  return (
    <div className="relative">
      <AnnouncementBanner />
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-muted/40">
          <AppSidebar nav={nav} />
          <div className="flex flex-1 flex-col">
            <AppHeader />
            <SidebarInset>
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <div className="flex-1 rounded-lg border bg-card text-card-foreground shadow-sm min-h-0">
                  <div className="p-6 flex-1 overflow-auto">
                    <Outlet />
                  </div>
                </div>
              </main>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
});

MainLayout.displayName = 'MainLayout';

export default MainLayout;
