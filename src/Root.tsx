import React from 'react';
import { Composition } from 'remotion';
import { FolderExpansion } from './FolderExpansion';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="FolderExpansion"
        component={FolderExpansion}
        durationInFrames={590}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
