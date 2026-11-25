import {continueRender, delayRender, staticFile} from 'remotion';

// Fontes tipográficas profissionais (desenhadas por type designers, licença OFL):
// Montserrat — Julieta Ulanovsky | Instrument Serif — Instrument
const FONTS: Array<[string, string, string, string]> = [
  ['Montserrat', 'fonts/montserrat-latin-400-normal.woff2', '400', 'normal'],
  ['Montserrat', 'fonts/montserrat-latin-500-normal.woff2', '500', 'normal'],
  ['Montserrat', 'fonts/montserrat-latin-600-normal.woff2', '600', 'normal'],
  ['Montserrat', 'fonts/montserrat-latin-700-normal.woff2', '700', 'normal'],
  ['Montserrat', 'fonts/montserrat-latin-800-normal.woff2', '800', 'normal'],
  ['Instrument Serif', 'fonts/instrument-serif-latin-400-normal.woff2', '400', 'normal'],
  ['Instrument Serif', 'fonts/instrument-serif-latin-400-italic.woff2', '400', 'italic'],
];

let loaded = false;

export const loadFonts = () => {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;
  const handle = delayRender('Carregando fontes');
  Promise.all(
    FONTS.map(([family, file, weight, style]) => {
      const face = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, {weight, style});
      return face.load().then((f) => document.fonts.add(f));
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
};
