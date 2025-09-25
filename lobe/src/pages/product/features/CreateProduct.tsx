import { createProduct } from "../../../services/ProductService";
import { renderQuota } from "../../../utils/render";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";

interface CreateProductProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function CreateProduct({
    visible,
    onCancel,
    onSuccess
}: CreateProductProps) {

    const [input, setInput] = useState<any>({
        name: '',
        description: '',
        price: 0,
        remainQuota: 0,
        stock: 0
    })
    const [isLoading, setIsLoading] = useState(false);
    

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!input.name || !input.description) {
            toast.error("请填写所有必需字段");
            return;
        }

        setIsLoading(true);
        createProduct({
            name: input.name,
            description: input.description,
            price: input.price,
            remainQuota: input.remainQuota,
            stock: input.stock
        })
            .then((res) => {
                if (res.success) {
                    toast.success("产品已成功创建");
                    setInput({
                        name: '',
                        description: '',
                        price: 0,
                        remainQuota: 0,
                        stock: 0
                    });
                    onSuccess();
                } else {
                    toast.error(res.message || "创建产品时出现错误");
                }
            })
            .catch(() => {
                toast.error("网络错误，请稍后重试");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <Sheet open={visible} onOpenChange={(open) => !open && onCancel()}>
            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>创建产品</SheetTitle>
                    <SheetDescription>
                        填写产品信息来创建新的产品
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">产品名称 <span className="text-red-500">*</span></Label>
                        <Input
                            id="name"
                            value={input.name}
                            onChange={(e) => setInput({...input, name: e.target.value})}
                            placeholder="请输入产品名称"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">产品描述 <span className="text-red-500">*</span></Label>
                        <Input
                            id="description"
                            value={input.description}
                            onChange={(e) => setInput({...input, description: e.target.value})}
                            placeholder="请输入产品描述"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">价格</Label>
                        <Input
                            id="price"
                            type="number"
                            value={input.price}
                            onChange={(e) => setInput({...input, price: Number(e.target.value)})}
                            placeholder="0"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="remainQuota">额度</Label>
                        <div className="flex items-center space-x-2">
                            <Input
                                id="remainQuota"
                                type="number"
                                value={input.remainQuota}
                                onChange={(e) => setInput({...input, remainQuota: Number(e.target.value)})}
                                placeholder="0"
                                min="0"
                                className="flex-1"
                            />
                            <Badge variant="secondary">
                                {renderQuota(input.remainQuota ?? 0, 6)}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stock">库存</Label>
                        <Input
                            id="stock"
                            type="number"
                            value={input.stock}
                            onChange={(e) => setInput({...input, stock: Number(e.target.value)})}
                            placeholder="0"
                            min="-1"
                        />
                    </div>

                    <div className="flex space-x-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="flex-1"
                        >
                            取消
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1"
                        >
                            {isLoading ? "创建中..." : "创建"}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}