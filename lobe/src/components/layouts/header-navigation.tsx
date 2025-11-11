import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu, X, Zap, FileText, DollarSign, User, LogOut, Crown, ArrowUp, Receipt } from 'lucide-react';
import { SimpleLanguageToggle } from '../language-toggle-simple';
import { ThemeToggleDropdown } from '../theme-toggle-dropdown';

interface HeaderNavigationProps {
  className?: string;
}

export function HeaderNavigation({ className }: HeaderNavigationProps) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 检查登录状态
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuth();
    // 监听storage变化以同步登录状态
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // 监听滚动状态
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConsoleClick = () => {
    if (isAuthenticated) {
      navigate('/panel');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const menuItems = [
    {
      label: '模型定价',
      href: '/model',
      icon: <DollarSign className="w-4 h-4" />,
      description: '查看所有AI模型的定价详情'
    },
    {
      label: '套餐购买',
      href: '/subscription',
      icon: <Crown className="w-4 h-4" />,
      description: '选择适合您的AI模型访问套餐'
    },
    {
      label: '文档',
      href: 'https://thor-ai.apifox.cn',
      icon: <FileText className="w-4 h-4" />,
      description: 'API文档和开发指南',
      external: true
    }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <nav className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo区域 */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">
                Thor AI
              </span>
            </Link>
          </div>

          {/* 中间菜单 - 桌面端 */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* 右侧控制台按钮 - 桌面端 */}
          <div className="hidden md:flex items-center space-x-3">
            <SimpleLanguageToggle />
            <ThemeToggleDropdown />
            {isAuthenticated ? (
              <>
                <Button
                  onClick={handleConsoleClick}
                  size="sm"
                  className="gap-2"
                >
                  <User className="w-4 h-4" />
                  控制台
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  退出
                </Button>
              </>
            ) : (
              <Button
                onClick={handleConsoleClick}
                size="sm"
                className="gap-2"
              >
                控制台
              </Button>
            )}
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {/* Logo in mobile menu */}
                  <div className="flex items-center space-x-2 pb-4 border-b">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-xl">Thor AI</span>
                  </div>

                  {/* Mobile menu items */}
                  {menuItems.map((item) => (
                    <div key={item.label}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-start space-x-3 py-2"
                        >
                          <div className="mt-1">{item.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-start space-x-3 py-2"
                        >
                          <div className="mt-1">{item.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Language and Theme toggle for mobile */}
                  <div className="pt-4 border-t space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">语言设置</span>
                      <SimpleLanguageToggle />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">主题设置</span>
                      <ThemeToggleDropdown />
                    </div>
                  </div>

                  {/* Mobile console button */}
                  <div className="pt-4 border-t space-y-2">
                    {isAuthenticated ? (
                      <>
                        <Button
                          onClick={() => {
                            handleConsoleClick();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full gap-2"
                        >
                          <User className="w-4 h-4" />
                          控制台
                        </Button>
                        <Button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          variant="outline"
                          className="w-full gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          退出登录
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          handleConsoleClick();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full"
                      >
                        登录控制台
                      </Button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}