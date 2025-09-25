import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, X } from 'lucide-react';
import { isPwaInstalled, showInstallPrompt } from '../../utils/pwa';
import useThemeStore from '../../store/theme';
import { useTranslation } from 'react-i18next';

interface PwaInstallProps {
  /** The logo URL to display in the install prompt */
  logoUrl?: string;
  /** When true, renders as a button instead of auto-displaying modal */
  buttonMode?: boolean;
  /** Button text (only used when buttonMode is true) */
  buttonText?: string;
  /** Button variant (only used when buttonMode is true) */
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Button size (only used when buttonMode is true) */
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  /** Additional button style (only used when buttonMode is true) */
  buttonStyle?: React.CSSProperties;
}

/**
 * PWA Installation Prompt Component
 * 
 * This component provides a UI to prompt users to install the PWA.
 * Can be used in two modes:
 * 1. Auto-popup mode (default): Automatically shows installation modal when possible
 * 2. Button mode: Renders as a button that user can click to trigger installation
 */
const PwaInstall: React.FC<PwaInstallProps> = ({
  logoUrl = '/logo.png',
  buttonMode = false,
  buttonText,
  buttonVariant = 'default',
  buttonSize = 'default',
  buttonStyle = {}
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const { themeMode } = useThemeStore();
  const { t } = useTranslation();
  
  // 根据当前主题模式设置不同的样式
  const isDarkMode = themeMode === 'dark' || 
    (themeMode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Check if already installed
  useEffect(() => {
    setIsInstalled(isPwaInstalled());

    // Listen for installation status changes
    const handleDisplayModeChange = () => {
      setIsInstalled(isPwaInstalled());
    };

    window.matchMedia('(display-mode: standalone)').addEventListener('change', handleDisplayModeChange);

    return () => {
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Only auto-show the install modal if not in button mode
      if (!buttonMode) {
        setIsOpen(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, [buttonMode]);

  // Handle the appinstalled event
  useEffect(() => {
    const handleAppInstalled = () => {
      // Hide the prompt
      setIsOpen(false);
      // Clear the saved prompt
      setDeferredPrompt(null);
      // Update installed state
      setIsInstalled(true);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the installation prompt
    const installed = await showInstallPrompt(deferredPrompt);
    
    if (installed) {
      setDeferredPrompt(null);
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  
  const showInstallModal = () => {
    setIsOpen(true);
  };

  // Don't show anything if already installed
  if (isInstalled) {
    return null;
  }

  // If no prompt is available and we're in button mode,
  // render a disabled button
  if (!deferredPrompt && buttonMode) {
    return (
      <Button
        variant={buttonVariant}
        size={buttonSize}
        disabled
        style={buttonStyle}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        {buttonText || t('install.install')}
      </Button>
    );
  }

  // In button mode, render only the button when prompt is available
  if (buttonMode) {
    return (
      <Button
        variant={buttonVariant}
        size={buttonSize}
        onClick={showInstallModal}
        style={buttonStyle}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        {buttonText || t('install.install')}
      </Button>
    );
  }

  // In auto-popup mode, don't show anything if no prompt or not open
  if (!deferredPrompt || !isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {t('install.title')}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <img
            src={logoUrl}
            alt="Thor AI Platform"
            className="w-20 h-20 rounded-lg shadow-lg"
          />

          <p className="text-center text-muted-foreground">
            {t('install.description')}
          </p>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full"
            >
              {t('install.later')}
            </Button>
            <Button
              onClick={handleInstallClick}
              className="w-full gap-2"
            >
              <Download className="h-4 w-4" />
              {t('install.install')}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            {t('install.browser')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PwaInstall; 