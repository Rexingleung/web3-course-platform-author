import { useState, useEffect } from 'react';
import { BookOpen, User, Calendar, DollarSign, RefreshCw } from 'lucide-react';
import useWalletStore from '../stores/walletStore';
import useContractStore from '../stores/contractStore';
import { Course } from '../types';
import toast from 'react-hot-toast';

export function MyCourses() {
  const { address, isConnected } = useWalletStore();
  const { getMyCourses } = useContractStore();
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
      <div className="glass-effect rounded-2xl p-8 text-center">
        <BookOpen className="mx-auto mb-4 text-white opacity-50" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">我的课程</h2>
        <p className="text-white opacity-70">
          请先连接你的钱包以查看你的课程
        </p>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <BookOpen className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">我的课程</h2>
            <p className="text-white opacity-70">管理你发布的所有课程</p>
          </div>
        </div>
        
        <button
          onClick={loadMyCourses}
          disabled={loading}
          className="glass-effect rounded-lg px-4 py-2 text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
        >
          <RefreshCw className={`${loading ? 'animate-spin' : ''}`} size={16} />
          <span>刷新</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="animate-spin text-white mr-2" size={24} />
          <span className="text-white">加载中...</span>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto mb-4 text-white opacity-30" size={64} />
          <h3 className="text-xl font-semibold text-white mb-2">还没有课程</h3>
          <p className="text-white opacity-70 mb-4">
            开始创建你的第一门课程吧！
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="glass-effect rounded-xl p-6 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white line-clamp-2">
                  {course.title}
                </h3>
                <div className="glass-effect rounded-lg px-3 py-1 ml-4">
                  <span className="text-white text-sm">#{course.id}</span>
                </div>
              </div>

              <p className="text-white opacity-70 text-sm mb-4 line-clamp-3">
                {course.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-white opacity-80">
                  <DollarSign size={14} />
                  <span className="text-sm">{course.price} ETH</span>
                </div>
                
                <div className="flex items-center space-x-2 text-white opacity-80">
                  <Calendar size={14} />
                  <span className="text-sm">{course.duration}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-white opacity-80">
                  <User size={14} />
                  <span className="text-sm">作者</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white border-opacity-10">
                <div className="flex items-center justify-between">
                  <span className="text-white opacity-70 text-sm">课程状态</span>
                  <div className="glass-effect rounded-full px-3 py-1">
                    <span className="text-green-400 text-sm">已发布</span>
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
