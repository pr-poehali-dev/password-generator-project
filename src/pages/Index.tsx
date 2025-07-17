import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/sonner'
import Icon from '@/components/ui/icon'
import PasswordGenerator from '@/components/PasswordGenerator'
import PasswordHistory from '@/components/PasswordHistory'
import SecuritySection from '@/components/SecuritySection'
import FAQSection from '@/components/FAQSection'

interface PasswordHistoryItem {
  id: string
  password: string
  strength: number
  timestamp: Date
}

const Index = () => {
  const [passwordHistory, setPasswordHistory] = useState<PasswordHistoryItem[]>([])

  const handlePasswordGenerated = (password: string, strength: number) => {
    const historyItem: PasswordHistoryItem = {
      id: Date.now().toString(),
      password: password,
      strength: strength,
      timestamp: new Date()
    }
    
    setPasswordHistory(prev => [historyItem, ...prev.slice(0, 9)]) // Храним только последние 10
  }

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
              <PasswordGenerator onPasswordGenerated={handlePasswordGenerated} />
            </div>
          </TabsContent>

          {/* История паролей */}
          <TabsContent value="history" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <PasswordHistory passwordHistory={passwordHistory} />
            </div>
          </TabsContent>

          {/* Безопасность */}
          <TabsContent value="security" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <SecuritySection />
            </div>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <FAQSection />
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