import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { toast } from 'sonner'

interface PasswordHistoryItem {
  id: string
  password: string
  strength: number
  timestamp: Date
}

interface PasswordHistoryProps {
  passwordHistory: PasswordHistoryItem[]
}

const PasswordHistory = ({ passwordHistory }: PasswordHistoryProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Скопировано в буфер обмена!')
  }

  const getStrengthText = (strength: number) => {
    if (strength < 40) return 'Слабый'
    if (strength < 70) return 'Средний'
    return 'Сильный'
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="History" size={20} />
          История паролей
        </CardTitle>
        <CardDescription>
          Последние сгенерированные пароли (сохраняются только в этой сессии)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {passwordHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Icon name="Clock" size={48} className="mx-auto mb-4 text-gray-300" />
            <p>История пуста</p>
            <p className="text-sm">Сгенерируйте первый пароль</p>
          </div>
        ) : (
          <div className="space-y-3">
            {passwordHistory.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-mono text-sm truncate pr-4">{item.password}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={item.strength >= 70 ? 'default' : item.strength >= 40 ? 'secondary' : 'destructive'} className="text-xs">
                      {getStrengthText(item.strength)}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(item.password)}
                  className="shrink-0"
                >
                  <Icon name="Copy" size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PasswordHistory