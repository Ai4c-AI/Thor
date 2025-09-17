import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UpdateModelManager } from "../../../services/ModelManagerService";
import { getIconByNames } from "../../../utils/iconutils";
import { renderQuota } from "../../../utils/render";
import { MODEL_TYPES } from "../constants/modelTypes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Progress } from "../../../components/ui/progress";
import { toast } from "sonner";
import {
  Edit,
  Minus,
  Info,
  AlertCircle,
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
  ArrowRight,
  X,
  Save
} from "lucide-react";
import { cn } from "../../../lib/utils";

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
  cacheRate: z.number().optional(),
  cacheHitRate: z.number().optional(),
  audioCacheRate: z.number().optional(),
  quotaMax: z.number().optional(),
  defaultContextLength: z.number().optional(),
  contextPricingTiers: z.array(z.object({
    minContextLength: z.number().min(0),
    maxContextLength: z.number().min(0),
    description: z.string().min(1),
    promptRateMultiplier: z.number().min(0.1),
    completionRateMultiplier: z.number().min(0.1),
    fixedAdditionalCost: z.number().min(0).optional(),
  })).optional(),
});

// Step wizard configuration
const STEPS = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Model name, type, and description',
    icon: Info
  },
  {
    id: 'pricing',
    title: 'Pricing & Billing',
    description: 'Configure rates and billing',
    icon: Target
  },
  {
    id: 'advanced',
    title: 'Advanced Settings',
    description: 'Audio rates and context limits',
    icon: Settings
  }
];

type UpdateModelFormData = z.infer<typeof formSchema>;

interface UpdateModelManagerProps {
    open: boolean;
    onClose: () => void;
    onOk: () => void;
    value: any;
}

export default function UpdateModelManagerPage({
    open,
    onClose,
    onOk,
    value
}: UpdateModelManagerProps) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [promptRate, setPromptRate] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [newTag, setNewTag] = useState('');

    const form = useForm<UpdateModelFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quotaType: 1,
            isVersion2: false,
            tags: [],
            promptRate: 0,
            contextPricingTiers: [],
        },
    });

    const watchQuotaType = form.watch("quotaType");
    const watchPromptRate = form.watch("promptRate");
    const watchType = form.watch("type");
    const watchModel = form.watch("model");
    const watchDescription = form.watch("description");
    const watchIcon = form.watch("icon");

    // Initialize form with value data
    useEffect(() => {
        if (open && value) {
            form.reset({
                ...value,
                tags: value.tags || [],
                contextPricingTiers: value.contextPricingTiers || [],
            });
            setPromptRate(value.promptRate || 0);
        }
    }, [open, value, form]);

    // Step validation
    const isStepValid = (step: number) => {
        switch (step) {
            case 0:
                return watchModel && watchType && watchDescription && watchIcon;
            case 1:
                return watchPromptRate >= 0;
            case 2:
                return true; // Advanced settings are optional
            default:
                return false;
        }
    };

    // Progress calculation
    const progress = ((currentStep + 1) / STEPS.length) * 100;

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

    // Navigation functions
    const nextStep = () => {
        if (currentStep < STEPS.length - 1 && isStepValid(currentStep)) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    async function onSubmit(data: UpdateModelFormData) {
        setIsLoading(true);
        try {
            const updateData = { ...data, id: value.id };
            const res = await UpdateModelManager(updateData);
            if (res.success) {
                toast.success(t('modelManager.updateSuccess'));
                setCurrentStep(0);
                onOk();
            } else {
                toast.error(res.message || t('modelManager.operationFailed'));
            }
        } catch (error) {
            toast.error(t('modelManager.operationFailed'));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            if (!isOpen) {
                onClose();
                setCurrentStep(0);
            }
        }}>
            <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden">
                <DialogHeader className="space-y-4 pb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 ring-2 ring-blue-500/10">
                                <Edit className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-bold">
                                    {t('modelManager.updateModel')}
                                </DialogTitle>
                                <DialogDescription className="text-base mt-1">
                                    {t('modelManager.modelDescription')}
                                </DialogDescription>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                onClose();
                                setCurrentStep(0);
                            }}
                            className="h-9 w-9 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-muted-foreground">
                                {t('common.step')} {currentStep + 1} {t('common.of')} {STEPS.length}
                            </span>
                            <span className="font-medium text-blue-600">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    {/* Step Indicators */}
                    <div className="flex items-center justify-between">
                        {STEPS.map((step, index) => {
                            const isActive = index === currentStep;
                            const isCompleted = index < currentStep;
                            const isValid = isStepValid(index);

                            return (
                                <div key={step.id} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div className={cn(
                                            "flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all duration-300",
                                            isActive && "border-blue-500 bg-blue-500 text-white shadow-lg",
                                            isCompleted && "border-green-500 bg-green-500 text-white",
                                            !isActive && !isCompleted && (isValid ? "border-green-200 bg-green-50 text-green-600" : "border-border bg-muted text-muted-foreground")
                                        )}>
                                            {isCompleted ? (
                                                <CheckCircle className="h-6 w-6" />
                                            ) : (
                                                <step.icon className="h-6 w-6" />
                                            )}
                                        </div>
                                        <div className="mt-2 text-center">
                                            <div className={cn(
                                                "text-sm font-medium transition-colors",
                                                isActive && "text-blue-600",
                                                isCompleted && "text-green-600",
                                                !isActive && !isCompleted && "text-muted-foreground"
                                            )}>
                                                {step.title}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1 max-w-24 truncate">
                                                {step.description}
                                            </div>
                                        </div>
                                    </div>
                                    {index < STEPS.length - 1 && (
                                        <div className={cn(
                                            "h-0.5 w-16 mx-4 transition-colors duration-300",
                                            index < currentStep ? "bg-green-500" : "bg-border"
                                        )} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="h-[60vh] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full"
                                >
                                    <ScrollArea className="h-full pr-4">
                                        {currentStep === 0 && (
                                            <Card className="border-0 shadow-none">
                                                <CardHeader className="px-0 pt-0">
                                                    <CardTitle className="flex items-center gap-3 text-xl">
                                                        <div className="p-2 rounded-lg bg-blue-500/10">
                                                            <Info className="h-5 w-5 text-blue-600" />
                                                        </div>
                                                        {t('modelManager.basicInfo')}
                                                    </CardTitle>
                                                    <CardDescription className="text-base">
                                                        {t('modelManager.modelDescription')}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="px-0 space-y-8">
                                                    <FormField
                                                        control={form.control}
                                                        name="model"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-base font-semibold">
                                                                    {t('modelManager.modelName')}
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder={t('modelManager.enterModelName')}
                                                                        className="h-12 text-base"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormDescription className="text-sm">
                                                                    {t('modelManager.modelDescription')}
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <FormField
                                                            control={form.control}
                                                            name="quotaType"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-base font-semibold">
                                                                        {t('modelManager.modelType')}
                                                                    </FormLabel>
                                                                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                                                                        <FormControl>
                                                                            <SelectTrigger className="h-12">
                                                                                <SelectValue placeholder={t('modelManager.selectCategory')} />
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

                                                        <FormField
                                                            control={form.control}
                                                            name="isVersion2"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-row items-center justify-between rounded-xl border-2 border-dashed p-6 hover:border-blue-500/50 transition-colors">
                                                                    <div className="space-y-1">
                                                                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                                                                            <Sparkles className="h-4 w-4" />
                                                                            {t('modelManager.isRealTimeModel')}
                                                                        </FormLabel>
                                                                        <FormDescription>
                                                                            {t('modelManager.modelDescription')}
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

                                                    <FormField
                                                        control={form.control}
                                                        name="type"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-base font-semibold">
                                                                    {t('modelManager.modelCategory')}
                                                                </FormLabel>
                                                                <Select onValueChange={field.onChange} value={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="h-12">
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
                                                                        <SelectItem value={MODEL_TYPES.AUDIO}>
                                                                            <div className="flex items-center gap-2">
                                                                                <Volume2 className="h-4 w-4" />
                                                                                {t('modelManager.typeAudio')}
                                                                            </div>
                                                                        </SelectItem>
                                                                        <SelectItem value={MODEL_TYPES.IMAGE}>
                                                                            <div className="flex items-center gap-2">
                                                                                <Image className="h-4 w-4" />
                                                                                {t('modelManager.typeImage')}
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

                                                    <FormField
                                                        control={form.control}
                                                        name="description"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-base font-semibold">
                                                                    {t('modelManager.modelDescription')}
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder={t('modelManager.enterDescription')}
                                                                        className="resize-none min-h-24 text-base"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormDescription>
                                                                    {t('modelManager.modelDescription')}
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <FormField
                                                            control={form.control}
                                                            name="icon"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-base font-semibold">
                                                                        {t('modelManager.modelIcon')}
                                                                    </FormLabel>
                                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger className="h-12">
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
                                                            name="tags"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="text-base font-semibold">
                                                                        {t('modelManager.modelTags')} ({t('common.optional')})
                                                                    </FormLabel>
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
                                                                                    className="h-10"
                                                                                />
                                                                                <Button
                                                                                    type="button"
                                                                                    variant="outline"
                                                                                    size="sm"
                                                                                    onClick={addTag}
                                                                                    className="h-10 px-3"
                                                                                >
                                                                                    <Edit className="h-4 w-4" />
                                                                                </Button>
                                                                            </div>
                                                                            <div className="flex flex-wrap gap-2 min-h-8">
                                                                                {field.value?.map((tag, index) => (
                                                                                    <Badge key={index} variant="secondary" className="gap-1 h-8 px-3">
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
                                                                        {t('modelManager.enterTags')}
                                                                    </FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )}

                                        {currentStep === 1 && (
                                            <Card className="border-0 shadow-none">
                                                <CardHeader className="px-0 pt-0">
                                                    <CardTitle className="flex items-center gap-3 text-xl">
                                                        <div className="p-2 rounded-lg bg-green-500/10">
                                                            <Target className="h-5 w-5 text-green-600" />
                                                        </div>
                                                        {t('modelManager.rateConfiguration')}
                                                    </CardTitle>
                                                    <CardDescription className="text-base">
                                                        {t('modelManager.modelPrice')}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="px-0 space-y-8">
                                                    {watchQuotaType === 1 ? (
                                                        <div className="space-y-8">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="promptRate"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                                                                                <ArrowRight className="h-4 w-4 text-blue-500" />
                                                                                {t('modelManager.perPrompt')}
                                                                            </FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="number"
                                                                                    step="0.0001"
                                                                                    min="0"
                                                                                    placeholder="0.0000"
                                                                                    className="h-12 text-base"
                                                                                    {...field}
                                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                                                />
                                                                            </FormControl>
                                                                            <FormDescription>
                                                                                {t('modelManager.promptRate')}
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
                                                                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                                                                                <ArrowRight className="h-4 w-4 text-green-500" />
                                                                                {t('modelManager.perCompletion')}
                                                                            </FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    type="number"
                                                                                    step="0.0001"
                                                                                    min="0"
                                                                                    placeholder="0.0000"
                                                                                    className="h-12 text-base"
                                                                                    {...field}
                                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                                                />
                                                                            </FormControl>
                                                                            <FormDescription>
                                                                                {t('modelManager.completionRate')}
                                                                            </FormDescription>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Info className="h-5 w-5 text-blue-600" />
                                                                    <h4 className="font-semibold text-blue-900">{t('modelManager.volumeBilling')}</h4>
                                                                </div>
                                                                <p className="text-sm text-blue-700 leading-relaxed">
                                                                    {t('modelManager.modelPrice')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : watchQuotaType === 2 ? (
                                                        <div className="space-y-8">
                                                            <FormField
                                                                control={form.control}
                                                                name="promptRate"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                                                                            <Target className="h-4 w-4 text-purple-500" />
                                                                            {t('modelManager.perUsage')}
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <div className="flex items-center gap-3">
                                                                                <Input
                                                                                    type="number"
                                                                                    step="0.0001"
                                                                                    min="0"
                                                                                    placeholder="0.0000"
                                                                                    className="h-12 text-base flex-1"
                                                                                    {...field}
                                                                                    onChange={(e) => {
                                                                                        const value = parseFloat(e.target.value) || 0;
                                                                                        field.onChange(value);
                                                                                        setPromptRate(value);
                                                                                    }}
                                                                                />
                                                                                <Badge variant="secondary" className="px-3 py-2 text-sm">
                                                                                    {renderQuota(watchPromptRate || 0, 6)}
                                                                                </Badge>
                                                                            </div>
                                                                        </FormControl>
                                                                        <FormDescription>
                                                                            {t('modelManager.perUsageFee')}
                                                                        </FormDescription>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Info className="h-5 w-5 text-purple-600" />
                                                                    <h4 className="font-semibold text-purple-900">{t('modelManager.perUseBilling')}</h4>
                                                                </div>
                                                                <p className="text-sm text-purple-700 leading-relaxed">
                                                                    {t('modelManager.perUsageFee')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="p-8 text-center">
                                                            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                                            <p className="text-muted-foreground">
                                                                {t('modelManager.selectCategory')}
                                                            </p>
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        )}

                                        {currentStep === 2 && (
                                            <Card className="border-0 shadow-none">
                                                <CardHeader className="px-0 pt-0">
                                                    <CardTitle className="flex items-center gap-3 text-xl">
                                                        <div className="p-2 rounded-lg bg-purple-500/10">
                                                            <Settings className="h-5 w-5 text-purple-600" />
                                                        </div>
                                                        {t('modelManager.advancedSettings')}
                                                    </CardTitle>
                                                    <CardDescription className="text-base">
                                                        {t('common.optional')}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="px-0 space-y-8">
                                                    <div className="space-y-8">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            <FormField
                                                                control={form.control}
                                                                name="audioPromptRate"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                                                                            <Mic className="h-4 w-4 text-orange-500" />
                                                                            {t('modelManager.audioInput')}
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                step="0.0001"
                                                                                min="0"
                                                                                placeholder="0.0000"
                                                                                className="h-12 text-base"
                                                                                {...field}
                                                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                                                            />
                                                                        </FormControl>
                                                                        <FormDescription>
                                                                            {t('modelManager.audioPromptRate')}
                                                                        </FormDescription>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="audioOutputRate"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                                                                            <Speaker className="h-4 w-4 text-blue-500" />
                                                                            {t('modelManager.audioOutput')}
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                step="0.0001"
                                                                                min="0"
                                                                                placeholder="0.0000"
                                                                                className="h-12 text-base"
                                                                                {...field}
                                                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                                                            />
                                                                        </FormControl>
                                                                        <FormDescription>
                                                                            {t('modelManager.audioCompletionRate')}
                                                                        </FormDescription>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="quotaMax"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                                                                            <Database className="h-4 w-4 text-green-500" />
                                                                            {t('modelManager.modelMaxContext')}
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                step="512"
                                                                                min="0"
                                                                                placeholder="128000"
                                                                                className="h-12 text-base"
                                                                                {...field}
                                                                                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                                                                            />
                                                                        </FormControl>
                                                                        <FormDescription>
                                                                            {t('modelManager.enterMaxContext')}
                                                                        </FormDescription>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="defaultContextLength"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                                                                            <Settings className="h-4 w-4 text-purple-500" />
                                                                            {t('modelManager.defaultContextLength')}
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                type="number"
                                                                                step="512"
                                                                                min="0"
                                                                                placeholder="4096"
                                                                                className="h-12 text-base"
                                                                                {...field}
                                                                                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                                                                            />
                                                                        </FormControl>
                                                                        <FormDescription>
                                                                            {t('modelManager.enterDefaultContextLength')}
                                                                        </FormDescription>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>

                                                        <div className="p-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Info className="h-5 w-5 text-amber-600" />
                                                                <h4 className="font-semibold text-amber-900">{t('common.info')}</h4>
                                                            </div>
                                                            <p className="text-sm text-amber-700 leading-relaxed">
                                                                {t('modelManager.advancedSettings')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </ScrollArea>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Footer */}
                        <div className="flex items-center justify-between pt-6 border-t border-border/50">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="gap-2"
                            >
                                {t('common.previous')}
                            </Button>

                            <div className="flex items-center gap-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => {
                                        onClose();
                                        setCurrentStep(0);
                                    }}
                                >
                                    {t('common.cancel')}
                                </Button>

                                {currentStep < STEPS.length - 1 ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!isStepValid(currentStep)}
                                        className="gap-2"
                                    >
                                        {t('common.next')}
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={isLoading || !isStepValid(currentStep)}
                                        className="gap-2 min-w-32 bg-blue-600 hover:bg-blue-700"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                                                {t('common.submitting')}
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                {t('modelManager.updateModel')}
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}