export default function Card({ children, className = '', padding = true, hover = false, ...props }) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-secondary/[0.06]
        ${padding ? 'p-5 sm:p-6' : ''}
        ${hover ? 'hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
