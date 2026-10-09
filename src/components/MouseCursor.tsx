import React from 'react';

interface MouseCursorProps {
  x: number;
  y: number;
  scale?: number;
  visible?: boolean;
}

export const MouseCursor: React.FC<MouseCursorProps> = ({
  x,
  y,
  scale = 1,
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        transform: `scale(${scale})`,
        transformOrigin: '0px 0px',
        pointerEvents: 'none',
        zIndex: 100,
        filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5))',
      }}
    >
      <svg
        width="34"
        height="44"
        viewBox="0 0 34 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 2 2
             L 2 34
             L 10.5 25.5
             L 15.5 37
             L 20.5 35
             L 15.5 23.5
             L 25.5 23.5
             Z"
          fill="#000000"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
