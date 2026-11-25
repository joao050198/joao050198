import React, {CSSProperties} from 'react';
import {useCurrentFrame} from 'remotion';
import {C, SANS, ease} from '../theme';

/** Revela palavra por palavra subindo por trás de uma máscara. */
export const WordReveal: React.FC<{
  text: string;
  start: number;
  stagger?: number;
  dur?: number;
  style?: CSSProperties;
  accent?: (word: string, index: number) => CSSProperties | undefined;
}> = ({text, start, stagger = 3, dur = 24, style, accent}) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', ...style}}>
      {words.map((w, i) => {
        const p = ease(frame, start + i * stagger, dur);
        return (
          <span
            key={i}
            style={{display: 'inline-block', overflow: 'hidden', paddingBottom: '0.14em', marginBottom: '-0.14em', marginRight: '0.24em'}}
          >
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${(1 - p) * 112}%) rotate(${(1 - p) * 4}deg)`,
                transformOrigin: 'left bottom',
                ...(accent ? accent(w, i) : {}),
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Linha única revelada por máscara. */
export const LineReveal: React.FC<{start: number; dur?: number; style?: CSSProperties; children: React.ReactNode}> = ({
  start,
  dur = 26,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const p = ease(frame, start, dur);
  return (
    <div style={{overflow: 'hidden', paddingBottom: '0.12em', marginBottom: '-0.12em'}}>
      <div style={{transform: `translateY(${(1 - p) * 110}%)`, ...style}}>{children}</div>
    </div>
  );
};

/** Rótulo de seção no estilo de filmes institucionais: ponto + linha + texto espaçado. */
export const SectionLabel: React.FC<{start: number; text: string; color?: string; accent?: string; style?: CSSProperties}> = ({
  start,
  text,
  color = C.cream,
  accent = C.greenLight,
  style,
}) => {
  const frame = useCurrentFrame();
  const line = ease(frame, start, 30);
  const t = ease(frame, start + 8, 26);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 18, ...style}}>
      <div style={{width: 10, height: 10, borderRadius: 5, background: accent, transform: `scale(${line})`}} />
      <div style={{width: 64 * line, height: 2, background: accent}} />
      <div
        style={{
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: '0.32em',
          color,
          opacity: t,
          transform: `translateX(${(1 - t) * -16}px)`,
        }}
      >
        {text}
      </div>
    </div>
  );
};
