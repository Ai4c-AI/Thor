import React from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '../lib/utils';

interface ShadcnLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * ShadcnLayout - A modern layout wrapper using shadcn/ui design system
 *
 * Features:
 * - Clean, minimal design
 * - Responsive by default
 * - Consistent spacing and typography
 * - Dark mode support
 */
export function ShadcnLayout({ children, className }: ShadcnLayoutProps) {
  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground",
      className
    )}>
      {children || <Outlet />}
    </div>
  );
}

/**
 * PageLayout - A layout component for content pages
 * Provides consistent padding and max-width constraints
 */
export function PageLayout({ children, className }: ShadcnLayoutProps) {
  return (
    <ShadcnLayout>
      <div className={cn(
        "container mx-auto px-4 py-8 md:px-6 md:py-12",
        className
      )}>
        {children}
      </div>
    </ShadcnLayout>
  );
}

/**
 * DashboardLayout - A layout for dashboard-style pages
 * Includes space for sidebar and main content
 */
export function DashboardLayout({
  children,
  sidebar,
  className
}: ShadcnLayoutProps & { sidebar?: React.ReactNode }) {
  return (
    <ShadcnLayout>
      <div className="flex h-screen overflow-hidden">
        {sidebar && (
          <div className="w-64 border-r bg-muted/30">
            {sidebar}
          </div>
        )}
        <div className={cn(
          "flex-1 overflow-y-auto",
          className
        )}>
          {children}
        </div>
      </div>
    </ShadcnLayout>
  );
}