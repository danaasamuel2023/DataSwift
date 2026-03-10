'use client';

const icons = {
  YELLO: ({ size = 40 }) => (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none">
      <rect width="100" height="60" rx="12" fill="#FFCC00" />
      <circle cx="30" cy="26" r="10" fill="#003A7D" />
      <circle cx="30" cy="26" r="6" fill="#FFCC00" />
      <path d="M24 26 C24 20, 36 20, 36 26" stroke="#003A7D" strokeWidth="2.5" fill="none" />
      <text x="50" y="40" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="22" fontWeight="900" fill="#003A7D" letterSpacing="-0.5">MTN</text>
    </svg>
  ),
  TELECEL: ({ size = 40 }) => (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none">
      <rect width="100" height="60" rx="12" fill="#E60000" />
      <g transform="translate(14, 12)">
        <circle cx="12" cy="18" r="8" fill="none" stroke="#FFF" strokeWidth="3" />
        <path d="M12 10 L12 4" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
        <path d="M5 12 L2 9" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M19 12 L22 9" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text x="60" y="38" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700" fill="#FFF" letterSpacing="0.5">Telecel</text>
    </svg>
  ),
  AT_PREMIUM: ({ size = 40 }) => (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none">
      <rect width="100" height="60" rx="12" fill="#0066CC" />
      <g transform="translate(10, 10)">
        <path d="M10 32 L18 8 L26 32" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M13 24 L23 24" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M30 8 L30 32" stroke="#FF6600" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 8 L36 8" stroke="#FF6600" strokeWidth="3" strokeLinecap="round" />
      </g>
      <text x="68" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="#FFF" letterSpacing="0.3">AirtelTigo</text>
      <rect x="50" y="34" width="36" height="2" rx="1" fill="#FF6600" />
    </svg>
  )
};

export default function NetworkIcon({ network, size = 40 }) {
  const Icon = icons[network] || icons.YELLO;
  return <Icon size={size} />;
}
