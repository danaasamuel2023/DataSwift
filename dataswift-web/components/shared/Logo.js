import { Zap } from 'lucide-react';

export default function Logo({ size = 'md' }) {
  const textSize = { sm: 'text-base', md: 'text-lg', lg: 'text-xl' }[size];
  const iconSize = { sm: 'w-6 h-6', md: 'w-7 h-7', lg: 'w-8 h-8' }[size];
  const innerIcon = { sm: 'w-3 h-3', md: 'w-3.5 h-3.5', lg: 'w-4 h-4' }[size];

  return (
    <span className={`${textSize} font-extrabold tracking-tight inline-flex items-center gap-2`}>
      <span className={`${iconSize} bg-primary rounded-lg flex items-center justify-center`}>
        <Zap className={`${innerIcon} text-white fill-white`} />
      </span>
      <span className="text-white">Swift<span className="text-primary">Bundle</span></span>
    </span>
  );
}
