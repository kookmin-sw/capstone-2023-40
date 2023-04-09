import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

const Button = styled.button`
  font-weight: 900;
  text-align: center;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.button};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const AddQuestionButton = styled(Button)`
  color: ${(props) => props.theme.colors.text};
  margin-left: 37vw;
`;

const DeleteQuestionButton = styled(Button)`
  color: #cd5c5c;
  margin-left: 2vw;
`;

interface EditQuestionButtonProps {
  editType: string;
  questionId: number;
  handleClickButton: (event: React.MouseEvent<HTMLButtonElement>, questionId: number, optionId?: number) => void;
  theme: DefaultTheme;
}

export default function EditQuestionButton({
  editType,
  questionId,
  handleClickButton,
  theme,
}: EditQuestionButtonProps) {
  switch (editType) {
    case 'Add':
      return (
        <AddQuestionButton theme={theme} name="addQuestion" onClick={(event) => handleClickButton(event, questionId)}>
          +
        </AddQuestionButton>
      );
    case 'Delete':
      return (
        <DeleteQuestionButton
          theme={theme}
          name="deleteQuestion"
          onClick={(event) => handleClickButton(event, questionId)}
        >
          X
        </DeleteQuestionButton>
      );
    default:
      return <Button>?</Button>;
  }
}
