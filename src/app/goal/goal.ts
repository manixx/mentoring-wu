import {SessionAware} from 'src/app/session-aware';

export interface Goal extends SessionAware {
  id?: string;
  goal: string;
  important: boolean;
  session: string;
}

export const goalCollection = 'goals';
