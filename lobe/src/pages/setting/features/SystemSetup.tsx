import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Separator } from '../../../components/ui/separator';
import { toast } from "sonner";
import { SystemSetting, UpdateSetting } from '../../../services/SettingService';
import { useTranslation } from 'react-i18next';

interface SystemSetupProps {
    settings: Array<{ key: string; value: string }>;
    setSettings?: (settings: Array<{ key: string; value: string }>) => void;
}

export default function SystemSetup({
    settings,
    setSettings
}: SystemSetupProps) {
    const [input, setInput] = useState<Record<string, string>>({});
    const { t } = useTranslation();
    

    useEffect(() => {
        const initialValues = settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {});
        setInput(initialValues);
    }, [settings]);

    function handleSubmit() {
        UpdateSetting(settings)
            .then((res) => {
                if (res.success) {
                    toast.success(t('settingPage.general.saveSuccess'));
                } else {
                    toast.error(t('settingPage.general.saveFailed'));
                }
            });
    }

    const handleInputChange = (key: string, value: string) => {
        setInput((prevInput: Record<string, string>) => ({
            ...prevInput,
            [key]: value
        }));
        const setting = settings.find(s => s.key === key);
        if (setting) {
            setting.value = value;
        }

        setSettings(settings);
    };

    return (
        <div className="space-y-6">
            {/* General Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('settingPage.general.title')}</CardTitle>
                    <CardDescription>Configure basic system settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="serverAddress">{t('settingPage.system.serverAddress')}</Label>
                        <Input
                            id="serverAddress"
                            value={input[SystemSetting.ServerAddress] || ''}
                            onChange={(e) => handleInputChange(SystemSetting.ServerAddress, e.target.value)}
                            placeholder={t('settingPage.system.serverAddress')}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('settingPage.system.accountSettings')}</CardTitle>
                    <CardDescription>Manage user authentication and registration settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Registration Settings */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="enableRegister">{t('settingPage.system.enableRegister')}</Label>
                            <p className="text-sm text-muted-foreground">Allow new users to register</p>
                        </div>
                        <Switch
                            id="enableRegister"
                            checked={input[SystemSetting.EnableRegister] === 'true'}
                            onCheckedChange={(checked) => handleInputChange(SystemSetting.EnableRegister, checked ? 'true' : 'false')}
                        />
                    </div>

                    <Separator />

                    {/* GitHub Settings */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">{t('settingPage.system.gitHubSettings')}</h4>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="enableGithubLogin">{t('settingPage.system.enableGithubLogin')}</Label>
                                <p className="text-sm text-muted-foreground">Enable GitHub OAuth login</p>
                            </div>
                            <Switch
                                id="enableGithubLogin"
                                checked={input[SystemSetting.EnableGithubLogin] === 'true'}
                                onCheckedChange={(checked) => handleInputChange(SystemSetting.EnableGithubLogin, checked ? 'true' : 'false')}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="githubClientId">{t('settingPage.system.githubClientId')}</Label>
                                <Input
                                    id="githubClientId"
                                    value={input[SystemSetting.GithubClientId] || ''}
                                    onChange={(e) => handleInputChange(SystemSetting.GithubClientId, e.target.value)}
                                    placeholder={t('settingPage.system.githubClientId')}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="githubClientSecret">{t('settingPage.system.githubClientSecret')}</Label>
                                <Input
                                    id="githubClientSecret"
                                    type="password"
                                    value={input[SystemSetting.GithubClientSecret] || ''}
                                    onChange={(e) => handleInputChange(SystemSetting.GithubClientSecret, e.target.value)}
                                    placeholder={t('settingPage.system.githubClientSecret')}
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Gitee Settings */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">{t('settingPage.system.giteeSettings')}</h4>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="enableGiteeLogin">{t('settingPage.system.enableGiteeLogin')}</Label>
                                <p className="text-sm text-muted-foreground">Enable Gitee OAuth login</p>
                            </div>
                            <Switch
                                id="enableGiteeLogin"
                                checked={input[SystemSetting.EnableGiteeLogin] === 'true'}
                                onCheckedChange={(checked) => handleInputChange(SystemSetting.EnableGiteeLogin, checked ? 'true' : 'false')}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="giteeClientId">{t('settingPage.system.giteeClientId')}</Label>
                                <Input
                                    id="giteeClientId"
                                    value={input[SystemSetting.GiteeClientId] || ''}
                                    onChange={(e) => handleInputChange(SystemSetting.GiteeClientId, e.target.value)}
                                    placeholder={t('settingPage.system.giteeClientId')}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="giteeClientSecret">{t('settingPage.system.giteeClientSecret')}</Label>
                                <Input
                                    id="giteeClientSecret"
                                    type="password"
                                    value={input[SystemSetting.GiteeClientSecret] || ''}
                                    onChange={(e) => handleInputChange(SystemSetting.GiteeClientSecret, e.target.value)}
                                    placeholder={t('settingPage.system.giteeClientSecret')}
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Email Settings */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">{t('settingPage.system.emailSettings')}</h4>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="enableEmailRegister">{t('settingPage.system.enableEmailRegister')}</Label>
                                <p className="text-sm text-muted-foreground">Enable email registration</p>
                            </div>
                            <Switch
                                id="enableEmailRegister"
                                checked={input[SystemSetting.EnableEmailRegister] === 'true'}
                                onCheckedChange={(checked) => handleInputChange(SystemSetting.EnableEmailRegister, checked ? 'true' : 'false')}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="emailAddress">{t('settingPage.system.emailAddress')}</Label>
                                <Input
                                    id="emailAddress"
                                    type="email"
                                    value={input[SystemSetting.EmailAddress] || ''}
                                    onChange={(e) => handleInputChange(SystemSetting.EmailAddress, e.target.value)}
                                    placeholder={t('settingPage.system.emailAddress')}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="emailPassword">{t('settingPage.system.emailPassword')}</Label>
                                <Input
                                    id="emailPassword"
                                    type="password"
                                    value={input[SystemSetting.EmailPassword] || ''}
                                    onChange={(e) => handleInputChange(SystemSetting.EmailPassword, e.target.value)}
                                    placeholder={t('settingPage.system.emailPassword')}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="smtpAddress">{t('settingPage.system.smtpAddress')}</Label>
                                <Input
                                    id="smtpAddress"
                                    value={input[SystemSetting.SmtpAddress] || ''}
                                    onChange={(e) => handleInputChange(SystemSetting.SmtpAddress, e.target.value)}
                                    placeholder={t('settingPage.system.smtpAddress')}
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Casdoor Settings */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">{t('settingPage.system.casdoorSettings')}</h4>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="enableCasdoorAuth">{t('settingPage.system.enableCasdoorAuth')}</Label>
                                <p className="text-sm text-muted-foreground">Enable Casdoor authentication</p>
                            </div>
                            <Switch
                                id="enableCasdoorAuth"
                                checked={input[SystemSetting.EnableCasdoorAuth] === 'true'}
                                onCheckedChange={(checked) => handleInputChange(SystemSetting.EnableCasdoorAuth, checked ? 'true' : 'false')}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="casdoorEndpoint">{t('settingPage.system.casdoorEndpoint')}</Label>
                                <Input
                                    id="casdoorEndpoint"
                                    value={input[SystemSetting.CasdoorEndipoint] || ''}
                                    onChange={(e) => handleInputChange(SystemSetting.CasdoorEndipoint, e.target.value)}
                                    placeholder={t('settingPage.system.casdoorEndpoint')}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="casdoorClientId">{t('settingPage.system.casdoorClientId')}</Label>
                                <Input
                                    id="casdoorClientId"
                                    value={input[SystemSetting.CasdoorClientId] || ''}
                                    onChange={(e) => handleInputChange(SystemSetting.CasdoorClientId, e.target.value)}
                                    placeholder={t('settingPage.system.casdoorClientId')}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="casdoorClientSecret">{t('settingPage.system.casdoorClientSecret')}</Label>
                                <Input
                                    id="casdoorClientSecret"
                                    type="password"
                                    value={input[SystemSetting.CasdoorClientSecret] || ''}
                                    onChange={(e) => handleInputChange(SystemSetting.CasdoorClientSecret, e.target.value)}
                                    placeholder={t('settingPage.system.casdoorClientSecret')}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button onClick={handleSubmit} className="w-full sm:w-auto">
                    {t('settingPage.general.save')}
                </Button>
            </div>
        </div>
    );
}