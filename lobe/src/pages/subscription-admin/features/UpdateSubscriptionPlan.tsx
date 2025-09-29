import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Switch } from "../../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import { X, Plus, Crown, Star, Zap, Users, Diamond, Gift, Heart, Shield } from "lucide-react";
import { toast } from "sonner";
import { updateSubscriptionPlan } from "../../../services/SubscriptionService";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 1 | 2 | 3; // 1=Monthly, 2=Yearly, 3=Weekly
  allowedModels: string[];
  dailyQuotaLimit: number;
  weeklyQuotaLimit: number;
  isActive: boolean;
  level: number;
  icon?: string;
  tag?: string;
  sort: number;
  createdAt: string;
  groups?: string[];
}

interface UpdateSubscriptionPlanProps {
  visible: boolean;
  value: SubscriptionPlan;
  onCancel: () => void;
  onSuccess: () => void;
}

const availableModels = [
  'gpt-3.5-turbo',
  'gpt-4',
  'gpt-4-turbo',
  'gpt-5-codex',
  'claude-3-haiku',
  'claude-3-sonnet',
  'claude-3-opus',
  'gemini-pro',
  'gemini-1.5-pro'
];

const iconOptions = [
  { value: 'crown', label: '皇冠', icon: Crown },
  { value: 'star', label: '星星', icon: Star },
  { value: 'zap', label: '闪电', icon: Zap },
  { value: 'users', label: '用户', icon: Users },
  { value: 'diamond', label: '钻石', icon: Diamond },
  { value: 'gift', label: '礼品', icon: Gift },
  { value: 'heart', label: '爱心', icon: Heart },
  { value: 'shield', label: '盾牌', icon: Shield },
];

export default function UpdateSubscriptionPlan({ visible, value, onCancel, onSuccess }: UpdateSubscriptionPlanProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    type: 1 as 1 | 2 | 3, // 1=Monthly, 2=Yearly, 3=Weekly
    allowedModels: [] as string[],
    dailyQuotaLimit: '',
    weeklyQuotaLimit: '',
    isActive: true,
    level: '',
    icon: '',
    tag: '',
    sort: '',
    groups: [] as string[]
  });

  const [newModel, setNewModel] = useState('');
  const [newGroup, setNewGroup] = useState('');

  useEffect(() => {
    if (visible && value && value.id) {
      console.log('Loading plan data:', value); // 调试日志
      setForm({
        name: value.name || '',
        description: value.description || '',
        price: value.price?.toString() || '',
        type: value.type || 1,
        allowedModels: value.allowedModels ? [...value.allowedModels] : [],
        dailyQuotaLimit: value.dailyQuotaLimit?.toString() || '',
        weeklyQuotaLimit: value.weeklyQuotaLimit?.toString() || '',
        isActive: value.isActive ?? true,
        level: value.level?.toString() || '',
        icon: value.icon || '',
        tag: value.tag || '',
        sort: value.sort?.toString() || '',
        groups: value.groups ? [...value.groups] : []
      });
      setNewModel(''); // 重置新模型输入
    }
  }, [visible, value]);

  function handleSubmit() {
    if (!form.name || !form.description || !form.price || !form.dailyQuotaLimit || !form.weeklyQuotaLimit || !form.level || !form.sort) {
      toast.error('请填写所有必填字段');
      return;
    }

    if (form.allowedModels.length === 0) {
      toast.error('请至少选择一个AI模型');
      return;
    }

    setLoading(true);

    const planData = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      type: form.type,
      allowedModels: form.allowedModels,
      dailyQuotaLimit: parseInt(form.dailyQuotaLimit),
      weeklyQuotaLimit: parseInt(form.weeklyQuotaLimit),
      isActive: form.isActive,
      level: parseInt(form.level),
      icon: form.icon || undefined,
      tag: form.tag || undefined,
      sort: parseInt(form.sort),
      groups: form.groups.length > 0 ? form.groups : undefined
    };

    updateSubscriptionPlan(value.id, planData)
      .then((res) => {
        if (res.success) {
          toast.success('套餐更新成功');
          onSuccess();
        } else {
          toast.error('更新套餐失败');
        }
      })
      .catch((error) => {
        toast.error('更新套餐时出现错误');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function addModel() {
    if (newModel && !form.allowedModels.includes(newModel)) {
      setForm(prev => ({
        ...prev,
        allowedModels: [...prev.allowedModels, newModel]
      }));
      setNewModel('');
    }
  }

  function removeModel(model: string) {
    setForm(prev => ({
      ...prev,
      allowedModels: prev.allowedModels.filter(m => m !== model)
    }));
  }

  function addGroup() {
    if (newGroup && !form.groups.includes(newGroup)) {
      setForm(prev => ({
        ...prev,
        groups: [...prev.groups, newGroup]
      }));
      setNewGroup('');
    }
  }

  function removeGroup(group: string) {
    setForm(prev => ({
      ...prev,
      groups: prev.groups.filter(g => g !== group)
    }));
  }

  function handleCancel() {
    // 重置表单
    setForm({
      name: '',
      description: '',
      price: '',
      type: 1, // Default to Monthly
      allowedModels: [],
      dailyQuotaLimit: '',
      weeklyQuotaLimit: '',
      isActive: true,
      level: '',
      icon: '',
      tag: '',
      sort: '',
      groups: []
    });
    setNewModel('');
    onCancel();
  }

  return (
    <Dialog open={visible} onOpenChange={handleCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>编辑套餐</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">套餐名称 *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="输入套餐名称"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">价格 *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">套餐描述 *</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="输入套餐描述"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">套餐类型 *</Label>
              <Select
                value={form.type.toString()}
                onValueChange={(value: string) => setForm(prev => ({ ...prev, type: parseInt(value) as 1 | 2 | 3 }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">包周</SelectItem>
                  <SelectItem value="1">包月</SelectItem>
                  <SelectItem value="2">包年</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">套餐等级 *</Label>
              <Input
                id="level"
                type="number"
                value={form.level}
                onChange={(e) => setForm(prev => ({ ...prev, level: e.target.value }))}
                placeholder="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dailyQuotaLimit">日额度限制 * <span className="text-xs font-normal text-muted-foreground">(单位: 额度点数)</span></Label>
              <Input
                id="dailyQuotaLimit"
                type="number"
                value={form.dailyQuotaLimit}
                onChange={(e) => setForm(prev => ({ ...prev, dailyQuotaLimit: e.target.value }))}
                placeholder="500000"
              />
              <p className="text-xs text-muted-foreground">
                每日可消耗的额度点数，例如：500000 = $1.00
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weeklyQuotaLimit">周额度限制 * <span className="text-xs font-normal text-muted-foreground">(单位: 额度点数)</span></Label>
              <Input
                id="weeklyQuotaLimit"
                type="number"
                value={form.weeklyQuotaLimit}
                onChange={(e) => setForm(prev => ({ ...prev, weeklyQuotaLimit: e.target.value }))}
                placeholder="2500000"
              />
              <p className="text-xs text-muted-foreground">
                每周可消耗的额度点数，例如：2500000 = $5.00
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">套餐图标</Label>
              <Select value={form.icon} onValueChange={(value) => setForm(prev => ({ ...prev, icon: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="选择图标">
                    {form.icon && iconOptions.find(opt => opt.value === form.icon) && (
                      <div className="flex items-center gap-2">
                        {(() => {
                          const IconComponent = iconOptions.find(opt => opt.value === form.icon)?.icon;
                          return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
                        })()}
                        {iconOptions.find(opt => opt.value === form.icon)?.label}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <option.icon className="h-4 w-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="或输入自定义图标名称"
                value={form.icon}
                onChange={(e) => setForm(prev => ({ ...prev, icon: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground">
                可选择预设图标或输入自定义图标名称
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tag">套餐标签</Label>
              <Select value={form.tag} onValueChange={(value) => setForm(prev => ({ ...prev, tag: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="选择标签" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="推荐">推荐</SelectItem>
                  <SelectItem value="热门">热门</SelectItem>
                  <SelectItem value="限时">限时</SelectItem>
                  <SelectItem value="新用户">新用户</SelectItem>
                  <SelectItem value="企业">企业</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="或输入自定义标签"
                value={form.tag}
                onChange={(e) => setForm(prev => ({ ...prev, tag: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort">排序 *</Label>
            <Input
              id="sort"
              type="number"
              value={form.sort}
              onChange={(e) => setForm(prev => ({ ...prev, sort: e.target.value }))}
              placeholder="1"
            />
          </div>

          <div className="space-y-2">
            <Label>允许的AI模型 *</Label>
            <div className="flex gap-2">
              <Select value={newModel} onValueChange={(value) => {
                setNewModel(value);
                // 自动添加选择的模型
                if (value && !form.allowedModels.includes(value)) {
                  setForm(prev => ({
                    ...prev,
                    allowedModels: [...prev.allowedModels, value]
                  }));
                  setNewModel('');
                }
              }}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="选择常用模型" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels
                    .filter(model => !form.allowedModels.includes(model))
                    .map(model => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" onClick={addModel} disabled={!newModel}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="或手动输入模型名称"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addModel();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addModel} disabled={!newModel}>
                添加
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.allowedModels.map(model => (
                <Badge key={model} variant="secondary" className="flex items-center gap-1">
                  {model}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeModel(model)}
                  />
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              可以从下拉列表选择常用模型，也可以手动输入任何模型名称
            </p>
          </div>

          <div className="space-y-2">
            <Label>绑定分组 <span className="text-xs font-normal text-muted-foreground">(可选，不绑定则使用用户默认分组)</span></Label>
            <div className="flex gap-2">
              <Input
                placeholder="输入分组代码"
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addGroup();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addGroup} disabled={!newGroup}>
                添加分组
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.groups.map(group => (
                <Badge key={group} variant="secondary" className="flex items-center gap-1">
                  {group}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => removeGroup(group)}
                  />
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              绑定的分组将限制套餐只能使用指定分组的渠道，不绑定则使用用户默认分组
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={form.isActive}
              onCheckedChange={(checked) => setForm(prev => ({ ...prev, isActive: checked }))}
            />
            <Label htmlFor="isActive">启用套餐</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onCancel}>
              取消
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "更新中..." : "更新套餐"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}