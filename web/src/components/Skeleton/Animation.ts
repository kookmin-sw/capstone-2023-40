import { keyframes } from 'styled-components';

export const skeletonKeyframes = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: calc(1000px + 100%) 0;
  }
`;
