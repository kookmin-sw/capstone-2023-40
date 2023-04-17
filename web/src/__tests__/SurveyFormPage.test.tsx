import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import SurveyFormPage from '../routes/SurveyPages/SurveyFormPage';

describe('[SurveyFormPage Test]', () => {
  // mock scrollIntoView function
  window.HTMLElement.prototype.scrollIntoView = function () {};

  it('renders SurveyFormPage', () => {
    render(
      <MemoryRouter initialEntries={['/survey/form']}>
        <SurveyFormPage />
      </MemoryRouter>
    );

    const pageTitle = screen.getByText('설문조사 작성');

    expect(pageTitle).toBeInTheDocument();
  });

  it('create question when click "+" button', async () => {
    render(
      <MemoryRouter initialEntries={['/survey/form']}>
        <SurveyFormPage />
      </MemoryRouter>
    );

    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);
    const createdQuestion = await screen.findByTestId('question');

    expect(createdQuestion).toBeInTheDocument();
  });

  it('delete question when click "x" button', async () => {
    render(
      <MemoryRouter initialEntries={['/survey/form']}>
        <SurveyFormPage />
      </MemoryRouter>
    );

    // create question for test delete
    const addQuestionButton = screen.getByText('+');
    fireEvent.click(addQuestionButton);

    const deleteQuestionButton = await screen.findByText('X');
    fireEvent.click(deleteQuestionButton);
    const deletedQuestion = screen.queryByTestId('question');

    expect(deletedQuestion).not.toBeInTheDocument();
  });

  it('create and delete from the middle of the questions', async () => {
    render(
      <MemoryRouter initialEntries={['/survey/form']}>
        <SurveyFormPage />
      </MemoryRouter>
    );

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
  // TODO: limit on number of questions and options
});
