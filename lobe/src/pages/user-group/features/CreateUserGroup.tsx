import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { create } from "../../../services/UserGroupService";

interface CreateUserGroupPageProps {
    open: boolean;
    onClose: () => void;
    onOk: () => void;
}

interface FormData {
    name: string;
    code: string;
    description: string;
    rate: number;
    order: number;
    enable: boolean;
}

export default function CreateUserGroupPage(props: CreateUserGroupPageProps) {
    const { t } = useTranslation();
    const form = useForm<FormData>({
        defaultValues: {
            name: "",
            code: "",
            description: "",
            rate: 1.0,
            order: 0,
            enable: true,
        },
    });

    useEffect(() => {
        if (props.open) {
            form.reset({
                name: "",
                code: "",
                description: "",
                rate: 1.0,
                order: 0,
                enable: true,
            });
        }
    }, [props.open, form]);

    const handleSubmit = async (data: FormData) => {
        try {
            const res = await create(data);
            if (res.success) {
                toast.success(t('common.createSuccess'));
                props.onOk();
            } else {
                toast.error(res.message || t('common.createFailed'));
            }
        } catch (error) {
            console.error('Create failed:', error);
            toast.error(t('common.createFailed'));
        }
    };

    return (
        <Dialog open={props.open} onOpenChange={(open) => !open && props.onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{t('userGroup.createTitle')}</DialogTitle>
                    <DialogDescription>
                        {t('userGroup.createDescription')}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            rules={{ required: t('userGroup.nameRequired') }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('userGroup.name')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('userGroup.namePlaceholder')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="code"
                            rules={{ required: t('userGroup.codeRequired') }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('userGroup.code')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('userGroup.codePlaceholder')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            rules={{ required: t('userGroup.descriptionRequired') }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('common.description')}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={t('userGroup.descriptionPlaceholder')}
                                            className="min-h-20"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="rate"
                                rules={{
                                    required: t('userGroup.rateRequired'),
                                    min: { value: 0, message: t('userGroup.rateMinError') }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('userGroup.rate')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                placeholder="1.0"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="order"
                                rules={{
                                    required: t('userGroup.orderRequired'),
                                    min: { value: 0, message: t('userGroup.orderMinError') }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('userGroup.order')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="enable"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">{t('userGroup.enableLabel')}</FormLabel>
                                        <div className="text-sm text-muted-foreground">
                                            {t('userGroup.enableDescription')}
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={props.onClose}
                            >
                                {t('common.cancel')}
                            </Button>
                            <Button type="submit">
                                {t('common.create')}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 