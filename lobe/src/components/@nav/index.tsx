import { memo, useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  Bug,
  PieChart,
  Megaphone,
  Cherry,
  ChevronDown,
  Github,
  Book,
  HelpCircle,
  Zap,
  Crown,
  ArrowUp,
  Receipt,
  CreditCard,
} from "lucide-react";

import { useActiveTabKey } from "../../hooks/useActiveTabKey";
import { SidebarTabKey } from "../../store/global/initialState";
import { GeneralSetting, InitSetting } from "../../services/SettingService";
import { info } from "../../services/UserService";
import { getTokens } from "../../services/TokenService";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui/sidebar";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import TokenSelectionDialog from "./TokenSelectionDialog";
import Avatar from "./_layout/Desktop/Avatar";
import { cn } from "../../lib/utils";

interface MenuItem {
  icon: JSX.Element;
  label: string;
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

interface MenuGroup {
  key: string;
  label: string;
  items: MenuItem[];
  role?: string;
}

const Nav = memo(() => {
  const { t, i18n } = useTranslation();
  const [sidebarKey, setSidebarKey] = useState<SidebarTabKey>(useActiveTabKey());
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const chatDisabled = InitSetting.find(
    (item: any) => item.key === GeneralSetting.ChatLink
  );
  const [userRole, setUserRole] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<string[]>(['AI', 'Business', 'Setting']);
  const [isTokenModalVisible, setIsTokenModalVisible] = useState(false);
  const [userTokens, setUserTokens] = useState<any[]>([]);

  const getMenuStructure = useMemo(() => {
    // 主要功能菜单（不分组）
    const mainItems: MenuItem[] = [
      {
        icon: <Home className="w-4 h-4" />,
        label: t('sidebar.panel'),
        enable: true,
        key: SidebarTabKey.Panel,
        role: "user,admin",
        onClick: () => navigate("/panel"),
      },
      {
        icon: <Bug className="w-4 h-4" />,
        enable: true,
        label: t('sidebar.playground'),
        key: SidebarTabKey.Playground,
        onClick: () => navigate("/playground"),
      },
      {
        icon: <KeyRound className="w-4 h-4" />,
        enable: true,
        label: t('sidebar.token'),
        key: SidebarTabKey.Token,
        onClick: () => navigate("/token"),
        role: "user,admin",
      },
      {
        icon: <PieChart className="w-4 h-4" />,
        enable: true,
        label: t('sidebar.usage'),
        key: SidebarTabKey.Usage,
        onClick: () => navigate("/usage"),
        role: "user,admin",
      },
      {
        icon: <CircleUserRound className="w-4 h-4" />,
        label: t('sidebar.current'),
        enable: true,
        key: SidebarTabKey.Current,
        onClick: () => navigate("/current"),
        role: "user,admin",
      },
    ];

    // 分组菜单
    const menuGroups: MenuGroup[] = [
      {
        key: 'ai',
        label: t('sidebar.ai'),
        role: "user,admin",
        items: [
          {
            icon: <BarChart className="w-4 h-4" />,
            label: t('sidebar.channel'),
            enable: true,
            key: SidebarTabKey.Channel,
            onClick: () => navigate("/channel"),
            role: "admin",
          },
          {
            disabled: chatDisabled?.value === undefined || chatDisabled?.value === "",
            icon: <BotMessageSquare className="w-4 h-4" />,
label: t('sidebar.chat'),
            enable: false,
            key: SidebarTabKey.Chat,
            onClick: () => {
              const url = new URL(chatDisabled.value);
              url.searchParams.append("token", localStorage.getItem("token") || "");
              window.open(url.href, "_blank");
            },
            role: "user,admin",
          },
          {
            icon: <BrainCog className="w-4 h-4" />,
            enable: true,
            label: t('sidebar.modelManager'),
            key: SidebarTabKey.ModelManager,
            onClick: () => navigate("/model-manager"),
            role: "admin",
          },
          {
            icon: <Shuffle className="w-4 h-4" />,
            enable: true,
            label: t('sidebar.modelMap'),
            key: SidebarTabKey.ModelMap,
            onClick: () => navigate("/model-map"),
            role: "admin",
          },
          {
            icon: <Cherry className="w-4 h-4" />,
            enable: true,
            label: "Cherry Studio",
            key: "cherry-studio",
            onClick: () => handleCherryStudioClick(),
            role: "user,admin",
          }
        ]
      },
      {
        key: 'subscription',
        label: '套餐管理',
        role: "user,admin",
        items: [
          {
            icon: <ArrowUp className="w-4 h-4" />,
            enable: true,
            label: '套餐升级',
            key: SidebarTabKey.SubscriptionUpgrade,
            onClick: () => navigate("/subscription/upgrade"),
            role: "user,admin",
          },
          {
            icon: <Receipt className="w-4 h-4" />,
            enable: true,
            label: '订阅记录',
            key: SidebarTabKey.SubscriptionHistory,
            onClick: () => navigate("/subscription/history"),
            role: "user,admin",
          },
          {
            icon: <CreditCard className="w-4 h-4" />,
            enable: true,
            label: '套餐管理',
            key: SidebarTabKey.SubscriptionAdmin,
            onClick: () => navigate("/subscription-admin"),
            role: "admin",
          },
        ]
      },
      {
        key: 'business',
        label: t('sidebar.business'),
        role: "admin",
        items: [
          {
            icon: <Code className="w-4 h-4" />,
            enable: true,
            label: t('sidebar.redeemCode'),
            key: SidebarTabKey.RedeemCode,
            onClick: () => navigate("/redeem-code"),
            role: "admin",
          },
          {
            icon: <ShipWheel className="w-4 h-4" />,
            label: t('sidebar.product'),
            enable: true,
            key: SidebarTabKey.Product,
            onClick: () => navigate("/product"),
            role: "admin",
          },
        ]
      },
      {
        key: 'system',
        label: t('sidebar.setting'),
        items: [
          {
            icon: <Megaphone className="w-4 h-4" />,
            label: t('sidebar.announcement'),
            enable: true,
            key: SidebarTabKey.Announcement,
            onClick: () => navigate("/announcement"),
            role: "admin",
          },
          {
            icon: <FileText className="w-4 h-4" />,
            label: t('sidebar.logger'),
            enable: true,
            key: SidebarTabKey.Logger,
            onClick: () => navigate("/logger"),
            role: "user,admin",
          },
          {
            icon: <Zap className="w-4 h-4" />,
            enable: true,
            label: t('sidebar.rateLimit'),
            key: SidebarTabKey.RateLimit,
            onClick: () => navigate("/rate-limit"),
            role: "admin",
          },
          {
            icon: <User className="w-4 h-4" />,
            label: t('sidebar.user'),
            enable: true,
            key: SidebarTabKey.User,
            onClick: () => navigate("/user"),
            role: "admin",
          },
          {
            icon: <UsersRound className="w-4 h-4" />,
            label: t('sidebar.userGroup'),
            enable: true,
            key: SidebarTabKey.UserGroup,
            onClick: () => navigate("/user-group"),
            role: "admin",
          },
          {
            icon: <Settings className="w-4 h-4" />,
            label: t('nav.setting'),
            enable: true,
            key: 'system-setting',
            onClick: () => navigate("/setting"),
            role: "admin",
          },
        ],
      },
    ];

    // 过滤权限
    const filteredMainItems = userRole
      ? mainItems.filter(item => !item.role || item.role.split(",").includes(userRole))
      : mainItems;

    const filteredGroups = menuGroups.map(group => ({
      ...group,
      items: group.items.filter(item => {
        if (item.hidden) return false;
        if (!userRole) return !item.role;
        if (!item.role) return true;
        return item.role.split(",").includes(userRole);
      })
    })).filter(group => {
      if (group.items.length === 0) return false;
      if (!userRole) return !group.role;
      if (!group.role) return true;
      return group.role.split(",").includes(userRole);
    });

    return { mainItems: filteredMainItems, groups: filteredGroups };
  }, [t, i18n.language, navigate, chatDisabled, userRole]);

  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    info().then((res) => {
      if (!res.success) return;
      const role = res.data.role;
      if (!role) return;
      setUserRole(role);
    });
  }


  const handleCherryStudioClick = () => {
    fetchUserTokens();
    setIsTokenModalVisible(true);
  };

  const fetchUserTokens = () => {
    getTokens(1, 100)
      .then(res => {
        if (res.success) {
          const tokens = res.data.items || [];
          if (tokens.length === 0) {
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

    const jsonString = JSON.stringify(tokenData);
    const base64Data = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
    }));

    const cherryStudioUrl = `cherrystudio://providers/api-keys?v=1&data=${base64Data}`;
    window.location.href = cherryStudioUrl;
    setIsTokenModalVisible(false);
  };

  useEffect(() => {
    const path = location.pathname;
    const allItems = [
      ...getMenuStructure.mainItems,
      ...getMenuStructure.groups.flatMap(group => group.items)
    ];

    // 创建路径到key的映射，支持精确匹配
    const pathToKeyMap: Record<string, string> = {
      '/panel': SidebarTabKey.Panel,
      '/playground': SidebarTabKey.Playground,
      '/token': SidebarTabKey.Token,
      '/usage': SidebarTabKey.Usage,
      '/current': SidebarTabKey.Current,
      '/channel': SidebarTabKey.Channel,
      '/model-manager': SidebarTabKey.ModelManager,
      '/model-map': SidebarTabKey.ModelMap,
      '/redeem-code': SidebarTabKey.RedeemCode,
      '/product': SidebarTabKey.Product,
      '/announcement': SidebarTabKey.Announcement,
      '/logger': SidebarTabKey.Logger,
      '/rate-limit': SidebarTabKey.RateLimit,
      '/user': SidebarTabKey.User,
      '/user-group': SidebarTabKey.UserGroup,
      '/setting': 'system-setting',
      '/subscription/upgrade': SidebarTabKey.SubscriptionUpgrade,
      '/subscription/history': SidebarTabKey.SubscriptionHistory,
      '/subscription-admin': SidebarTabKey.SubscriptionAdmin
    };

    // 首先尝试精确匹配
    if (pathToKeyMap[path]) {
      setSidebarKey(pathToKeyMap[path] as SidebarTabKey);
      return;
    }

    // 如果没有精确匹配，则使用包含匹配（按key长度降序排序，优先匹配更长的key）
    const sortedItems = allItems.sort((a, b) => b.key.length - a.key.length);
    for (const item of sortedItems) {
      if (item.onClick && path.includes(item.key)) {
        setSidebarKey(item.key as SidebarTabKey);
        return;
      }
    }
  }, [location.pathname, getMenuStructure]);

  return (
    <>
      <Sidebar variant="inset" className="border-r">
        <SidebarHeader>
          <div className="flex h-12 shrink-0 items-center gap-2 px-2">
            <Avatar />
          </div>
        </SidebarHeader>

        <SidebarContent className="gap-0">
          {/* 主要功能区 */}
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="px-1.5 py-2">
              <SidebarMenu>
                {getMenuStructure.mainItems.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      onClick={item.disabled ? undefined : item.onClick}
                      isActive={sidebarKey === item.key}
                      disabled={item.disabled}
                      className={cn(
                        "h-9 px-2.5",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                      tooltip={state === "collapsed" ? item.label : undefined}
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* 分组功能区 */}
          {getMenuStructure.groups.map((group) => (
            <SidebarGroup key={group.key} className="py-0">
              {state !== "collapsed" && (
                <SidebarGroupLabel className="px-1.5 text-xs font-medium text-sidebar-foreground/70">
                  {group.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent className="px-1.5 py-2">
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        onClick={item.disabled ? undefined : item.onClick}
                        isActive={sidebarKey === item.key}
                        disabled={item.disabled}
                        className={cn(
                          "h-8 px-2.5 text-sm",
                          item.disabled && "opacity-50 cursor-not-allowed"
                        )}
                        tooltip={state === "collapsed" ? item.label : undefined}
                      >
                        {item.icon}
                        <span className="flex-1 truncate">{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="p-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex h-8 items-center justify-center gap-2 px-1.5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        size="sm"
                        onClick={() => window.open('https://github.com/AIDotNet/Thor', '_blank')}
                        className="h-7 w-7 p-0"
                      >
                        <Github className="h-4 w-4" />
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Thor开源地址</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        size="sm"
                        onClick={() => window.open('/doc', '_blank')}
                        className="h-7 w-7 p-0"
                      >
                        <Book className="h-4 w-4" />
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Thor文档</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        size="sm"
                        onClick={() => window.open('/help', '_blank')}
                        className="h-7 w-7 p-0"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>帮助中心</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <TokenSelectionDialog
        open={isTokenModalVisible}
        onOpenChange={setIsTokenModalVisible}
        tokens={userTokens}
        onTokenSelect={handleTokenSelect}
      />
    </>
  );
});

Nav.displayName = 'Nav';

export default Nav;