import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, SANS, SERIF, ease} from '../theme';
import {AromaBackground} from '../components/Atmosphere';
import {SectionLabel, WordReveal} from '../components/Text';

// "O que nos move" — textos fiéis à página Sobre Nós.
const VALUES = [
  {
    title: 'Bem-estar',
    desc: 'Aromas que proporcionam relaxamento e experiências agradáveis.',
    color: C.green,
    icon: 'M60 104 C 20 80, 18 36, 60 16 C 102 36, 100 80, 60 104 Z M60 104 L60 40 M60 64 L80 48 M60 80 L40 62',
  },
  {
    title: 'Qualidade Premium',
    desc: 'Terpenos selecionados com alto nível de pureza e fidelidade.',
    color: C.navy,
    icon: 'M30 22 H90 L110 50 L60 104 L10 50 Z M10 50 H110 M44 22 L36 50 L60 104 L84 50 L76 22',
  },
  {
    title: 'Confiança',
    desc: 'Compromisso com transparência e satisfação do cliente.',
    color: C.red,
    icon: 'M60 12 L100 28 V58 C100 84, 82 100, 60 108 C38 100, 20 84, 20 58 V28 Z M42 60 L55 73 L80 46',
  },
];

export const S06Valores: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <AromaBackground base={C.cream} tints={['#E3E8D6', '#EDE3CF', '#DCE2EA']} intensity={0.9} />
      <AbsoluteFill style={{padding: '120px 160px'}}>
        <SectionLabel start={4} text="O QUE NOS MOVE" color={C.olive} accent={C.green} />
        <WordReveal
          text="Três valores. Um compromisso."
          start={12}
          stagger={4}
          style={{fontFamily: SERIF, fontSize: 96, color: C.navy, marginTop: 30, lineHeight: 1}}
          accent={(_, i) => (i >= 2 ? {fontStyle: 'italic', color: C.green} : undefined)}
        />
        <div style={{display: 'flex', gap: 40, marginTop: 70}}>
          {VALUES.map((v, i) => {
            const s = spring({frame: frame - (36 + i * 10), fps, config: {damping: 18, mass: 0.9, stiffness: 110}});
            const draw = ease(frame, 52 + i * 10, 46);
            const txt = ease(frame, 58 + i * 10, 26);
            return (
              <div
                key={v.title}
                style={{
                  flex: 1,
                  height: 470,
                  background: C.white,
                  borderRadius: 28,
                  padding: '48px 46px',
                  boxShadow: '0 30px 60px -30px rgba(38,34,26,0.35), 0 2px 0 rgba(0,0,0,0.03)',
                  transform: `translateY(${(1 - s) * 120}px)`,
                  opacity: Math.min(1, s * 1.5),
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{position: 'absolute', left: 0, top: 0, height: 8, width: `${draw * 100}%`, background: v.color}} />
                <svg width={120} height={120} viewBox="0 0 120 120">
                  <path
                    d={v.icon}
                    fill="none"
                    stroke={v.color}
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1 - draw}
                  />
                </svg>
                <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 42, color: C.navy, marginTop: 34, opacity: txt}}>{v.title}</div>
                <div
                  style={{
                    fontFamily: SANS,
                    fontWeight: 400,
                    fontSize: 26,
                    lineHeight: 1.45,
                    color: C.olive,
                    marginTop: 18,
                    opacity: txt,
                    transform: `translateY(${(1 - txt) * 14}px)`,
                  }}
                >
                  {v.desc}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
