# Web3 课程平台作者端 - 自定义钱包头部组件

## 🚀 最新更新

### 移除 wtf-lll-wallet 包并实现自定义钱包组件

本次更新完全移除了对 `wtf-lll-wallet` 包的依赖，并实现了一个功能更强大的自定义钱包头部组件，专为作者平台设计。

## ✨ 新功能

### 🔗 网络切换支持
- ✅ **Ethereum 主网** (0x1) - 生产环境
- ✅ **Sepolia 测试网** (0xaa36a7) - 测试环境
- 🔄 一键切换网络
- 🟢 网络状态实时显示

### 👤 ENS 集成
- 🏷️ 自动解析 ENS 域名
- 🖼️ 显示 ENS 头像
- 🔍 主网 ENS 查询支持

### 💳 钱包功能
- 🔌 MetaMask 连接/断开
- 💰 实时余额显示
- 📋 一键复制地址
- 🔗 区块浏览器链接
- 🔄 钱包信息刷新

### 📚 作者专属功能
- ✍️ 课程创建和管理
- 📊 课程统计查看
- 💰 收益跟踪
- 👥 学生管理

## 📁 项目结构更新

```
src/
├── components/
│   ├── Header.tsx              # 🆕 作者专属钱包头部组件
│   ├── WalletProvider.tsx      # 🔄 更新的钱包提供者
│   ├── CreateCourse.tsx        # 🔄 更新为使用新钱包存储
│   ├── MyCourses.tsx           # 🔄 更新为使用新钱包存储
│   └── PurchasedCourses.tsx    # 🔄 更新为使用新钱包存储
├── stores/
│   ├── walletStore.ts          # 🆕 自定义钱包状态管理
│   └── contractStore.ts        # 🔄 更新为兼容新钱包接口及作者功能
├── types/
│   └── index.ts               # 🆕 新增钱包、网络和作者功能类型定义
├── utils/
│   └── networks.ts            # 🆕 网络配置和工具函数
└── services/
    └── api.ts                 # 📦 保持现有API服务
```

## 🔧 技术实现

### 钱包状态管理
使用 Zustand 实现轻量级状态管理：

```typescript
interface WalletStore {
  // 状态
  address: string | null;
  balance: string;
  isConnected: boolean;
  networkId: string | null;
  ensName: string | null;
  ensAvatar: string | null;
  
  // 操作
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: string) => Promise<void>;
  updateWalletInfo: () => Promise<void>;
  getENSInfo: (address: string) => Promise<ENSInfo>;
}
```

### 作者合约接口
扩展的合约功能支持：

```typescript
interface ContractStore {
  // 作者功能
  createCourse: (title: string, description: string, price: string) => Promise<void>;
  getMyCourses: () => Promise<Course[]>;
  updateCourse: (courseId: number, title: string, description: string, price: string) => Promise<void>;
  deleteCourse: (courseId: number) => Promise<void>;
  getCourseStats: (courseId: number) => Promise<CourseStats>;
}
```

## 🎨 UI/UX 特色

### 作者专属设计
- 🎨 橙红色渐变主题（区别于用户端的紫蓝色）
- ✏️ 创作者图标和品牌标识
- 📊 专业的课程管理界面
- 📈 统计数据可视化

### 现代化设计
- 🌈 渐变背景和毛玻璃效果
- ✨ 流畅的动画过渡
- 📱 响应式设计
- 🌙 深色主题

### 头部组件功能
- 🎨 作者平台专属 Logo 和标题
- 🔗 网络选择器（主网/测试网）
- 👛 钱包连接按钮
- 👤 作者信息面板
- 📋 快捷操作菜单

## 🚀 使用方法

### 安装依赖
```bash
# 移除旧包
pnpm remove wtf-lll-wallet

# 安装现有依赖
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

### 连接钱包
1. 点击右上角"连接钱包"按钮
2. 在 MetaMask 中确认连接
3. 自动检测网络并显示余额
4. 可通过网络选择器切换网络

### 创建课程
1. 确保钱包已连接
2. 填写课程标题、描述和价格
3. 点击"创建课程"按钮
4. 在 MetaMask 中确认交易

### 管理课程
1. 在"我的课程"标签查看已创建的课程
2. 查看课程统计数据
3. 编辑或删除课程（根据合约支持）

## 🔐 安全特性

- ✅ 只读钱包信息访问
- ✅ 用户主动授权连接
- ✅ 网络切换需用户确认
- ✅ 交易签名确认
- ✅ 地址格式化显示
- ✅ 错误处理和用户提示

## 🌐 ENS 支持

- 🔍 自动解析 ENS 域名
- 🖼️ 获取和显示 ENS 头像
- 🌐 仅在主网查询（优化性能）
- 🔄 缓存机制（减少查询次数）

## 🔧 自定义配置

### 添加新网络
在 `src/utils/networks.ts` 中添加新网络配置：

```typescript
export const NETWORK_CONFIGS = {
  // 现有网络...
  '0x89': {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    // ... 其他配置
  }
};
```

### 修改作者主题
在 Header 组件中可自定义颜色主题：

```typescript
// 橙红色主题（作者）
className="bg-gradient-to-br from-orange-400 to-red-600"

// 对比用户端的紫蓝色主题
className="bg-gradient-to-br from-purple-400 to-blue-600"
```

## 📝 更新日志

### v2.0.0 (当前)
- ❌ 移除 wtf-lll-wallet 依赖
- ✅ 实现自定义钱包头部组件
- ✅ 添加网络切换功能（主网/测试网）
- ✅ 集成 ENS 域名和头像
- ✅ 优化作者端专属UI设计
- ✅ 扩展合约接口支持作者功能
- ✅ 改进错误处理和提示信息

### v1.x.x (之前)
- 使用 wtf-lll-wallet 包
- 基础钱包连接功能
- 基础课程创建功能

## 🐛 已知问题

- ENS 头像加载可能较慢（依赖网络）
- 某些 ENS 域名可能无头像
- 网络切换需要用户在 MetaMask 中确认
- 合约方法需要根据实际部署情况调整

## 🔮 未来计划

- [ ] 支持更多网络（Polygon、BSC 等）
- [ ] 添加课程销售统计图表
- [ ] 实现课程版本管理
- [ ] 集成 IPFS 存储课程内容
- [ ] 添加学生评价和反馈系统
- [ ] 实现多钱包支持
- [ ] 集成 WalletConnect

## 🎭 作者端 vs 用户端对比

| 功能 | 作者端 | 用户端 |
|------|--------|--------|
| 主题色彩 | 橙红渐变 🔥 | 紫蓝渐变 💜 |
| 主要功能 | 创建/管理课程 ✍️ | 购买/学习课程 📚 |
| 图标标识 | 创作笔 🖋️ | 学习书本 📖 |
| 平台名称 | Web3 作者平台 | Web3 课程平台 |
| 核心用户 | 内容创作者 👨‍🏫 | 学习者 👨‍🎓 |

## 🔄 迁移指南

### 从 wtf-lll-wallet 迁移
1. 更新 import 语句：
```typescript
// 旧的
import { useWalletStore } from 'wtf-lll-wallet';

// 新的
import useWalletStore from '../stores/walletStore';
```

2. 更新字段名：
```typescript
// 旧的
const { account, isConnected } = useWalletStore();

// 新的
const { address, isConnected } = useWalletStore();
```

3. 新增功能调用：
```typescript
// 网络切换
const { switchNetwork } = useWalletStore();
await switchNetwork('0x1'); // 切换到主网

// ENS 信息
const { ensName, ensAvatar } = useWalletStore();
```

---

🎉 **恭喜！** 你的作者平台现在拥有了一个功能完整、界面美观的自定义钱包组件，完全摆脱了外部依赖，为创作者提供最佳的使用体验！
