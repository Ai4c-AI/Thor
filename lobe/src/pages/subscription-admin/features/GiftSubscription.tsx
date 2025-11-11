import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Gift, User, CreditCard, Info, Search, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { giftSubscription } from "../../../services/SubscriptionService";
import { getUserByUserName } from "../../../services/UserService";
import { renderQuota } from "../../../utils/render";

interface GiftSubscriptionProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  plans: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    type: number;
    dailyQuotaLimit: number;
    weeklyQuotaLimit: number;
    isActive: boolean;
    level: number;
    tag?: string;
  }>;
}

interface UserInfo {
  id: string;
  userName: string;
  email: string;
  groups: string[];
  residualCredit: number;
}

export default function GiftSubscription({
  visible,
  onCancel,
  onSuccess,
  plans,
}: GiftSubscriptionProps) {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userLookupLoading, setUserLookupLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const activePlans = plans.filter(plan => plan.isActive);
  const selectedPlan = activePlans.find(plan => plan.id === selectedPlanId);

  function getTypeText(type: number): string {
    switch (type) {
      case 3: return '包周';
      case 1: return '包月';
      case 2: return '包年';
      default: return type.toString();
    }
  }

  // 查找用户信息
  const lookupUser = async () => {
    if (!userName.trim()) {
      return;
    }

    setUserLookupLoading(true);
    setUserNotFound(false);
    setUserInfo(null);

    try {
      const result = await getUserByUserName(userName.trim());
      if (result.success && result.data) {
        setUserInfo(result.data || {});
        setUserNotFound(false);
      } else {
        setUserNotFound(true);
        setUserInfo(null);
      }
    } catch (error: any) {
      console.error("查找用户时出错:", error);
      setUserNotFound(true);
      setUserInfo(null);
    } finally {
      setUserLookupLoading(false);
    }
  };

  // 当用户名改变时，延迟查找用户
  useEffect(() => {
    if (!userName.trim()) {
      setUserInfo(null);
      setUserNotFound(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      lookupUser();
    }, 500); // 500ms 延迟

    return () => clearTimeout(timeoutId);
  }, [userName]);

  const handleSubmit = async () => {
    if (!userInfo) {
      toast.error("请先输入有效的用户名");
      return;
    }

    if (!selectedPlanId) {
      toast.error("请选择要赠送的套餐");
      return;
    }

    setLoading(true);
    try {
      const result = await giftSubscription(userInfo.id, selectedPlanId);
      if (result.success) {
        toast.success("套餐赠送成功！");
        setUserName("");
        setSelectedPlanId("");
        setUserInfo(null);
        setUserNotFound(false);
        onSuccess();
      } else {
        toast.error(result.message || "赠送失败");
      }
    } catch (error: any) {
      console.error("赠送套餐时出错:", error);
      toast.error(error.message || "赠送套餐时出现错误");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setUserName("");
    setSelectedPlanId("");
    setUserInfo(null);
    setUserNotFound(false);
    onCancel();
  };

  return (
    <Dialog open={visible} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            赠送套餐
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              用户名
            </Label>
            <div className="relative">
              <Input
                id="userName"
                placeholder="请输入要赠送的用户名"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {userLookupLoading && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* 用户信息显示 */}
          {userInfo && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-medium">找到用户：{userInfo.userName}</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">邮箱：</span>
                      <span>{userInfo.email}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">余额：</span>
                      <span>{renderQuota(userInfo.residualCredit)}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">分组：</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {userInfo.groups.map((group) => (
                          <Badge key={group} variant="outline" className="text-xs">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* 用户未找到提示 */}
          {userNotFound && userName.trim() && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                未找到用户名为 "{userName}" 的用户，请检查输入是否正确。
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              选择套餐
            </Label>
            <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
              <SelectTrigger>
                <SelectValue placeholder="请选择要赠送的套餐" />
              </SelectTrigger>
              <SelectContent>
                {activePlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    <div className="flex items-center gap-2">
                      <span>{plan.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {getTypeText(plan.type)}
                      </Badge>
                      {plan.tag && (
                        <Badge variant="secondary" className="text-xs">
                          {plan.tag}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPlan && (
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">套餐详情</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">套餐名称：</span>
                      <span className="font-medium">{selectedPlan.name}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">原价：</span>
                      <span className="font-medium">¥{selectedPlan.price}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">日额度：</span>
                      <span className="font-medium">{renderQuota(selectedPlan.dailyQuotaLimit)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">周额度：</span>
                      <span className="font-medium">{renderQuota(selectedPlan.weeklyQuotaLimit)}</span>
                    </div>
                  </div>
                  {selectedPlan.description && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">描述：</span>
                      <span>{selectedPlan.description}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              取消
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || !userInfo || !selectedPlanId}
            >
              {loading ? "赠送中..." : "确认赠送"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}