import { useEffect, useState } from "react";
import { enable, getUsers, Remove } from "../../services/UserService";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  Search,
  Plus,
  Settings,
  User,
  RefreshCw,
  MoreHorizontal
} from 'lucide-react';
import { renderQuota } from "../../utils/render";
import CreateUser from "./features/CreateUser";
import EditUser from "./features/EditUser";
import { useTranslation } from 'react-i18next';

export default function UserPage() {
  const { t } = useTranslation();
  
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [createVisible, setCreateVisible] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [input, setInput] = useState({
    page: 1,
    pageSize: 10,
    keyword: ''
  });


  function openEditUser(user: any) {
    setCurrentUser(user);
    setEditVisible(true);
  }

  function removeUser(id: string) {
    Remove(id).then((res) => {
      if (res.success) {
        toast.success(t('common.deleteSuccess'));
        loadData();
      } else {
        toast.error(res.toast || t('common.deleteFailed'));
      }
    }).catch(() => {
      toast.error(t('common.operationFailed'));
    });
  }

  function loadData() {
    setLoading(true);
    getUsers(input.page, input.pageSize, input.keyword)
      .then((res) => {
        if (res.success) {
          setData(res.data.items);
          setTotal(res.data.total);
        } else {
          toast.error(res.toast || t('common.loadFailed'));
        }
      })
      .catch(() => {
        toast.error(t('common.loadFailed'));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadData();
  }, [input]);

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">
                  {t('user.title')}
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={input.keyword}
                    onChange={(e) => {
                      setInput({
                        ...input,
                        keyword: e.target.value,
                      });
                    }}
                    className="pl-10 w-48"
                    placeholder={t('common.searchPlaceholder')}
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={() => loadData()}
                  disabled={loading}
                >
                  <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
                  {t('common.refresh')}
                </Button>

                <Button
                  onClick={() => setCreateVisible(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('user.createUser')}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Table Card */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-auto max-h-[calc(100vh-350px)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">{t('user.userName')}</TableHead>
                    <TableHead className="w-48">{t('user.email')}</TableHead>
                    <TableHead className="w-24">{t('user.role')}</TableHead>
                    <TableHead className="w-36">{t('user.groups')}</TableHead>
                    <TableHead className="w-20">{t('user.status')}</TableHead>
                    <TableHead className="w-48">{t('user.statistics')}</TableHead>
                    <TableHead className="w-36">{t('common.createdAt')}</TableHead>
                    <TableHead className="w-24">{t('common.operations')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.userName}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.groups?.map((group: string) => (
                            <Badge key={group} variant="outline">{group}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={!item.isDisabled}
                          onCheckedChange={() => {
                            enable(item.id)
                              .then((response) => {
                                response.success
                                  ? toast.success(t('common.operationSuccess'))
                                  : toast.error(t('common.operationFailed'));
                                loadData();
                              })
                              .catch(() => {
                                toast.error(t('common.operationFailed'));
                              });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {item.consumeToken || 0}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              {t('user.consumedTokens')}
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                {item.requestCount || 0}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              {t('user.requestCount')}
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {renderQuota(item.residualCredit, 6)}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              {t('user.remainingCredit')}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditUser(item)}>
                              {t('common.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => removeUser(item.id)}
                              className="text-destructive"
                            >
                              {t('common.delete')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Simple pagination info */}
            <div className="flex justify-between items-center p-4 border-t">
              <div className="text-sm text-muted-foreground">
                {t('common.total')}: {total}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={input.page === 1}
                  onClick={() => setInput({ ...input, page: input.page - 1 })}
                >
                  {t('common.previous')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={input.page * input.pageSize >= total}
                  onClick={() => setInput({ ...input, page: input.page + 1 })}
                >
                  {t('common.next')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <CreateUser
        onSuccess={() => {
          setCreateVisible(false);
          loadData();
        }}
        visible={createVisible}
        onCancel={() => {
          setCreateVisible(false);
        }}
      />

      <EditUser
        visible={editVisible}
        user={currentUser}
        onCancel={() => {
          setEditVisible(false);
        }}
        onSuccess={() => {
          setEditVisible(false);
          loadData();
        }}
      />
    </TooltipProvider>
  )
}