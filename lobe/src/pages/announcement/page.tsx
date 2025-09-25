import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  Search,
  Plus,
  MoreHorizontal,
  Loader2,
  Pin,
  Calendar,
  Edit,
  Trash2
} from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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

// Services
import { getAnnouncements, deleteAnnouncement, toggleAnnouncement } from "../../services/AnnouncementService";
import CreateAnnouncement from "./features/CreateAnnouncement";
import EditAnnouncement from "./features/EditAnnouncement";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  enabled: boolean;
  pinned: boolean;
  order: number;
  expireTime?: string;
  createdAt: string;
}

interface PaginationInput {
  page: number;
  pageSize: number;
  keyword: string;
}

export default function AnnouncementPage() {
  const { t } = useTranslation();

  const [data, setData] = useState<Announcement[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [createVisible, setCreateVisible] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);
  const [input, setInput] = useState<PaginationInput>({
    page: 1,
    pageSize: 10,
    keyword: ''
  });

  const loadData = useCallback(() => {
    setLoading(true);
    getAnnouncements(input.page, input.pageSize, input.keyword)
      .then((res) => {
        if (res.success) {
          setData(res.data.items);
          setTotal(res.data.total);
        } else {
          toast.error(res.message || t('announcement.loadFailed'));
        }
      })
      .finally(() => setLoading(false));
  }, [input]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSearch = (value: string) => {
    setInput({
      ...input,
      keyword: value,
      page: 1
    });
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      const res = await toggleAnnouncement(id, enabled);
      if (res.success) {
        toast.success(t('announcement.statusUpdateSuccess'));
        loadData();
      } else {
        toast.error(res.message || t('announcement.statusUpdateFailed'));
      }
    } catch (error) {
      toast.error(t('announcement.statusUpdateFailed'));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteAnnouncement(id);
      if (res.success) {
        toast.success(t('announcement.deleteSuccess'));
        loadData();
      } else {
        toast.error(res.message || t('announcement.deleteFailed'));
      }
    } catch (error) {
      toast.error(t('announcement.deleteFailed'));
    }
  };

  const openEditAnnouncement = (announcement: Announcement) => {
    setCurrentAnnouncement(announcement);
    setEditVisible(true);
  };

  const getTypeVariant = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case 'success': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'error': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl font-bold">{t('announcement.title')}</CardTitle>

            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={t('announcement.searchPlaceholder')}
                  value={input.keyword}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 min-w-[250px]"
                />
              </div>

              <Button onClick={() => setCreateVisible(true)}>
                <Plus className="h-4 w-4" />
                {t('announcement.create')}
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
                  <TableHead className="min-w-[200px]">{t('announcement.titleColumn')}</TableHead>
                  <TableHead className="w-[100px]">{t('announcement.typeColumn')}</TableHead>
                  <TableHead className="w-[120px]">{t('announcement.statusColumn')}</TableHead>
                  <TableHead className="w-[100px]">{t('announcement.priorityColumn')}</TableHead>
                  <TableHead className="w-[100px]">{t('announcement.orderColumn')}</TableHead>
                  <TableHead className="w-[150px]">{t('announcement.expireTimeColumn')}</TableHead>
                  <TableHead className="w-[150px]">{t('announcement.createdAtColumn')}</TableHead>
                  <TableHead className="w-[100px]">{t('announcement.actionsColumn')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      <p className="mt-2 text-muted-foreground">{t('announcement.loading')}</p>
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <p className="text-muted-foreground">{t('announcement.noAnnouncements')}</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium truncate max-w-[200px]" title={item.title}>
                          {item.title}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant={getTypeVariant(item.type)} className={getTypeColor(item.type)}>
                          {item.type}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={item.enabled}
                            onCheckedChange={(checked) => handleToggle(item.id, checked)}
                          />
                          <span className={`text-xs ${item.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                            {item.enabled ? t('announcement.enabled') : t('announcement.disabled')}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {item.pinned ? (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <Pin className="h-3 w-3" />
                            {t('announcement.pinned')}
                          </Badge>
                        ) : (
                          <Badge variant="outline">{t('announcement.normal')}</Badge>
                        )}
                      </TableCell>

                      <TableCell className="text-center font-mono">
                        {item.order}
                      </TableCell>

                      <TableCell className="text-muted-foreground text-sm">
                        {item.expireTime ? (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(item.expireTime)}
                          </div>
                        ) : (
                          <span className="text-green-600">{t('announcement.neverExpires')}</span>
                        )}
                      </TableCell>

                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(item.createdAt)}
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
                              onClick={() => openEditAnnouncement(item)}
                              className="flex items-center gap-2"
                            >
                              <Edit className="h-4 w-4" />
                              {t('announcement.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggle(item.id, !item.enabled)}
                              className="flex items-center gap-2"
                            >
                              <Switch className="h-4 w-4" />
                              {item.enabled ? t('announcement.disable') : t('announcement.enable')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleDelete(item.id)}
                              className="flex items-center gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              {t('announcement.delete')}
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

          {/* Pagination */}
          {!loading && data.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                {t('announcement.totalAnnouncements', { total })}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput({ ...input, page: Math.max(1, input.page - 1) })}
                  disabled={input.page <= 1}
                >
                  {t('announcement.previous')}
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
                  {t('announcement.next')}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateAnnouncement
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        onSuccess={() => {
          setCreateVisible(false);
          loadData();
        }}
      />

      <EditAnnouncement
        visible={editVisible}
        announcement={currentAnnouncement}
        onCancel={() => {
          setEditVisible(false);
          setCurrentAnnouncement(null);
        }}
        onSuccess={() => {
          setEditVisible(false);
          setCurrentAnnouncement(null);
          loadData();
        }}
      />
    </div>
  );
}