import {SessionAware} from 'src/app/session-aware';

export interface FeedbackAnswer extends SessionAware {
  answers: [
    { question: string, answer: string }
  ];
}

export const feedbackAnswerCollection = 'feedback-answers';
