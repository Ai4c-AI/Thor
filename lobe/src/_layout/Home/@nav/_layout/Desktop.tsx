import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils";

const Nav = memo(() => {
    const navigate = useNavigate();
    const [key, setKey] = useState(window.location.pathname.split('/')[1] || 'panel');

    const handleTabChange = useCallback((tabKey: string) => {
        switch (tabKey) {
            case 'panel':
                navigate('/panel');
                break;
            case 'doc':
                navigate('/doc');
                break;
            case 'model':
                navigate('/model');
                break;
            case 'api_doc':
                window.open('https://thor-ai.apifox.cn', '_blank');
                break;
        }
        setKey(tabKey);
    }, [navigate]);

    const navItems = [
        { key: 'panel', label: '面板' },
        { key: "doc", label: "接入文档" },
        { key: "model", label: "可用模型" },
        { key: "api_doc", label: "API文档" }
    ];

    return (
        <header className="w-full h-full bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
            <nav className="h-full flex items-center justify-center">
                <div className="flex space-x-1">
                    {navItems.map((item) => (
                        <Button
                            key={item.key}
                            variant={key === item.key ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handleTabChange(item.key)}
                            className={cn(
                                "transition-all duration-200",
                                key === item.key
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "hover:bg-muted"
                            )}
                        >
                            {item.label}
                        </Button>
                    ))}
                </div>
            </nav>
        </header>
    );
});

Nav.displayName = 'DesktopNav';

export default Nav;