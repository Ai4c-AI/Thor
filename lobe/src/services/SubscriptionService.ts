import { get, post, postJson, put, putJson, del } from '../utils/fetch';

// 获取所有可用套餐
export function getAvailablePlans() {
  return get('/api/v1/subscription/plans');
}

// 获取用户当前订阅状态
export function getUserCurrentSubscription() {
  return get('/api/v1/subscription/current');
}

// 获取用户当前订阅详情（包含使用额度）
export function getUserCurrentSubscriptionDetailed() {
  return get('/api/v1/subscription/current-detailed');
}

// 获取用户订阅状态摘要
export function getUserSubscriptionSummary() {
  return get('/api/v1/subscription/summary');
}

// 获取用户订阅历史
export function getUserSubscriptionHistory() {
  return get('/api/v1/subscription/history');
}

// 获取用户购买记录
export function getUserPurchaseRecords() {
  return get('/api/v1/subscription/purchases');
}

// 获取用户额度使用统计
export function getUserQuotaUsage(days: number = 7) {
  return get(`/api/v1/subscription/usage?days=${days}`);
}

// 创建套餐购买订单
export function createPurchaseOrder(planId: string, paymentMethod: string = 'alipay') {
  return postJson('/api/v1/subscription/purchase', {
    planId,
    paymentMethod
  });
}

// 发起套餐支付
export function startPayment(purchaseRecordId: string) {
  return postJson(`/api/v1/subscription/payment/${purchaseRecordId}`, {});
}

// 查询支付状态
export function getPaymentStatus(purchaseRecordId: string) {
  return get(`/api/v1/subscription/payment/${purchaseRecordId}/status`);
}

// 取消支付
export function cancelPayment(purchaseRecordId: string, reason?: string) {
  return postJson(`/api/v1/subscription/payment/${purchaseRecordId}/cancel`, {
    reason
  });
}

// 套餐升级相关接口

// 获取可升级的套餐列表
export function getUpgradeablePlans() {
  return get('/api/v1/subscription/upgradeable-plans');
}

// 计算升级费用
export function calculateUpgradeCost(targetPlanId: string) {
  return postJson('/api/v1/subscription/calculate-upgrade-cost', {
    targetPlanId
  });
}

// 创建升级记录
export function createUpgrade(targetPlanId: string) {
  return postJson('/api/v1/subscription/upgrade', {
    targetPlanId
  });
}

// 执行免费升级
export function executeFreeUpgrade(upgradeId: string) {
  return postJson(`/api/v1/subscription/upgrade/${upgradeId}/execute-free`, {});
}

// 发起升级支付
export function startUpgradePayment(upgradeId: string) {
  return postJson(`/api/v1/subscription/upgrade/${upgradeId}/payment`, {});
}

// 取消升级
export function cancelUpgrade(upgradeId: string, reason?: string) {
  return postJson(`/api/v1/subscription/upgrade/${upgradeId}/cancel`, {
    reason
  });
}

// 获取用户升级历史
export function getUserUpgradeHistory() {
  return get('/api/v1/subscription/upgrade/history');
}

// 管理员接口（仅供管理员使用）

// 创建套餐
export function createSubscriptionPlan(plan: any) {
  return postJson('/api/v1/subscription/admin/plans', plan);
}

// 更新套餐
export function updateSubscriptionPlan(id: string, plan: any) {
  return putJson(`/api/v1/subscription/admin/plans/${id}`, plan);
}

// 删除套餐
export function deleteSubscriptionPlan(id: string) {
  return del(`/api/v1/subscription/admin/plans/${id}`);
}

// 获取所有套餐（包括禁用的）
export function getAllSubscriptionPlans() {
  return get('/api/v1/subscription/admin/plans');
}

// 获取用户订阅列表
export function getUserSubscriptions(page: number = 1, pageSize: number = 10, userId?: string, status?: string) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString()
  });

  if (userId) params.append('userId', userId);
  if (status) params.append('status', status);

  return get(`/api/v1/subscription/admin/users?${params.toString()}`);
}

// 获取购买记录列表
export function getPurchaseRecords(page: number = 1, pageSize: number = 10, userId?: string, status?: string) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString()
  });

  if (userId) params.append('userId', userId);
  if (status) params.append('status', status);

  return get(`/api/v1/subscription/admin/purchases?${params.toString()}`);
}

// 获取额度使用统计
export function getUsageStats(userId?: string, startDate?: string, endDate?: string) {
  const params = new URLSearchParams();

  if (userId) params.append('userId', userId);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  return get(`/api/v1/subscription/admin/usage-stats?${params.toString()}`);
}

// 赠送套餐给用户
export function giftSubscription(targetUserId: string, planId: string) {
  return postJson('/api/v1/subscription/admin/gift', {
    targetUserId,
    planId
  });
}

// 手动触发维护任务
export function triggerMaintenance() {
  return postJson('/api/v1/subscription/admin/maintenance', {});
}