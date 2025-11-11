import { GetSetting } from "../../services/SettingService";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ScrollArea } from "../../components/ui/scroll-area";
import OtherSettings from "./features/OtherSettings";
import ServiceSetup from "./features/ServiceSetup";
import SystemSetup from "./features/SystemSetup";
import { useTranslation } from "react-i18next";

export default function Setting() {
  const [settings, setSettings] = useState<Array<{ key: string; value: string }>>([]);
  const { t } = useTranslation();

  function loadSettings() {
    GetSetting()
      .then((res) => {
        setSettings(res.data);
      });
  }

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('settingPage.general.title')}</h1>
        <p className="text-muted-foreground mt-2">
          Manage your application settings and configurations
        </p>
      </div>

      <Tabs defaultValue="service" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="service" className="text-sm font-medium">
            {t('settingPage.tabs.serviceSetup')}
          </TabsTrigger>
          <TabsTrigger value="system" className="text-sm font-medium">
            {t('settingPage.tabs.systemSetup')}
          </TabsTrigger>
          <TabsTrigger value="other" className="text-sm font-medium">
            {t('settingPage.tabs.otherSettings')}
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-280px)] w-full">
          <TabsContent value="service" className="mt-0">
            <ServiceSetup settings={settings} setSettings={setSettings} />
          </TabsContent>

          <TabsContent value="system" className="mt-0">
            <SystemSetup settings={settings} setSettings={setSettings} />
          </TabsContent>

          <TabsContent value="other" className="mt-0">
            <OtherSettings settings={settings} setSettings={setSettings} />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}