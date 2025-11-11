import React from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function FooterSection() {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted/50 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{t('welcome.hero.title')}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t('welcome.hero.subtitle')}
              </p>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t('welcome.footer.product.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal justify-start">
                  <a href="/">{t('welcome.footer.product.home')}</a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal justify-start">
                  <a href="/model">{t('welcome.footer.product.pricing')}</a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal justify-start">
                  <a href="https://thor-ai.apifox.cn" target="_blank" rel="noopener noreferrer">
                    {t('welcome.footer.product.docs')}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal justify-start">
                  <a href="/panel">{t('welcome.footer.product.console')}</a>
                </Button>
              </li>
            </ul>
          </div>

          {/* Community links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t('welcome.footer.community.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal justify-start">
                  <a href="https://github.com/AIDotNet/Thor" target="_blank" rel="noopener noreferrer">
                    {t('welcome.footer.community.github')}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal justify-start">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {t('welcome.footer.community.support')}
                  </a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal justify-start">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {t('welcome.footer.community.feedback')}
                  </a>
                </Button>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t('welcome.footer.company.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal justify-start">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {t('welcome.footer.company.about')}
                  </a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal justify-start">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {t('welcome.footer.company.blog')}
                  </a>
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal justify-start">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    {t('welcome.footer.company.contact')}
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>{t('welcome.footer.copyright')}</p>
          <div className="mt-2 md:mt-0 flex space-x-4">
            <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal">
              <a href="#" onClick={(e) => e.preventDefault()}>
                {t('welcome.footer.legal.privacy')}
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-normal">
              <a href="#" onClick={(e) => e.preventDefault()}>
                {t('welcome.footer.legal.terms')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}