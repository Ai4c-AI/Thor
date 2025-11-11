import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useThemeStore from '../../store/theme';
import PwaInstall from '../PwaInstall';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Monitor } from 'lucide-react';


export default function ThorHeader() {
    const navigate = useNavigate();
    const { themeMode, toggleTheme } = useThemeStore();
    const { t } = useTranslation();

    const [key, setKey] = useState(window.location.pathname.split('/')[1] || 'welcome');
    
    const handleThemeSwitch = (mode: string) => {
        toggleTheme(mode as 'light' | 'dark' | 'auto');
    };

    const themeOptions = [
        {
            icon: Sun,
            value: 'light',
        },
        {
            icon: Moon,
            value: 'dark',
        },
        {
            icon: Monitor,
            value: 'auto',
        },
    ];

    const tabItems = [
        {
            key: 'welcome',
            label: '首页',
        },
        {
            key: 'model',
            label: '模型',
        },
        {
            key: 'doc',
            label: '文档',
        },
        {
            key: 'panel',
            label: '面板',
        },
        {
            key: 'api_doc',
            label: 'API文档',
        }
    ];

    const handleTabChange = (activeKey: string) => {
        switch (activeKey) {
            case 'panel':
                navigate('/panel');
                break;
            case 'doc':
                navigate('/doc');
                break;
            case 'model':
                navigate('/model');
                break;
            case 'welcome':
                navigate('/');
                break;
            case 'api_doc':
                window.open('https://thor-ai.apifox.cn', '_blank');
                break;
        }
        setKey(activeKey);
    };
    
    return (
        <header className="flex items-center justify-between px-6 bg-background shadow-sm border-b">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/logo.png" alt="Thor Logo" />
                    </Avatar>
                    <h3 className="text-lg font-semibold text-primary m-0">Thor雷神托尔</h3>
                </div>

                <Tabs value={key} onValueChange={handleTabChange} className="w-auto">
                    <TabsList className="grid grid-cols-5 w-auto">
                        {tabItems.map((item) => (
                            <TabsTrigger
                                key={item.key}
                                value={item.key}
                                className="text-sm"
                            >
                                {item.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex rounded-md border p-1">
                    {themeOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <Button
                                key={option.value}
                                variant={themeMode === option.value ? "default" : "ghost"}
                                size="sm"
                                className={cn(
                                    "h-7 w-7 p-0",
                                    themeMode === option.value && "bg-primary text-primary-foreground"
                                )}
                                onClick={() => handleThemeSwitch(option.value)}
                            >
                                <Icon className="h-3 w-3" />
                            </Button>
                        );
                    })}
                </div>
                <PwaInstall />
            </div>
        </header>
    )
}