
import { memo } from 'react';
import UserAvatar from '../UserAvatar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { toast } from "sonner";
import { useActiveUser } from '../../../hooks/useActiveTabKey';
import { renderQuota } from '../../../utils/render';



const PanelContent = memo<{ closePopover: () => void }>(({ }) => {
  const user = useActiveUser();
  

  return (
    <div className="flex flex-col gap-2 min-w-[200px]">
      <div className="flex items-center justify-between p-1.5">
        <div className="flex items-center gap-1.5">
          <UserAvatar user={user} size={64} clickable />
          <div>
            <span className="text-sm font-medium">
              {user?.userName || "游客"}
            </span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">账号余额：</span>
              <Badge variant="destructive">{renderQuota(user?.residualCredit ?? 0, 2)}</Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-1.5">
        <Button
          className="w-full"
          onClick={async () => {
            try {
              const host = window.location.host;
              const protocol = window.location.protocol;
              const url = `${protocol}//${host}/share?userId=${user?.id}`;
              await navigator.clipboard.writeText(url);
              toast.success("分享链接已复制到剪贴板");
            } catch (err) {
              toast.error("复制失败，请重试");
            }
          }}
        >
          获取分享链接
        </Button>
      </div>
      <div className="flex items-center justify-between p-1.5">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
        >
          退出登录
        </Button>
      </div>
    </div>
  );
});

export default PanelContent;
