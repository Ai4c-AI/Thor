import { useMemo, useState } from "react";
import { Enable, Remove, getRedeemCodes } from "@/services/RedeemCodeService";
import { renderQuota } from "@/utils/render";
import CreateRedeemCode from "./features/CreateRedeemCode";
import UpdateRedeemCode from "./features/UpdateRedeemCode";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Search, Copy, Edit, Trash2 } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";

export default function RedeemCode() {
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
    keyword: '',
  });

  function copyKey(key: string) {
    try {
      navigator.clipboard.writeText(key).then(() => {
        toast.success(t('common.copySuccess'))
      }).catch(() => {
        toast.error(t('common.copyFailed') + ': ' + key)
      });
    } catch (e) {
      toast.error(t('common.copyFailed') + ': ' + key)
    }
  }

  function removeRedeemCode(id: number) {
    Remove(id)
      .then((v) => {
        if (v.success) {
          loadingData();
          toast.success(t('common.deleteSuccess'))
        } else {
          toast.error(t('common.deleteFailed'))
        }
      })
  }

  function loadingData() {
    getRedeemCodes(input.page, input.pageSize, input.keyword).then((res) => {
      if (res.success) {
        setData(res.data.items);
        setTotal(res.data.total);
      }
    });
  }

  useMemo(() => {
    loadingData();
  }, [input]);

  const handleSwitchChange = (checked: boolean, item: any) => {
    Enable(item.id)
      .then((response) => {
        if (response.success) {
          toast.success(t('common.operateSuccess'));
          loadingData();
        } else {
          toast.error(t('common.operateFailed'));
        }
      })
      .catch(() => {
        toast.error(t('common.operateFailed'));
      });
  };

  const totalPages = Math.ceil(total / input.pageSize);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              {t('redeemCode.title')}
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('common.search')}
                  value={input.keyword}
                  onChange={(e) => {
                    setInput({
                      ...input,
                      keyword: e.target.value,
                    });
                  }}
                  className="pl-8 w-64"
                />
              </div>
              <Button
                onClick={() => setCreateTokenVisible(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {t('redeemCode.createRedeemCode')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('redeemCode.name')}</TableHead>
                  <TableHead>{t('redeemCode.disabled')}</TableHead>
                  <TableHead>{t('redeemCode.quota')}</TableHead>
                  <TableHead>{t('redeemCode.createdAt')}</TableHead>
                  <TableHead>{t('redeemCode.redeemedUser')}</TableHead>
                  <TableHead>{t('redeemCode.redeemedTime')}</TableHead>
                  <TableHead className="text-right">{t('common.operate')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Switch
                        checked={!item.disabled}
                        onCheckedChange={(checked) => handleSwitchChange(checked, item)}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {renderQuota(item.quota, 2)}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>
                      {item.redeemedUserName ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {item.redeemedUserName}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">{t('common.noData')}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.redeemedTime || (
                        <span className="text-muted-foreground">{t('redeemCode.notRedeemed')}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setUpdateTokenVisible(true);
                              setUpdateTokenValue(item);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            {t('common.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => copyKey(item.code)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            {t('common.copy')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => removeRedeemCode(item.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
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

          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (input.page > 1) {
                          setInput({ ...input, page: input.page - 1 });
                        }
                      }}
                      className={input.page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= input.page - 1 && page <= input.page + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setInput({ ...input, page })}
                            isActive={page === input.page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    if (page === input.page - 2 || page === input.page + 2) {
                      return (
                        <PaginationItem key={page}>
                          <span className="px-3 py-2">...</span>
                        </PaginationItem>
                      );
                    }

                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        if (input.page < totalPages) {
                          setInput({ ...input, page: input.page + 1 });
                        }
                      }}
                      className={input.page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateRedeemCode
        visible={createTokenVisible}
        onCancel={() => setCreateTokenVisible(false)}
        onSuccess={() => {
          setCreateTokenVisible(false);
          loadingData();
        }}
      />
      <UpdateRedeemCode
        visible={updateTokenVisible}
        value={updateTokenValue}
        onCancel={() => setUpdateTokenVisible(false)}
        onSuccess={() => {
          setUpdateTokenVisible(false);
          loadingData();
        }}
      />
    </div>
  )
}