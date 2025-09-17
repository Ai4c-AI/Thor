import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import ReactMarkdown from 'react-markdown';

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Services
import { updateAnnouncement } from '../../../services/AnnouncementService';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  enabled: boolean;
  pinned: boolean;
  order: number;
  expireTime?: string;
}

interface EditAnnouncementProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  announcement: Announcement | null;
}

interface FormData {
  title: string;
  content: string;
  type: string;
  enabled: boolean;
  pinned: boolean;
  order: number;
  expireTime: string;
}

const EditAnnouncement: React.FC<EditAnnouncementProps> = ({ visible, onCancel, onSuccess, announcement }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    type: 'info',
    enabled: true,
    pinned: false,
    order: 0,
    expireTime: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when announcement changes
  useEffect(() => {
    if (announcement && visible) {
      const expireTime = announcement.expireTime
        ? new Date(announcement.expireTime).toISOString().slice(0, 16)
        : '';

      setFormData({
        title: announcement.title,
        content: announcement.content,
        type: announcement.type,
        enabled: announcement.enabled,
        pinned: announcement.pinned,
        order: announcement.order,
        expireTime
      });
      setErrors({});
    } else if (!visible) {
      // Reset form when modal closes
      setFormData({
        title: '',
        content: '',
        type: 'info',
        enabled: true,
        pinned: false,
        order: 0,
        expireTime: ''
      });
      setErrors({});
    }
  }, [announcement, visible]);

  const updateFormData = (field: keyof FormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = t('announcement.titleRequired');
    }

    if (!formData.content.trim()) {
      newErrors.content = t('announcement.contentRequired');
    }

    if (!formData.type) {
      newErrors.type = t('announcement.typeRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !announcement) {
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        expireTime: formData.expireTime ? new Date(formData.expireTime).toISOString() : null
      };

      const result = await updateAnnouncement(announcement.id, submitData);

      if (result.success) {
        toast.success(t('announcement.updateSuccess'));
        onSuccess();
      } else {
        toast.error(result.message || t('announcement.updateFailed'));
      }
    } catch (error) {
      console.error('Failed to update announcement:', error);
      toast.error(t('announcement.updateFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      content: '',
      type: 'info',
      enabled: true,
      pinned: false,
      order: 0,
      expireTime: ''
    });
    setErrors({});
    onCancel();
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'error': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <Dialog open={visible} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('announcement.editTitle')}</DialogTitle>
          <DialogDescription>
            {t('announcement.editDescription')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{t('announcement.titleField')} *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              placeholder={t('announcement.titlePlaceholder')}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Content with Tabs */}
          <div className="space-y-2">
            <Label htmlFor="content">
              {t('announcement.contentField')} *
              <span className="text-muted-foreground text-sm ml-2">
                ({t('announcement.markdownSupport')})
              </span>
            </Label>
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">{t('announcement.editTab')}</TabsTrigger>
                <TabsTrigger value="preview">{t('announcement.previewTab')}</TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="mt-4">
                <Textarea
                  id="content"
                  rows={8}
                  value={formData.content}
                  onChange={(e) => updateFormData('content', e.target.value)}
                  placeholder={t('announcement.contentPlaceholder')}
                  className={errors.content ? "border-destructive" : ""}
                />
                <div className="text-xs text-muted-foreground mt-2">
                  {formData.content.length}{t('announcement.charactersLimit')}
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-4">
                <div className="border rounded-md p-4 min-h-[200px] bg-muted/30">
                  {formData.content ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown>{formData.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      {t('announcement.previewEmpty')}
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content}</p>
            )}
          </div>

          {/* Type and Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">{t('announcement.typeField')} *</Label>
              <Select value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
                <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                  <SelectValue placeholder={t('announcement.selectType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">
                    <span className={getTypeColor('info')}>{t('announcement.typeInfo')}</span>
                  </SelectItem>
                  <SelectItem value="success">
                    <span className={getTypeColor('success')}>{t('announcement.typeSuccess')}</span>
                  </SelectItem>
                  <SelectItem value="warning">
                    <span className={getTypeColor('warning')}>{t('announcement.typeWarning')}</span>
                  </SelectItem>
                  <SelectItem value="error">
                    <span className={getTypeColor('error')}>{t('announcement.typeError')}</span>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-destructive">{errors.type}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">
                {t('announcement.orderField')}
                <span className="text-muted-foreground text-sm ml-2">
                  ({t('announcement.orderHint')})
                </span>
              </Label>
              <Input
                id="order"
                type="number"
                min="0"
                value={formData.order}
                onChange={(e) => updateFormData('order', parseInt(e.target.value) || 0)}
                placeholder={t('announcement.orderField')}
              />
            </div>
          </div>

          {/* Switches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={(checked) => updateFormData('enabled', checked)}
              />
              <Label htmlFor="enabled">
                {formData.enabled ? t('announcement.enabled') : t('announcement.disabled')}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="pinned"
                checked={formData.pinned}
                onCheckedChange={(checked) => updateFormData('pinned', checked)}
              />
              <Label htmlFor="pinned">
                {formData.pinned ? t('announcement.pinned') : t('announcement.normal')}
              </Label>
            </div>
          </div>

          {/* Expire Time */}
          <div className="space-y-2">
            <Label htmlFor="expireTime">
              {t('announcement.expireTimeField')}
              <span className="text-muted-foreground text-sm ml-2">
                ({t('announcement.expireTimeHint')})
              </span>
            </Label>
            <Input
              id="expireTime"
              type="datetime-local"
              value={formData.expireTime}
              onChange={(e) => updateFormData('expireTime', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? t('announcement.updating') : t('announcement.edit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAnnouncement;