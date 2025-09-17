import { useEffect, useState } from "react";
import { toast } from "sonner";
import { disableRateLimitModel, getRateLimitModel, removeRateLimitModel } from "../../services/RateLimitModelService";
import CreateRateLimit from "./features/CreateRateLimit";
import UpdateRateLimit from "./features/UpdateRateLimit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MoreHorizontal, Plus, Search, Edit, Trash2 } from "lucide-react";
export default function RateLimitPage() {
    const [createVisible, setCreateVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false);
    const [updateValue, setUpdateValue] = useState({} as any);
    const [data, setData] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [input, setInput] = useState({
        page: 1,
        pageSize: 10,
        keyword: '',
    });
    const [loading, setLoading] = useState(false);

    const getStrategyLabel = (strategy: string) => {
        switch (strategy) {
            case 's': return '秒';
            case 'm': return '分钟';
            case 'h': return '小时';
            case 'd': return '天';
            default: return '未知';
        }
    };

    const handleToggleEnable = async (item: any) => {
        try {
            const result = await disableRateLimitModel(item.id);
            if (result.success) {
                toast.success('操作成功');
                loadingData();
            } else {
                toast.error('操作失败');
            }
        } catch (error) {
            toast.error('操作失败');
        }
    };

    const handleRemove = async (id: string) => {
        try {
            const result = await removeRateLimitModel(id);
            if (result.success) {
                toast.success('删除成功');
                loadingData();
            } else {
                toast.error('删除失败');
            }
        } catch (error) {
            toast.error('删除失败');
        }
    };

    const loadingData = async () => {
        setLoading(true);
        try {
            const result = await getRateLimitModel(input.page, input.pageSize);
            if (result.success) {
                setData(result.data.items || []);
                setTotal(result.data.total || 0);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('获取数据失败');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadingData();
    }, [input.page, input.pageSize]);

    const handleSearch = () => {
        setInput(prev => ({ ...prev, page: 1 }));
        loadingData();
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold">限流策略管理</CardTitle>
                            <CardDescription>管理系统的限流策略配置</CardDescription>
                        </div>
                        <Button onClick={() => setCreateVisible(true)} className="gap-2">
                            <Plus className="h-4 w-4" />
                            新增策略
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 flex-1">
                            <Input
                                placeholder="搜索关键字..."
                                value={input.keyword}
                                onChange={(e) => setInput(prev => ({ ...prev, keyword: e.target.value }))}
                                className="max-w-sm"
                            />
                            <Button onClick={handleSearch} variant="outline" className="gap-2">
                                <Search className="h-4 w-4" />
                                搜索
                            </Button>
                        </div>
                    </div>

                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>名称</TableHead>
                                    <TableHead>状态</TableHead>
                                    <TableHead>描述</TableHead>
                                    <TableHead>限流策略</TableHead>
                                    <TableHead>创建时间</TableHead>
                                    <TableHead>策略数量</TableHead>
                                    <TableHead>限流数量</TableHead>
                                    <TableHead className="w-[100px]">操作</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8">
                                            加载中...
                                        </TableCell>
                                    </TableRow>
                                ) : data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                            暂无数据
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data.map((item, index) => (
                                        <TableRow key={item.id || index}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={item.enable}
                                                        onCheckedChange={() => handleToggleEnable(item)}
                                                    />
                                                    <Badge variant={item.enable ? "default" : "secondary"}>
                                                        {item.enable ? "启用" : "禁用"}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-[200px] truncate" title={item.description}>
                                                {item.description || '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {getStrategyLabel(item.strategy)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{item.createdAt}</TableCell>
                                            <TableCell>{item.limit}</TableCell>
                                            <TableCell>{item.value}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setUpdateValue(item);
                                                                setUpdateVisible(true);
                                                            }}
                                                            className="gap-2"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            编辑
                                                        </DropdownMenuItem>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <DropdownMenuItem
                                                                    onSelect={(e) => e.preventDefault()}
                                                                    className="gap-2 text-destructive focus:text-destructive"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                    删除
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>确认删除</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        确定要删除限流策略 "{item.name}" 吗？此操作不可撤销。
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>取消</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleRemove(item.id)}
                                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                    >
                                                                        删除
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {total > 0 && (
                        <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-muted-foreground">
                                显示 {(input.page - 1) * input.pageSize + 1} 到{' '}
                                {Math.min(input.page * input.pageSize, total)} 条，共 {total} 条
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setInput(prev => ({ ...prev, page: prev.page - 1 }))}
                                    disabled={input.page <= 1}
                                >
                                    上一页
                                </Button>
                                <span className="text-sm">
                                    第 {input.page} 页，共 {Math.ceil(total / input.pageSize)} 页
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setInput(prev => ({ ...prev, page: prev.page + 1 }))}
                                    disabled={input.page >= Math.ceil(total / input.pageSize)}
                                >
                                    下一页
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <CreateRateLimit
                visible={createVisible}
                onSuccess={() => {
                    setCreateVisible(false);
                    loadingData();
                }}
                onCancel={() => setCreateVisible(false)}
            />

            <UpdateRateLimit
                visible={updateVisible}
                value={updateValue}
                onSuccess={() => {
                    setUpdateVisible(false);
                    loadingData();
                }}
                onCancel={() => setUpdateVisible(false)}
            />
        </div>
    );
}