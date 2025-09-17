import { useState, useEffect } from 'react';
// Replaced Ant Design with shadcn/ui components
import { ImageIcon, Trash2, Upload as UploadIcon } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { Textarea } from '../../../../components/ui/textarea';
import { Separator } from '../../../../components/ui/separator';
import { toast } from 'sonner';
import { cn } from '../../../../lib/utils';
import { Flexbox } from 'react-layout-kit';
import { useTranslation } from 'react-i18next';
import { getTokens } from '../../../../services/TokenService';
import { isMobileDevice } from '../../../../utils/responsive';
// File types for upload handling
interface UploadFile {
    uid: string;
    name: string;
    status?: 'uploading' | 'done' | 'error' | 'removed';
    url?: string;
    thumbUrl?: string;
    originFileObj?: File;
}
import { processImage } from '../../../../services/ImageService';

// Using shadcn/ui components directly

// Interface for generated image
interface GeneratedImage {
    id: string;
    url: string;
    prompt: string;
    model: string;
    timestamp: number;
    size: string;
}

// Interface for source image
interface SourceImage {
    uid: string;
    file: File;
    dataUrl: string;
}

export default function ImageFeature({ modelInfo }: { modelInfo: any }) {
    const { t } = useTranslation();
    const isMobile = isMobileDevice();

    const [tokenOptions, setTokenOptions] = useState<any[]>([]);
    const [selectedToken, setSelectedToken] = useState<string>('');
    const [modelOptions, setModelOptions] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [prompt, setPrompt] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [imageSize, setImageSize] = useState<string>('1024x1024');
    const [sourceImages, setSourceImages] = useState<SourceImage[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        // Initial loading of tokens and models
        fetchTokens();
        // Set model options from modelInfo
        if (modelInfo && modelInfo.modelTypes) {
            const imageModels = modelInfo.modelTypes.find((type: any) => type.type === 'image')?.models || [];
            setModelOptions(imageModels);
            if (imageModels.length > 0) {
                setSelectedModel(imageModels[0]);
            }
        }
    }, [modelInfo]);

    const fetchTokens = async () => {
        try {
            const res = await getTokens(1, 100);
            if (res && res.data && res.data.items) {
                setTokenOptions(res.data.items);
                if (res.data.items.length > 0) {
                    const firstToken = res.data.items[0].key;
                    setSelectedToken(firstToken);
                } else {
                    toast.error(t('imageFeature.noTokensAvailable'));
                }
            }
        } catch (error) {
            console.error('Failed to fetch tokens:', error);
            toast.error(t('common.error'));
        }
    };

    // Handle token selection change
    const handleTokenChange = (value: string) => {
        setSelectedToken(value);
    };

    // Handle file upload for img2img
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFileList: UploadFile[] = Array.from(files).map((file, index) => ({
            uid: `${Date.now()}-${index}`,
            name: file.name,
            status: 'done' as const,
            originFileObj: file
        }));

        setFileList(prev => [...prev, ...newFileList]);

        // Process each file to create source images
        const processFiles = async () => {
            const newSourceImages: SourceImage[] = [];

            for (const fileItem of newFileList) {
                if (fileItem.originFileObj) {
                    try {
                        const dataUrl = await readFileAsDataURL(fileItem.originFileObj);
                        newSourceImages.push({
                            uid: fileItem.uid,
                            file: fileItem.originFileObj,
                            dataUrl
                        });
                    } catch (error) {
                        console.error('Failed to read file:', error);
                    }
                }
            }

            setSourceImages(prev => [...prev, ...newSourceImages]);
        };

        processFiles();
    };

    // Convert file to data URL
    const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // Clear all images
    const handleClearAllImages = () => {
        setFileList([]);
        setSourceImages([]);
    };

    // Generate image from text or transform existing image
    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            toast.error(t('imageFeature.promptRequired'));
            return;
        }

        if (!selectedToken) {
            toast.error(t('imageFeature.tokenRequired'));
            return;
        }

        if (!selectedModel) {
            toast.error(t('imageFeature.modelRequired'));
            return;
        }

        setLoading(true);

        try {
            const hasSourceImages = sourceImages.length > 0;

            // Base parameters for all requests
            const baseParams = {
                prompt,
                model: selectedModel,
                size: imageSize,
                token: selectedToken,
            };

            if (hasSourceImages) {
                // Process each source image
                for (const sourceImage of sourceImages) {
                    try {
                        // Source image already contains the data URL with prefix
                        const params = {
                            ...baseParams,
                            image: sourceImage.dataUrl, // Pass complete dataURL - our service will handle extraction
                        };

                        const result = await processImage(params);

                        if (result && result.data) {
                            // Add new image to the list
                            const newImage: GeneratedImage = {
                                id: result.data.id || Date.now().toString() + Math.random().toString(36).substring(2, 9),
                                url: result.data.b64_json?.startsWith("http") ? result.data.b64_json : `data:image/png;base64,${result.data.b64_json}`,
                                prompt,
                                model: selectedModel,
                                timestamp: Date.now(),
                                size: imageSize
                            };

                            setGeneratedImages(prev => [newImage, ...prev]);
                        }
                    } catch (error) {
                        console.error('Failed to process image:', error);
                        toast.error(`Failed to process image: ${sourceImage.file.name}`);
                    }
                }

                toast.success(t('imageFeature.generateSuccess'));
            } else {
                // Text-to-image generation using OpenAI
                const result = await processImage(baseParams);

                if (result && result.data) {
                    // Add new image to the list
                    const newImage: GeneratedImage = {
                        id: result.data.id || Date.now().toString(),
                        url: result.data.b64_json?.startsWith("http") ? result.data.b64_json : `data:image/png;base64,${result.data.b64_json}`,
                        prompt,
                        model: selectedModel,
                        timestamp: Date.now(),
                        size: imageSize
                    };

                    setGeneratedImages(prev => [newImage, ...prev]);
                    toast.success(t('imageFeature.generateSuccess'));
                }
            }
        } catch (error: any) {
            console.error('Failed to generate image:', error);
            toast.error(`${t('imageFeature.generateFailed')}: ${error.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const hasSourceImages = sourceImages.length > 0;

    return (
        <Flexbox
            gap={0}
            style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                overflow: 'auto'
            }}
        >
            <Card className="w-full h-full flex flex-col border-none rounded-none">
                <CardContent className="flex-1 p-4 flex flex-col overflow-auto">
                <Flexbox direction="vertical" gap={16}>
                    <h3 className="text-lg font-semibold">{t('imageFeature.title')}</h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t('imageFeature.sourceImages')}</label>
                            <div className={cn(
                                "bg-muted/50 border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors rounded-lg cursor-pointer p-5"
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
                                        id="image-upload-simple"
                                    />
                                    <label htmlFor="image-upload-simple">
                                        <Button variant="outline" disabled={loading} asChild>
                                            <span className="cursor-pointer">
                                                <UploadIcon className="w-4 h-4 mr-2" />
                                                Choose Files
                                            </span>
                                        </Button>
                                    </label>
                                </div>
                            </div>

                            {fileList.length > 0 && (
                                <Button
                                    variant="destructive"
                                    onClick={handleClearAllImages}
                                    className="mt-2"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    {t('imageFeature.clearAllImages')}
                                </Button>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                {hasSourceImages ? t('imageFeature.transformationPrompt') : t('imageFeature.prompt')}
                            </label>
                            <Textarea
                                rows={4}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={hasSourceImages ? t('imageFeature.transformationPromptPlaceholder') : t('imageFeature.promptPlaceholder')}
                            />
                        </div>

                        <div className={cn(
                            "grid gap-4",
                            isMobile ? "grid-cols-1" : "grid-cols-3"
                        )}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t('imageFeature.token')}</label>
                                <Select
                                    value={selectedToken}
                                    onValueChange={handleTokenChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={t('imageFeature.selectToken')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tokenOptions.map((token) => (
                                            <SelectItem key={token.key} value={token.key}>
                                                {token.name || token.key}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t('imageFeature.model')}</label>
                                <Select
                                    value={selectedModel}
                                    onValueChange={setSelectedModel}
                                    disabled={!selectedToken}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={t('imageFeature.selectModel')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {modelOptions.map((model) => (
                                            <SelectItem key={model} value={model}>
                                                {model}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t('imageFeature.imageSize')}</label>
                                <Select
                                    value={imageSize}
                                    onValueChange={setImageSize}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1024x1024">1024 x 1024 ({t('imageFeature.square')})</SelectItem>
                                        <SelectItem value="1792x1024">1792 x 1024 ({t('imageFeature.landscape')})</SelectItem>
                                        <SelectItem value="1024x1792">1024 x 1792 ({t('imageFeature.portrait')})</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Button
                            onClick={handleGenerateImage}
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Generating...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    {hasSourceImages ? t('imageFeature.transformImage') : t('imageFeature.generateImage')}
                                </div>
                            )}
                        </Button>
                    </div>

                    <Separator className="my-6" />
                    <h4 className="text-lg font-semibold mb-4">{t('imageFeature.generatedImages')}</h4>

                    {generatedImages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">{t('imageFeature.noImagesYet')}</p>
                        </div>
                    ) : (
                        <div className={cn(
                            "grid gap-4",
                            isMobile ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        )}>
                            {generatedImages.map((img) => (
                                <Card key={img.id} className="overflow-hidden">
                                    <CardContent className="p-0">
                                        <img
                                            alt={img.prompt}
                                            src={img.url}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-3">
                                            <p className="text-sm font-medium mb-2 line-clamp-2" title={img.prompt}>
                                                {img.prompt}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {img.model} • {img.size}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </Flexbox>
                </CardContent>
            </Card>
        </Flexbox>
    );
}