import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, SANS, ease, EASE_IN_OUT} from '../theme';
import {WavingFlag} from './WavingFlag';

/**
 * Logo California Terp montado em vetor: bandeira + "CALIFÓRNIA" (azul) + "Terp" (verde).
 * `start` = frame em que a animação de montagem começa. `size` = escala (100 ≈ logo com ~520px).
 */
export const Logo: React.FC<{start?: number; size?: number; sweep?: boolean}> = ({
  start = 0,
  size = 100,
  sweep = true,
}) => {
  const frame = useCurrentFrame();
  const u = size / 100;
  const f = frame - start;
  const word = 'CALIFÓRNIA';

  const flagReveal = ease(f, 0, 42, 0, 1, EASE_IN_OUT);
  const terpClip = ease(f, 30, 26);
  const sweepX = ease(f, 70, 40, -40, 140, EASE_IN_OUT);

  return (
    <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 6 * u}}>
      <div style={{width: 200 * u, display: 'flex', justifyContent: 'center', marginTop: -4 * u, marginRight: 4 * u}}>
        <WavingFlag width={200 * u} reveal={flagReveal} />
      </div>
      <div style={{fontFamily: SANS, fontWeight: 700, lineHeight: 0.92, position: 'relative'}}>
        <div style={{fontSize: 58 * u, color: C.navy, letterSpacing: '0.005em', display: 'flex'}}>
          {word.split('').map((ch, i) => {
            const p = ease(f, 10 + i * 2.2, 22);
            return (
              <span key={i} style={{display: 'inline-block', overflow: 'hidden', paddingTop: 12 * u, marginTop: -12 * u}}>
                <span style={{display: 'inline-block', transform: `translateY(${(1 - p) * 160}%)`}}>{ch}</span>
              </span>
            );
          })}
        </div>
        <div
          style={{
            fontSize: 74 * u,
            color: C.green,
            letterSpacing: '-0.01em',
            marginTop: 2 * u,
            clipPath: `inset(-20% ${(1 - terpClip) * 100}% -20% 0)`,
            transform: `translateX(${(1 - terpClip) * -24 * u}px)`,
          }}
        >
          Terp
        </div>
        {sweep && (
          <div
            style={{
              position: 'absolute',
              inset: `${-10 * u}px ${-10 * u}px`,
              background: `linear-gradient(105deg, transparent ${sweepX - 18}%, rgba(255,255,255,0.75) ${sweepX}%, transparent ${sweepX + 18}%)`,
              mixBlendMode: 'soft-light',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </div>
  );
};
