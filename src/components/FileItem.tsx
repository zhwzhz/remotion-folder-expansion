import React from 'react';

interface FileItemProps {
  name: string;
  extension: string;
  showLabel?: boolean;
  labelOpacity?: number;
}

export const FileItem: React.FC<FileItemProps> = ({
  name,
  extension,
  showLabel = true,
  labelOpacity = 1,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 154,
        height: 215,
      }}
    >
      {/* Paper Card SVG */}
      <svg
        width="154"
        height="215"
        viewBox="0 0 154 215"
        fill="none"
        style={{
          filter: 'drop-shadow(0 10px 24px rgba(0, 0, 0, 0.38))',
        }}
      >
        <defs>
          <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f3f6f3" />
          </linearGradient>
          <filter id="foldShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="-2" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Paper Body with top-right corner cut */}
        <path
          d="M 18 0
             L 110 0
             L 154 44
             L 154 197
             C 154 207, 146 215, 136 215
             L 18 215
             C 8 215, 0 207, 0 197
             L 0 18
             C 0 8, 8 0, 18 0 Z"
          fill="url(#paperGrad)"
        />

        {/* Dog-ear Fold Flap */}
        <path
          d="M 110 0
             C 110 0, 110 44, 110 44
             L 154 44 Z"
          fill="#dce5dc"
          filter="url(#foldShadow)"
        />

        {/* 3 Sage Green-Gray Content Lines */}
        <rect x="24" y="56" width="64" height="5" rx="2.5" fill="#c6d4c8" />
        <rect x="24" y="74" width="94" height="5" rx="2.5" fill="#c6d4c8" />
        <rect x="24" y="92" width="60" height="5" rx="2.5" fill="#c6d4c8" />
      </svg>

      {/* Extension text */}
      <div
        style={{
          position: 'absolute',
          top: 122,
          left: 0,
          width: 154,
          textAlign: 'center',
          fontFamily: 'Georgia, "Times New Roman", "Songti SC", serif',
          fontStyle: 'italic',
          fontWeight: 'bold',
          fontSize: extension === 'json' ? 34 : 40,
          color: '#55a338',
          userSelect: 'none',
        }}
      >
        {extension}
      </div>

      {/* Label below file */}
      {showLabel && (
        <div
          style={{
            position: 'absolute',
            top: 226,
            left: -40,
            width: 234,
            textAlign: 'center',
            fontFamily: '"KaiTi", "STKaiti", "SimKai", "Noto Serif SC", serif, system-ui',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 25,
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.6)',
            whiteSpace: 'nowrap',
            opacity: labelOpacity,
            userSelect: 'none',
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
};
