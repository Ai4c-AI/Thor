import React, { useEffect } from 'react';
// Using shadcn/ui components only - no Antd imports needed
import { 
  Settings, 
  Zap, 
  Lightbulb, 
  Bot,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Slider } from '../../../components/ui/slider';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/ui/tooltip';
import { Separator } from '../../../components/ui/separator';
import { cn } from '../../../lib/utils';
import { useTranslation } from 'react-i18next';
import { isMobileDevice } from '../../../utils/responsive';
import { getTokens } from '../../../services/TokenService';
import { getModels } from '../../../services/ModelService';
import { isResponsesModel } from '../../../services/ResponsesService';
import OpenAI from 'openai';
import type { PlaygroundState } from '../hooks/usePlayground';

// Removed Antd destructuring - using shadcn/ui components directly

interface ModelConfigPanelProps {
  modelInfo: any;
  playgroundState: PlaygroundState;
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeWorkspace: 'chat' | 'image';
}

export default function ModelConfigPanel({
  modelInfo,
  playgroundState,
  collapsed,
  onToggleCollapse,
  activeWorkspace
}: ModelConfigPanelProps) {
  const { t } = useTranslation();
  const isMobile = isMobileDevice();

  const {
    selectedToken,
    selectedModel,
    modelOptions,
    tokenOptions,
    systemPrompt,
    temperature,
    maxTokens,
    loading,
    setSelectedToken,
    setSelectedModel,
    setModelOptions,
    setTokenOptions,
    setSystemPrompt,
    setTemperature,
    setMaxTokens,
    setLoading
  } = playgroundState;

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    if (selectedToken) {
      fetchModels(selectedToken);
    }
  }, [selectedToken, modelInfo, activeWorkspace]);

  const fetchTokens = async () => {
    try {
      setLoading(true);
      const res = await getTokens(1, 100);
      if (res?.data?.items) {
        setTokenOptions(res.data.items);
        if (res.data.items.length > 0 && !selectedToken) {
          const firstToken = res.data.items[0];
          setSelectedToken(firstToken.key);
        }
      }
    } catch (error) {
      console.error('Failed to fetch tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchModels = async (tokenKey: string) => {
    try {
      setLoading(true);

      // 首先尝试使用OpenAI SDK获取模型列表
      try {
        const openai = new OpenAI({
          apiKey: tokenKey,
          baseURL: window.location.origin + '/v1',
          dangerouslyAllowBrowser: true
        });

        const response = await openai.models.list();
        
        if (response?.data) {
          const availableModels = response.data.map(model => model.id);
          let filteredModels: string[] = [];

          if (modelInfo?.modelTypes) {
            const targetType = activeWorkspace; // 'chat' or 'image'
            const typeInfo = modelInfo.modelTypes.find((type: any) => type.type === targetType);
            
            if (typeInfo?.models) {
              filteredModels = typeInfo.models.filter((model: string) => 
                availableModels.includes(model)
              );
            }
          } else {
            // 回退到基本过滤
            if (activeWorkspace === 'chat') {
              filteredModels = availableModels.filter(model => 
                model.includes('gpt') || model.includes('chat') || model.includes('claude')
              );
            } else {
              filteredModels = availableModels.filter(model => 
                model.includes('dall') || model.includes('image')
              );
            }
          }

          setModelOptions(filteredModels);
          if (filteredModels.length > 0 && !selectedModel) {
            setSelectedModel(filteredModels[0]);
          }
        }
      } catch (apiError) {
        console.error('OpenAI API error:', apiError);
        
        // 回退到通用模型服务
        const res = await getModels();
        if (res?.data) {
          let filteredModels: string[] = [];
          
          if (modelInfo?.modelTypes) {
            const targetType = activeWorkspace;
            const typeInfo = modelInfo.modelTypes.find((type: any) => type.type === targetType);
            if (typeInfo?.models) {
              filteredModels = res.data.filter((model: string) => 
                typeInfo.models.includes(model)
              );
            }
          } else {
            if (activeWorkspace === 'chat') {
              filteredModels = res.data.filter((model: string) => 
                model.includes('gpt') || model.includes('chat') || model.includes('claude')
              );
            } else {
              filteredModels = res.data.filter((model: string) => 
                model.includes('dall') || model.includes('image')
              );
            }
          }

          setModelOptions(filteredModels);
          if (filteredModels.length > 0 && !selectedModel) {
            setSelectedModel(filteredModels[0]);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch models:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTokenChange = (value: string) => {
    setSelectedToken(value);
    setSelectedModel(''); // 重置模型选择
  };

  const getModelStatus = () => {
    if (!selectedModel || !selectedToken) {
      return { status: 'error', text: t('playground.status.notConfigured') };
    }
    if (loading) {
      return { status: 'processing', text: t('playground.status.loading') };
    }
    return { status: 'success', text: t('playground.status.ready') };
  };

  const modelStatus = getModelStatus();

  if (collapsed) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-2 bg-background">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="mb-3"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t('playground.expandConfig')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col items-center space-y-3">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <div className={cn(
            "w-2 h-2 rounded-full",
            modelStatus.status === 'success' && "bg-green-500",
            modelStatus.status === 'error' && "bg-red-500",
            modelStatus.status === 'processing' && "bg-blue-500 animate-pulse"
          )} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* 面板标题 */}
      <div className="p-3 sm:p-4 border-b flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          <h5 className="text-base sm:text-lg font-semibold m-0 truncate">
            {t('playground.modelConfig')}
          </h5>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="flex-shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* 配置内容 */}
      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        <div className="space-y-3 sm:space-y-4">
          {/* 状态指示器 */}
          <Card className={cn(
            "p-2 sm:p-3",
            modelStatus.status === 'success' && "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
            modelStatus.status === 'error' && "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800",
            modelStatus.status === 'processing' && "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800"
          )}>
            <CardContent className="p-0">
              <div className="flex items-center gap-2">
                {modelStatus.status === 'success' && (
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                )}
                {modelStatus.status === 'error' && (
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                )}
                {modelStatus.status === 'processing' && (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                )}
                <span className="text-xs truncate">
                  {modelStatus.text}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Token 选择 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('playground.selectToken')}
            </label>
            <Select value={selectedToken} onValueChange={handleTokenChange} disabled={loading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('playground.selectToken')} />
              </SelectTrigger>
              <SelectContent>
                {tokenOptions.map((token: any) => (
                  <SelectItem key={token.key} value={token.key}>
                    <span className="truncate max-w-[120px] sm:max-w-[150px]">
                      {token.name || token.key}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 模型选择 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">
                {t('playground.selectModel')}
              </label>
              {modelOptions.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {modelOptions.length}
                </Badge>
              )}
            </div>
            <Select 
              value={selectedModel} 
              onValueChange={setSelectedModel} 
              disabled={!selectedToken || loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('playground.selectModel')} />
              </SelectTrigger>
              <SelectContent>
                {modelOptions.map(model => (
                  <SelectItem key={model} value={model}>
                    <div className="flex flex-col min-w-0">
                      <span className="truncate max-w-[140px] sm:max-w-[180px]">
                        {model}
                      </span>
                      {activeWorkspace === 'chat' && (
                        <span className="text-xs text-muted-foreground truncate">
                          {isResponsesModel(model) ? 'Responses API' : 'Chat API'}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 聊天专用参数 */}
          {activeWorkspace === 'chat' && (
            <>
              <Separator className="my-4" />
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">{t('playground.chatParams')}</span>
              </div>

              {/* 温度设置 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('playground.temperature')} ({temperature})
                </label>
                <Slider
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                  min={0}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t('playground.precise')}</span>
                  <span>{t('playground.balanced')}</span>
                  <span>{t('playground.creative')}</span>
                </div>
              </div>

              {/* 最大Token数 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('playground.maxTokens')}
                </label>
                <Input
                  type="number"
                  min={1}
                  max={8192}
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value) || 2048)}
                  className="w-full"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div className="p-3 sm:p-4 border-t flex-shrink-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs sm:text-sm"
                onClick={() => {
                  setTemperature(0.7);
                  setMaxTokens(2048);
                  setSystemPrompt('You are a helpful AI assistant.');
                }}
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="truncate">{t('playground.resetConfig')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('playground.resetConfig')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}