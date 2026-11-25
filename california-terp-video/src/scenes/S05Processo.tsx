import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, SANS, SERIF, ease} from '../theme';
import {AromaBackground} from '../components/Atmosphere';
import {LineReveal, SectionLabel} from '../components/Text';

// Estrutura do limoneno (monoterpeno C10H16 presente no catálogo), desenhada traço a traço.
const cx = 480;
const cy = 600;
const r = 112;
const V = Array.from({length: 6}).map((_, k) => {
  const a = (-90 + 60 * k) * (Math.PI / 180);
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
});
const inner = (a: readonly [number, number], b: readonly [number, number], k = 0.16) => {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const ix = a[0] + (cx - mx) * k;
  const iy = a[1] + (cy - my) * k;
  const jx = b[0] + (cx - mx) * k;
  const jy = b[1] + (cy - my) * k;
  return [ix + (jx - ix) * 0.12, iy + (jy - iy) * 0.12, ix + (jx - ix) * 0.88, iy + (jy - iy) * 0.88];
};
const C8: [number, number] = [V[3][0], V[3][1] + 110];
const SEGMENTS: number[][] = [
  ...V.map((v, k) => [v[0], v[1], V[(k + 1) % 6][0], V[(k + 1) % 6][1]]),
  inner(V[0], V[1]), // ligação dupla do anel
  [V[0][0], V[0][1], V[0][0], V[0][1] - 100], // metila
  [V[3][0], V[3][1], C8[0], C8[1]], // isopropenila
  [C8[0], C8[1], C8[0] - 95, C8[1] + 55],
  [C8[0], C8[1], C8[0] + 95, C8[1] + 55],
  [C8[0] + 10, C8[1] + 16, C8[0] + 88, C8[1] + 61],
];

const PILLARS = ['Pureza', 'Fidelidade aromática', 'Excelência'];

export const S05Processo: React.FC = () => {
  const frame = useCurrentFrame();

  const steam = Array.from({length: 5}).map((_, i) => {
    const x0 = cx - 120 + i * 60;
    const pts: string[] = [];
    for (let y = 440; y >= 90; y -= 10) {
      const x = x0 + Math.sin(y * 0.022 + frame * 0.07 + i * 1.3) * (10 + (440 - y) * 0.09);
      pts.push(`${x.toFixed(1)},${y}`);
    }
    return {d: `M${pts.join('L')}`, o: ease(frame, 40 + i * 6, 40)};
  });

  return (
    <AbsoluteFill>
      <AromaBackground base={C.oliveDeep} tints={['#4B4430', '#2F3B2A', '#3A3326']} intensity={0.9} />
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="steamFade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={C.sageLight} stopOpacity="0" />
            <stop offset="0.25" stopColor={C.sageLight} stopOpacity="0.55" />
            <stop offset="1" stopColor={C.sageLight} stopOpacity="0" />
          </linearGradient>
        </defs>
        {steam.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill="none"
            stroke="url(#steamFade)"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={s.o}
            strokeDasharray="60 26"
            strokeDashoffset={-frame * 2.2 - i * 20}
          />
        ))}
        {SEGMENTS.map((s, i) => {
          const p = ease(frame, 8 + i * 4, 26);
          return (
            <line
              key={i}
              x1={s[0]}
              y1={s[1]}
              x2={s[0] + (s[2] - s[0]) * p}
              y2={s[1] + (s[3] - s[1]) * p}
              stroke={C.cream}
              strokeWidth={5}
              strokeLinecap="round"
              opacity={p > 0 ? 1 : 0}
            />
          );
        })}
        {V.map((v, i) => (
          <circle key={i} cx={v[0]} cy={v[1]} r={9 * ease(frame, 30 + i * 3, 20)} fill={C.greenLight} />
        ))}
      </svg>
      <div
        style={{
          position: 'absolute',
          left: cx - 240,
          width: 480,
          top: 880,
          textAlign: 'center',
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: '0.28em',
          color: C.sageLight,
          opacity: ease(frame, 70, 30),
        }}
      >
        C₁₀H₁₆ · MONOTERPENO
      </div>

      <div style={{position: 'absolute', left: 960, top: 200, width: 840}}>
        <SectionLabel start={6} text="NOSSO PROCESSO" />
        <div style={{marginTop: 40}}>
          <LineReveal start={18}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 124, color: C.cream, letterSpacing: '-0.035em', lineHeight: 1}}>
              Destilados
            </div>
          </LineReveal>
          <LineReveal start={28}>
            <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 140, color: C.greenLight, lineHeight: 1}}>a vapor.</div>
          </LineReveal>
        </div>
        <div style={{marginTop: 56, display: 'flex', flexDirection: 'column', gap: 0}}>
          {PILLARS.map((p, i) => {
            const s = 96 + i * 16;
            const line = ease(frame, s, 34);
            const t = ease(frame, s + 6, 26);
            return (
              <div key={p}>
                <div style={{height: 1.5, width: `${line * 100}%`, background: 'rgba(244,241,232,0.25)'}} />
                <div style={{display: 'flex', alignItems: 'baseline', gap: 34, padding: '22px 0', opacity: t, transform: `translateY(${(1 - t) * 20}px)`}}>
                  <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 20, color: C.greenLight, letterSpacing: '0.15em'}}>0{i + 1}</div>
                  <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 46, color: C.cream}}>{p}</div>
                </div>
              </div>
            );
          })}
          <div style={{height: 1.5, width: `${ease(frame, 140, 34) * 100}%`, background: 'rgba(244,241,232,0.25)'}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
