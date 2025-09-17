import { PropsWithChildren, memo, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import PanelContent from './PanelContent';
import UpgradeBadge from './UpgradeBadge'

const UserPanel = memo<PropsWithChildren>(({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <UpgradeBadge>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {children}
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 mt-2 mr-2" 
          align="end"
          side="bottom"
        >
          <PanelContent closePopover={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </UpgradeBadge>
  );
});

UserPanel.displayName = 'UserPanel';

export default UserPanel;
