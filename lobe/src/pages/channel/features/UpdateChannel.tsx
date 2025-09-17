import { Channel } from "@/types/api";
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Services
import { getModels, getTypes } from "../../../services/ModelService";
import { Update } from "../../../services/ChannelService";
import { getModelPrompt } from "../../../utils/render";
import { getList } from "../../../services/UserGroupService";

interface IUpdateChannelProps {
  onSuccess: () => void;
  visible: boolean;
  onCancel: () => void;
  value?: Partial<Channel>;
}

interface FormData {
  name: string;
  type: string;
  address: string;
  other: string;
  key: string;
  models: string[];
  groups: string[];
  cache: boolean;
  supportsResponses: boolean;
}

export default function UpdateChannel({
  onSuccess,
  visible,
  onCancel,
  value,
}: IUpdateChannelProps) {
  const { t } = useTranslation();
  const [groups, setGroups] = useState<Channel[]>([]);
  const [types, setTypes] = useState<Channel | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    address: "",
    other: "",
    key: "",
    models: [],
    groups: [],
    cache: false,
    supportsResponses: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const loadData = useCallback(async () => {
    try {
      const [groupsRes, typesRes, modelsRes] = await Promise.all([
        getList(),
        getTypes(),
        getModels()
      ]);

      if (groupsRes.success) {
        setGroups(groupsRes.data);
      }

      if (typesRes.success) {
        setTypes(typesRes.data);
      } else {
        toast.error(typesRes.message || t('common.operateFailed'));
      }

      if (modelsRes.success) {
        setModels(modelsRes.data);
      } else {
        toast.error(modelsRes.message || t('common.operateFailed'));
      }
    } catch (error) {
      toast.error(t('common.operateFailed'));
    }
  }, [t]);

  useEffect(() => {
    if (visible && value) {
      loadData();
      // Populate form with existing values
      setFormData({
        name: value.name || "",
        type: value.type ? String(value.type) : "",
        address: value.address || "",
        other: value.other || "",
        key: value.key || "",
        models: value.models || [],
        groups: value.groups || [],
        cache: value.cache || false,
        supportsResponses: value.supportsResponses || false,
      });
      setErrors({});
    }
  }, [visible, value, loadData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('channel.channelNameRequired');
    } else if (formData.name.length < 3) {
      newErrors.name = t('channel.channelNameMinLength');
    }

    if (!formData.type) {
      newErrors.type = t('channel.platformTypeRequired');
    }

    if (formData.models.length === 0) {
      newErrors.models = t('channel.modelsRequired');
    }

    if (formData.groups.length === 0) {
      newErrors.groups = t('channel.groupsRequired');
    }

    if (formData.type === "AWSClaude" && !formData.other.trim()) {
      newErrors.other = t('channel.region');
    }

    if (formData.type === "ErnieBot" && !formData.other.trim()) {
      newErrors.other = t('channel.appId');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = { ...formData };

      // Handle Claude cache setting
      if (formData.type === "Claude") {
        submitData.other = formData.cache ? "true" : "false";
      }

      const response = await Update(value?.id!, submitData);
      if (response.success) {
        toast.success(t('common.updateSuccess'));
        onSuccess();
      } else {
        toast.error(response.message || t('common.operateFailed'));
      }
    } catch (error) {
      toast.error(t('common.operateFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const renderTypeSpecificFields = () => {
    switch (formData.type) {
      case "CustomeOpenAI":
        return (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <p className="text-sm text-muted-foreground">
                {t('channel.routeDefaultFormat')}：https://api.openai.com/v1
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="supportsResponses"
                checked={formData.supportsResponses}
                onCheckedChange={(checked) => updateFormData('supportsResponses', checked)}
              />
              <Label htmlFor="supportsResponses">{t('channel.supportsResponses')}</Label>
            </div>
          </div>
        );

      case "AzureOpenAI":
        return (
          <div className="space-y-2">
            <Label htmlFor="version">{t('channel.version')}</Label>
            <Select value={formData.other} onValueChange={(value) => updateFormData('other', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('channel.version')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-05-01-preview">2024-05-01-preview</SelectItem>
                <SelectItem value="2024-04-01-preview">2024-04-01-preview</SelectItem>
                <SelectItem value="2024-06-01">2024-06-01</SelectItem>
                <SelectItem value="2024-10-01-preview">2024-10-01-preview</SelectItem>
                <SelectItem value="2024-10-21">2024-10-21</SelectItem>
                <SelectItem value="2025-01-01-preview">2025-01-01-preview</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case "AWSClaude":
        return (
          <div className="space-y-2">
            <Label htmlFor="region">{t('channel.region')} *</Label>
            <Input
              id="region"
              value={formData.other}
              onChange={(e) => updateFormData('other', e.target.value)}
              placeholder={t('channel.region')}
              className={errors.other ? "border-destructive" : ""}
            />
            {errors.other && (
              <p className="text-sm text-destructive">{errors.other}</p>
            )}
          </div>
        );

      case "Claude":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id="cache"
              checked={formData.cache}
              onCheckedChange={(checked) => updateFormData('cache', checked)}
            />
            <Label htmlFor="cache">{t('channel.cacheEnabled')}</Label>
          </div>
        );

      case "Hunyuan":
        return (
          <div className="space-y-2">
            <Label htmlFor="region">{t('channel.region')}</Label>
            <Select value={formData.other} onValueChange={(value) => updateFormData('other', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('channel.region')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ap-beijing">北京（ap-beijing）</SelectItem>
                <SelectItem value="ap-guangzhou">广州（ap-guangzhou）</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case "ErnieBot":
        return (
          <div className="space-y-2">
            <Label htmlFor="appId">{t('channel.appId')} *</Label>
            <Input
              id="appId"
              value={formData.other}
              onChange={(e) => updateFormData('other', e.target.value)}
              placeholder={t('channel.appId')}
              className={errors.other ? "border-destructive" : ""}
            />
            {errors.other && (
              <p className="text-sm text-destructive">{errors.other}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={visible} onOpenChange={onCancel}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('channel.editChannel')}</DialogTitle>
          <DialogDescription>
            Update the channel details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Channel Name */}
          <div className="space-y-2">
            <Label htmlFor="name">{t('channel.channelName')} *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder={t('channel.enterChannelName')}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Channel Type */}
          <div className="space-y-2">
            <Label htmlFor="type">{t('channel.channelType')} *</Label>
            <Select value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
              <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                <SelectValue placeholder={t('channel.selectPlatformType')} />
              </SelectTrigger>
              <SelectContent>
                {types && Object.keys(types).map((key) => (
                  <SelectItem key={key} value={types[key] as string}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-destructive">{errors.type}</p>
            )}
          </div>

          {/* Proxy Address */}
          <div className="space-y-2">
            <Label htmlFor="address">{t('channel.proxyAddress')}</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => updateFormData('address', e.target.value)}
              placeholder={t('channel.enterProxyAddress')}
            />
          </div>

          {/* Type-specific fields */}
          {renderTypeSpecificFields()}

          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="key">{t('channel.key')}</Label>
            <Input
              id="key"
              type="password"
              value={formData.key}
              onChange={(e) => updateFormData('key', e.target.value)}
              placeholder={getModelPrompt(formData.type)}
              autoComplete="new-password"
            />
          </div>

          {/* Groups */}
          <div className="space-y-2">
            <Label htmlFor="groups">{t('channel.groups')} *</Label>
            <div className={`border rounded-md p-2 min-h-[40px] ${errors.groups ? "border-destructive" : "border-input"}`}>
              {formData.groups.length > 0 ? (
                <div className="flex flex-wrap gap-1 mb-2">
                  {formData.groups.map((group) => {
                    const groupData = groups.find(g => g.code === group);
                    return (
                      <Badge
                        key={group}
                        variant="secondary"
                        className="text-xs cursor-pointer"
                        onClick={() => {
                          const newGroups = formData.groups.filter(g => g !== group);
                          updateFormData('groups', newGroups);
                        }}
                      >
                        {groupData?.name || group} ×
                      </Badge>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">{t('channel.selectGroups')}</p>
              )}
              <Select onValueChange={(value) => {
                if (!formData.groups.includes(value)) {
                  updateFormData('groups', [...formData.groups, value]);
                }
              }}>
                <SelectTrigger className="border-0 shadow-none p-0 h-auto">
                  <SelectValue placeholder="Add group..." />
                </SelectTrigger>
                <SelectContent>
                  {groups.filter(group => !formData.groups.includes(group.code as string)).map((group) => (
                    <SelectItem key={group.code} value={group.code as string}>
                      <div className="flex items-center gap-2">
                        <span>{group.name as string}</span>
                        <span className="text-xs text-muted-foreground">
                          {group.description as string}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {t('channel.rate')}: {String(group.rate)}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.groups && (
              <p className="text-sm text-destructive">{errors.groups}</p>
            )}
          </div>

          {/* Models */}
          <div className="space-y-2">
            <Label htmlFor="models">{t('channel.models')} *</Label>
            <div className={`border rounded-md p-2 min-h-[40px] ${errors.models ? "border-destructive" : "border-input"}`}>
              {formData.models.length > 0 ? (
                <div className="flex flex-wrap gap-1 mb-2">
                  {formData.models.map((model) => (
                    <Badge
                      key={model}
                      variant="secondary"
                      className="text-xs cursor-pointer"
                      onClick={() => {
                        const newModels = formData.models.filter(m => m !== model);
                        updateFormData('models', newModels);
                      }}
                    >
                      {model} ×
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">{t('channel.selectModels')}</p>
              )}
              <Select onValueChange={(value) => {
                if (!formData.models.includes(value)) {
                  updateFormData('models', [...formData.models, value]);
                }
              }}>
                <SelectTrigger className="border-0 shadow-none p-0 h-auto">
                  <SelectValue placeholder="Add model..." />
                </SelectTrigger>
                <SelectContent>
                  {models.filter(model => !formData.models.includes(model)).map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.models && (
              <p className="text-sm text-destructive">{errors.models}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : t('common.submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}