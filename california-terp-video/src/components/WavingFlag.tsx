import React, {useId, useMemo} from 'react';
import {useCurrentFrame} from 'remotion';
import {C, EASE_OUT} from '../theme';

const W = 190;
const H = 100;
const N = 90; // fatias verticais usadas para simular o tecido ondulando

const starPath = (cx: number, cy: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.382;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
};

/**
 * Bandeira vetorial animada (reconstrução do símbolo do logo da California Terp).
 * `reveal` 0→1 controla a entrada fatia a fatia, da esquerda para a direita.
 */
export const WavingFlag: React.FC<{
  width: number;
  reveal?: number;
  amp?: number;
  speed?: number;
  tilt?: number;
}> = ({width, reveal = 1, amp = 0.085, speed = 0.09, tilt = -9}) => {
  const frame = useCurrentFrame();
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const sw = W / N;
  const stripeH = H / 13;
  const cantonW = W * 0.4;
  const cantonH = stripeH * 7;

  const stars = useMemo(() => {
    const d: string[] = [];
    for (let r = 0; r < 9; r++) {
      const cy = (cantonH * (r + 1)) / 10;
      const count = r % 2 === 0 ? 6 : 5;
      for (let c = 0; c < count; c++) {
        const cx = r % 2 === 0 ? (cantonW * (2 * c + 1)) / 12 : (cantonW * (2 * c + 2)) / 12;
        d.push(starPath(cx, cy, H * 0.0308));
      }
    }
    return d.join(' ');
  }, [cantonH, cantonW]);

  const strips = [];
  for (let i = 0; i < N; i++) {
    const x = i * sw;
    const u = x / W;
    const phase = u * Math.PI * 2 * 1.15 - frame * speed;
    const dy = Math.sin(phase) * amp * H * (0.3 + 0.7 * u);
    const local = Math.min(1, Math.max(0, (reveal * (N + 14) - i) / 14));
    const s = EASE_OUT(local);
    if (s <= 0.001) continue;
    strips.push(
      <g key={i} transform={`translate(0 ${dy + (H / 2) * (1 - s)}) scale(1 ${s})`} opacity={Math.min(1, s * 1.4)}>
        <g clipPath={`url(#${id}c${i})`}>
          <use href={`#${id}flag`} />
        </g>
        <rect x={x} y={0} width={sw} height={H} fill={`url(#${id}hi)`} />
        <rect x={x} y={0} width={sw} height={H} fill={`url(#${id}lo)`} />
      </g>,
    );
  }

  return (
    <svg
      width={width}
      height={(width * 140) / 210}
      viewBox="-10 -20 210 140"
      style={{overflow: 'visible', transform: `rotate(${tilt}deg)`}}
    >
      <defs>
        {(['hi', 'lo'] as const).map((kind) => (
          <linearGradient key={kind} id={`${id}${kind}`} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={W} y2={0}>
            {Array.from({length: 41}).map((_, k) => {
              const u = k / 40;
              const sh = Math.cos(u * Math.PI * 2 * 1.15 - frame * speed);
              const a = kind === 'hi' ? Math.max(0, sh) * 0.2 : Math.max(0, -sh) * 0.3;
              return <stop key={k} offset={u} stopColor={kind === 'hi' ? '#fff' : '#000'} stopOpacity={a} />;
            })}
          </linearGradient>
        ))}
        <g id={`${id}flag`}>
          {Array.from({length: 13}).map((_, k) => (
            <rect key={k} x={0} y={k * stripeH} width={W} height={stripeH + 0.2} fill={k % 2 === 0 ? C.red : '#FFFFFF'} />
          ))}
          <rect x={0} y={0} width={cantonW} height={cantonH} fill={C.flagBlue} />
          <path d={stars} fill="#FFFFFF" />
        </g>
        {Array.from({length: N}).map((_, i) => (
          <clipPath key={i} id={`${id}c${i}`}>
            <rect x={i * sw - 0.3} y={-1} width={sw + 0.6} height={H + 2} />
          </clipPath>
        ))}
      </defs>
      {strips}
    </svg>
  );
};
