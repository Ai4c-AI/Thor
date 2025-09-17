import { ApiResponse, PaginatedResponse, Channel } from "@/types/api";
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  Search,
  RefreshCw,
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  Loader2,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  Power,
  PowerOff
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Services
import {
  Remove,
  UpdateOrder,
  controlAutomatically,
  disable,
  getChannels,
  test,
  downloadImportTemplate,
  importChannel,
  bulkRemove,
  bulkEnable,
  bulkDisable
} from "../../services/ChannelService";
import { renderQuota } from "../../utils/render";
import { getTypes } from "../../services/ModelService";
import { getList } from "../../services/UserGroupService";

// Components
import CreateChannel from "./features/CreateChannel";
import UpdateChannel from "./features/UpdateChannel";

export default function ChannelPage() {
  const { t } = useTranslation();

  const [createVisible, setCreateVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateValue, setUpdateValue] = useState<Channel | null>(null);
  const [data, setData] = useState<Channel[]>([]);
  const [total, setTotal] = useState(0);
  const [input, setInput] = useState({
    page: 1,
    pageSize: 10,
    keyword: '',
    group: '',
  });
  const [testingChannels, setTestingChannels] = useState<string[]>([]);
  const [groups, setGroups] = useState<Channel[]>([]);
  const [importing, setImporting] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [bulkOperating, setBulkOperating] = useState(false);

  useEffect(() => {
    getList().then((res) => {
      if (res.success) {
        setGroups(res.data);
      }
    });
  }, []);

  function removeToken(id: string) {
    Remove(id)
      .then((response) => {
        if (response.success) {
          toast.success(t('common.deleteSuccess'));
          loadingData();
        } else {
          toast.error(t('common.deleteFailed'));
        }
      });
  }

  function testToken(id: string) {
    setTestingChannels(prev => [...prev, id]);

    test(id)
      .then((response) => {
        if (response.success) {
          toast.success(t('channel.connectionSuccess'));
          loadingData();
        } else {
          toast.error(response.message || t('channel.connectionFailed'));
        }
      })
      .finally(() => {
        setTestingChannels(prev => prev.filter(channelId => channelId !== id));
      });
  }

  const loadingData = useCallback(() => {
    setLoading(true);
    getChannels(input.page, input.pageSize, input.keyword, input.group ? [input.group] : undefined)
      .then((response: ApiResponse<PaginatedResponse<Channel>>) => {
        if (response.success) {
          const values = response.data.items;
          getTypes()
            .then(res => {
              if (res.success) {
                const entries = Object.entries(res.data);
                values.forEach(x => {
                  for (const [key, value] of entries) {
                    if (value == x.type) {
                      x.typeName = key;
                      break;
                    }
                  }
                });
                setData([...values]);
                setTotal(response.data.total);
              } else {
                toast.error(res.message || t('common.operateFailed'));
              }
            });
        } else {
          toast.error(response.message || t('common.operateFailed'));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [input.page, input.pageSize, input.keyword, input.group, t]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  // Download template
  function handleDownloadTemplate() {
    downloadImportTemplate()
      .then((response) => {
        if (response.success || response instanceof Blob) {
          const blob = response instanceof Blob ? response : new Blob([response.data || response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'channel_import_template.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          toast.success(t('channel.downloadSuccess'));
        } else {
          toast.error(response.message || t('channel.downloadFailed'));
        }
      })
      .catch(() => {
        toast.error(t('channel.downloadFailed'));
      });
  }

  // Handle file import
  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    importChannel(file)
      .then((response) => {
        if (response.success) {
          toast.success(t('channel.importSuccess'));
          loadingData();
        } else {
          toast.error(response.message || t('channel.importFailed'));
        }
      })
      .catch(() => {
        toast.error(t('channel.importFailed'));
      })
      .finally(() => {
        setImporting(false);
      });

    // Reset input
    event.target.value = '';
  }

  function handleDisableChannel(id: string) {
    disable(id)
      .then((response) => {
        response.success
          ? toast.success(t('channel.operationSuccess'))
          : toast.error(t('channel.operationFailed'));
        loadingData();
      }, () => toast.error(t('channel.operationFailed')));
  }

  function handleControlAutomatically(id: string) {
    controlAutomatically(id)
      .then((response) => {
        response.success
          ? toast.success(t('channel.operationSuccess'))
          : toast.error(t('channel.operationFailed'));
        loadingData();
      }, () => toast.error(t('channel.operationFailed')));
  }

  function handleOrderUpdate(id: string, newOrder: number) {
    UpdateOrder(id, newOrder)
      .then((response) => {
        response.success
          ? toast.success(t('channel.operationSuccess'))
          : toast.error(t('channel.operationFailed'));
        loadingData();
      }, () => toast.error(t('channel.operationFailed')));
  }

  // 批量操作函数
  function handleSelectAll(checked: boolean) {
    if (checked) {
      setSelectedChannels(data.map(item => item.id));
    } else {
      setSelectedChannels([]);
    }
  }

  function handleSelectChannel(channelId: string, checked: boolean) {
    if (checked) {
      setSelectedChannels(prev => [...prev, channelId]);
    } else {
      setSelectedChannels(prev => prev.filter(id => id !== channelId));
    }
  }

  async function handleBulkDelete() {
    if (selectedChannels.length === 0) return;

    setBulkOperating(true);
    try {
      const response = await bulkRemove(selectedChannels);
      if (response.success) {
        toast.success(t('channel.bulkDeleteSuccess'));
        setSelectedChannels([]);
        loadingData();
      } else {
        toast.error(response.message || t('channel.bulkDeleteFailed'));
      }
    } catch (error) {
      toast.error(t('channel.bulkDeleteFailed'));
    } finally {
      setBulkOperating(false);
    }
  }

  async function handleBulkEnable() {
    if (selectedChannels.length === 0) return;

    setBulkOperating(true);
    try {
      const response = await bulkEnable(selectedChannels);
      if (response.success) {
        toast.success(t('channel.bulkEnableSuccess'));
        setSelectedChannels([]);
        loadingData();
      } else {
        toast.error(response.message || t('channel.bulkEnableFailed'));
      }
    } catch (error) {
      toast.error(t('channel.bulkEnableFailed'));
    } finally {
      setBulkOperating(false);
    }
  }

  async function handleBulkDisable() {
    if (selectedChannels.length === 0) return;

    setBulkOperating(true);
    try {
      const response = await bulkDisable(selectedChannels);
      if (response.success) {
        toast.success(t('channel.bulkDisableSuccess'));
        setSelectedChannels([]);
        loadingData();
      } else {
        toast.error(response.message || t('channel.bulkDisableFailed'));
      }
    } catch (error) {
      toast.error(t('channel.bulkDisableFailed'));
    } finally {
      setBulkOperating(false);
    }
  }

  const getResponseTimeVariant = (responseTime: number) => {
    if (responseTime < 3000) return "default";
    if (responseTime < 5000) return "secondary";
    return "destructive";
  };

  const getResponseTimeIcon = (responseTime: number) => {
    if (responseTime < 3000) return CheckCircle;
    if (responseTime < 5000) return AlertCircle;
    return XCircle;
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl font-bold">{t('channel.title')}</CardTitle>

            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={t('common.search')}
                  value={input.keyword}
                  onChange={(e) => setInput({ ...input, keyword: e.target.value })}
                  className="pl-10 min-w-[200px]"
                />
              </div>

              {/* Group Filter */}
              <Select
                value={input.group || "all"}
                onValueChange={(value) => setInput({ ...input, group: value === "all" ? "" : value })}
              >
                <SelectTrigger className="min-w-[200px]">
                  <SelectValue placeholder={t('channel.selectGroups')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  {groups.map((group) => (
                    <SelectItem key={group.code} value={group.code}>
                      <div className="flex items-center gap-2">
                        <span>{group.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {group.description}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {t('channel.rate')}: {group.rate}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Bulk Action Buttons */}
              {selectedChannels.length > 0 && (
                <>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={bulkOperating}
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        {bulkOperating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Power className="h-4 w-4" />
                        )}
                        {t('channel.bulkEnable')} ({selectedChannels.length})
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('channel.confirmBulkEnable')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('channel.confirmBulkEnableDescription', { count: selectedChannels.length })}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleBulkEnable}>
                          {t('common.confirm')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={bulkOperating}
                        className="text-orange-600 border-orange-600 hover:bg-orange-50"
                      >
                        {bulkOperating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <PowerOff className="h-4 w-4" />
                        )}
                        {t('channel.bulkDisable')} ({selectedChannels.length})
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('channel.confirmBulkDisable')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('channel.confirmBulkDisableDescription', { count: selectedChannels.length })}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleBulkDisable}>
                          {t('common.confirm')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={bulkOperating}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        {bulkOperating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        {t('channel.bulkDelete')} ({selectedChannels.length})
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('channel.confirmBulkDelete')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('channel.confirmBulkDeleteDescription', { count: selectedChannels.length })}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
                          {t('common.confirm')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}

              {/* Action Buttons */}
              <Button variant="outline" onClick={handleDownloadTemplate}>
                <Download className="h-4 w-4" />
                {t('channel.downloadTemplate')}
              </Button>

              <div className="relative">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={importing}
                />
                <Button variant="outline" disabled={importing}>
                  {importing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  {t('channel.importTemplate')}
                </Button>
              </div>

              <Button variant="outline" onClick={() => loadingData()}>
                <RefreshCw className="h-4 w-4" />
                {t('common.refresh')}
              </Button>

              <Button onClick={() => setCreateVisible(true)}>
                <Plus className="h-4 w-4" />
                {t('channel.createChannel')}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Table Card */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={data.length > 0 && selectedChannels.length === data.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="min-w-[150px]">{t('channel.channelName')}</TableHead>
                  <TableHead className="w-[120px]">{t('channel.status')}</TableHead>
                  <TableHead className="w-[120px]">{t('channel.autoCheck')}</TableHead>
                  <TableHead className="w-[120px]">{t('channel.channelType')}</TableHead>
                  <TableHead className="w-[150px]">{t('channel.responseTime')}</TableHead>
                  <TableHead className="w-[150px]">{t('channel.createdAt')}</TableHead>
                  <TableHead className="w-[120px]">{t('channel.totalConsumption')}</TableHead>
                  <TableHead className="w-[100px]">{t('channel.quota')}</TableHead>
                  <TableHead className="w-[150px]">{t('channel.groups')}</TableHead>
                  <TableHead className="w-[120px]">{t('channel.channelWeight')}</TableHead>
                  <TableHead className="w-[100px]">{t('channel.operations')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      <p className="mt-2 text-muted-foreground">Loading...</p>
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center py-8">
                      <p className="text-muted-foreground">No data available</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item) => {
                    const isLoading = testingChannels.includes(item.id);
                    const ResponseTimeIcon = item.responseTime ? getResponseTimeIcon(item.responseTime) : Timer;

                    return (
                      <TableRow key={item.id} className="hover:bg-muted/50">
                        <TableCell>
                          <Checkbox
                            checked={selectedChannels.includes(item.id)}
                            onCheckedChange={(checked) => handleSelectChannel(item.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={!item.disable}
                              onCheckedChange={() => handleDisableChannel(item.id)}
                            />
                            <span className={`text-xs ${item.disable ? 'text-destructive' : 'text-green-600'}`}>
                              {item.disable ? t('channel.disable') : t('channel.enable')}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={!item.controlAutomatically}
                              onCheckedChange={() => handleControlAutomatically(item.id)}
                            />
                            <span className={`text-xs ${item.controlAutomatically ? 'text-destructive' : 'text-green-600'}`}>
                              {item.controlAutomatically ? t('channel.disable') : t('channel.enable')}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline">{item.typeName}</Badge>
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => !isLoading && testToken(item.id)}
                            disabled={isLoading}
                            className="h-auto p-1"
                          >
                            <Badge
                              variant={item.responseTime ? getResponseTimeVariant(item.responseTime) : "outline"}
                              className="flex items-center gap-1 cursor-pointer"
                            >
                              {isLoading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <ResponseTimeIcon className="h-3 w-3" />
                              )}
                              {isLoading
                                ? t('channel.testing')
                                : item.responseTime
                                  ? `${(item.responseTime / 1000).toFixed(1)} ${t('channel.seconds')}`
                                  : t('channel.notTested')
                              }
                            </Badge>
                          </Button>
                        </TableCell>

                        <TableCell className="text-muted-foreground text-sm">
                          {item.createdAt}
                        </TableCell>

                        <TableCell>
                          <Badge variant="secondary">
                            {renderQuota(item.quota, 2)}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-primary font-medium">
                          {item.remainQuota}
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {item.groups?.map((group: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {group}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>

                        <TableCell>
                          <Input
                            type="number"
                            value={item.order}
                            onChange={(e) => {
                              const newOrder = parseInt(e.target.value);
                              if (!isNaN(newOrder)) {
                                item.order = newOrder;
                                setData([...data]);
                              }
                            }}
                            onBlur={() => handleOrderUpdate(item.id, item.order)}
                            className="w-20 text-center"
                            min={0}
                          />
                        </TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setUpdateValue(item);
                                  setUpdateVisible(true);
                                }}
                              >
                                {t('common.edit')}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDisableChannel(item.id)}
                              >
                                {item.disable ? t('channel.enable') : t('channel.disable')}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleControlAutomatically(item.id)}
                              >
                                {item.controlAutomatically
                                  ? t('channel.enableAutoCheck')
                                  : t('channel.disableAutoCheck')
                                }
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => removeToken(item.id)}
                              >
                                {t('common.delete')}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {!loading && data.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                {t('common.total')}: {total}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput({ ...input, page: Math.max(1, input.page - 1) })}
                  disabled={input.page <= 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  <span className="text-sm">{input.page}</span>
                  <span className="text-sm text-muted-foreground">/</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.ceil(total / input.pageSize)}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput({ ...input, page: input.page + 1 })}
                  disabled={input.page >= Math.ceil(total / input.pageSize)}
                >
                  Next
                </Button>
                <Select
                  value={input.pageSize.toString()}
                  onValueChange={(value) => setInput({ ...input, pageSize: parseInt(value), page: 1 })}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateChannel
        visible={createVisible}
        onSuccess={() => {
          setCreateVisible(false);
          loadingData();
        }}
        onCancel={() => {
          setCreateVisible(false);
        }}
      />

      <UpdateChannel
        visible={updateVisible}
        value={updateValue}
        onSuccess={() => {
          setUpdateVisible(false);
          loadingData();
          setUpdateValue(null);
        }}
        onCancel={() => {
          setUpdateVisible(false);
          setUpdateValue(null);
        }}
      />
    </div>
  );
}