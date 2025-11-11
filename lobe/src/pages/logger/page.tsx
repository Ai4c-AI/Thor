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
  MessageSquare
} from 'lucide-react';
import { getLoggers, viewConsumption, Export } from '../../services/LoggerService';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import ImageTaskLogger from './ImageTaskLogger';
import { format } from 'date-fns';
import { renderQuota } from "../../utils/render";
import { cn } from '../../lib/utils';
import dayjs from "dayjs";

export default function LoggerPage() {
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [consume, setConsume] = useState<number>(0);
  const [consumeLoading, setConsumeLoading] = useState<boolean>(false);
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [filterVisible, setFilterVisible] = useState<boolean>(true);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [userList, setUserList] = useState<any[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [isAdmin] = useState<boolean>(localStorage.getItem("role") === "admin");

  const [input, setInput] = useState({
    page: 1,
    pageSize: 10,
    type: -1,
    model: "",
    startTime: dayjs().subtract(15, 'day').format("YYYY-MM-DD HH:mm:ss"),
    endTime: null,
    keyword: "",
    userId: "",
  } as {
    page: number;
    pageSize: number;
    type: -1 | 1 | 2 | 3 | 4;
    model: string;
    startTime: string | null;
    endTime: string | null;
    keyword: string;
    organizationId?: string;
    userId?: string;
  });

  function timeString(totalTime: number) {
    let s = totalTime / 1000;
    let m = Math.floor(s / 60);
    s = Math.floor(s % 60);
    return `${m}分${s}秒`;
  }

  function loadData() {
    setLoading(true);
    getLoggers(input)
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
  }

  function loadViewConsumption() {
    setConsumeLoading(true);
    viewConsumption(input)
      .then((res) => {
        if (res.success) {
          setConsume(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .finally(() => {
        setConsumeLoading(false);
      });
  }

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
    loadViewConsumption();
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
    loadViewConsumption();
  };

  const handleReset = () => {
    setInput({
      page: 1,
      pageSize: 10,
      type: -1,
      model: "",
      startTime: dayjs().subtract(15, 'day').format("YYYY-MM-DD HH:mm:ss"),
      endTime: null,
      keyword: "",
      userId: "",
    });
    setTimeout(() => {
      loadData();
      loadViewConsumption();
    }, 0);
  };

  const handleExport = async () => {
    try {
      setExportLoading(true);
      toast.loading('正在导出数据...');

      const exportParams = {
        type: input.type,
        model: input.model,
        startTime: input.startTime,
        endTime: input.endTime,
        keyword: input.keyword,
        organizationId: input.organizationId,
        userId: input.userId,
      };

      const response = await Export(exportParams);

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
      link.download = `日志数据_${timestamp}.xlsx`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('数据导出成功！');
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

  const LogTypeSelect = () => (
    <Select
      value={input.type.toString()}
      onValueChange={(value) => setInput({ ...input, type: parseInt(value) as any })}
    >
      <SelectTrigger>
        <SelectValue placeholder="选择类型" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="-1">全部</SelectItem>
        <SelectItem value="1">聊天</SelectItem>
        <SelectItem value="2">绘图</SelectItem>
        <SelectItem value="3">音频</SelectItem>
        <SelectItem value="4">其他</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">
                {t('logger.title') || '系统日志'}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            聊天日志
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            图片任务
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          {/* Chat Logger Header Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {t('common.reset') || '重置'}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilterVisible(!filterVisible)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {filterVisible ? '隐藏筛选' : '显示筛选'}
                </Button>

                <Button
                  size="sm"
                  onClick={handleExport}
                  disabled={exportLoading}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {exportLoading ? '导出中...' : '导出数据'}
                </Button>
              </div>
            </CardContent>
          </Card>

      {/* Stats Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {consumeLoading ? (
                  <Skeleton className="h-8 w-32" />
                ) : (
                  renderQuota(consume, 4)
                )}
              </div>
              <p className="text-sm text-muted-foreground">区间总消费</p>
            </div>
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>

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
                      placeholder="搜索关键词..."
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">日志类型</label>
                  <LogTypeSelect />
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
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead className="min-w-[140px]">时间</TableHead>
                  <TableHead className="w-20">消费</TableHead>
                  {isAdmin && <TableHead className="w-20">渠道</TableHead>}
                  <TableHead className="w-16">用户</TableHead>
                  <TableHead className="min-w-[120px]">模型</TableHead>
                  <TableHead className="w-24 hidden sm:table-cell">用时</TableHead>
                  <TableHead className="w-20 text-center hidden md:table-cell">提示</TableHead>
                  <TableHead className="w-20 text-center hidden md:table-cell">完成</TableHead>
                  <TableHead className="w-24 hidden lg:table-cell">IP地址</TableHead>
                  <TableHead className="min-w-[100px]">详情</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      {isAdmin && <TableCell><Skeleton className="h-4 w-24" /></TableCell>}
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  data.map((item: any) => (
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
                        <TableCell className="font-mono text-xs">{item.createdAt}</TableCell>
                        <TableCell>
                          {item.quota && (
                            <Badge variant="secondary" className="text-xs">{renderQuota(item.quota, 4)}</Badge>
                          )}
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
                          {item.modelName && (
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
                          )}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex flex-col gap-1">
                            <Badge variant="outline" className="text-xs">{timeString(item.totalTime)}</Badge>
                            <Badge variant={item.stream ? "default" : "secondary"} className="text-xs">
                              {item.stream ? "流" : "非流"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-xs hidden md:table-cell">{item.promptTokens}</TableCell>
                        <TableCell className="text-center text-xs hidden md:table-cell">{item.completionTokens}</TableCell>
                        <TableCell className="font-mono text-xs hidden lg:table-cell">{item.ip}</TableCell>
                        <TableCell className="max-w-[120px] truncate text-xs" title={item.content}>
                          {item.content}
                        </TableCell>
                      </TableRow>
                      {expandedRows.has(item.id) && (
                        <TableRow className="bg-muted/30">
                          <TableCell colSpan={isAdmin ? 11 : 10} className="p-0">
                            <div className="p-4 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    时间信息
                                  </h4>
                                  <div className="space-y-1 text-xs">
                                    <div><span className="font-medium">创建时间:</span> {item.createdAt}</div>
                                    <div><span className="font-medium">总耗时:</span> {timeString(item.totalTime)}</div>
                                    <div><span className="font-medium">流式处理:</span> {item.stream ? "是" : "否"}</div>
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
                                    模型信息
                                  </h4>
                                  <div className="space-y-1 text-xs">
                                    <div><span className="font-medium">模型名称:</span> {item.modelName || "未知"}</div>
                                    <div><span className="font-medium">提示Token:</span> {item.promptTokens || 0}</div>
                                    <div><span className="font-medium">完成Token:</span> {item.completionTokens || 0}</div>
                                    <div><span className="font-medium">消费额度:</span> {item.quota ? renderQuota(item.quota, 4) : "0"}</div>
                                  </div>
                                </div>
                              </div>

                              {item.content && (
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    详细内容
                                  </h4>
                                  <div className="bg-background rounded-md p-3 border max-h-40 overflow-y-auto">
                                    <pre className="text-xs whitespace-pre-wrap font-mono text-foreground">
                                      {item.content}
                                    </pre>
                                  </div>
                                </div>
                              )}

                              {(item.promptContent || item.responseContent) && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                  {item.promptContent && (
                                    <div className="space-y-2">
                                      <h4 className="text-sm font-semibold">输入内容</h4>
                                      <div className="bg-background rounded-md p-3 border max-h-32 overflow-y-auto">
                                        <pre className="text-xs whitespace-pre-wrap font-mono text-foreground">
                                          {item.promptContent}
                                        </pre>
                                      </div>
                                    </div>
                                  )}

                                  {item.responseContent && (
                                    <div className="space-y-2">
                                      <h4 className="text-sm font-semibold">输出内容</h4>
                                      <div className="bg-background rounded-md p-3 border max-h-32 overflow-y-auto">
                                        <pre className="text-xs whitespace-pre-wrap font-mono text-foreground">
                                          {item.responseContent}
                                        </pre>
                                      </div>
                                    </div>
                                  )}
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
        </TabsContent>

        <TabsContent value="image" className="space-y-6">
          <ImageTaskLogger />
        </TabsContent>
      </Tabs>
    </div>
  );
}