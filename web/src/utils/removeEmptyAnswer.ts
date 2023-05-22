import { AnsweredQuestion, QuestionType } from '../types/request';

export const removeEmptyAnswer = (answers: Array<AnsweredQuestion>): Array<AnsweredQuestion> => {
  const newAnswers: Array<AnsweredQuestion> = [];

  for (let i = 0; i < answers.length; i += 1) {
    if (typeof answers[i] !== 'undefined') {
      let tmpQuestionType: number | string;
      if (typeof answers[i].questionType === 'undefined') {
        tmpQuestionType = -1;
      } else if (typeof answers[i].questionType === 'string') {
        tmpQuestionType = QuestionType[answers[i].questionType];
      } else {
        tmpQuestionType = answers[i].questionType;
      }

      switch (tmpQuestionType) {
        case QuestionType.MULTIPLE_CHOICES:
          if (answers[i].multipleChoices?.length !== 0) {
            newAnswers.push(answers[i]);
          }
          break;
        case QuestionType.SINGLE_CHOICE:
          newAnswers.push(answers[i]);
          // TODO: 단일 선택 체크 해제
          break;
        case QuestionType.LONG_ANSWER:
          if (answers[i].longAnswer !== '') {
            newAnswers.push(answers[i]);
          }
          break;
        case QuestionType.SHORT_ANSWER:
          if (answers[i].shortAnswer !== '') {
            newAnswers.push(answers[i]);
          }
          break;
        default:
          break;
      }
    }
  }

  return newAnswers;
};
