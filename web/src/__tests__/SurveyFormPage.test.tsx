import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import SurveyFormPage from '../routes/SurveyPages/SurveyFormPage';
import { QuestionType } from '../types/request/Question';

// mock scrollIntoView function
window.HTMLElement.prototype.scrollIntoView = () => {};

describe('[SurveyFormPage Test]', () => {
  function setUp() {
    return render(
      <MemoryRouter initialEntries={['/survey/form']}>
        <Routes>
          <Route path="/survey/form" element={<SurveyFormPage />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it('initial rendering SurveyFormPage', () => {
    setUp();

    const pageTitle = screen.getByText('설문조사 작성');
    const surveyTitle = screen.getByPlaceholderText('설문지의 제목을 입력해주세요');
    // TODO: Certification list test
    const startedDate = screen.getByLabelText('시작일 :');
    const endedDate = screen.getByLabelText('종료일 :');
    const surveyDescription = screen.getByPlaceholderText('설문지의 제목을 입력해주세요');
    const addQuestionButton = screen.getByText('+');
    const submitButton = screen.getByText('완료하기');

    expect(pageTitle).toBeInTheDocument();
    expect(surveyTitle).toBeInTheDocument();
    expect(surveyDescription).toBeInTheDocument();
    expect(startedDate).toBeInTheDocument();
    expect(endedDate).toBeInTheDocument();
    expect(addQuestionButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('create question when click "+" button', async () => {
    setUp();

    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);
    const createdQuestion = await screen.findByTestId('question');

    expect(createdQuestion).toBeInTheDocument();
  });

  it('delete question when click "🗑️" button', async () => {
    setUp();
    // create question
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);

    const deleteQuestionButton = await screen.findByText('🗑️');
    fireEvent.click(deleteQuestionButton);
    const deletedQuestion = screen.queryByTestId('question');

    expect(deletedQuestion).not.toBeInTheDocument();
  });

  it('create and delete from the middle of the questions', async () => {
    setUp();

    // create questions
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);
    fireEvent.click(addQuestionButton);
    fireEvent.click(addQuestionButton);
    fireEvent.click(addQuestionButton);
    fireEvent.click(addQuestionButton);

    const addQuestionButtons = await screen.findAllByText('+');
    const deleteQuestionButtons = await screen.findAllByText('🗑️');
    const questionTitles = await screen.findAllByDisplayValue('설문 제목');

    // set question titles with index for distinction
    questionTitles.forEach((questionTitle, index) => {
      fireEvent.change(questionTitle, { target: { value: index } });
    });
    expect((questionTitles[2] as HTMLInputElement).value === '2');

    // delete question in index 2
    fireEvent.click(deleteQuestionButtons[2]);
    expect((questionTitles[2] as HTMLInputElement).value === '3');

    // add question under index 1
    fireEvent.click(addQuestionButtons[1 + 1]);
    expect((questionTitles[2] as HTMLInputElement).value === '설문 제목');
  });

  it('check initial question type is LONG_ANSWER', async () => {
    setUp();

    // create question
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);

    const questionSelector = await screen.findByTestId('selector');

    fireEvent.change(questionSelector, { target: { value: QuestionType.LONG_ANSWER } });
    const label = await screen.findByText('장문형 답변이 입력됩니다.');
    expect(label).toBeInTheDocument();
  });

  it('change question type to SHORT_ANSWER', async () => {
    setUp();

    // create question
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);

    const questionSelector = await screen.findByTestId('selector');

    fireEvent.change(questionSelector, { target: { value: QuestionType.SHORT_ANSWER } });
    const label = await screen.findByText('단답형 답변이 입력됩니다.');
    expect(label).toBeInTheDocument();
  });

  it('change question type to SINGLE_CHOICE', async () => {
    setUp();

    // create question
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);

    const questionSelector = await screen.findByTestId('selector');

    fireEvent.change(questionSelector, { target: { value: QuestionType.SINGLE_CHOICE } });
    const label = await screen.findByText('문항을 추가해 주세요');
    expect(label).toBeInTheDocument();
  });

  it('change question type to MULTIPLE_CHOICE', async () => {
    setUp();

    // create question
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);

    const questionSelector = await screen.findByTestId('selector');

    fireEvent.change(questionSelector, { target: { value: QuestionType.MULTIPLE_CHOICE } });
    const label = await screen.findByText('문항을 추가해 주세요');
    expect(label).toBeInTheDocument();
  });

  it('add option when click "문항 추가하기" button', async () => {
    setUp();

    // create question
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);

    // change question type
    const questionSelector = await screen.findByTestId('selector');
    fireEvent.change(questionSelector, { target: { value: QuestionType.MULTIPLE_CHOICE } });

    const addOptionButton = screen.getByText('문항 추가하기');
    fireEvent.click(addOptionButton);
    fireEvent.click(addOptionButton);
    fireEvent.click(addOptionButton);
    fireEvent.click(addOptionButton);
    fireEvent.click(addOptionButton);

    const options = await screen.findAllByDisplayValue('객관식 문항');
    expect(options.length === 5);
  });

  it('delete option when click "X" button', async () => {
    setUp();

    // create question
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);

    // change question type
    const questionSelector = await screen.findByTestId('selector');
    fireEvent.change(questionSelector, { target: { value: QuestionType.MULTIPLE_CHOICE } });

    // add options
    const addOptionButton = screen.getByText('문항 추가하기');
    fireEvent.click(addOptionButton);
    fireEvent.click(addOptionButton);
    fireEvent.click(addOptionButton);
    fireEvent.click(addOptionButton);
    fireEvent.click(addOptionButton);

    const options = await screen.findAllByDisplayValue('객관식 문항');
    const deleteOptionButtons = await screen.findAllByText('X');

    // set option with index for distinction
    options.forEach((option, index) => {
      fireEvent.change(option, { target: { value: index } });
    });
    expect((options[2] as HTMLInputElement).value === '2');

    // delete option in index 2
    fireEvent.click(deleteOptionButtons[2]);
    expect((options[2] as HTMLInputElement).value === '3');
  });
  // TODO: check empty question
  // TODO: check empty options for selective
  // TODO: check empty value before submit(title, description, surveytitle/discription, optionTitle)
  // TODO: limit on number of questions and options
});
