import { X } from 'lucide-react';
import { memo, useState } from 'react';
import { Button } from '../../../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';
import UserPanel from '../../../User/UserPanel';
import UserAvatar from '../../../User/UserAvatar';
import { useActiveUser } from '../../../../hooks/useActiveTabKey';

const Avatar = memo(() => {
    const [hideSettingsMoveGuide] = useState(true);
    const user = useActiveUser();
    const content = (
        <UserPanel>
            <UserAvatar user={user} clickable />
        </UserPanel>
    );

    return hideSettingsMoveGuide ? (
        content
    ) : (
        <Tooltip>
            <TooltipTrigger asChild>
                {content}
            </TooltipTrigger>
            <TooltipContent side="right">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {

                        }}
                        className="h-auto p-1"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </TooltipContent>
        </Tooltip>
    );
});

Avatar.displayName = 'Avatar';

export default Avatar;
