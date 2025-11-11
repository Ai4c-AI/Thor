import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Plus } from "lucide-react";
import { enableUserGroup, getList, remove } from "../../services/UserGroupService";
import CreateUserGroupPage from "./features/CreateUserGroup";
import UpdateUserGroupPage from "./features/UpdateUserGroup";

export default function UserGroupPage() {
    const { t } = useTranslation();
    const [createOpen, setCreateOpen] = useState<boolean>(false);
    const [updateValue, setUpdateValue] = useState<any>({
        value: {},
        open: false
    });
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [input, setInput] = useState({
        keyword: '',
    });

    function loadData() {
        setLoading(true);
        getList()
            .then((res) => {
                if (res.success) {
                    let filteredData = res.data;
                    if (input.keyword) {
                        filteredData = filteredData.filter((item: any) => 
                            item.name.includes(input.keyword) || 
                            item.code.includes(input.keyword) || 
                            item.description.includes(input.keyword)
                        );
                    }
                    setData(filteredData);
                } else {
                    toast.error(res.message || t('userGroup.getListFailed'));
                }
            }).finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold">{t('userGroup.title')}</h1>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder={t('userGroup.searchPlaceholder')}
                            value={input.keyword}
                            onChange={(e) => setInput({ ...input, keyword: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && loadData()}
                            className="pl-10 w-full sm:w-64"
                        />
                    </div>
                    <Button onClick={() => setCreateOpen(true)} className="gap-2">
                        <Plus className="h-4 w-4" />
                        {t('userGroup.create')}
                    </Button>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('common.name')}</TableHead>
                            <TableHead>{t('userGroup.code')}</TableHead>
                            <TableHead>{t('common.description')}</TableHead>
                            <TableHead>{t('userGroup.rate')}</TableHead>
                            <TableHead>{t('userGroup.order')}</TableHead>
                            <TableHead>{t('common.status')}</TableHead>
                            <TableHead className="w-16">{t('common.action')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8">
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
                                        <span className="ml-2">{t('common.loading')}</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    {t('common.noData')}
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="font-mono text-sm">{item.code}</TableCell>
                                    <TableCell className="max-w-xs truncate" title={item.description}>
                                        {item.description}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                            {item.rate}x
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{item.order}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={item.enable ? "default" : "destructive"}
                                            className={item.enable ? "bg-green-50 text-green-700 hover:bg-green-100" : ""}
                                        >
                                            {item.enable ? t('common.enabled') : t('common.disabled')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                    <span className="sr-only">{t('common.actionMenu')}</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => setUpdateValue({ value: item, open: true })}
                                                >
                                                    {t('common.edit')}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        enableUserGroup(item.id, !item.enable)
                                                            .then((res) => {
                                                                if (res.success) {
                                                                    toast.success(t('common.operateSuccess'));
                                                                    loadData();
                                                                } else {
                                                                    toast.error(res.message || t('common.operateFailed'));
                                                                }
                                                            });
                                                    }}
                                                >
                                                    {item.enable ? t('common.disable') : t('common.enable')}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    variant="destructive"
                                                    onClick={() => {
                                                        remove(item.id)
                                                            .then((res) => {
                                                                if (res.success) {
                                                                    toast.success(t('common.deleteSuccess'));
                                                                    loadData();
                                                                } else {
                                                                    toast.error(res.message || t('common.deleteFailed'));
                                                                }
                                                            });
                                                    }}
                                                >
                                                    {t('common.delete')}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <CreateUserGroupPage
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onOk={() => {
                    loadData();
                    setCreateOpen(false);
                }}
            />
            <UpdateUserGroupPage
                open={updateValue.open}
                onClose={() => setUpdateValue({ ...updateValue, open: false })}
                onOk={() => {
                    loadData();
                    setUpdateValue({ ...updateValue, open: false });
                }}
                value={updateValue.value}
            />
        </div>
    );
} 