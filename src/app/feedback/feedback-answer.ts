import {SessionAware} from 'src/app/session-aware';

export interface FeedbackAnswer extends SessionAware {
  question: string
  answer: string
}

export const feedbackAnswerCollection = 'feedback-answers'
