import { useEffect, useState, useCallback } from 'react';
import { info } from '../../services/UserService';
import Pay from '../../components/pay';
import UserInfo from '../../components/User/UserInfo';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { AlertCircle, User, Wallet, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { toast } from 'sonner';

export default function ProfileForm() {
  const { t } = useTranslation();

  const [user, setUser] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('user-info');
  const [refreshing, setRefreshing] = useState(false);

  const loadUser = useCallback(async (showRefreshMessage = false) => {
    try {
      if (showRefreshMessage) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const res = await info();
      setUser(res.data);

      if (showRefreshMessage) {
        toast.success(t('common.refreshSuccess'), {
          description: t('userProfile.dataRefreshed'),
          icon: <CheckCircle className="h-4 w-4" />,
        });
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || t('common.loadError');
      setError(errorMessage);
      toast.error(t('common.error'), {
        description: errorMessage,
        icon: <XCircle className="h-4 w-4" />,
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [t]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t('userProfile.title')}</h1>
                <p className="text-sm md:text-base text-muted-foreground">{t('userProfile.subtitle', 'Manage your account and preferences')}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadUser(true)}
              disabled={loading || refreshing}
              className="gap-2 self-start sm:self-auto"
            >
              <RotateCcw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{t('common.refresh')}</span>
            </Button>
          </div>
          <Separator />
        </div>

        {/* Error State */}
        {error && !loading && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="mb-4">{error}</AlertDescription>
              </Alert>
              <div className="flex justify-center">
                <Button onClick={() => loadUser()} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  {t('common.retry')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && !error && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                  <Skeleton className="h-10 w-full" />
                  <div className="grid gap-3">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && Object.keys(user).length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{t('common.noData')}</h3>
                  <p className="text-sm text-muted-foreground">{t('userProfile.noDataDescription', 'Unable to load user data')}</p>
                </div>
                <Button onClick={() => loadUser()} variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  {t('common.retry')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        {!loading && !error && Object.keys(user).length > 0 && (
          <div className="space-y-6">
            {/* User Status Badge */}
            {user.status && (
              <div className="flex justify-center">
                <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="px-3 py-1">
                  {user.status === 'active' ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
                  {String(t(`userProfile.status.${user.status}`, user.status))}
                </Badge>
              </div>
            )}

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-2 h-11">
                  <TabsTrigger value="user-info" className="flex items-center gap-1 md:gap-2 data-[state=active]:bg-background">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('userProfile.userInfo')}</span>
                    <span className="sm:hidden">{t('userProfile.info', 'Info')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="balance" className="flex items-center gap-1 md:gap-2 data-[state=active]:bg-background">
                    <Wallet className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('userProfile.balance')}</span>
                    <span className="sm:hidden">{t('userProfile.wallet', 'Wallet')}</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="user-info" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {t('userProfile.personalInformation')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UserInfo onUpdate={loadUser} user={user} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="balance" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      {t('userProfile.balanceManagement')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Pay user={user} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}