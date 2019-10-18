import {SessionAware} from 'src/app/session-aware';

export interface OrientationAnswer extends SessionAware {
  answers: [
    { question: string, options: string[] }
  ];
}

export const orientationAnswerCollection = 'orientation-answers';
