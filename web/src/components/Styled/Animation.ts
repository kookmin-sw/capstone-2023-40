import styled, { keyframes } from 'styled-components';

const skeletonKeyframes = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: calc(1000px + 100%) 0;
  }
`;

export const skeletonItem = styled.div`
  background-image: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.background},
    #a0a0a0,
    ${(props) => props.theme.colors.background}
  );
  background-repeat: no-repeat;
  background-size: 1000px 100%;
  animation: ${skeletonKeyframes} 1300ms ease-out infinite;
`;
