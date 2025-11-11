import { useEffect, useMemo, useState } from "react";
import { getCompletionRatio, renderQuota } from "../../utils/render";
import { getIconByName } from "../../utils/iconutils";
import { getModelLibrary, getModelLibraryMetadata, getModelInfo, getProvider } from "../../services/ModelService";
import { Copy, Info, Search, Tag as TagIcon, MessageSquare, Image, Mic, Headphones, FileText, Layers, Filter, X, ChevronDown, DollarSign, Loader2, Grid3x3, MoreHorizontal } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import MODEL_TYPES from "../model-manager/constants/modelTypes";
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ModelItem {
    id: string;
    model: string;
    provider: string;
    description: string;
    tags: string[];
    type: string;
    enable: boolean;
    quotaType: number;
    promptRate: number;
    completionRate?: number;
    quotaMax?: number;
    icon?: string;
}

export default function ModelPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    
    const [data, setData] = useState<ModelItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [metadataLoading, setMetadataLoading] = useState<boolean>(true);
    const [isK, setIsK] = useState<boolean>(false);
    const [currency, setCurrency] = useState<'USD' | 'CNY'>('USD');
    const [provider, setProvider] = useState<any>({});
    const [total, setTotal] = useState<number>(0);
    const [allTags, setAllTags] = useState<any[]>([]);
    const [tagSearch, setTagSearch] = useState<string>('');
    const [exchangeRate, setExchangeRate] = useState<number>(2.0);
    const [modelMetadata, setModelMetadata] = useState<any>({
        tags: [],
        providers: {},
        icons: {},
        modelTypes: [],
        modelTypeCounts: [],
        providerCounts: [],
        totalModels: 0,
        exchangeRate: 2.0
    });
    const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [input, setInput] = useState({
        page: 1,
        pageSize: 40,
        model: '',
        isFirst: true,
        type: '',
        tags: [] as string[],
        modelType: ''
    });
    const [selectedModelType, setSelectedModelType] = useState<string>('');
    const [visibleTabsCount, setVisibleTabsCount] = useState<number>(10);

    useEffect(() => {
        loadModelInfo();
        loadMetadata();
    }, []);

    // 供应商排序：OpenAI 第一，Claude 第二，其他按原顺序
    const sortedProviders = useMemo(() => {
        const entries = Object.entries(provider);
        return entries.sort(([keyA], [keyB]) => {
            if (keyA === 'OpenAI') return -1;
            if (keyB === 'OpenAI') return 1;
            if (keyA === 'Claude') return -1;
            if (keyB === 'Claude') return 1;
            return 0;
        });
    }, [provider]);

    // 计算可见和隐藏的供应商
    const visibleProviders = useMemo(() => {
        return sortedProviders.slice(0, visibleTabsCount);
    }, [sortedProviders, visibleTabsCount]);

    const hiddenProviders = useMemo(() => {
        return sortedProviders.slice(visibleTabsCount);
    }, [sortedProviders, visibleTabsCount]);

    useEffect(() => {
        loadData();
    }, [input.page, input.pageSize, input.type, input.modelType, input.tags, input.model]);

    const loadModelInfo = () => {
        getModelInfo()
            .then((res) => {
                // Handle model info if needed
            });
    };

    const loadMetadata = () => {
        setMetadataLoading(true);
        getModelLibraryMetadata()
            .then((res) => {
                if (res.data) {
                    setModelMetadata(res.data);
                    if (res.data.tags && Array.isArray(res.data.tags)) {
                        setAllTags(res.data.tags);
                    }
                    if (res.data.providers) {
                        setProvider(res.data.providers);
                    }
                    if (res.data.exchangeRate) {
                        setExchangeRate(res.data.exchangeRate);
                    }
                }
            })
            .catch((error) => {
                console.error('Failed to load metadata:', error);
                loadProviderFallback();
                loadTagsFallback();
            })
            .finally(() => {
                setMetadataLoading(false);
            });
    };

    const loadProviderFallback = () => {
        getProvider().then((res) => {
            setProvider(res.data);
        }).catch(() => {
            console.warn('Provider fallback also failed');
        });
    };

    const loadTagsFallback = () => {
        getModelLibraryMetadata()
            .then((res) => {
                if (res.data && res.data.tags && Array.isArray(res.data.tags)) {
                    setAllTags(res.data.tags);
                }
            })
            .catch(() => {
                console.warn('Tags fallback also failed');
            });
    };

    const loadData = () => {
        setLoading(true);
        getModelLibrary(input.model, input.page, input.pageSize, input.type, input.modelType, input.tags)
            .then((res) => {
                setData(res.data.items);
                setTotal(res.data.total);
            })
            .catch(() => {
                // Handle error
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const copyModelName = (modelName: string) => {
        try {
            navigator.clipboard.writeText(modelName);
        } catch (error) {
            const input = document.createElement('input');
            input.value = modelName;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
        }
    };

    const handleProviderFilter = (key: string) => {
        setInput({
            ...input,
            type: key,
            page: 1
        });
    };

    const handleModelTypeSelect = (type: string) => {
        const newType = selectedModelType?.toLowerCase() === type?.toLowerCase() ? '' : type;
        setSelectedModelType(newType);
        setInput({
            ...input,
            modelType: newType,
            page: 1
        });
    };

    const handleTagsChange = (tag: string) => {
        const newTags = input.tags.includes(tag) 
            ? input.tags.filter(t => t !== tag)
            : [...input.tags, tag];
        setInput({
            ...input,
            tags: newTags,
            page: 1
        });
    };

    const handleModelClick = (item: ModelItem) => {
        setSelectedModel(item);
        setModalVisible(true);
    };

    const getModelTypeIcon = (type: string) => {
        switch (type?.toLowerCase()) {
            case MODEL_TYPES.CHAT.toLowerCase():
                return <MessageSquare size={16} className="text-blue-500" />;
            case MODEL_TYPES.IMAGE.toLowerCase():
                return <Image size={16} className="text-green-500" />;
            case MODEL_TYPES.AUDIO.toLowerCase():
                return <Headphones size={16} className="text-yellow-500" />;
            case MODEL_TYPES.STT.toLowerCase():
                return <Mic size={16} className="text-cyan-500" />;
            case MODEL_TYPES.TTS.toLowerCase():
                return <Headphones size={16} className="text-orange-500" />;
            case MODEL_TYPES.EMBEDDING.toLowerCase():
                return <Layers size={16} className="text-purple-500" />;
            default:
                return <FileText size={16} className="text-gray-500" />;
        }
    };

    const getModelTypeText = (type: string) => {
        const typeKey = type?.toLowerCase();
        switch (typeKey) {
            case 'chat': return t('modelLibrary.chat');
            case 'image': return t('modelLibrary.image');
            case 'audio': return t('modelLibrary.audio');
            case 'stt': return t('modelLibrary.stt');
            case 'tts': return t('modelLibrary.tts');
            case 'embedding': return t('modelLibrary.embedding');
            default: return type;
        }
    };

    // 货币转换函数
    const convertPrice = (price: number) => {
        if (currency === 'CNY') {
            return price * exchangeRate;
        }
        return price;
    };

    // 格式化价格显示 (renderQuota 已经包含了 $ 符号)
    const formatPrice = (price: number) => {
        const convertedPrice = convertPrice(price);
        // renderQuota 函数内部已经有 $ 符号，如果是人民币则替换为 ¥
        const formattedPrice = renderQuota(convertedPrice, 6);
        if (currency === 'CNY') {
            // 将 $ 替换为 ¥
            return formattedPrice.replace('$', '¥');
        }
        return formattedPrice;
    };

    const renderPriceInfo = (item: ModelItem) => {
        if (item.quotaType === 1) {
            const tokenUnit = isK ? '1K' : '1M';
            const multiplier = isK ? 1000 : 1000000;

            const inputPrice = item.promptRate * multiplier;
            const outputPrice = item.completionRate ?
                item.promptRate * multiplier * item.completionRate :
                getCompletionRatio(item.model) * multiplier;

            return (
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <DollarSign size={14} className="text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">定价</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">输入</div>
                            <div className="text-sm font-semibold text-primary">
                                {formatPrice(inputPrice)}
                            </div>
                            <div className="text-xs text-muted-foreground">/ {tokenUnit}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">输出</div>
                            <div className="text-sm font-semibold text-primary">
                                {formatPrice(outputPrice)}
                            </div>
                            <div className="text-xs text-muted-foreground">/ {tokenUnit}</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <DollarSign size={14} className="text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">定价</span>
                    </div>
                    <div className="text-sm font-semibold text-primary">
                        {formatPrice(item.promptRate)} / 次
                    </div>
                </div>
            );
        }
    };

    // 筛选后的标签列表
    const filteredTags = useMemo(() => {
        if (!tagSearch) return allTags;
        return allTags.filter(tag =>
            (typeof tag === 'string' ? tag : tag.tag)
                .toLowerCase()
                .includes(tagSearch.toLowerCase())
        );
    }, [allTags, tagSearch]);

    // 获取模型类型的数量
    const getModelTypeCount = (type: string) => {
        const typeCount = modelMetadata.modelTypeCounts?.find(
            (t: any) => t.type?.toLowerCase() === type.toLowerCase()
        );
        return typeCount?.count || 0;
    };

    // 获取供应商的数量
    const getProviderCount = (providerKey: string) => {
        const providerCount = modelMetadata.providerCounts?.find(
            (p: any) => p.provider === providerKey
        );
        return providerCount?.count || 0;
    };

    // 获取标签的数量
    const getTagCount = (tag: any) => {
        return typeof tag === 'object' ? tag.count : 0;
    };

    // 获取标签名称
    const getTagName = (tag: any) => {
        return typeof tag === 'string' ? tag : tag.tag;
    };

    // 活跃筛选器数量
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (input.type) count++;
        if (input.modelType) count++;
        if (input.tags.length > 0) count += input.tags.length;
        return count;
    }, [input.type, input.modelType, input.tags]);

    // 清除所有筛选器
    const clearAllFilters = () => {
        setInput({ ...input, type: '', tags: [], modelType: '', page: 1 });
        setSelectedModelType('');
    };

    // 移除单个筛选器
    const removeFilter = (filterType: 'type' | 'modelType' | 'tag', value?: string) => {
        switch (filterType) {
            case 'type':
                setInput({ ...input, type: '', page: 1 });
                break;
            case 'modelType':
                setInput({ ...input, modelType: '', page: 1 });
                setSelectedModelType('');
                break;
            case 'tag':
                if (value) {
                    const newTags = input.tags.filter(t => t !== value);
                    setInput({ ...input, tags: newTags, page: 1 });
                }
                break;
        }
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Mobile Filter Button */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden fixed top-20 left-4 z-50 shadow-lg"
                    >
                        <Filter size={20} />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                    <SheetHeader className="p-6 border-b">
                        <SheetTitle>筛选</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-80px)] p-6">
                        <FilterSidebar />
                    </ScrollArea>
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-80 lg:w-96 flex-shrink-0 border-r bg-card">
                <ScrollArea className="w-full p-6">
                    <FilterSidebar />
                </ScrollArea>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="border-b bg-card">
                    <div className="p-6 pb-0">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold">模型库</h1>
                                <p className="text-muted-foreground mt-1">
                                    {metadataLoading ? (
                                        <Skeleton className="h-4 w-32 inline-block" />
                                    ) : (
                                        <>
                                            共 <span className="font-semibold text-primary">{modelMetadata.totalModels || total}</span> 个模型
                                            {activeFiltersCount > 0 && (
                                                <span className="ml-2">
                                                    · 当前显示 <span className="font-semibold">{total}</span> 个
                                                </span>
                                            )}
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Provider Tabs */}
                    {metadataLoading ? (
                        <div className="border-b px-6 pb-4">
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ) : (
                        <div className="border-b">
                            <div className="px-6 flex items-center">
                                <Tabs
                                    value={input.type || 'all'}
                                    onValueChange={(value) => handleProviderFilter(value === 'all' ? '' : value)}
                                    className="flex-1 overflow-hidden"
                                >
                                    <TabsList className="w-full justify-start h-auto inline-flex bg-transparent border-0 rounded-none p-0">
                                        <TabsTrigger
                                            value="all"
                                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 whitespace-nowrap"
                                        >
                                            <Grid3x3 size={16} className="mr-2" />
                                            全部渠道
                                            <span className="ml-2 text-xs opacity-60">
                                                ({modelMetadata.totalModels || 0})
                                            </span>
                                        </TabsTrigger>
                                        {visibleProviders.map(([key, value]: any) => {
                                            const count = getProviderCount(key);
                                            return (
                                                <TabsTrigger
                                                    key={key}
                                                    value={key}
                                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 whitespace-nowrap"
                                                >
                                                    <span className="mr-2 w-4 h-4 flex items-center justify-center">
                                                        {getIconByName(key, 16)?.icon}
                                                    </span>
                                                    {value}
                                                    <span className="ml-2 text-xs opacity-60">
                                                        ({count})
                                                    </span>
                                                </TabsTrigger>
                                            );
                                        })}
                                    </TabsList>
                                </Tabs>

                                {/* More Menu for Hidden Providers */}
                                {hiddenProviders.length > 0 && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="ml-2 h-10 px-3 border-b-2 border-transparent rounded-none hover:border-muted"
                                            >
                                                <MoreHorizontal size={16} />
                                                <ChevronDown size={14} className="ml-1" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            {hiddenProviders.map(([key, value]: any) => {
                                                const count = getProviderCount(key);
                                                return (
                                                    <DropdownMenuItem
                                                        key={key}
                                                        onClick={() => handleProviderFilter(key)}
                                                        className={cn(
                                                            "flex items-center gap-3 cursor-pointer",
                                                            input.type === key && "bg-accent"
                                                        )}
                                                    >
                                                        <span className="w-4 h-4 flex items-center justify-center">
                                                            {getIconByName(key, 16)?.icon}
                                                        </span>
                                                        <span className="flex-1">{value}</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {count}
                                                        </span>
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Model Grid */}
                <ScrollArea className="flex-1 p-6">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                                <Skeleton className="w-10 h-10 rounded" />
                                                <div className="flex-1 space-y-2">
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <Skeleton className="h-3 w-1/2" />
                                                </div>
                                            </div>
                                            <Skeleton className="h-5 w-12" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-full" />
                                            <Skeleton className="h-3 w-5/6" />
                                        </div>
                                        <div className="flex gap-2">
                                            <Skeleton className="h-5 w-16" />
                                            <Skeleton className="h-5 w-20" />
                                            <Skeleton className="h-5 w-16" />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-1/3" />
                                            <Skeleton className="h-3 w-2/3" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : data.length === 0 ? (
                        <Card className="h-64 flex flex-col items-center justify-center text-center">
                            <Search size={64} className="text-muted-foreground mb-4 opacity-50" />
                            <CardTitle className="mb-2">未找到匹配的模型</CardTitle>
                            <CardDescription className="mb-4">
                                {activeFiltersCount > 0
                                    ? '尝试调整筛选条件或清除筛选器以查看更多结果'
                                    : '当前没有可用的模型'
                                }
                            </CardDescription>
                            {activeFiltersCount > 0 && (
                                <Button variant="outline" onClick={clearAllFilters}>
                                    清除所有筛选器
                                </Button>
                            )}
                        </Card>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {data.map((item) => (
                                    <Card
                                        key={item.id}
                                        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-border"
                                        onClick={() => handleModelClick(item)}
                                    >
                                        <CardHeader className="pb-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                                                        {getIconByName(item.icon, 24)?.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <CardTitle className="truncate text-base">
                                                            {item.model}
                                                        </CardTitle>
                                                        <CardDescription className="text-sm">
                                                            {provider[item.provider] || item.provider}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                <Badge variant={item.enable ? "default" : "destructive"}>
                                                    {item.enable ? '可用' : '不可用'}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                {item.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary" className="gap-1">
                                                    {getModelTypeIcon(item.type)}
                                                    {getModelTypeText(item.type)}
                                                </Badge>
                                                <Badge variant="outline">
                                                    {item.quotaType === 1 ? '按量计费' : '按次计费'}
                                                </Badge>
                                                {item.tags?.slice(0, 2).map((tag) => (
                                                    <Badge key={tag} variant="secondary">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="space-y-2">
                                                {renderPriceInfo(item)}
                                                {item.quotaMax && (
                                                    <div className="text-xs text-muted-foreground">
                                                        最大上下文: {item.quotaMax}
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {total > input.pageSize && (
                                <div className="flex items-center justify-center mt-8 gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setInput({ ...input, page: Math.max(1, input.page - 1) })}
                                        disabled={input.page === 1}
                                    >
                                        上一页
                                    </Button>
                                    <span className="px-4 py-2 text-sm text-muted-foreground">
                                        {input.page} / {Math.ceil(total / input.pageSize)}
                                    </span>
                                    <Button
                                        variant="outline"
                                        onClick={() => setInput({ ...input, page: Math.min(Math.ceil(total / input.pageSize), input.page + 1) })}
                                        disabled={input.page >= Math.ceil(total / input.pageSize)}
                                    >
                                        下一页
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </ScrollArea>
            </div>

            {/* Model Details Modal */}
            <Dialog open={modalVisible} onOpenChange={setModalVisible}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>模型详情</DialogTitle>
                    </DialogHeader>

                    {selectedModel && (
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                                    {getIconByName(selectedModel.icon, 32)?.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-bold">{selectedModel.model}</h3>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => copyModelName(selectedModel.model)}
                                        >
                                            <Copy size={16} />
                                        </Button>
                                    </div>
                                    <p className="text-muted-foreground mb-4">{selectedModel.description}</p>
                                    {selectedModel.tags?.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {selectedModel.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3">基本信息</h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">供应商:</span>
                                            <span>{provider[selectedModel.provider] || selectedModel.provider}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">类型:</span>
                                            <span>{getModelTypeText(selectedModel.type)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">状态:</span>
                                            <Badge variant={selectedModel.enable ? "default" : "destructive"}>
                                                {selectedModel.enable ? '可用' : '不可用'}
                                            </Badge>
                                        </div>
                                        {selectedModel.quotaMax && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">最大上下文:</span>
                                                <span>{selectedModel.quotaMax}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-3">价格信息</h4>
                                    <div className="space-y-2">
                                        {renderPriceInfo(selectedModel)}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex gap-3">
                                <Button
                                    className="flex-1"
                                    onClick={() => copyModelName(selectedModel.model)}
                                >
                                    复制模型名称
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setModalVisible(false)}
                                >
                                    关闭
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );

    // Filter Sidebar Component
    function FilterSidebar() {
        return (
            <div className="space-y-6 overflow-x-hidden">
                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                    <div className="pb-6 border-b">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium flex items-center gap-2">
                                <Filter size={16} />
                                活跃筛选器 ({activeFiltersCount})
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearAllFilters}
                                className="h-7 text-xs"
                            >
                                清除全部
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {input.type && (
                                <Badge variant="secondary" className="gap-1">
                                    {provider[input.type] || input.type}
                                    <X
                                        size={12}
                                        className="cursor-pointer hover:text-destructive"
                                        onClick={() => removeFilter('type')}
                                    />
                                </Badge>
                            )}
                            {input.modelType && (
                                <Badge variant="secondary" className="gap-1">
                                    {getModelTypeText(input.modelType)}
                                    <X
                                        size={12}
                                        className="cursor-pointer hover:text-destructive"
                                        onClick={() => removeFilter('modelType')}
                                    />
                                </Badge>
                            )}
                            {input.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="gap-1">
                                    {tag}
                                    <X
                                        size={12}
                                        className="cursor-pointer hover:text-destructive"
                                        onClick={() => removeFilter('tag', tag)}
                                    />
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search */}
                <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Search size={16} />
                        模型搜索
                    </h3>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="搜索模型名称..."
                            value={input.model}
                            onChange={(e) => setInput({ ...input, model: e.target.value })}
                            onKeyPress={(e) => e.key === 'Enter' && loadData()}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Model Types */}
                {metadataLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20 mb-3" />
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-14 w-full" />
                        ))}
                    </div>
                ) : (
                    <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Layers size={16} />
                            模型类型
                        </h3>
                        <div className="space-y-2">
                            {Object.values(MODEL_TYPES).map((type) => {
                                const count = getModelTypeCount(type);
                                return (
                                    <Button
                                        key={type}
                                        variant={selectedModelType?.toLowerCase() === type?.toLowerCase() ? "secondary" : "ghost"}
                                        className="w-full justify-start h-auto p-3"
                                        onClick={() => handleModelTypeSelect(type)}
                                    >
                                        <div className="flex items-center gap-3 w-full min-w-0">
                                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                                {getModelTypeIcon(type)}
                                            </div>
                                            <div className="flex-1 text-left min-w-0">
                                                <div className="font-medium truncate">{getModelTypeText(type)}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {count} 个模型
                                                </div>
                                            </div>
                                        </div>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                )}


                {/* Tags */}
                {metadataLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20 mb-3" />
                        <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <Skeleton key={i} className="h-7 w-16" />
                            ))}
                        </div>
                    </div>
                ) : allTags.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <TagIcon size={16} />
                            标签
                        </h3>
                        <div className="relative mb-3">
                            <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="搜索标签..."
                                value={tagSearch}
                                onChange={(e) => setTagSearch(e.target.value)}
                                className="pl-9 h-8 text-sm"
                            />
                            {tagSearch && (
                                <X
                                    size={14}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-foreground"
                                    onClick={() => setTagSearch('')}
                                />
                            )}
                        </div>
                        <ScrollArea className="h-48">
                            <div className="flex flex-wrap gap-2 pr-4 overflow-x-hidden">
                                {filteredTags.length > 0 ? (
                                    filteredTags.map((tag) => {
                                        const tagName = getTagName(tag);
                                        const tagCount = getTagCount(tag);
                                        return (
                                            <TooltipProvider key={tagName}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant={input.tags.includes(tagName) ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => handleTagsChange(tagName)}
                                                            className="h-7 text-xs max-w-full"
                                                        >
                                                            <span className="truncate">{tagName}</span>
                                                            {tagCount > 0 && (
                                                                <span className="ml-1 text-xs opacity-60 flex-shrink-0">
                                                                    ({tagCount})
                                                                </span>
                                                            )}
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{tagCount > 0 ? `${tagCount} 个模型` : tagName}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        );
                                    })
                                ) : (
                                    <div className="text-sm text-muted-foreground py-4 text-center w-full">
                                        未找到匹配的标签
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                )}

                {/* Currency and Unit Toggle */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <DollarSign size={16} />
                            价格显示
                        </h3>
                        <div className="space-y-3">
                            {/* Currency Toggle */}
                            <div>
                                <label className="text-xs text-muted-foreground mb-2 block">
                                    货币
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant={currency === 'USD' ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setCurrency('USD')}
                                                    className="w-full"
                                                >
                                                    <span className="mr-1">$</span> USD
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>美元 (USD)</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant={currency === 'CNY' ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setCurrency('CNY')}
                                                    className="w-full"
                                                >
                                                    <span className="mr-1">¥</span> CNY
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>人民币 (CNY) - 汇率: $1 = ¥{exchangeRate}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                            {/* Token Unit Toggle */}
                            <div>
                                <label className="text-xs text-muted-foreground mb-2 block">
                                    Token 单位
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant={!isK ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setIsK(false)}
                                        className="w-full"
                                    >
                                        1M tokens
                                    </Button>
                                    <Button
                                        variant={isK ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setIsK(true)}
                                        className="w-full"
                                    >
                                        1K tokens
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clear Filters */}
                {(input.type || selectedModelType || input.tags.length > 0) && (
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            setInput({ ...input, type: '', tags: [], modelType: '' });
                            setSelectedModelType('');
                        }}
                    >
                        清除所有筛选
                    </Button>
                )}
            </div>
        );
    }
}