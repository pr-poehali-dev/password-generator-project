import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import { toast } from 'sonner'

interface PasswordSettings {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
}

interface PasswordHistoryItem {
  id: string
  password: string
  strength: number
  timestamp: Date
}

interface PasswordGeneratorProps {
  onPasswordGenerated: (password: string, strength: number) => void
}

const PasswordGenerator = ({ onPasswordGenerated }: PasswordGeneratorProps) => {
  const [password, setPassword] = useState('')
  const [settings, setSettings] = useState<PasswordSettings>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false
  })
  const [strength, setStrength] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePassword = async () => {
    setIsGenerating(true)
    
    // Имитация задержки для эффекта
    await new Promise(resolve => setTimeout(resolve, 300))
    
    let charset = ''
    if (settings.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (settings.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (settings.includeNumbers) charset += '0123456789'
    if (settings.includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    if (settings.excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '')
    }
    
    if (charset === '') {
      toast.error('Выберите хотя бы один тип символов')
      setIsGenerating(false)
      return
    }
    
    let newPassword = ''
    for (let i = 0; i < settings.length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    setPassword(newPassword)
    const passwordStrength = calculateStrength(newPassword)
    setStrength(passwordStrength)
    
    // Передаем данные в родительский компонент
    onPasswordGenerated(newPassword, passwordStrength)
    
    setIsGenerating(false)
    toast.success('Пароль сгенерирован!')
  }

  const calculateStrength = (pwd: string): number => {
    let score = 0
    
    // Длина
    if (pwd.length >= 8) score += 25
    if (pwd.length >= 12) score += 25
    
    // Разнообразие символов
    if (/[a-z]/.test(pwd)) score += 10
    if (/[A-Z]/.test(pwd)) score += 10
    if (/[0-9]/.test(pwd)) score += 10
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20
    
    return Math.min(score, 100)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Скопировано в буфер обмена!')
  }

  const getStrengthColor = (strength: number) => {
    if (strength < 40) return 'bg-red-500'
    if (strength < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = (strength: number) => {
    if (strength < 40) return 'Слабый'
    if (strength < 70) return 'Средний'
    return 'Сильный'
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl text-gray-900">Генератор паролей</CardTitle>
        <CardDescription className="text-gray-600">
          Создайте надёжный пароль для защиты ваших данных
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Сгенерированный пароль */}
        <div className="relative">
          <Input
            value={password}
            readOnly
            className="pr-12 font-mono text-lg h-12 bg-gray-50 border-2"
            placeholder="Нажмите 'Генерировать' для создания пароля"
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-blue-100"
            onClick={() => copyToClipboard(password)}
            disabled={!password}
          >
            <Icon name="Copy" size={16} />
          </Button>
        </div>

        {/* Индикатор надёжности */}
        {password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Надёжность пароля</Label>
              <Badge variant={strength >= 70 ? 'default' : strength >= 40 ? 'secondary' : 'destructive'}>
                {getStrengthText(strength)}
              </Badge>
            </div>
            <Progress value={strength} className="h-2" />
          </div>
        )}

        {/* Настройки */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Длина пароля: {settings.length}</Label>
            <Slider
              value={[settings.length]}
              onValueChange={(value) => setSettings(prev => ({ ...prev, length: value[0] }))}
              max={64}
              min={4}
              step={1}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="uppercase"
                checked={settings.includeUppercase}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeUppercase: checked }))}
              />
              <Label htmlFor="uppercase" className="text-sm">Заглавные буквы</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="lowercase"
                checked={settings.includeLowercase}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeLowercase: checked }))}
              />
              <Label htmlFor="lowercase" className="text-sm">Строчные буквы</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="numbers"
                checked={settings.includeNumbers}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeNumbers: checked }))}
              />
              <Label htmlFor="numbers" className="text-sm">Цифры</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="symbols"
                checked={settings.includeSymbols}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeSymbols: checked }))}
              />
              <Label htmlFor="symbols" className="text-sm">Символы</Label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="exclude-similar"
              checked={settings.excludeSimilar}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, excludeSimilar: checked }))}
            />
            <Label htmlFor="exclude-similar" className="text-sm">Исключить похожие символы (i, l, 1, L, o, 0, O)</Label>
          </div>
        </div>

        <Button 
          onClick={generatePassword} 
          className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Icon name="Loader2" size={20} className="animate-spin mr-2" />
              Генерация...
            </>
          ) : (
            <>
              <Icon name="RefreshCw" size={20} className="mr-2" />
              Генерировать пароль
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default PasswordGenerator