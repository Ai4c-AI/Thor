import { useEffect, useState } from "react";
import { GeneralSetting, InitSetting, IsEnableAlipay } from "../../services/SettingService";
import { Use } from "../../services/RedeemCodeService";
import { getProduct, startPayload } from "../../services/ProductService";
import QRCode from "qrcode.react";
import { renderQuota } from "../../utils/render";
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

// shadcn/ui components
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Separator } from "../ui/separator";

// Lucide icons
import {
    CreditCard,
    Gift,
    Barcode,
    CheckCircle,
    AlertTriangle,
    HelpCircle,
    Smartphone,
    Clock,
    AlertCircle,
    ExternalLink
} from "lucide-react";

interface IPayProps {
    user: any
}

export default function Pay({ user }: IPayProps) {
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const [products, setProducts] = useState([] as any[]);
    const [qrCode, setQrCode] = useState('');
    const [countdown, setCountdown] = useState(300); // 5分钟倒计时

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        let timer: any = null;
        if (qrCode && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setQrCode('');
            setCountdown(300);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [qrCode, countdown]);

    function loadProducts() {
        getProduct()
            .then((res) => {
                setProducts(res.data);
            });
    }

    /**
     * 使用兑换码
     * @returns
     */
    function useCode() {
        if (code === '') {
            toast.error(t('payment.emptyRedeemCode'));
            return;
        }

        Use(code)
            .then((res) => {
                if (res.success) {
                    toast.success(t('payment.redeemSuccess'));
                    setCode(''); // 清空输入框
                } else {
                    toast.error(res.message);
                }
            });
    }

    /**
     * 支付宝充值
     */
    function alipayRecharge(id: string) {
        startPayload(id)
            .then((res) => {
                if (res.success) {
                    setQrCode(res.data.qr);
                } else {
                    toast.error(res.message);
                }
            });
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6">
            {/* 余额显示 */}
            <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <Gift className="h-5 w-5 text-muted-foreground mr-2" />
                    <CardTitle className="text-sm font-medium">当前余额</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{renderQuota(user.residualCredit || 0)}</div>
                </CardContent>
            </Card>

            <Tabs defaultValue="alipay" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="alipay" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        支付宝充值
                    </TabsTrigger>
                    <TabsTrigger value="redeem" className="flex items-center gap-2">
                        <Gift className="h-4 w-4" />
                        兑换码
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="alipay" className="space-y-4">
                    {IsEnableAlipay() === false ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-8">
                                <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">支付宝充值暂未开启</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div>
                            {products.length > 0 ? (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {products.map((product) => (
                                        <Card key={product.id} className="relative">
                                            <CardHeader className="text-center pb-4">
                                                <CardTitle className="text-lg">{product.name}</CardTitle>
                                                <div className="text-3xl font-bold text-primary">
                                                    ¥{product.price}
                                                </div>
                                                <CardDescription>
                                                    额度：{product.remainQuota}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <Button
                                                    className="w-full gap-2"
                                                    onClick={() => {
                                                        alipayRecharge(product.id);
                                                        setCountdown(300);
                                                    }}
                                                >
                                                    <CreditCard className="h-4 w-4" />
                                                    立即充值
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center py-8">
                                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                                            <CreditCard className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <p className="text-muted-foreground">暂无充值套餐</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="redeem" className="space-y-4">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    <strong>兑换码使用说明</strong><br />
                                    请输入有效的兑换码来获取余额
                                </AlertDescription>
                            </Alert>

                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Barcode className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder={t('payment.redeemCodePlaceholder')}
                                        className="pl-10"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                useCode();
                                            }
                                        }}
                                    />
                                </div>
                                <Button onClick={useCode}>
                                    兑换
                                </Button>
                            </div>

                            <Separator />

                            <div className="text-center">
                                <Button
                                    variant="ghost"
                                    className="gap-2 text-muted-foreground"
                                    onClick={() => {
                                        const rechargeAddress = InitSetting?.find(s => s.key === GeneralSetting.RechargeAddress)?.value;
                                        if (rechargeAddress) {
                                            window.open(rechargeAddress, '_blank');
                                        } else {
                                            toast.error(t('payment.noRechargeAddress'));
                                        }
                                    }}
                                >
                                    <HelpCircle className="h-4 w-4" />
                                    如何获取兑换码？
                                    <ExternalLink className="h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* 支付二维码弹窗 */}
            <Dialog open={qrCode !== ''} onOpenChange={(open) => {
                if (!open) {
                    setQrCode('');
                    setCountdown(300);
                }
            }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            扫码支付
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center space-y-4 py-4">
                        {/* 倒计时显示 */}
                        <Badge variant="secondary" className="gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(countdown)}
                        </Badge>

                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                <strong>请在5分钟内完成支付</strong><br />
                                使用支付宝扫描下方二维码完成支付
                            </AlertDescription>
                        </Alert>

                        {/* 二维码 */}
                        <div className="p-4 border rounded-lg bg-white">
                            <QRCode
                                value={qrCode}
                                size={200}
                            />
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Smartphone className="h-4 w-4" />
                            请使用手机支付宝扫码
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setQrCode('');
                                setCountdown(300);
                            }}
                        >
                            取消
                        </Button>
                        <Button
                            className="gap-2"
                            onClick={() => {
                                setQrCode('');
                                loadProducts();
                                setCountdown(300);
                            }}
                        >
                            <CheckCircle className="h-4 w-4" />
                            支付完成
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}