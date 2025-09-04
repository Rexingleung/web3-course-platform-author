import { useState, useEffect } from 'react';
import { ChevronDown, Wallet, LogOut, RefreshCw, Copy, ExternalLink, PenTool } from 'lucide-react';
import useWalletStore from '../stores/walletStore';
import { SupportedNetworks } from '../types';
import { getNetworkName, getNetworkSymbol } from '../utils/networks';
import toast from 'react-hot-toast';

export function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);
  
  const {
    address,
    balance,
    isConnected,
    isConnecting,
    networkId,
    ensName,
    ensAvatar,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    updateWalletInfo,
  } = useWalletStore();

  // 格式化地址显示
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // 格式化余额显示
  const formatBalance = (bal: string) => {
    const num = parseFloat(bal);
    if (num === 0) return '0';
    return num.toFixed(4);
  };

  // 复制地址到剪贴板
  const copyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        toast.success('地址已复制');
      } catch (error) {
        toast.error('复制失败');
      }
    }
  };

  // 打开区块浏览器
  const openBlockExplorer = () => {
    if (address && networkId) {
      const baseUrl = networkId === SupportedNetworks.ETHEREUM_MAINNET 
        ? 'https://etherscan.io'
        : 'https://sepolia.etherscan.io';
      window.open(`${baseUrl}/address/${address}`, '_blank');
    }
  };

  // 刷新钱包信息
  const refreshWallet = async () => {
    await updateWalletInfo();
    toast.success('钱包信息已更新');
  };

  // 关闭下拉菜单当点击外部时
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
      setShowNetworkMenu(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="bg-black bg-opacity-20 border-b border-white border-opacity-10 backdrop-blur-md">
      <div className="container flex justify-between items-center px-4 py-4 mx-auto">
        {/* Logo - Author版本 */}
        <div className="flex gap-3 items-center">
          <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl">
            <PenTool className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Web3 作者平台</h1>
            <p className="text-sm text-gray-300">创作并发布您的区块链课程</p>
          </div>
        </div>

        {/* Wallet Section */}
        <div className="flex gap-4 items-center">
          {/* Network Selector */}
          {isConnected && (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowNetworkMenu(!showNetworkMenu)}
                className="flex gap-2 items-center px-3 py-2 text-white bg-black bg-opacity-10 rounded-lg transition-all duration-200 hover:bg-opacity-20"
              >
                <div className={`w-2 h-2 rounded-full ${
                  networkId === SupportedNetworks.ETHEREUM_MAINNET ? 'bg-green-400' : 'bg-orange-400'
                }`} />
                <span className="text-sm">
                  {networkId ? getNetworkName(networkId) : 'Unknown Network'}
                </span>
                <ChevronDown size={16} className={`transform transition-transform ${
                  showNetworkMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Network Dropdown */}
              {showNetworkMenu && (
                <div className="overflow-hidden absolute right-0 z-50 mt-2 w-64 bg-white bg-opacity-95 rounded-xl border border-white border-opacity-20 shadow-xl backdrop-blur-md">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        switchNetwork(SupportedNetworks.ETHEREUM_MAINNET);
                        setShowNetworkMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3 ${
                        networkId === SupportedNetworks.ETHEREUM_MAINNET ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                      <div>
                        <div className="font-medium">Ethereum 主网</div>
                        <div className="text-xs text-gray-500">生产环境</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        switchNetwork(SupportedNetworks.ETHEREUM_SEPOLIA);
                        setShowNetworkMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3 ${
                        networkId === SupportedNetworks.ETHEREUM_SEPOLIA ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <div className="w-3 h-3 bg-orange-400 rounded-full" />
                      <div>
                        <div className="font-medium">Sepolia 测试网</div>
                        <div className="text-xs text-gray-500">测试环境</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Wallet Button/Info */}
          {!isConnected ? (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="flex gap-2 items-center px-6 py-3 font-medium text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-xl shadow-lg transition-all duration-200 hover:from-orange-700 hover:to-red-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Wallet size={18} />
              )}
              {isConnecting ? '连接中...' : '连接钱包'}
            </button>
          ) : (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex gap-3 items-center px-4 py-3 text-black bg-white bg-opacity-10 rounded-xl transition-all duration-200 hover:bg-opacity-20"
              >
                <div className="flex gap-3 items-center">
                  {/* ENS头像或默认头像 */}
                  <div className="flex overflow-hidden justify-center items-center w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-full">
                    {ensAvatar ? (
                      <img src={ensAvatar} alt="ENS Avatar" className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-xs font-bold">
                        {address ? address.slice(2, 4).toUpperCase() : 'A'}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-left">
                    <div className="text-sm font-medium">
                      {ensName || (address ? formatAddress(address) : '')}
                    </div>
                    <div className="text-xs text-gray-300">
                      {formatBalance(balance)} {networkId ? getNetworkSymbol(networkId) : 'ETH'}
                    </div>
                  </div>
                </div>
                <ChevronDown size={16} className={`transform transition-transform ${
                  showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Wallet Dropdown */}
              {showDropdown && (
                <div className="overflow-hidden absolute right-0 z-50 mt-2 w-80 bg-white bg-opacity-95 rounded-xl border border-white border-opacity-20 shadow-xl backdrop-blur-md">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex gap-3 items-center mb-3">
                      <div className="flex overflow-hidden justify-center items-center w-10 h-10 bg-gradient-to-br from-orange-400 to-red-600 rounded-full">
                        {ensAvatar ? (
                          <img src={ensAvatar} alt="ENS Avatar" className="object-cover w-full h-full" />
                        ) : (
                          <span className="text-sm font-bold text-white">
                            {address ? address.slice(2, 4).toUpperCase() : 'A'}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {ensName || '作者钱包'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {address ? formatAddress(address) : ''}
                        </div>
                      </div>
                    </div>
                    
                    {/* 余额信息 */}
                    <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                      <div className="mb-1 text-sm text-gray-600">钱包余额</div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatBalance(balance)} {networkId ? getNetworkSymbol(networkId) : 'ETH'}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        网络: {networkId ? getNetworkName(networkId) : '未知网络'}
                      </div>
                    </div>

                    {/* ENS信息 */}
                    {ensName && (
                      <div className="p-3 mt-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="mb-1 text-sm text-blue-600">ENS 域名</div>
                        <div className="font-medium text-blue-900">{ensName}</div>
                      </div>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="p-2">
                    <button
                      onClick={copyAddress}
                      className="flex gap-3 items-center px-4 py-3 w-full text-left text-gray-700 rounded-lg transition-colors hover:bg-gray-100"
                    >
                      <Copy size={18} />
                      <span>复制地址</span>
                    </button>
                    
                    <button
                      onClick={openBlockExplorer}
                      className="flex gap-3 items-center px-4 py-3 w-full text-left text-gray-700 rounded-lg transition-colors hover:bg-gray-100"
                    >
                      <ExternalLink size={18} />
                      <span>在区块浏览器中查看</span>
                    </button>
                    
                    <button
                      onClick={refreshWallet}
                      className="flex gap-3 items-center px-4 py-3 w-full text-left text-gray-700 rounded-lg transition-colors hover:bg-gray-100"
                    >
                      <RefreshCw size={18} />
                      <span>刷新钱包信息</span>
                    </button>
                    
                    <div className="pt-2 mt-2 border-t border-gray-200">
                      <button
                        onClick={() => {
                          disconnectWallet();
                          setShowDropdown(false);
                        }}
                        className="flex gap-3 items-center px-4 py-3 w-full text-left text-red-600 rounded-lg transition-colors hover:bg-red-50"
                      >
                        <LogOut size={18} />
                        <span>断开连接</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
