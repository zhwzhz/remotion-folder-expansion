import React from 'react';
import { Img, staticFile } from 'remotion';

export const Wallpaper: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        overflow: 'hidden',
      }}
    >
      <Img
        src={staticFile('wallpaper.png')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};
