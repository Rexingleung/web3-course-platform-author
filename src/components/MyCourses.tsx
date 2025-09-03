import { useState, useEffect } from 'react';
import { BookOpen, User, Calendar, DollarSign, RefreshCw, TrendingUp, Users } from 'lucide-react';
import useWalletStore from '../stores/walletStore';
import useContractStore from '../stores/contractStore';
import { Course } from '../types';
import toast from 'react-hot-toast';

export function MyCourses() {
  const { address, isConnected } = useWalletStore();
  const { getMyCourses, isLoading } = useContractStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMyCourses = async () => {
    if (!address || !isConnected) return;
    
    setLoading(true);
    try {
      const myCourses = await getMyCourses();
      setCourses(myCourses);
    } catch (error) {
      console.error('Failed to load courses:', error);
      toast.error('加载课程失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyCourses();
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center card-hover shadow-glass-orange">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-author-400 to-crimson-500 rounded-2xl flex items-center justify-center">
          <BookOpen className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">我的课程</h2>
        <p className="text-white/70 max-w-md mx-auto">
          请先连接你的钱包以查看和管理你发布的所有课程
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-author-400 to-crimson-500 rounded-full mx-auto mt-6"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 标题和操作栏 */}
      <div className="glass-effect rounded-2xl p-6 shadow-glass-orange">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-author-500 to-crimson-500 rounded-xl flex items-center justify-center shadow-glow-orange">
              <BookOpen className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">我的课程</h2>
              <p className="text-white/70">管理你发布的所有课程和查看统计数据</p>
            </div>
          </div>
          
          <button
            onClick={loadMyCourses}
            disabled={loading || isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`${loading ? 'animate-spin' : ''}`} size={16} />
            <span>刷新</span>
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-effect rounded-xl p-4 card-hover">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-author-400 to-author-600 rounded-lg flex items-center justify-center">
              <BookOpen className="text-white" size={20} />
            </div>
            <div>
              <p className="text-white/60 text-sm">总课程数</p>
              <p className="text-white text-xl font-bold">{courses.length}</p>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-4 card-hover">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <Users className="text-white" size={20} />
            </div>
            <div>
              <p className="text-white/60 text-sm">总学生数</p>
              <p className="text-white text-xl font-bold">
                {courses.reduce((acc, course) => acc + (course.studentsCount || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-4 card-hover">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <p className="text-white/60 text-sm">总收益</p>
              <p className="text-white text-xl font-bold">
                {courses.reduce((acc, course) => acc + parseFloat(course.price || '0'), 0).toFixed(3)} ETH
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 课程列表 */}
      {loading || isLoading ? (
        <div className="glass-effect rounded-2xl p-12 text-center">
          <RefreshCw className="animate-spin text-white mx-auto mb-4" size={32} />
          <p className="text-white text-lg">加载课程中...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="glass-effect rounded-2xl p-12 text-center card-hover">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-author-400/20 to-crimson-500/20 rounded-2xl flex items-center justify-center">
            <BookOpen className="text-white/50" size={40} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">还没有课程</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            开始创建你的第一门课程，与世界分享你的知识和经验！
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-author-400 to-crimson-500 rounded-full mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="glass-effect rounded-xl p-6 card-hover shadow-glass-orange transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">
                  {course.title}
                </h3>
                <div className="ml-4 flex-shrink-0">
                  <div className="bg-gradient-to-r from-author-500 to-crimson-500 rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium">#{course.id}</span>
                  </div>
                </div>
              </div>

              <p className="text-white/70 text-sm mb-6 line-clamp-3">
                {course.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-white/80">
                  <DollarSign size={16} className="text-author-400" />
                  <span className="text-sm">{course.price} ETH</span>
                </div>
                
                <div className="flex items-center space-x-2 text-white/80">
                  <Users size={16} className="text-green-400" />
                  <span className="text-sm">{course.studentsCount || 0} 学生</span>
                </div>
                
                <div className="flex items-center space-x-2 text-white/80">
                  <Calendar size={16} className="text-blue-400" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-white/80">
                  <User size={16} className="text-purple-400" />
                  <span className="text-sm">作者</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/60 text-sm">课程状态</span>
                  <div className="bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-400/30 rounded-full px-3 py-1">
                    <span className="text-green-400 text-sm font-medium">✓ 已发布</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-author-500/20 to-crimson-500/20 border border-author-400/30 hover:from-author-500/30 hover:to-crimson-500/30 text-author-400 hover:text-author-300 py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium">
                    查看统计
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-400 hover:text-blue-300 py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium">
                    编辑课程
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
