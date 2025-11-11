import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '../../components/layouts/hero-section';
import { StatsSection } from '../../components/layouts/stats-section';
import { FeaturesSection } from '../../components/layouts/features-section';
import { FooterSection } from '../../components/layouts/footer-section';
import { PageTransition } from '../../components/animations/page-transition';

export default function ShadcnWelcomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGetStarted = () => {
    navigate('/panel');
  };

  const handleViewGithub = () => {
    window.open('https://github.com/AIDotNet/Thor', '_blank');
  };

  return (
    <PageTransition className="min-h-screen bg-background">
      <HeroSection
        onGetStarted={handleGetStarted}
        onViewGithub={handleViewGithub}
      />

      <StatsSection />

      <FeaturesSection />

      <FooterSection />
    </PageTransition>
  );
}