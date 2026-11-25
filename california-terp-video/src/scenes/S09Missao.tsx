import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, SANS, SERIF} from '../theme';
import {AromaBackground} from '../components/Atmosphere';
import {SectionLabel, WordReveal} from '../components/Text';

// Missão oficial (página Sobre Nós), na íntegra.
const MISSION =
  'Proporcionar bem-estar e qualidade de vida por meio de produtos aromáticos de excelência, criando experiências únicas que conectam sensações, conforto e equilíbrio no dia a dia dos nossos clientes.';

export const S09Missao: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AromaBackground base={C.navyDeep} tints={['#22406A', '#1D4A39', '#2A2E57']} intensity={0.75} />
      <div
        style={{
          position: 'absolute',
          top: 300,
          left: 0,
          whiteSpace: 'nowrap',
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 520,
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: '2px rgba(244,241,232,0.07)',
          transform: `translateX(${-frame * 1.6}px)`,
        }}
      >
        MISSÃO MISSÃO MISSÃO
      </div>
      <AbsoluteFill style={{padding: '0 170px', justifyContent: 'center'}}>
        <SectionLabel start={4} text="NOSSA MISSÃO" style={{marginBottom: 56}} />
        <WordReveal
          text={MISSION}
          start={14}
          stagger={2.4}
          dur={22}
          style={{fontFamily: SERIF, fontSize: 84, lineHeight: 1.08, color: C.cream, maxWidth: 1580}}
          accent={(w) =>
            ['sensações,', 'conforto', 'equilíbrio'].includes(w) ? {fontStyle: 'italic', color: C.greenLight} : undefined
          }
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
