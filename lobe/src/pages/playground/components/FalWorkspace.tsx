import React, { useState, useCallback, useRef } from 'react';
import {
  ImageIcon,
  Upload as UploadIcon,
  Trash2,
  Download,
  Eye,
  X,
  RotateCcw,
  UploadCloud,
  Wand2,
  Palette,
  Sparkles,
  Edit3,
  RefreshCw,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { isMobileDevice } from '../../../utils/responsive';
import type { PlaygroundState } from '../hooks/usePlayground';
import { falAIService, type FalGenerationRequest, type FalEditRequest } from '../../../services/FalAIService';

// Fal AI 任务接口
interface FalTask {
  id: string;
  type: 'generation' | 'edit';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  prompt: string;
  numImages: number;
  sourceImage?: string;
  resultImages: string[];
  requestId?: string;
  createdAt: number;
  completedAt?: number;
  error?: string;
  progress?: number;
}

// 从服务中导入类型，不需要重复定义

interface FalWorkspaceProps {
  modelInfo: any;
  playgroundState: PlaygroundState;
}

export default function FalWorkspace({ modelInfo, playgroundState }: FalWorkspaceProps) {
  const { t } = useTranslation();
  const isMobile = isMobileDevice();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maskInputRef = useRef<HTMLInputElement>(null);

  const {
    selectedToken,
    selectedModel,
    loading,
    setLoading
  } = playgroundState;

  // 界面状态
  const [activeTab, setActiveTab] = useState<'generation' | 'edit'>('generation');
  const [tasks, setTasks] = useState<FalTask[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState(false);

  // 生成参数
  const [prompt, setPrompt] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [numInferenceSteps, setNumInferenceSteps] = useState(50);
  const [seed, setSeed] = useState<number | undefined>();

  // 编辑参数
  const [sourceImage, setSourceImage] = useState<string>('');
  const [maskImage, setMaskImage] = useState<string>('');
  const [editStrength, setEditStrength] = useState(0.8);

  // 使用 FalAI 服务进行 API 调用，无需手动实现

  // 处理文件上传
  const handleFileUpload = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'source' | 'mask'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error(t('fal.errors.invalidImageFile'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (type === 'source') {
        setSourceImage(dataUrl);
      } else {
        setMaskImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  // 生成图片
  const handleGeneration = async () => {
    if (!prompt.trim()) {
      toast.warning(t('fal.errors.promptRequired'));
      return;
    }

    if (!selectedToken) {
      toast.warning(t('fal.errors.tokenRequired'));
      return;
    }

    const taskId = `gen_${Date.now()}`;
    const newTask: FalTask = {
      id: taskId,
      type: 'generation',
      status: 'pending',
      prompt,
      numImages,
      resultImages: [],
      createdAt: Date.now(),
      progress: 0
    };

    setTasks(prev => [newTask, ...prev]);
    setLoading(true);

    try {
      // 准备API参数
      const apiData: FalGenerationRequest = {
        prompt,
        num_images: numImages,
        guidance_scale: guidanceScale,
        num_inference_steps: numInferenceSteps,
        ...(seed && { seed })
      };

      // 调用生成API
      const result = await falAIService.generateImage(apiData);

      // 处理返回结果 - 后端直接返回最终结果
      let resultImages: string[] = [];
      if (result.images && Array.isArray(result.images)) {
        // 处理后端返回的图片对象数组
        resultImages = result.images.map((img: any) => img.url || img);
      } else if (result.images && typeof result.images === 'string') {
        resultImages = [result.images];
      }

      // 更新任务状态为完成
      setTasks(prev => prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: 'completed',
              progress: 100,
              resultImages,
              completedAt: Date.now()
            }
          : task
      ));

      toast.success(t('fal.success.generationComplete'));

    } catch (error: any) {
      console.error('Generation failed:', error);
      setTasks(prev => prev.map(task =>
        task.id === taskId
          ? { ...task, status: 'failed', error: error.message }
          : task
      ));
      toast.error(t('fal.errors.generationFailed', { error: error.message }));
    } finally {
      setLoading(false);
    }
  };

  // 编辑图片
  const handleEdit = async () => {
    if (!prompt.trim()) {
      toast.warning(t('fal.errors.promptRequired'));
      return;
    }

    if (!sourceImage) {
      toast.warning(t('fal.errors.sourceImageRequired'));
      return;
    }

    if (!selectedToken) {
      toast.warning(t('fal.errors.tokenRequired'));
      return;
    }

    const taskId = `edit_${Date.now()}`;
    const newTask: FalTask = {
      id: taskId,
      type: 'edit',
      status: 'pending',
      prompt,
      numImages,
      sourceImage,
      resultImages: [],
      createdAt: Date.now(),
      progress: 0
    };

    setTasks(prev => [newTask, ...prev]);
    setLoading(true);

    try {
      // 准备API参数
      const apiData: FalEditRequest = {
        prompt,
        num_images: numImages,
        image_url: sourceImage,
        guidance_scale: guidanceScale,
        num_inference_steps: numInferenceSteps,
        strength: editStrength,
        ...(maskImage && { mask_url: maskImage }),
        ...(seed && { seed })
      };

      // 调用编辑API
      const result = await falAIService.editImage(apiData);

      // 处理返回结果 - 后端直接返回最终结果
      let resultImages: string[] = [];
      if (result.images && Array.isArray(result.images)) {
        // 处理后端返回的图片对象数组
        resultImages = result.images.map((img: any) => img.url || img);
      } else if (result.images && typeof result.images === 'string') {
        resultImages = [result.images];
      }

      // 更新任务状态为完成
      setTasks(prev => prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: 'completed',
              progress: 100,
              resultImages,
              completedAt: Date.now()
            }
          : task
      ));

      toast.success(t('fal.success.editComplete'));

    } catch (error: any) {
      console.error('Edit failed:', error);
      setTasks(prev => prev.map(task =>
        task.id === taskId
          ? { ...task, status: 'failed', error: error.message }
          : task
      ));
      toast.error(t('fal.errors.editFailed', { error: error.message }));
    } finally {
      setLoading(false);
    }
  };

  // 轮询任务结果
  const pollTaskResult = async (taskId: string, requestId: string) => {
    const maxAttempts = 60; // 最多轮询60次 (5分钟)
    let attempts = 0;

    const poll = async () => {
      if (attempts >= maxAttempts) {
        setTasks(prev => prev.map(task =>
          task.id === taskId
            ? { ...task, status: 'failed', error: t('fal.errors.taskTimeout') }
            : task
        ));
        return;
      }

      try {
        const result = await falAIService.getTaskResult('nano-banana', requestId);

        if (result.status === 'COMPLETED') {
          setTasks(prev => prev.map(task =>
            task.id === taskId
              ? {
                  ...task,
                  status: 'completed',
                  progress: 100,
                  resultImages: result.images || [],
                  completedAt: Date.now()
                }
              : task
          ));
          toast.success(t('fal.success.taskComplete'));
        } else if (result.status === 'FAILED') {
          setTasks(prev => prev.map(task =>
            task.id === taskId
              ? {
                  ...task,
                  status: 'failed',
                  error: result.error || t('fal.errors.taskFailed')
                }
              : task
          ));
          toast.error(t('fal.errors.taskFailed'));
        } else {
          // 更新进度
          const progress = Math.min(10 + (attempts * 1.5), 90);
          setTasks(prev => prev.map(task =>
            task.id === taskId
              ? { ...task, progress }
              : task
          ));

          // 继续轮询
          attempts++;
          setTimeout(poll, 5000); // 5秒后再次查询
        }
      } catch (error) {
        console.error('Poll error:', error);
        attempts++;
        setTimeout(poll, 5000);
      }
    };

    // 开始轮询
    setTimeout(poll, 2000); // 2秒后开始第一次查询
  };

  // 删除任务
  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast.success(t('fal.taskDeleted'));
  };

  // 下载图片
  const handleDownloadImage = async (imageUrl: string, filename: string) => {
    try {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(t('fal.downloadStarted'));
    } catch (error) {
      toast.error(t('fal.errors.downloadFailed'));
    }
  };

  // 预览图片
  const handlePreviewImage = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setPreviewOpen(true);
  };

  // 清空所有任务
  const handleClearAllTasks = () => {
    setTasks([]);
    toast.success(t('fal.allTasksCleared'));
  };

  // 渲染生成面板
  const renderGenerationPanel = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="gen-prompt" className="text-sm font-medium">
          提示词 *
        </Label>
        <Textarea
          id="gen-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="描述你想要生成的图片..."
          className="mt-1 min-h-[100px]"
          disabled={loading}
        />
        <div className="text-xs text-muted-foreground mt-1">
          {prompt.length}/1000 字符
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">生成数量</Label>
          <Select value={numImages.toString()} onValueChange={(v) => setNumImages(parseInt(v))}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1张</SelectItem>
              <SelectItem value="2">2张</SelectItem>
              <SelectItem value="4">4张</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium">引导强度</Label>
          <Input
            type="number"
            value={guidanceScale}
            onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
            min="1"
            max="20"
            step="0.5"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">推理步数</Label>
          <Input
            type="number"
            value={numInferenceSteps}
            onChange={(e) => setNumInferenceSteps(parseInt(e.target.value))}
            min="10"
            max="100"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">随机种子 (可选)</Label>
          <Input
            type="number"
            value={seed || ''}
            onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="留空为随机"
            className="mt-1"
          />
        </div>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={handleGeneration}
        disabled={loading || !prompt.trim() || !selectedToken}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            生成中...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            生成图片
          </div>
        )}
      </Button>
    </div>
  );

  // 渲染编辑面板
  const renderEditPanel = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-2 block">
          源图片 *
        </Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
          {sourceImage ? (
            <div className="relative">
              <img
                src={sourceImage}
                alt="Source"
                className="max-w-full max-h-32 mx-auto rounded"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1"
                onClick={() => setSourceImage('')}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <div>
              <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">点击上传图片</p>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                选择文件
              </Button>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'source')}
        />
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">
          蒙版图片 (可选)
        </Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
          {maskImage ? (
            <div className="relative">
              <img
                src={maskImage}
                alt="Mask"
                className="max-w-full max-h-32 mx-auto rounded"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1"
                onClick={() => setMaskImage('')}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <div>
              <Palette className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-2">黑色区域将被编辑</p>
              <Button variant="outline" size="sm" onClick={() => maskInputRef.current?.click()}>
                上传蒙版
              </Button>
            </div>
          )}
        </div>
        <input
          ref={maskInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'mask')}
        />
      </div>

      <div>
        <Label htmlFor="edit-prompt" className="text-sm font-medium">
          编辑提示词 *
        </Label>
        <Textarea
          id="edit-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="描述你想要的编辑效果..."
          className="mt-1 min-h-[80px]"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">{t('fal.editStrength')}</Label>
          <Input
            type="number"
            value={editStrength}
            onChange={(e) => setEditStrength(parseFloat(e.target.value))}
            min="0.1"
            max="1"
            step="0.1"
            className="mt-1"
          />
          <div className="text-xs text-muted-foreground mt-1">
            {t('fal.editStrengthHint')}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">{t('fal.numImages')}</Label>
          <Select value={numImages.toString()} onValueChange={(v) => setNumImages(parseInt(v))}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">{t('fal.imageCount.one')}</SelectItem>
              <SelectItem value="2">{t('fal.imageCount.two')}</SelectItem>
              <SelectItem value="4">{t('fal.imageCount.four')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={handleEdit}
        disabled={loading || !prompt.trim() || !sourceImage || !selectedToken}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t('fal.editing')}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            {t('fal.editImage')}
          </div>
        )}
      </Button>
    </div>
  );

  // 渲染任务卡片
  const renderTaskCard = (task: FalTask) => {
    const isProcessing = task.status === 'processing';
    const isCompleted = task.status === 'completed';
    const hasFailed = task.status === 'failed';

    return (
      <Card key={task.id} className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-medium truncate">
                {task.type === 'generation' ? t('fal.imageGeneration') : t('fal.imageEdit')}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {task.prompt}
              </p>
            </div>

            <div className="flex items-center gap-2 ml-2">
              <Badge variant={
                isCompleted ? 'default' :
                isProcessing ? 'secondary' :
                hasFailed ? 'destructive' : 'outline'
              }>
                {isCompleted && <CheckCircle className="w-3 h-3 mr-1" />}
                {isProcessing && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                {hasFailed && <AlertCircle className="w-3 h-3 mr-1" />}
                {task.status === 'pending' && t('fal.pending')}
                {task.status === 'processing' && t('fal.processing')}
                {task.status === 'completed' && t('fal.completed')}
                {task.status === 'failed' && t('fal.failed')}
              </Badge>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteTask(task.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {isProcessing && (
            <div className="mt-2">
              <Progress value={task.progress || 0} className="h-1" />
              <div className="text-xs text-muted-foreground mt-1">
                {t('fal.progress')}: {Math.round(task.progress || 0)}%
              </div>
            </div>
          )}

          {hasFailed && task.error && (
            <div className="mt-2 p-2 bg-destructive/10 rounded text-xs text-destructive">
              {task.error}
            </div>
          )}
        </CardHeader>

        {task.resultImages.length > 0 && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2">
              {task.resultImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`Result ${index + 1}`}
                    className="w-full h-24 object-cover rounded cursor-pointer"
                    onClick={() => handlePreviewImage(imageUrl)}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handlePreviewImage(imageUrl)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('fal.preview')}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleDownloadImage(
                              imageUrl,
                              `fal-${task.type}-${task.id}-${index + 1}.png`
                            )}
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('fal.download')}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(task.createdAt).toLocaleTimeString()}
              </span>
              {isCompleted && task.completedAt && (
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {t('fal.completedIn')} {Math.round((task.completedAt - task.createdAt) / 1000)}{t('fal.seconds')}
                </span>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="h-full flex bg-background">
      {/* 左侧控制面板 */}
      <div className={cn(
        "border-r border-border bg-card",
        isMobile ? "w-full" : "w-96 flex-shrink-0"
      )}>
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {t('fal.title')}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t('fal.subtitle')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1">
          <TabsList className="grid w-full grid-cols-2 m-4">
            <TabsTrigger value="generation" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              {t('fal.generation')}
            </TabsTrigger>
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              {t('fal.edit')}
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="px-4 pb-4">
              <TabsContent value="generation" className="mt-0">
                {renderGenerationPanel()}
              </TabsContent>

              <TabsContent value="edit" className="mt-0">
                {renderEditPanel()}
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </div>

      {/* 右侧任务列表 */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{t('fal.taskHistory')}</h3>
              <Badge variant="secondary">{tasks.length}</Badge>
            </div>

            {tasks.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-3 h-3 mr-1" />
                    {t('fal.clear')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('fal.clearAll')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('fal.clearConfirm')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearAllTasks}>
                      {t('common.confirm')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <ImageIcon className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  {t('fal.noTasks')}
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  {t('fal.noTasksHint')}
                </p>
              </div>
            ) : (
              tasks.map(task => renderTaskCard(task))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* 图片预览 */}
      {previewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <div className="relative max-w-full max-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setPreviewOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}