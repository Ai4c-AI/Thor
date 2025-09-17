import { toast } from 'sonner';
import { Update } from '../../../services/TokenService'
import { useEffect, useState } from 'react';
import { renderQuota } from '../../../utils/render';
import { getModels } from '../../../services/ModelService';
import { getCurrentList } from '../../../services/UserGroupService';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '../../../components/ui/sheet';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Calendar } from '../../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface UpdateTokenProps {
    onSuccess: () => void;
    visible: boolean;
    onCancel: () => void;
    value?: any;
}

export default function UpdateToken({
    onSuccess,
    visible,
    onCancel,
    value
}: UpdateTokenProps) {
    const { t } = useTranslation();
    const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => {
        getCurrentList()
            .then((res) => {
                setGroups(res.data);
            })
    }, []);
    type FieldType = {
        name?: string;
        unlimitedQuota: boolean;
        remainQuota?: number;
        unlimitedExpired: boolean;
        expiredTime?: Date;
        limitModels: string[];
        whiteIpList: string[];
        groups: string[];
    };
    const [models, setModels] = useState<any>();

    const [input, setInput] = useState<any>({
        name: '',
        unlimitedQuota: false,
        remainQuota: 0,
        unlimitedExpired: false,
        expiredTime: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        limitModels: [],
        whiteIpList: [],
        groups: [],
    });

    function handleSubmit() {
        Update({
            id: value.id,
            ...input
        })
            .then((item) => {
                if (item.success) {
                    toast.success(t('common.updateSuccess') || '修改成功');
                    onSuccess();
                } else {
                    toast.error(item.message);
                }
            })
            .catch(() => {
                toast.error(t('common.operationFailed') || '操作失败');
            });
    }

    useEffect(() => {
        setInput({
            name: value?.name,
            unlimitedQuota: value?.unlimitedQuota,
            remainQuota: value?.remainQuota,
            unlimitedExpired: value?.unlimitedExpired,
            expiredTime: value?.expiredTime,
            limitModels: value?.limitModels,
            whiteIpList: value?.whiteIpList,
            groups: value?.groups
        })

    }, [value])

    function loadModel() {

        getModels()
            .then(res => {
                if (res.success) {
                    setModels(res.data);
                } else {
                    toast.error(res.message);
                }
            })
    }

    useEffect(() => {
        if (visible) {
            loadModel();
        }
    }, [visible]);

    if (!visible) {
        return null;
    }

    return (
        <Sheet open={visible} onOpenChange={(open) => !open && onCancel()}>
            <SheetContent className="sm:max-w-[500px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>{t('token.updateToken') || '修改Token'}</SheetTitle>
                </SheetHeader>

                <div className="space-y-6 py-6">
                    {/* Token Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('token.name') || 'Token名称'} *</Label>
                        <Input
                            id="name"
                            value={input?.name || ''}
                            onChange={(e) => setInput({ ...input, name: e.target.value })}
                            placeholder={t('token.namePlaceholder') || '请输入Token名称'}
                        />
                    </div>

                    {/* Quota Settings */}
                    <Card>
                        <CardContent className="space-y-4 pt-6">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="unlimited-quota">{t('token.unlimitedQuota') || '无限额度'}</Label>
                                <Switch
                                    id="unlimited-quota"
                                    checked={input?.unlimitedQuota || false}
                                    onCheckedChange={(v) => setInput({ ...input, unlimitedQuota: v })}
                                />
                            </div>

                            {!input?.unlimitedQuota && (
                                <div className="space-y-2">
                                    <Label htmlFor="quota">{t('token.quota') || '额度'}</Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id="quota"
                                            type="number"
                                            value={input?.remainQuota || 0}
                                            onChange={(e) => setInput({ ...input, remainQuota: Number(e.target.value) })}
                                            placeholder="0"
                                        />
                                        <Badge variant="outline">{renderQuota(input?.remainQuota ?? 0, 6)}</Badge>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Expiration Settings */}
                    <Card>
                        <CardContent className="space-y-4 pt-6">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="never-expire">{t('token.neverExpire') || '永不过期'}</Label>
                                <Switch
                                    id="never-expire"
                                    checked={input?.unlimitedExpired || false}
                                    onCheckedChange={(v) => setInput({ ...input, unlimitedExpired: v })}
                                />
                            </div>

                            {!input?.unlimitedExpired && (
                                <div className="space-y-2">
                                    <Label>{t('token.expiredTime') || '过期时间'}</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !input?.expiredTime && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {input?.expiredTime ? (
                                                    typeof input.expiredTime === 'string'
                                                        ? input.expiredTime
                                                        : format(input.expiredTime, "PPP")
                                                ) : (t('common.selectDate') || '选择日期')}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={input?.expiredTime ? new Date(input.expiredTime) : undefined}
                                                onSelect={(date) => setInput({ ...input, expiredTime: date })}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Groups */}
                    <div className="space-y-2">
                        <Label>{t('token.groups') || '组'} *</Label>
                        <div className="space-y-2">
                            {groups.map((group) => (
                                <div
                                    key={group.code}
                                    className={cn(
                                        "flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors",
                                        input?.groups?.includes(group.code) ? "bg-primary/10 border-primary" : "hover:bg-muted"
                                    )}
                                    onClick={() => {
                                        const currentGroups = input?.groups || [];
                                        const newGroups = currentGroups.includes(group.code)
                                            ? currentGroups.filter(g => g !== group.code)
                                            : [group.code]; // Only allow one group
                                        setInput({ ...input, groups: newGroups });
                                    }}
                                >
                                    <div className="flex-1">
                                        <div className="font-medium">{group.name}</div>
                                        <div className="text-sm text-muted-foreground">{group.description}</div>
                                        <Badge variant="outline" className="mt-1">
                                            {t('token.rate') || '倍率'}: {group.rate}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Model Restrictions */}
                    <div className="space-y-2">
                        <Label>{t('token.limitModels') || '限制使用模型（不填则不限制）'}</Label>
                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                                {(input?.limitModels || []).map((model: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                        {model}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() => {
                                                const limitModels = input?.limitModels || [];
                                                setInput({
                                                    ...input,
                                                    limitModels: limitModels.filter((_, i) => i !== index)
                                                });
                                            }}
                                        />
                                    </Badge>
                                ))}
                            </div>
                            <Select
                                onValueChange={(value) => {
                                    const limitModels = input?.limitModels || [];
                                    if (!limitModels.includes(value)) {
                                        setInput({ ...input, limitModels: [...limitModels, value] });
                                    }
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('token.selectModels') || '选择模型'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {models && models.filter((model: string) => !(input?.limitModels || []).includes(model)).map((model: string) => (
                                        <SelectItem key={model} value={model}>{model}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* IP Whitelist */}
                    <div className="space-y-2">
                        <Label>{t('token.whiteIpList') || 'IP白名单'}</Label>
                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                                {(input?.whiteIpList || []).map((ip: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                        {ip}
                                        <X
                                            className="h-3 w-3 cursor-pointer"
                                            onClick={() => {
                                                const whiteIpList = input?.whiteIpList || [];
                                                setInput({
                                                    ...input,
                                                    whiteIpList: whiteIpList.filter((_, i) => i !== index)
                                                });
                                            }}
                                        />
                                    </Badge>
                                ))}
                            </div>
                            <Input
                                placeholder={t('token.addIp') || '输入IP地址后按Enter添加'}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const value = e.currentTarget.value.trim();
                                        const whiteIpList = input?.whiteIpList || [];
                                        if (value && !whiteIpList.includes(value)) {
                                            setInput({ ...input, whiteIpList: [...whiteIpList, value] });
                                            e.currentTarget.value = '';
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                <SheetFooter>
                    <Button variant="outline" onClick={onCancel}>
                        {t('common.cancel') || '取消'}
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!input?.name || (input?.groups?.length || 0) === 0}
                    >
                        {t('common.submit') || '提交'}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}