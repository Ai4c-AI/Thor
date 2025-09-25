import { memo, useState } from 'react';
import { LayoutProps } from './type';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, Home, Sun, Moon, MonitorSpeaker } from 'lucide-react';
import useThemeStore from '../store/theme';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const MobileLayout = memo(({ nav }: LayoutProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { themeMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleLogoClick = () => {
    navigate('/');
    if (drawerVisible) setDrawerVisible(false);
  };

  const handleThemeSwitch = (mode: string) => {
    toggleTheme(mode as 'light' | 'dark' | 'auto');
  };

  const ThemeToggle = () => {
    const themeIcons = {
      light: <Sun className="h-4 w-4" />,
      dark: <Moon className="h-4 w-4" />,
      auto: <MonitorSpeaker className="h-4 w-4" />
    };

    return (
      <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
        {(['light', 'dark', 'auto'] as const).map((mode) => (
          <Button
            key={mode}
            variant={themeMode === mode ? "default" : "ghost"}
            size="sm"
            onClick={() => handleThemeSwitch(mode)}
            className="h-8 w-8 p-0"
          >
            {themeIcons[mode]}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen h-screen flex flex-col overflow-hidden bg-background">
      <header className="fixed top-0 w-full z-50 h-14 px-4 flex items-center justify-between bg-background border-b border-border">
        <div className="flex items-center gap-2">
          <Sheet open={drawerVisible} onOpenChange={setDrawerVisible}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/logo.png" alt="Thor" />
                    <AvatarFallback>T</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">Thor AI</span>
                </SheetTitle>
              </SheetHeader>
              <div className="h-full overflow-y-auto">
                {nav}
              </div>
            </SheetContent>
          </Sheet>

          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/logo.png" alt="Thor" />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
            <h1 className="text-lg font-semibold text-foreground">
              Thor
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/model')}
            className="gap-1"
          >
            <Home className="h-4 w-4" />
            {t('nav.model')}
          </Button>
        </div>
      </header>

      <main className="mt-14 p-2 flex-1 overflow-auto">
        <div className="bg-card rounded-lg border border-border p-2 flex-1 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
});

MobileLayout.displayName = 'MobileMainLayout';

export default MobileLayout;