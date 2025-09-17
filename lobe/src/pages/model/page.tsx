import { useEffect, useMemo, useState } from "react";
import { getCompletionRatio, renderQuota } from "../../utils/render";
import { getIconByName } from "../../utils/iconutils";
import { getModelLibrary, getModelLibraryMetadata, getModelInfo, getProvider } from "../../services/ModelService";
import { Copy, Info, Search, Tag as TagIcon, MessageSquare, Image, Mic, Headphones, FileText, Layers, Filter, X, ChevronDown } from "lucide-react";
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
    const [isK, setIsK] = useState<boolean>(false);
    const [provider, setProvider] = useState<any>({});
    const [total, setTotal] = useState<number>(0);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [modelMetadata, setModelMetadata] = useState<any>({
        tags: [],
        providers: {},
        icons: {},
        modelTypes: []
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

    useEffect(() => {
        loadModelInfo();
        loadMetadata();
    }, []);

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
                }
            })
            .catch((error) => {
                console.error('Failed to load metadata:', error);
                loadProviderFallback();
                loadTagsFallback();
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
            type: input.type === key ? '' : key,
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

    const renderPriceInfo = (item: ModelItem) => {
        if (item.quotaType === 1) {
            const tokenUnit = isK ? '1K' : '1M';
            const multiplier = isK ? 1000 : 1000000;

            return (
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                        输入: {renderQuota(item.promptRate * multiplier, 6)}/{tokenUnit}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        输出: {renderQuota((item.completionRate ?
                            item.promptRate * multiplier * item.completionRate :
                            getCompletionRatio(item.model) * multiplier), 6)}/{tokenUnit}
                    </Badge>
                </div>
            );
        } else {
            return (
                <Badge variant="outline" className="text-xs">
                    每次使用: {renderQuota(item.promptRate, 6)}
                </Badge>
            );
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
            <div className="hidden md:flex w-80 border-r bg-card">
                <ScrollArea className="w-full p-6">
                    <FilterSidebar />
                </ScrollArea>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="border-b bg-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">模型库</h1>
                            <p className="text-muted-foreground mt-1">
                                共 {total} 个模型可用
                            </p>
                        </div>
                    </div>
                </div>

                {/* Model Grid */}
                <ScrollArea className="flex-1 p-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-muted-foreground">加载中...</div>
                        </div>
                    ) : data.length === 0 ? (
                        <Card className="h-64 flex flex-col items-center justify-center text-center">
                            <FileText size={48} className="text-muted-foreground mb-4" />
                            <CardTitle className="mb-2">暂无模型</CardTitle>
                            <CardDescription>尝试调整筛选条件</CardDescription>
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
            <div className="space-y-6">
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

                {/* Providers */}
                {Object.keys(provider).length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Image size={16} />
                            供应商
                        </h3>
                        <div className="space-y-2">
                            {Object.entries(provider).map(([key, value]: any) => (
                                <Button
                                    key={key}
                                    variant={input.type === key ? "secondary" : "ghost"}
                                    className="w-full justify-start h-auto p-3"
                                    onClick={() => handleProviderFilter(key)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                                            {getIconByName(key, 20)?.icon}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="font-medium">{value}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {data.filter(item => item.provider === key).length} 个模型
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Model Types */}
                <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Layers size={16} />
                        模型类型
                    </h3>
                    <div className="space-y-2">
                        {Object.values(MODEL_TYPES).map((type) => (
                            <Button
                                key={type}
                                variant={selectedModelType?.toLowerCase() === type?.toLowerCase() ? "secondary" : "ghost"}
                                className="w-full justify-start h-auto p-3"
                                onClick={() => handleModelTypeSelect(type)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                        {getModelTypeIcon(type)}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium">{getModelTypeText(type)}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {data.filter(item => item.type?.toLowerCase() === type.toLowerCase()).length} 个模型
                                        </div>
                                    </div>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                {allTags.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <TagIcon size={16} />
                            标签
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {allTags.slice(0, 10).map((tag) => (
                                <Button
                                    key={tag}
                                    variant={input.tags.includes(tag) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleTagsChange(tag)}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price Unit Toggle */}
                <div>
                    <h3 className="text-sm font-medium mb-3">价格单位</h3>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={!isK ? "default" : "outline"}
                            size="sm"
                            onClick={() => setIsK(false)}
                        >
                            M
                        </Button>
                        <Button
                            variant={isK ? "default" : "outline"}
                            size="sm"
                            onClick={() => setIsK(true)}
                        >
                            K
                        </Button>
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