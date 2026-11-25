import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, SANS, SERIF, ease} from '../theme';
import {Logo} from '../components/Logo';

// "Foi por isso que nasceu a California Terp" → montagem do logo.
export const S03Origem: React.FC = () => {
  const frame = useCurrentFrame();
  const introIn = ease(frame, 4, 26);
  const introOut = ease(frame, 50, 24);
  const glow = ease(frame, 50, 80);
  const push = interpolate(frame, [0, 240], [0.95, 1.02]);
  const line = ease(frame, 128, 36);
  const tag = ease(frame, 140, 30);

  return (
    <AbsoluteFill style={{background: C.paper}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${glow}) 0%, rgba(233,230,218,${0.9 * glow}) 35%, transparent 70%)`,
        }}
      />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            position: 'absolute',
            top: 330,
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: 60,
            color: C.olive,
            opacity: introIn * (1 - introOut),
            transform: `translateY(${(1 - introIn) * 30 - introOut * 60}px)`,
          }}
        >
          Foi por isso que nasceu a
        </div>
        <div style={{transform: `scale(${push * 1.55})`, marginTop: -30}}>
          <Logo start={44} size={100} />
        </div>
        <div style={{position: 'absolute', top: 770, display: 'flex', alignItems: 'center', gap: 28}}>
          <div style={{width: 120 * line, height: 1.5, background: C.sage}} />
          <div
            style={{
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: '0.36em',
              color: C.olive,
              opacity: tag,
              transform: `translateY(${(1 - tag) * 14}px)`,
            }}
          >
            AROMAS QUE ELEVAM O SEU MOMENTO
          </div>
          <div style={{width: 120 * line, height: 1.5, background: C.sage}} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
