import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { create } from "../../../services/UserService";
import { getList } from "../../../services/UserGroupService";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

interface CreateUserProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

interface FormData {
    userName: string;
    email: string;
    password: string;
    role: string;
    groups: string[];
}

export default function CreateUser({
    visible,
    onCancel,
    onSuccess
}: CreateUserProps) {
    const { t } = useTranslation();
    const [groupOptions, setGroupOptions] = useState<any[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

    const form = useForm<FormData>({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            role: 'user',
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

    function handleSubmit(data: FormData) {
        const submitData = {
            ...data,
            groups: selectedGroups
        };

        create(submitData)
            .then((res) => {
                if (res.success) {
                    toast.success(t('common.createSuccess') || '创建成功');
                    onSuccess();
                    handleClose();
                } else {
                    toast.error(res.message || t('common.createFailed') || '创建失败');
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
                    <DialogTitle>{t('user.createUser') || '创建用户'}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="userName"
                            rules={{ required: t('user.userNameRequired') || '请输入用户名' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('user.userName') || '用户名'}</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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

                        <FormField
                            control={form.control}
                            name="password"
                            rules={{ required: t('user.passwordRequired') || '请输入密码' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('user.password') || '密码'}</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            rules={{ required: t('user.roleRequired') || '请选择角色' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('user.role') || '角色'}</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('user.selectRole') || '请选择角色'} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="user">{t('user.roleUser') || '用户'}</SelectItem>
                                            <SelectItem value="admin">{t('user.roleAdmin') || '管理员'}</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={handleClose}>
                                {t('common.cancel') || '取消'}
                            </Button>
                            <Button type="submit">
                                {t('common.submit') || '提交'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}