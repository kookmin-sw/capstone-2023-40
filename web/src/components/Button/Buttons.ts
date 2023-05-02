import styled from 'styled-components';

const Button = styled.button`
  border: none;
  font-size: 18px;
  font-weight: 700;
  transition: 200ms background ease;
  cursor: pointer;
`;

export const RectanglePrimaryButton = styled(Button)`
  padding: 2vh 2vw 2vh 2vw;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  background-color: ${(props) => props.theme.colors.primary};

  &:hover {
    background-color: ${(props) => props.theme.colors.prhover};
  }
`;

export const RectangleButton = styled(Button)`
  padding: 2vh 2vw 2vh 2vw;
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.theme.colors.default};
  background-color: ${(props) => props.theme.colors.button};

  &:hover {
    background-color: ${(props) => props.theme.colors.btnhover};
  }
`;
