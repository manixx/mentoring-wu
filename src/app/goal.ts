import {SessionAware} from 'src/app/session-aware';

export interface Goal extends SessionAware {
  goal: string
  important: boolean
}
