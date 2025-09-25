import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { memo, forwardRef } from 'react';
import { cn } from '@/lib/utils';


export interface UserAvatarProps {
  size?: number;
  clickable?: boolean;
  user?: any;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ size = 40, clickable, user, className, style, onClick, ...rest }, ref) => {
    function getAvatar() {
      return user?.avatar || '/logo.png'
    }

    return (
      <Avatar
        ref={ref}
        className={cn(
          'flex-none transition-all duration-200 ease-out',
          clickable && [
            'relative cursor-pointer',
            'before:absolute before:content-[""] before:w-1/4 before:h-full',
            'before:bg-white/50 before:transform before:skew-x-[-45deg]',
            'before:translate-x-[-400%] before:transition-all before:duration-200',
            'before:ease-out before:overflow-hidden before:box-border',
            'hover:ring-2 hover:ring-primary',
            'hover:before:transform hover:before:skew-x-[-45deg] hover:before:translate-x-[400%]'
          ],
          className
        )}
        style={{ width: size, height: size, ...style }}
        onClick={onClick}
        {...rest}
      >
        <AvatarImage src={getAvatar()} alt="User avatar" />
        <AvatarFallback className="bg-muted">
          {user?.userName?.[0]?.toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
    );
  }
);

UserAvatar.displayName = 'UserAvatar';

export default memo(UserAvatar);
