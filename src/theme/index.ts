import { rgba } from 'polished';
import { colors } from './colors';

export const theme = {
  colors: {
    primary: colors.green.darkMint,
    secondary: colors.purple.purpleFlower,
    black: colors.black.dune,
    white: colors.white.whiteSmoke,
    grey: {
      light: colors.grey.lightGrey,
    },
    red: colors.red.pomegranate,
  },
  boxShadows: [
    'none',
    `${rgba(colors.black.dune, 0.2)} 0px 5px 14px 0px, ${rgba(colors.black.dune, 0.2)} 0px 6px 6px`,
  ],
  borders: ['none', '1px solid'],
  borderRadius: [0, '3px'],
};

export type Theme = typeof theme;
