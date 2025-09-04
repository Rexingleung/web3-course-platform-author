// 网络配置类型
export interface NetworkConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
}

// 钱包状态接口
export interface WalletState {
  address: string | null;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
  networkId: string | null;
  ensName: string | null;
  ensAvatar: string | null;
}

// 钱包操作接口
export interface WalletActions {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: string) => Promise<void>;
  updateWalletInfo: () => Promise<void>;
  getENSInfo: (address: string) => Promise<{ name: string | null; avatar: string | null }>;
}

// 完整的钱包 Store 接口
export interface WalletStore extends WalletState, WalletActions {}

// 支持的网络枚举
export enum SupportedNetworks {
  ETHEREUM_MAINNET = '0x1',
  ETHEREUM_SEPOLIA = '0xaa36a7'
}

// 课程相关类型
export interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  studentsCount: number;
  isPurchased?: boolean;
  completionPercentage?: number;
  courseId: number;
  author: string;
  createdAt: number;
}

export interface PurchasedCourse extends Course {
  purchaseDate: Date;
  progress: number;
  lastAccessed: Date;
  certificateEarned: boolean;
}

// 合约相关类型 - Author版本扩展
export interface ContractState {
  contract: any;
  isLoading: boolean;
  error: string | null;
}

export interface ContractActions {
  initializeContract: () => Promise<void>;
  createCourse: (title: string, description: string, price: string) => Promise<{ transactionHash: any; courseId: any; gasUsed: any; }>;
  getMyCourses: () => Promise<Course[]>;
  updateCourse: (courseId: number, title: string, description: string, price: string) => Promise<{ transactionHash: any; gasUsed: any; }>;
  deleteCourse: (courseId: number) => Promise<{ transactionHash: any; gasUsed: any; }>;
  getCourseStats: (courseId: number) => Promise<{
    totalSales: number;
    studentsCount: number;
    revenue: string;
  }>;
}

export interface ContractStore extends ContractState, ContractActions {}
