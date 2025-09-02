import { useState } from 'react'
import { WalletProvider } from './components/WalletProvider'
import { Header } from './components/Header'
import { CreateCourse } from './components/CreateCourse'
import { MyCourses } from './components/MyCourses'
import { PurchasedCourses } from './components/PurchasedCourses'
import { BookOpen, Plus, ShoppingBag } from 'lucide-react'

type Tab = 'create' | 'my-courses' | 'purchased'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('create')

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="glass-effect rounded-xl p-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('create')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === 'create'
                      ? 'bg-white bg-opacity-20 text-white shadow-lg'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Plus size={20} />
                  创建课程
                </button>
                <button
                  onClick={() => setActiveTab('my-courses')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === 'my-courses'
                      ? 'bg-white bg-opacity-20 text-white shadow-lg'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <BookOpen size={20} />
                  我的课程
                </button>
                <button
                  onClick={() => setActiveTab('purchased')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === 'purchased'
                      ? 'bg-white bg-opacity-20 text-white shadow-lg'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <ShoppingBag size={20} />
                  已购课程
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'create' && <CreateCourse />}
            {activeTab === 'my-courses' && <MyCourses />}
            {activeTab === 'purchased' && <PurchasedCourses />}
          </div>
        </div>
      </div>
    </WalletProvider>
  )
}

export default App
