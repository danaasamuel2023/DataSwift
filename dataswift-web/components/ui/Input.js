'use client';

export default function Input({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-secondary/70">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-secondary/30 pointer-events-none" />
        )}
        <input
          className={`
            w-full
            ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3
            bg-white
            border-2 border-secondary/10
            rounded-xl
            text-secondary text-sm
            placeholder:text-secondary/30
            transition-all duration-200
            hover:border-secondary/20
            focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10
            disabled:bg-background-alt disabled:cursor-not-allowed
            ${error ? 'border-error focus:border-error focus:ring-error/10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-error font-medium">{error}</p>
      )}
    </div>
  );
}
