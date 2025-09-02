import { Wallet, User, LogOut } from 'lucide-react';
import useWalletStore from '../stores/walletStore';
import { formatAddress, formatEther } from '../utils/format';

export function Header() {
  const { 
    account, 
    isConnected, 
    isConnecting, 
    balance, 
    connectWallet, 
    disconnectWallet 
  } = useWalletStore();

  return (
    <header className="glass-effect border-b border-white border-opacity-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center animate-float">
              <span className="text-white font-bold text-lg">W3</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Web3 课程平台</h1>
              <p className="text-white text-opacity-70 text-sm">作者端</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="glass-effect rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2 text-white">
                    <Wallet size={16} />
                    <span className="text-sm">{formatEther(balance)} ETH</span>
                  </div>
                </div>
                
                <div className="glass-effect rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2 text-white">
                    <User size={16} />
                    <span className="text-sm">{formatAddress(account!)}</span>
                  </div>
                </div>

                <button
                  onClick={disconnectWallet}
                  className="glass-effect rounded-lg px-4 py-2 text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200 flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span className="text-sm">断开连接</span>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Wallet size={16} />
                <span>{isConnecting ? '连接中...' : '连接钱包'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
