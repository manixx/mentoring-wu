export interface OrientationQuestion {
  id?: string;
  question: string;
  options: string[];
  minRequired: number;
}

export const orientationQuestionCollection = 'admin/settings/orientation-questions';
