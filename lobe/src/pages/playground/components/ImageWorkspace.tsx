import React, { useState, useCallback } from 'react';
import {
  ImageIcon,
  Upload as UploadIcon,
  Trash2,
  Download,
  Eye,
  X,
  RotateCcw,
  UploadCloud
} from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../../components/ui/alert-dialog';
import { cn } from '../../../lib/utils';
import { useTranslation } from 'react-i18next';
import { isMobileDevice } from '../../../utils/responsive';
import { processImage } from '../../../services/ImageService';
import type { PlaygroundState } from '../hooks/usePlayground';

// File types for upload handling
interface UploadFile {
  uid: string;
  name: string;
  status?: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  thumbUrl?: string;
  originFileObj?: File;
}
// Removed Antd specific destructuring

// Interface for generated image
interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  model: string;
  timestamp: number;
  size: string;
  status: 'generating' | 'completed' | 'error';
  progress?: number;
  error?: string;
}

// Interface for source image
interface SourceImage {
  uid: string;
  file: File;
  dataUrl: string;
  name: string;
}

interface ImageWorkspaceProps {
  modelInfo: any;
  playgroundState: PlaygroundState;
}

export default function ImageWorkspace({ modelInfo, playgroundState }: ImageWorkspaceProps) {
  const { t } = useTranslation();
  const isMobile = isMobileDevice();

  const {
    selectedToken,
    selectedModel,
    loading,
    setLoading
  } = playgroundState;

  const [prompt, setPrompt] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [imageSize, setImageSize] = useState<string>('1024x1024');
  const [sourceImages, setSourceImages] = useState<SourceImage[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFileList: UploadFile[] = Array.from(files).map((file, index) => ({
      uid: `${Date.now()}-${index}`,
      name: file.name,
      status: 'done' as const,
      originFileObj: file
    }));

    setFileList(prev => [...prev, ...newFileList]);

    const processFiles = async () => {
      const newSourceImages: SourceImage[] = [];

      for (const fileItem of newFileList) {
        if (fileItem.originFileObj) {
          try {
            const dataUrl = await readFileAsDataURL(fileItem.originFileObj);
            newSourceImages.push({
              uid: fileItem.uid,
              file: fileItem.originFileObj,
              dataUrl,
              name: fileItem.name || 'Uploaded Image'
            });
          } catch (error) {
            console.error('Failed to read file:', error);
            toast.error(`Failed to process ${fileItem.name}`);
          }
        }
      }

      setSourceImages(prev => [...prev, ...newSourceImages]);
    };

    processFiles();
  }, []);

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleClearSourceImages = () => {
    setFileList([]);
    setSourceImages([]);
    toast.success(t('imageFeature.clearedSourceImages'));
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.warning(t('imageFeature.promptRequired'));
      return;
    }

    if (!selectedToken || !selectedModel) {
      toast.warning(t('imageFeature.modelRequired'));
      return;
    }

    setLoading(true);

    try {
      const hasSourceImages = sourceImages.length > 0;
      const baseParams = {
        prompt,
        model: selectedModel,
        size: imageSize,
        token: selectedToken,
      };

      if (hasSourceImages) {
        // 批量处理源图片
        const newImages: GeneratedImage[] = [];

        for (let i = 0; i < sourceImages.length; i++) {
          const sourceImage = sourceImages[i];
          const imageId = `${Date.now()}-${i}`;

          // Add generating image
          const generatingImage: GeneratedImage = {
            id: imageId,
            url: '',
            prompt,
            model: selectedModel,
            timestamp: Date.now(),
            size: imageSize,
            status: 'generating',
            progress: 0
          };

          newImages.push(generatingImage);
          setGeneratedImages(prev => [generatingImage, ...prev]);

          try {
            // 模拟进度更新
            const progressInterval = setInterval(() => {
              setGeneratedImages(prev =>
                prev.map(img =>
                  img.id === imageId && img.status === 'generating'
                    ? { ...img, progress: Math.min((img.progress || 0) + Math.random() * 20, 90) }
                    : img
                )
              );
            }, 500);

            const params = {
              ...baseParams,
              image: sourceImage.dataUrl,
            };

            const result = await processImage(params);
            clearInterval(progressInterval);

            if (result?.data) {
              const imageUrl = result.data.b64_json?.startsWith("http")
                ? result.data.b64_json
                : `data:image/png;base64,${result.data.b64_json}`;

              // Update to completed status
              setGeneratedImages(prev =>
                prev.map(img =>
                  img.id === imageId
                    ? {
                      ...img,
                      url: imageUrl,
                      status: 'completed' as const,
                      progress: 100
                    }
                    : img
                )
              );
            }
          } catch (error: any) {
            console.error('Failed to process image:', error);
            setGeneratedImages(prev =>
              prev.map(img =>
                img.id === imageId
                  ? {
                    ...img,
                    status: 'error' as const,
                    error: error.message
                  }
                  : img
              )
            );
          }
        }

        toast.success(t('imageFeature.batchGenerationStarted'));
      } else {
        // 文生图
        const imageId = Date.now().toString();
        const generatingImage: GeneratedImage = {
          id: imageId,
          url: '',
          prompt,
          model: selectedModel,
          timestamp: Date.now(),
          size: imageSize,
          status: 'generating',
          progress: 0
        };

        setGeneratedImages(prev => [generatingImage, ...prev]);

        try {
          const progressInterval = setInterval(() => {
            setGeneratedImages(prev =>
              prev.map(img =>
                img.id === imageId && img.status === 'generating'
                  ? { ...img, progress: Math.min((img.progress || 0) + Math.random() * 15, 90) }
                  : img
              )
            );
          }, 500);

          const result = await processImage(baseParams);
          clearInterval(progressInterval);

          if (result?.data) {
            const imageUrl = result.data.b64_json?.startsWith("http")
              ? result.data.b64_json
              : `data:image/png;base64,${result.data.b64_json}`;

            setGeneratedImages(prev =>
              prev.map(img =>
                img.id === imageId
                  ? {
                    ...img,
                    url: imageUrl,
                    status: 'completed' as const,
                    progress: 100
                  }
                  : img
              )
            );

            toast.success(t('imageFeature.generateSuccess'));
          }
        } catch (error: any) {
          console.error('Failed to generate image:', error);
          setGeneratedImages(prev =>
            prev.map(img =>
              img.id === imageId
                ? {
                  ...img,
                  status: 'error' as const,
                  error: error.message
                }
                : img
            )
          );
          toast.error(`${t('imageFeature.generateFailed')}: ${error.message}`);
        }
      }
    } catch (error: any) {
      console.error('Failed to generate image:', error);
      toast.error(`${t('imageFeature.generateFailed')}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = (imageId: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== imageId));
    toast.success(t('imageFeature.imageDeleted'));
  };

  const handleDownloadImage = async (image: GeneratedImage) => {
    try {
      const link = document.createElement('a');
      link.href = image.url;
      link.download = `thor-ai-${image.model}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(t('imageFeature.downloadStarted'));
    } catch (error) {
      toast.error(t('imageFeature.downloadFailed'));
    }
  };

  const handlePreviewImage = (image: GeneratedImage) => {
    setPreviewImage(image.url);
    setPreviewOpen(true);
  };

  const clearAllImages = () => {
    setGeneratedImages([]);
    toast.success(t('imageFeature.clearedAllImages'));
  };

  const renderImageCard = (image: GeneratedImage) => {
    const isGenerating = image.status === 'generating';
    const hasError = image.status === 'error';

    return (
      <Card
        key={image.id}
        className={cn(
          "overflow-hidden h-full transition-opacity",
          !isGenerating && "hover:shadow-lg cursor-pointer",
          hasError && "opacity-60"
        )}
      >
        <div className="relative h-48">

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-full bg-muted">
              <div className="relative w-20 h-20 mb-4">
                <Progress
                  value={image.progress || 0}
                  className="w-full h-2"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium">{Math.round(image.progress || 0)}%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {hasError ? t('imageFeature.generateError') : t('imageFeature.generating')}
              </p>
            </div>
          ) : (
            <>
              <img
                alt={image.prompt}
                src={image.url}
                className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handlePreviewImage(image)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div className="hidden h-48 items-center justify-center bg-muted">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              </div>
            </>
          )}

          {/* 状态标识 */}
          <div className="absolute top-2 right-2">
            {image.status === 'completed' && (
              <Badge variant="default" className="bg-green-500">完成</Badge>
            )}
            {image.status === 'error' && (
              <Badge variant="destructive">失败</Badge>
            )}
            {image.status === 'generating' && (
              <Badge variant="secondary">生成中</Badge>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        {(image.status === 'completed' || image.status === 'error') && (
          <div className="flex justify-center gap-2 p-2 border-t">
            <TooltipProvider>
              {image.status === 'completed' && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreviewImage(image)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t('imageFeature.preview')}</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadImage(image)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t('imageFeature.download')}</TooltipContent>
                  </Tooltip>

                  <AlertDialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>{t('imageFeature.delete')}</TooltipContent>
                    </Tooltip>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('imageFeature.confirmDelete')}</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteImage(image.id)}>
                          {t('common.confirm')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}

              {image.status === 'error' && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          toast.info(t('imageFeature.retryNotImplemented'));
                        }}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t('imageFeature.retry')}</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t('imageFeature.delete')}</TooltipContent>
                  </Tooltip>
                </>
              )}
            </TooltipProvider>
          </div>
        )}

        <div className="p-3">
          <p
            className="block mb-2 text-sm font-medium truncate"
            title={image.prompt}
          >
            {image.prompt}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {image.size}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(image.timestamp).toLocaleTimeString()}
            </span>
          </div>

          {hasError && image.error && (
            <p className="text-xs text-destructive mt-1">
              {image.error}
            </p>
          )}
        </div>
      </Card>
    );
  };

  const hasSourceImages = sourceImages.length > 0;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Configuration and upload area */}
      <div className={cn(
        "bg-card border-b shadow-sm",
        isMobile ? "p-4" : "p-6"
      )}>
        <div className="space-y-6 w-full">
          {/* 源图片上传 */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <UploadCloud className="w-4 h-4" />
              <span className="font-medium">{t('imageFeature.sourceImages')}</span>
              {hasSourceImages && (
                <Badge variant="secondary">{sourceImages.length}</Badge>
              )}
            </div>
            <div className={cn(
              "bg-muted/50 border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors rounded-lg cursor-pointer",
              isMobile ? "p-4" : "p-6"
            )}>
              <div className="text-center">
                <UploadIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-base font-medium mb-2">
                  {t('imageFeature.dragImageHint')}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('imageFeature.supportMultipleFiles')}
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={loading}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="outline" disabled={loading} asChild>
                    <span className="cursor-pointer">
                      <UploadIcon className="w-4 h-4 mr-2" />
                      Choose Files
                    </span>
                  </Button>
                </label>
              </div>
            </div>

            {hasSourceImages && (
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  已选择 {sourceImages.length} 张图片
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClearSourceImages}
                >
                  <X className="w-4 h-4 mr-2" />
                  {t('imageFeature.clearSourceImages')}
                </Button>
              </div>
            )}
          </Card>

          {/* 生成参数 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {hasSourceImages ? t('imageFeature.transformationPrompt') : t('imageFeature.prompt')}
              </label>
              <Textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={hasSourceImages ? t('imageFeature.transformationPromptPlaceholder') : t('imageFeature.promptPlaceholder')}
                maxLength={1000}
                className="resize-none"
              />
              <div className="text-xs text-muted-foreground text-right">
                {prompt.length}/1000
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">
                  {t('imageFeature.imageSize')}
                </label>
                <Select value={imageSize} onValueChange={setImageSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1024x1024">1024 × 1024 (正方形)</SelectItem>
                    <SelectItem value="1792x1024">1792 × 1024 (横向)</SelectItem>
                    <SelectItem value="1024x1792">1024 × 1792 (纵向)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleGenerateImage}
                disabled={loading || !prompt.trim() || !selectedModel || !selectedToken}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    生成中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    {hasSourceImages ? t('imageFeature.transformImage') : t('imageFeature.generateImage')}
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 图片展示区域 */}
      <div className={cn(
        "flex-1 overflow-auto",
        isMobile ? "p-4" : "p-6"
      )}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            <h4 className="text-lg font-semibold m-0">
              {t('imageFeature.generatedImages')}
            </h4>
            {generatedImages.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {generatedImages.length}
              </Badge>
            )}
          </div>

          {generatedImages.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t('imageFeature.clearAll')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确认清空</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('imageFeature.confirmClearAll')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                  <AlertDialogAction onClick={clearAllImages}>
                    {t('common.confirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {generatedImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {t('imageFeature.noImagesYet')}
            </p>
          </div>
        ) : (
          <div className={cn(
            "grid gap-4",
            isMobile
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          )}>
            {generatedImages.map((img) => renderImageCard(img))}
          </div>
        )}
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
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}