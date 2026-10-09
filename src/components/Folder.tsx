import React from 'react';

export const FolderBack: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 248,
        height: 204,
      }}
    >
      <svg width="248" height="204" viewBox="0 0 248 204" fill="none">
        <defs>
          <linearGradient id="backGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#28aff8" />
            <stop offset="100%" stopColor="#1b8bd4" />
          </linearGradient>
        </defs>
        {/* Back tab & outline */}
        <path
          d="M 18 0
             L 88 0
             C 102 0, 108 14, 122 14
             L 230 14
             C 240 14, 248 22, 248 32
             L 248 184
             C 248 195, 239 204, 228 204
             L 20 204
             C 9 204, 0 195, 0 184
             L 0 18
             C 0 8, 8 0, 18 0 Z"
          fill="url(#backGrad)"
        />
        {/* Inside pocket shade */}
        <rect x="8" y="24" width="232" height="170" rx="16" fill="#1572aa" opacity="0.6" />
      </svg>
    </div>
  );
};

export const FolderFront: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 34,
        left: 0,
        width: 248,
        height: 170,
        borderRadius: 22,
        background: 'linear-gradient(180deg, #74d2ff 0%, #4db8f3 100%)',
        boxShadow: '0 10px 24px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
        boxSizing: 'border-box',
      }}
    >
      {/* Subtle highlight stripe near bottom */}
      <div
        style={{
          width: 216,
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }}
      />
    </div>
  );
};

export const FolderLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 214,
        left: -30,
        width: 308,
        textAlign: 'center',
        fontFamily: '"KaiTi", "STKaiti", "SimKai", "Noto Serif SC", serif, system-ui',
        fontStyle: 'italic',
        fontWeight: 600,
        fontSize: 31,
        color: '#ffffff',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.6)',
        letterSpacing: '1px',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      {label}
    </div>
  );
};
