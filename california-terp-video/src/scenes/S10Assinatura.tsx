import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, SANS, SERIF, ease} from '../theme';
import {Logo} from '../components/Logo';

export const S10Assinatura: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const tag = ease(frame, 70, 30);
  const url = ease(frame, 96, 30);
  const underline = ease(frame, 110, 34);
  const chan = ease(frame, 120, 30);
  const fadeOut = interpolate(frame, [205, 225], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const push = interpolate(frame, [0, 225], [1.0, 1.04]);
  void durationInFrames;

  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, #FFFFFF 0%, ${C.paper} 45%, #ECE7D9 100%)`}}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', transform: `scale(${push})`}}>
        <div style={{transform: 'scale(1.35)', marginTop: -170}}>
          <Logo start={14} size={100} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 640,
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: 64,
            color: C.olive,
            opacity: tag,
            transform: `translateY(${(1 - tag) * 24}px)`,
          }}
        >
          Aromas que elevam o seu momento.
        </div>
        <div style={{position: 'absolute', top: 770, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 34, letterSpacing: '0.06em', color: C.navy, opacity: url}}>
            terpenoscalifornia.com
          </div>
          <div style={{height: 2, width: 420 * underline, background: C.green, marginTop: 12}} />
          <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 22, letterSpacing: '0.24em', color: C.sage, marginTop: 30, opacity: chan}}>
            SHOPEE · MERCADO LIVRE · WHATSAPP
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{background: C.ink, opacity: fadeOut}} />
    </AbsoluteFill>
  );
};
