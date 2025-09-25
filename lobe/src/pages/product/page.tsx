import { useMemo, useState } from "react";
import { getProduct, removeProduct } from "../../services/ProductService";
import { renderQuota } from "../../utils/render";
import CreateProduct from "./features/CreateProduct";
import UpdateProduct from "./features/UpdateProduct";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { MoreHorizontal, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ProductPage() {
  const [createVisible, setCreateVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateValue, setUpdateValue] = useState({} as any);
  const [data, setData] = useState([]);
  

  function remove(id: string) {
    removeProduct(id)
      .then((v) => {
        if (v.success) {
          loadingData();
          toast.success("产品已删除");
        } else {
          toast.error("删除产品时出现错误");
        }
      })
  }

  function loadingData() {
    getProduct()
      .then((res) => {
        setData(res.data);
      })
  }

  useMemo(() => {
    loadingData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">产品管理</h1>
        <Button onClick={() => setCreateVisible(true)}>
          <Plus className="mr-2 h-4 w-4" />
          创建产品
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>产品列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead>
                  <TableHead>描述</TableHead>
                  <TableHead>价格</TableHead>
                  <TableHead>额度</TableHead>
                  <TableHead>库存</TableHead>
                  <TableHead className="w-[100px]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length > 0 ? (
                  data.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {item.description}
                      </TableCell>
                      <TableCell>¥{item.price}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {renderQuota(item.remainQuota, 6)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.stock > 0 ? "default" : "destructive"}>
                          {item.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">打开菜单</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setUpdateVisible(true);
                                setUpdateValue(item);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              编辑
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => remove(item.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      暂无数据
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CreateProduct
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        onSuccess={() => {
          setCreateVisible(false);
          loadingData();
        }}
      />
      <UpdateProduct
        visible={updateVisible}
        value={updateValue}
        onCancel={() => setUpdateVisible(false)}
        onSuccess={() => {
          setUpdateVisible(false);
          loadingData();
        }}
      />
    </div>
  )
}