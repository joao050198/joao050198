import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, SANS, SERIF, ease} from '../theme';
import {AromaBackground} from '../components/Atmosphere';
import {LineReveal, WordReveal} from '../components/Text';

// A crença que deu origem à marca (texto "Nossa História" do site).
const LINES = ['O ambiente.', 'O aroma.', 'A experiência.'];
const STARTS = [12, 42, 72];

export const S02Crenca: React.FC = () => {
  const frame = useCurrentFrame();
  const active = STARTS.filter((s) => frame >= s).length - 1;
  const drift = interpolate(frame, [0, 210], [0, -30]);

  return (
    <AbsoluteFill>
      <AromaBackground base={C.cream} tints={['#DDE5CF', '#E8DCC6', '#D5DDE6']} intensity={0.9} />
      <AbsoluteFill style={{padding: '170px 160px', transform: `translateY(${drift}px)`}}>
        {LINES.map((l, i) => {
          const dim = frame > 112 ? 1 : i === active ? 1 : 0.22;
          const opacity = interpolate(dim, [0, 1], [0, 1]);
          return (
            <div key={l} style={{opacity: frame < STARTS[i] ? 1 : opacity, transition: 'none'}}>
              <LineReveal start={STARTS[i]} dur={22}>
                <div
                  style={{
                    fontFamily: SANS,
                    fontWeight: 800,
                    fontSize: 150,
                    color: C.navy,
                    letterSpacing: '-0.035em',
                    lineHeight: 1.04,
                  }}
                >
                  {l}
                </div>
              </LineReveal>
            </div>
          );
        })}
        <div style={{marginTop: 46, maxWidth: 1300}}>
          <WordReveal
            text="influenciam diretamente a sua qualidade de vida."
            start={112}
            stagger={3}
            style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 76, color: C.olive, lineHeight: 1.1}}
            accent={(w) => (w.startsWith('qualidade') || w.startsWith('vida') ? {color: C.green} : undefined)}
          />
        </div>
      </AbsoluteFill>
      {/* índice lateral */}
      <div style={{position: 'absolute', right: 140, top: 230, display: 'flex', flexDirection: 'column', gap: 120, alignItems: 'flex-end'}}>
        {LINES.map((_, i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 16, opacity: ease(frame, STARTS[i], 20)}}>
            <div style={{width: i === active ? 70 : 30, height: 2, background: i === active ? C.green : C.sage}} />
            <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 20, letterSpacing: '0.2em', color: i === active ? C.green : C.sage}}>
              0{i + 1}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
