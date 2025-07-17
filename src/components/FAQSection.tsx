import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Icon from '@/components/ui/icon'

const FAQSection = () => {
  return (
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
  )
}

export default FAQSection