import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { KeyRound } from 'lucide-react';

interface Token {
  id: string;
  name: string;
  key: string;
  type: string;
  remainQuota?: number;
  unlimitedQuota?: boolean;
}

interface TokenSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tokens: Token[];
  onTokenSelect: (token: Token) => void;
}

const TokenSelectionDialog = memo(({
  open,
  onOpenChange,
  tokens,
  onTokenSelect
}: TokenSelectionDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            选择 Token
          </DialogTitle>
          <DialogDescription>
            选择一个 Token 来连接到 Cherry Studio
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {tokens.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <KeyRound className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>暂无可用的 Token</p>
              <p className="text-sm">请先创建一个 Token</p>
            </div>
          ) : (
            tokens.map((token) => (
              <div
                key={token.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{token.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {token.type}
                    </Badge>
                  </div>
                  {token.remainQuota !== undefined && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {token.unlimitedQuota
                        ? '无限额度'
                        : `剩余额度: ${token.remainQuota}`
                      }
                    </p>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => onTokenSelect(token)}
                  className="ml-3"
                >
                  选择
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});

TokenSelectionDialog.displayName = 'TokenSelectionDialog';

export default TokenSelectionDialog;