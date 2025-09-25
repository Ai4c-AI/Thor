import { memo, useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, User, Mail, Lock, Shield, Gift, Rocket } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar } from '../../components/ui/avatar';
import { Separator } from '../../components/ui/separator';
import { cn } from '../../lib/utils';

import { create, GetEmailCode } from '../../services/UserService';
import { login } from '../../services/AuthorizeService';
import { IsEnableEmailRegister } from '../../services/SettingService';

const registerSchema = z.object({
  userName: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  code: z.string().optional(),
  inviteCode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState<'account' | 'security'>('account');
  const enableEmailRegister = IsEnableEmailRegister();
  const registerButtonRef = useRef<HTMLButtonElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
      inviteCode: '',
    },
  });

  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countDown]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const inviteCode = searchParams.get('inviteCode');
    if (inviteCode) {
      form.setValue('inviteCode', inviteCode);
    }
  }, [location, form]);

  const playEasterEgg = useCallback(() => {
    if (registerButtonRef.current) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, []);

  const onSubmit = useCallback(async (values: RegisterFormData) => {
    try {
      setLoading(true);
      const resp = await create({
        userName: values.userName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        code: values.code || '',
        inviteCode: values.inviteCode || ''
      });

      if (resp.success) {
        toast.success(t('register.registerSuccess'));
        playEasterEgg();

        setTimeout(async () => {
          const loginResp = await login({
            account: values.userName,
            pass: values.password
          });

          if (loginResp.success) {
            localStorage.setItem('token', loginResp.data.token);
            localStorage.setItem('role', loginResp.data.role);
            setTimeout(() => navigate('/panel'), 1000);
          } else {
            setTimeout(() => navigate('/login'), 1500);
          }
        }, 2000);
      } else {
        toast.error(t('register.userCreationFailed') + ': ' + resp.message);
      }
    } catch (error) {
      toast.error(t('register.registerError'));
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate, playEasterEgg, t]);

  const handleGetCode = useCallback(async () => {
    try {
      const email = form.getValues('email');
      if (!email) {
        toast.error(t('register.emailRequired'));
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error(t('register.emailInvalid'));
        return;
      }

      setCountDown(60);
      const resp = await GetEmailCode(email);

      if (resp.success) {
        toast.success(t('register.verificationCodeSent'));
      } else {
        toast.warning(resp.message || t('register.verificationCodeOptional'));
        setCountDown(0);
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      toast.warning(t('register.verificationCodeOptional'));
      setCountDown(0);
    }
  }, [form, t]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">

        {/* Brand Section */}
        <div className="relative hidden h-full flex-col bg-muted p-6 lg:p-10 text-white md:flex dark:border-r">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 lg:-top-40 lg:-left-40 h-40 w-40 lg:h-80 lg:w-80 rounded-full bg-white/10 animate-pulse" />
            <div className="absolute -bottom-20 -right-20 lg:-bottom-40 lg:-right-40 h-48 w-48 lg:h-96 lg:w-96 rounded-full bg-white/5 animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/4 h-16 w-16 lg:h-32 lg:w-32 rounded-full bg-white/10 animate-pulse delay-2000" />
          </div>

          <div className="relative z-20 flex items-center text-base lg:text-lg font-medium">
            <Avatar className="mr-2 h-6 w-6 lg:h-8 lg:w-8">
              <img src="/logo.png" alt="Thor" className="rounded-md" />
            </Avatar>
            Thor
          </div>

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
                <div className="flex h-8 w-8 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white/20 flex-shrink-0 mt-1">
                  <Rocket className="h-4 w-4 lg:h-6 lg:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm lg:text-lg font-semibold leading-tight">
                    {t('register.feature1Title') || 'Next Generation AI Platform'}
                  </p>
                  <p className="text-xs lg:text-sm text-white/80 mt-1">
                    {t('register.feature1Desc') || 'Powerful AI tools for modern workflows'}
                  </p>
                </div>
              </div>

              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 rounded-full bg-white/60 flex-shrink-0" />
                  <p className="text-xs lg:text-sm text-white/90">Enterprise-grade security</p>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 rounded-full bg-white/60 flex-shrink-0" />
                  <p className="text-xs lg:text-sm text-white/90">Multi-model support</p>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 rounded-full bg-white/60 flex-shrink-0" />
                  <p className="text-xs lg:text-sm text-white/90">Real-time analytics</p>
                </div>
              </div>

              <footer className="pt-3 lg:pt-4 text-xs lg:text-sm text-white/60">
                {t('register.brandSlogan') || 'Join thousands of users already using Thor AI'}
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:space-y-6 sm:w-[400px]">

            {/* Mobile Logo */}
            <div className="flex flex-col space-y-2 text-center md:hidden">
              <div className="flex items-center justify-center space-x-2">
                <Avatar className="h-8 w-8">
                  <img src="/logo.png" alt="Thor" className="rounded-md" />
                </Avatar>
                <h1 className="text-2xl font-semibold tracking-tight">Thor</h1>
              </div>
            </div>

            {/* Header */}
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t('register.title') || 'Create an account'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('register.description') || 'Enter your details below to create your account'}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center space-x-2">
              <div className={cn(
                "h-2 flex-1 rounded-full transition-colors",
                currentStep === 'account' ? "bg-primary" : "bg-primary/20"
              )} />
              <div className={cn(
                "h-2 flex-1 rounded-full transition-colors",
                currentStep === 'security' ? "bg-primary" : "bg-primary/20"
              )} />
            </div>

            {/* Form */}
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    {/* Step 1: Account Info */}
                    {currentStep === 'account' && (
                      <div className="space-y-4 animate-in slide-in-from-right-5 duration-300">
                        <div className="text-center pb-2">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                            <User className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-semibold">{t('register.step1') || 'Account Information'}</h3>
                          <p className="text-sm text-muted-foreground">
                            {t('register.step1Desc') || 'Basic information for your account'}
                          </p>
                        </div>

                        <FormField
                          control={form.control}
                          name="userName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">{t('register.usernameLabel')}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    placeholder={t('register.usernamePlaceholder')}
                                    className="pl-10 h-11"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">{t('register.emailLabel')}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    type="email"
                                    placeholder={t('register.emailPlaceholder')}
                                    className="pl-10 h-11"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {enableEmailRegister && (
                          <>
                            <div className="pt-2">
                              <Button
                                type="button"
                                variant="outline"
                                disabled={countDown > 0}
                                onClick={handleGetCode}
                                className="w-full h-11"
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                {countDown > 0
                                  ? t('register.resendCode', { count: countDown })
                                  : t('register.getVerificationCode')}
                              </Button>
                            </div>

                            <FormField
                              control={form.control}
                              name="code"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">
                                    {t('register.verificationCodeLabel')}
                                    <span className="text-muted-foreground ml-1">(optional)</span>
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                      <Input
                                        {...field}
                                        placeholder={t('register.verificationCodePlaceholder')}
                                        className="pl-10 h-11"
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}

                        <div className="pt-4 space-y-3">
                          <Button
                            type="button"
                            onClick={() => setCurrentStep('security')}
                            className="w-full h-11"
                            size="lg"
                          >
                            {t('register.nextStep') || 'Continue'}
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Button>

                          <div className="text-center">
                            <Button
                              type="button"
                              variant="link"
                              onClick={() => navigate('/login')}
                              className="text-sm text-muted-foreground hover:text-foreground"
                            >
                              {t('register.loginLink') || 'Already have an account? Sign in'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Security */}
                    {currentStep === 'security' && (
                      <div className="space-y-4 animate-in slide-in-from-right-5 duration-300">
                        <div className="text-center pb-2">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                            <Lock className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="font-semibold">{t('register.step2') || 'Security Setup'}</h3>
                          <p className="text-sm text-muted-foreground">
                            {t('register.step2Desc') || 'Set up your password and optional invite code'}
                          </p>
                        </div>

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">{t('register.passwordLabel')}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t('register.passwordPlaceholder')}
                                    className="pl-10 pr-10 h-11"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">{t('register.confirmPasswordLabel')}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder={t('register.confirmPasswordPlaceholder')}
                                    className="pl-10 pr-10 h-11"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="inviteCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                {t('register.inviteCodeLabel')}
                                <span className="text-muted-foreground ml-1">(optional)</span>
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    placeholder={t('register.inviteCodePlaceholder')}
                                    className="pl-10 h-11"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="pt-4 space-y-3">
                          <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11"
                            size="lg"
                            ref={registerButtonRef}
                          >
                            {loading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                {t('register.registering') || 'Creating account...'}
                              </>
                            ) : (
                              <>
                                {t('register.registerButton') || 'Create account'}
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </>
                            )}
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep('account')}
                            className="w-full h-11"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            {t('register.prevStep') || 'Back'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Terms */}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Button variant="link" className="h-auto p-0 text-sm underline">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button variant="link" className="h-auto p-0 text-sm underline">
                Privacy Policy
              </Button>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Success Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-in zoom-in-50 duration-500">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500 shadow-lg">
              <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-600/20 animate-pulse" />
        </div>
      )}
    </div>
  );
});

export default RegisterPage;