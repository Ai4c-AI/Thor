// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Channel Types
export interface Channel {
  id: string;
  name: string;
  type: number;
  typeName?: string;
  key: string;
  order: number;
  status: number;
  disabled: boolean;
  disable?: boolean; // Alternative property name used in some places
  models: string[];
  group: string;
  groups?: string[]; // Alternative property name used in some places
  priority: number;
  quota: number;
  usedQuota: number;
  remainQuota?: number;
  responseTime: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
  code?: string;
  rate?: number;
  address?: string;
  other?: string;
  cache?: boolean;
  supportsResponses?: boolean;
  controlAutomatically?: boolean;
}

// Model Types
export interface Model {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
}

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  quota: number;
  usedQuota: number;
  createdAt: string;
  updatedAt: string;
}

// Token Types
export interface Token {
  id: string;
  name: string;
  key: string;
  quota: number;
  usedQuota: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

// Rate Limit Types
export interface RateLimit {
  id: string;
  name: string;
  strategy: string;
  limit: number;
  value: number;
  whiteList: string[];
  blackList: string[];
  model: string[];
  description?: string;
}

// Form Types for creating/updating
export interface CreateChannelData {
  name: string;
  type: number;
  key: string;
  models: string[];
  group: string;
  priority: number;
  description?: string;
}

export interface UpdateChannelData extends Partial<CreateChannelData> {
  id: string;
}

// Common pagination input
export interface PaginationInput {
  page: number;
  pageSize: number;
  keyword?: string;
}