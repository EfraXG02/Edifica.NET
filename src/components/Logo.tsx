import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center gap-3 select-none group">
      {/* Handcrafted Vector Insignia: Geometric Foundation Stone + Glowing Code Terminal Diamond */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer Foundation Keystone Shield */}
          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="10"
            className="fill-slate-900 stroke-indigo-500/80"
            strokeWidth="2"
          />

          {/* Isometric Builder Blocks (Construction & Architecture) */}
          <path
            d="M24 10L36 17L24 24L12 17L24 10Z"
            fill="url(#foundation-grad-top)"
            opacity="0.95"
          />
          <path
            d="M12 17L24 24V38L12 31V17Z"
            fill="url(#foundation-grad-left)"
          />
          <path
            d="M24 24L36 17V31L24 38V24Z"
            fill="url(#foundation-grad-right)"
          />

          {/* Central .NET Core / Code Ember Glyph: </> */}
          <path
            d="M20 22L16.5 25.5L20 29"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 22L31.5 25.5L28 29"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="25.5" r="1.5" fill="#38BDF8" />

          {/* Gradients */}
          <defs>
            <linearGradient id="foundation-grad-top" x1="12" y1="10" x2="36" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="foundation-grad-left" x1="12" y1="17" x2="24" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#312E81" />
            </linearGradient>
            <linearGradient id="foundation-grad-right" x1="24" y1="17" x2="36" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0EA5E9" />
              <stop offset="1" stopColor="#0369A1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark & Hierarchy */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight text-white ${textSizes[size]} leading-none`}>
          Edifica<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">.NET</span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono mt-0.5">
            Da Fundação ao Arquiteto Cloud
          </span>
        )}
      </div>
    </div>
  );
};
