import { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Github,
  User,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Bot,
  Brain
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';

import { login } from '../../services/AuthorizeService';
import { InitSetting, SystemSetting } from '../../services/SettingService';
import Gitee from '../../components/Icon/Gitee';
import Casdoor from '../../components/Icon/Casdoor';
import { cn } from '../../lib/utils';

const Login = memo(() => {
    const { t } = useTranslation();
    const params = new URLSearchParams(location.search);
    const redirect_uri = params.get('redirect_uri');
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const enableCasdoorAuth = InitSetting.find(s => s.key === SystemSetting.EnableCasdoorAuth)?.value;

    const handleAuthRedirect = (url: string) => {
        window.location.href = url;
    };

    const handleGithub = () => {
        const clientId = InitSetting.find(s => s.key === SystemSetting.GithubClientId)?.value;
        if (!clientId) {
            toast.error(t('login.configGithubClientId'));
            return;
        }
        handleAuthRedirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${location.origin}/auth&response_type=code`);
    };

    useEffect(() => {
        localStorage.removeItem('redirect_uri');
        if (redirect_uri) {
            const url = new URL(redirect_uri);
            localStorage.setItem('redirect_uri', url.toString());
        }
    }, [redirect_uri]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username) {
            toast.error(t('login.accountRequired'));
            return;
        }
        if (!password) {
            toast.error(t('login.passwordRequired'));
            return;
        }

        try {
            setLoading(true);
            const token = await login({ account: username, pass: password });
            if (token.success) {
                localStorage.setItem('token', token.data.token);
                localStorage.setItem('role', token.data.role);
                toast.success(t('login.loginSuccess'));
                if (redirect_uri) {
                    const url = new URL(redirect_uri);
                    url.searchParams.append('token', token.data.token);
                    handleAuthRedirect(url.toString());
                    return;
                }
                setTimeout(() => navigate('/panel'), 1000);
            } else {
                toast.error(`${t('login.loginFailed')}: ${token.message}`);
            }
        } catch (e) {
            toast.error(t('login.loginError'));
        } finally {
            setLoading(false);
        }
    };

    const handlerGitee = () => {
        const enable = InitSetting.find(s => s.key === SystemSetting.EnableGiteeLogin)?.value;
        if (!enable) {
            toast.error(t('login.enableGiteeLogin'));
            return;
        }
        const clientId = InitSetting.find(s => s.key === SystemSetting.GiteeClientId)?.value;
        if (!clientId) {
            toast.error(t('login.configGiteeClientId'));
            return;
        }
        handleAuthRedirect(`https://gitee.com/oauth/authorize?client_id=${clientId}&redirect_uri=${location.origin}/auth/gitee&response_type=code`);
    };

    const handleCasdoorAuth = () => {
        let casdoorEndipoint = InitSetting.find(s => s.key === SystemSetting.CasdoorEndipoint)?.value as string;
        if (!casdoorEndipoint) {
            toast.error(t('login.configCasdoorEndpoint'));
            return;
        }
        const casdoorClientId = InitSetting.find(s => s.key === SystemSetting.CasdoorClientId)?.value;
        if (!casdoorClientId) {
            toast.error(t('login.configCasdoorClientId'));
            return;
        }
        if (casdoorEndipoint.endsWith('/')) {
            casdoorEndipoint = casdoorEndipoint.slice(0, -1);
        }
        handleAuthRedirect(`${casdoorEndipoint}/login/oauth/authorize?client_id=${casdoorClientId}&redirect_uri=${location.origin}/auth/casdoor&response_type=code&scope=open email profile`);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-grid-slate-100/25 dark:bg-grid-slate-800/25 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>

            {/* Subtle Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-muted/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">

                    {/* Left Side - Brand & Features */}
                    <div className="hidden lg:block space-y-8">
                        <div className="space-y-6">
                            {/* Logo & Brand */}
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-foreground">
                                        TokenAI
                                    </h1>
                                    <p className="text-muted-foreground">
                                        {t('login.brandSlogan')}
                                    </p>
                                </div>
                            </div>

                            {/* Feature Highlights */}
                            <div className="space-y-6 mt-12">
                                <Card className="group transition-all duration-200 hover:shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                                                <Zap className="w-5 h-5 text-primary-foreground" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold text-foreground">
                                                    {t('login.feature1Title')}
                                                </h3>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {t('login.feature1Desc')}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="group transition-all duration-200 hover:shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                                                <Shield className="w-5 h-5 text-primary-foreground" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold text-foreground">
                                                    {t('login.feature2Title')}
                                                </h3>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {t('login.feature2Desc')}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="flex justify-center lg:justify-end">
                        <Card className="w-full max-w-md shadow-lg">
                            <CardHeader className="space-y-1 pb-6">
                                <CardTitle className="text-2xl font-semibold text-center">
                                    {t('login.title')}
                                </CardTitle>
                                <CardDescription className="text-center">
                                    {t('login.inputAccountInfo')}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Login Form */}
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="username" className="text-sm font-medium">
                                            {t('login.accountPlaceholder')}
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                            <Input
                                                id="username"
                                                type="text"
                                                placeholder={t('login.accountPlaceholder')}
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-medium">
                                            {t('login.passwordPlaceholder')}
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder={t('login.passwordPlaceholder')}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="pl-10 pr-10"
                                                required
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                                                ) : (
                                                    <Eye className="w-4 h-4 text-muted-foreground" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                                                {t('login.loginButton')}...
                                            </>
                                        ) : (
                                            <>
                                                {t('login.loginButton')}
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </form>

                                {/* Register Link */}
                                <div className="text-center">
                                    <Button
                                        variant="link"
                                        onClick={() => navigate('/register')}
                                    >
                                        {t('login.registerNow')}
                                    </Button>
                                </div>

                                {/* Divider */}
                                <div className="relative">
                                    <Separator />
                                    <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground">
                                        {t('login.thirdPartyLogin')}
                                    </span>
                                </div>

                                {/* Social Login */}
                                <TooltipProvider>
                                    <div className="flex justify-center gap-3">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={handleGithub}
                                                >
                                                    <Github className="w-4 h-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{t('login.githubLogin')}</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={handlerGitee}
                                                >
                                                    <Gitee />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{t('login.giteeLogin')}</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {enableCasdoorAuth && (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={handleCasdoorAuth}
                                                    >
                                                        <Casdoor />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{t('login.casdoorLogin')}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                    </div>
                                </TooltipProvider>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Login;