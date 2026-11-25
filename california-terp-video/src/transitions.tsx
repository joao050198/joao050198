import React from 'react';
import {AbsoluteFill} from 'remotion';
import type {TransitionPresentation, TransitionPresentationComponentProps} from '@remotion/transitions';
import {C, EASE_IN_OUT} from './theme';

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// 1) Círculo que se abre a partir de um ponto (ex.: a gota que cai)
type CircleProps = {x: number; y: number};
const CircleComp: React.FC<TransitionPresentationComponentProps<CircleProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  const p = EASE_IN_OUT(presentationProgress);
  if (presentationDirection === 'exiting') {
    return <AbsoluteFill style={{transform: `scale(${1 + p * 0.08})`}}>{children}</AbsoluteFill>;
  }
  return (
    <AbsoluteFill style={{clipPath: `circle(${p * 120}% at ${passedProps.x}% ${passedProps.y}%)`}}>{children}</AbsoluteFill>
  );
};
export const circleReveal = (x = 50, y = 50): TransitionPresentation<CircleProps> => ({
  component: CircleComp,
  props: {x, y},
});

// 2) Painéis coloridos que varrem a tela (assinatura de marca)
type PanelProps = {colors: string[]};
const PanelComp: React.FC<TransitionPresentationComponentProps<PanelProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  if (presentationDirection === 'exiting') {
    const p = EASE_IN_OUT(presentationProgress);
    return <AbsoluteFill style={{transform: `translateX(${-p * 6}%)`}}>{children}</AbsoluteFill>;
  }
  const n = passedProps.colors.length;
  const lag = 0.1;
  const span = 1 - lag * (n - 1);
  const edges = passedProps.colors.map((_, k) => {
    const q = clamp((presentationProgress - k * lag) / span);
    const R = EASE_IN_OUT(clamp(q / 0.5)) * 100;
    const L = EASE_IN_OUT(clamp((q - 0.5) / 0.5)) * 100;
    return {L, R};
  });
  const reveal = edges[n - 1].L; // a cena nova aparece atrás do último painel
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{clipPath: `inset(0 ${100 - reveal}% 0 0)`}}>{children}</AbsoluteFill>
      {passedProps.colors.map((c, k) => (
        <div
          key={k}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `calc(${edges[k].L}% - 3px)`,
            width: edges[k].R - edges[k].L > 0 ? `calc(${edges[k].R - edges[k].L}% + 6px)` : 0,
            background: c,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
export const panelSweep = (colors: string[] = [C.green, C.navy]): TransitionPresentation<PanelProps> => ({
  component: PanelComp,
  props: {colors},
});

// 3) Empurrar para cima
type Empty = Record<string, never>;
const PushComp: React.FC<TransitionPresentationComponentProps<Empty>> = ({children, presentationDirection, presentationProgress}) => {
  const p = EASE_IN_OUT(presentationProgress);
  const y = presentationDirection === 'exiting' ? -p * 100 : (1 - p) * 100;
  return <AbsoluteFill style={{transform: `translateY(${y}%)`}}>{children}</AbsoluteFill>;
};
export const pushUp = (): TransitionPresentation<Empty> => ({component: PushComp, props: {} as Empty});

// 4) Zoom "através" da cena
const ZoomComp: React.FC<TransitionPresentationComponentProps<Empty>> = ({children, presentationDirection, presentationProgress}) => {
  const p = EASE_IN_OUT(presentationProgress);
  if (presentationDirection === 'exiting') {
    return <AbsoluteFill style={{transform: `scale(${1 + p * 0.5})`, opacity: 1 - p}}>{children}</AbsoluteFill>;
  }
  return <AbsoluteFill style={{transform: `scale(${1.25 - p * 0.25})`, opacity: p}}>{children}</AbsoluteFill>;
};
export const zoomThrough = (): TransitionPresentation<Empty> => ({component: ZoomComp, props: {} as Empty});

// 5) Fusão suave
const FadeComp: React.FC<TransitionPresentationComponentProps<Empty>> = ({children, presentationDirection, presentationProgress}) => {
  const p = EASE_IN_OUT(presentationProgress);
  return <AbsoluteFill style={{opacity: presentationDirection === 'exiting' ? 1 : p}}>{children}</AbsoluteFill>;
};
export const softFade = (): TransitionPresentation<Empty> => ({component: FadeComp, props: {} as Empty});
