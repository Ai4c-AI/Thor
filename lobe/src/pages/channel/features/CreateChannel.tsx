import { Channel } from "@/types/api";
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Check, ChevronsUpDown } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
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
import { cn } from "@/lib/utils";

// Services
import { getModels, getTypes } from "../../../services/ModelService";
import { Add } from "../../../services/ChannelService";
import { getModelPrompt } from "../../../utils/render";
import { getList } from "../../../services/UserGroupService";

interface ICreateChannelProps {
  onSuccess: () => void;
  visible: boolean;
  onCancel: () => void;
}

interface FormData {
  name: string;
  type: string;
  address: string;
  other: string;
  key: string;
  models: string[];
  group: string;
  cache: boolean;
  supportsResponses: boolean;
}

export default function CreateChannel({
  onSuccess,
  visible,
  onCancel,
}: ICreateChannelProps) {
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
    group: "",
    cache: false,
    supportsResponses: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [groupPopoverOpen, setGroupPopoverOpen] = useState(false);

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
    if (visible) {
      loadData();
      // Reset form when opening
      setFormData({
        name: "",
        type: "",
        address: "",
        other: "",
        key: "",
        models: [],
        group: "",
        cache: false,
        supportsResponses: false
      });
      setErrors({});
      setGroupPopoverOpen(false);
    }
  }, [visible, loadData]);

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

    if (!formData.group) {
      newErrors.group = t('channel.groupsRequired');
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
      const submitData = {
        ...formData,
        groups: formData.group ? [formData.group] : [],
      };

      // Handle Claude cache setting
      if (formData.type === "Claude") {
        submitData.other = formData.cache ? "true" : "false";
      }

      const response = await Add(submitData);
      if (response.success) {
        toast.success(t('common.createSuccess'));
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

  const selectedGroup = groups.find((group) => String(group.code ?? '') === formData.group);
  const groupSearchPlaceholder = t('channel.searchGroups', { defaultValue: 'Search groups...' });
  const groupEmptyLabel = t('channel.noGroupsFound', { defaultValue: 'No groups found.' });

  return (
    <Dialog open={visible} onOpenChange={onCancel}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('channel.createChannel')}</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new channel
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
            <Label htmlFor="group">{t('channel.groups')} *</Label>
            <Popover open={groupPopoverOpen} onOpenChange={setGroupPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="group"
                  variant="outline"
                  role="combobox"
                  aria-expanded={groupPopoverOpen}
                  className={cn(
                    "w-full justify-between",
                    errors.group ? "border-destructive focus-visible:ring-destructive" : "",
                    selectedGroup ? "" : "text-muted-foreground"
                  )}
                >
                  {selectedGroup ? (
                    <div className="flex flex-col items-start text-left">
                      <span className="font-medium">{selectedGroup.name ?? selectedGroup.code}</span>
                      {selectedGroup.description && (
                        <span className="text-xs text-muted-foreground truncate">
                          {selectedGroup.description}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span>{t('channel.selectGroups')}</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-0">
                <Command>
                  <CommandInput placeholder={groupSearchPlaceholder} />
                  <CommandEmpty>{groupEmptyLabel}</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {groups.map((group) => {
                        const value = String(group.code ?? '');
                        const isSelected = formData.group === value;
                        return (
                          <CommandItem
                            key={value}
                            value={`${group.name ?? value} ${group.description ?? ''}`}
                            onSelect={() => {
                              updateFormData('group', value);
                              setGroupPopoverOpen(false);
                            }}
                          >
                            <div className="flex w-full items-center justify-between">
                              <div className="flex flex-col text-left">
                                <span>{group.name ?? value}</span>
                                {group.description && (
                                  <span className="text-xs text-muted-foreground">{group.description}</span>
                                )}
                              </div>
                              <Check className={cn("h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                            </div>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedGroup && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">
                  {`${t('channel.rate')}: ${selectedGroup.rate ?? '-'}`}
                </Badge>
              </div>
            )}
            {errors.group && (
              <p className="text-sm text-destructive">{errors.group}</p>
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
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select onValueChange={(value) => {
                    if (!formData.models.includes(value)) {
                      updateFormData('models', [...formData.models, value]);
                    }
                  }}>
                    <SelectTrigger className="border-0 shadow-none p-0 h-auto">
                      <SelectValue placeholder="Select from list..." />
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
                <div className="flex gap-1">
                  <Input
                    placeholder="Or type custom model..."
                    className="flex-1 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = e.currentTarget.value.trim();
                        if (value && !formData.models.includes(value)) {
                          updateFormData('models', [...formData.models, value]);
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
                      if (value && !formData.models.includes(value)) {
                        updateFormData('models', [...formData.models, value]);
                        if (input) input.value = '';
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
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
            {isSubmitting ? "Creating..." : t('common.submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}