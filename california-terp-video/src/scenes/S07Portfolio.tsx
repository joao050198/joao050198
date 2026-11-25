import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, SANS, SERIF, ease, EASE_IN_OUT} from '../theme';
import {LineReveal, SectionLabel} from '../components/Text';

const PANELS = [
  {title: 'Monoterpenos', sub: 'Pureza em cada gota', img: 'img/linha-monoterpenos.jpg', pos: '30% 55%', mode: 'photo'},
  {title: 'Frutados', sub: 'Aromas marcantes', img: 'img/morango.jpg', pos: '50% 50%', mode: 'product'},
  {title: 'Blends', sub: 'Combinações exclusivas', img: 'img/linha-blends.jpg', pos: '42% 55%', mode: 'photo'},
  {title: 'Gummies', sub: 'Sabor, praticidade e bem-estar', img: 'img/linha-gummies.jpg', pos: '50% 55%', mode: 'photo'},
] as const;

const ROW1 = ['Linalol', 'Mirceno', 'Limoneno', 'Alfa Pineno', 'Beta Pineno', 'Terpinoleno', 'Terpineol', 'Gama Terpineno', 'Ocimeno', 'Cariofileno'];
const ROW2 = ['Morango', 'Manga', 'Uva', 'Abacaxi', 'Melancia', 'Cereja Ice', 'Menta Verde', 'Hortelã', 'Tutti Frutti', 'Laranja'];

const Ticker: React.FC<{items: string[]; y: number; dir: 1 | -1; opacity: number; serif?: boolean}> = ({items, y, dir, opacity, serif}) => {
  const frame = useCurrentFrame();
  const x = dir * (frame * 3.2) - (dir === 1 ? 2400 : 0);
  const all = [...items, ...items, ...items];
  return (
    <div style={{position: 'absolute', top: y, left: 0, whiteSpace: 'nowrap', transform: `translateX(${x}px)`, opacity}}>
      {all.map((t, i) => (
        <span
          key={i}
          style={{
            fontFamily: serif ? SERIF : SANS,
            fontStyle: serif ? 'italic' : 'normal',
            fontWeight: serif ? 400 : 600,
            fontSize: serif ? 54 : 40,
            color: serif ? C.greenLight : C.cream,
            marginRight: 34,
          }}
        >
          {t}
          <span style={{color: C.sage, marginLeft: 34}}>•</span>
        </span>
      ))}
    </div>
  );
};

export const S07Portfolio: React.FC = () => {
  const frame = useCurrentFrame();
  const out = 150;
  const headIn = 168;

  return (
    <AbsoluteFill style={{background: C.ink}}>
      <SectionLabel start={2} text="NOSSO PORTFÓLIO" style={{position: 'absolute', left: 80, top: 80}} />
      <div style={{position: 'absolute', right: 80, top: 74, fontFamily: SERIF, fontStyle: 'italic', fontSize: 34, color: C.sageLight, opacity: ease(frame, 10, 24) * (1 - ease(frame, out, 20))}}>
        quatro linhas de produtos
      </div>

      {PANELS.map((p, i) => {
        const inP = ease(frame, 6 + i * 7, 36, 0, 1, EASE_IN_OUT);
        const outP = ease(frame, out + i * 5, 30, 0, 1, EASE_IN_OUT);
        const left = 80 + i * (425 + 20);
        const kb = interpolate(frame, [0, 200], [1.18, 1.02]);
        const label = ease(frame, 34 + i * 7, 26);
        return (
          <div
            key={p.title}
            style={{
              position: 'absolute',
              left,
              top: 160,
              width: 425,
              height: 800,
              borderRadius: 22,
              overflow: 'hidden',
              clipPath: `inset(${outP * 100}% 0 ${(1 - inP) * 100}% 0 round 22px)`,
              background: p.mode === 'product' ? '#F6F2EA' : C.navyDeep,
            }}
          >
            {p.mode === 'photo' ? (
              <Img
                src={staticFile(p.img)}
                style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.pos, transform: `scale(${kb})`}}
              />
            ) : (
              <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 40%, #FFFFFF 0%, #EFE7DA 80%)'}}>
                <Img
                  src={staticFile(p.img)}
                  style={{width: '125%', mixBlendMode: 'multiply', transform: `scale(${kb}) translateY(-60px)`}}
                />
              </AbsoluteFill>
            )}
            <AbsoluteFill style={{background: 'linear-gradient(180deg, transparent 50%, rgba(11,19,34,0.88) 100%)'}} />
            <div style={{position: 'absolute', left: 36, bottom: 40, right: 30, opacity: label, transform: `translateY(${(1 - label) * 30}px)`}}>
              <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 18, letterSpacing: '0.25em', color: C.greenLight}}>0{i + 1}</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 50, color: C.white, marginTop: 8, letterSpacing: '-0.02em'}}>{p.title}</div>
              <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 32, color: C.cream, marginTop: 4, opacity: 0.9}}>{p.sub}</div>
            </div>
          </div>
        );
      })}

      {frame >= headIn - 2 && (
        <>
          <AbsoluteFill style={{alignItems: 'center', paddingTop: 250, textAlign: 'center'}}>
            <LineReveal start={headIn}>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 150, color: C.cream, letterSpacing: '-0.04em', lineHeight: 1}}>Quatro linhas.</div>
            </LineReveal>
            <LineReveal start={headIn + 10}>
              <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 120, color: C.greenLight, lineHeight: 1.05}}>
                Um só padrão de qualidade.
              </div>
            </LineReveal>
          </AbsoluteFill>
          <Ticker items={ROW1} y={760} dir={-1} opacity={ease(frame, headIn + 14, 30) * 0.55} />
          <Ticker items={ROW2} y={850} dir={1} opacity={ease(frame, headIn + 20, 30) * 0.8} serif />
        </>
      )}
    </AbsoluteFill>
  );
};
