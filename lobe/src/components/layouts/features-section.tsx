import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight, Server, Users, Zap, Shield, BarChart3, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: () => void;
  actionText?: string;
}

function FeatureCard({ title, description, icon, action, actionText = "Learn more" }: FeatureCardProps) {
  return (
    <Card className="relative group hover:shadow-md transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {action && (
          <Button
            variant="ghost"
            size="sm"
            onClick={action}
            className="group-hover:bg-muted/50 transition-colors p-0 h-auto font-medium"
          >
            {actionText}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('welcome.features.unified.title'),
      description: t('welcome.features.unified.description'),
      icon: <Server className="h-6 w-6" />,
      action: () => window.location.href = '/model',
      actionText: t('welcome.footer.product.pricing')
    },
    {
      title: t('welcome.features.enterprise.title'),
      description: t('welcome.features.enterprise.description'),
      icon: <Users className="h-6 w-6" />,
      action: () => window.location.href = '/user',
      actionText: t('nav.user')
    },
    {
      title: t('welcome.features.scalable.title'),
      description: t('welcome.features.scalable.description'),
      icon: <Zap className="h-6 w-6" />,
      action: () => window.location.href = '/panel',
      actionText: t('nav.panel')
    },
    {
      title: t('welcome.features.security.title'),
      description: t('welcome.features.security.description'),
      icon: <Shield className="h-6 w-6" />,
      action: () => window.location.href = '/rate-limit',
      actionText: t('nav.rateLimit')
    },
    {
      title: t('welcome.features.monitoring.title'),
      description: t('welcome.features.monitoring.description'),
      icon: <BarChart3 className="h-6 w-6" />,
      action: () => window.location.href = '/logger',
      actionText: t('nav.logger')
    },
    {
      title: t('welcome.features.intelligent.title'),
      description: t('welcome.features.intelligent.description'),
      icon: <Settings className="h-6 w-6" />,
      action: () => window.location.href = '/setting',
      actionText: t('nav.setting')
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {t('welcome.features.title')}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            {t('welcome.features.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}