import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, SERIF, ease, EASE_IN} from '../theme';
import {LineReveal, SectionLabel} from '../components/Text';

// "Tudo começa com um aroma." — uma gota cai e o círculo se espalha.
export const S01Abertura: React.FC = () => {
  const frame = useCurrentFrame();
  const fall = ease(frame, 8, 32, 0, 1, EASE_IN);
  const dropY = interpolate(fall, [0, 1], [-120, 540]);
  const hit = 40;
  const push = interpolate(frame, [0, 150], [1, 1.06]);

  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 55%, #16223A 0%, ${C.ink} 70%)`}}>
      <AbsoluteFill style={{transform: `scale(${push})`}}>
        <svg width={1920} height={1080} style={{position: 'absolute'}}>
          {frame < hit + 2 && (
            <>
              <line x1={960} y1={0} x2={960} y2={dropY - 30} stroke={C.sageLight} strokeOpacity={0.15 * fall} strokeWidth={1} />
              <path
                d={`M960 ${dropY - 26} C 952 ${dropY - 10}, 948 ${dropY}, 948 ${dropY + 4} a12 12 0 0 0 24 0 C 972 ${dropY}, 968 ${dropY - 10}, 960 ${dropY - 26} Z`}
                fill={C.greenLight}
              />
            </>
          )}
          {[0, 9, 18, 30].map((d, i) => {
            const p = ease(frame, hit + d, 90);
            if (frame < hit + d) return null;
            return (
              <ellipse
                key={i}
                cx={960}
                cy={540}
                rx={20 + p * 1100}
                ry={(20 + p * 1100) * 0.32}
                fill="none"
                stroke={i === 0 ? C.greenLight : C.sageLight}
                strokeWidth={2 - p * 1.4}
                strokeOpacity={(1 - p) * 0.7}
              />
            );
          })}
          {frame >= hit && (
            <circle cx={960} cy={540} r={6 + ease(frame, hit, 20) * 40} fill={C.greenLight} opacity={(1 - ease(frame, hit, 24)) * 0.6} />
          )}
        </svg>

        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
          <div style={{fontFamily: SERIF, color: C.cream, fontSize: 150, lineHeight: 1.0, marginTop: -40}}>
            <LineReveal start={56} dur={30}>Tudo começa</LineReveal>
            <LineReveal start={68} dur={30}>
              com um <span style={{fontStyle: 'italic', color: C.greenLight}}>aroma.</span>
            </LineReveal>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
      <SectionLabel start={20} text="CALIFÓRNIA TERP" style={{position: 'absolute', left: 120, top: 96}} />
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 100,
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontSize: 28,
          color: C.sageLight,
          opacity: ease(frame, 30, 30) * 0.8,
        }}
      >
        Nossa história
      </div>
    </AbsoluteFill>
  );
};
