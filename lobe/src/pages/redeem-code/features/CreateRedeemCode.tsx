import { useState } from "react";
import { Add } from "@/services/RedeemCodeService";
import { renderQuota } from "@/utils/render";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface CreateRedeemCodeProps {
    onSuccess: () => void;
    visible: boolean;
    onCancel: () => void;
}

export default function CreateRedeemCode({
    onSuccess,
    visible,
    onCancel
}: CreateRedeemCodeProps) {
    const { t } = useTranslation();
    

    const [input, setInput] = useState<any>({
        name: '',
        quota: 0,
        count: 1
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const validateForm = () => {
        const newErrors: any = {};

        if (!input.name.trim()) {
            newErrors.name = t('redeemCode.nameRequired') || '名称不能为空';
        }

        if (!input.quota || input.quota < 0) {
            newErrors.quota = t('redeemCode.quotaRequired') || '额度不能小于0';
        }

        if (!input.count || input.count < 1) {
            newErrors.count = t('redeemCode.countRequired') || '生成数量不能小于1';
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

        Add({
            name: input.name,
            quota: input.quota,
            count: input.count
        })
            .then((item) => {
                if (item.success) {
                    toast.success(t('common.operateSuccess') || '操作成功');

                    if (item.data.length > 1) {
                        const blob = new Blob([item.data.join('\n')], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = '兑换码.txt';
                        a.click();
                        URL.revokeObjectURL(url);
                    }

                    onSuccess();
                    resetForm();
                } else {
                    toast.error(t('common.operateFailed') || '操作失败');
                }
            })
            .catch(() => {
                toast.error(t('common.operateFailed') || '操作失败');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const resetForm = () => {
        setInput({
            name: '',
            quota: 0,
            count: 1
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
                    <SheetTitle>{t('redeemCode.createRedeemCode') || '创建兑换码'}</SheetTitle>
                    <SheetDescription>
                        {t('redeemCode.createDescription') || '创建新的兑换码用于用户充值'}
                    </SheetDescription>
                </SheetHeader>

                <Separator className="my-4" />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('redeemCode.name') || '名称'}</Label>
                        <Input
                            id="name"
                            value={input.name}
                            onChange={(e) => {
                                setInput({ ...input, name: e.target.value });
                                if (errors.name) {
                                    setErrors({ ...errors, name: null });
                                }
                            }}
                            placeholder={t('redeemCode.namePlaceholder') || '请输入名称'}
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="quota">{t('redeemCode.quota') || '额度'}</Label>
                        <div className="relative">
                            <Input
                                id="quota"
                                type="number"
                                value={input.quota}
                                onChange={(e) => {
                                    setInput({ ...input, quota: Number(e.target.value) });
                                    if (errors.quota) {
                                        setErrors({ ...errors, quota: null });
                                    }
                                }}
                                placeholder={t('redeemCode.quotaPlaceholder') || '请输入额度'}
                                className={errors.quota ? 'border-red-500 pr-24' : 'pr-24'}
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                <Badge variant="secondary" className="text-xs">
                                    {renderQuota(input.quota ?? 0, 6)}
                                </Badge>
                            </div>
                        </div>
                        {errors.quota && (
                            <p className="text-sm text-red-500">{errors.quota}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="count">{t('redeemCode.count') || '生成数量'}</Label>
                        <Input
                            id="count"
                            type="number"
                            value={input.count}
                            onChange={(e) => {
                                setInput({ ...input, count: Number(e.target.value) });
                                if (errors.count) {
                                    setErrors({ ...errors, count: null });
                                }
                            }}
                            placeholder={t('redeemCode.countPlaceholder') || '请输入生成数量'}
                            min={1}
                            className={errors.count ? 'border-red-500' : ''}
                        />
                        {errors.count && (
                            <p className="text-sm text-red-500">{errors.count}</p>
                        )}
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