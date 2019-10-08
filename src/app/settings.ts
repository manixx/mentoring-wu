import {Section} from 'src/app/section';

export interface Setting {
  openSection: Section
  suggestions: string[]
  refreshSessions: boolean
}
