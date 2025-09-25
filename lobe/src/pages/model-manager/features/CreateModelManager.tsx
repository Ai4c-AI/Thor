import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreateModelManager } from "../../../services/ModelManagerService";
import { getIconByNames } from "../../../utils/iconutils";
import { renderQuota } from "../../../utils/render";
import { MODEL_TYPES } from "../constants/modelTypes";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Switch } from "../../../components/ui/switch";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../components/ui/collapsible";
import { toast } from "sonner";
import {
  Plus,
  X,
  Info,
  Sparkles,
  Target,
  Settings,
  Database,
  MessageSquare,
  Image,
  Volume2,
  Link,
  Mic,
  Speaker,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Eye,
  Loader2
} from "lucide-react";
import { cn } from "../../../lib/utils";

// 阶级计费层级类型
interface PricingTier {
  minContextLength: number;
  maxContextLength: number;
  tierDescription: string;
  promptRateMultiplier: number;
  completionRateMultiplier: number;
  fixedAdditionalCost: number;
}

const pricingTierSchema = z.object({
  minContextLength: z.number().min(0, "Min context length must be positive"),
  maxContextLength: z.number().min(0, "Max context length must be positive"),
  tierDescription: z.string().min(1, "Tier description is required"),
  promptRateMultiplier: z.number().min(0, "Prompt rate multiplier must be positive"),
  completionRateMultiplier: z.number().min(0, "Completion rate multiplier must be positive"),
  fixedAdditionalCost: z.number().min(0, "Fixed additional cost must be positive"),
}).refine((data) => data.maxContextLength > data.minContextLength, {
  message: "Max context length must be greater than min context length",
  path: ["maxContextLength"],
});

const formSchema = z.object({
  model: z.string().min(1, "Model name is required"),
  quotaType: z.number().min(1).max(2),
  isVersion2: z.boolean(),
  type: z.string().min(1, "Model type is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  tags: z.array(z.string()).optional(),
  promptRate: z.number().min(0, "Prompt rate must be positive"),
  completionRate: z.number().optional(),
  audioPromptRate: z.number().optional(),
  audioOutputRate: z.number().optional(),
  quotaMax: z.number().optional(),
  defaultContextLength: z.number().optional(),
  contextPricingTiers: z.array(pricingTierSchema).optional(),
});

type ModelFormData = z.infer<typeof formSchema>;

interface CreateModelManagerProps {
    open: boolean;
    onClose: () => void;
    onOk: () => void;
}

export default function CreateModelManagerPage({
    open,
    onClose,
    onOk
}: CreateModelManagerProps) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const form = useForm<ModelFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quotaType: 1,
            isVersion2: false,
            tags: [],
            promptRate: 0,
            contextPricingTiers: [],
        },
    });

    const watchedValues = form.watch();

    // Get icon component for preview
    const getIconComponent = (iconName: string) => {
        const iconMap: Record<string, any> = {
            'chat': MessageSquare,
            'image': Image,
            'audio': Volume2,
            'stt': Mic,
            'tts': Speaker,
            'embedding': Link,
        };
        return iconMap[iconName] || Database;
    };

    // Add tag function
    const addTag = () => {
        if (newTag.trim() && !form.getValues('tags')?.includes(newTag.trim())) {
            const currentTags = form.getValues('tags') || [];
            form.setValue('tags', [...currentTags, newTag.trim()]);
            setNewTag('');
        }
    };

    // Remove tag function
    const removeTag = (index: number) => {
        const currentTags = form.getValues('tags') || [];
        form.setValue('tags', currentTags.filter((_, i) => i !== index));
    };

    // Add pricing tier function
    const addPricingTier = () => {
        const currentTiers = form.getValues('contextPricingTiers') || [];
        const newTier: PricingTier = {
            minContextLength: 0,
            maxContextLength: 4096,
            tierDescription: '',
            promptRateMultiplier: 1.0,
            completionRateMultiplier: 1.0,
            fixedAdditionalCost: 0,
        };
        form.setValue('contextPricingTiers', [...currentTiers, newTier]);
    };

    // Remove pricing tier function
    const removePricingTier = (index: number) => {
        const currentTiers = form.getValues('contextPricingTiers') || [];
        form.setValue('contextPricingTiers', currentTiers.filter((_, i) => i !== index));
    };

    async function onSubmit(data: ModelFormData) {
        setIsLoading(true);
        try {
            const res = await CreateModelManager(data);
            if (res.success) {
                toast.success(t('modelManager.createSuccess'));
                form.reset();
                onOk();
            } else {
                toast.error(res.message || t('common.operationFailed'));
            }
        } catch (error) {
            toast.error(t('common.operationFailed'));
        } finally {
            setIsLoading(false);
        }
    }

    const handleClose = () => {
        form.reset();
        setNewTag('');
        setShowAdvanced(false);
        onClose();
    };

    // Real-time preview data
    const previewData = {
        name: watchedValues.model || t('modelManager.enterModelName'),
        type: watchedValues.type || 'unknown',
        description: watchedValues.description || t('modelManager.enterDescription'),
        isEnabled: true,
        isVersion2: watchedValues.isVersion2,
        quotaType: watchedValues.quotaType,
        promptRate: watchedValues.promptRate || 0,
        completionRate: watchedValues.completionRate || 0,
        tags: watchedValues.tags || [],
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
            <DialogContent className="max-w-[95vw] w-full max-h-[95vh] p-0 lg:max-w-6xl">
                <DialogHeader className="px-4 py-3 lg:px-6 lg:py-4 border-b bg-muted/30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Plus className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-semibold">
                                    {t('modelManager.createModel')}
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {t('modelManager.modelDescription')}
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="flex flex-1 overflow-hidden">
                    {/* Main Form */}
                    <div className="flex-1 p-4 lg:p-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-full">
                                <ScrollArea className="h-[calc(95vh-200px)]">
                                    <div className="space-y-6 pr-4">
                                        {/* Basic Information */}
                                        <Card>
                                            <CardHeader className="pb-4">
                                                <CardTitle className="flex items-center gap-2 text-lg">
                                                    <Info className="h-5 w-5 text-primary" />
                                                    {t('modelManager.basicInfo')}
                                                </CardTitle>
                                                <CardDescription>{t('modelManager.basicInfoDesc')}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="model"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>{t('modelManager.modelName')} *</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder={t('modelManager.enterModelName')}
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="type"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>{t('modelManager.modelCategory')} *</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder={t('modelManager.selectCategory')} />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value={MODEL_TYPES.CHAT}>
                                                                            <div className="flex items-center gap-2">
                                                                                <MessageSquare className="h-4 w-4" />
                                                                                {t('modelManager.typeChat')}
                                                                            </div>
                                                                        </SelectItem>
                                                                        <SelectItem value={MODEL_TYPES.IMAGE}>
                                                                            <div className="flex items-center gap-2">
                                                                                <Image className="h-4 w-4" />
                                                                                {t('modelManager.typeImage')}
                                                                            </div>
                                                                        </SelectItem>
                                                                        <SelectItem value={MODEL_TYPES.AUDIO}>
                                                                            <div className="flex items-center gap-2">
                                                                                <Volume2 className="h-4 w-4" />
                                                                                {t('modelManager.typeAudio')}
                                                                            </div>
                                                                        </SelectItem>
                                                                        <SelectItem value={MODEL_TYPES.STT}>
                                                                            <div className="flex items-center gap-2">
                                                                                <Mic className="h-4 w-4" />
                                                                                {t('modelManager.typeSTT')}
                                                                            </div>
                                                                        </SelectItem>
                                                                        <SelectItem value={MODEL_TYPES.TTS}>
                                                                            <div className="flex items-center gap-2">
                                                                                <Speaker className="h-4 w-4" />
                                                                                {t('modelManager.typeTTS')}
                                                                            </div>
                                                                        </SelectItem>
                                                                        <SelectItem value={MODEL_TYPES.EMBEDDING}>
                                                                            <div className="flex items-center gap-2">
                                                                                <Link className="h-4 w-4" />
                                                                                {t('modelManager.typeEmbedding')}
                                                                            </div>
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="description"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{t('modelManager.modelDescription')} *</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder={t('modelManager.enterDescription')}
                                                                    className="resize-none"
                                                                    rows={3}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="icon"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>{t('modelManager.modelIcon')} *</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder={t('modelManager.selectIcon')} />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {getIconByNames(25).map((option) => (
                                                                            <SelectItem key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="isVersion2"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                                <div className="space-y-0.5">
                                                                    <FormLabel className="text-base flex items-center gap-2">
                                                                        <Sparkles className="h-4 w-4" />
                                                                        {t('modelManager.isRealTimeModel')}
                                                                    </FormLabel>
                                                                    <FormDescription>
                                                                        {t('modelManager.realTimeModelDesc')}
                                                                    </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                {/* Tags */}
                                                <FormField
                                                    control={form.control}
                                                    name="tags"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{t('modelManager.modelTags')} ({t('common.optional')})</FormLabel>
                                                            <FormControl>
                                                                <div className="space-y-3">
                                                                    <div className="flex gap-2">
                                                                        <Input
                                                                            placeholder={t('modelManager.enterTags')}
                                                                            value={newTag}
                                                                            onChange={(e) => setNewTag(e.target.value)}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === 'Enter') {
                                                                                    e.preventDefault();
                                                                                    addTag();
                                                                                }
                                                                            }}
                                                                            className="flex-1"
                                                                        />
                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={addTag}
                                                                        >
                                                                            <Plus className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2 min-h-8">
                                                                        {field.value?.map((tag, index) => (
                                                                            <Badge key={index} variant="secondary" className="gap-1">
                                                                                {tag}
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => removeTag(index)}
                                                                                    className="ml-1 hover:text-destructive transition-colors"
                                                                                >
                                                                                    <X className="h-3 w-3" />
                                                                                </button>
                                                                            </Badge>
                                                                        ))}
                                                                        {(!field.value || field.value.length === 0) && (
                                                                            <span className="text-sm text-muted-foreground">
                                                                                {t('common.noData')}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                            <FormDescription>
                                                                {t('modelManager.tagsDesc')}
                                                            </FormDescription>
                                                        </FormItem>
                                                    )}
                                                />
                                            </CardContent>
                                        </Card>

                                        {/* Pricing Configuration */}
                                        <Card>
                                            <CardHeader className="pb-4">
                                                <CardTitle className="flex items-center gap-2 text-lg">
                                                    <Target className="h-5 w-5 text-emerald-600" />
                                                    {t('modelManager.rateConfiguration')}
                                                </CardTitle>
                                                <CardDescription>{t('modelManager.rateConfigDesc')}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="quotaType"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{t('modelManager.billingType')} *</FormLabel>
                                                            <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder={t('modelManager.selectBillingType')} />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="1">
                                                                        <div className="flex items-center gap-2">
                                                                            <Target className="h-4 w-4" />
                                                                            {t('modelManager.volumeBilling')}
                                                                        </div>
                                                                    </SelectItem>
                                                                    <SelectItem value="2">
                                                                        <div className="flex items-center gap-2">
                                                                            <Database className="h-4 w-4" />
                                                                            {t('modelManager.perUseBilling')}
                                                                        </div>
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {watchedValues.quotaType === 1 ? (
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="promptRate"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>{t('modelManager.inputRate')} *</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="number"
                                                                            step="0.0001"
                                                                            min="0"
                                                                            placeholder="0.0000"
                                                                            {...field}
                                                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                                        />
                                                                    </FormControl>
                                                                    <FormDescription>
                                                                        {t('modelManager.inputRateDesc')}
                                                                    </FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="completionRate"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>{t('modelManager.outputRate')}</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            type="number"
                                                                            step="0.0001"
                                                                            min="0"
                                                                            placeholder="0.0000"
                                                                            {...field}
                                                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                                        />
                                                                    </FormControl>
                                                                    <FormDescription>
                                                                        {t('modelManager.outputRateDesc')}
                                                                    </FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                ) : (
                                                    <FormField
                                                        control={form.control}
                                                        name="promptRate"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>{t('modelManager.perUsageRate')} *</FormLabel>
                                                                <FormControl>
                                                                    <div className="flex items-center gap-3">
                                                                        <Input
                                                                            type="number"
                                                                            step="0.0001"
                                                                            min="0"
                                                                            placeholder="0.0000"
                                                                            className="flex-1"
                                                                            {...field}
                                                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                                        />
                                                                        <Badge variant="secondary" className="px-3 py-2">
                                                                            {renderQuota(watchedValues.promptRate || 0, 6)}
                                                                        </Badge>
                                                                    </div>
                                                                </FormControl>
                                                                <FormDescription>
                                                                    {t('modelManager.perUsageRateDesc')}
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                )}
                                            </CardContent>
                                        </Card>

                                        {/* Advanced Settings */}
                                        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                                            <Card>
                                                <CollapsibleTrigger asChild>
                                                    <CardHeader className="pb-4 cursor-pointer hover:bg-muted/50 transition-colors">
                                                        <CardTitle className="flex items-center justify-between text-lg">
                                                            <div className="flex items-center gap-2">
                                                                <Settings className="h-5 w-5 text-purple-600" />
                                                                {t('modelManager.advancedSettings')}
                                                                <Badge variant="outline" className="text-xs">
                                                                    {t('common.optional')}
                                                                </Badge>
                                                            </div>
                                                            <ChevronDown className={cn(
                                                                "h-4 w-4 transition-transform duration-200",
                                                                showAdvanced && "transform rotate-180"
                                                            )} />
                                                        </CardTitle>
                                                        <CardDescription>{t('modelManager.advancedSettingsDesc')}</CardDescription>
                                                    </CardHeader>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <CardContent className="space-y-4">
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="audioPromptRate"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex items-center gap-2">
                                                                            <Mic className="h-4 w-4 text-orange-500" />
                                                                            {t('modelManager.audioInputRate')}
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                step="0.0001"
                                                                                min="0"
                                                                                placeholder="0.0000"
                                                                                {...field}
                                                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                                                            />
                                                                        </FormControl>
                                                                        <FormDescription>
                                                                            {t('modelManager.audioInputRateDesc')}
                                                                        </FormDescription>
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="audioOutputRate"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex items-center gap-2">
                                                                            <Speaker className="h-4 w-4 text-blue-500" />
                                                                            {t('modelManager.audioOutputRate')}
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                step="0.0001"
                                                                                min="0"
                                                                                placeholder="0.0000"
                                                                                {...field}
                                                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                                                            />
                                                                        </FormControl>
                                                                        <FormDescription>
                                                                            {t('modelManager.audioOutputRateDesc')}
                                                                        </FormDescription>
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="quotaMax"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex items-center gap-2">
                                                                            <Database className="h-4 w-4 text-green-500" />
                                                                            {t('modelManager.maxContext')}
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                step="512"
                                                                                min="0"
                                                                                placeholder="128000"
                                                                                {...field}
                                                                                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                                                                            />
                                                                        </FormControl>
                                                                        <FormDescription>
                                                                            {t('modelManager.maxContextDesc')}
                                                                        </FormDescription>
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="defaultContextLength"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex items-center gap-2">
                                                                            <Settings className="h-4 w-4 text-purple-500" />
                                                                            {t('modelManager.defaultContext')}
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                step="512"
                                                                                min="0"
                                                                                placeholder="4096"
                                                                                {...field}
                                                                                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                                                                            />
                                                                        </FormControl>
                                                                        <FormDescription>
                                                                            {t('modelManager.defaultContextDesc')}
                                                                        </FormDescription>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>

                                                        {/* Context Pricing Tiers */}
                                                        <FormField
                                                            control={form.control}
                                                            name="contextPricingTiers"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="flex items-center gap-2">
                                                                        <Target className="h-4 w-4 text-emerald-500" />
                                                                        {t('modelManager.contextPricingTiers')}
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <div className="space-y-4">
                                                                            {field.value?.map((tier, index) => (
                                                                                <Card key={index} className="border border-dashed">
                                                                                    <CardContent className="p-4">
                                                                                        <div className="flex items-center justify-between mb-3">
                                                                                            <h4 className="text-sm font-medium">
                                                                                                {t('modelManager.tierDescription')} {index + 1}
                                                                                            </h4>
                                                                                            <Button
                                                                                                type="button"
                                                                                                variant="ghost"
                                                                                                size="sm"
                                                                                                onClick={() => removePricingTier(index)}
                                                                                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                                                                            >
                                                                                                <X className="h-4 w-4" />
                                                                                            </Button>
                                                                                        </div>
                                                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                                                                            <div className="space-y-2">
                                                                                                <Label className="text-xs">{t('modelManager.minContextLength')}</Label>
                                                                                                <Input
                                                                                                    type="number"
                                                                                                    min="0"
                                                                                                    placeholder={t('modelManager.enterMinContextLength')}
                                                                                                    value={tier.minContextLength}
                                                                                                    onChange={(e) => {
                                                                                                        const newTiers = [...(field.value || [])];
                                                                                                        newTiers[index] = { ...tier, minContextLength: parseInt(e.target.value) || 0 };
                                                                                                        field.onChange(newTiers);
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="space-y-2">
                                                                                                <Label className="text-xs">{t('modelManager.maxContextLength')}</Label>
                                                                                                <Input
                                                                                                    type="number"
                                                                                                    min="0"
                                                                                                    placeholder={t('modelManager.enterMaxContextLength')}
                                                                                                    value={tier.maxContextLength}
                                                                                                    onChange={(e) => {
                                                                                                        const newTiers = [...(field.value || [])];
                                                                                                        newTiers[index] = { ...tier, maxContextLength: parseInt(e.target.value) || 0 };
                                                                                                        field.onChange(newTiers);
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-span-full space-y-2">
                                                                                                <Label className="text-xs">{t('modelManager.tierDescription')}</Label>
                                                                                                <Input
                                                                                                    placeholder={t('modelManager.enterTierDescription')}
                                                                                                    value={tier.tierDescription}
                                                                                                    onChange={(e) => {
                                                                                                        const newTiers = [...(field.value || [])];
                                                                                                        newTiers[index] = { ...tier, tierDescription: e.target.value };
                                                                                                        field.onChange(newTiers);
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="space-y-2">
                                                                                                <Label className="text-xs">{t('modelManager.promptRateMultiplier')}</Label>
                                                                                                <Input
                                                                                                    type="number"
                                                                                                    step="0.1"
                                                                                                    min="0"
                                                                                                    placeholder={t('modelManager.enterPromptRateMultiplier')}
                                                                                                    value={tier.promptRateMultiplier}
                                                                                                    onChange={(e) => {
                                                                                                        const newTiers = [...(field.value || [])];
                                                                                                        newTiers[index] = { ...tier, promptRateMultiplier: parseFloat(e.target.value) || 0 };
                                                                                                        field.onChange(newTiers);
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="space-y-2">
                                                                                                <Label className="text-xs">{t('modelManager.completionRateMultiplier')}</Label>
                                                                                                <Input
                                                                                                    type="number"
                                                                                                    step="0.1"
                                                                                                    min="0"
                                                                                                    placeholder={t('modelManager.enterCompletionRateMultiplier')}
                                                                                                    value={tier.completionRateMultiplier}
                                                                                                    onChange={(e) => {
                                                                                                        const newTiers = [...(field.value || [])];
                                                                                                        newTiers[index] = { ...tier, completionRateMultiplier: parseFloat(e.target.value) || 0 };
                                                                                                        field.onChange(newTiers);
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-span-full space-y-2">
                                                                                                <Label className="text-xs">{t('modelManager.fixedAdditionalCost')}</Label>
                                                                                                <Input
                                                                                                    type="number"
                                                                                                    step="0.01"
                                                                                                    min="0"
                                                                                                    placeholder={t('modelManager.enterFixedAdditionalCost')}
                                                                                                    value={tier.fixedAdditionalCost}
                                                                                                    onChange={(e) => {
                                                                                                        const newTiers = [...(field.value || [])];
                                                                                                        newTiers[index] = { ...tier, fixedAdditionalCost: parseFloat(e.target.value) || 0 };
                                                                                                        field.onChange(newTiers);
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </CardContent>
                                                                                </Card>
                                                                            ))}
                                                                            <Button
                                                                                type="button"
                                                                                variant="outline"
                                                                                onClick={addPricingTier}
                                                                                className="w-full border-dashed"
                                                                            >
                                                                                <Plus className="h-4 w-4 mr-2" />
                                                                                {t('modelManager.addPricingTier')}
                                                                            </Button>
                                                                        </div>
                                                                    </FormControl>
                                                                    <FormDescription>
                                                                        {t('modelManager.contextPricingTiersDesc')}
                                                                    </FormDescription>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </CardContent>
                                                </CollapsibleContent>
                                            </Card>
                                        </Collapsible>
                                    </div>
                                </ScrollArea>

                                {/* Footer Actions */}
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleClose}
                                    >
                                        {t('common.cancel')}
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="min-w-32"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                {t('common.creating')}
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                {t('modelManager.createModel')}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>

                    {/* Live Preview Panel */}
                    <div className="hidden lg:block w-80 xl:w-96 border-l bg-muted/30 p-6">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Eye className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">{t('modelManager.livePreview')}</h3>
                            </div>

                            <motion.div
                                key={`${previewData.name}-${previewData.type}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="border border-border/50">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                    {React.createElement(getIconComponent(previewData.type), {
                                                        className: "h-5 w-5 text-primary"
                                                    })}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold truncate text-sm">{previewData.name}</h4>
                                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                                        {previewData.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <Badge variant="default" className="text-xs">
                                                    {t('modelManager.modelEnabled')}
                                                </Badge>
                                                {previewData.isVersion2 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        <Sparkles className="h-3 w-3 mr-1" />
                                                        V2
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="space-y-2">
                                            <Label className="text-xs text-muted-foreground">{t('modelManager.billingInfo')}</Label>
                                            <div className="space-y-1">
                                                {previewData.quotaType === 1 ? (
                                                    <>
                                                        <Badge variant="secondary" className="text-xs w-full justify-center">
                                                            {t('modelManager.input')}: {renderQuota(previewData.promptRate, 6)}/1M
                                                        </Badge>
                                                        <Badge variant="outline" className="text-xs w-full justify-center">
                                                            {t('modelManager.output')}: {renderQuota(previewData.completionRate, 6)}/1M
                                                        </Badge>
                                                    </>
                                                ) : (
                                                    <Badge variant="default" className="text-xs w-full justify-center">
                                                        {t('modelManager.perRequest')}: {renderQuota(previewData.promptRate, 6)}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        {previewData.tags.length > 0 && (
                                            <div className="space-y-2">
                                                <Label className="text-xs text-muted-foreground">{t('common.tags')}</Label>
                                                <div className="flex flex-wrap gap-1">
                                                    {previewData.tags.slice(0, 3).map((tag) => (
                                                        <Badge key={tag} variant="outline" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                    {previewData.tags.length > 3 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{previewData.tags.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center gap-2 mb-2">
                                    <Info className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                                        {t('common.tips')}
                                    </span>
                                </div>
                                <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                                    {t('modelManager.createTips')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}