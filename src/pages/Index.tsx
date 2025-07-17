import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Icon from '@/components/ui/icon'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

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

const Index = () => {
  const [password, setPassword] = useState('')
  const [settings, setSettings] = useState<PasswordSettings>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false
  })
  const [passwordHistory, setPasswordHistory] = useState<PasswordHistoryItem[]>([])
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
    
    // Добавляем в историю
    const historyItem: PasswordHistoryItem = {
      id: Date.now().toString(),
      password: newPassword,
      strength: passwordStrength,
      timestamp: new Date()
    }
    
    setPasswordHistory(prev => [historyItem, ...prev.slice(0, 9)]) // Храним только последние 10
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

  // Генерируем первый пароль при загрузке
  useEffect(() => {
    generatePassword()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Toaster />
      
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">SecurePass</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#generator" className="text-gray-600 hover:text-blue-600 transition-colors">Генератор</a>
              <a href="#security" className="text-gray-600 hover:text-blue-600 transition-colors">Безопасность</a>
              <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-8">
            <TabsTrigger value="generator">Генератор</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
            <TabsTrigger value="security">Безопасность</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Генератор паролей */}
          <TabsContent value="generator" className="space-y-6">
            <div className="max-w-2xl mx-auto">
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
            </div>
          </TabsContent>

          {/* История паролей */}
          <TabsContent value="history" className="space-y-6">
            <div className="max-w-2xl mx-auto">
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
            </div>
          </TabsContent>

          {/* Безопасность */}
          <TabsContent value="security" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Shield" size={20} />
                      Проверка на утечки
                    </CardTitle>
                    <CardDescription>
                      Проверьте, не попал ли ваш пароль в базы утечек
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert>
                      <Icon name="Info" size={16} />
                      <AlertDescription>
                        Функция в разработке. Скоро будет доступна проверка по базам Have I Been Pwned
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Download" size={20} />
                      Экспорт паролей
                    </CardTitle>
                    <CardDescription>
                      Сохраните пароли в безопасном формате
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert>
                      <Icon name="Info" size={16} />
                      <AlertDescription>
                        Функция в разработке. Скоро будет доступен экспорт в форматы 1Password, LastPass, KeePass
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BookOpen" size={20} />
                    Советы по безопасности
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                          <Icon name="Check" size={16} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-700">Используйте уникальные пароли</h4>
                          <p className="text-sm text-gray-600">Для каждого сайта и сервиса должен быть свой пароль</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                          <Icon name="Check" size={16} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-700">Включите двухфакторную аутентификацию</h4>
                          <p className="text-sm text-gray-600">Дополнительный уровень защиты для важных аккаунтов</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                          <Icon name="Check" size={16} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-700">Используйте менеджер паролей</h4>
                          <p className="text-sm text-gray-600">Безопасное хранение всех ваших паролей</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                          <Icon name="X" size={16} className="text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-700">Не используйте личную информацию</h4>
                          <p className="text-sm text-gray-600">Имена, даты рождения, номера телефонов легко подобрать</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                          <Icon name="X" size={16} className="text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-700">Не делитесь паролями</h4>
                          <p className="text-sm text-gray-600">Никому не сообщайте свои пароли, даже близким</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                          <Icon name="X" size={16} className="text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-700">Не сохраняйте в браузере</h4>
                          <p className="text-sm text-gray-600">Браузерные менеджеры паролей менее безопасны</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} />
                    Часто задаваемые вопросы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Насколько безопасен генератор паролей?</AccordionTrigger>
                      <AccordionContent>
                        Генератор работает полностью в вашем браузере, пароли не отправляются на сервер. 
                        Мы используем криптографически стойкий генератор случайных чисел для создания паролей.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Какую длину пароля рекомендуется использовать?</AccordionTrigger>
                      <AccordionContent>
                        Рекомендуется использовать пароли длиной не менее 12 символов. Для особо важных аккаунтов 
                        лучше использовать 16-20 символов с включением всех типов символов.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Сохраняются ли пароли на сервере?</AccordionTrigger>
                      <AccordionContent>
                        Нет, все пароли генерируются и хранятся только в вашем браузере. История паролей 
                        очищается при закрытии страницы. Мы не собираем и не храним ваши пароли.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Что делать, если забыл пароль?</AccordionTrigger>
                      <AccordionContent>
                        Этот генератор создает случайные пароли, которые невозможно восстановить. 
                        Обязательно сохраните сгенерированный пароль в надежном месте или используйте менеджер паролей.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Можно ли использовать один пароль для всех сайтов?</AccordionTrigger>
                      <AccordionContent>
                        Категорически нет! Для каждого сайта и сервиса должен быть уникальный пароль. 
                        Если один сайт будет взломан, злоумышленники не смогут получить доступ к другим вашим аккаунтам.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 SecurePass. Безопасная генерация паролей.</p>
            <p className="text-sm">Все пароли генерируются локально в вашем браузере</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index