import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import SurveyFormPage from '../routes/SurveyPages/SurveyFormPage';

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

  it('renders SurveyFormPage', () => {
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

  it('delete question when click "x" button', async () => {
    setUp();
    // create question for test delete
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);

    const deleteQuestionButton = await screen.findByText('X');
    fireEvent.click(deleteQuestionButton);
    const deletedQuestion = screen.queryByTestId('question');

    expect(deletedQuestion).not.toBeInTheDocument();
  });

  it('create and delete from the middle of the questions', async () => {
    setUp();

    // create questions for test
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);
    fireEvent.click(addQuestionButton);
    fireEvent.click(addQuestionButton);
    fireEvent.click(addQuestionButton);
    fireEvent.click(addQuestionButton);

    const addQuestionButtons = await screen.findAllByText('+');
    const deleteQuestionButtons = await screen.findAllByText('X');
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

  // TODO: check change question type
  // TODO: add and delete option
  // TODO: check empty question
  // TODO: check empty options for selective
  // TODO: check empty value before submit(title, description, surveytitle/discription, optionTitle)
  // TODO: limit on number of questions and options
});
