import { useEffect, useState } from "react";
import { getModels } from "../../../services/ModelService";
import { putRateLimitModel } from "../../../services/RateLimitModelService";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "请输入限流策略名称"),
  description: z.string().optional(),
  strategy: z.string().min(1, "请选择限流策略"),
  limit: z.number().min(1, "请输入策略数量").max(99999),
  value: z.number().min(1, "请输入限流数量").max(99999),
  whiteList: z.array(z.string()),
  blackList: z.array(z.string()),
  model: z.array(z.string()).min(1, "请选择模型"),
});

type FormValues = z.infer<typeof formSchema>;

interface IUpdateRateLimitProps {
    onSuccess: () => void;
    visible: boolean;
    onCancel: () => void;
    value?: any;
}

export default function UpdateRateLimit({
    onSuccess,
    visible,
    onCancel,
    value
}: IUpdateRateLimitProps) {
    const [models, setModels] = useState<string[]>([]);
    const [whiteList, setWhiteList] = useState<string[]>([]);
    const [blackList, setBlackList] = useState<string[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [newIpInput, setNewIpInput] = useState("");
    const [newBlackIpInput, setNewBlackIpInput] = useState("");

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            strategy: "",
            limit: 1,
            value: 1,
            whiteList: [],
            blackList: [],
            model: [],
        },
    });

    const loadModels = async () => {
        try {
            const res = await getModels();
            if (res.success) {
                setModels(res.data);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("获取模型列表失败");
        }
    };

    useEffect(() => {
        if (visible) {
            loadModels();
        }
    }, [visible]);

    useEffect(() => {
        if (value && visible) {
            form.reset({
                name: value.name || "",
                description: value.description || "",
                strategy: value.strategy || "",
                limit: value.limit || 1,
                value: value.value || 1,
                whiteList: value.whiteList || [],
                blackList: value.blackList || [],
                model: value.model || [],
            });
            setWhiteList(value.whiteList || []);
            setBlackList(value.blackList || []);
            setSelectedModels(value.model || []);
            setNewIpInput("");
            setNewBlackIpInput("");
        }
    }, [value, visible, form]);

    const onSubmit = async (values: FormValues) => {
        try {
            const submitData = {
                ...values,
                whiteList,
                blackList,
                model: selectedModels,
                enable: value.enable,
                id: value.id,
            };

            const result = await putRateLimitModel(submitData);
            if (result.success) {
                toast.success("修改成功");
                onSuccess();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("修改失败");
        }
    };

    const addIpToWhiteList = () => {
        const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (newIpInput && ipPattern.test(newIpInput) && !whiteList.includes(newIpInput)) {
            setWhiteList([...whiteList, newIpInput]);
            setNewIpInput("");
        } else {
            toast.error("请输入正确的IP地址");
        }
    };

    const addIpToBlackList = () => {
        const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (newBlackIpInput && ipPattern.test(newBlackIpInput) && !blackList.includes(newBlackIpInput)) {
            setBlackList([...blackList, newBlackIpInput]);
            setNewBlackIpInput("");
        } else {
            toast.error("请输入正确的IP地址");
        }
    };

    const removeFromWhiteList = (ip: string) => {
        setWhiteList(whiteList.filter(item => item !== ip));
    };

    const removeFromBlackList = (ip: string) => {
        setBlackList(blackList.filter(item => item !== ip));
    };

    const toggleModel = (model: string) => {
        if (selectedModels.includes(model)) {
            setSelectedModels(selectedModels.filter(m => m !== model));
        } else {
            setSelectedModels([...selectedModels, model]);
        }
    };

    return (
        <Sheet open={visible} onOpenChange={onCancel}>
            <SheetContent className="min-w-[600px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>修改限流策略</SheetTitle>
                    <SheetDescription>
                        更新现有限流策略的配置
                    </SheetDescription>
                </SheetHeader>

                {visible && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>限流策略名称</FormLabel>
                                        <FormControl>
                                            <Input placeholder="请输入限流策略名称" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>描述</FormLabel>
                                        <FormControl>
                                            <Input placeholder="请输入描述信息" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="strategy"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>限流策略</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="请选择限流策略" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="s">秒</SelectItem>
                                                <SelectItem value="m">分钟</SelectItem>
                                                <SelectItem value="h">小时</SelectItem>
                                                <SelectItem value="d">天</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="limit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>限流策略数量</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    max={99999}
                                                    placeholder="1"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="value"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>限流数量</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    max={99999}
                                                    placeholder="1"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">IP白名单</CardTitle>
                                    <CardDescription>这些IP地址将不受限流限制</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="请输入IP地址 (例: 192.168.1.1)"
                                            value={newIpInput}
                                            onChange={(e) => setNewIpInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && addIpToWhiteList()}
                                        />
                                        <Button type="button" onClick={addIpToWhiteList} variant="outline">
                                            添加
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {whiteList.map((ip) => (
                                            <Badge key={ip} variant="secondary" className="flex items-center gap-1">
                                                {ip}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => removeFromWhiteList(ip)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">IP黑名单</CardTitle>
                                    <CardDescription>这些IP地址将被完全禁止访问</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="请输入IP地址 (例: 192.168.1.1)"
                                            value={newBlackIpInput}
                                            onChange={(e) => setNewBlackIpInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && addIpToBlackList()}
                                        />
                                        <Button type="button" onClick={addIpToBlackList} variant="outline">
                                            添加
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {blackList.map((ip) => (
                                            <Badge key={ip} variant="destructive" className="flex items-center gap-1">
                                                {ip}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => removeFromBlackList(ip)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">选择模型</CardTitle>
                                    <CardDescription>选择需要应用此限流策略的模型</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                                        {models.map((model) => (
                                            <div
                                                key={model}
                                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                                    selectedModels.includes(model)
                                                        ? 'bg-primary text-primary-foreground border-primary'
                                                        : 'bg-background hover:bg-muted'
                                                }`}
                                                onClick={() => toggleModel(model)}
                                            >
                                                <div className="text-sm font-medium">{model}</div>
                                            </div>
                                        ))}
                                    </div>
                                    {selectedModels.length === 0 && (
                                        <p className="text-sm text-destructive mt-2">请至少选择一个模型</p>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="flex gap-3 pt-4">
                                <Button type="submit" className="flex-1" disabled={selectedModels.length === 0}>
                                    更新策略
                                </Button>
                                <Button type="button" variant="outline" onClick={onCancel}>
                                    取消
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </SheetContent>
        </Sheet>
    );
}