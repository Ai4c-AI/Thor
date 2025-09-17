import { memo, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Nav = memo(() => {
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);

    const handleToggle = useCallback(() => {
        setOpened(!opened);
    }, [opened]);

    const menuItems = useMemo(() => [
        {
            key: 'panel',
            label: '面板',
            onClick: () => {
                navigate('/panel');
                setOpened(false);
            }
        },
        {
            key: "doc",
            label: "接入文档",
            onClick: () => {
                navigate('/doc');
                setOpened(false);
            }
        },
        {
            key: "model",
            label: "可用模型",
            onClick: () => {
                navigate('/model');
                setOpened(false);
            }
        },
        {
            key: "api_doc",
            label: "API文档",
            onClick: () => {
                window.open('https://thor-ai.apifox.cn', '_blank');
                setOpened(false);
            }
        }
    ], [navigate]);

    return (
        <div className="flex items-center justify-center p-2 border-b bg-background">
            <Sheet open={opened} onOpenChange={setOpened}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="transition-all duration-300 ease-in-out hover:bg-accent rounded-lg"
                        onClick={handleToggle}
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                    <nav className="flex flex-col space-y-4 mt-4">
                        {menuItems.map((item) => (
                            <Button
                                key={item.key}
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={item.onClick}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
});

Nav.displayName = 'MobileNav';

export default Nav;