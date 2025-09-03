import { useState, useEffect } from 'react';
import { ShoppingBag, BookOpen, DollarSign, Calendar, RefreshCw, Play, ExternalLink } from 'lucide-react';
import useWalletStore from '../stores/walletStore';
import { Course } from '../types';
import toast from 'react-hot-toast';

export function PurchasedCourses() {
  const { address, isConnected } = useWalletStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPurchasedCourses = async () => {
    if (!address || !isConnected) return;
    
    setLoading(true);
    try {
      // 这里需要根据实际的合约接口调整
      // const purchasedCourses = await getPurchasedCourses();
      // setCourses(purchasedCourses);
      
      // 临时示例数据
      setCourses([]);
    } catch (error) {
      console.error('Failed to load purchased courses:', error);
      toast.error('加载已购课程失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPurchasedCourses();
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center card-hover shadow-glass-orange">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
          <ShoppingBag className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">已购课程</h2>
        <p className="text-white/70 max-w-md mx-auto">
          请先连接你的钱包以查看你已购买的所有课程
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mt-6"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 标题和操作栏 */}
      <div className="glass-effect rounded-2xl p-6 shadow-glass-orange">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">已购课程</h2>
              <p className="text-white/70">管理和学习你已购买的课程</p>
            </div>
          </div>
          
          <button
            onClick={loadPurchasedCourses}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`${loading ? 'animate-spin' : ''}`} size={16} />
            <span>刷新</span>
          </button>
        </div>
      </div>

      {/* 学习统计 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-effect rounded-xl p-4 card-hover">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white" size={20} />
            </div>
            <div>
              <p className="text-white/60 text-sm">已购课程</p>
              <p className="text-white text-xl font-bold">{courses.length}</p>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-4 card-hover">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <Play className="text-white" size={20} />
            </div>
            <div>
              <p className="text-white/60 text-sm">已完成</p>
              <p className="text-white text-xl font-bold">
                {courses.filter(course => course.completionPercentage === 100).length}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-4 card-hover">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg flex items-center justify-center">
              <DollarSign className="text-white" size={20} />
            </div>
            <div>
              <p className="text-white/60 text-sm">总投资</p>
              <p className="text-white text-xl font-bold">
                {courses.reduce((acc, course) => acc + parseFloat(course.price || '0'), 0).toFixed(3)} ETH
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 课程列表 */}
      {loading ? (
        <div className="glass-effect rounded-2xl p-12 text-center">
          <RefreshCw className="animate-spin text-white mx-auto mb-4" size={32} />
          <p className="text-white text-lg">加载课程中...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="glass-effect rounded-2xl p-12 text-center card-hover">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
            <ShoppingBag className="text-white/50" size={40} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">还没有购买课程</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            作为创作者，你也可以购买其他作者的优质课程来提升自己！
          </p>
          <div className="flex justify-center">
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 font-medium">
              <ExternalLink size={18} />
              <span>前往用户端购买</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="glass-effect rounded-xl p-6 card-hover shadow-glass transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">
                  {course.title}
                </h3>
                <div className="ml-4 flex-shrink-0">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium">#{course.id}</span>
                  </div>
                </div>
              </div>

              <p className="text-white/70 text-sm mb-4 line-clamp-3">
                {course.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-white/80">
                  <DollarSign size={16} className="text-green-400" />
                  <span className="text-sm">购买价格: {course.price} ETH</span>
                </div>
                
                <div className="flex items-center space-x-2 text-white/80">
                  <Calendar size={16} className="text-blue-400" />
                  <span className="text-sm">时长: {course.duration}</span>
                </div>
              </div>

              {/* 学习进度条 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-sm">学习进度</span>
                  <span className="text-white/80 text-sm">{course.completionPercentage || 0}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.completionPercentage || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/60 text-sm">课程状态</span>
                  <div className="bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-400/30 rounded-full px-3 py-1">
                    <span className="text-green-400 text-sm font-medium">✓ 已购买</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium">
                  <Play size={18} />
                  <span>
                    {(course.completionPercentage || 0) > 0 ? '继续学习' : '开始学习'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 学习建议 */}
      <div className="glass-effect rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center">
          <span className="w-2 h-2 bg-gradient-to-r from-author-400 to-crimson-500 rounded-full mr-3"></span>
          学习建议
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/70 text-sm">
          <div className="space-y-2">
            <p>• 制定学习计划，每天坚持学习</p>
            <p>• 边学边实践，加深理解</p>
            <p>• 记录学习笔记和心得</p>
          </div>
          <div className="space-y-2">
            <p>• 与其他学习者交流讨论</p>
            <p>• 完成课程作业和练习</p>
            <p>• 将所学知识应用到实际项目中</p>
          </div>
        </div>
      </div>
    </div>
  );
}
