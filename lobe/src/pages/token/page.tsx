import { useMemo, useState } from "react";
import { disable, getTokens, Remove } from '../../services/TokenService'
import { toast } from 'sonner'
import {
  Plus,
  Search,
  RotateCcw,
  MoreHorizontal,
  Key
} from 'lucide-react';
import { renderQuota } from "../../utils/render";
import CreateToken from "./features/CreateToken";
import UpdateToken from "./features/UpdateToken";
import { Add } from "../../services/TokenService";
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { cn } from '../../lib/utils';

export default function TokenPage() {
  const { t } = useTranslation();
  
  const [createTokenVisible, setCreateTokenVisible] = useState(false);
  const [updateTokenVisible, setUpdateTokenVisible] = useState(false);
  const [updateTokenValue, setUpdateTokenValue] = useState({} as any);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [input, setInput] = useState({
    page: 1,
    pageSize: 10,
    token: '',
    keyword: '',
  });

  function copyKey(key: string) {
    try {
      navigator.clipboard.writeText(key).then(() => {
        toast.success(t('token.copySuccess') || '复制成功')
      }).catch(() => {
        toast.error(`${t('token.copyFailed') || '复制失败'} token: ${key}`)
      });
    } catch (e) {
      toast.error(`${t('token.copyFailed') || '复制失败'} token: ${key}`)
    }
  }

  function bingLobeChat(token: string) {
    const json = JSON.stringify({
      keyVaults: {
        openai: {
          apiKey: token,
          baseURL: window.location.origin + '/v1',
        }
      }
    });
    window.open(`https://lobe-chat.ai-v1.cn?settings=${json}`);
  }

  function bindCherryStudio(token: string) {
    const currentDomain = window.location.origin;
    const tokenData = {
      id: "token-api-openai-tokennb",
      baseUrl: currentDomain,
      apiKey: token,
      name: "Token AI (OpenAI 老格式)",
      type: "openai"
    };
    
    // Fix btoa encoding error for non-Latin1 characters
    const jsonString = JSON.stringify(tokenData);
    const base64Data = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, 
      function toSolidBytes(match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
    }));
    
    const cherryStudioUrl = `cherrystudio://providers/api-keys?v=1&data=${base64Data}`;
    
    // Open the cherrystudio protocol URL
    window.location.href = cherryStudioUrl;
  }

  function removeToken(id: string) {
    Remove(id)
      .then((v) => {
        if (v.success) {
          toast.success(t('common.deleteSuccess') || '删除成功');
          loadingData();
        } else {
          toast.error(t('common.deleteFailed') || '删除失败');
        }
      })
      .catch(() => {
        toast.error(t('common.operationFailed') || '操作失败');
      });
  }

  function loadingData() {
    getTokens(input.page, input.pageSize).then((res) => {
      if (res.success) {
        setData(res.data.items);
        setTotal(res.data.total);
      } else {
        toast.error(res.message || t('common.loadFailed') || '加载失败');
      }
    }).catch(() => {
      toast.error(t('common.loadFailed') || '加载失败');
    });
  }

  useMemo(() => {
    loadingData();
  }, [input]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">
                {t('token.title') || 'Token管理'}
              </CardTitle>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={input.keyword}
                  onChange={(e) => {
                    setInput({
                      ...input,
                      keyword: e.target.value,
                    });
                  }}
                  className="w-full md:w-40 pl-9"
                  placeholder={t('common.searchPlaceholder') || '搜索关键字'}
                />
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={input.token}
                  onChange={(e) => {
                    setInput({
                      ...input,
                      token: e.target.value,
                    });
                  }}
                  className="w-full md:w-48 pl-9"
                  placeholder={t('token.searchToken') || '搜索Token'}
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => loadingData()}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {t('common.refresh') || '刷新'}
              </Button>

              <Button
                onClick={() => setCreateTokenVisible(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('token.createToken') || '创建Token'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Table Card */}
      <Card>
        <CardContent className="p-0 relative">
          <div className="overflow-x-auto overflow-y-visible">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">{t('token.name') || '名称'}</TableHead>
                  <TableHead className="w-[100px]">{t('token.status') || '状态'}</TableHead>
                  <TableHead className="w-[120px]">{t('token.usedQuota') || '已用额度'}</TableHead>
                  <TableHead className="w-[120px]">{t('token.remainingQuota') || '剩余额度'}</TableHead>
                  <TableHead className="w-[180px]">{t('common.createdAt') || '创建时间'}</TableHead>
                  <TableHead className="w-[180px]">{t('token.lastAccessTime') || '最近使用时间'}</TableHead>
                  <TableHead className="w-[180px]">{t('token.expiredTime') || '过期时间'}</TableHead>
                  <TableHead className="w-[120px]">{t('common.operations') || '操作'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Switch
                        checked={!item.disabled}
                        onCheckedChange={() => {
                          disable(item.id)
                            .then((result) => {
                              result.success ? toast.success(t('common.operationSuccess') || '操作成功')
                                : toast.error(t('common.operationFailed') || '操作失败');
                              loadingData();
                            })
                            .catch(() => {
                              toast.error(t('common.operationFailed') || '操作失败');
                            });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{renderQuota(item.usedQuota, 6)}</Badge>
                    </TableCell>
                    <TableCell>
                      {item.unlimitedQuota ? (
                        <Badge>{t('token.unlimited') || '不限制'}</Badge>
                      ) : (
                        <Badge variant="outline">{renderQuota(item.remainQuota - item.usedQuota, 6)}</Badge>
                      )}
                    </TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>{item.accessedTime}</TableCell>
                    <TableCell>
                      {item.unlimitedExpired ? (
                        <Badge>{t('token.neverExpire') || '不过期'}</Badge>
                      ) : (
                        <Badge
                          variant={item.expiredTime < new Date() ? "destructive" : "secondary"}
                        >
                          {item.expiredTime}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="z-50">
                          <DropdownMenuItem onClick={() => bingLobeChat(item.key)}>
                            <Badge variant="outline" className="mr-2">LobeChat</Badge>
                            {t('token.bindLobeChat') || '绑定LobeChat'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => bindCherryStudio(item.key)}>
                            <Badge variant="outline" className="mr-2">Cherry</Badge>
                            {t('token.bindCherryStudio') || '绑定CherryStudio'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setUpdateTokenVisible(true);
                              setUpdateTokenValue(item);
                            }}
                          >
                            {t('common.edit') || '编辑'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => copyKey(item.key)}>
                            {t('token.copyKey') || '复制Key'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              disable(item.id).then((result) => {
                                result.success ? toast.success(t('common.operationSuccess') || '操作成功')
                                  : toast.error(t('common.operationFailed') || '操作失败');
                                loadingData();
                              }).catch(() => {
                                toast.error(t('common.operationFailed') || '操作失败');
                              });
                            }}
                          >
                            {item.disabled ? (t('common.enable') || '启用') : (t('common.disable') || '禁用')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              toast.info(item.key)
                            }}
                          >
                            {t('token.viewKey') || '查看'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => removeToken(item.id)}
                            className="text-destructive"
                          >
                            {t('common.delete') || '删除'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Custom Pagination - keeping simple for now */}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              {t('common.total') || '总计'}: {total}
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
                {t('common.previousPage') || '上一页'}
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
                {t('common.nextPage') || '下一页'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateToken
        visible={createTokenVisible}
        onSuccess={() => {
          setCreateTokenVisible(false);
          loadingData();
        }}
        onCancel={() => {
          setCreateTokenVisible(false);
        }}
      />

      <UpdateToken
        visible={updateTokenVisible}
        value={updateTokenValue}
        onSuccess={() => {
          setUpdateTokenVisible(false);
          loadingData();
          setUpdateTokenValue({});
        }}
        onCancel={() => {
          setUpdateTokenVisible(false);
          setUpdateTokenValue({});
        }}
      />
    </div>
  )
}