'use client';
import { Zap } from 'lucide-react';

export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: { icon: 'w-5 h-5', text: 'text-lg' },
    md: { icon: 'w-6 h-6', text: 'text-xl' },
    lg: { icon: 'w-8 h-8', text: 'text-2xl' }
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center rotate-3 shadow-lg shadow-primary/30">
          <Zap className={`${s.icon} text-white fill-white -rotate-3`} />
        </div>
      </div>
      <span className={`${s.text} font-extrabold tracking-tight`}>
        <span className="text-secondary">Data</span>
        <span className="text-primary">Swift</span>
      </span>
    </div>
  );
}
