// Replaced Ant Design with shadcn/ui components
import { Send, User, Trash2, Settings, Save, RotateCcw, Trash, Bot, Zap, Loader2, X } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { Textarea } from '../../../../components/ui/textarea';
import { Badge } from '../../../../components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../../components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../../../components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Separator } from '../../../../components/ui/separator';
import { Label } from '../../../../components/ui/label';
import { toast } from 'sonner';
import { cn } from '../../../../lib/utils';
import { Flexbox } from 'react-layout-kit';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { isMobileDevice } from '../../../../utils/responsive';
import { getTokens } from '../../../../services/TokenService';
import { getModels } from '../../../../services/ModelService';
import { createCompletion, isResponsesModel, processStreamResponse } from '../../../../services/ResponsesService';
import OpenAI from 'openai';
import { useEffect, useRef, useState } from 'react';
import { DESIGN_TOKENS } from '../../../../styles/theme-design-system';

// Using shadcn/ui components with proper spacing and layout utilities
const SpaceComponent = ({ children, size = "small", direction = "horizontal", ...props }: any) => {
  const sizeMap = { small: "gap-2", middle: "gap-4", large: "gap-6" };
  const directionMap = { horizontal: "flex-row", vertical: "flex-col" };

  return (
    <div className={cn("flex", directionMap[direction], sizeMap[size])} {...props}>
      {children}
    </div>
  );
};

const LoadingSpinner = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const sizeMap = { small: "w-4 h-4", default: "w-6 h-6", large: "w-8 h-8" };
  return <Loader2 className={cn("animate-spin", sizeMap[size])} />;
};

const TextComponent = ({ children, type, strong, className, ...props }: any) => {
  const typeStyles = {
    secondary: "text-muted-foreground",
    danger: "text-destructive",
    warning: "text-amber-600",
    success: "text-green-600"
  };

  return (
    <span
      className={cn(
        strong && "font-semibold",
        type && typeStyles[type],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

const RowComponent = ({ children, gutter, align, className, ...props }: any) => {
  const gutterClass = gutter ? `gap-${gutter[0] / 4}` : "";
  const alignClass = align === "middle" ? "items-center" : "";

  return (
    <div className={cn("flex flex-wrap", gutterClass, alignClass, className)} {...props}>
      {children}
    </div>
  );
};

const ColComponent = ({ children, xs, sm, md, lg, className, ...props }: any) => {
  const responsiveClasses = [];
  if (xs) responsiveClasses.push(xs === 24 ? "w-full" : `w-${xs}/24`);
  if (sm) responsiveClasses.push(sm === 12 ? "sm:w-1/2" : sm === 8 ? "sm:w-1/3" : `sm:w-${sm}/24`);
  if (md) responsiveClasses.push(md === 12 ? "md:w-1/2" : md === 8 ? "md:w-1/3" : `md:w-${md}/24`);

  return (
    <div className={cn(...responsiveClasses, className)} {...props}>
      {children}
    </div>
  );
};

const FormComponent = ({ children, layout, ...props }: any) => (
  <div className={cn("space-y-4", layout === "vertical" && "flex flex-col")} {...props}>
    {children}
  </div>
);

const FormItemComponent = ({ children, label, tooltip, className, ...props }: any) => (
  <div className={cn("space-y-2", className)} {...props}>
    {label && (
      <Label className="text-sm font-medium">
        {label}
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0">
                  <span className="text-xs">?</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </Label>
    )}
    {children}
  </div>
);

// Message type definition
export interface Message {
    id?: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: number;
    performance?: {
        firstTokenTime?: number;
        completionTime?: number;
        totalTokens?: number;
        tokensPerSecond?: number;
    };
}

// Chat history type definition
export interface ChatHistory {
    id: string;
    title: string;
    messages: Message[];
    model: string;
    tokenId: string;
    createdAt: number;
    tags?: string[];
    pinned?: boolean;
}

export default function ChatFeature({ modelInfo }: { modelInfo: any }) {
    const { t } = useTranslation();
    const isMobile = isMobileDevice();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    // State
    const [loading, setLoading] = useState(false);
    const [modelOptions, setModelOptions] = useState<string[]>([]);
    const [tokenOptions, setTokenOptions] = useState<any[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [selectedToken, setSelectedToken] = useState<string>('');
    const [prompt, setPrompt] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [systemPrompt, setSystemPrompt] = useState<string>(t('playground.defaultSystemPrompt'));
    const [streaming, setStreaming] = useState(false);
    const [currentAssistantMessage, setCurrentAssistantMessage] = useState('');
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [regeneratingMessageIndex, setRegeneratingMessageIndex] = useState<number | null>(null);
    
    useEffect(() => {
        // Initial loading of tokens and models
        fetchTokens();
    }, [modelInfo]);

    useEffect(() => {
        // Scroll to bottom when messages change
        scrollToBottom();
    }, [messages, currentAssistantMessage]);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const fetchTokens = async () => {
        try {
            const res = await getTokens(1, 100);
            if (res && res.data && res.data.items) {
                setTokenOptions(res.data.items);
                if (res.data.items.length > 0) {
                    const firstToken = res.data.items[0];
                    setSelectedToken(firstToken.key);
                    fetchModels(firstToken.key);
                } else {
                    toast.error(t('playground.errorMessages.noTokensAvailable'));
                }
            }
        } catch (error) {
            console.error('Failed to fetch tokens:', error);
            toast.error(t('common.error'));
        }
    };
    
    const fetchModels = async (token: string) => {
        try {
            setLoading(true);
            
            if (!token) {
                toast.error(t('playground.errorMessages.selectToken'));
                return;
            }
            
            try {
                // Initialize OpenAI client with the selected token
                const openai = new OpenAI({
                    apiKey: token,
                    baseURL: window.location.origin + '/v1',
                    dangerouslyAllowBrowser: true // For client-side usage
                });
                
                // Fetch models from OpenAI API
                const response = await openai.models.list();
                
                // Check if response follows the expected structure
                if (response && Array.isArray(response.data)) {
                    // Extract model IDs from the response
                    const availableModels = response.data.map(model => model.id);
                    // Filter models based on modelInfo
                    let filteredModels: string[] = [];
                    if (modelInfo && modelInfo.modelTypes) {
                        // Find the chat type models from modelInfo
                        const chatTypeInfo = modelInfo.modelTypes.find((type: any) => type.type === 'chat');
                        
                        if (chatTypeInfo && chatTypeInfo.models) {
                            // Filter models that exist in both the API response and modelInfo
                            filteredModels = chatTypeInfo.models.filter((model: string) => 
                                availableModels.includes(model)
                            );
                        }
                    }
                    
                    setModelOptions(filteredModels);
                    if (filteredModels.length > 0) {
                        setSelectedModel(filteredModels[0]);
                    }
                } else {
                    toast.error(t('playground.errorMessages.responseFailed'));
                    throw new Error('Unexpected OpenAI API response structure');
                }
            } catch (apiError: any) {
                console.error('OpenAI API error:', apiError);
                console.error('Error details:', apiError.message, apiError.status, apiError.headers);
                toast.error(`${t('playground.errorMessages.responseFailed')}: ${apiError.message || t('common.unknown')}`);
                
                try {
                    const res = await getModels();
                    if (res && res.data) {
                        // Filter for chat models based on modelInfo
                        let chatModels: string[] = [];
                        
                        if (modelInfo && modelInfo.modelTypes) {
                            const chatTypeInfo = modelInfo.modelTypes.find((type: any) => type.type === 'chat');
                            if (chatTypeInfo && chatTypeInfo.models) {
                                chatModels = res.data.filter((model: string) => 
                                    chatTypeInfo.models.includes(model)
                                );
                            } else {
                                // Fallback to generic filtering if modelInfo structure is not as expected
                                chatModels = res.data.filter((model: string) => 
                                    model.includes('gpt') || model.includes('chat')
                                );
                            }
                        } else {
                            // Fallback to generic filtering if modelInfo is not available
                            chatModels = res.data.filter((model: string) => 
                                model.includes('gpt') || model.includes('chat')
                            );
                        }
                        
                        setModelOptions(chatModels);
                        if (chatModels.length > 0) {
                            setSelectedModel(chatModels[0]);
                        }
                    }
                } catch (fallbackError) {
                    console.error('Fallback getModels error:', fallbackError);
                    toast.error(t('common.error'));
                }
            }
        } catch (error) {
            console.error('Failed to fetch models:', error);
            toast.error(t('common.error'));
        } finally {
            setLoading(false);
        }
    };
    
    const handleTokenChange = (value: string) => {
        setSelectedToken(value);
        setTimeout(() => fetchModels(value), 0);
    };
    
    const handleSendMessage = async () => {
        if (!prompt.trim()) {
            toast.error(t('playground.errorMessages.enterMessage'));
            return;
        }
        
        if (!selectedModel) {
            toast.error(t('playground.errorMessages.selectModel'));
            return;
        }
        if (!selectedToken) {
            toast.error(t('playground.errorMessages.selectToken'));
            return;
        }
        
        // Add user message
        const userMessage: Message = {
            role: 'user',
            content: prompt,
            timestamp: Date.now()
        };
        
        setMessages([...messages, userMessage]);
        setPrompt('');
        
        await generateResponse(userMessage.content);
    };
    
    const generateResponse = async (userPrompt: string, regenerateIndex?: number) => {
        setLoading(true);
        setStreaming(true);
        setCurrentAssistantMessage('');
        
        try {
            if (!selectedToken || !selectedModel) {
                throw new Error(t('playground.errorMessages.selectToken'));
            }
            
            // Prepare messages array including system prompt
            let messageArray = [];
            
            if (regenerateIndex !== undefined) {
                // If regenerating, only include messages up to the regenerated index
                messageArray = [
                    { role: 'system', content: systemPrompt },
                    ...messages.slice(0, regenerateIndex).map(msg => ({ role: msg.role, content: msg.content }))
                ];
            } else {
                // Regular flow - include all messages
                messageArray = [
                    { role: 'system', content: systemPrompt },
                    ...messages.map(msg => ({ role: msg.role, content: msg.content })),
                    { role: 'user', content: userPrompt }
                ];
            }
            
            // Start performance timer
            const startTime = Date.now();
            
            // Check if this model requires the responses interface
            const useResponsesAPI = isResponsesModel(selectedModel);
            
            // Use unified API calling method
            const stream = await createCompletion({
                model: selectedModel,
                messages: messageArray as any,
                token: selectedToken,
                baseURL: window.location.origin + '/v1',
                stream: true
            });
            
            let firstTokenTime = 0;
            let responseContent = '';
            
            // 处理流式响应
            await processStreamResponse(
                stream,
                (content: string) => {
                    // Record time of first token
                    if (responseContent === '' && content) {
                        firstTokenTime = Date.now();
                    }
                    
                    // Append the chunk content
                    responseContent += content;
                    setCurrentAssistantMessage(responseContent);
                },
                useResponsesAPI
            );
            
            // Completion time
            const completionTime = Date.now();
            
            // Calculate performance metrics
            const performance = {
                firstTokenTime: firstTokenTime - startTime,
                completionTime: completionTime - startTime,
                totalTokens: responseContent.length / 4, // Rough estimate
                tokensPerSecond: (responseContent.length / 4) / ((completionTime - startTime) / 1000)
            };
            
            // Add assistant message with full response
            const assistantMessage: Message = {
                role: 'assistant',
                content: responseContent,
                timestamp: Date.now(),
                performance
            };
            
            // Update messages based on whether we're regenerating or not
            if (regenerateIndex !== undefined) {
                // Replace messages starting from the regenerate index
                setMessages(prev => [...prev.slice(0, regenerateIndex), assistantMessage]);
                setRegeneratingMessageIndex(null);
            } else {
                // Normal flow - append the new message
                setMessages(prev => [...prev, assistantMessage]);
            }
            
        } catch (error: any) {
            console.error('Error in chat completion:', error);
            toast.error(`${t('playground.errorMessages.responseFailed')}: ${error.message || t('common.unknown')}`);
            
            // Add error message
            const errorMessage: Message = {
                role: 'assistant',
                content: `${t('common.error')}: ${error.message || t('common.unknown')}`,
                timestamp: Date.now()
            };
            
            // Add error message based on context
            if (regenerateIndex !== undefined) {
                setMessages(prev => [...prev.slice(0, regenerateIndex), errorMessage]);
                setRegeneratingMessageIndex(null);
            } else {
                setMessages(prev => [...prev, errorMessage]);
            }
        } finally {
            setLoading(false);
            setStreaming(false);
            setCurrentAssistantMessage('');
        }
    };
    
    const handleRegenerateMessage = (index: number) => {
        if (index <= 0 || index >= messages.length) return;
        
        // Get user message before the assistant message we want to regenerate
        const userMessageIndex = index - 1;
        const userMessage = messages[userMessageIndex];
        
        if (userMessage.role !== 'user') return;
        
        setRegeneratingMessageIndex(index);
        
        // Regenerate the assistant response to this user message
        generateResponse(userMessage.content, index);
    };
    
    const handleDeleteMessage = (index: number) => {
        // Only allow deleting pairs of messages (user + assistant)
        if (index < 0 || index >= messages.length) return;
        
        // If deleting a user message, also delete the following assistant message
        if (messages[index].role === 'user' && index + 1 < messages.length) {
            setMessages((prev:any) => [...prev.slice(0, index), ...prev.slice(index + 2)]);
        } 
        // If deleting an assistant message, also delete the preceding user message
        else if (messages[index].role === 'assistant' && index > 0) {
            setMessages((prev:any) => [...prev.slice(0, index - 1), ...prev.slice(index + 1)]);
        }
        // If it's a standalone message, just delete it
        else {
            setMessages((prev:any) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
        }
    };
    
    const clearMessages = () => {
        setMessages([]);
        setCurrentAssistantMessage('');
        toast.success(t('playground.clearChat'));
    };
    
    const renderEmptyState = () => (
        <div className={cn(
            "flex flex-col items-center justify-center text-center text-muted-foreground",
            isMobile ? "p-10" : "p-20"
        )}>
            <Bot className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                {t('playground.emptyChat.title')}
            </h3>
            <p className="text-base text-muted-foreground mb-6">
                {t('playground.emptyChat.description')}
            </p>
            <div className={cn(
                "flex gap-4",
                isMobile ? "flex-col" : "flex-row"
            )}>
                <Button
                    variant="outline"
                    onClick={() => setPrompt(t('playground.emptyChat.suggestion1'))}
                    disabled={!selectedModel || !selectedToken}
                >
                    {t('playground.emptyChat.suggestion1')}
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setPrompt(t('playground.emptyChat.suggestion2'))}
                    disabled={!selectedModel || !selectedToken}
                >
                    {t('playground.emptyChat.suggestion2')}
                </Button>
            </div>
        </div>
    );
    
    const renderMessages = () => {
        if (messages.length === 0) {
            return renderEmptyState();
        }
        
        return (
            <div className="message-list" style={{ padding: isMobile ? '8px' : '16px' }}>
                {messages.map((msg:any, index:any) => (
                    <div 
                        key={msg.id || index} 
                        className={`message ${msg.role}`}
                        style={{
                            display: 'flex',
                            margin: '16px 0',
                            padding: isMobile ? '12px' : '16px 20px',
                            borderRadius: '12px',
                            backgroundColor: msg.role === 'user'
                                ? 'hsl(var(--muted))'
                                : 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            position: 'relative',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <Avatar className={cn(
                            "mr-3 flex-shrink-0",
                            isMobile ? "w-8 h-8" : "w-10 h-10"
                        )}>
                            <AvatarFallback className={cn(
                                msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-green-500 text-white"
                            )}>
                                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </AvatarFallback>
                        </Avatar>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                fontWeight: 600,
                                marginBottom: 8,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                color: 'hsl(var(--foreground))'
                            }}>
                                <span style={{ fontSize: isMobile ? 14 : 16 }}>
                                    {msg.role === 'user' ? t('common.you') : t('playground.title')}
                                </span>
                                
                                {/* Message action buttons */}
                                <SpaceComponent size="small">
                                    {msg.role === 'assistant' && index > 0 && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        disabled={regeneratingMessageIndex === index || loading}
                                                        onClick={() => handleRegenerateMessage(index)}
                                                        className="opacity-70 hover:opacity-100 text-muted-foreground"
                                                    >
                                                        {regeneratingMessageIndex === index ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <RotateCcw className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{t('playground.regenerate')}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            disabled={loading}
                                                            className="opacity-70 hover:opacity-100 text-destructive"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>{t('playground.confirmDelete')}</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete this message?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteMessage(index)}>
                                                                {t('common.confirm')}
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{t('playground.delete')}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </SpaceComponent>
                            </div>
                            <div className={cn(
                                "message-content leading-relaxed text-foreground",
                                isMobile ? "text-sm" : "text-base"
                            )}>
                                {msg.role === 'assistant' ? (
                                    <ReactMarkdown>
                                        {msg.content}
                                    </ReactMarkdown>
                                ) : (
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                )}
                            </div>
                            {msg.role === 'assistant' && msg.performance && (
                                <div className="performance-tags flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        <Zap className="w-3 h-3" />
                                        {t('playground.performance.firstToken')}: {msg.performance.firstTokenTime}ms
                                    </Badge>
                                    <Badge variant="secondary">
                                        {t('playground.performance.completion')}: {msg.performance.completionTime}ms
                                    </Badge>
                                    <Badge variant="secondary">
                                        ~{Math.round(msg.performance.tokensPerSecond || 0)} {t('playground.performance.tokens')}/s
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                
                {streaming && currentAssistantMessage && (
                    <div className={cn(
                        "message assistant streaming flex my-4 border border-primary bg-card rounded-lg shadow-lg",
                        isMobile ? "p-3" : "p-4 px-5"
                    )}>
                        <Avatar className={cn(
                            "mr-3 flex-shrink-0 bg-green-500",
                            isMobile ? "w-8 h-8" : "w-10 h-10"
                        )}>
                            <AvatarFallback className="bg-green-500 text-white">
                                <Bot className="w-4 h-4" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className={cn(
                                "font-semibold mb-2 flex items-center text-foreground",
                                isMobile ? "text-sm" : "text-base"
                            )}>
                                <span>{t('playground.title')}</span>
                                <div className="ml-2">
                                    <LoadingSpinner size="small" />
                                </div>
                            </div>
                            <div className={cn(
                                "message-content leading-relaxed text-foreground",
                                isMobile ? "text-sm" : "text-base"
                            )}>
                                <ReactMarkdown>
                                    {currentAssistantMessage}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )}
                
                {loading && !streaming && (
                    <div className="text-center py-8 text-muted-foreground">
                        <LoadingSpinner size="large" />
                        <div className="mt-4 text-base loading-dots">
                            {t('common.loading')}
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>
        );
    };
    
    const renderSettingsModal = () => (
        <Dialog open={settingsVisible} onOpenChange={setSettingsVisible}>
            <DialogContent className={cn(
                "sm:max-w-[600px]",
                isMobile && "max-w-[90vw]"
            )}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        {t('playground.chatSettings')}
                    </DialogTitle>
                </DialogHeader>
                <FormComponent layout="vertical">
                    <FormItemComponent
                        label={t('playground.systemPrompt')}
                        tooltip={t('playground.systemPrompt')}
                    >
                        <Textarea
                            rows={6}
                            value={systemPrompt}
                            onChange={e => setSystemPrompt(e.target.value)}
                            placeholder={t('playground.systemPrompt')}
                            maxLength={2000}
                            className="resize-none"
                        />
                        <div className="text-xs text-muted-foreground mt-1">
                            {systemPrompt.length}/2000
                        </div>
                    </FormItemComponent>
                </FormComponent>
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setSettingsVisible(false)}>
                        {t('common.cancel')}
                    </Button>
                    <Button
                        onClick={() => {
                            setSettingsVisible(false);
                            toast.success(t('common.saveSuccess'));
                        }}
                    >
                        {t('common.save')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
    
    return (
        <Flexbox
            gap={0}
            className="h-full w-full relative overflow-hidden bg-background"
        >
            <Card className="w-full h-full flex flex-col border-none rounded-none bg-card">
                <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
                {/* Header with model selection */}
                <div className={cn(
                    "border-b border-border bg-muted/50 shadow-sm",
                    isMobile ? "p-3 px-4" : "p-5 px-6"
                )}>
                    <RowComponent gutter={[16, 16]} align="middle">
                        <ColComponent xs={24} sm={12} md={8}>
                            <div className={cn(isMobile ? "mb-1" : "mb-0")}>
                                <TextComponent strong className="text-xs text-muted-foreground">
                                    {t('playground.selectToken')}
                                </TextComponent>
                            </div>
                            <Select
                                value={selectedToken}
                                onValueChange={handleTokenChange}
                                disabled={loading}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('playground.selectToken')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {tokenOptions.map((tokenOption:any) => (
                                        <SelectItem key={tokenOption.key} value={tokenOption.key}>
                                            {tokenOption.name || tokenOption.key}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </ColComponent>
                        <ColComponent xs={24} md={12}>
                            <SpaceComponent direction="vertical" className="w-full" size="small">
                                <TextComponent type="secondary">{t('playground.selectModel')}</TextComponent>
                                <SpaceComponent className="flex-wrap">
                                    <Select
                                        value={selectedModel}
                                        onValueChange={setSelectedModel}
                                        disabled={loading || !selectedToken}
                                    >
                                        <SelectTrigger className="min-w-[200px] flex-1">
                                            <SelectValue placeholder={t('playground.selectModel')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {modelOptions.map(model => (
                                                <SelectItem key={model} value={model}>
                                                    {model}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {selectedModel && (
                                        <Badge variant={isResponsesModel(selectedModel) ? 'default' : 'secondary'}>
                                            {isResponsesModel(selectedModel) ? 'Responses API' : 'Chat Completions API'}
                                        </Badge>
                                    )}
                                </SpaceComponent>
                            </SpaceComponent>
                        </ColComponent>
                        <ColComponent xs={24} md={8} className={cn(isMobile ? "text-center" : "text-right")}>
                            <SpaceComponent size="middle">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size={isMobile ? "default" : "lg"}
                                                onClick={() => setSettingsVisible(true)}
                                            >
                                                <Settings className="w-4 h-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t('playground.chatSettings')}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size={isMobile ? "default" : "lg"}
                                                        disabled={messages.length === 0}
                                                    >
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>{t('playground.clearChat')}</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {t('playground.confirmDeleteChat')}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                                                        <AlertDialogAction onClick={clearMessages}>
                                                            {t('common.confirm')}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t('playground.clearChat')}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size={isMobile ? "default" : "lg"}
                                                disabled={messages.length === 0}
                                            >
                                                <Save className="w-4 h-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t('playground.saveChat')}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </SpaceComponent>
                        </ColComponent>
                    </RowComponent>
                </div>
                
                {/* Message area */}
                <div className="flex-1 overflow-auto bg-background">
                    {renderMessages()}
                </div>
                
                {/* Input area */}
                <div className={cn(
                    "border-t border-border bg-muted/50 shadow-sm",
                    isMobile ? "p-4" : "p-5 px-6"
                )}>
                    <div className="flex gap-3 items-end">
                        <div className="flex-1">
                            <Textarea
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                placeholder={t('playground.inputMessage')}
                                onKeyDown={e => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                className={cn(
                                    "resize-none rounded-lg",
                                    isMobile ? "text-sm" : "text-base",
                                    "min-h-[40px] max-h-[120px]"
                                )}
                                rows={1}
                            />
                        </div>
                        <Button
                            onClick={handleSendMessage}
                            disabled={!prompt.trim() || !selectedModel || !selectedToken || loading}
                            size="lg"
                            className="min-h-[40px] rounded-lg"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                            {!isMobile && <span className="ml-2">{t('playground.send')}</span>}
                        </Button>
                    </div>
                    <div className="mt-2 text-center text-xs text-muted-foreground">
                        {t('playground.enterToSend')}
                    </div>
                </div>
                </CardContent>
            </Card>
            
            {renderSettingsModal()}
        </Flexbox>
    );
}