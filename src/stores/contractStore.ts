import { create } from 'zustand';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/constants';
import { ContractStore, Course } from '../types';
import { parseEther } from '../utils/format';

const useContractStore = create<ContractStore>((set, get) => ({
  contract: null,
  isLoading: false,
  error: null,

  initializeContract: async () => {
    if (!window.ethereum) {
      const error = '请安装 MetaMask 钱包';
      set({ error });
      toast.error(error);
      return;
    }

    try {
      set({ isLoading: true, error: null });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      set({ contract, isLoading: false });
      console.log('合约初始化成功');
    } catch (error: any) {
      const errorMsg = '合约初始化失败';
      console.error('合约初始化失败:', error);
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
    }
  },

  createCourse: async (title: string, description: string, price: string) => {
    const { contract } = get();
    
    if (!contract) {
      await get().initializeContract();
    }

    try {
      set({ isLoading: true, error: null });
      
      const priceWei = parseEther(price);
      const tx = await contract.createCourse(title, description, priceWei);
      
      toast.loading('创建课程中...', { id: 'create-course' });
      
      const receipt = await tx.wait();
      
      // Extract course ID from event logs
      const courseCreatedEvent = receipt.logs.find((log: any) => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed?.name === 'CourseCreated';
        } catch {
          return false;
        }
      });

      let courseId = null;
      if (courseCreatedEvent) {
        const parsed = contract.interface.parseLog(courseCreatedEvent);
        courseId = parsed?.args?.courseId?.toString();
      }

      set({ isLoading: false });
      toast.success('课程创建成功！', { id: 'create-course' });
      
      return {
        transactionHash: receipt.hash,
        courseId,
        gasUsed: receipt.gasUsed?.toString()
      };
    } catch (error: any) {
      const errorMsg = error.reason || error.message || '创建课程失败';
      console.error('创建课程失败:', error);
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg, { id: 'create-course' });
      throw error;
    }
  },

  getMyCourses: async (): Promise<Course[]> => {
    const { contract } = get();
    
    if (!contract) {
      await get().initializeContract();
    }

    try {
      set({ isLoading: true, error: null });
      
      // 获取当前用户地址
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        throw new Error('请先连接钱包');
      }
      
      const userAddress = accounts[0];
      // 这里需要根据实际合约接口调整
      // 假设合约有一个方法可以获取作者创建的课程
      const authorCourseIds = await contract.getMyCreatedCourses(userAddress);
      
      // 获取每个课程的详细信息
      const courses: Course[] = [];
      for (const courseId of authorCourseIds) {
        
        try {
          const courseData = await contract.getCourse(courseId);
          courses.push({
            id: Number(courseId),
            courseId: Number(courseId),
            title: courseData[0],
            description: courseData[1],
            author: courseData[2],
            price: ethers.formatEther(courseData[3]),
            createdAt: Number(courseData[4]),
            studentsCount: 0, // 需要从合约获取
          });
        } catch (error) {
          console.error(`获取课程 ${courseId} 信息失败:`, error);
        }
      }
      
      set({ isLoading: false });
      return courses;
    } catch (error: any) {
      const errorMsg = error.message || '获取我的课程失败';
      console.error('获取我的课程失败:', error);
      set({ error: errorMsg, isLoading: false });
      return [];
    }
  },

  updateCourse: async (courseId: number, title: string, description: string, price: string) => {
    const { contract } = get();
    
    if (!contract) {
      await get().initializeContract();
    }

    try {
      set({ isLoading: true, error: null });
      
      const priceWei = parseEther(price);
      const tx = await contract.updateCourse(courseId, title, description, priceWei);
      
      toast.loading('更新课程中...', { id: 'update-course' });
      
      const receipt = await tx.wait();
      
      set({ isLoading: false });
      toast.success('课程更新成功！', { id: 'update-course' });
      
      return {
        transactionHash: receipt.hash,
        gasUsed: receipt.gasUsed?.toString()
      };
    } catch (error: any) {
      const errorMsg = error.reason || error.message || '更新课程失败';
      console.error('更新课程失败:', error);
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg, { id: 'update-course' });
      throw error;
    }
  },

  deleteCourse: async (courseId: number) => {
    const { contract } = get();
    
    if (!contract) {
      await get().initializeContract();
    }

    try {
      set({ isLoading: true, error: null });
      
      const tx = await contract.deleteCourse(courseId);
      
      toast.loading('删除课程中...', { id: 'delete-course' });
      
      const receipt = await tx.wait();
      
      set({ isLoading: false });
      toast.success('课程删除成功！', { id: 'delete-course' });
      
      return {
        transactionHash: receipt.hash,
        gasUsed: receipt.gasUsed?.toString()
      };
    } catch (error: any) {
      const errorMsg = error.reason || error.message || '删除课程失败';
      console.error('删除课程失败:', error);
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg, { id: 'delete-course' });
      throw error;
    }
  },

  getCourseStats: async (courseId: number) => {
    const { contract } = get();
    
    if (!contract) {
      await get().initializeContract();
    }

    try {
      set({ isLoading: true, error: null });
      
      // 这里需要根据实际合约接口调整
      const stats = await contract.getCourseStats(courseId);
      
      set({ isLoading: false });
      
      return {
        totalSales: Number(stats[0]),
        studentsCount: Number(stats[1]),
        revenue: ethers.formatEther(stats[2]),
      };
    } catch (error: any) {
      const errorMsg = error.message || '获取课程统计失败';
      console.error('获取课程统计失败:', error);
      set({ error: errorMsg, isLoading: false });
      return {
        totalSales: 0,
        studentsCount: 0,
        revenue: '0',
      };
    }
  },
}));

export default useContractStore;
