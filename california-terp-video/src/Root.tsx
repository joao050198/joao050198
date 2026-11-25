import React from 'react';
import {Composition} from 'remotion';
import {Main} from './Main';
import timeline from './timeline.json';
import {loadFonts} from './fonts';

loadFonts();

const total =
  timeline.scenes.reduce((a, s) => a + s.dur, 0) - timeline.transitions.reduce((a, t) => a + t, 0);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="CaliforniaTerp"
    component={Main}
    durationInFrames={total}
    fps={timeline.fps}
    width={timeline.width}
    height={timeline.height}
  />
);
