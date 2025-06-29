import { uzb } from './uzb';
import { rus } from './rus';
import { en } from './en';

export const translations = {
  uzb,
  rus,
  en,
};

export type TranslationKey = keyof typeof uzb;
export type Language = keyof typeof translations; 