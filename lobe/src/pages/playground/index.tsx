import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageCircle,
  Image as ImageIcon,
  Settings,
  Maximize2,
  Minimize2,
  Command,
  Sidebar,
  Plus,
  Search,
  History,
  Zap,
  Palette,
  Download,
  Upload,
  Share,
  MoreVertical,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { isMobileDevice } from '../../utils/responsive';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

// Import redesigned components
import ChatWorkspace from './components/ChatWorkspace';
import ImageWorkspace from './components/ImageWorkspace';
import FalWorkspace from './components/FalWorkspace';
import ModelConfigPanel from './components/ModelConfigPanel';
import { getModelInfo } from '../../services/ModelService';
import { usePlayground, type WorkspaceType, type ChatSession } from './hooks/usePlayground';

// Session sidebar component for chat history management
const SessionSidebar = ({
  sessions,
  currentSessionId,
  onSessionSelect,
  onSessionDelete,
  onSessionDuplicate,
  onNewSession,
  onImportSessions,
  onExportSessions,
  collapsed,
  onToggle
}: {
  sessions: ChatSession[];
  currentSessionId: string;
  onSessionSelect: (id: string) => void;
  onSessionDelete: (id: string) => void;
  onSessionDuplicate: (id: string) => void;
  onNewSession: () => void;
  onImportSessions: () => void;
  onExportSessions: () => void;
  collapsed: boolean;
  onToggle: () => void;
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return new Date(timestamp).toLocaleDateString();
  };

  if (collapsed) {
    return (
      <div className="w-12 bg-background/95 backdrop-blur-sm border-r border-border flex flex-col items-center py-3 space-y-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onToggle}>
                <Sidebar className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">展开会话列表</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onNewSession}>
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">新建会话</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex-1 flex flex-col space-y-1 w-full px-1">
          {filteredSessions.slice(0, 8).map((session) => (
            <TooltipProvider key={session.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={session.id === currentSessionId ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                    onClick={() => onSessionSelect(session.id)}
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      session.id === currentSessionId ? "bg-primary" : "bg-muted-foreground"
                    )} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="max-w-xs">
                    <p className="font-medium">{session.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatRelativeTime(session.updatedAt)}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 bg-background/95 backdrop-blur-sm border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">会话历史</span>
            <Badge variant="secondary" className="text-xs">
              {sessions.length}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <Sidebar className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button size="sm" className="flex-1" onClick={onNewSession}>
            <Plus className="h-3 w-3 mr-1" />
            新建
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onImportSessions}>
                <Upload className="h-3 w-3 mr-2" />
                导入会话
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExportSessions}>
                <Download className="h-3 w-3 mr-2" />
                导出会话
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="搜索会话..."
            className="pl-9 h-8 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Sessions list */}
      <div className="flex-1 overflow-auto p-2 space-y-1">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            {searchQuery ? '未找到匹配的会话' : '暂无会话记录'}
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "group relative p-3 rounded-lg cursor-pointer transition-all hover:bg-accent/50",
                session.id === currentSessionId && "bg-accent border border-border shadow-sm"
              )}
              onClick={() => onSessionSelect(session.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-sm font-medium truncate">{session.title}</h4>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{formatRelativeTime(session.updatedAt)}</span>
                    {session.pinned && (
                      <Badge variant="outline" className="h-4 px-1 text-xs">置顶</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <span className="truncate">{session.model || '未设置模型'}</span>
                    <span>•</span>
                    <span>{session.messages.length} 条消息</span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onSessionDuplicate(session.id);
                    }}>
                      复制会话
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      // TODO: 实现重命名功能
                    }}>
                      重命名
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onSessionDelete(session.id);
                      }}
                      className="text-destructive"
                    >
                      删除会话
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Command palette for quick actions
const CommandPalette = ({
  open,
  onOpenChange,
  playgroundState
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playgroundState: any;
}) => {
  const { t } = useTranslation();

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="搜索操作..." />
      <CommandList>
        <CommandEmpty>未找到结果</CommandEmpty>
        <CommandGroup heading="会话管理">
          <CommandItem onSelect={() => playgroundState.createSession()}>
            <Plus className="mr-2 h-4 w-4" />
            新建会话
          </CommandItem>
          <CommandItem onSelect={() => playgroundState.resetToDefaults()}>
            <Settings className="mr-2 h-4 w-4" />
            重置配置
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="界面">
          <CommandItem onSelect={() => playgroundState.toggleTheme()}>
            <Palette className="mr-2 h-4 w-4" />
            切换主题
          </CommandItem>
          <CommandItem onSelect={() => playgroundState.setFullScreen(!playgroundState.fullScreen)}>
            {playgroundState.fullScreen ? <Minimize2 className="mr-2 h-4 w-4" /> : <Maximize2 className="mr-2 h-4 w-4" />}
            {playgroundState.fullScreen ? '退出全屏' : '进入全屏'}
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="工作区">
          <CommandItem onSelect={() => playgroundState.setActiveWorkspace('chat')}>
            <MessageCircle className="mr-2 h-4 w-4" />
            切换到聊天模式
          </CommandItem>
          <CommandItem onSelect={() => playgroundState.setActiveWorkspace('image')}>
            <ImageIcon className="mr-2 h-4 w-4" />
            切换到图像模式
          </CommandItem>
          <CommandItem onSelect={() => playgroundState.setActiveWorkspace('fal')}>
            <Sparkles className="mr-2 h-4 w-4" />
            切换到Fal AI模式
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

// Main playground component
export default function Playground() {
  const { t } = useTranslation();
  const isMobile = useIsMobile() || isMobileDevice();
  const [modelInfo, setModelInfo] = useState<any>(null);
  const [commandOpen, setCommandOpen] = useState(false);

  const playgroundState = usePlayground();
  const {
    activeWorkspace,
    setActiveWorkspace,
    sidebarCollapsed,
    setSidebarCollapsed,
    configPanelCollapsed,
    setConfigPanelCollapsed,
    fullScreen,
    setFullScreen,
    sessions,
    currentSessionId,
    createSession,
    deleteSession,
    switchSession,
    duplicateSession,
    exportSession,
    importSessions
  } = playgroundState;

  // Load model info on mount
  useEffect(() => {
    getModelInfo().then((res) => {
      setModelInfo(res.data);
    });
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K to open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
      // Command/Ctrl + N for new session
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        createSession();
      }
      // Command/Ctrl + / to toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setSidebarCollapsed(!sidebarCollapsed);
      }
      // F11 for fullscreen
      if (e.key === 'F11') {
        e.preventDefault();
        setFullScreen(!fullScreen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [createSession, sidebarCollapsed, setSidebarCollapsed, fullScreen, setFullScreen]);

  // Auto-create first session if none exist
  useEffect(() => {
    if (sessions.length === 0) {
      createSession();
    }
  }, [sessions.length, createSession]);

  const handleWorkspaceChange = (workspace: WorkspaceType) => {
    setActiveWorkspace(workspace);
  };

  const handleImportSessions = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const sessions = JSON.parse(e.target?.result as string);
            importSessions(Array.isArray(sessions) ? sessions : [sessions]);
          } catch (error) {
            toast.error('导入失败：文件格式不正确');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExportSessions = () => {
    if (sessions.length === 0) {
      toast.warning('没有可导出的会话');
      return;
    }

    const dataStr = JSON.stringify(sessions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `playground_sessions_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('会话已导出');
  };

  const renderWorkspace = () => {
    const commonProps = { modelInfo, playgroundState };

    switch (activeWorkspace) {
      case 'chat':
        return <ChatWorkspace {...commonProps} />;
      case 'image':
        return <ImageWorkspace {...commonProps} />;
      case 'fal':
        return <FalWorkspace {...commonProps} />;
      default:
        return <ChatWorkspace {...commonProps} />;
    }
  };

  return (
    <div className={cn(
      "bg-background overflow-hidden flex transition-all duration-300",
      fullScreen ? "fixed inset-0 z-50" : "h-[calc(100vh-4rem)]"
    )}>
      {/* Session History Sidebar - Only for chat workspace */}
      {activeWorkspace === 'chat' && (
        <SessionSidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSessionSelect={switchSession}
          onSessionDelete={deleteSession}
          onSessionDuplicate={duplicateSession}
          onNewSession={createSession}
          onImportSessions={handleImportSessions}
          onExportSessions={handleExportSessions}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header with workspace tabs and controls */}
        <div className="bg-background/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 py-2 flex-shrink-0">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setConfigPanelCollapsed(!configPanelCollapsed)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}

            {/* Workspace tabs */}
            <Tabs value={activeWorkspace} onValueChange={handleWorkspaceChange}>
              <TabsList className="grid grid-cols-3 w-auto">
                <TabsTrigger value="chat" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('playground.tabs.chat')}</span>
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('playground.tabs.image')}</span>
                </TabsTrigger>
                <TabsTrigger value="fal" className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden sm:inline">Fal AI</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Header controls */}
          <div className="flex items-center space-x-2">
            {/* Command palette trigger */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCommandOpen(true)}
                  >
                    <Command className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>命令面板 (⌘K)</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Fullscreen toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setFullScreen(!fullScreen)}
                  >
                    {fullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{fullScreen ? '退出全屏 (F11)' : '全屏 (F11)'}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Config panel toggle for desktop */}
            {!isMobile && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setConfigPanelCollapsed(!configPanelCollapsed)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>配置面板</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        {/* Main workspace content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Workspace content */}
          <div className="flex-1 overflow-hidden bg-muted/30">
            {renderWorkspace()}
          </div>

          {/* Configuration panel */}
          {!isMobile && !configPanelCollapsed && (
            <aside className="w-80 border-l border-border bg-background/95 backdrop-blur-sm">
              <ModelConfigPanel
                modelInfo={modelInfo}
                playgroundState={playgroundState}
                collapsed={false}
                onToggleCollapse={() => setConfigPanelCollapsed(true)}
                activeWorkspace={activeWorkspace}
              />
            </aside>
          )}
        </div>
      </div>

      {/* Mobile configuration panel */}
      {isMobile && (
        <Sheet open={!configPanelCollapsed} onOpenChange={(open) => setConfigPanelCollapsed(!open)}>
          <SheetContent side="right" className="w-[320px] p-0">
            <ModelConfigPanel
              modelInfo={modelInfo}
              playgroundState={playgroundState}
              collapsed={false}
              onToggleCollapse={() => setConfigPanelCollapsed(true)}
              activeWorkspace={activeWorkspace}
            />
          </SheetContent>
        </Sheet>
      )}

      {/* Command palette */}
      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        playgroundState={playgroundState}
      />
    </div>
  );
}