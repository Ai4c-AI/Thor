import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Send,
  User,
  Bot,
  Trash2,
  RotateCcw,
  Zap,
  Square,
  Copy,
  Edit,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Sparkles,
  Clock,
  ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Markdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { isMobileDevice } from '../../../utils/responsive';
import { createCompletion, isResponsesModel, processStreamResponse } from '../../../services/ResponsesService';
import type { PlaygroundState, Message } from '../hooks/usePlayground';

interface ChatWorkspaceProps {
  modelInfo: any;
  playgroundState: PlaygroundState;
}

export default function ChatWorkspace({ modelInfo, playgroundState }: ChatWorkspaceProps) {
  const { t } = useTranslation();
  const isMobile = isMobileDevice();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    selectedToken,
    selectedModel,
    systemPrompt,
    temperature,
    maxTokens,
    loading,
    streaming,
    setLoading,
    setStreaming,
    currentSessionId,
    sessions,
    updateSession,
    settings
  } = playgroundState;

  const [prompt, setPrompt] = useState<string>('');
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState<string>('');
  const [regeneratingMessageIndex, setRegeneratingMessageIndex] = useState<number | null>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');

  // Get current session messages
  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  // Auto-scroll handling
  useEffect(() => {
    if (settings.autoScroll) {
      scrollToBottom();
    }
  }, [messages, currentAssistantMessage, settings.autoScroll]);

  // Handle scroll detection for scroll-to-bottom button
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollArea;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollToBottom(!isNearBottom && messages.length > 0);
    };

    scrollArea.addEventListener('scroll', handleScroll);
    return () => scrollArea.removeEventListener('scroll', handleScroll);
  }, [messages.length]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const updateSessionMessages = useCallback((newMessages: Message[]) => {
    if (currentSessionId && currentSession) {
      updateSession(currentSessionId, {
        messages: newMessages,
        title: newMessages.length > 0 ? newMessages[0].content.slice(0, 50) + '...' : 'New Conversation'
      });
    }
  }, [currentSessionId, currentSession, updateSession]);

  const handleSendMessage = async () => {
    if (!prompt.trim()) {
      toast.warning('请输入消息内容');
      return;
    }

    if (!selectedModel || !selectedToken) {
      toast.warning('请选择模型和令牌');
      return;
    }

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: Date.now()
    };

    const newMessages = [...messages, userMessage];
    updateSessionMessages(newMessages);
    setPrompt('');

    await generateResponse(newMessages);
  };

  const generateResponse = async (currentMessages: Message[]) => {
    setLoading(true);
    setStreaming(true);
    setCurrentAssistantMessage('');

    try {
      const messageArray = [
        { role: 'system', content: systemPrompt },
        ...currentMessages.map(msg => ({ role: msg.role, content: msg.content }))
      ];

      const startTime = Date.now();
      const stream = await createCompletion({
        model: selectedModel,
        messages: messageArray as any,
        token: selectedToken,
        baseURL: window.location.origin + '/v1',
        stream: true
      });

      let firstTokenTime = 0;
      let responseContent = '';

      await processStreamResponse(
        stream,
        (content: string) => {
          if (responseContent === '' && content) {
            firstTokenTime = Date.now();
          }
          responseContent += content;
          setCurrentAssistantMessage(responseContent);
        },
        isResponsesModel(selectedModel)
      );

      const completionTime = Date.now();
      const performance = {
        firstTokenTime: firstTokenTime - startTime,
        completionTime: completionTime - startTime,
        totalTokens: Math.round(responseContent.length / 4),
        tokensPerSecond: Math.round((responseContent.length / 4) / ((completionTime - startTime) / 1000))
      };

      const assistantMessage: Message = {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: responseContent,
        timestamp: Date.now(),
        performance
      };

      const finalMessages = [...currentMessages, assistantMessage];
      updateSessionMessages(finalMessages);

    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to generate response');

      const errorMessage: Message = {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: `Error: ${error.message || 'Unknown error occurred'}`,
        timestamp: Date.now(),
        error: error.message
      };

      updateSessionMessages([...currentMessages, errorMessage]);
    } finally {
      setLoading(false);
      setStreaming(false);
      setCurrentAssistantMessage('');
    }
  };

  // Message handlers
  const handleRegenerateMessage = async (index: number) => {
    if (index <= 0) return;

    const userMessageIndex = index - 1;
    const userMessage = messages[userMessageIndex];
    if (userMessage.role !== 'user') return;

    setRegeneratingMessageIndex(index);
    const newMessages = messages.slice(0, userMessageIndex + 1);
    await generateResponse(newMessages);
    setRegeneratingMessageIndex(null);
  };

  const handleDeleteMessage = (messageId: string) => {
    const newMessages = messages.filter(msg => msg.id !== messageId);
    updateSessionMessages(newMessages);
    toast.success('消息已删除');
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('内容已复制到剪贴板');
  };

  const handleEditMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId);
    setEditingContent(content);
  };

  const saveEditedMessage = () => {
    if (!editingMessageId) return;

    const newMessages = messages.map(msg =>
      msg.id === editingMessageId ? { ...msg, content: editingContent } : msg
    );
    updateSessionMessages(newMessages);
    setEditingMessageId(null);
    setEditingContent('');
    toast.success('消息已更新');
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditingContent('');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && editingMessageId) {
        cancelEdit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingMessageId]);

  // Render empty state
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
      <div className="mb-8">
        <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 opacity-80" />
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          开始新的对话
        </h3>
        <p className="text-muted-foreground max-w-md">
          选择一个模型，开始与AI助手对话。你可以询问任何问题或请求帮助。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
        <Button
          variant="outline"
          className="h-auto p-4 text-left justify-start"
          onClick={() => setPrompt('解释一个复杂的概念')}
          disabled={!selectedModel || !selectedToken}
        >
          <div>
            <div className="font-medium">💡 解释概念</div>
            <div className="text-xs text-muted-foreground mt-1">
              让AI解释复杂的概念或想法
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto p-4 text-left justify-start"
          onClick={() => setPrompt('帮我写一段代码')}
          disabled={!selectedModel || !selectedToken}
        >
          <div>
            <div className="font-medium">💻 编程帮助</div>
            <div className="text-xs text-muted-foreground mt-1">
              获取代码示例和编程建议
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto p-4 text-left justify-start"
          onClick={() => setPrompt('分析这个问题')}
          disabled={!selectedModel || !selectedToken}
        >
          <div>
            <div className="font-medium">🔍 问题分析</div>
            <div className="text-xs text-muted-foreground mt-1">
              深入分析复杂问题
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto p-4 text-left justify-start"
          onClick={() => setPrompt('帮我创作内容')}
          disabled={!selectedModel || !selectedToken}
        >
          <div>
            <div className="font-medium">✍️ 创意写作</div>
            <div className="text-xs text-muted-foreground mt-1">
              协助创作和写作任务
            </div>
          </div>
        </Button>
      </div>
    </div>
  );

  // Render message item
  const renderMessage = (msg: Message, index: number) => {
    const isUser = msg.role === 'user';
    const isEditing = editingMessageId === msg.id;

    return (
      <div
        key={msg.id}
        className={cn(
          "group relative mb-6 flex gap-4",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Avatar */}
        <Avatar className={cn(
          "flex-shrink-0 mt-1",
          isMobile ? "w-8 h-8" : "w-9 h-9"
        )}>
          <AvatarFallback className={cn(
            isUser
              ? "bg-primary text-primary-foreground"
              : msg.error
                ? "bg-destructive text-destructive-foreground"
                : "bg-secondary"
          )}>
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>

        {/* Message content */}
        <div className={cn(
          "flex-1 min-w-0 max-w-[85%]",
          isUser && "flex flex-col items-end"
        )}>
          {/* Message header */}
          <div className={cn(
            "flex items-center gap-2 mb-2 text-xs text-muted-foreground",
            isUser && "flex-row-reverse"
          )}>
            <span className="font-medium">
              {isUser ? '你' : 'AI 助手'}
            </span>
            {msg.timestamp && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>

          {/* Message bubble */}
          <Card className={cn(
            "border shadow-sm transition-shadow hover:shadow-md",
            isUser
              ? "bg-primary text-primary-foreground border-primary"
              : msg.error
                ? "bg-destructive/10 border-destructive/30"
                : "bg-background"
          )}>
            <CardContent className={cn(
              isMobile ? "p-3" : "p-4"
            )}>
              {isEditing ? (
                <div className="space-y-3">
                  <Textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="min-h-[60px] resize-none"
                    placeholder="编辑消息..."
                  />
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      取消
                    </Button>
                    <Button size="sm" onClick={saveEditedMessage}>
                      保存
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={cn(
                  isUser
                    ? "text-primary-foreground"
                    : "text-foreground"
                )}>
                  {msg.role === 'assistant' && !msg.error ? (
                    <div className={cn(
                      "prose prose-sm max-w-none",
                      "dark:prose-invert",
                      isUser && "prose-invert"
                    )}>
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  ) : (
                    <div className={cn(
                      "whitespace-pre-wrap text-sm leading-relaxed",
                      settings.wordWrap && "break-words"
                    )}>
                      {msg.content}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance metrics */}
          {msg.role === 'assistant' && msg.performance && settings.showPerformanceMetrics && (
            <div className="mt-2 flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                {msg.performance.firstTokenTime}ms
              </Badge>
              <Badge variant="outline" className="text-xs">
                总计: {msg.performance.completionTime}ms
              </Badge>
              <Badge variant="outline" className="text-xs">
                {msg.performance.tokensPerSecond} tokens/s
              </Badge>
            </div>
          )}

          {/* Message actions */}
          <div className={cn(
            "opacity-0 group-hover:opacity-100 transition-opacity mt-2 flex gap-1",
            isUser && "justify-end"
          )}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleCopyMessage(msg.content)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>复制内容</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {msg.role === 'user' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleEditMessage(msg.id!, msg.content)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>编辑消息</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {msg.role === 'assistant' && index > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      disabled={loading || streaming || regeneratingMessageIndex === index}
                      onClick={() => handleRegenerateMessage(index)}
                    >
                      <RotateCcw className="w-3 h-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>重新生成</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isUser ? "end" : "start"}>
                {msg.role === 'assistant' && (
                  <>
                    <DropdownMenuItem>
                      <ThumbsUp className="w-3 h-3 mr-2" />
                      好评
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ThumbsDown className="w-3 h-3 mr-2" />
                      差评
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem
                  onClick={() => handleDeleteMessage(msg.id!)}
                  className="text-destructive"
                >
                  <Trash2 className="w-3 h-3 mr-2" />
                  删除消息
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  };

  // Render streaming message
  const renderStreamingMessage = () => {
    if (!streaming || !currentAssistantMessage) return null;

    return (
      <div className="group relative mb-6 flex gap-4">
        <Avatar className={cn(
          "flex-shrink-0 mt-1",
          isMobile ? "w-8 h-8" : "w-9 h-9"
        )}>
          <AvatarFallback className="bg-secondary">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0 max-w-[85%]">
          <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
            <span className="font-medium">AI 助手</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>正在输入...</span>
            </div>
          </div>

          <Card className="border border-primary/50 shadow-sm">
            <CardContent className={cn(
              isMobile ? "p-3" : "p-4"
            )}>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <Markdown>{currentAssistantMessage}</Markdown>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Messages area */}
      <div className="flex-1 relative">
        <ScrollArea
          ref={scrollAreaRef}
          className="h-full"
        >
          <div className={cn(
            "p-4 space-y-4",
            isMobile ? "p-3" : "p-6"
          )}>
            {messages.length === 0 ? (
              renderEmptyState()
            ) : (
              <>
                {messages.map((msg, index) => renderMessage(msg, index))}
                {renderStreamingMessage()}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </ScrollArea>

        {/* Scroll to bottom button */}
        {showScrollToBottom && (
          <Button
            size="icon"
            className="absolute bottom-4 right-4 rounded-full shadow-lg"
            onClick={scrollToBottom}
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-background/95 backdrop-blur-sm">
        <div className={cn(
          "p-4 max-w-4xl mx-auto",
          isMobile ? "p-3" : "p-6"
        )}>
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                !selectedModel || !selectedToken
                  ? "请先选择模型和令牌..."
                  : "输入消息... (Enter 发送，Shift+Enter 换行)"
              }
              className={cn(
                "min-h-[60px] max-h-[200px] resize-none pr-12",
                "border-border focus:border-primary transition-colors",
                !selectedModel || !selectedToken && "opacity-50"
              )}
              style={{
                fontSize: settings.fontSize + 'px',
                fontFamily: 'inherit'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={loading || !selectedModel || !selectedToken}
            />

            <div className="absolute bottom-2 right-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={streaming ? () => {/* TODO: Stop generation */} : handleSendMessage}
                      disabled={(!prompt.trim() || !selectedModel || !selectedToken) && !streaming}
                    >
                      {streaming ? (
                        <Square className="w-4 h-4" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {streaming ? '停止生成' : '发送消息'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>
              Enter 发送 • Shift+Enter 换行
            </span>
            {prompt.length > 0 && (
              <span>{prompt.length} 字符</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}