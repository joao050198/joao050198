import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import type {TransitionPresentation} from '@remotion/transitions';
import timeline from './timeline.json';
import {C} from './theme';
import {FilmFinish} from './components/Atmosphere';
import {circleReveal, panelSweep, pushUp, zoomThrough} from './transitions';
import {S01Abertura} from './scenes/S01Abertura';
import {S02Crenca} from './scenes/S02Crenca';
import {S03Origem} from './scenes/S03Origem';
import {S04Proposito} from './scenes/S04Proposito';
import {S05Processo} from './scenes/S05Processo';
import {S06Valores} from './scenes/S06Valores';
import {S07Portfolio} from './scenes/S07Portfolio';
import {S08Momentos} from './scenes/S08Momentos';
import {S09Missao} from './scenes/S09Missao';
import {S10Assinatura} from './scenes/S10Assinatura';

const SCENES = [S01Abertura, S02Crenca, S03Origem, S04Proposito, S05Processo, S06Valores, S07Portfolio, S08Momentos, S09Missao, S10Assinatura];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PRESENTATIONS: TransitionPresentation<any>[] = [
  circleReveal(50, 50), // gota → crença
  panelSweep([C.green, C.navy]), // crença → logo
  pushUp(), // logo → propósito
  zoomThrough(), // propósito → processo
  panelSweep([C.sage, C.cream]), // processo → valores
  pushUp(), // valores → portfólio
  panelSweep([C.green, C.cream]), // portfólio → momentos
  pushUp(), // momentos → missão
  circleReveal(50, 45), // missão → assinatura
];

export const Main: React.FC = () => (
  <AbsoluteFill style={{background: C.ink}}>
    <TransitionSeries>
      {SCENES.map((Scene, i) => (
        <React.Fragment key={i}>
          <TransitionSeries.Sequence durationInFrames={timeline.scenes[i].dur}>
            <Scene />
          </TransitionSeries.Sequence>
          {i < SCENES.length - 1 && (
            <TransitionSeries.Transition presentation={PRESENTATIONS[i]} timing={linearTiming({durationInFrames: timeline.transitions[i]})} />
          )}
        </React.Fragment>
      ))}
    </TransitionSeries>
    <FilmFinish />
    <Audio src={staticFile('audio/trilha.wav')} />
  </AbsoluteFill>
);
