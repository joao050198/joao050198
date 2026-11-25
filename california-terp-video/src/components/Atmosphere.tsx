import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

/** Fundo com "nuvens de aroma": gradientes radiais que derivam lentamente. */
export const AromaBackground: React.FC<{base: string; tints: string[]; intensity?: number}> = ({base, tints, intensity = 0.55}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const blobs = tints.map((c, i) => {
    const x = 50 + Math.sin(t * 0.35 + i * 2.1) * 32;
    const y = 50 + Math.cos(t * 0.28 + i * 1.7) * 28;
    const r = 38 + Math.sin(t * 0.5 + i) * 6;
    return `radial-gradient(circle at ${x}% ${y}%, ${c} 0%, transparent ${r}%)`;
  });
  return (
    <AbsoluteFill style={{background: base}}>
      <AbsoluteFill style={{background: blobs.join(','), opacity: intensity}} />
    </AbsoluteFill>
  );
};

/** Granulação de filme + vinheta: tira o aspecto "digital chapado". */
export const FilmFinish: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.28) 100%)'}} />
      <AbsoluteFill style={{mixBlendMode: 'overlay', opacity: 0.09}}>
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={frame % 12} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
