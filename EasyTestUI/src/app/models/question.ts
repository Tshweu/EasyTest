import { Answer } from './answer';

export interface Question{
  id: string | null,
  description: string,
  answers: Answer[]
}
