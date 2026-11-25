import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, SANS, SERIF, ease} from '../theme';
import {LineReveal} from '../components/Text';

// Os "momentos" que organizam o catálogo no site. Cada palavra entra no tempo da música (15 frames = 1 batida a 120 BPM).
const MOMENTS = [
  {t: 'Sono e Descanso', bg: C.navy},
  {t: 'Equilíbrio Emocional', bg: '#2F5D3A'},
  {t: 'Alívio e Conforto', bg: C.olive},
  {t: 'Foco e Vitalidade', bg: '#8E3B2B'},
  {t: 'Humor & Bem-estar', bg: '#5E6A4A'},
  {t: 'Relaxamento', bg: C.navyDeep},
];
const START = 60;
const STEP = 15;

export const S08Momentos: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.min(MOMENTS.length - 1, Math.floor((frame - START) / STEP));

  if (frame < START) {
    return (
      <AbsoluteFill style={{background: C.cream, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <div style={{lineHeight: 1}}>
          <LineReveal start={4}>
            <span style={{fontFamily: SANS, fontWeight: 800, fontSize: 150, color: C.navy, letterSpacing: '-0.04em'}}>Para cada</span>
          </LineReveal>
          <LineReveal start={12}>
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 170, color: C.green}}>momento.</span>
          </LineReveal>
        </div>
      </AbsoluteFill>
    );
  }

  const m = MOMENTS[idx];
  const local = frame - (START + idx * STEP);
  const p = ease(local, 0, 10);
  const words = m.t.split(' ');

  return (
    <AbsoluteFill style={{background: m.bg, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', left: 120, top: 100, fontFamily: SANS, fontWeight: 600, fontSize: 20, letterSpacing: '0.32em', color: C.cream, opacity: 0.7}}>
        PARA CADA MOMENTO
      </div>
      <div style={{position: 'absolute', right: 120, top: 96, fontFamily: SANS, fontWeight: 600, fontSize: 24, letterSpacing: '0.15em', color: C.cream}}>
        0{idx + 1}
        <span style={{opacity: 0.45}}> / 0{MOMENTS.length}</span>
      </div>
      <div style={{position: 'absolute', left: 120, right: 120, bottom: 100, height: 3, background: 'rgba(244,241,232,0.18)'}}>
        <div style={{height: 3, width: `${((idx + p) / MOMENTS.length) * 100}%`, background: C.cream}} />
      </div>
      <div
        style={{
          textAlign: 'center',
          maxWidth: 1600,
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 150,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: C.cream,
          transform: `scale(${1.08 - 0.08 * p})`,
        }}
      >
        {words.map((w, i) => (
          <span key={i} style={{display: 'inline-block', overflow: 'hidden', margin: '0 0.12em', paddingBottom: '0.1em'}}>
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${(1 - ease(local, i * 1.5, 10)) * 100}%)`,
                fontFamily: w === 'e' || w === '&' ? SERIF : SANS,
                fontStyle: w === 'e' || w === '&' ? 'italic' : 'normal',
                fontWeight: w === 'e' || w === '&' ? 400 : 800,
              }}
            >
              {w}
            </span>
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
