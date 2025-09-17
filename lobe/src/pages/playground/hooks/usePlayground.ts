import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export type WorkspaceType = 'chat' | 'image' | 'fal';
export type ThemeMode = 'light' | 'dark' | 'auto';
export type LayoutDensity = 'compact' | 'comfortable' | 'spacious';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  performance?: {
    firstTokenTime?: number;
    completionTime?: number;
    totalTokens?: number;
    tokensPerSecond?: number;
  };
  error?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  tokenId: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  createdAt: number;
  updatedAt: number;
  pinned?: boolean;
  tags?: string[];
}

export interface PlaygroundSettings {
  theme: ThemeMode;
  layoutDensity: LayoutDensity;
  autoSave: boolean;
  soundEnabled: boolean;
  autoScroll: boolean;
  showPerformanceMetrics: boolean;
  wordWrap: boolean;
  fontSize: number;
}

export interface PlaygroundState {
  // 工作区状态
  activeWorkspace: WorkspaceType;

  // 模型配置
  selectedToken: string;
  selectedModel: string;
  modelOptions: string[];
  tokenOptions: any[];

  // 聊天参数
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;

  // 图像参数
  imageSize: string;
  imageStyle: string;
  imageQuality: string;

  // 会话管理
  currentSessionId: string;
  sessions: ChatSession[];

  // UI状态
  loading: boolean;
  streaming: boolean;
  sidebarCollapsed: boolean;
  configPanelCollapsed: boolean;
  fullScreen: boolean;

  // 设置
  settings: PlaygroundSettings;

  // 操作方法
  setActiveWorkspace: (workspace: WorkspaceType) => void;
  setSelectedToken: (token: string) => void;
  setSelectedModel: (model: string) => void;
  setModelOptions: (options: string[]) => void;
  setTokenOptions: (options: any[]) => void;
  setSystemPrompt: (prompt: string) => void;
  setTemperature: (temperature: number) => void;
  setMaxTokens: (maxTokens: number) => void;
  setTopP: (topP: number) => void;
  setFrequencyPenalty: (penalty: number) => void;
  setPresencePenalty: (penalty: number) => void;
  setImageSize: (size: string) => void;
  setImageStyle: (style: string) => void;
  setImageQuality: (quality: string) => void;
  setLoading: (loading: boolean) => void;
  setStreaming: (streaming: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setConfigPanelCollapsed: (collapsed: boolean) => void;
  setFullScreen: (fullScreen: boolean) => void;
  setSettings: (settings: Partial<PlaygroundSettings>) => void;

  // 会话管理
  createSession: () => void;
  deleteSession: (sessionId: string) => void;
  switchSession: (sessionId: string) => void;
  updateSession: (sessionId: string, updates: Partial<ChatSession>) => void;
  duplicateSession: (sessionId: string) => void;
  exportSession: (sessionId: string) => void;
  importSessions: (sessions: ChatSession[]) => void;

  // 快捷操作
  resetToDefaults: () => void;
  toggleTheme: () => void;
  saveCurrentState: () => void;
  loadSavedState: () => void;
}

const STORAGE_KEYS = {
  SESSIONS: 'playground_sessions',
  CURRENT_SESSION: 'playground_current_session',
  SETTINGS: 'playground_settings',
  MODEL_CONFIG: 'playground_model_config',
};

const DEFAULT_SETTINGS: PlaygroundSettings = {
  theme: 'auto',
  layoutDensity: 'comfortable',
  autoSave: true,
  soundEnabled: false,
  autoScroll: true,
  showPerformanceMetrics: true,
  wordWrap: true,
  fontSize: 14,
};

const DEFAULT_SESSION: Omit<ChatSession, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'New Conversation',
  messages: [],
  model: '',
  tokenId: '',
  systemPrompt: 'You are a helpful AI assistant.',
  temperature: 0.7,
  maxTokens: 2048,
  pinned: false,
  tags: [],
};

export const usePlayground = (): PlaygroundState => {
  // 工作区状态
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceType>('chat');

  // 模型配置
  const [selectedToken, setSelectedToken] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [tokenOptions, setTokenOptions] = useState<any[]>([]);

  // 聊天参数
  const [systemPrompt, setSystemPrompt] = useState<string>('You are a helpful AI assistant.');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [maxTokens, setMaxTokens] = useState<number>(2048);
  const [topP, setTopP] = useState<number>(1.0);
  const [frequencyPenalty, setFrequencyPenalty] = useState<number>(0);
  const [presencePenalty, setPresencePenalty] = useState<number>(0);

  // 图像参数
  const [imageSize, setImageSize] = useState<string>('1024x1024');
  const [imageStyle, setImageStyle] = useState<string>('vivid');
  const [imageQuality, setImageQuality] = useState<string>('standard');

  // 会话管理
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  // UI状态
  const [loading, setLoading] = useState<boolean>(false);
  const [streaming, setStreaming] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [configPanelCollapsed, setConfigPanelCollapsed] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  // 设置
  const [settings, setSettingsState] = useState<PlaygroundSettings>(DEFAULT_SETTINGS);

  // 初始化时加载保存的状态
  useEffect(() => {
    loadSavedState();
  }, []);

  // 自动保存当前状态
  useEffect(() => {
    if (settings.autoSave) {
      saveCurrentState();
    }
  }, [sessions, currentSessionId, selectedToken, selectedModel, settings]);

  // 会话管理方法
  const createSession = useCallback(() => {
    const newSession: ChatSession = {
      ...DEFAULT_SESSION,
      id: `session_${Date.now()}`,
      model: selectedModel,
      tokenId: selectedToken,
      systemPrompt,
      temperature,
      maxTokens,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    toast.success('新会话已创建');
  }, [selectedModel, selectedToken, systemPrompt, temperature, maxTokens]);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      const remainingSessions = sessions.filter(s => s.id !== sessionId);
      setCurrentSessionId(remainingSessions[0]?.id || '');
    }
    toast.success('会话已删除');
  }, [currentSessionId, sessions]);

  const switchSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      // 恢复会话的模型配置
      setSelectedModel(session.model);
      setSelectedToken(session.tokenId);
      setSystemPrompt(session.systemPrompt);
      setTemperature(session.temperature);
      setMaxTokens(session.maxTokens);
    }
  }, [sessions]);

  const updateSession = useCallback((sessionId: string, updates: Partial<ChatSession>) => {
    setSessions(prev => prev.map(session =>
      session.id === sessionId
        ? { ...session, ...updates, updatedAt: Date.now() }
        : session
    ));
  }, []);

  const duplicateSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      const duplicatedSession: ChatSession = {
        ...session,
        id: `session_${Date.now()}`,
        title: `${session.title} (副本)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setSessions(prev => [duplicatedSession, ...prev]);
      toast.success('会话已复制');
    }
  }, [sessions]);

  const exportSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      const dataStr = JSON.stringify(session, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${session.title}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('会话已导出');
    }
  }, [sessions]);

  const importSessions = useCallback((importedSessions: ChatSession[]) => {
    setSessions(prev => [...importedSessions, ...prev]);
    toast.success(`已导入 ${importedSessions.length} 个会话`);
  }, []);

  // 快捷操作
  const resetToDefaults = useCallback(() => {
    setSystemPrompt('You are a helpful AI assistant.');
    setTemperature(0.7);
    setMaxTokens(2048);
    setTopP(1.0);
    setFrequencyPenalty(0);
    setPresencePenalty(0);
    setImageSize('1024x1024');
    setImageStyle('vivid');
    setImageQuality('standard');
    toast.success('已重置为默认配置');
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    setSettingsState(prev => ({ ...prev, theme: newTheme }));
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, [settings.theme]);

  const saveCurrentState = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
      localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, currentSessionId);
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      localStorage.setItem(STORAGE_KEYS.MODEL_CONFIG, JSON.stringify({
        selectedToken,
        selectedModel,
        systemPrompt,
        temperature,
        maxTokens,
        topP,
        frequencyPenalty,
        presencePenalty,
        imageSize,
        imageStyle,
        imageQuality,
      }));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [sessions, currentSessionId, settings, selectedToken, selectedModel, systemPrompt, temperature, maxTokens, topP, frequencyPenalty, presencePenalty, imageSize, imageStyle, imageQuality]);

  const loadSavedState = useCallback(() => {
    try {
      const savedSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      const savedCurrentSession = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const savedModelConfig = localStorage.getItem(STORAGE_KEYS.MODEL_CONFIG);

      if (savedSessions) {
        setSessions(JSON.parse(savedSessions));
      }

      if (savedCurrentSession) {
        setCurrentSessionId(savedCurrentSession);
      }

      if (savedSettings) {
        setSettingsState({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
      }

      if (savedModelConfig) {
        const config = JSON.parse(savedModelConfig);
        setSelectedToken(config.selectedToken || '');
        setSelectedModel(config.selectedModel || '');
        setSystemPrompt(config.systemPrompt || 'You are a helpful AI assistant.');
        setTemperature(config.temperature || 0.7);
        setMaxTokens(config.maxTokens || 2048);
        setTopP(config.topP || 1.0);
        setFrequencyPenalty(config.frequencyPenalty || 0);
        setPresencePenalty(config.presencePenalty || 0);
        setImageSize(config.imageSize || '1024x1024');
        setImageStyle(config.imageStyle || 'vivid');
        setImageQuality(config.imageQuality || 'standard');
      }
    } catch (error) {
      console.error('Failed to load saved state:', error);
    }
  }, []);

  const setSettings = useCallback((newSettings: Partial<PlaygroundSettings>) => {
    setSettingsState(prev => ({ ...prev, ...newSettings }));
  }, []);

  return {
    // 工作区状态
    activeWorkspace,

    // 模型配置
    selectedToken,
    selectedModel,
    modelOptions,
    tokenOptions,

    // 聊天参数
    systemPrompt,
    temperature,
    maxTokens,
    topP,
    frequencyPenalty,
    presencePenalty,

    // 图像参数
    imageSize,
    imageStyle,
    imageQuality,

    // 会话管理
    currentSessionId,
    sessions,

    // UI状态
    loading,
    streaming,
    sidebarCollapsed,
    configPanelCollapsed,
    fullScreen,

    // 设置
    settings,

    // 操作方法
    setActiveWorkspace,
    setSelectedToken,
    setSelectedModel,
    setModelOptions,
    setTokenOptions,
    setSystemPrompt,
    setTemperature,
    setMaxTokens,
    setTopP,
    setFrequencyPenalty,
    setPresencePenalty,
    setImageSize,
    setImageStyle,
    setImageQuality,
    setLoading,
    setStreaming,
    setSidebarCollapsed,
    setConfigPanelCollapsed,
    setFullScreen,
    setSettings,

    // 会话管理
    createSession,
    deleteSession,
    switchSession,
    updateSession,
    duplicateSession,
    exportSession,
    importSessions,

    // 快捷操作
    resetToDefaults,
    toggleTheme,
    saveCurrentState,
    loadSavedState,
  };
};