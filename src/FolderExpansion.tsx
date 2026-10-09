import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Easing,
  useCurrentFrame,
} from 'remotion';
import { Wallpaper } from './components/Wallpaper';
import { FolderBack, FolderFront, FolderLabel } from './components/Folder';
import { FileItem } from './components/FileItem';
import { MouseCursor } from './components/MouseCursor';

const FOLDER_WIDTH = 248;
const FOLDER_HEIGHT = 204;
const INITIAL_FOLDER_X = 716; // Center X of folder initially
const FOLDER_Y = 438; // Top Y of folder

const FILES = [
  {
    id: 'md',
    name: '学习笔记.md',
    extension: 'md',
    relSlotX: 519, // 716 + 519 = 1235
    startFrame: 78, // t = 1.3s
    durationFrames: 56, // ends at frame 134 (~2.23s)
  },
  {
    id: 'json',
    name: '结构参数索引.json',
    extension: 'json',
    relSlotX: 519 + 395, // 716 + 914 = 1630
    startFrame: 138, // t = 2.3s
    durationFrames: 58, // ends at frame 196 (~3.27s)
  },
  {
    id: 'py',
    name: '整理原生结构.py',
    extension: 'py',
    relSlotX: 519 + 395 + 395, // 716 + 1309 = 2025
    startFrame: 201, // t = 3.35s
    durationFrames: 58, // ends at frame 259 (~4.32s)
  },
];

export const FolderExpansion: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Group shift animation: centers the expanded row across screen
  // Starts at frame 243 (t = 4.05s), ends at frame 318 (t = 5.3s)
  const groupShift = interpolate(frame, [243, 318], [0, -395], {
    easing: Easing.bezier(0.42, 0, 0.58, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Current folder position
  const currentFolderCenterX = INITIAL_FOLDER_X + groupShift;
  const folderLeft = currentFolderCenterX - FOLDER_WIDTH / 2;
  const folderTop = FOLDER_Y;

  // 2. Cursor animation
  // Cursor moves from (889, 673) to folder bottom-right (folderLeft + 223, folderTop + 176)
  // Movement from frame 30 to 48 (t = 0.5s ~ 0.8s)
  const cursorMoveProgress = interpolate(frame, [30, 48], [0, 1], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cursorTargetX = folderLeft + 223;
  const cursorTargetY = folderTop + 176;

  const cursorX = interpolate(cursorMoveProgress, [0, 1], [889, cursorTargetX]);
  const cursorY = interpolate(cursorMoveProgress, [0, 1], [673, cursorTargetY]);

  // Click pulse at frames 48..58 (t = 0.8s ~ 0.97s)
  const cursorScale = interpolate(frame, [48, 53, 58], [1, 0.91, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ width: 1920, height: 1080, overflow: 'hidden' }}>
      {/* 1. Pristine Desktop Wallpaper */}
      <Wallpaper />

      {/* 2. Folder Back (behind leaping files) */}
      <div
        style={{
          position: 'absolute',
          top: folderTop,
          left: folderLeft,
          width: FOLDER_WIDTH,
          height: FOLDER_HEIGHT,
          zIndex: 10,
        }}
      >
        <FolderBack />
      </div>

      {/* 3. Emerging File Items */}
      {FILES.map((file) => {
        if (frame < file.startFrame) {
          return null;
        }

        // Leap progress with smooth ease-in-out curve
        const leapProgress = interpolate(
          frame,
          [file.startFrame, file.startFrame + file.durationFrames],
          [0, 1],
          {
            easing: Easing.bezier(0.42, 0, 0.58, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        // Resting slot coordinates
        const restingCenterX = INITIAL_FOLDER_X + file.relSlotX + groupShift;
        const restingLeft = restingCenterX - 154 / 2;
        const restingTop = folderTop - 3;

        // Inside folder origin
        const originLeft = folderLeft + 47;
        const originTop = folderTop + 20;

        // Current horizontal position
        const fileLeft = interpolate(leapProgress, [0, 1], [originLeft, restingLeft]);

        // Smooth parabolic jump arc: apex reaches y - 180px in mid-air
        const arc = Math.sin(leapProgress * Math.PI) * 185;
        const fileTop = interpolate(leapProgress, [0, 1], [originTop, restingTop]) - arc;

        // Scale & Opacity
        const scale = interpolate(leapProgress, [0, 0.45, 1], [0.5, 1.03, 1.0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const opacity = interpolate(leapProgress, [0, 0.12], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const labelOpacity = interpolate(leapProgress, [0.72, 1], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={file.id}
            style={{
              position: 'absolute',
              top: fileTop,
              left: fileLeft,
              transform: `scale(${scale})`,
              transformOrigin: '50% 50%',
              opacity,
              zIndex: 20,
            }}
          >
            <FileItem
              name={file.name}
              extension={file.extension}
              showLabel={true}
              labelOpacity={labelOpacity}
            />
          </div>
        );
      })}

      {/* 4. Folder Front (covers emerging files from below) */}
      <div
        style={{
          position: 'absolute',
          top: folderTop,
          left: folderLeft,
          width: FOLDER_WIDTH,
          height: FOLDER_HEIGHT,
          zIndex: 30,
        }}
      >
        <FolderFront />
        <FolderLabel label="参考工程分析" />
      </div>

      {/* 5. Mouse Cursor (topmost) */}
      <MouseCursor x={cursorX} y={cursorY} scale={cursorScale} visible={true} />
    </AbsoluteFill>
  );
};
