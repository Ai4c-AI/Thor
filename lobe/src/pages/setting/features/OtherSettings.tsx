import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { toast } from "sonner";
import { OtherSetting, UpdateSetting } from '../../../services/SettingService';
import { useTranslation } from 'react-i18next';

interface OtherSettingsProps {
    settings: Array<{ key: string; value: string }>;
    setSettings?: (settings: Array<{ key: string; value: string }>) => void;
}

export default function OtherSettings({
    settings,
    setSettings
}: OtherSettingsProps) {
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
            {/* Website Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('settingPage.other.siteSettings')}</CardTitle>
                    <CardDescription>Configure your website appearance and content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="webTitle">{t('settingPage.other.webTitle')}</Label>
                        <Input
                            id="webTitle"
                            value={input[OtherSetting.WebTitle] || ''}
                            onChange={(e) => handleInputChange(OtherSetting.WebTitle, e.target.value)}
                            placeholder="Enter your website title"
                        />
                        <p className="text-sm text-muted-foreground">
                            This will appear in the browser tab and search results
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="webLogo">{t('settingPage.other.webLogo')}</Label>
                        <Input
                            id="webLogo"
                            value={input[OtherSetting.WebLogo] || ''}
                            onChange={(e) => handleInputChange(OtherSetting.WebLogo, e.target.value)}
                            placeholder="https://example.com/logo.png"
                        />
                        <p className="text-sm text-muted-foreground">
                            Provide a URL to your website logo image
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="indexContent">{t('settingPage.other.indexContent')}</Label>
                        <Textarea
                            id="indexContent"
                            value={input[OtherSetting.IndexContent] || ''}
                            onChange={(e) => handleInputChange(OtherSetting.IndexContent, e.target.value)}
                            placeholder="Enter your homepage content..."
                            rows={8}
                            className="resize-none"
                        />
                        <p className="text-sm text-muted-foreground">
                            This content will be displayed on your homepage. Supports HTML and Markdown.
                        </p>
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