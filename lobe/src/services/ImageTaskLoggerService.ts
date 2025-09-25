import { fetch, get, post, putJson } from '../utils/fetch';

export interface ImageTaskLogger {
  id: string;
  taskId: string;
  taskType: number;
  taskStatus: number;
  prompt: string;
  imageUrls?: string;
  quota: number;
  modelName: string;
  tokenName?: string;
  userName?: string;
  userId?: string;
  channelId?: string;
  channelName?: string;
  totalTime: number;
  ip?: string;
  userAgent?: string;
  organizationId?: string;
  url?: string;
  isSuccess: boolean;
  errorMessage?: string;
  taskParameters?: string;
  progress: number;
  taskCreatedAt?: string;
  taskCompletedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ImageTaskLoggerRequest {
  page: number;
  pageSize: number;
  taskType?: number;
  taskStatus?: number;
  model?: string;
  startTime?: string;
  endTime?: string;
  keyword?: string;
  userId?: string;
}

export interface ImageTaskStatistics {
  taskTypes: Array<{
    taskType: string;
    total: number;
    completed: number;
    failed: number;
    processing: number;
    totalQuota: number;
  }>;
  totalTasks: number;
  totalQuota: number;
  successRate: number;
}

// 获取图片任务日志列表
export function getImageTaskLoggers(params: ImageTaskLoggerRequest) {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });
  return get(`/api/v1/image-tasks?${queryParams.toString()}`);
}

// 根据TaskId获取任务详情
export function getImageTaskByTaskId(taskId: string) {
  return get(`/api/v1/image-tasks/${taskId}`);
}

// 获取图片任务统计信息
export function getImageTaskStatistics(startTime?: string, endTime?: string) {
  const queryParams = new URLSearchParams();
  if (startTime) queryParams.append('startTime', startTime);
  if (endTime) queryParams.append('endTime', endTime);
  return get(`/api/v1/image-tasks/statistics?${queryParams.toString()}`);
}

// 更新任务状态
export function updateImageTaskStatus(taskId: string, data: {
  status: number;
  progress?: number;
  imageUrls?: string[];
  errorMessage?: string;
}) {
  return fetch(`/api/v1/image-tasks/${taskId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
}

// 导出图片任务日志
export function exportImageTasks(params: Omit<ImageTaskLoggerRequest, 'page' | 'pageSize'>) {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });
  return get(`/api/v1/image-tasks/export?${queryParams.toString()}`);
}

// 获取任务类型列表
export function getTaskTypes() {
  return get('/api/v1/image-tasks/task-types');
}

// 获取任务状态列表
export function getTaskStatuses() {
  return get('/api/v1/image-tasks/task-statuses');
}

// 任务类型映射
export const TaskTypeMap: Record<number, string> = {
  1: 'Imagine',
  2: 'Blend',
  3: 'Describe',
  4: 'Shorten',
  5: 'Modal'
};

// 任务状态映射
export const TaskStatusMap: Record<number, string> = {
  1: '已提交',
  2: '处理中',
  3: '已完成',
  4: '失败',
  5: '已取消'
};

// 任务状态颜色映射
export const TaskStatusColorMap: Record<number, string> = {
  1: 'default',
  2: 'secondary',
  3: 'default',
  4: 'destructive',
  5: 'outline'
};

// 事件监听器类型
export type ImageTaskEventListener = (task: ImageTaskLogger) => void;

// 事件管理器
class ImageTaskEventManager {
  private listeners: Map<string, ImageTaskEventListener[]> = new Map();
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  // 连接 WebSocket
  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/image-tasks`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('Image task WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleEvent(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('Image task WebSocket disconnected');
      this.scheduleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('Image task WebSocket error:', error);
    };
  }

  // 断线重连
  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  // 处理事件
  private handleEvent(data: any) {
    const { type, taskId, task } = data;
    const listeners = this.listeners.get(type) || [];
    listeners.forEach(listener => listener(task));

    // 触发特定任务 ID 的监听器
    const taskListeners = this.listeners.get(`task:${taskId}`) || [];
    taskListeners.forEach(listener => listener(task));
  }

  // 订阅事件
  subscribe(eventType: string, listener: ImageTaskEventListener) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)!.push(listener);

    // 确保 WebSocket 连接
    this.connect();

    return () => this.unsubscribe(eventType, listener);
  }

  // 取消订阅
  unsubscribe(eventType: string, listener: ImageTaskEventListener) {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // 订阅特定任务
  subscribeToTask(taskId: string, listener: ImageTaskEventListener) {
    return this.subscribe(`task:${taskId}`, listener);
  }

  // 订阅所有任务状态变化
  subscribeToStatusChanges(listener: ImageTaskEventListener) {
    return this.subscribe('status_change', listener);
  }

  // 订阅任务完成事件
  subscribeToTaskCompletion(listener: ImageTaskEventListener) {
    return this.subscribe('task_completed', listener);
  }

  // 订阅任务失败事件
  subscribeToTaskFailure(listener: ImageTaskEventListener) {
    return this.subscribe('task_failed', listener);
  }

  // 断开连接
  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.listeners.clear();
  }
}

// 全局事件管理器实例
export const imageTaskEventManager = new ImageTaskEventManager();