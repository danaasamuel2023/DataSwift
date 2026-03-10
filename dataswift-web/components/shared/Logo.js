export default function Logo({ size = 'md' }) {
  const textSize = { sm: 'text-base', md: 'text-lg', lg: 'text-xl' }[size];

  return (
    <span className={`${textSize} font-extrabold tracking-tight text-white`}>
      Swift<span className="text-primary">Bundle</span>
    </span>
  );
}
