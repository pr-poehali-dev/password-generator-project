import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Icon from '@/components/ui/icon'

const SecuritySection = () => {
  return (
    <div className="space-y-6">
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
  )
}

export default SecuritySection