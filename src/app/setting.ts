import {Section} from 'src/app/section';

export interface Setting {
  openSection: Section
  goalSuggestions: string[]
  feedbackQuestions: string[]
}

export const settingsDocument = 'admin/settings'
