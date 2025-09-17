import { toast } from 'sonner';
import { Add } from '../../../services/TokenService'
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


interface CreateTokenProps {
    onSuccess: () => void;
    visible: boolean;
    onCancel: () => void;
}

export default function CreateToken({
    onSuccess,
    visible,
    onCancel
}: CreateTokenProps) {
    const { t } = useTranslation();
    const [models, setModels] = useState<any>();
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

    const [input, setInput] = useState<FieldType>({
        name: '',
        unlimitedQuota: false,
        remainQuota: 0,
        unlimitedExpired: false,
        groups: [],
        limitModels: [],
        expiredTime: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        whiteIpList: []
    });

    function handleSubmit() {
        Add(input)
            .then((item) => {
                if (item.success) {
                    toast.success(t('common.createSuccess') || '创建成功');
                    onSuccess();
                    resetForm();
                } else {
                    toast.error(item.message);
                }
            })
            .catch(() => {
                toast.error(t('common.operationFailed') || '操作失败');
            });
    }

    function resetForm() {
        setInput({
            name: '',
            unlimitedQuota: false,
            remainQuota: 0,
            unlimitedExpired: false,
            groups: [],
            limitModels: [],
            expiredTime: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            whiteIpList: []
        });
    }

    return (
        <Sheet open={visible} onOpenChange={(open) => !open && onCancel()}>
            <SheetContent className="sm:max-w-[600px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>{t('token.createToken') || '创建Token'}</SheetTitle>
                </SheetHeader>

                <div className="space-y-8 py-6">
                    {/* Token Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('token.name') || 'Token名称'} *</Label>
                        <Input
                            id="name"
                            value={input.name}
                            onChange={(e) => setInput({ ...input, name: e.target.value })}
                            placeholder={t('token.namePlaceholder') || '请输入Token名称'}
                            className={cn(
                                !input.name?.trim() && "border-red-200 focus:border-red-300"
                            )}
                        />
                        {!input.name?.trim() && (
                            <p className="text-xs text-red-600">请输入Token名称</p>
                        )}
                    </div>

                    {/* Token Configuration */}
                    <Card>
                        <CardContent className="space-y-6 pt-6">
                            {/* Quota Settings Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-base font-medium">{t('token.unlimitedQuota') || '无限额度'}</Label>
                                        <p className="text-sm text-muted-foreground">{t('token.unlimitedQuotaDesc') || '启用后Token将不受额度限制'}</p>
                                    </div>
                                    <Switch
                                        checked={input.unlimitedQuota}
                                        onCheckedChange={(v) => setInput({ ...input, unlimitedQuota: v })}
                                    />
                                </div>

                                {!input.unlimitedQuota && (
                                    <div className="space-y-2">
                                        <Label htmlFor="quota">{t('token.quota') || '额度'}</Label>
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                id="quota"
                                                type="number"
                                                value={input.remainQuota}
                                                onChange={(e) => setInput({ ...input, remainQuota: Number(e.target.value) })}
                                                placeholder="0"
                                                className="flex-1"
                                            />
                                            <Badge variant="outline" className="min-w-fit">
                                                {renderQuota(input.remainQuota ?? 0, 6)}
                                            </Badge>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Expiration Settings Section */}
                            <div className="space-y-4 border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-base font-medium">{t('token.neverExpire') || '永不过期'}</Label>
                                        <p className="text-sm text-muted-foreground">{t('token.neverExpireDesc') || '启用后Token将永不过期'}</p>
                                    </div>
                                    <Switch
                                        checked={input.unlimitedExpired}
                                        onCheckedChange={(v) => setInput({ ...input, unlimitedExpired: v })}
                                    />
                                </div>

                                {!input.unlimitedExpired && (
                                    <div className="space-y-2">
                                        <Label>{t('token.expiredTime') || '过期时间'}</Label>
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
                                                    {input.expiredTime ? format(input.expiredTime, "PPP") : t('common.selectDate') || '选择日期'}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={input.expiredTime}
                                                    onSelect={(date) => setInput({ ...input, expiredTime: date })}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Groups */}
                    <div className="space-y-3">
                        <div>
                            <Label className="text-base font-medium">{t('token.groups') || '用户组'} *</Label>
                            <p className="text-sm text-muted-foreground">{t('token.userGroupDesc') || '选择Token所属的用户组'}</p>
                        </div>
                        <Select
                            value={input.groups[0] || ""}
                            onValueChange={(value) => setInput({ ...input, groups: [value] })}
                        >
                            <SelectTrigger className={cn(
                                "w-full",
                                input.groups.length === 0 && "border-red-200 focus:border-red-300"
                            )}>
                                <SelectValue placeholder={t('token.selectUserGroup') || '请选择用户组'} />
                            </SelectTrigger>
                            <SelectContent>
                                {groups.map((group) => (
                                    <SelectItem key={group.code} value={group.code}>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{group.name}</span>
                                                <span className="text-xs text-muted-foreground">{group.description}</span>
                                            </div>
                                            <Badge variant="outline" className="ml-2">
                                                {t('token.rate') || '倍率'}: {group.rate}
                                            </Badge>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {input.groups.length === 0 && (
                            <p className="text-xs text-red-600">请选择一个用户组</p>
                        )}
                    </div>

                    {/* Advanced Settings */}
                    <Card>
                        <CardContent className="space-y-6 pt-6">
                            <div>
                                <Label className="text-base font-medium">{t('token.advancedSettings') || '高级设置'}</Label>
                                <p className="text-sm text-muted-foreground">{t('token.advancedSettingsDesc') || '可选配置，用于限制Token的使用范围'}</p>
                            </div>

                            {/* Model Restrictions */}
                            <div className="space-y-3">
                                <div>
                                    <Label className="text-sm font-medium">{t('token.modelLimitLabel') || '模型限制'}</Label>
                                    <p className="text-xs text-muted-foreground">{t('token.modelLimitDesc') || '限制该Token可以使用的模型，不选择则无限制'}</p>
                                </div>
                                <div className="space-y-3">
                                    {input.limitModels.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {input.limitModels.map((model: string, index: number) => (
                                                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                    {model}
                                                    <X
                                                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                                                        onClick={() => {
                                                            setInput({
                                                                ...input,
                                                                limitModels: input.limitModels.filter((_, i) => i !== index)
                                                            });
                                                        }}
                                                    />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                    <Select
                                        onValueChange={(value) => {
                                            if (!input.limitModels.includes(value)) {
                                                setInput({ ...input, limitModels: [...input.limitModels, value] });
                                            }
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={t('token.selectAvailableModels') || '选择可用模型'} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {models && models.filter((model: string) => !input.limitModels.includes(model)).map((model: string) => (
                                                <SelectItem key={model} value={model}>{model}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* IP Whitelist */}
                            <div className="space-y-3 border-t pt-4">
                                <div>
                                    <Label className="text-sm font-medium">{t('token.whiteIpList') || 'IP白名单'}</Label>
                                    <p className="text-xs text-muted-foreground">{t('token.ipWhitelistDesc') || '限制该Token只能从指定IP地址使用，不设置则无限制'}</p>
                                </div>
                                <div className="space-y-3">
                                    {input.whiteIpList.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {input.whiteIpList.map((ip: string, index: number) => (
                                                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                    {ip}
                                                    <X
                                                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                                                        onClick={() => {
                                                            setInput({
                                                                ...input,
                                                                whiteIpList: input.whiteIpList.filter((_, i) => i !== index)
                                                            });
                                                        }}
                                                    />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                    <Input
                                        placeholder={t('token.addIp') || '输入IP地址后按Enter添加'}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const value = e.currentTarget.value.trim();
                                                if (value && !input.whiteIpList.includes(value)) {
                                                    setInput({ ...input, whiteIpList: [...input.whiteIpList, value] });
                                                    e.currentTarget.value = '';
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <SheetFooter className="gap-2">
                    <Button variant="outline" onClick={onCancel} className="flex-1">
                        {t('common.cancel') || '取消'}
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!input.name?.trim() || input.groups.length === 0}
                        className="flex-1"
                    >
                        {t('token.createToken') || '创建Token'}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}