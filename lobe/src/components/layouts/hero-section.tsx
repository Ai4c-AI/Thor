import React from 'react';
import { ArrowRight, Github, Star, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { StaggeredFadeIn, SlideInLeft, SlideInRight } from '../animations/page-transition';
import { AnimatedBackground } from '../animations/background-effects';
import { useTranslation } from 'react-i18next';

interface HeroSectionProps {
  onGetStarted: () => void;
  onViewGithub: () => void;
}

export function HeroSection({ onGetStarted, onViewGithub }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Enhanced animated background */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center justify-center">
          {/* Left content with animations */}
          <SlideInLeft className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <StaggeredFadeIn delay={0.2}>
                <motion.div
                  className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-background/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                  </motion.div>
                  <span className="font-medium">{t('welcome.hero.badge')}</span>
                </motion.div>
              </StaggeredFadeIn>

              <StaggeredFadeIn delay={0.4}>
                <motion.h1
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                  {t('welcome.hero.title')}
                </motion.h1>
              </StaggeredFadeIn>

              <StaggeredFadeIn delay={0.5}>
                <h2 className="text-xl font-semibold text-muted-foreground md:text-2xl">
                  {t('welcome.hero.subtitle')}
                </h2>
              </StaggeredFadeIn>

              <StaggeredFadeIn delay={0.6}>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl lg:mx-0">
                  {t('welcome.hero.description')}
                </p>
              </StaggeredFadeIn>
            </div>

            <StaggeredFadeIn delay={0.8}>
              <div className="flex flex-col gap-4 min-[400px]:flex-row lg:justify-start justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button size="lg" onClick={onGetStarted} className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
                    {t('welcome.hero.primaryButton')}
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button variant="outline" size="lg" onClick={onViewGithub} className="gap-2 backdrop-blur-sm">
                    <Github className="h-4 w-4" />
                    <Star className="h-4 w-4" />
                    {t('welcome.hero.starButton')}
                  </Button>
                </motion.div>
              </div>
            </StaggeredFadeIn>
          </SlideInLeft>

          {/* Right content - Feature highlights with animations */}
          <SlideInRight delay={0.3} className="lg:flex lg:justify-center">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <StaggeredFadeIn delay={0.5}>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">
                          {t('welcome.hero.badge')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t('welcome.features.unified.description')}
                        </p>
                      </div>
                    </StaggeredFadeIn>

                    <div className="space-y-4">
                      {[
                        {
                          title: t('welcome.features.unified.title'),
                          desc: t('welcome.features.unified.description')
                        },
                        {
                          title: t('welcome.features.enterprise.title'),
                          desc: t('welcome.features.enterprise.description')
                        },
                        {
                          title: t('welcome.features.scalable.title'),
                          desc: t('welcome.features.scalable.description')
                        }
                      ].map((feature, index) => (
                        <StaggeredFadeIn key={index} delay={0.7 + index * 0.1}>
                          <motion.div
                            className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer"
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <motion.div
                              className="w-2 h-2 rounded-full bg-primary mt-2"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            />
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{feature.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-2">{feature.desc}</p>
                            </div>
                          </motion.div>
                        </StaggeredFadeIn>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}