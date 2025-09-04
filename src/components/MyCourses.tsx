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
      <div className="p-8 text-center rounded-2xl glass-effect card-hover shadow-glass-orange">
        <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-gradient-to-br rounded-2xl from-author-400 to-crimson-500">
          <BookOpen className="text-white" size={32} />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-white">我的课程</h2>
        <p className="mx-auto max-w-md text-white/70">
          请先连接你的钱包以查看和管理你发布的所有课程
        </p>
        <div className="mx-auto mt-6 w-24 h-1 bg-gradient-to-r rounded-full from-author-400 to-crimson-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 标题和操作栏 */}
      <div className="p-6 rounded-2xl glass-effect shadow-glass-orange">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-r rounded-xl from-author-500 to-crimson-500 shadow-glow-orange">
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
            className="flex items-center px-4 py-2 space-x-2 text-white rounded-lg border transition-all duration-200 bg-white/10 hover:bg-white/20 border-white/20 disabled:opacity-50"
          >
            <RefreshCw className={`${loading ? 'animate-spin' : ''}`} size={16} />
            <span>刷新</span>
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-xl glass-effect card-hover">
          <div className="flex items-center space-x-3">
            <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-r rounded-lg from-author-400 to-author-600">
              <BookOpen className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-white/60">总课程数</p>
              <p className="text-xl font-bold text-white">{courses.length}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-effect card-hover">
          <div className="flex items-center space-x-3">
            <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg">
              <Users className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-white/60">总学生数</p>
              <p className="text-xl font-bold text-white">
                {courses.reduce((acc, course) => acc + (course.studentsCount || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-effect card-hover">
          <div className="flex items-center space-x-3">
            <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-lg">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm text-white/60">总收益</p>
              <p className="text-xl font-bold text-white">
                {courses.reduce((acc, course) => acc + parseFloat(course.price || '0'), 0).toFixed(3)} ETH
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 课程列表 */}
      {loading || isLoading ? (
        <div className="p-12 text-center rounded-2xl glass-effect">
          <RefreshCw className="mx-auto mb-4 text-white animate-spin" size={32} />
          <p className="text-lg text-white">加载课程中...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-effect card-hover">
          <div className="flex justify-center items-center mx-auto mb-6 w-20 h-20 bg-gradient-to-br rounded-2xl from-author-400/20 to-crimson-500/20">
            <BookOpen className="text-white/50" size={40} />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white">还没有课程</h3>
          <p className="mx-auto mb-6 max-w-md text-white/70">
            开始创建你的第一门课程，与世界分享你的知识和经验！
          </p>
          <div className="mx-auto w-32 h-1 bg-gradient-to-r rounded-full from-author-400 to-crimson-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-6 rounded-xl transition-all duration-300 glass-effect card-hover shadow-glass-orange"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="flex-1 text-lg font-semibold text-white line-clamp-2">
                  title: {course.title}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  <div className="px-3 py-1 bg-gradient-to-r rounded-lg from-author-500 to-crimson-500">
                    <span className="text-sm font-medium text-white">id: #{course.id}</span>
                  </div>
                </div>
              </div>

              <p className="mb-6 text-sm text-white/70 line-clamp-3">
              description: {course.description}
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
                  <User size={16} className="text-purple-400" />
                  <span className="text-sm">作者 {course?.author}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-white/60">课程状态</span>
                  <div className="px-3 py-1 bg-gradient-to-r rounded-full border from-green-500/20 to-green-400/20 border-green-400/30">
                    <span className="text-sm font-medium text-green-400">✓ 已发布</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
