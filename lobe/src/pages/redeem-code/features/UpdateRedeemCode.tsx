import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface UpdateRedeemCodeProps {
    onSuccess: () => void;
    visible: boolean;
    onCancel: () => void;
    value?: any;
}

export default function UpdateRedeemCode({
    visible,
    onCancel,
    value,
    onSuccess
}: UpdateRedeemCodeProps) {
    const { t } = useTranslation();
    

    const [input, setInput] = useState<any>({
        name: '',
        remainQuota: '',
        unlimitedQuota: false,
        expiredTime: null,
        unlimitedExpired: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (value) {
            setInput({
                name: value?.name || '',
                remainQuota: value?.remainQuota || '',
                unlimitedQuota: value?.unlimitedQuota || false,
                expiredTime: value?.expiredTime ? new Date(value.expiredTime) : null,
                unlimitedExpired: value?.unlimitedExpired || false,
            });
        }
    }, [value]);

    const validateForm = () => {
        const newErrors: any = {};

        if (!input.name.trim()) {
            newErrors.name = t('redeemCode.nameRequired') || 'Token名称不能为空';
        } else if (input.name.length < 3) {
            newErrors.name = t('redeemCode.nameMinLength') || 'Token名称长度不能小于3';
        }

        if (!input.unlimitedQuota && (!input.remainQuota || input.remainQuota < 0)) {
            newErrors.remainQuota = t('redeemCode.quotaRequired') || '额度不能为空';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate API call since the actual Update function is commented out
        setTimeout(() => {
            toast.success(t('common.operateSuccess') || '修改成功');
            onSuccess?.();
            setIsLoading(false);
        }, 1000);

        // TODO: Uncomment when Update function is available
        // Update(input)
        //     .then(() => {
        //         toast({
        //             title: t('common.operateSuccess') || '修改成功',
        //         });
        //         onSuccess?.();
        //     })
        //     .catch(() => {
        //         toast({
        //             title: t('common.operateFailed') || '修改失败',
        //             variant: "destructive",
        //         });
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     });
    }

    const resetForm = () => {
        setInput({
            name: '',
            remainQuota: '',
            unlimitedQuota: false,
            expiredTime: null,
            unlimitedExpired: false,
        });
        setErrors({});
    };

    const handleCancel = () => {
        resetForm();
        onCancel();
    };

    return (
        <Sheet open={visible} onOpenChange={(open) => !open && handleCancel()}>
            <SheetContent className="w-[500px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>{t('redeemCode.updateRedeemCode') || '修改兑换码'}</SheetTitle>
                    <SheetDescription>
                        {t('redeemCode.updateDescription') || '修改兑换码的配置信息'}
                    </SheetDescription>
                </SheetHeader>

                <Separator className="my-4" />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('redeemCode.name') || 'Token名称'}</Label>
                        <Input
                            id="name"
                            value={input.name}
                            onChange={(e) => {
                                setInput({ ...input, name: e.target.value });
                                if (errors.name) {
                                    setErrors({ ...errors, name: null });
                                }
                            }}
                            placeholder={t('redeemCode.namePlaceholder') || '请输入token名称'}
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    {!input.unlimitedQuota && (
                        <div className="space-y-2">
                            <Label htmlFor="quota">{t('redeemCode.quota') || '额度'}</Label>
                            <Input
                                id="quota"
                                type="number"
                                value={input.remainQuota}
                                onChange={(e) => {
                                    setInput({ ...input, remainQuota: Number(e.target.value) });
                                    if (errors.remainQuota) {
                                        setErrors({ ...errors, remainQuota: null });
                                    }
                                }}
                                placeholder={t('redeemCode.quotaPlaceholder') || '请输入token额度'}
                                className={errors.remainQuota ? 'border-red-500' : ''}
                            />
                            {errors.remainQuota && (
                                <p className="text-sm text-red-500">{errors.remainQuota}</p>
                            )}
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="unlimited-quota"
                            checked={input.unlimitedQuota}
                            onCheckedChange={(checked) =>
                                setInput({ ...input, unlimitedQuota: !!checked })
                            }
                        />
                        <Label htmlFor="unlimited-quota">
                            {t('redeemCode.unlimitedQuota') || '无限额度'}
                        </Label>
                    </div>

                    {!input.unlimitedExpired && (
                        <div className="space-y-2">
                            <Label>{t('redeemCode.expiredTime') || '过期时间'}</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !input.expiredTime && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {input.expiredTime ? (
                                            format(input.expiredTime, "PPP")
                                        ) : (
                                            <span>{t('redeemCode.selectDate') || '选择日期'}</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={input.expiredTime}
                                        onSelect={(date) => setInput({ ...input, expiredTime: date })}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="unlimited-expired"
                            checked={input.unlimitedExpired}
                            onCheckedChange={(checked) =>
                                setInput({ ...input, unlimitedExpired: !!checked })
                            }
                        />
                        <Label htmlFor="unlimited-expired">
                            {t('redeemCode.neverExpired') || '永不过期'}
                        </Label>
                    </div>

                    <Separator />

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            className="flex-1"
                            disabled={isLoading}
                        >
                            {t('common.cancel') || '取消'}
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={isLoading}
                        >
                            {isLoading ? (t('common.submitting') || '提交中...') : (t('common.submit') || '提交')}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}