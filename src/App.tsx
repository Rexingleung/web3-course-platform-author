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
      {/* 作者端专属渐变背景 */}
      <div className="min-h-screen author-gradient-bg">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="glass-effect rounded-xl p-2 shadow-glass-orange">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('create')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    activeTab === 'create'
                      ? 'bg-gradient-to-r from-author-500 to-crimson-600 text-white shadow-lg shadow-author-500/30'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Plus size={20} />
                  <span className="hidden sm:inline">创建课程</span>
                  <span className="sm:hidden">创建</span>
                </button>
                <button
                  onClick={() => setActiveTab('my-courses')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    activeTab === 'my-courses'
                      ? 'bg-gradient-to-r from-author-500 to-crimson-600 text-white shadow-lg shadow-author-500/30'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <BookOpen size={20} />
                  <span className="hidden sm:inline">我的课程</span>
                  <span className="sm:hidden">课程</span>
                </button>
                <button
                  onClick={() => setActiveTab('purchased')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    activeTab === 'purchased'
                      ? 'bg-gradient-to-r from-author-500 to-crimson-600 text-white shadow-lg shadow-author-500/30'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <ShoppingBag size={20} />
                  <span className="hidden sm:inline">已购课程</span>
                  <span className="sm:hidden">已购</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            <div className="transition-all duration-300 ease-in-out">
              {activeTab === 'create' && (
                <div className="animate-fadeIn">
                  <CreateCourse />
                </div>
              )}
              {activeTab === 'my-courses' && (
                <div className="animate-fadeIn">
                  <MyCourses />
                </div>
              )}
              {activeTab === 'purchased' && (
                <div className="animate-fadeIn">
                  <PurchasedCourses />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 装饰性元素 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* 左上角装饰 */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-author-500/20 to-crimson-500/20 rounded-full blur-3xl"></div>
          {/* 右下角装饰 */}
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-crimson-500/20 to-author-600/20 rounded-full blur-3xl"></div>
          {/* 中间装饰 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-author-400/10 to-crimson-400/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </WalletProvider>
  )
}

export default App
