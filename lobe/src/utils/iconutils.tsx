import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Bot,
    Flame,
    Zap,
    Star,
    Lightbulb,
    Crown,
    Heart,
    Gift
} from 'lucide-react';

// Import SVG icons
import openaiIcon from '../assets/openai.svg';
import chatglmIcon from '../assets/chatglm.svg';
import anthropicIcon from '../assets/anthropic.svg';
import googleIcon from '../assets/google.svg';
import grokIcon from '../assets/grok.svg';
import moonshotIcon from '../assets/moonshot.svg';
import kimiIcon from '../assets/kimi.svg';
import deepseekIcon from '../assets/deepseek.svg';
import qwenIcon from '../assets/qwen.svg';
import geminiIcon from '../assets/gemini.svg';
import zhipuIcon from '../assets/zhipu.svg';
import doubaoIcon from '../assets/doubao.svg';
import stabilityIcon from '../assets/stability.svg';
import azureaiIcon from '../assets/azureai.svg';
import githubcopilotIcon from '../assets/githubcopilot.svg';
import giteeaiIcon from '../assets/giteeai.svg';
import ppioIcon from '../assets/ppio.svg';

// 主题颜色配置
const THEME_COLORS = {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    success: 'hsl(142 76% 36%)',
    warning: 'hsl(38 92% 50%)',
    destructive: 'hsl(var(--destructive))',
    info: 'hsl(198 93% 60%)',
    purple: 'hsl(262 83% 58%)',
    orange: 'hsl(25 95% 53%)',
    cyan: 'hsl(198 93% 60%)',
    blue: 'hsl(217 91% 60%)',
    magenta: 'hsl(322 84% 60%)',
    volcano: 'hsl(25 95% 53%)',
    gold: 'hsl(38 92% 50%)',
    lime: 'hsl(84 81% 44%)',
    geekblue: 'hsl(230 89% 65%)',
};

// Avatar wrapper component for consistent styling
const IconAvatar = ({ size, children, style, src }: {
    size: number;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    src?: string;
}) => {
    const sizeClasses = {
        24: 'h-6 w-6',
        36: 'h-9 w-9',
        40: 'h-10 w-10',
        48: 'h-12 w-12'
    };

    const sizeClass = sizeClasses[size as keyof typeof sizeClasses] || 'h-9 w-9';

    return (
        <Avatar className={`${sizeClass} border border-border`} style={style}>
            {src ? (
                <AvatarImage src={src} alt="Provider" />
            ) : null}
            <AvatarFallback className="text-xs">
                {children}
            </AvatarFallback>
        </Avatar>
    );
};

export function getIconByNames(size: number = 24) {
    const models = [
        'OpenAI',
        'ChatGLM',
        'Claude',
        'Google',
        'Grok',
        'Moonshot',
        'Kimi',
        'DeepSeek',
        'Qwen',
        'Gemini',
        'Zhipu',
        'Doubao',
        'Stability',
        'AzureAI',
        'GitHubCopilot',
        'GiteeAI',
        'PPIO',
        'Baichuan',
        'Ai21',
        'Hunyuan',
        'Minimax',
        'Spark',
        'Wenxin',
        'Yi',
        'Qingyan',
        'SiliconCloud',
        'Ollama',
        'Meta',
        'Gemma',
        'AssemblyAI'
    ]

    return models.map((name) => {
        const icon = getIconByName(name, size);
        return {
            label: <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                {icon?.icon}
                <span style={{
                    marginLeft: 8,
                }}>{icon?.label}</span>
            </div>,
            value: name,
        }
    })
}

// 根据名称获取对应的图标
export function getIconByName(name: string, size: number = 36) {
    // Removed avatarStyle as it's now handled by IconAvatar component

    switch (name?.toLowerCase()) {
        case 'openai':
            return {
                icon: <IconAvatar size={size} src={openaiIcon} />,
                label: 'OpenAI'
            };
        case 'chatglm':
            return {
                icon: <IconAvatar size={size} src={chatglmIcon} />,
                label: 'ChatGLM'
            };
        case 'claude':
        case 'anthropic':
            return {
                icon: <IconAvatar size={size} src={anthropicIcon} />,
                label: 'Claude'
            };
        case 'google':
            return {
                icon: <IconAvatar size={size} src={googleIcon} />,
                label: 'Google'
            };
        case 'grok':
            return {
                icon: <IconAvatar size={size} src={grokIcon} />,
                label: 'Grok'
            };
        case 'moonshot':
            return {
                icon: <IconAvatar size={size} src={moonshotIcon} />,
                label: 'Moonshot'
            };
        case 'kimi':
            return {
                icon: <IconAvatar size={size} src={kimiIcon} />,
                label: 'Kimi'
            };
        case 'deepseek':
            return {
                icon: <IconAvatar size={size} src={deepseekIcon} />,
                label: 'DeepSeek'
            };
        case 'qwen':
            return {
                icon: <IconAvatar size={size} src={qwenIcon} />,
                label: 'Qwen'
            };
        case 'gemini':
            return {
                icon: <IconAvatar size={size} src={geminiIcon} />,
                label: 'Gemini'
            };
        case 'zhipu':
            return {
                icon: <IconAvatar size={size} src={zhipuIcon} />,
                label: 'Zhipu'
            };
        case 'doubao':
            return {
                icon: <IconAvatar size={size} src={doubaoIcon} />,
                label: 'Doubao'
            };
        case 'stability':
            return {
                icon: <IconAvatar size={size} src={stabilityIcon} />,
                label: 'Stability'
            };
        case 'azureai':
        case 'azure':
            return {
                icon: <IconAvatar size={size} src={azureaiIcon} />,
                label: 'Azure AI'
            };
        case 'githubcopilot':
        case 'github':
            return {
                icon: <IconAvatar size={size} src={githubcopilotIcon} />,
                label: 'GitHub Copilot'
            };
        case 'giteeai':
        case 'gitee':
            return {
                icon: <IconAvatar size={size} src={giteeaiIcon} />,
                label: 'Gitee AI'
            };
        case 'ppio':
            return {
                icon: <IconAvatar size={size} src={ppioIcon} />,
                label: 'PPIO'
            };
        // Fallback cases for other providers that don't have SVG icons yet
        case 'baichuan':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.volcano }}><Flame className="h-4 w-4 text-white" /></IconAvatar>,
                label: '百川'
            };
        case 'ai21':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.cyan }}><Lightbulb className="h-4 w-4 text-white" /></IconAvatar>,
                label: 'Ai21'
            };
        case 'hunyuan':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.destructive }}><Heart className="h-4 w-4 text-white" /></IconAvatar>,
                label: '混元'
            };
        case 'minimax':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.success }}><Gift className="h-4 w-4 text-white" /></IconAvatar>,
                label: 'Minimax'
            };
        case 'spark':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.orange }}><Flame className="h-4 w-4 text-white" /></IconAvatar>,
                label: 'Spark'
            };
        case 'wenxin':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.blue }}><Lightbulb className="h-4 w-4 text-white" /></IconAvatar>,
                label: '文心一言'
            };
        case 'yi':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.purple }}><Star className="h-4 w-4 text-white" /></IconAvatar>,
                label: 'Yi'
            };
        case 'qingyan':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.cyan }}><Heart className="h-4 w-4 text-white" /></IconAvatar>,
                label: 'Qingyan'
            };
        case 'siliconcloud':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.magenta }}><Gift className="h-4 w-4 text-white" /></IconAvatar>,
                label: '硅基流动'
            };
        case 'ollama':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.success }}><Bot className="h-4 w-4 text-white" /></IconAvatar>,
                label: 'Ollama'
            };
        case 'meta':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.blue }}><Crown className="h-4 w-4 text-white" /></IconAvatar>,
                label: 'Meta'
            };
        case 'gemma':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.cyan }}><Flame className="h-4 w-4 text-white" /></IconAvatar>,
                label: 'Gemma'
            };
        case 'assemblyai':
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.gold }}><Zap className="h-4 w-4 text-white" /></IconAvatar>,
                label: 'AssemblyAI'
            };
        default:
            return {
                icon: <IconAvatar size={size} style={{ backgroundColor: THEME_COLORS.primary }}><Bot className="h-4 w-4 text-white" /></IconAvatar>,
                label: name || 'Unknown'
            };
    }
}