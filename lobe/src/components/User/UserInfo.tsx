import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateInfo, updatePassword } from '../../services/UserService';
import { renderNumber, renderQuota } from '../../utils/render';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { CheckCircle, XCircle, User, Lock, Mail, Edit, Eye, EyeOff } from 'lucide-react';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';

interface UserInfoProps {
  user: any;
  onUpdate?: () => void;
}

const UserInfo = ({ user, onUpdate }: UserInfoProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Create schemas inside component to access t function
  const userInfoSchema = z.object({
    userName: z.string().min(1, t('userProfile.usernameRequired')),
    email: z.string().email(t('userProfile.emailRequired')),
  });

  const passwordSchema = z.object({
    oldPassword: z.string().min(1, t('userProfile.currentPasswordRequired')),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: t('userProfile.passwordMismatch'),
    path: ['confirmPassword'],
  });

  const userInfoForm = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      userName: '',
      email: '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (user) {
      userInfoForm.reset({
        userName: user.userName || '',
        email: user.email || '',
      });
    }
  }, [user, userInfoForm]);

  const handleSubmit = async (values: z.infer<typeof userInfoSchema>) => {
    setLoading(true);
    try {
      const response = await updateInfo({
        id: user.id,
        ...values
      });

      if (response.success) {
        toast.success(t('userProfile.updateSuccess'));
        setIsEditing(false);
        if (onUpdate) onUpdate();
      } else {
        toast.error(response.message || t('userProfile.updateFailed'));
      }
    } catch (error) {
      toast.error(t('userProfile.updateFailed'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values: z.infer<typeof passwordSchema>) => {
    setLoading(true);
    try {
      const response = await updatePassword({
        id: user.id,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      });

      if (response.success) {
        toast.success(t('userProfile.passwordSuccess'));
        setPasswordModalVisible(false);
        passwordForm.reset();
      } else {
        toast.error(response.message || t('userProfile.passwordFailed'));
      }
    } catch (error) {
      console.error(t('userProfile.passwordFailed'), error);
      toast.error(t('userProfile.passwordFailed'));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return t('userProfile.unknown');
    try {
      const date = new Date(dateString);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  const renderUserInfo = () => (
    <div className="space-y-6">
      {/* 用户头像和基本信息 */}
      <div className="text-center space-y-4">
        <Avatar className="h-20 w-20 mx-auto">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            <User className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{user.userName}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Separator />

      {/* 用户详细信息 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">用户名:</span>
              <span>{user.userName}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">邮箱:</span>
              <span>{user.email}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">角色:</span>
              <span>{user.role}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">用户组:</span>
              <div className="flex flex-wrap gap-1">
                {user.groups && user.groups.map((group: any) => (
                  <Badge key={group} variant="secondary" className="text-xs">
                    {group}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">注册时间:</span>
              <span>{formatDate(user.createdAt)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">账户信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">状态:</span>
              <div>
                {user.isDisabled ? (
                  <Badge variant="destructive" className="gap-1">
                    <XCircle className="h-3 w-3" />
                    已禁用
                  </Badge>
                ) : (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    正常
                  </Badge>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">剩余额度:</span>
              <span className="font-semibold">{renderQuota(user.residualCredit || 0)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Token消耗:</span>
              <span>{renderNumber(user.consumeToken || 0)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">请求次数:</span>
              <span>{renderNumber(user.requestCount || 0)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => setIsEditing(true)}
          className="gap-2"
        >
          <Edit className="h-4 w-4" />
          编辑信息
        </Button>
        <Dialog open={passwordModalVisible} onOpenChange={setPasswordModalVisible}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Lock className="h-4 w-4" />
              修改密码
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>修改密码</DialogTitle>
            </DialogHeader>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>当前密码</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder={t('userProfile.currentPasswordPlaceholder')}
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>新密码</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder={t('userProfile.newPasswordPlaceholder')}
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8 w-8 p-0"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>确认新密码</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder={t('userProfile.confirmPasswordPlaceholder')}
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8 w-8 p-0"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPasswordModalVisible(false)}
                    className="flex-1"
                  >
                    取消
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    确认修改
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );

  const renderEditForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>编辑个人信息</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...userInfoForm}>
          <form onSubmit={userInfoForm.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={userInfoForm.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户名</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder={t('userProfile.usernamePlaceholder')} className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userInfoForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>电子邮箱</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder={t('userProfile.emailPlaceholder')} className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                取消
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                保存
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );

  if (!user || Object.keys(user).length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {isEditing ? renderEditForm() : renderUserInfo()}
    </div>
  );
};

export default UserInfo;