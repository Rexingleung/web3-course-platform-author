import { useState } from 'react';
import { Plus, BookOpen, DollarSign, FileText, Loader } from 'lucide-react';
import useWalletStore from '../stores/walletStore';
import useContractStore from '../stores/contractStore';
import toast from 'react-hot-toast';

export function CreateCourse() {
  const { isConnected, address } = useWalletStore();
  const { createCourse } = useContractStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('请先连接钱包');
      return;
    }

    if (!formData.title.trim() || !formData.description.trim() || !formData.price.trim()) {
      toast.error('请填写所有必选字段');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('请输入有效的价格');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createCourse(
        formData.title.trim(),
        formData.description.trim(),
        formData.price.trim()
      );
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: ''
      });
      
    } catch (error) {
      console.error('Create course error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center">
        <BookOpen className="mx-auto mb-4 text-white opacity-50" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">创建课程</h2>
        <p className="text-white opacity-70 mb-6">
          请先连接你的钱包以开始创建课程
        </p>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
          <Plus className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">创建新课程</h2>
          <p className="text-white opacity-70">发布你的知识，赚取收益</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center space-x-2 text-white mb-2">
            <BookOpen size={16} />
            <span>课程标题</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="输入课程标题..."
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-white mb-2">
            <FileText size={16} />
            <span>课程描述</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="详细描述你的课程内容..."
            rows={4}
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-white mb-2">
            <DollarSign size={16} />
            <span>课程价格 (ETH)</span>
          </label>
          <input
            type="number"
            step="0.001"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="0.001"
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <Plus size={20} />
          )}
          <span>{isSubmitting ? '创建中...' : '创建课程'}</span>
        </button>
      </form>
    </div>
  );
}
