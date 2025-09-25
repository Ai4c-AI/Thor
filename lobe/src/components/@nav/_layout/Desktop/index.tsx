import { memo, useEffect, useState, useMemo } from "react";

import { useActiveTabKey } from "../../../../hooks/useActiveTabKey";
import {
  BarChart,
  KeyRound,
  ShipWheel,
  Brain,
  FileText,
  BotMessageSquare,
  Code,
  User,
  CircleUserRound,
  Settings,
  Shuffle,
  Handshake,
  BrainCog,
  UsersRound,
  Home,
  ChevronRight,
  Bug,
  PieChart,
  Megaphone,
  Cherry,
  FileClock,
  Database,
  ChevronDown
} from "lucide-react";
import { SidebarTabKey } from "../../../../store/global/initialState";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GeneralSetting,
  InitSetting,
} from "../../../../services/SettingService";
import { info } from "../../../../services/UserService";
import { useTranslation } from "react-i18next";
import { getTokens } from "../../../../services/TokenService";

import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog";
import { cn } from "../../../../lib/utils";

// Define type for menu items to match expected structure
interface MenuItem {
  icon: JSX.Element;
  label: React.ReactNode;
  enable: boolean;
  key: string;
  role?: string;
  onClick?: () => void;
  disabled?: boolean;
  hidden?: boolean;
  children?: MenuItem[];
  badge?: boolean;
  badgeColor?: string;
}

const Nav = memo(() => {
  const { t, i18n } = useTranslation();
  const [sidebarKey, setSidebarKey] = useState<SidebarTabKey>(useActiveTabKey());
  const location = useLocation();
  const navigate = useNavigate();
  const chatDisabled = InitSetting.find(
    (item: any) => item.key === GeneralSetting.ChatLink
  );
  const [userRole, setUserRole] = useState<string | null>(null);
  // 管理导航菜单展开状态
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [isTokenModalVisible, setIsTokenModalVisible] = useState(false);
  const [userTokens, setUserTokens] = useState<any[]>([]);

  // 使用 useMemo 并依赖 i18n.language，这样语言变化时菜单会重新生成
  const getMenuItems = useMemo((): MenuItem[] => {
    const items: MenuItem[] = [
      {
        icon: <Home />,
        label: t('sidebar.panel'),
        enable: true,
        key: SidebarTabKey.Panel,
        role: "user,admin",
        onClick: () => {
          navigate("/panel");
        },
      },
      {
        key: SidebarTabKey.AI,
        label: t('sidebar.ai'),
        enable: true,
        icon: <Brain />,
        role: "user,admin",
        children: [
          {
            icon: <BarChart />,
            label: t('sidebar.channel'),
            enable: true,
            key: SidebarTabKey.Channel,
            onClick: () => {
              navigate("/channel");
            },
            role: "admin",
          },
          {
            disabled: chatDisabled.value === undefined || chatDisabled.value === "",
            icon: <BotMessageSquare />,
            label: t('sidebar.chat'),
            badge: true,
            badgeColor: "blue",
            enable: false,
            key: SidebarTabKey.Chat,
            onClick: () => {
              // 给chatDisabled.value url添加query
              const url = new URL(chatDisabled.value);
              url.searchParams.append("token", localStorage.getItem("token") || "");
              window.open(url.href, "_blank");
            },
            role: "user,admin",
          },
          {
            icon: <BrainCog />,
            enable: true,
            label: t('sidebar.modelManager'),
            key: SidebarTabKey.ModelManager,
            onClick: () => {
              navigate("/model-manager");
            },
            role: "admin",
          },
          {
            icon: <Shuffle />,
            enable: true,
            label: t('sidebar.modelMap'),
            key: SidebarTabKey.ModelMap,
            onClick: () => {
              navigate("/model-map");
            },
            role: "admin",
          },
          {
            icon: <Cherry />,
            enable: true,
            label: "Cherry Studio",
            key: "cherry-studio",
            onClick: () => {
              handleCherryStudioClick();
            },
            role: "user,admin",
          }
        ]
      },
      {
        icon: <Bug />,
        enable: true,
        label: t('sidebar.playground'),
        key: SidebarTabKey.Playground,
        onClick: () => {
          navigate("/playground");
        },
      },
      {
        icon: <KeyRound />,
        enable: true,
        label: t('sidebar.token'),
        key: SidebarTabKey.Token,
        onClick: () => {
          navigate("/token");
        },
        role: "user,admin",
      },
      {
        icon: <PieChart />,
        enable: true,
        label: t('sidebar.usage'),
        key: SidebarTabKey.Usage,
        onClick: () => {
          navigate("/usage");
        },
        role: "user,admin",
      },
      
      // Business section
      {
        key: SidebarTabKey.Business,
        label: t('sidebar.business'),
        icon: <Handshake />,
        enable: true,
        role: "admin",
        children: [
          {
            icon: <Code />,
            enable: true,
            label: t('sidebar.redeemCode'),
            key: SidebarTabKey.RedeemCode,
            onClick: () => {
              navigate("/redeem-code");
            },
            role: "admin",
          },
          {
            icon: <ShipWheel />,
            label: t('sidebar.product'),
            enable: true,
            key: SidebarTabKey.Product,
            onClick: () => {
              navigate("/product");
            },
            role: "admin",
          },
        ]
      },
      
      // User section
      {
        icon: <CircleUserRound />,
        label: t('sidebar.current'),
        enable: true,
        key: SidebarTabKey.Current,
        onClick: () => {
          navigate("/current");
        },
        role: "user,admin",
      },
      
      // System settings
      {
        icon: <Settings />,
        label: t('sidebar.setting'),
        enable: true,
        key: SidebarTabKey.Setting,
        children: [
          {
            icon: <Megaphone />,
            label: t('sidebar.announcement'),
            enable: true,
            key: SidebarTabKey.Announcement,
            onClick: () => {
              navigate("/announcement");
            },
            role: "admin",
          },
          {
            icon: <FileText />,
            label: t('sidebar.logger'),
            enable: true,
            key: SidebarTabKey.Logger,
            onClick: () => {
              navigate("/logger");
            },
            role: "user,admin",
          },
          {
            icon: <Settings />,
            enable: true,
            label: t('sidebar.rateLimit'),
            key: SidebarTabKey.RateLimit,
            onClick: () => {
              navigate("/rate-limit");
            },
            role: "admin",
          },
          {
            icon: <User />,
            label: t('sidebar.user'),
            enable: true,
            key: SidebarTabKey.User,
            onClick: () => {
              navigate("/user");
            },
            role: "admin",
          },
          {
            icon: <UsersRound />,
            label: t('sidebar.userGroup'),
            enable: true,
            key: SidebarTabKey.UserGroup,
            onClick: () => {
              navigate("/user-group");
            },
            role: "admin",
          },
          {
            icon: <Settings />,
            label: t('nav.setting'),
            enable: true,
            key: 'system-setting',
            onClick: () => {
              navigate("/setting");
            },
            role: "admin",
          },
        ],
      },
    ];
    if (userRole) {
      return items.filter((item) => {
        // 过滤隐藏的顶级菜单项
        if (item.hidden) return false;

        if (item.children) {
          item.children = item.children.filter((child) => {
            // 过滤隐藏的子菜单项
            if (child.hidden) return false;
            if (!child.role) return true;
            return child.role.split(",").includes(userRole);
          });
          // Only return items with children
          return item.children.length > 0 && (item.role ? item.role.split(",").includes(userRole) : true);
        }
        if (!item.role) return true;
        return item.role.split(",").includes(userRole);
      });
    }

    return items.filter(item => !item.hidden);
  }, [t, i18n.language, navigate, chatDisabled, userRole]); // 依赖 i18n.language 确保语言变化时重新计算

  const [items, setItems] = useState<MenuItem[]>(getMenuItems);

  useEffect(() => {
    loadUser();
  }, []);

  // 当语言或菜单项定义变化时更新菜单
  useEffect(() => {
    setItems(getMenuItems);
  }, [getMenuItems]);

  function loadUser() {
    info().then((res) => {
      if (!res.success) return;
      const role = res.data.role;
      if (!role) return;
      setUserRole(role);
    });
  }


  const handleCherryStudioClick = () => {
    // Fetch user tokens
    fetchUserTokens();
    setIsTokenModalVisible(true);
  };

  const fetchUserTokens = () => {
    // Use the actual token service to get user tokens
    getTokens(1, 100)
      .then(res => {
        if (res.success) {
          const tokens = res.data.items || [];
          if (tokens.length === 0) {
            // Create default token if no tokens exist
            createDefaultToken();
          } else {
            setUserTokens(tokens);
          }
        } else {
          console.error("Failed to fetch tokens:", res.message);
          setUserTokens([]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch tokens:", err);
        setUserTokens([]);
      });
  };

  const createDefaultToken = () => {
    const defaultTokenData = {
      name: "默认Token",
      key: "sk-default-token-" + Math.random().toString(36).substring(2, 15),
      type: "openai",
      expiredTime: null,
      unlimitedExpired: true,
      remainQuota: 1000000,
      unlimitedQuota: false,
      modelRateLimits: []
    };

    // Use the Add service to create default token
    fetch("/api/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(defaultTokenData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Refresh token list after creating default token
        getTokens(1, 100).then(res => {
          if (res.success) {
            setUserTokens(res.data.items || []);
          }
        });
      } else {
        console.error("Failed to create default token:", data.message);
        setUserTokens([]);
      }
    })
    .catch(err => {
      console.error("Failed to create default token:", err);
      setUserTokens([]);
    });
  };

  const handleTokenSelect = (token: any) => {
    const currentDomain = window.location.origin;
    const tokenData = {
      id: "token-api-openai-tokennb",
      baseUrl: currentDomain,
      apiKey: token.key,
      name: "Token AI (OpenAI 老格式)",
      type: "openai"
    };
    
    // Fix btoa encoding error for non-Latin1 characters
    const jsonString = JSON.stringify(tokenData);
    const base64Data = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, 
      function toSolidBytes(match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
    }));
    
    const cherryStudioUrl = `cherrystudio://providers/api-keys?v=1&data=${base64Data}`;
    
    // Open the cherrystudio protocol URL
    window.location.href = cherryStudioUrl;
    
    setIsTokenModalVisible(false);
  };

  const handleTokenModalCancel = () => {
    setIsTokenModalVisible(false);
  };

  useEffect(() => {
    const path = location.pathname;
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (element.onClick && path.includes(element.key)) {
        setSidebarKey(element.key as SidebarTabKey);
        return;
      }
      if (element.children) {
        for (let j = 0; j < element.children.length; j++) {
          const child = element.children[j];
          // @ts-ignore
          if (child.onClick && path.includes(child.key)) {
            setSidebarKey(child.key as SidebarTabKey);
            // 确保父菜单项展开
            if (!openKeys.includes(element.key)) {
              setOpenKeys([...openKeys, element.key]);
            }
            return;
          }
        }
      }
    }
  }, [location.pathname, items, openKeys]);

  // 处理菜单展开/收起
  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  // Custom navigation item component
  const NavigationItem = ({ item, isActive }: { item: MenuItem; isActive: boolean }) => {
    if (item.children && item.children.length > 0) {
      const [isOpen, setIsOpen] = useState(openKeys.includes(item.key));

      useEffect(() => {
        setIsOpen(openKeys.includes(item.key));
      }, [openKeys, item.key]);

      return (
        <Collapsible
          open={isOpen}
          onOpenChange={(open) => {
            if (open) {
              setOpenKeys([...openKeys, item.key]);
            } else {
              setOpenKeys(openKeys.filter(key => key !== item.key));
            }
          }}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start px-3 py-2 h-auto font-medium text-sm",
                "hover:bg-accent hover:text-accent-foreground",
                "data-[state=open]:bg-accent/50"
              )}
            >
              <span className="mr-3 text-muted-foreground">{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pl-6">
            {item.children.map((child) => (
              <NavigationItem key={child.key} item={child} isActive={sidebarKey === child.key} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Button
        variant="ghost"
        disabled={item.disabled}
        onClick={item.onClick}
        className={cn(
          "w-full justify-start px-3 py-2 h-auto font-normal text-sm",
          "hover:bg-accent hover:text-accent-foreground",
          isActive && "bg-accent text-accent-foreground font-medium",
          item.disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className="mr-3 text-muted-foreground">{item.icon}</span>
        <span className="flex-1 text-left">
          {item.label}
          {item.badge && (
            <span className={cn(
              "ml-2 h-2 w-2 rounded-full",
              item.badgeColor === "blue" ? "bg-blue-500" : "bg-primary"
            )} />
          )}
        </span>
      </Button>
    );
  };

  return (
    <div className="flex flex-col h-full border-r bg-card">
      <Separator className="my-2" />

      <div className="flex-1 overflow-auto px-2 space-y-1">
        {items.map((item) => (
          <NavigationItem key={item.key} item={item} isActive={sidebarKey === item.key} />
        ))}
      </div>

      <Separator className="my-2" />

      <Dialog open={isTokenModalVisible} onOpenChange={setIsTokenModalVisible}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>选择 Token</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {userTokens.map((token) => (
              <div key={token.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-muted-foreground">{token.type}</div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleTokenSelect(token)}
                >
                  选择
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default Nav;
