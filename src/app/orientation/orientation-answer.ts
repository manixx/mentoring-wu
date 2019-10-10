import {SessionAware} from 'src/app/session-aware';

export interface OrientationAnswer extends SessionAware {
  question: string
  answers: string[]
}

export const orientationAnswerCollection = 'orientation-answers'
