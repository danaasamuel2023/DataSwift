'use client';

const icons = {
  YELLO: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="16" fill="#FFCC00" />
      <text x="40" y="48" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="18" fontWeight="900" fill="#000">MTN</text>
    </svg>
  ),
  TELECEL: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="16" fill="#E60000" />
      <text x="40" y="52" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="700" fill="#FFF">t</text>
    </svg>
  ),
  AT_PREMIUM: ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="16" fill="#0066CC" />
      <text x="40" y="48" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="#FFF">AT</text>
    </svg>
  )
};

export default function NetworkIcon({ network, size = 40 }) {
  const Icon = icons[network] || icons.YELLO;
  return <Icon size={size} />;
}
