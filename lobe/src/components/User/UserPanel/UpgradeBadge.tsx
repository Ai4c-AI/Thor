import { PropsWithChildren, memo } from 'react';

const UpgradeBadge = memo(({ children, showBadge }: PropsWithChildren<{ showBadge?: boolean }>) => {
  if (!showBadge) return children;

  return (
    <div className="relative">
      <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full border-2 border-background z-10"></span>
      {children}
    </div>
  );
});

export default UpgradeBadge;
