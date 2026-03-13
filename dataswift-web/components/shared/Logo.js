'use client';

export default function Logo({ size = 'md' }) {
  const iconDim = { sm: 'w-8 h-8', md: 'w-9 h-9', lg: 'w-11 h-11' }[size];
  const textSize = { sm: 'text-base', md: 'text-lg', lg: 'text-xl' }[size];

  return (
    <span className={`inline-flex items-center gap-2 group`}>
      {/* Globe + Chart Icon */}
      <div className={`relative ${iconDim}`}>
        <div className="absolute inset-0 rounded-full border-2 border-navy dark:border-blue-400 group-hover:border-amber-500 transition-colors duration-300" />
        <div className="absolute bottom-[6px] left-[10px] flex items-end gap-[2px]">
          <div className="w-[3px] h-[8px] bg-navy dark:bg-blue-400 rounded-sm" />
          <div className="w-[3px] h-[12px] bg-navy dark:bg-blue-400 rounded-sm" />
          <div className="w-[3px] h-[16px] bg-navy dark:bg-blue-400 rounded-sm" />
        </div>
        <svg className="absolute -bottom-[1px] -right-[2px] w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 12 10 18 20 6" />
        </svg>
      </div>
      {/* Text */}
      <div className={`flex items-baseline ${textSize} font-extrabold tracking-tight`}>
        <span className="text-navy dark:text-white">Swift</span>
        <span className="text-amber-500">Bundle</span>
        <span className="text-[10px] font-bold text-navy/60 dark:text-gray-400 ml-0.5">GH</span>
      </div>
    </span>
  );
}
