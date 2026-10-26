import React from 'react';
import { HelpCircle, ArrowLeft, Coins, Home } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl neu-raised mx-auto flex items-center justify-center text-[#6C3BDB]">
        <HelpCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-[#6C3BDB] uppercase tracking-wider">404 Error</span>
        <h1 className="text-3xl font-extrabold text-[#202033] tracking-tight">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-[#6D7080] max-w-md mx-auto leading-relaxed">
          The crypto resource or article URL you requested does not exist or may have been moved.
        </p>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={() => onNavigate('/')}
          className="neu-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Return Home
        </button>
        <button
          onClick={() => onNavigate('/crypto-market')}
          className="neu-btn px-5 py-2.5 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-2"
        >
          <Coins className="w-4 h-4 text-[#6C3BDB]" />
          Browse Crypto Market
        </button>
      </div>
    </div>
  );
};
