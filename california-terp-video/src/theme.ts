import {Easing, interpolate} from 'remotion';

// Paleta extraída do logo e do site oficial (terpenoscalifornia.com)
export const C = {
  ink: '#0B1322',
  navy: '#1B2B4D',
  navyDeep: '#101A30',
  cream: '#F4F1E8',
  paper: '#FAF8F2',
  olive: '#403A26',
  oliveDeep: '#26221A',
  sage: '#81876C',
  sageLight: '#B9BDA3',
  green: '#3A7D44',
  greenLight: '#7DB874',
  red: '#B5392A',
  flagBlue: '#2B3F8C',
  white: '#FFFFFF',
};

export const SANS = 'Montserrat, Helvetica, Arial, sans-serif';
export const SERIF = '"Instrument Serif", Georgia, serif';

export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_IN = Easing.bezier(0.7, 0, 0.84, 0);

/** Interpolação 0→1 (ou from→to) com clamp e easing premium por padrão. */
export const ease = (
  frame: number,
  start: number,
  dur: number,
  from = 0,
  to = 1,
  easing: (t: number) => number = EASE_OUT,
) =>
  interpolate(frame, [start, start + dur], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });
