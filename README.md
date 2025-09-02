# Web3 Course Platform - Author Frontend

基于区块链的课程平台作者端，使用 React + TypeScript + Vite + Tailwind CSS 构建。

## 功能特性

- ➕ **创建课程** - 发布新课程到区块链
- 📚 **我的课程** - 管理已发布的课程
- 🛍️ **已购课程** - 查看购买的课程
- 💰 **Web3 钱包集成** - MetaMask 钱包连接
- 🔗 **智能合约交互** - 直接与合约交互创建课程
- 🎨 **现代UI设计** - 玻璃质感的响应式界面

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (状态管理)
- Ethers.js (Web3)
- Lucide React (图标)
- React Hot Toast (通知)

## 快速开始

### 环境要求

- Node.js 16+
- MetaMask 浏览器扩展
- 连接到以太坊网络
- 后端API服务运行在 http://localhost:3001

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 3. 构建生产版本

```bash
npm run build
npm run preview
```

## 项目结构

```
src/
├── components/          # React 组件
│   ├── Header.tsx       # 头部组件（钱包连接）
│   ├── CreateCourse.tsx # 创建课程组件
│   ├── MyCourses.tsx    # 我的课程组件
│   ├── PurchasedCourses.tsx # 已购课程组件
│   └── WalletProvider.tsx   # 钱包提供者
├── stores/             # Zustand 状态管理
│   ├── walletStore.ts  # 钱包状态
│   └── contractStore.ts # 合约交互
├── services/           # API 服务
│   └── api.ts         # 后端 API 调用
├── utils/             # 工具函数
│   ├── constants.ts   # 常量配置
│   └── format.ts      # 格式化工具
├── types/             # TypeScript 类型
│   └── index.ts
├── App.tsx            # 主应用组件
├── main.tsx           # 应用入口
└── index.css          # 全局样式
```

## 主要组件

### CreateCourse
- 课程标题、描述和价格输入
- 与智能合约交互创建课程
- 表单验证和错误处理
- 实时交易状态反馈

### MyCourses  
- 显示作者创建的所有课程
- 课程详细信息展示
- 发布状态管理
- 课程统计信息

### PurchasedCourses
- 显示作者购买的课程
- 学习进度跟踪
- 课程访问入口

### Header
- 钱包连接/断开功能
- 显示账户信息和余额
- 响应钱包状态变化
- 优雅的用户界面

## 智能合约集成

应用通过 ethers.js 与部署的智能合约交互：

- 合约地址：`0xdDD30BD07C402eE78079c35A7DE2F9232ed54Aa4`
- 支持功能：
  - 创建课程 (`createCourse`)
  - 查询课程信息 (`getCourse`)
  - 查询用户购买记录 (`getUserPurchasedCourses`)
  - 检查购买状态 (`hasUserPurchasedCourse`)

## 状态管理

### WalletStore
- 管理钱包连接状态
- 处理账户切换
- 更新余额信息
- 监听钱包事件

### ContractStore  
- 智能合约初始化
- 合约方法调用
- 交易状态管理
- 错误处理

## API 集成

与后端服务通信获取：
- 课程列表
- 作者课程管理
- 用户购买记录
- 交易记录存储

## 样式设计

采用现代玻璃拟态设计：
- 半透明玻璃效果
- 渐变背景
- 流动动画
- 响应式布局
- 深色主题

### 主要样式特色

- **玻璃效果**: `backdrop-filter: blur(10px)`
- **渐变背景**: 蓝色到紫色的美丽渐变
- **动态动画**: 浮动和悬停效果
- **响应式网格**: 自适应不同屏幕尺寸

## 用户体验

### 钱包集成
- 自动检测 MetaMask
- 监听账户和网络变化
- 友好的连接提示
- 错误状态处理

### 交易处理
- 实时交易状态更新
- 加载指示器
- 成功/失败反馈
- Gas 费用估算

### 响应式设计
- 移动端友好
- 触摸优化
- 快速加载
- 平滑过渡

## 开发指南

### 环境配置

1. 确保 MetaMask 已安装
2. 连接到正确的以太坊网络
3. 后端服务正常运行
4. 智能合约正确部署

### 调试技巧

- 使用浏览器开发工具
- 检查 MetaMask 连接状态
- 监控网络请求
- 查看控制台日志

### 性能优化

- 组件懒加载
- 状态缓存
- 防抖处理
- 图片优化

## 部署指南

### 构建优化

```bash
npm run build
```

### 静态部署

支持部署到：
- Vercel
- Netlify
- GitHub Pages
- AWS S3

### 环境变量

```env
VITE_CONTRACT_ADDRESS=0xdDD30BD07C402eE78079c35A7DE2F9232ed54Aa4
VITE_API_BASE_URL=http://localhost:3001/api
```

## 故障排除

### 常见问题

1. **MetaMask 未检测到**
   - 确保已安装 MetaMask 扩展
   - 刷新页面重试
   - 检查扩展是否启用

2. **交易失败**
   - 检查账户余额
   - 确认网络连接
   - 增加 Gas 限制

3. **API 请求失败**
   - 验证后端服务状态
   - 检查网络连接
   - 确认API端点正确

### 调试工具

- React Developer Tools
- MetaMask Developer Tools
- 浏览器网络面板
- 控制台日志

## 脚本命令

- `npm run dev` - 开发模式
- `npm run build` - 构建生产版本
- `npm run preview` - 预览构建结果
- `npm run lint` - 代码检查

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License