import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Info, CheckCircle, AlertTriangle, XCircle, Calendar, Star, Bell } from 'lucide-react';
import { getActiveAnnouncements } from '../../services/AnnouncementService';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

/**
 * Simplified Announcement Banner Component
 *
 * Displays active announcements in a modern banner format using shadcn/ui components
 */
const AnnouncementBanner: React.FC = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getActiveAnnouncements();
        if (response.success && response.data) {
          setAnnouncements(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'error':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-200';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200';
    }
  };

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => new Set([...prev, id]));
  };

  const activeAnnouncements = announcements.filter(
    announcement => !dismissedIds.has(announcement.id) && announcement.enabled
  );

  if (activeAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {activeAnnouncements.map((announcement) => (
        <Card
          key={announcement.id}
          className={`border-l-4 ${getTypeColor(announcement.type)}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex-shrink-0 mt-0.5">
                  {getTypeIcon(announcement.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium">{announcement.title}</h4>
                    {announcement.pinned && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        {t('announcement.pinned')}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm prose prose-sm max-w-none">
                    <ReactMarkdown>{announcement.content}</ReactMarkdown>
                  </div>
                  {announcement.expireTime && (
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {t('announcement.expireTime')}: {new Date(announcement.expireTime).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={() => handleDismiss(announcement.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementBanner;