import { useEffect, useState } from "react";
import { DeleteModelManager, EnableModelManager, GetModelManagerList, GetModelStats, GetModelTypes, GetAllTags, GetModelMetadata } from "../../services/ModelManagerService";
import { getCompletionRatio, renderQuota } from "../../utils/render";
import CreateModelManagerPage from "./features/CreateModelManager";
import UpdateModelManagerPage from "./features/UpdateModelManager";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Filter,
  RefreshCw,
  Settings,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  TrendingUp,
  Database,
  MessageSquare,
  Image,
  Volume2,
  Link,
  Mic,
  Speaker,
  AlertCircle,
  BarChart3,
  Grid3X3,
  List,
  SlidersHorizontal,
  Sparkles,
  Clock,
  Target,
  LayoutGrid,
  Activity,
  Box,
  Star,
  ArrowUpDown,
  X,
  TrendingDown,
  Zap,
  Circle,
  Power,
  Layers,
  Info,
  Cpu,
  Shield,
  Globe
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getIconByName } from "../../utils/iconutils";

const MODEL_TYPES = [
  { key: 'all', label: 'All Models', icon: Database, color: 'text-primary', bgColor: 'bg-primary/10', count: 0 },
  { key: 'chat', label: 'Chat Models', icon: MessageSquare, color: 'text-emerald-600', bgColor: 'bg-emerald-50 dark:bg-emerald-950/20', count: 0 },
  { key: 'image', label: 'Image Models', icon: Image, color: 'text-violet-600', bgColor: 'bg-violet-50 dark:bg-violet-950/20', count: 0 },
  { key: 'audio', label: 'Audio Models', icon: Volume2, color: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-950/20', count: 0 },
  { key: 'embedding', label: 'Embedding', icon: Link, color: 'text-pink-600', bgColor: 'bg-pink-50 dark:bg-pink-950/20', count: 0 },
  { key: 'stt', label: 'Speech to Text', icon: Mic, color: 'text-cyan-600', bgColor: 'bg-cyan-50 dark:bg-cyan-950/20', count: 0 },
  { key: 'tts', label: 'Text to Speech', icon: Speaker, color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-950/20', count: 0 }
];

const STATUS_FILTERS = [
  { key: 'all', label: 'All Status', icon: BarChart3, color: 'text-muted-foreground', bgColor: 'bg-muted/50' },
  { key: 'enabled', label: 'Enabled', icon: CheckCircle, color: 'text-emerald-600', bgColor: 'bg-emerald-50 dark:bg-emerald-950/20' },
  { key: 'disabled', label: 'Disabled', icon: XCircle, color: 'text-destructive', bgColor: 'bg-destructive/10' }
];

interface ModelManager {
  id: string;
  model: string;
  description?: string;
  type: string;
  icon?: string;
  enable: boolean;
  tags?: string[];
  quotaType: number;
  promptRate: number;
  completionRate?: number;
  audioPromptRate?: number;
  audioOutputRate?: number;
  quotaMax?: number;
  isVersion2?: boolean;
  createdAt: string;
}

interface ModelStats {
  total: number;
  enabled: number;
  disabled: number;
  [key: string]: number;
}

export default function ModelManager() {
  const { t } = useTranslation();

  // State management
  const [createOpen, setCreateOpen] = useState(false);
  const [updateValue, setUpdateValue] = useState<{ value: ModelManager | null; open: boolean }>({
    value: null,
    open: false
  });
  const [data, setData] = useState<ModelManager[]>([]);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [isK, setIsK] = useState(false);
  const [input, setInput] = useState({
    page: 1,
    pageSize: 50,
    model: '',
  });

  // Filter and view states
  const [selectedModel, setSelectedModel] = useState<ModelManager | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTypeFilter, setActiveTypeFilter] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'created' | 'type' | 'status'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Data states
  const [modelStats, setModelStats] = useState<ModelStats>({
    total: 0,
    enabled: 0,
    disabled: 0
  });
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<any>({});

  // Data loading functions
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await GetModelManagerList(
        input.model,
        input.page,
        input.pageSize,
        false,
        activeTypeFilter === 'all' ? '' : activeTypeFilter,
        '',
        selectedTags.length > 0 ? selectedTags : undefined
      );
      if (res.success) {
        setData(res.data.items || []);
        setTotal(res.data.total || 0);
      }
    } catch (error) {
      toast.error(t('common.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    setStatsLoading(true);
    try {
      const res = await GetModelStats();
      if (res.success) {
        setModelStats(res.data);
      }
    } catch (error) {
      toast.error(t('common.loadFailed'));
    } finally {
      setStatsLoading(false);
    }
  };

  const loadMetadata = async () => {
    try {
      const res = await GetModelMetadata();
      if (res.success) {
        setMetadata(res.data);
        setAvailableTags(res.data.tags || []);
        setAvailableTypes(res.data.modelTypes || []);
      }
    } catch (error) {
      toast.error(t('common.loadFailed'));
    }
  };

  useEffect(() => {
    loadData();
  }, [input, activeTypeFilter, selectedTags]);

  useEffect(() => {
    loadStats();
    loadMetadata();
  }, []);

  // Filter and sort data
  const filteredAndSortedData = data
    .filter(item => {
      if (activeStatusFilter === 'enabled' && !item.enable) return false;
      if (activeStatusFilter === 'disabled' && item.enable) return false;
      return true;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      switch (sortBy) {
        case 'name':
          aValue = a.model.toLowerCase();
          bValue = b.model.toLowerCase();
          break;
        case 'created':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        case 'status':
          aValue = a.enable ? 1 : 0;
          bValue = b.enable ? 1 : 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // Event handlers
  const handleModelClick = (model: ModelManager) => {
    setSelectedModel(model);
    setDetailOpen(true);
  };

  const handleEnableModel = async (id: string, currentStatus: boolean) => {
    try {
      const res = await EnableModelManager(id);
      if (res.success) {
        toast.success(currentStatus ? t('modelManager.modelDisabled') : t('modelManager.modelEnabled'));
        loadData();
        loadStats();
      } else {
        toast.error(res.message || t('common.operationFailed'));
      }
    } catch (error) {
      toast.error(t('common.operationFailed'));
    }
  };

  const handleDeleteModel = async (id: string) => {
    try {
      const res = await DeleteModelManager(id);
      if (res.success) {
        toast.success(t('modelManager.deleteSuccess'));
        loadData();
        loadStats();
        loadMetadata();
      } else {
        toast.error(res.message || t('common.deleteFailed'));
      }
    } catch (error) {
      toast.error(t('common.deleteFailed'));
    }
  };

  // Render functions
  const renderPrice = (item: ModelManager) => {
    const multiplier = isK ? 1000 : 1000000;
    const unit = isK ? t('modelManager.perK') : t('modelManager.perM');

    if (item.quotaType === 1) {
      return (
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {t('modelManager.input')}: {renderQuota(item.promptRate * multiplier, 6)}/{unit}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {t('modelManager.output')}: {renderQuota(item.completionRate ? item.completionRate * multiplier : getCompletionRatio(item.model) * multiplier, 6)}/{unit}
          </Badge>
          {item.isVersion2 && (
            <>
              <Badge variant="secondary" className="text-xs">
                {t('modelManager.audioInput')}: {renderQuota(item.audioPromptRate! * multiplier)}/{unit}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {t('modelManager.audioOutput')}: {renderQuota(item.audioOutputRate ? item.audioOutputRate * multiplier : getCompletionRatio(item.model) * multiplier)}/{unit}
              </Badge>
            </>
          )}
        </div>
      );
    } else {
      return (
        <Badge variant="default" className="text-xs">
          {t('modelManager.perRequest')}: {renderQuota(item.promptRate, 6)}
        </Badge>
      );
    }
  };

  const renderModelCard = (model: ModelManager, index: number) => {
    const icon = getIconByName(model.icon, 40);
    const typeConfig = MODEL_TYPES.find(type => type.key === model.type.toLowerCase()) || MODEL_TYPES[0];

    return (
      <motion.div
        key={model.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, delay: index * 0.03 }}
        className="group cursor-pointer"
        onClick={() => handleModelClick(model)}
      >
        <Card className={cn(
          "h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5",
          "border border-border/50 bg-card/50 backdrop-blur-sm",
          !model.enable && "opacity-60",
          "group-hover:border-primary/20"
        )}>
          <CardHeader className="space-y-4 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={cn(
                  "relative flex h-14 w-14 items-center justify-center rounded-xl transition-all",
                  typeConfig.bgColor,
                  "group-hover:scale-105"
                )}>
                  <div className={cn("text-lg transition-colors", typeConfig.color)}>
                    {icon?.icon || <Database className="h-7 w-7" />}
                  </div>
                  {model.enable && (
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                      <div className="h-2 w-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base font-semibold truncate mb-1 group-hover:text-primary transition-colors">
                    {model.model}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2 leading-relaxed">
                    {model.description || t('common.noData')}
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant={model.enable ? "default" : "secondary"}
                  className={cn(
                    "text-xs font-medium transition-all",
                    model.enable
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
                      : "bg-muted text-muted-foreground border-border"
                  )}
                >
                  {model.enable ? (
                    <><CheckCircle className="h-3 w-3 mr-1" />{t('modelManager.modelEnabled')}</>
                  ) : (
                    <><XCircle className="h-3 w-3 mr-1" />{t('modelManager.modelDisabled')}</>
                  )}
                </Badge>
                {model.isVersion2 && (
                  <Badge variant="outline" className="text-xs border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-400">
                    <Sparkles className="h-3 w-3 mr-1" />
                    V2
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-medium",
                  typeConfig.color,
                  typeConfig.bgColor,
                  "border-current/20"
                )}
              >
                <typeConfig.icon className="h-3 w-3 mr-1" />
                {t(`modelManager.type${model.type.charAt(0).toUpperCase() + model.type.slice(1)}`)}
              </Badge>
            </div>

            {model.tags && model.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {model.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs bg-muted/50 text-muted-foreground border-border">
                    {tag}
                  </Badge>
                ))}
                {model.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground border-border">
                    +{model.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">{t('modelManager.modelPrice')}</span>
              </div>
              <div className="space-y-2">
                {renderPrice(model)}
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setUpdateValue({ value: model, open: true })}
                  className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEnableModel(model.id, model.enable)}
                  className={cn(
                    "h-9 w-9 p-0",
                    model.enable
                      ? "hover:bg-destructive/10 hover:text-destructive"
                      : "hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/20"
                  )}
                >
                  {model.enable ? (
                    <Power className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-9 w-9 p-0 hover:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleModelClick(model)}>
                    <Eye className="h-4 w-4 mr-2" />
                    {t('common.view')} {t('common.detail')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUpdateValue({ value: model, open: true })}>
                    <Edit className="h-4 w-4 mr-2" />
                    {t('modelManager.updateModel')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDeleteModel(model.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('modelManager.deleteModel')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderModelList = () => {
    return (
      <div className="space-y-3">
        {filteredAndSortedData.map((model, index) => {
          const icon = getIconByName(model.icon, 32);
          const typeConfig = MODEL_TYPES.find(type => type.key === model.type.toLowerCase()) || MODEL_TYPES[0];

          return (
            <motion.div
              key={model.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className={cn(
                "cursor-pointer transition-all duration-200",
                !model.enable && "opacity-60"
              )}
              onClick={() => handleModelClick(model)}
            >
              <Card className="hover:shadow-md hover:shadow-primary/10 transition-all duration-200 border border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        typeConfig.bgColor
                      )}>
                        <div className={cn(typeConfig.color)}>
                          {icon?.icon || <Database className="h-5 w-5" />}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{model.model}</h3>
                          <Badge variant={model.enable ? "default" : "secondary"} className="text-xs">
                            {model.enable ? t('modelManager.modelEnabled') : t('modelManager.modelDisabled')}
                          </Badge>
                          {model.isVersion2 && (
                            <Badge variant="outline" className="text-xs">
                              <Sparkles className="h-3 w-3 mr-1" />
                              V2
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {model.description || t('common.noData')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={cn("text-xs", typeConfig.color, typeConfig.bgColor)}>
                        <typeConfig.icon className="h-3 w-3 mr-1" />
                        {t(`modelManager.type${model.type.charAt(0).toUpperCase() + model.type.slice(1)}`)}
                      </Badge>

                      <div className="text-xs text-muted-foreground">
                        {new Date(model.createdAt).toLocaleDateString()}
                      </div>

                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setUpdateValue({ value: model, open: true })}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEnableModel(model.id, model.enable)}
                          className="h-8 w-8 p-0"
                        >
                          {model.enable ? (
                            <Power className="h-4 w-4 text-destructive" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                          )}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleModelClick(model)}>
                              <Eye className="h-4 w-4 mr-2" />
                              {t('common.view')} {t('common.detail')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteModel(model.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t('modelManager.deleteModel')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderStats = () => {
    const stats = [
      {
        label: t('common.total') + ' ' + t('nav.modelManager'),
        value: modelStats.total,
        icon: Database,
        description: t('modelManager.title'),
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        trend: '+12%',
        trendUp: true
      },
      {
        label: t('modelManager.modelEnabled'),
        value: modelStats.enabled,
        icon: CheckCircle,
        description: t('common.enabled'),
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
        trend: '+8%',
        trendUp: true
      },
      {
        label: t('modelManager.modelDisabled'),
        value: modelStats.disabled,
        icon: XCircle,
        description: t('common.disabled'),
        color: 'text-destructive',
        bgColor: 'bg-destructive/10',
        trend: '-3%',
        trendUp: false
      },
      {
        label: t('modelManager.typeChat'),
        value: modelStats.chat || 0,
        icon: MessageSquare,
        description: t('modelManager.typeChat'),
        color: 'text-violet-600',
        bgColor: 'bg-violet-50 dark:bg-violet-950/20',
        trend: '+15%',
        trendUp: true
      },
      {
        label: t('common.view'),
        value: filteredAndSortedData.length,
        icon: Eye,
        description: t('common.view'),
        color: 'text-orange-600',
        bgColor: 'bg-orange-50 dark:bg-orange-950/20',
        trend: '+5%',
        trendUp: true
      }
    ];

    if (statsLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.trendUp ? (
                      <TrendingUp className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                    <span className={cn(
                      "font-medium",
                      stat.trendUp ? "text-emerald-600" : "text-destructive"
                    )}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold tracking-tight">{stat.value.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderFilters = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">{t('common.type')}</h4>
        <div className="space-y-2">
          {MODEL_TYPES.map((type) => {
            const count = type.key === 'all' ? modelStats.total : modelStats[type.key] || 0;
            const isActive = activeTypeFilter === type.key;

            return (
              <Button
                key={type.key}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-between h-auto p-3 text-left"
                onClick={() => setActiveTypeFilter(type.key)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", type.bgColor)}>
                    <type.icon className={cn("h-4 w-4", type.color)} />
                  </div>
                  <span>
                    {type.key === 'all' ? t('common.all') + ' ' + t('nav.modelManager') : t(`modelManager.type${type.key.charAt(0).toUpperCase() + type.key.slice(1)}`)}
                  </span>
                </div>
                <Badge variant="outline">{count}</Badge>
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-3">{t('common.status')}</h4>
        <div className="space-y-2">
          {STATUS_FILTERS.map((status) => {
            const count = status.key === 'all' ? modelStats.total :
                         status.key === 'enabled' ? modelStats.enabled : modelStats.disabled;
            const isActive = activeStatusFilter === status.key;

            return (
              <Button
                key={status.key}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-between h-auto p-3 text-left"
                onClick={() => setActiveStatusFilter(status.key)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", status.bgColor)}>
                    <status.icon className={cn("h-4 w-4", status.color)} />
                  </div>
                  <span>
                    {status.key === 'all' ? t('common.all') + ' ' + t('common.status') :
                     status.key === 'enabled' ? t('common.enabled') : t('common.disabled')}
                  </span>
                </div>
                <Badge variant="outline">{count}</Badge>
              </Button>
            );
          })}
        </div>
      </div>

      {availableTags.length > 0 && (
        <>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">{t('common.tags')}</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {availableTags.slice(0, 12).map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedTags(prev =>
                      prev.includes(tag)
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTags([])}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                {t('common.clear')} {t('common.all')}
              </Button>
            )}
          </div>
        </>
      )}

      {(activeTypeFilter !== 'all' || activeStatusFilter !== 'all' || selectedTags.length > 0) && (
        <>
          <Separator />
          <Button
            variant="outline"
            onClick={() => {
              setActiveTypeFilter('all');
              setActiveStatusFilter('all');
              setSelectedTags([]);
            }}
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {t('common.clear')} {t('common.all')} {t('common.filter')}
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                    <Database className="h-6 w-6" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{t('modelManager.title')}</h1>
                  <p className="text-base text-muted-foreground">{t('modelManager.modelDescription')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={loadData}
                disabled={loading}
                className="gap-2 h-11"
              >
                <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                {t('common.refresh')}
              </Button>
              <Button
                size="lg"
                onClick={() => setCreateOpen(true)}
                className="gap-2 h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
              >
                <Plus className="h-4 w-4" />
                {t('modelManager.createModel')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Toolbar */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            {/* Search and filters */}
            <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t('modelManager.searchModel')}
                  value={input.model}
                  onChange={(e) => setInput({ ...input, model: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && loadData()}
                  className="pl-11 h-11 bg-background border-border shadow-sm"
                />
              </div>

              <div className="flex items-center gap-4 rounded-lg border bg-background p-3">
                <Label htmlFor="price-unit" className="text-sm font-medium whitespace-nowrap">
                  {t('modelManager.priceUnit')}:
                </Label>
                <Switch
                  id="price-unit"
                  checked={isK}
                  onCheckedChange={setIsK}
                />
                <Label htmlFor="price-unit" className="text-sm text-muted-foreground">
                  {isK ? t('modelManager.modelPricePerK') : t('modelManager.modelPricePerM')}
                </Label>
              </div>
            </div>

            {/* View controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border bg-background p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="gap-2 h-9"
                >
                  <LayoutGrid className="h-4 w-4" />
                  {t('common.grid')}
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="gap-2 h-9"
                >
                  <List className="h-4 w-4" />
                  {t('common.list')}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-40 h-10">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">{t('common.name')}</SelectItem>
                    <SelectItem value="created">{t('common.createdAt')}</SelectItem>
                    <SelectItem value="type">{t('common.type')}</SelectItem>
                    <SelectItem value="status">{t('common.status')}</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="h-10 px-3"
                >
                  {sortOrder === 'asc' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </Button>
              </div>

              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 h-10">
                    <Filter className="h-4 w-4" />
                    {t('common.filter')}
                    {(activeTypeFilter !== 'all' || activeStatusFilter !== 'all' || selectedTags.length > 0) && (
                      <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs bg-primary/10 text-primary border-primary/20">
                        {[
                          activeTypeFilter !== 'all' ? 1 : 0,
                          activeStatusFilter !== 'all' ? 1 : 0,
                          selectedTags.length
                        ].reduce((a, b) => a + b, 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      {t('common.filter')} {t('nav.modelManager')}
                    </SheetTitle>
                    <SheetDescription>{t('modelManager.modelDescription')}</SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
                    {renderFilters()}
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-6 py-6">
          {renderStats()}

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  viewMode === 'grid'
                    ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "space-y-4"
                )}
              >
                {Array.from({ length: viewMode === 'grid' ? 8 : 5 }).map((_, i) => (
                  <Card key={i} className="border border-border/50">
                    {viewMode === 'grid' ? (
                      <>
                        <CardHeader>
                          <div className="flex items-center space-x-4">
                            <Skeleton className="h-14 w-14 rounded-xl" />
                            <div className="space-y-2 flex-1">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-3 w-1/2" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-2/3" />
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-10 w-10 rounded-lg" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-3 w-1/3" />
                          </div>
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </motion.div>
            ) : filteredAndSortedData.length > 0 ? (
              <motion.div
                key={`${viewMode}-${filteredAndSortedData.length}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <AnimatePresence>
                      {filteredAndSortedData.map((model, index) => renderModelCard(model, index))}
                    </AnimatePresence>
                  </div>
                ) : (
                  renderModelList()
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                  <Database className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('common.noData')}</h3>
                <p className="text-muted-foreground mb-6 text-center max-w-md">
                  {input.model || activeTypeFilter !== 'all' || activeStatusFilter !== 'all' || selectedTags.length > 0 ?
                    t('modelManager.searchModel') :
                    t('modelManager.modelDescription')
                  }
                </p>
                {(!input.model && activeTypeFilter === 'all' && activeStatusFilter === 'all' && selectedTags.length === 0) ? (
                  <Button onClick={() => setCreateOpen(true)} size="lg" className="gap-2">
                    <Plus className="h-4 w-4" />
                    {t('modelManager.createModel')}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInput({ ...input, model: '' });
                      setActiveTypeFilter('all');
                      setActiveStatusFilter('all');
                      setSelectedTags([]);
                    }}
                    size="lg"
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {t('common.clear')} {t('common.all')} {t('common.filter')}
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Model Details Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {t('common.view')} {t('common.detail')}
            </DialogTitle>
            <DialogDescription>{t('modelManager.modelDescription')}</DialogDescription>
          </DialogHeader>

          {selectedModel && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-background">
                  {getIconByName(selectedModel.icon, 32)?.icon || <Database className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedModel.model}</h3>
                  <p className="text-muted-foreground">
                    {selectedModel.description || t('common.noData')}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge variant={selectedModel.enable ? "default" : "secondary"}>
                    {selectedModel.enable ? t('modelManager.modelEnabled') : t('modelManager.modelDisabled')}
                  </Badge>
                  {selectedModel.isVersion2 && (
                    <Badge variant="outline">
                      <Sparkles className="h-3 w-3 mr-1" />
                      V2
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4" />
                      <Label className="font-medium">{t('common.type')}</Label>
                    </div>
                    <p className="text-muted-foreground">
                      {t(`modelManager.type${selectedModel.type.charAt(0).toUpperCase() + selectedModel.type.slice(1)}`)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4" />
                      <Label className="font-medium">{t('modelManager.modelType')}</Label>
                    </div>
                    <p className="text-muted-foreground">
                      {selectedModel.quotaType === 1 ? t('modelManager.volumeBilling') : t('modelManager.perUseBilling')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-4 w-4" />
                      <Label className="font-medium">{t('modelManager.modelMaxContext')}</Label>
                    </div>
                    <p className="text-muted-foreground">
                      {selectedModel.quotaMax?.toLocaleString() || t('common.noData')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      <Label className="font-medium">{t('common.createdAt')}</Label>
                    </div>
                    <p className="text-muted-foreground">
                      {new Date(selectedModel.createdAt).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {selectedModel.tags && selectedModel.tags.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="h-4 w-4" />
                      <Label className="font-medium">{t('common.tags')}</Label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-4 w-4" />
                    <Label className="font-medium">{t('modelManager.modelPrice')}</Label>
                  </div>
                  <div className="space-y-2">
                    {renderPrice(selectedModel)}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              onClick={() => {
                setUpdateValue({ value: selectedModel, open: true });
                setDetailOpen(false);
              }}
              className="gap-2"
            >
              <Edit className="w-4 h-4" />
              {t('modelManager.updateModel')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create/Update Modals */}
      <CreateModelManagerPage
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onOk={() => {
          loadData();
          loadStats();
          loadMetadata();
          setCreateOpen(false);
        }}
      />

      <UpdateModelManagerPage
        open={updateValue.open}
        onClose={() => setUpdateValue({ ...updateValue, open: false })}
        onOk={() => {
          loadData();
          loadStats();
          loadMetadata();
          setUpdateValue({ ...updateValue, open: false });
        }}
        value={updateValue.value}
      />
    </div>
  );
}