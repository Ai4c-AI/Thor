import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { createModelMap, ModelMap } from "../../../services/ModelMapService";
import { getModelList } from '../../../services/ModelService';
import { getList } from "../../../services/UserGroupService";
import { useTranslation } from 'react-i18next';
import { cn } from "../../../lib/utils";

interface CreateModelMapProps {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CreateModelMap({ visible, onSuccess, onCancel }: CreateModelMapProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    modelId: '',
    group: [] as string[],
    modelMapItems: [{ modelId: '', order: 1 }]
  });

  useEffect(() => {
    if (visible) {
      // 加载模型列表
      getModelList().then((res: any) => {
        if (res.success) {
          setModels(res.data);
        } else {
          toast.error(t('modelMap.loadError'));
        }
      });

      // 加载用户组列表
      getList().then((res) => {
        if (res.success) {
          setGroups(res.data);
        } else {
          toast.error(t('modelMap.loadError'));
        }
      });

      // 重置表单
      setFormData({
        modelId: '',
        group: [],
        modelMapItems: [{ modelId: '', order: 1 }]
      });
    }
  }, [visible, t]);

  const handleSubmit = async () => {
    try {
      // 表单验证
      if (!formData.modelId) {
        toast.error(t('modelMap.pleaseSelectSourceModel'));
        return;
      }
      if (formData.group.length === 0) {
        toast.error(t('modelMap.pleaseSelectGroup'));
        return;
      }

      // 验证映射项
      for (const item of formData.modelMapItems) {
        if (!item.modelId) {
          toast.error(t('modelMap.pleaseSelectTargetModel'));
          return;
        }
        if (!item.order || item.order <= 0) {
          toast.error(t('modelMap.pleaseEnterWeight'));
          return;
        }
      }

      setLoading(true);

      const data: ModelMap = {
        modelId: formData.modelId,
        group: formData.group,
        modelMapItems: formData.modelMapItems.filter(item => item.modelId)
      };

      const response = await createModelMap(data);

      if (response.success) {
        toast.success(t('modelMap.createSuccess'));
        onSuccess();
      } else {
        toast.error(response.message || t('common.operateFailed'));
      }
    } catch (error) {
      console.error('Submit Failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const addModelMapItem = () => {
    setFormData(prev => ({
      ...prev,
      modelMapItems: [...prev.modelMapItems, { modelId: '', order: 1 }]
    }));
  };

  const removeModelMapItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      modelMapItems: prev.modelMapItems.filter((_, i) => i !== index)
    }));
  };

  const updateModelMapItem = (index: number, field: 'modelId' | 'order', value: any) => {
    setFormData(prev => ({
      ...prev,
      modelMapItems: prev.modelMapItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('modelMap.createMap')}</DialogTitle>
          <DialogDescription>
            {t('modelMap.createDescription')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 源模型选择 */}
          <div className="space-y-2">
            <Label htmlFor="modelId">{t('modelMap.sourceModelId')}</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Select
                  value={formData.modelId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, modelId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select from list..." />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model: any) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-1">
                <Input
                  placeholder="Or type custom model..."
                  className="flex-1 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        setFormData(prev => ({ ...prev, modelId: value }));
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget.parentElement?.querySelector('input');
                    const value = input?.value.trim();
                    if (value) {
                      setFormData(prev => ({ ...prev, modelId: value }));
                      if (input) input.value = '';
                    }
                  }}
                >
                  Set
                </Button>
              </div>
            </div>
          </div>

          {/* 用户组选择 */}
          <div className="space-y-2">
            <Label>{t('modelMap.group')}</Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
                {formData.group.map((groupCode: string) => {
                  const group = groups.find(g => g.code === groupCode);
                  return (
                    <Badge
                      key={groupCode}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          group: prev.group.filter(g => g !== groupCode)
                        }));
                      }}
                    >
                      {group?.name || groupCode} ×
                    </Badge>
                  );
                })}
                {formData.group.length === 0 && (
                  <span className="text-muted-foreground text-sm">{t('modelMap.group')}</span>
                )}
              </div>
              <Select
                onValueChange={(value) => {
                  if (!formData.group.includes(value)) {
                    setFormData(prev => ({
                      ...prev,
                      group: [...prev.group, value]
                    }));
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('modelMap.selectGroup')} />
                </SelectTrigger>
                <SelectContent>
                  {groups.filter(group => !formData.group.includes(group.code)).map((group: any) => (
                    <SelectItem key={group.code} value={group.code}>
                      <div className="flex flex-col">
                        <span>{group.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {group.description} • {t('rate')}: {group.rate}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 映射项 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{t('modelMap.addMappingItem')}</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addModelMapItem}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('common.add')}
              </Button>
            </div>

            <div className="space-y-3">
              {formData.modelMapItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <Label className="text-sm">{t('modelMap.targetModelId')}</Label>
                        <div className="mt-1 space-y-2">
                          <Select
                            value={item.modelId}
                            onValueChange={(value) => updateModelMapItem(index, 'modelId', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select from list..." />
                            </SelectTrigger>
                            <SelectContent>
                              {models.map((model: any) => (
                                <SelectItem key={model} value={model}>
                                  {model}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex gap-1">
                            <Input
                              placeholder="Or type custom model..."
                              className="flex-1 text-xs"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const value = e.currentTarget.value.trim();
                                  if (value) {
                                    updateModelMapItem(index, 'modelId', value);
                                    e.currentTarget.value = '';
                                  }
                                }
                              }}
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="px-2 text-xs"
                              onClick={(e) => {
                                const input = e.currentTarget.parentElement?.querySelector('input');
                                const value = input?.value.trim();
                                if (value) {
                                  updateModelMapItem(index, 'modelId', value);
                                  if (input) input.value = '';
                                }
                              }}
                            >
                              Set
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="w-24">
                        <Label className="text-sm">{t('modelMap.weight')}</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.order}
                          onChange={(e) => updateModelMapItem(index, 'order', parseInt(e.target.value) || 1)}
                          placeholder={t('modelMap.weight')}
                          className="mt-1"
                        />
                      </div>

                      {formData.modelMapItems.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeModelMapItem(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? t('common.creating') : t('common.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 