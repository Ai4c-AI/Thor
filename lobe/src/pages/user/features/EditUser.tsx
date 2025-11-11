import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { update } from "../../../services/UserService";
import { getList } from "../../../services/UserGroupService";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

interface EditUserProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    user: any;
}

interface FormData {
    id: string;
    email: string;
    groups: string[];
}

export default function EditUser({
    visible,
    onCancel,
    onSuccess,
    user
}: EditUserProps) {
    const { t } = useTranslation();
    const [groupOptions, setGroupOptions] = useState<any[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

    const form = useForm<FormData>({
        defaultValues: {
            id: '',
            email: '',
            groups: []
        }
    });

    useEffect(() => {
        if (visible) {
            getList().then(res => {
                if (res.success) {
                    setGroupOptions(res.data || []);
                } else {
                    toast.error(t('user.getGroupsFailed') || '获取用户分组失败');
                }
            });
        }
    }, [visible, t]);

    useEffect(() => {
        if (user && visible) {
            form.reset({
                id: user.id || '',
                email: user.email || '',
                groups: user.groups || []
            });
            setSelectedGroups(user.groups || []);
        }
    }, [user, visible, form]);

    function handleSubmit(data: FormData) {
        const submitData = {
            ...data,
            groups: selectedGroups
        };

        update(submitData)
            .then((res) => {
                if (res.success) {
                    toast.success(t('common.updateSuccess') || '更新成功');
                    onSuccess();
                    handleClose();
                } else {
                    toast.error(res.message || t('common.updateFailed') || '更新失败');
                }
            })
            .catch(() => {
                toast.error(t('common.operationFailed') || '操作失败');
            });
    }

    function handleClose() {
        form.reset();
        setSelectedGroups([]);
        onCancel();
    }

    function addGroup(groupCode: string) {
        if (!selectedGroups.includes(groupCode)) {
            setSelectedGroups([...selectedGroups, groupCode]);
        }
    }

    function removeGroup(groupCode: string) {
        setSelectedGroups(selectedGroups.filter(g => g !== groupCode));
    }

    return (
        <Dialog open={visible} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{t('user.editUser') || '编辑用户'}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            rules={{
                                required: t('user.emailRequired') || '请输入邮箱',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: t('user.emailInvalid') || '请输入有效的邮箱地址'
                                }
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('user.email') || '邮箱'}</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                {t('user.groups') || '分组'}
                            </label>
                            <Select onValueChange={addGroup}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('user.selectGroups') || '请选择用户组'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {groupOptions.map(group => (
                                        <SelectItem
                                            key={group.code}
                                            value={group.code}
                                            disabled={selectedGroups.includes(group.code)}
                                        >
                                            {group.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {selectedGroups.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedGroups.map(groupCode => {
                                        const group = groupOptions.find(g => g.code === groupCode);
                                        return (
                                            <Badge key={groupCode} variant="secondary" className="flex items-center gap-1">
                                                {group?.name || groupCode}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => removeGroup(groupCode)}
                                                />
                                            </Badge>
                                        );
                                    })}
                                </div>
                            )}

                            {selectedGroups.length === 0 && (
                                <p className="text-sm text-red-500">
                                    {t('user.groupsRequired') || '请选择至少一个分组'}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={handleClose}>
                                {t('common.cancel') || '取消'}
                            </Button>
                            <Button
                                type="submit"
                                disabled={selectedGroups.length === 0}
                            >
                                {t('common.submit') || '提交'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 