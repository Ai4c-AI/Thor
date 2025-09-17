import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { toast } from "sonner";
import { GeneralSetting, UpdateSetting } from "../../../services/SettingService";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ServiceSetupProps {
    settings: Array<{ key: string; value: string }>;
    setSettings?: (settings: Array<{ key: string; value: string }>) => void;
}

export default function ServiceSetup({
    settings,
    setSettings
}: ServiceSetupProps) {
    const [input, setInput] = useState<Record<string, string>>({});
    const { t } = useTranslation();
    

    useEffect(() => {
        const initialValues = settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {});
        setInput(initialValues);
    }, [settings])

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
            {/* General Service Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('settingPage.general.title')}</CardTitle>
                    <CardDescription>Configure basic service settings and links</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="rechargeAddress">{t('settingPage.service.rechargeAddress')}</Label>
                            <Input
                                id="rechargeAddress"
                                value={input[GeneralSetting.RechargeAddress] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.RechargeAddress, e.target.value)}
                                placeholder={t('settingPage.service.rechargeAddress')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="chatLink">{t('settingPage.service.chatLink')}</Label>
                            <Input
                                id="chatLink"
                                value={input[GeneralSetting.ChatLink] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.ChatLink, e.target.value)}
                                placeholder={t('settingPage.service.chatLink')}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quota Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('settingPage.service.quotaSettings')}</CardTitle>
                    <CardDescription>Manage user quotas and limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="newUserQuota">{t('settingPage.service.newUserQuota')}</Label>
                            <Input
                                id="newUserQuota"
                                type="number"
                                value={input[GeneralSetting.NewUserQuota] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.NewUserQuota, e.target.value)}
                                placeholder={t('settingPage.service.newUserQuota')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="requestQuota">{t('settingPage.service.requestQuota')}</Label>
                            <Input
                                id="requestQuota"
                                type="number"
                                value={input[GeneralSetting.RequestQuota] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.RequestQuota, e.target.value)}
                                placeholder={t('settingPage.service.requestQuota')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="inviteQuota">{t('settingPage.service.inviteQuota')}</Label>
                            <Input
                                id="inviteQuota"
                                type="number"
                                value={input[GeneralSetting.InviteQuota] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.InviteQuota, e.target.value)}
                                placeholder={t('settingPage.service.inviteQuota')}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Log Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('settingPage.service.logSettings')}</CardTitle>
                    <CardDescription>Configure logging and data retention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="enableClearLog">{t('settingPage.service.enableClearLog')}</Label>
                            <p className="text-sm text-muted-foreground">Automatically clear old logs</p>
                        </div>
                        <Switch
                            id="enableClearLog"
                            checked={input[GeneralSetting.EnableClearLog] === 'true'}
                            onCheckedChange={(checked) => handleInputChange(GeneralSetting.EnableClearLog, checked ? 'true' : 'false')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="intervalDays">{t('settingPage.service.intervalDays')}</Label>
                        <Input
                            id="intervalDays"
                            type="number"
                            value={input[GeneralSetting.IntervalDays] || ''}
                            onChange={(e) => handleInputChange(GeneralSetting.IntervalDays, e.target.value)}
                            placeholder={t('settingPage.service.intervalDays')}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Channel Monitoring */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('settingPage.service.channelMonitoring')}</CardTitle>
                    <CardDescription>Monitor and manage AI channels automatically</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="enableAutoCheckChannel">{t('settingPage.service.enableAutoCheckChannel')}</Label>
                            <p className="text-sm text-muted-foreground">Automatically check channel status</p>
                        </div>
                        <Switch
                            id="enableAutoCheckChannel"
                            checked={input[GeneralSetting.EnableAutoCheckChannel] === 'true'}
                            onCheckedChange={(checked) => handleInputChange(GeneralSetting.EnableAutoCheckChannel, checked ? 'true' : 'false')}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="checkInterval">{t('settingPage.service.checkInterval')}</Label>
                            <Input
                                id="checkInterval"
                                type="number"
                                value={input[GeneralSetting.CheckInterval] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.CheckInterval, e.target.value)}
                                placeholder={t('settingPage.service.checkInterval')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="autoDisableChannel">{t('settingPage.service.autoDisableChannel')}</Label>
                                <p className="text-sm text-muted-foreground">Auto-disable failed channels</p>
                            </div>
                            <Switch
                                id="autoDisableChannel"
                                checked={input[GeneralSetting.AutoDisableChannel] === 'true'}
                                onCheckedChange={(checked) => handleInputChange(GeneralSetting.AutoDisableChannel, checked ? 'true' : 'false')}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Alipay Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('settingPage.service.alipaySettings')}</CardTitle>
                    <CardDescription>Configure Alipay payment integration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="alipayNotifyUrl">{t('settingPage.service.alipayNotifyUrl')}</Label>
                            <Input
                                id="alipayNotifyUrl"
                                value={input[GeneralSetting.AlipayNotifyUrl] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.AlipayNotifyUrl, e.target.value)}
                                placeholder={t('settingPage.service.alipayNotifyUrl')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="alipayAppId">{t('settingPage.service.alipayAppId')}</Label>
                            <Input
                                id="alipayAppId"
                                value={input[GeneralSetting.AlipayAppId] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.AlipayAppId, e.target.value)}
                                placeholder={t('settingPage.service.alipayAppId')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="alipayPrivateKey">{t('settingPage.service.alipayPrivateKey')}</Label>
                            <Input
                                id="alipayPrivateKey"
                                type="password"
                                value={input[GeneralSetting.AlipayPrivateKey] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.AlipayPrivateKey, e.target.value)}
                                placeholder={t('settingPage.service.alipayPrivateKey')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="alipayPublicKey">{t('settingPage.service.alipayPublicKey')}</Label>
                            <Input
                                id="alipayPublicKey"
                                value={input[GeneralSetting.AlipayPublicKey] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.AlipayPublicKey, e.target.value)}
                                placeholder={t('settingPage.service.alipayPublicKey')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="alipayAppCertPath">{t('settingPage.service.alipayAppCertPath')}</Label>
                            <Input
                                id="alipayAppCertPath"
                                value={input[GeneralSetting.AlipayAppCertPath] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.AlipayAppCertPath, e.target.value)}
                                placeholder={t('settingPage.service.alipayAppCertPath')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="alipayRootCertPath">{t('settingPage.service.alipayRootCertPath')}</Label>
                            <Input
                                id="alipayRootCertPath"
                                value={input[GeneralSetting.AlipayRootCertPath] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.AlipayRootCertPath, e.target.value)}
                                placeholder={t('settingPage.service.alipayRootCertPath')}
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="alipayPublicCertPath">{t('settingPage.service.alipayPublicCertPath')}</Label>
                            <Input
                                id="alipayPublicCertPath"
                                value={input[GeneralSetting.AlipayPublicCertPath] || ''}
                                onChange={(e) => handleInputChange(GeneralSetting.AlipayPublicCertPath, e.target.value)}
                                placeholder={t('settingPage.service.alipayPublicCertPath')}
                            />
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