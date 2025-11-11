import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../../components/ui/alert-dialog";
import { Search, Plus, RotateCcw, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteModelMap, getModelMapList, ModelMap } from "../../services/ModelMapService";
import CreateModelMap from "./features/CreateModelMap";
import UpdateModelMap from "./features/UpdateModelMap";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";

export default function ModelMapPage() {
  const { t } = useTranslation();
  const [createVisible, setCreateVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateValue, setUpdateValue] = useState<ModelMap | null>(null);
  const [data, setData] = useState<ModelMap[]>([]);
  const [keyword, setKeyword] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');


  const handleDelete = () => {
    setLoading(true);
    deleteModelMap(selectedId)
      .then(response => {
        if (response.success) {
          toast.success(t('modelMap.deleteSuccess'));
          loadData();
        } else {
          toast.error(response.message || t('modelMap.deleteFailed'));
        }
      })
      .catch(() => {
        toast.error(t('common.operateFailed'));
      })
      .finally(() => {
        setLoading(false);
        setDeleteModalOpen(false);
      });
  };

  const loadData = () => {
    setLoading(true);
    getModelMapList()
      .then((response: any) => {
        if (response.success) {
          setData(response.data);
        } else {
          toast.error(response.message || t('modelMap.loadError'));
        }
      })
      .catch(() => {
        toast.error(t('modelMap.loadError'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredData = data.filter(item => {
    if (!keyword) return true;
    return (
      item.id?.toLowerCase().includes(keyword.toLowerCase()) ||
      item.modelId?.toLowerCase().includes(keyword.toLowerCase()) ||
      item.group?.some(g => g.toLowerCase().includes(keyword.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">{t('modelMap.title')}</CardTitle>
              <CardDescription>
                {t('modelMap.description')}
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={t('modelMap.searchPlaceholder')}
                  className="pl-9 w-full sm:w-64"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadData}
                  disabled={loading}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {t('modelMap.refresh')}
                </Button>

                <Button
                  size="sm"
                  onClick={() => setCreateVisible(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('modelMap.createMap')}
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('modelMap.modelId')}</TableHead>
                  <TableHead>{t('modelMap.group')}</TableHead>
                  <TableHead className="w-[150px]">{t('modelMap.createdAt')}</TableHead>
                  <TableHead className="w-[150px]">{t('modelMap.updatedAt')}</TableHead>
                  <TableHead className="w-[100px] text-center">{t('modelMap.itemCount')}</TableHead>
                  <TableHead className="w-[100px] text-center">{t('modelMap.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        <span className="ml-2">Loading...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      {t('common.noData')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((record: ModelMap) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.modelId}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {record.group?.map((group: string) => (
                            <Badge key={group} variant="secondary" className="text-xs">
                              {group}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {record.createdAt}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {record.updatedAt}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-xs">
                          {record.modelMapItems?.length || 0}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setUpdateValue(record);
                              setUpdateVisible(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedId(record.id as string)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>{t('modelMap.deleteMap')}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t('modelMap.deleteConfirm')}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDelete}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  disabled={loading}
                                >
                                  {loading ? 'Deleting...' : t('common.confirm')}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CreateModelMap
        visible={createVisible}
        onSuccess={() => {
          setCreateVisible(false);
          loadData();
        }}
        onCancel={() => setCreateVisible(false)}
      />

      {updateValue && (
        <UpdateModelMap
          visible={updateVisible}
          value={updateValue}
          onSuccess={() => {
            setUpdateVisible(false);
            setUpdateValue(null);
            loadData();
          }}
          onCancel={() => {
            setUpdateVisible(false);
            setUpdateValue(null);
          }}
        />
      )}
    </div>
  );
} 