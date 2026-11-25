import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, SANS, SERIF, ease} from '../theme';
import {AromaBackground} from '../components/Atmosphere';
import {SectionLabel, WordReveal} from '../components/Text';

const HIGHLIGHT = new Set([4, 5, 6, 7, 8]); // "bem-estar e experiências sensoriais únicas"

export const S04Proposito: React.FC = () => {
  const frame = useCurrentFrame();
  const attrs = ['Intensos', 'Agradáveis', 'Sofisticados'];
  return (
    <AbsoluteFill>
      <AromaBackground base={C.navyDeep} tints={['#24406B', '#1E4A3A', '#2B2F55']} intensity={0.7} />
      <AbsoluteFill style={{padding: '150px 160px', justifyContent: 'center'}}>
        <SectionLabel start={4} text="POR QUE EXISTIMOS" style={{marginBottom: 60}} />
        <WordReveal
          text="Nascemos para proporcionar bem-estar e experiências sensoriais únicas através de terpenos de alta qualidade."
          start={14}
          stagger={3}
          style={{fontFamily: SERIF, fontSize: 112, lineHeight: 1.02, color: C.cream, maxWidth: 1560}}
          accent={(_, i) => (HIGHLIGHT.has(i) ? {fontStyle: 'italic', color: C.greenLight} : undefined)}
        />
        <div style={{display: 'flex', gap: 40, marginTop: 70, alignItems: 'center'}}>
          <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 22, letterSpacing: '0.2em', color: C.sageLight, opacity: ease(frame, 100, 20)}}>
            AROMAS
          </div>
          {attrs.map((a, i) => {
            const p = ease(frame, 106 + i * 8, 24);
            return (
              <div
                key={a}
                style={{
                  fontFamily: SANS,
                  fontWeight: 600,
                  fontSize: 30,
                  color: C.cream,
                  padding: '14px 30px',
                  border: `1.5px solid rgba(244,241,232,${0.35 * p})`,
                  borderRadius: 999,
                  opacity: p,
                  transform: `translateY(${(1 - p) * 24}px)`,
                }}
              >
                {a}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
