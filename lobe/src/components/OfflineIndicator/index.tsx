import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff } from 'lucide-react';
import { addConnectivityListeners, isOnline, processQueuedRequests } from '../../utils/pwa';
import { useTranslation } from 'react-i18next';

/**
 * Offline Indicator Component
 * 
 * Displays a notification when the user's device goes offline
 * and attempts to sync data when back online
 */
const OfflineIndicator: React.FC = () => {
  const { t } = useTranslation();
  const [online, setOnline] = useState<boolean>(isOnline());

  useEffect(() => {
    // Initialize with current status
    setOnline(isOnline());
    
    // Set up listeners for online/offline events
    const cleanup = addConnectivityListeners(
      // Online callback
      async () => {
        setOnline(true);
        // Attempt to process any queued requests when back online
        await processQueuedRequests();
      },
      // Offline callback
      () => {
        setOnline(false);
      }
    );
    
    // Clean up event listeners on unmount
    return cleanup;
  }, []);
  
  // Don't render anything if online
  if (online) {
    return null;
  }
  
  return (
    <Alert className="border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-700 dark:bg-orange-950 dark:text-orange-100">
      <WifiOff className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{t('offline.message')}</span>
        <span className="text-xs opacity-75">
          {t('offline.syncNote')}
        </span>
      </AlertDescription>
    </Alert>
  );
};

export default OfflineIndicator; 