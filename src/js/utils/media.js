import { css } from 'styled-components';

export const media = {
  xsmall: (...args) => css`
    @media (max-width: 544px) {
        ${css(...args)}
    }
    `,
  onlysmall: (...args) => css`
    @media (min-width: 544px) and (max-width: 767px) {
        ${css(...args)}
    }
    `,
  small: (...args) => css`
    @media (min-width: 544px) {
        ${css(...args)}
    }
    `,
  onlymedium: (...args) => css`
    @media (min-width: 768px) and (max-width: 991px) {
        ${css(...args)}
    }
    `,
  medium: (...args) => css`
    @media (min-width: 768px) {
        ${css(...args)}
    }
    `,
  onlylarge: (...args) => css`
    @media (min-width: 992px) and (max-width: 1199px) {
        ${css(...args)}
    }
    `,
  large: (...args) => css`
    @media (min-width: 992px) {
        ${css(...args)}
    }
    `,
  xlarge: (...args) => css`
    @media (min-width: 1200px) {
        ${css(...args)}
    }
    `,
};
