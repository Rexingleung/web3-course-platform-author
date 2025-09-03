import { useState } from 'react';
import { Plus, BookOpen, DollarSign, FileText, Loader } from 'lucide-react';
import useWalletStore from '../stores/walletStore';
import useContractStore from '../stores/contractStore';
import toast from 'react-hot-toast';

export function CreateCourse() {
  const { isConnected, address } = useWalletStore();
  const { createCourse, isLoading } = useContractStore();
  
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
      <div className="glass-effect rounded-2xl p-8 text-center card-hover shadow-glass-orange">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-author-400 to-crimson-500 rounded-2xl flex items-center justify-center">
          <BookOpen className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">创建课程</h2>
        <p className="text-white/70 mb-6 max-w-md mx-auto">
          请先连接你的钱包以开始创建和发布你的专业课程
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-author-400 to-crimson-500 rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl p-8 card-hover shadow-glass-orange">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-r from-author-500 to-crimson-500 rounded-xl flex items-center justify-center shadow-glow-orange">
          <Plus className="text-white" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">创建新课程</h2>
          <p className="text-white/70">发布你的知识，赚取收益，帮助他人成长</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-white font-medium">
            <BookOpen size={18} className="text-author-400" />
            <span>课程标题 *</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="输入吸引人的课程标题..."
            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-author-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
            disabled={isSubmitting || isLoading}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-white font-medium">
            <FileText size={18} className="text-author-400" />
            <span>课程描述 *</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="详细描述你的课程内容、学习目标和适合的学员..."
            rows={5}
            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-author-500 focus:border-transparent backdrop-blur-sm resize-none transition-all duration-200"
            disabled={isSubmitting || isLoading}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-white font-medium">
            <DollarSign size={18} className="text-author-400" />
            <span>课程价格 (ETH) *</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.001"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.001"
              className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-author-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              disabled={isSubmitting || isLoading}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-white/60 text-sm font-medium">ETH</span>
            </div>
          </div>
          <p className="text-white/50 text-sm">建议价格区间：0.001 - 1 ETH</p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full btn-author-primary text-white py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg"
          >
            {isSubmitting || isLoading ? (
              <>
                <Loader className="animate-spin" size={24} />
                <span>创建中...</span>
              </>
            ) : (
              <>
                <Plus size={24} />
                <span>创建课程</span>
              </>
            )}
          </button>
        </div>

        {/* 提示信息 */}
        <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
          <h4 className="text-white font-medium mb-2 flex items-center">
            <span className="w-2 h-2 bg-author-400 rounded-full mr-2"></span>
            创建提示
          </h4>
          <ul className="text-white/70 text-sm space-y-1">
            <li>• 确保课程内容原创且有价值</li>
            <li>• 价格设置要合理，考虑目标受众</li>
            <li>• 课程创建后将发布到区块链，无法删除</li>
            <li>• 创建需要支付少量 gas 费用</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
