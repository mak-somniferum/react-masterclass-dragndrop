import { darken } from 'polished';
import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  bgColor: '#1f2425',
  cardColor: '#1f2425',
  cardHoverColor: darken(0.075, '#1f2425'),
  boardColor: '#2b3233',
  textColor: '#ffffff',
  errorTxtColor: '#ff7675',
};

export const lightTheme: DefaultTheme = {
  bgColor: '#ffffff',
  cardColor: '#f5f5f5',
  cardHoverColor: darken(0.075, '#f5f5f5'),
  boardColor: '#ffffff',
  textColor: '#111111',
  errorTxtColor: '#d63031',
};
