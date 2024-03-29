import styled from 'styled-components';

import { Icons } from '../../assets/svg';

export const TrashImage = styled(Icons.TRASH).attrs({
  width: 30,
  height: 30,
})`
  filter: invert(${(props) => props.theme.iconInvert});
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.5vh;
  border-radius: 30px;
  cursor: pointer;
  transition: 200ms background ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

export const PlusImage = styled(Icons.PLUS).attrs({
  width: 30,
  height: 30,
})`
  filter: invert(${(props) => props.theme.iconInvert});
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.5vh;
  border-radius: 30px;
  cursor: pointer;
  transition: 200ms background ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;

export const DeleteImage = styled(Icons.DELETE).attrs({
  width: 30,
  height: 30,
})`
  filter: invert(${(props) => props.theme.iconInvert});
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.5vh;
  border-radius: 30px;
  cursor: pointer;
  transition: 200ms background ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;
