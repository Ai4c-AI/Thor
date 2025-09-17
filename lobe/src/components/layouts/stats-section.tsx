import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Server, Users, Zap, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { StaggeredFadeIn } from '../animations/page-transition';
import { useTranslation } from 'react-i18next';

interface StatItemProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}

function StatItem({ title, value, icon, description }: StatItemProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 h-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="p-2 rounded-lg bg-primary/10 text-primary"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.div>
            <div className="text-right">
              <motion.div
                className="text-2xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{title}</div>
            </div>
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </CardContent>

        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
}

export function StatsSection() {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('welcome.stats.models.title'),
      value: "20+",
      icon: <Server className="h-5 w-5" />,
      description: t('welcome.stats.models.description')
    },
    {
      title: t('welcome.stats.users.title'),
      value: "5K+",
      icon: <Users className="h-5 w-5" />,
      description: t('welcome.stats.users.description')
    },
    {
      title: t('welcome.stats.requests.title'),
      value: "1M+",
      icon: <Zap className="h-5 w-5" />,
      description: t('welcome.stats.requests.description')
    },
    {
      title: t('welcome.stats.uptime.title'),
      value: "99.9%",
      icon: <TrendingUp className="h-5 w-5" />,
      description: t('welcome.stats.uptime.description')
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-48 h-48 border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-32 h-32 border border-primary/10 rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <StaggeredFadeIn className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('welcome.features.title')}
          </motion.h2>
          <motion.p
            className="mx-auto max-w-[700px] text-muted-foreground md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('welcome.features.subtitle')}
          </motion.p>
        </StaggeredFadeIn>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.1,
                ease: "easeOut"
              }}
            >
              <StatItem {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}