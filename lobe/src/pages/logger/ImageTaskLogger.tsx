import { useMemo, useState, useEffect } from "react";
import { toast } from 'sonner';
import {
  Search,
  RotateCcw,
  Download,
  BarChart3,
  Filter,
  Calendar,
  Users,
  Cpu,
  Clock,
  Eye,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Loader,
  AlertCircle
} from 'lucide-react';
import {
  getImageTaskLoggers,
  getImageTaskStatistics,
  exportImageTasks,
  TaskTypeMap,
  TaskStatusMap,
  TaskStatusColorMap,
  type ImageTaskLogger,
  type ImageTaskStatistics
} from '../../services/ImageTaskLoggerService';
import { getSimpleList } from '../../services/UserService';
import { getModels } from '../../services/ModelService';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Calendar as CalendarComponent } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible';
import { Skeleton } from '../../components/ui/skeleton';
import { Progress } from '../../components/ui/progress';
import { renderQuota } from "../../utils/render";
import { cn } from '../../lib/utils';
import dayjs from "dayjs";

export default function ImageTaskLogger() {
  const { t } = useTranslation();
  const [data, setData] = useState<ImageTaskLogger[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<ImageTaskStatistics | null>(null);
  const [statisticsLoading, setStatisticsLoading] = useState<boolean>(false);
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [filterVisible, setFilterVisible] = useState<boolean>(true);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [userList, setUserList] = useState<any[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [isAdmin] = useState<boolean>(localStorage.getItem("role") === "admin");

  const [input, setInput] = useState({
    page: 1,
    pageSize: 10,
    taskType: undefined as number | undefined,
    taskStatus: undefined as number | undefined,
    model: "",
    startTime: dayjs().subtract(15, 'day').format("YYYY-MM-DD HH:mm:ss"),
    endTime: null as string | null,
    keyword: "",
    userId: "",
  });

  const loadData = () => {
    setLoading(true);
    getImageTaskLoggers(input)
      .then((res) => {
        if (res.success) {
          setData(res.data.items);
          setTotal(res.data.total);
        } else {
          toast.error(res.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadStatistics = () => {
    setStatisticsLoading(true);
    getImageTaskStatistics(input.startTime || undefined, input.endTime || undefined)
      .then((res) => {
        if (res.success) {
          setStatistics(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .finally(() => {
        setStatisticsLoading(false);
      });
  };

  const loadUserList = async () => {
    if (!isAdmin) return;

    try {
      const response = await getSimpleList();
      if (response.success) {
        setUserList(response.data);
      } else {
        toast.error(response.message || '获取用户列表失败');
      }
    } catch (error) {
      toast.error('获取用户列表时发生错误');
      console.error(error);
    }
  };

  const loadModels = async () => {
    try {
      const response = await getModels();
      if (response.success) {
        setModels(response.data);
      } else {
        toast.error(response.message || '获取模型列表失败');
      }
    } catch (error) {
      toast.error('获取模型列表时发生错误');
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
    loadStatistics();
  }, [input.page, input.pageSize]);

  useEffect(() => {
    if (isAdmin) {
      loadUserList();
    }
    loadModels();
  }, [isAdmin]);

  const handleSearch = () => {
    setInput({
      ...input,
      page: 1,
    });
    loadData();
    loadStatistics();
  };

  const handleReset = () => {
    setInput({
      page: 1,
      pageSize: 10,
      taskType: undefined,
      taskStatus: undefined,
      model: "",
      startTime: dayjs().subtract(15, 'day').format("YYYY-MM-DD HH:mm:ss"),
      endTime: null,
      keyword: "",
      userId: "",
    });
    setTimeout(() => {
      loadData();
      loadStatistics();
    }, 0);
  };

  const handleExport = async () => {
    try {
      setExportLoading(true);
      toast.loading('正在导出图片任务数据...');

      const exportParams = {
        taskType: input.taskType,
        taskStatus: input.taskStatus,
        model: input.model,
        startTime: input.startTime,
        endTime: input.endTime,
        keyword: input.keyword,
        userId: input.userId,
      };

      const response = await exportImageTasks(exportParams);

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
      link.download = `图片任务数据_${timestamp}.xlsx`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('图片任务数据导出成功！');
    } catch (error) {
      console.error('导出失败:', error);
      toast.error('导出失败，请重试');
    } finally {
      setExportLoading(false);
    }
  };

  const toggleRowExpansion = (recordId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(recordId)) {
      newExpanded.delete(recordId);
    } else {
      newExpanded.add(recordId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusIcon = (status: number) => {
    switch (status) {
      case 1: return <AlertCircle className="h-4 w-4" />;
      case 2: return <Loader className="h-4 w-4 animate-spin" />;
      case 3: return <CheckCircle className="h-4 w-4" />;
      case 4: return <XCircle className="h-4 w-4" />;
      case 5: return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const parseImageUrls = (imageUrls?: string): string[] => {
    if (!imageUrls) return [];
    try {
      return JSON.parse(imageUrls);
    } catch {
      return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {statisticsLoading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    statistics?.totalTasks || 0
                  )}
                </div>
                <p className="text-sm text-muted-foreground">总任务数</p>
              </div>
              <ImageIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {statisticsLoading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    `${statistics?.successRate || 0}%`
                  )}
                </div>
                <p className="text-sm text-muted-foreground">成功率</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {statisticsLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    renderQuota(statistics?.totalQuota || 0, 4)
                  )}
                </div>
                <p className="text-sm text-muted-foreground">总消费</p>
              </div>
              <Cpu className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {statisticsLoading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    statistics?.taskTypes.reduce((sum, type) => sum + type.processing, 0) || 0
                  )}
                </div>
                <p className="text-sm text-muted-foreground">处理中</p>
              </div>
              <Loader className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Collapsible open={filterVisible} onOpenChange={setFilterVisible}>
        <CollapsibleContent>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Filter className="h-4 w-4" />
                筛选条件
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">关键词搜索</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={input.keyword}
                      onChange={(e) => setInput({ ...input, keyword: e.target.value })}
                      placeholder="搜索TaskId、提示词..."
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Task Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">任务类型</label>
                  <Select
                    value={input.taskType?.toString() || "all"}
                    onValueChange={(value) => setInput({ ...input, taskType: value === "all" ? undefined : parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择任务类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部类型</SelectItem>
                      {Object.entries(TaskTypeMap).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Task Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">任务状态</label>
                  <Select
                    value={input.taskStatus?.toString() || "all"}
                    onValueChange={(value) => setInput({ ...input, taskStatus: value === "all" ? undefined : parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择任务状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      {Object.entries(TaskStatusMap).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Model */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">模型</label>
                  <Select value={input.model || "all"} onValueChange={(value) => setInput({ ...input, model: value === "all" ? "" : value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择模型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部模型</SelectItem>
                      {models.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* User */}
                {isAdmin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">用户</label>
                    <Select value={input.userId || "all"} onValueChange={(value) => setInput({ ...input, userId: value === "all" ? "" : value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择用户" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部用户</SelectItem>
                        {userList.map((user) => (
                          <SelectItem key={user.id} value={user.id}>{user.username}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Start Time */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">开始时间</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !input.startTime && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {input.startTime || "选择开始时间"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={input.startTime ? new Date(input.startTime) : undefined}
                        onSelect={(date) => setInput({
                          ...input,
                          startTime: date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : null
                        })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Time */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">结束时间</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !input.endTime && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {input.endTime || "选择结束时间"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={input.endTime ? new Date(input.endTime) : undefined}
                        onSelect={(date) => setInput({
                          ...input,
                          endTime: date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : null
                        })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  搜索
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  重置
                </Button>
                <Button variant="outline" onClick={() => setFilterVisible(!filterVisible)}>
                  <Filter className="h-4 w-4 mr-2" />
                  {filterVisible ? '隐藏筛选' : '显示筛选'}
                </Button>
                <Button variant="outline" onClick={handleExport} disabled={exportLoading}>
                  <Download className="h-4 w-4 mr-2" />
                  {exportLoading ? '导出中...' : '导出数据'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead className="min-w-[100px]">任务ID</TableHead>
                  <TableHead className="w-24">类型</TableHead>
                  <TableHead className="w-24">状态</TableHead>
                  <TableHead className="min-w-[200px]">提示词</TableHead>
                  <TableHead className="w-20">消费</TableHead>
                  {isAdmin && <TableHead className="w-20">渠道</TableHead>}
                  <TableHead className="w-16">用户</TableHead>
                  <TableHead className="min-w-[120px]">模型</TableHead>
                  <TableHead className="w-20">进度</TableHead>
                  <TableHead className="min-w-[140px]">时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      {isAdmin && <TableCell><Skeleton className="h-4 w-24" /></TableCell>}
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  data.map((item: ImageTaskLogger) => (
                    <>
                      <TableRow key={item.id} className="hover:bg-muted/50">
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(item.id)}
                          >
                            {expandedRows.has(item.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          <div className="max-w-[100px] truncate" title={item.taskId}>
                            {item.taskId}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {TaskTypeMap[item.taskType] || '未知'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={TaskStatusColorMap[item.taskStatus] as any || 'default'}
                            className="text-xs flex items-center gap-1"
                          >
                            {getStatusIcon(item.taskStatus)}
                            {TaskStatusMap[item.taskStatus] || '未知'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate text-xs" title={item.prompt}>
                            {item.prompt}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {renderQuota(item.quota, 4)}
                          </Badge>
                        </TableCell>
                        {isAdmin && (
                          <TableCell>
                            {item.channelName && (
                              <Badge variant="outline" className="text-xs truncate max-w-[60px]" title={item.channelName}>
                                {item.channelName}
                              </Badge>
                            )}
                          </TableCell>
                        )}
                        <TableCell>
                          {item.userName && (
                            <Badge variant="outline" className="text-xs truncate max-w-[50px]" title={item.userName}>
                              {item.userName}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="cursor-pointer text-xs truncate max-w-[100px]"
                            title={item.modelName}
                            onClick={() => {
                              navigator.clipboard.writeText(item.modelName);
                              toast.success('已复制模型名称');
                            }}
                          >
                            {item.modelName}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Progress value={item.progress} className="h-2" />
                            <span className="text-xs text-center">{item.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{item.createdAt}</TableCell>
                      </TableRow>
                      {expandedRows.has(item.id) && (
                        <TableRow className="bg-muted/30">
                          <TableCell colSpan={isAdmin ? 12 : 11} className="p-0">
                            <div className="p-4 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    时间信息
                                  </h4>
                                  <div className="space-y-1 text-xs">
                                    <div><span className="font-medium">创建时间:</span> {item.createdAt}</div>
                                    <div><span className="font-medium">任务创建:</span> {item.taskCreatedAt || '未知'}</div>
                                    <div><span className="font-medium">任务完成:</span> {item.taskCompletedAt || '未完成'}</div>
                                    <div><span className="font-medium">响应时间:</span> {item.totalTime}ms</div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    用户信息
                                  </h4>
                                  <div className="space-y-1 text-xs">
                                    <div><span className="font-medium">用户名:</span> {item.userName || "未知"}</div>
                                    <div><span className="font-medium">用户ID:</span> {item.userId || "未知"}</div>
                                    <div><span className="font-medium">IP地址:</span> {item.ip || "未知"}</div>
                                    {isAdmin && item.channelName && (
                                      <div><span className="font-medium">渠道:</span> {item.channelName}</div>
                                    )}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold flex items-center gap-2">
                                    <Cpu className="h-4 w-4" />
                                    任务信息
                                  </h4>
                                  <div className="space-y-1 text-xs">
                                    <div><span className="font-medium">任务ID:</span> {item.taskId}</div>
                                    <div><span className="font-medium">任务类型:</span> {TaskTypeMap[item.taskType] || "未知"}</div>
                                    <div><span className="font-medium">任务状态:</span> {TaskStatusMap[item.taskStatus] || "未知"}</div>
                                    <div><span className="font-medium">消费额度:</span> {renderQuota(item.quota, 4)}</div>
                                    <div><span className="font-medium">是否成功:</span> {item.isSuccess ? "是" : "否"}</div>
                                  </div>
                                </div>
                              </div>

                              {item.prompt && (
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    提示词内容
                                  </h4>
                                  <div className="bg-background rounded-md p-3 border max-h-40 overflow-y-auto">
                                    <pre className="text-xs whitespace-pre-wrap font-mono text-foreground">
                                      {item.prompt}
                                    </pre>
                                  </div>
                                </div>
                              )}

                              {item.errorMessage && (
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold flex items-center gap-2 text-destructive">
                                    <XCircle className="h-4 w-4" />
                                    错误信息
                                  </h4>
                                  <div className="bg-destructive/10 rounded-md p-3 border border-destructive/20">
                                    <pre className="text-xs whitespace-pre-wrap font-mono text-destructive">
                                      {item.errorMessage}
                                    </pre>
                                  </div>
                                </div>
                              )}

                              {item.imageUrls && parseImageUrls(item.imageUrls).length > 0 && (
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold flex items-center gap-2">
                                    <ImageIcon className="h-4 w-4" />
                                    生成的图片
                                  </h4>
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {parseImageUrls(item.imageUrls).map((url, index) => (
                                      <div key={index} className="relative group">
                                        <img
                                          src={url}
                                          alt={`Generated image ${index + 1}`}
                                          className="w-full h-32 object-cover rounded-md border cursor-pointer hover:opacity-80 transition-opacity"
                                          onClick={() => window.open(url, '_blank')}
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                                          <Eye className="h-6 w-6 text-white" />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-4 p-4 border-t sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                总计: {total}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">每页显示:</span>
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
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (input.page > 1) {
                    setInput({ ...input, page: input.page - 1 });
                  }
                }}
                disabled={input.page <= 1}
              >
                上一页
              </Button>
              <span className="text-sm">
                {input.page} / {Math.ceil(total / input.pageSize)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (input.page < Math.ceil(total / input.pageSize)) {
                    setInput({ ...input, page: input.page + 1 });
                  }
                }}
                disabled={input.page >= Math.ceil(total / input.pageSize)}
              >
                下一页
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}